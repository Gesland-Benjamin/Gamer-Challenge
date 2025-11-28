# UI — Page Profil (mobile-first)

Ce document contient :
- Liste des captures d'écran à réaliser (mobile-first) pour la page profil d'un utilisateur connecté.
- Extraits de code (statique et dynamique) liés à la page profil et à la pagination.
- Conseils pour les prises et noms de fichiers.

## 1) Emplacement des vues et contrôleurs
- Vue "mes challenges" (profil connecté) : `app/views/mychallenges.ejs`
- Vue publique profil : `app/views/profile.ejs`
- Edition du profil (mon compte) : `app/views/me.ejs`
- Contrôleur : `app/controllers/profile.controller.js` (méthode `challengesListUser`) — envoie `listChallenges`, `page`, `totalPages`, `user`, `session`.

## 2) Dossier pour captures
Créez les captures dans : `docs/screenshots/profile/`
Noms recommandés : `profile-<user>-<device>-<what>.png`
Exemples :
- `profile-alice-iphone12-header.png`
- `profile-alice-iphone12-challenges.png`
- `profile-alice-iphoneSE-edit.png`

## 3) Liste de captures (mobile-first)
Priorité mobile (taille viewport petite -> plus grande) :
1. Header + avatar + pseudo (iPhone SE 320px) — montrer l'affichage du haut de la page.
2. Section réseaux sociaux (icônes) (iPhone 12) — vérifier taille et espacement.
3. Liste de challenges (1 ou plusieurs items visibles) (iPhone 12) — montrer au moins un item.
4. Écran 'Aucun challenge' (scénario où la liste est vide) — utile pour UX.
5. Formulaire d'édition `/me` (champs, boutons) — mobile.
6. Menu mobile ouvert / navigation (si `aside_nav` est responsive).
7. Capture full-page (pour documentation) — DevTools > Capture full size screenshot.

## 4) Extraits de code à inclure dans le rapport
Les extraits ci-dessous peuvent être collés dans le chapitre front-end pour illustrer le code statique et dynamique.

### 4.1 Extrait statique — HTML / EJS (en-tête profil)
```ejs
<section class="profile__user">
  <h1 class="profile__username"><%= user.username %></h1>
  <img class="profile__avatar" src="<%= user.picture %>" alt="avatar" />

  <h2 class="profile__subtitle">Réseaux sociaux</h2>
  <div class="profile__socials">
    <% const socials=[ { url: user.twitch_url, icon: 'fa-twitch' }, { url: user.youtube_url, icon: 'fa-youtube' }, { url: user.discord_url, icon: 'fa-discord' } ]; socials.forEach(social=> { if (social.url) { %>
      <a class="profile__social-link" href="<%= social.url %>" target="_blank">
        <i class="fa-brands <%= social.icon %>"></i>
      </a>
    <% } }); %>
  </div>
</section>
```

### 4.2 Extrait dynamque — pagination EJS (vue `mychallenges.ejs`)
```ejs
<!-- Pagination -->
<% if (typeof totalPages !== 'undefined' && totalPages > 1) { %>
  <div class="pagination-container">
    <nav class="pagination" aria-label="Pagination">
      <% if (page > 1) { %>
        <a href="/mychallenges?page=<%= page - 1 %>" class="pagination__link">&laquo; Précédent</a>
      <% } else { %>
        <span class="pagination__link disabled">&laquo; Précédent</span>
      <% } %>

      <% for (let p = 1; p <= totalPages; p++) { %>
        <% if (p === page) { %>
          <span class="pagination__link active"><%= p %></span>
        <% } else { %>
          <a href="/mychallenges?page=<%= p %>" class="pagination__link"><%= p %></a>
        <% } %>
      <% } %>

      <% if (page < totalPages) { %>
        <a href="/mychallenges?page=<%= page + 1 %>" class="pagination__link">Suivant &raquo;</a>
      <% } else { %>
        <span class="pagination__link disabled">Suivant &raquo;</span>
      <% } %>
    </nav>
  </div>
<% } %>
```

### 4.3 Extrait du contrôleur (logique server-side — pagination)
```js
const page = parseInt(req.query.page) || 1;
const limit = 9;
const offset = (page - 1) * limit;
const { count, rows: listChallenges } = await Challenge.findAndCountAll({
  where: { user_id: userId },
  limit,
  offset,
  order: [["release_date", "DESC"]],
  include: [ /* ... */ ]
});
const totalPages = Math.ceil(count / limit);
res.render('mychallenges', { listChallenges, page, totalPages, user, session: req.session });
```

### 4.4 CSS (pagination + mobile-first)
```css
.pagination-container { display:flex; justify-content:center; }
.pagination__link { padding: 0.45rem 0.6rem; background: rgba(68,183,22,0.08); color: var(--fluogreen-color); border-radius:6px; }
.pagination__link.active { background: var(--fluogreen-color); color: #0b1907; }
@media (max-width:600px) { .profile__challenge-card { min-width:100%; max-width:100%; } }
```

## 5) Conseils pour l'insertion dans le rapport
- Montrez d'abord la capture mobile (iPhone SE) pour prouver l'approche "mobile-first".
- Ajoutez côté droit un petit encadré avec l'extrait EJS et une phrase expliquant le flux (server -> vue -> rendu HTML).
- Pour les éléments dynamiques (pagination), illustrez 2 captures : une page intermédiaire (p.2) et la page active (p.1) afin de montrer le comportement des liens.

---

Si vous voulez, je peux :
- Générer directement un script Puppeteer pour prendre automatiquement les captures (je le place dans `scripts/screenshot.js`).
- Extraire les styles CSS dans un fichier séparé si besoin.
- Ajouter des exemples de noms de fichiers et un petit index (README) dans `docs/screenshots/`.

Dites-moi quelle suite vous préférez et j'ajoute/édite les fichiers correspondants.
