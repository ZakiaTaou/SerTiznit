-- Créer la table artisans
CREATE TABLE artisans (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  profession VARCHAR(50) NOT NULL,7744
  telephone VARCHAR(20) NOT NULL,
  note DECIMAL(2,1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

--  Insérer des données de test (exemples d'artisans)
INSERT INTO artisans (nom, profession, telephone, note) VALUES
('Hassan Benjelloun', 'Plombier', '0612345678', 4.5),
('Fatima Alaoui', 'Électricienne', '0623456789', 4.8),
('Mohammed Idrissi', 'Peintre', '0634567890', 4.2),
('Rachida Tazi', 'Menuisière', '0645678901', 4.9),
('Youssef Benali', 'Maçon', '0656789012', 4.0),
('Amina Chakir', 'Serrurier', '0667890123', 4.6);

--  Vérifier que les données sont bien insérées
SELECT * FROM artisans;

--  Exemples de requêtes utiles

-- Chercher tous les plombiers
SELECT * FROM artisans WHERE profession = 'Plombier';

-- Chercher les artisans avec une note > 4.5
SELECT * FROM artisans WHERE note > 4.5;

-- Compter le nombre total d'artisans
SELECT COUNT(*) as total FROM artisans;

-- Voir les professions disponibles
SELECT DISTINCT profession FROM artisans;