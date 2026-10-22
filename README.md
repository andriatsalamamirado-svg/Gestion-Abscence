# Gestion des absences

Application web de gestion des absences d'étudiants : classes, matières,
étudiants, absences et tableau de bord. Sans authentification.

Backend : Django + Django REST Framework (SQLite).
Frontend : React + Vite + Tailwind CSS (interface claire et simple).

## Base de données

Quatre tables métier : `classe`, `matiere`, `etudiant`, `absence`.
La base est créée vide : aucune donnée de démonstration.

## Lancer le backend

```powershell
cd backend
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py makemigrations classes matieres etudiants absences
python manage.py migrate
python manage.py runserver
```

## Lancer le frontend (second terminal)

```powershell
cd frontend
npm install
npm run dev
```

Ouvrir http://localhost:5173

## Première utilisation

1. Créer une classe, des matières, puis des étudiants.
2. Enregistrer des absences.
3. Une absence passe de « Non justifiée » à « Justifiée » en la modifiant et en
   indiquant le motif.
