# Admin blog conform-IT — CMS local du blog (NON déployé, usage local uniquement).
# Sert admin/public sur :4400, écrit les .md dans src/content/blog, gère les images
# de public/images/articles/ et déclenche les builds Astro (dist/ ou prod/).
#
# Lancer :  docker compose up            (voir docker-compose.yml)
# Sans compose :  docker build -t conform-it-admin-blog .
#                 docker run --rm -p 127.0.0.1:4400:4400 -v "$PWD":/app -v /app/node_modules conform-it-admin-blog

FROM node:22-bookworm-slim

WORKDIR /app

# Dépendances installées DANS l'image (node_modules Linux, incl. le binaire sharp/esbuild
# correspondant). En dev, docker-compose ajoute un volume anonyme sur /app/node_modules
# pour que ceux-ci ne soient PAS écrasés par les node_modules macOS du bind-mount.
COPY package.json package-lock.json ./
RUN npm ci

# Copie du code : utile quand l'image tourne seule (sans le bind-mount de compose).
COPY . .

ENV PORT=4400
EXPOSE 4400

CMD ["node", "admin/server.mjs"]
