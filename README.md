<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Nebula – Réseau Social Cosmique</title>
<style>
:root {
    --bg: #0b0e23;
    --bg2: #121632;
    --text: #ffffff;
    --accent: #7a4cff;
    --accent2: #ff4cff;
    --box: #1b1f3b;
    --border: #2a2e52;
}

.light {
    --bg: #f5f5f5;
    --bg2: #ffffff;
    --text: #000;
    --accent: #7a4cff;
    --accent2: #ff4cff;
    --box: #e6e6e6;
    --border: #cccccc;
}

body {
    background: var(--bg);
    color: var(--text);
    font-family: Arial;
    margin: 0;
    padding: 20px;
}

h1 {
    text-align: center;
    font-size: 38px;
    color: var(--accent2);
    text-shadow: 0 0 20px var(--accent);
}

.box {
    background: var(--box);
    padding: 15px;
    border: 1px solid var(--border);
    border-radius: 12px;
    margin-bottom: 20px;
    box-shadow: 0 0 15px #0005;
}

input, textarea {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border-radius: 8px;
    border: none;
    background: var(--bg2);
    color: var(--text);
}

button {
    background: var(--accent);
    border: none;
    padding: 10px 18px;
    margin-top: 10px;
    border-radius: 8px;
    cursor: pointer;
    color: white;
    transition: 0.2s;
}

button:hover {
    background: var(--accent2);
    transform: scale(1.05);
    box-shadow: 0 0 20px var(--accent2);
}

.post {
    background: var(--box);
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 15px;
    border-left: 4px solid var(--accent);
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
}

.post:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 25px #0007;
}

.vote-btn:hover {
    color: var(--accent2);
}

.pfp {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.comment {
    background: var(--bg2);
    padding: 10px;
    border-radius: 7px;
    margin-top: 5px;
}

.notification {
    position: fixed;
    top: 80px;
    right: 20px;
    background: var(--accent);
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 5px 20px #0007;
    animation: slideIn 0.3s;
    z-index: 1000;
}

@keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

.badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: bold;
    margin-left: 5px;
    vertical-align: middle;
}

.badge-admin {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 0 10px #667eea;
}

.badge-vip {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
}

.badge-verified {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
}

.badge-star {
    background: linear-gradient(135deg, #ffd89b 0%, #19547b 100%);
    color: white;
}

.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    z-index: 2000;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: var(--box);
    padding: 30px;
    border-radius: 15px;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    border: 2px solid var(--accent);
}

