require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = 3001;

app.use(express.json());



const pool = new Pool({
  user: process.env.DB_USER,       
  host: process.env.DB_HOST,       
  database: process.env.DB_NAME,   
  password: process.env.DB_PASSWORD, 
  port: process.env.DB_PORT,       
});

// Test de connexion
pool.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à PostgreSQL:', err);
  } else {
    console.log('Connecté à PostgreSQL !');
  }
});



app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur l\'API SerTiznit !',
    endpoints: {
      'GET /artisans': 'Voir tous les artisans',
      'GET /artisans/:id': 'Voir un artisan',
      'POST /artisans': 'Ajouter un artisan',
      'PUT /artisans/:id': 'Modifier un artisan',
      'DELETE /artisans/:id': 'Supprimer un artisan'
    }
  });
});

app.get('/artisans', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM artisans ORDER BY id');
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la récupération des artisans' 
    });
  }
});

app.get('/artisans/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM artisans WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Artisan introuvable' 
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur' 
    });
  }
});

app.post('/artisans', async (req, res) => {
  try {
    const { nom, profession, telephone, note } = req.body;
    
    if (!nom || !profession || !telephone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nom, profession et téléphone sont obligatoires' 
      });
    }
    
    const result = await pool.query(
      'INSERT INTO artisans (nom, profession, telephone, note) VALUES ($1, $2, $3, $4) RETURNING *',
      [nom, profession, telephone, note || 0]
    );
    
    res.status(201).json({
      success: true,
      message: 'Artisan ajouté avec succès',
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de l\'ajout' 
    });
  }
});

app.put('/artisans/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, profession, telephone, note } = req.body;
    
    const result = await pool.query(
      'UPDATE artisans SET nom = $1, profession = $2, telephone = $3, note = $4 WHERE id = $5 RETURNING *',
      [nom, profession, telephone, note, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Artisan introuvable' 
      });
    }
    
    res.json({
      success: true,
      message: 'Artisan modifié avec succès',
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la modification' 
    });
  }
});

app.delete('/artisans/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM artisans WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Artisan introuvable' 
      });
    }
    
    res.json({
      success: true,
      message: 'Artisan supprimé avec succès',
      data: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la suppression' 
    });
  }
});

app.get('/artisans/search/:profession', async (req, res) => {
  try {
    const { profession } = req.params;
    const result = await pool.query(
      'SELECT * FROM artisans WHERE LOWER(profession) = LOWER($1)', 
      [profession]
    );
    
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la recherche' 
    });
  }
});

app.get('/stats/total', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) as total FROM artisans');
    res.json({
      success: true,
      total_artisans: parseInt(result.rows[0].total)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors du calcul des stats' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});