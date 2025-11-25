# SerTiznit – API REST

API développée avec **Express.js**, **PostgreSQL** et testée avec **Postman**.  
Elle fournit des endpoints simples et performants pour gérer les données du projet *SerTiznit*.

---

## 🚀 Technologies utilisées
- Node.js  
- Express.js  
- PostgreSQL (`pg`)  
- dotenv  
- Postman  

---

## 📁 Structure du projet
SerTiznit/
│── .env
│── package.json
│── index.js
│── db/
│ └── pool.js
│── routes/
│ └── sertiznit.routes.js
│── controllers/
│ └── sertiznit.controller.js

yaml
Copier le code

---

## ⚙️ Installation & Configuration

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/ton-utilisateur/SerTiznit-API.git
cd SerTiznit-API
2️⃣ Installer les dépendances
bash
Copier le code
npm install
3️⃣ Créer un fichier .env
env
Copier le code
DB_USER=postgres
DB_PASSWORD=tonpassword
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sertiznit_db
4️⃣ Lancer le serveur
bash
Copier le code
npm start
Le serveur démarre par défaut sur :
👉 http://localhost:3001

🐘 Connexion à la base PostgreSQL
js
Copier le code
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
📌 Endpoints disponibles
🔹 GET /api/sertiznit
Retourne tous les éléments.

🔹 GET /api/sertiznit/:id
Retourne un élément par ID.

🔹 POST /api/sertiznit
Crée un nouvel élément.

Exemple de body JSON
json
Copier le code
{
  "nom": "Zakia",
  "profession": "Développeuse",
  "telephone": "0600000000",
  "note": 4
}
🔹 PUT /api/sertiznit/:id
Met à jour un élément.

🔹 DELETE /api/sertiznit/:id
Supprime un élément.

🧪 Tests avec Postman
Tu peux utiliser Postman pour tester :

Le CRUD complet

Les réponses JSON

La gestion des erreurs

👩‍💻 Scripts disponibles
json
Copier le code
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}