.user-item {
    background: var(--bg2);
    padding: 15px;
    margin: 10px 0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.badge-selector {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    margin-top: 10px;
}

.badge-option {
    padding: 5px 10px;
    border-radius: 15px;
    cursor: pointer;
    font-size: 12px;
    transition: 0.2s;
    border: 2px solid transparent;
}

.badge-option:hover {
    transform: scale(1.1);
    border-color: var(--accent);
}

.custom-badge-form {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    margin-top: 10px;
}

.custom-badge-form input {
    width: auto;
    flex: 1;
}

/* Profile modal specific */
#profilePage img.pfp { width: 80px; height: 80px; margin-bottom: 10px; }
#profileControls { margin-top: 10px; display:flex; gap:8px; align-items:center; }
#profilePreview { width:80px; height:80px; border-radius:50%; object-fit:cover; border:2px solid var(--border); }
#saveProfileImage, #cancelProfileImage { display:none; }
</style>
</head>
<body>

<h1>🌌 NEBULA – Reddit Cosmique</h1>
<button class="theme-btn" onclick="toggleTheme()" style="position:fixed;top:20px;right:20px;">🌗 Mode Sombre / Clair</button>

<!-- 🔍 BARRE DE RECHERCHE -->
<div class="search-box">
    <input id="searchInput" placeholder="🔍 Rechercher des posts..." oninput="filterPosts()">
</div>

<!-- 🧭 ONGLET DE FILTRES -->
<div class="filter-tabs" id="filterTabs" style="display:flex;">
    <div class="tab active" data-filter="all">🌟 Tous</div>
    <div class="tab" data-filter="top">🔥 Populaires</div>
    <div class="tab" data-filter="recent">⏰ Récents</div>
    <div class="tab" data-filter="mine">👤 Mes posts</div>
</div>

<!-- 🔐 AUTHENTIFICATION -->
<div id="authBox" class="box">
    <h3>Connexion / Inscription</h3>
    <input id="username" placeholder="Nom d'utilisateur">
    <input id="password" type="password" placeholder="Mot de passe">
    <button onclick="register()">Créer un compte</button>
    <button onclick="login()">Connexion</button>
</div>

<!-- 👤 ESPACE UTILISATEUR -->
<div id="userBox" class="box" style="display:none;">
    <img id="userPfp" class="pfp" src="">
    Connecté en tant que : <b id="currentUser"></b>
    <button id="myProfileBtn" onclick="openProfile()" >Mon Profil</button>
    <button id="adminPanel" onclick="openAdminPanel()" style="display:none;background:#764ba2;">👑 Panel Admin</button>
    <button onclick="logout()">Se déconnecter</button>
</div>

<!-- ✏️ CRÉATION DE POST -->
<div id="postBox" class="box" style="display:none;">
    <h3>Nouveau post</h3>
    <textarea id="postContent" placeholder="Écris quelque chose..."></textarea>

    <!-- 😊 EMOJIS -->
    <button onclick="toggleEmojiPicker()" style="background:transparent;color:var(--text);font-size:20px;padding:5px;">😊</button>
    <div id="emojiPicker" class="emoji-picker"></div>

    <!-- 👤 ANONYME -->
    <label><input type="checkbox" id="anonymousMode"> Poster en anonyme</label>

    <!-- 🖼 IMAGE -->
    <input type="file" id="postImage" accept="image/*">

    <!-- 🚀 PUBLIE -->
    <button onclick="addPost()">Publier</button>
</div>

<!-- 📄 ZONE DES POSTS -->
<div id="posts"></div>

<!-- 👤 PROFIL UTILISATEUR -->
<div id="profilePage" class="box" style="display:none;">
    <h2>Profil</h2>
    <img id="profilePicture" class="pfp" src="">
    <div id="profileControls">
        <!-- Hidden file input used to pick image -->
        <input type="file" id="profileImageInput" accept="image/*" style="display:none;">
        <!-- Visible preview and buttons -->
        <img id="profilePreview" src="" alt="Prévisualisation" style="display:none;">
        <div style="flex:1">
            <p><b>Nom :</b> <span id="profileName"></span></p>
            <p><b>Posts :</b> <span id="profilePosts"></span></p>
        </div>
        <div id="profileButtons">
            <!-- shown only when viewing own profile -->
            <button id="changeProfileBtn" onclick="triggerProfileImagePick()" style="display:none;">Changer la photo</button>
            <button id="saveProfileImage" onclick="saveProfileImage()" style="display:none;">Enregistrer</button>
            <button id="cancelProfileImage" onclick="cancelProfileImage()" style="display:none;">Annuler</button>
        </div>
    </div>
    <button onclick="closeProfile()">Fermer</button>
</div>

<!-- 👑 PANEL ADMIN -->
<div id="adminModal" class="modal">
    <div class="modal-content">
        <h2>👑 Panel Admin</h2>
        <p>Gestion des utilisateurs, badges et outils admin</p>

        <!-- ⭐ CRÉATION DE BADGE PERSONNALISÉ -->
        <div class="custom-badge-form">
            <input type="text" id="customBadgeName" placeholder="Nom du badge">
            <input type="text" id="customBadgeIcon" placeholder="Icône (emoji)">
            <input type="color" id="customBadgeColor" value="#ff0000">
            <button onclick="createCustomBadge()">Créer</button>
        </div>

        <div style="margin-top:10px;margin-bottom:20px;font-size:13px;color:#aaa;">
            ➜ L’admin peut créer / supprimer des badges personnalisés  
            ➜ Les badges peuvent être donnés ou retirés aux utilisateurs
        </div>

        <!-- 👥 LISTE UTILISATEURS -->
        <div id="usersList"></div>

        <button onclick="closeAdminPanel()" style="margin-top:20px;">Fermer</button>
    </div>
</div>

<!-- 📨 MODAL TICKETS -->
<div id="ticketModal" class="modal">
    <div class="modal-content">
        <h2>📨 Tickets de Support</h2>
        <textarea id="ticketMessage" placeholder="Explique ton problème..."></textarea>
        <button onclick="sendTicket()">Envoyer</button>

        <hr>

        <h3>📋 Tickets envoyés</h3>
        <div id="ticketsList"></div>

        <button onclick="closeTicketPanel()" style="margin-top:20px;">Fermer</button>
    </div>
</div>

<!-- 📨 BOUTON D’OUVERTURE TICKET -->
<button onclick="openTicketPanel()" style="position:fixed;bottom:20px;right:20px;background:#4facfe;">
    📨 Support
</button>
<script>
/* =====================================================
   🔐 CONSTANTES & HELPERS
   + DOM references
===================================================== */

const ADMIN_USER = "Admin";
const ADMIN_PASS = "M@tteo2007_";

const searchInput = document.getElementById('searchInput');
const postsContainer = document.getElementById('posts');

const authBox = document.getElementById('authBox');
const userBox = document.getElementById('userBox');
const postBox = document.getElementById('postBox');
const filterTabs = document.getElementById('filterTabs');

const currentUser = document.getElementById('currentUser');
const adminPanel = document.getElementById('adminPanel');
const userPfp = document.getElementById('userPfp');
const myProfileBtn = document.getElementById('myProfileBtn');

const profilePage = document.getElementById('profilePage');
const profilePicture = document.getElementById('profilePicture');
const profileName = document.getElementById('profileName');
const profilePosts = document.getElementById('profilePosts');
const profileImageInput = document.getElementById('profileImageInput');
const profilePreview = document.getElementById('profilePreview');
const changeProfileBtn = document.getElementById('changeProfileBtn');
const saveProfileImageBtn = document.getElementById('saveProfileImage');
const cancelProfileImageBtn = document.getElementById('cancelProfileImage');

const ticketsList = document.getElementById('ticketsList');
const usersList = document.getElementById('usersList');
const ticketMessage = document.getElementById('ticketMessage');

const postContent = document.getElementById('postContent');
const postImage = document.getElementById('postImage');
const anonymousMode = document.getElementById('anonymousMode');

let stagedProfileImageData = null; // temp storage for preview before save

function getUsers() { return JSON.parse(localStorage.getItem("users") || "{}"); }
function saveUsers(u) { localStorage.setItem("users", JSON.stringify(u)); }

function getPosts() { return JSON.parse(localStorage.getItem("posts") || "[]"); }
function savePosts(p) { localStorage.setItem("posts", JSON.stringify(p)); }

function getTickets() { return JSON.parse(localStorage.getItem("tickets") || "[]"); }
function saveTickets(t) { localStorage.setItem("tickets", JSON.stringify(t)); }

function getCustomBadges() { return JSON.parse(localStorage.getItem("customBadges") || "{}"); }


/* =====================================================
   🔐 AUTHENTIFICATION
===================================================== */

function register() {
    let user = username.value.trim();
    let pass = password.value.trim();

    if (!user || !pass) return alert("Champs vides.");

    let users = getUsers();
    let usernames = Object.keys(users).map(u => u.toLowerCase());

    if (usernames.includes(user.toLowerCase()))  
        return alert("Nom d'utilisateur déjà pris.");

    users[user] = { 
        pass, 
        pfp: "", 
        karma: 0, 
        badges: [] 
    };

    saveUsers(users);
    showNotification("✅ Compte créé avec succès !");
}

function login() {
    let user = username.value.trim();
    let pass = password.value.trim();

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        localStorage.setItem("user", user);
        loadUserUI();
        return;
    }

    let users = getUsers();

    if (!users[user] || users[user].pass !== pass)
        return alert("Identifiants incorrects.");

    localStorage.setItem("user", user);
    loadUserUI();
}

