# Utilisez une image Node.js Alpine comme base
FROM node:18.19.0-LTS

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers du projet dans le conteneur
COPY . .

# Installez les dépendances
RUN npm install

# Construisez l'application
RUN npm run build

# Commande par défaut pour démarrer l'application
CMD ["npm", "start"]
