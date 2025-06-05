# Étape de base avec Node.js LTS (actuellement 20 à la date de juin 2025)
FROM node:22-alpine AS base

# Réduire les vulnérabilités
# RUN apt-get update && apt-get upgrade -y && apt-get clean && rm -rf /var/lib/apt/lists/*

# Répertoire de travail dans le conteneur
WORKDIR /app

# Étape 1 : installation des dépendances dans un répertoire temporaire
FROM base AS install

# Créer un dossier temporaire pour le cache d'installation
RUN mkdir -p /temp/dev

# Copier les fichiers de dépendances uniquement (meilleur cache)
COPY package.json package-lock.json /temp/dev/

# Installer les dépendances sans modifier le lockfile
RUN cd /temp/dev && npm ci

# Étape finale : construction de l’image exécutable
FROM base AS final

# Copier les dépendances depuis l'étape install
COPY --from=install /temp/dev/node_modules ./node_modules

# Copier le reste du code source dans l’image
COPY . .

# Générer le client Prisma
# RUN npx prisma generate

# Port exposé
EXPOSE 3000

# Commande de lancement de l'app
CMD ["npm", "run", "dev"]