function logout() {
    localStorage.removeItem("user");
    location.reload();
}


/* =====================================================
   👤 INTERFACE UTILISATEUR
===================================================== */

function loadUserUI() {
    const user = localStorage.getItem("user");
    if (!user) return;

    authBox.style.display = "none";
    userBox.style.display = "block";
    postBox.style.display = "block";
    filterTabs.style.display = "flex";

    currentUser.textContent = user;

    if (user === ADMIN_USER)
        adminPanel.style.display = "inline-block";
    else
        adminPanel.style.display = "none";

    let users = getUsers();

    let pfp = user === ADMIN_USER 
        ? "https://i.imgur.com/0YzJ6aC.png" 
        : (users[user]?.pfp || "https://i.imgur.com/4ZQZ4Fc.png");

    userPfp.src = pfp;
}

function showNotification(msg) {
    let notif = document.createElement("div");
    notif.className = "notification";
    notif.textContent = msg;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}


/* =====================================================
   🏅 BADGES + AFFICHAGE
===================================================== */

function getBadgeHTML(username) {
    if (username === ADMIN_USER)
        return '<span class="badge badge-admin">👑 Admin</span>';

    let users = getUsers();
    let u = users[username];
    if (!u || !u.badges) return "";

    let customBadges = getCustomBadges();

    return u.badges.map(b => {
        if (b === "vip") return '<span class="badge badge-vip">💎 VIP</span>';
        if (b === "verified") return '<span class="badge badge-verified">✓ Vérifié</span>';
        if (b === "star") return '<span class="badge badge-star">⭐ Star</span>';

        if (customBadges[b])
            return `<span class="badge" style="background:${customBadges[b].color}">${customBadges[cb].icon || ''} ${b}</span>`;

        return "";
    }).join("");
}


