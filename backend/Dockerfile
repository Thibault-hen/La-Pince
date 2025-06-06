# Étape de base avec Node.js LTS (actuellement 20 à la date de juin 2025)
FROM node:22-alpine AS base

# Réduire les vulnérabilités
# RUN apt-get update && apt-get upgrade -y && apt-get clean && rm -rf /var/lib/apt/lists/*

# Répertoire de travail dans le conteneur
WORKDIR /app



# Copier les fichiers de dépendances uniquement (meilleur cache)
COPY package.json package-lock.json ./

# Installer les dépendances sans modifier le lockfile
RUN npm i

# Copier le reste du code source dans l’image
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Port exposé
EXPOSE 3000

# Commande de lancement de l'app
CMD ["sh", "-c", "npm run db:deploy && npm run dev && npm run db:seed"]