/* =====================================================
   👑 PANEL ADMIN — AFFICHAGE
   (reste inchangé)
===================================================== */

function openAdminPanel() {
    if (localStorage.getItem("user") !== ADMIN_USER) return;

    let users = getUsers();
    let customBadges = getCustomBadges();

    let html = "";

    for (let username in users) {
        if (username === ADMIN_USER) continue;

        let u = users[username];

        html += `
        <div class="user-item">
            <div>
                <img class="pfp" src="${u.pfp || 'https://i.imgur.com/4ZQZ4Fc.png'}" 
                     style="width:30px;height:30px;margin-right:10px;">
                <b>${username}</b> ${getBadgeHTML(username)}

                <div class="badge-selector">
        `;

        // Badges standards
        ["vip","verified","star"].forEach(b => {
            html += `
                <div class="badge-option badge-${b}"
                    onclick="toggleBadge('${username}','${b}')"
                    style="${u.badges.includes(b) ? 'border-color:var(--accent);' : ''}">
                    ${b === 'vip' ? '💎' : b === 'verified' ? '✓' : '⭐'} ${b}
                </div>`;
        });

        // Badges personnalisés
        for (let cb in customBadges) {
            html += `
                <div class="badge-option"
                    onclick="toggleBadge('${username}','${cb}')"
                    style="background:${customBadges[cb].color};
                           ${u.badges.includes(cb) ? 'border-color:var(--accent);' : ''}">
                    ${customBadges[cb].icon} ${cb}
                </div>`;
        }

        html += `
                </div>
            </div>

            <div>
                <button onclick="resetPassword('${username}')" style="background:#4facfe;">🔑 Reset</button>
                <button class="delete" onclick="deleteUser('${username}')">🗑</button>
            </div>
        </div>`;
    }

    usersList.innerHTML = html;
    adminModal.style.display = "flex";
}

function closeAdminPanel() {
    adminModal.style.display = "none";
}


/* =====================================================
   🏅 BADGES — ACTIONS
===================================================== */

function toggleBadge(username, badge) {
    if (localStorage.getItem("user") !== ADMIN_USER) return;

    let users = getUsers();
    let list = users[username].badges || [];

    let index = list.indexOf(badge);

    if (index >= 0) {
        list.splice(index, 1);
        showNotification(`❌ Badge retiré à ${username}`);
    } else {
        list.push(badge);
        showNotification(`✅ Badge attribué à ${username}`);
    }

    users[username].badges = list;
    saveUsers(users);

    openAdminPanel();
}

function createCustomBadge() {
    if (localStorage.getItem("user") !== ADMIN_USER) return;

    let name = customBadgeName.value.trim();
    let icon = customBadgeIcon.value.trim() || "";
    let color = customBadgeColor.value;

    if (!name) return alert("Nom de badge vide.");

    let badges = getCustomBadges();
    badges[name] = { icon, color };
    localStorage.setItem("customBadges", JSON.stringify(badges));

    customBadgeName.value = "";
    customBadgeIcon.value = "";
    customBadgeColor.value = "#ff0000";

    showNotification(`🎖 Badge personnalisé "${name}" créé !`);
    openAdminPanel();
}

function deleteCustomBadge(name) {
    if (!confirm("Supprimer ce badge personnalisé ?")) return;

    let badges = getCustomBadges();
    delete badges[name];
    localStorage.setItem("customBadges", JSON.stringify(badges));

    showNotification("❌ Badge supprimé.");
    openAdminPanel();
}


/* =====================================================
   🔑 RESET MOT DE PASSE (admin)
===================================================== */

function resetPassword(username) {
    let users = getUsers();
    let newPass = prompt("Nouveau mot de passe pour " + username);

    if (!newPass) return;

    users[username].pass = newPass;
    saveUsers(users);

    showNotification(`🔑 Mot de passe réinitialisé pour ${username}`);
}


/* =====================================================
   ❌ SUPPRESSION UTILISATEUR
===================================================== */

function deleteUser(username) {
    if (!confirm("Supprimer l'utilisateur ET tous ses posts ?")) return;

    // Supprimer posts
    let posts = getPosts().filter(p => p.user !== username);
    savePosts(posts);

    // Supprimer compte
    let users = getUsers();
    delete users[username];
    saveUsers(users);

    showNotification(`🗑 Utilisateur ${username} supprimé.`);
    openAdminPanel();
}


/* =====================================================
   📨 SYSTEME DE TICKETS
===================================================== */

function openTicketPanel() {
    let tickets = getTickets();
    let html = "";

    tickets.forEach((t, i) => {
        html += `
        <div class="user-item">
            <b>${t.user}</b> : ${t.msg}
            <button class="delete" onclick="deleteTicket(${i})">x</button>
        </div>`;
    });

    ticketsList.innerHTML = html;
    ticketModal.style.display = "flex";
}

function closeTicketPanel() {
    ticketModal.style.display = "none";
}

function sendTicket() {
    let msg = ticketMessage.value.trim();
    if (!msg) return alert("Le message est vide.");

    let user = localStorage.getItem("user");
    let tickets = getTickets();

    tickets.push({ user, msg });
    saveTickets(tickets);

    ticketMessage.value = "";
    showNotification("📨 Ticket envoyé !");
}

function deleteTicket(i) {
    let tickets = getTickets();
    tickets.splice(i, 1);
    saveTickets(tickets);
    openTicketPanel();
}
/* =====================================================
   📝 CRÉATION DE POST
===================================================== */

function addPost() {
    if (!localStorage.getItem('user')) return alert("Tu dois être connecté pour poster.");

    let content = postContent.value.trim();
    if (!content) return alert("Le post est vide.");

    let img = "";
    if (postImage.files[0]) {
        let reader = new FileReader();
        reader.onload = () => {
            img = reader.result;
            savePost(content, img);
        };
        reader.readAsDataURL(postImage.files[0]);
    } else {
        savePost(content, "");
    }
}

function savePost(content, img) {
    let posts = getPosts();
    let user = localStorage.getItem("user");

    let post = {
        id: Date.now(),
        user,
        content,
        img,
        date: Date.now(),
        votes: 0,
        comments: [],
        anonymous: anonymousMode.checked
    };

    posts.unshift(post);
    savePosts(posts);

    postContent.value = "";
    postImage.value = "";
    anonymousMode.checked = false;

    showNotification("🚀 Post publié !");
    renderPosts();
}


/* =====================================================
   📝 AFFICHAGE DES POSTS
===================================================== */

function renderPosts() {
    let posts = getPosts();
    let user = localStorage.getItem("user");
    let filter = currentFilter;
    let query = (searchInput && searchInput.value ? searchInput.value.toLowerCase() : "");

    // Filtre recherche
    posts = posts.filter(p => p.content.toLowerCase().includes(query));

    // Filtres par onglets
    if (filter === "top") posts.sort((a,b) => b.votes - a.votes);
    if (filter === "recent") posts.sort((a,b) => b.date - a.date);
    if (filter === "mine") posts = posts.filter(p => p.user === user);

    let html = "";

    if (posts.length === 0) {
        html = '<div class="box">Aucun post pour le moment.</div>';
    } else {
        posts.forEach(p => {
            let displayUser = p.anonymous ? "Anonyme" : p.user;
            let badges = p.anonymous ? "" : getBadgeHTML(p.user);

            let pfp = p.anonymous
                ? "https://i.imgur.com/CJH0pCj.png"
                : (getUsers()[p.user]?.pfp || "https://i.imgur.com/4ZQZ4Fc.png");

            html += `
            <div class="post">
                <div style="display:flex;align-items:center;margin-bottom:10px;">
                    <img class="pfp" src="${pfp}">
                    <b style="margin-left:10px;cursor:pointer;" onclick="openProfile('${p.user}')">
                        ${displayUser}
                    </b>
                    ${badges}
                </div>

                <p>${p.content}</p>

                ${p.img ? `<img src="${p.img}" style="max-width:100%;border-radius:8px;margin-top:10px;">` : ""}

                <div style="margin-top:10px;">
                    <button class="vote-btn" onclick="vote(${p.id},1)">⬆</button>
                    ${p.votes}
                    <button class="vote-btn" onclick="vote(${p.id},-1)">⬇</button>

                    <button onclick="toggleComments(${p.id})">💬 Commentaires (${p.comments.length})</button>

                    ${(user === p.user || user === ADMIN_USER)
                        ? `<button class="delete" onclick="deletePost(${p.id})">🗑</button>`
                        : ""}
                </div>

                <!-- Commentaires -->
                <div id="comments-${p.id}" style="display:none;margin-top:10px;">
                    <textarea id="comment-input-${p.id}" placeholder="Ajouter un commentaire..."></textarea>
                    <button onclick="addComment(${p.id})">Publier</button>
                    <div id="comment-list-${p.id}">
                        ${renderCommentsHTML(p)}
                    </div>
                </div>
            </div>`;
        });
    }

    if (postsContainer) postsContainer.innerHTML = html;
}

function renderCommentsHTML(post) {
    let user = localStorage.getItem("user");

    return post.comments.map((c,i) => `
        <div class="comment">
            <b>${c.user}</b> : ${c.text}
            ${(c.user === user || user === ADMIN_USER)
                ? `<button class="delete" onclick="deleteComment(${post.id},${i})">x</button>`
                : ""}
        </div>
    `).join("");
}


/* =====================================================
   🔼🔽 VOTES
===================================================== */

function vote(id, val) {
    let posts = getPosts();
    let p = posts.find(x => x.id === id);
    if (!p) return;

    p.votes += val;
    savePosts(posts);
    renderPosts();
}


/* =====================================================
   💬 COMMENTAIRES
===================================================== */

function toggleComments(id) {
    let box = document.getElementById("comments-" + id);
    if (!box) return;
    box.style.display = box.style.display === "none" ? "block" : "none";
}

function addComment(id) {
    if (!localStorage.getItem('user')) return alert("Tu dois être connecté pour commenter.");

    let posts = getPosts();
    let p = posts.find(x => x.id === id);
    if (!p) return;

    let text = document.getElementById("comment-input-" + id).value.trim();
    if (!text) return;

    p.comments.push({
        user: localStorage.getItem("user"),
        text
    });

    savePosts(posts);
    renderPosts();
}

function deleteComment(postId, index) {
    let posts = getPosts();
    let p = posts.find(x => x.id === postId);
    p.comments.splice(index, 1);
    savePosts(posts);
    renderPosts();
}


/* =====================================================
   ❌ SUPPRESSION POST
===================================================== */

function deletePost(id) {
    if (!confirm("Supprimer ce post ?")) return;

    let posts = getPosts().filter(p => p.id !== id);
    savePosts(posts);
    renderPosts();
}


/* =====================================================
   🔍 RECHERCHE + FILTRES
===================================================== */

let currentFilter = "all";

function setFilter(f) {
    currentFilter = f;
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    const tab = Array.from(document.querySelectorAll(".tab")).find(t => t.getAttribute('data-filter') === f);
    if (tab) tab.classList.add("active");
    renderPosts();
}

function filterPosts() {
    renderPosts();
}


/* =====================================================
   😊 EMOJI PICKER
===================================================== */

const emojis = ["😀","😁","😂","🤣","😅","😊","😍","😘","😎","🤔","😢","😭","😡","👍","🔥","⭐","💀","💎","❤️"];

function toggleEmojiPicker() {
    let box = document.getElementById("emojiPicker");

    if (!box.innerHTML.trim()) {
        emojis.forEach(e => {
            let btn = document.createElement("button");
            btn.textContent = e;
            btn.style.margin = "5px";
            btn.onclick = () => {
                postContent.value += e;
            };
            box.appendChild(btn);
        });
    }

    box.style.display = box.style.display === "block" ? "none" : "block";
}

/* =====================================================
   🌗 THEME (sombre / clair)
===================================================== */

function applyTheme(theme) {
    if (theme === 'light') {
        document.documentElement.classList.add('light');
    } else {
        document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const current = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
}

/* =====================================================
   👤 PROFIL — ouverture, sélection et sauvegarde d'une pdp
===================================================== */

function openProfile(username) {
    // If username not provided, open current user's profile
    const viewer = localStorage.getItem('user');
    const target = username || viewer;
    if (!target) return alert("Aucun utilisateur sélectionné.");

    const users = getUsers();
    const u = users[target] || {};

    profileName.textContent = target;
    profilePicture.src = u.pfp || "https://i.imgur.com/4ZQZ4Fc.png";
    profilePreview.style.display = "none";
    profilePreview.src = "";

    // nombre de posts
    const posts = getPosts().filter(p => p.user === target);
    profilePosts.textContent = posts.length;

    // Controls visibility: if it's our own profile, show change controls
    if (viewer && viewer === target) {
        changeProfileBtn.style.display = "inline-block";
        // hide save/cancel until a file selected
        saveProfileImageBtn.style.display = "none";
        cancelProfileImageBtn.style.display = "none";
    } else {
        changeProfileBtn.style.display = "none";
        saveProfileImageBtn.style.display = "none";
        cancelProfileImageBtn.style.display = "none";
    }

    profilePage.style.display = "block";
    stagedProfileImageData = null;
}

function closeProfile() {
    profilePage.style.display = "none";
    // reset file input
    profileImageInput.value = "";
    profilePreview.style.display = "none";
    stagedProfileImageData = null;
}

function triggerProfileImagePick() {
    // open file picker
    profileImageInput.click();
}

profileImageInput.addEventListener('change', handleProfileImageSelected);

function handleProfileImageSelected() {
    const file = profileImageInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        stagedProfileImageData = reader.result;
        profilePreview.src = stagedProfileImageData;
        profilePreview.style.display = "inline-block";
        saveProfileImageBtn.style.display = "inline-block";
        cancelProfileImageBtn.style.display = "inline-block";
        // also show preview in main picture so user sees it immediately
        profilePicture.src = stagedProfileImageData;
    };
    reader.readAsDataURL(file);
}

function saveProfileImage() {
    const username = localStorage.getItem('user');
    if (!username) return alert("Tu dois être connecté pour changer la photo.");

    if (!stagedProfileImageData) return alert("Aucune image sélectionnée.");

    const users = getUsers();
    users[username] = users[username] || { pass: "", pfp: "", karma:0, badges: [] };
    users[username].pfp = stagedProfileImageData;
    saveUsers(users);

    // Update UI everywhere
    userPfp.src = stagedProfileImageData;
    profilePicture.src = stagedProfileImageData;
    profilePreview.style.display = "none";
    profileImageInput.value = "";
    saveProfileImageBtn.style.display = "none";
    cancelProfileImageBtn.style.display = "none";
    stagedProfileImageData = null;

    showNotification("✅ Photo de profil mise à jour !");
    renderPosts();
}

function cancelProfileImage() {
    // revert preview to stored picture
    const username = localStorage.getItem('user');
    const users = getUsers();
    const stored = users[username]?.pfp || "https://i.imgur.com/4ZQZ4Fc.png";
    profilePicture.src = stored;
    profilePreview.style.display = "none";
    profileImageInput.value = "";
    stagedProfileImageData = null;
    saveProfileImageBtn.style.display = "none";
    cancelProfileImageBtn.style.display = "none";
}

/* =====================================================
   🚀 INITIALISATION AU DÉMARRAGE
===================================================== */

window.onload = () => {
    // Appliquer le thème sauvegardé (par défaut 'dark')
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // Configurer écouteurs des onglets (utiliser data-filter)
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const f = tab.getAttribute('data-filter');
            setFilter(f);
        });
    });

    // Afficher l'UI utilisateur si connecté
    if (localStorage.getItem("user")) {
        loadUserUI();
    }
    renderPosts();
};


/* =====================================================
   ❌ FERMETURE DES MODALS
===================================================== */

function closeAdminPanel() {
    adminModal.style.display = "none";
}

function closeTicketPanel() {
    ticketModal.style.display = "none";
}

/* Fermeture modals si clic extérieur */
window.onclick = function(e) {
    if (e.target === adminModal) adminModal.style.display = "none";
    if (e.target === ticketModal) ticketModal.style.display = "none";
};
</script>

</body>
</html>
