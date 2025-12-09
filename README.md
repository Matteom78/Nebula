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
    box-sizing: border-box;
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

.filter-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;
    flex-wrap: wrap;
}

.tab {
    padding: 10px 20px;
    background: var(--box);
    border: 2px solid var(--border);
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s;
}

.tab:hover {
    background: var(--accent);
    transform: scale(1.05);
}

.tab.active {
    background: var(--accent);
    border-color: var(--accent2);
    box-shadow: 0 0 15px var(--accent);
}

.search-box {
    margin-bottom: 20px;
}

.emoji-picker {
    display: none;
    background: var(--box);
    padding: 10px;
    border-radius: 8px;
    margin-top: 10px;
}

.delete {
    background: #ff4444;
}

.delete:hover {
    background: #ff0000;
}
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
<div class="filter-tabs" id="filterTabs" style="display:none;">
    <div class="tab active" onclick="setFilter('all')">🌟 Tous</div>
    <div class="tab" onclick="setFilter('top')">🔥 Populaires</div>
    <div class="tab" onclick="setFilter('recent')">⏰ Récents</div>
    <div class="tab" onclick="setFilter('mine')">👤 Mes posts</div>
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
    <button onclick="openProfile(localStorage.getItem('user'))">Mon Profil</button>
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
    <h2>👤 Profil</h2>
    <img id="profilePicture" class="pfp" style="width:80px;height:80px;margin-bottom:10px;">
    <input type="file" id="profileImageInput" accept="image/*" onchange="updateProfilePicture()">
    <p><b>Nom :</b> <span id="profileName"></span></p>
    <p><b>Posts :</b> <span id="profilePosts"></span></p>
    <div id="profileExtra"></div>
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
            ➜ L'admin peut créer / supprimer des badges personnalisés  
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
        
        <div style="margin-bottom:20px;">
            <textarea id="ticketMessage" placeholder="Explique ton problème..."></textarea>
            <button onclick="sendTicket()">Envoyer un ticket</button>
        </div>

        <hr>

        <h3>📋 Tous les tickets</h3>
        <div id="ticketsList"></div>

        <button onclick="closeTicketPanel()" style="margin-top:20px;">Fermer</button>
    </div>
</div>

<!-- 📨 BOUTON D'OUVERTURE TICKET -->
<button onclick="openTicketPanel()" style="position:fixed;bottom:20px;right:20px;background:#4facfe;">
    📨 Support
</button>

<script>
/* =====================================================
   🔐 CONSTANTES & HELPERS
===================================================== */

const ADMIN_USER = "Admin";
const ADMIN_PASS = "M@tteo2007_";

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
    if (pass.length < 4) return alert("Mot de passe trop court (min 4 caractères).");

    let users = getUsers();
    let usernames = Object.keys(users).map(u => u.toLowerCase());

    if (usernames.includes(user.toLowerCase()))  
        return alert("Nom d'utilisateur déjà pris.");

    users[user] = { 
        pass, 
        pfp: "", 
        karma: 0, 
        badges: [],
        joinDate: Date.now()
    };

    saveUsers(users);
    showNotification("✅ Compte créé avec succès !");
    
    // Connexion automatique
    localStorage.setItem("user", user);
    loadUserUI();
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
   🌗 THÈME CLAIR/SOMBRE
===================================================== */

function toggleTheme() {
    document.body.classList.toggle("light");
    let theme = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", theme);
    showNotification(theme === "light" ? "☀️ Mode clair activé" : "🌙 Mode sombre activé");
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
            return `<span class="badge" style="background:${customBadges[b].color}">${customBadges[b].icon} ${b}</span>`;

        return "";
    }).join("");
}


/* =====================================================
   👑 PANEL ADMIN — AFFICHAGE
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
                <button onclick="resetPassword('${username}')" style="background:#4facfe;">🔑 Reset MDP</button>
                <button class="delete" onclick="deleteUser('${username}')">🗑 Supprimer</button>
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


/* =====================================================
   🔑 RESET MOT DE PASSE (admin) - AMÉLIORÉ
===================================================== */

function resetPassword(username) {
    if (localStorage.getItem("user") !== ADMIN_USER) return;
    
    let newPass = prompt("Nouveau mot de passe pour " + username + " :");

    if (!newPass) return;
    if (newPass.length < 4) return alert("Mot de passe trop court (min 4 caractères).");

    let users = getUsers();
    users[username].pass = newPass;
    saveUsers(users);

    showNotification(`🔑 Mot de passe réinitialisé pour ${username}`);
}


/* =====================================================
   ❌ SUPPRESSION UTILISATEUR - AMÉLIORÉ
===================================================== */

function deleteUser(username) {
    if (localStorage.getItem("user") !== ADMIN_USER) return;
    
    if (!confirm(`⚠️ ATTENTION !\n\nSupprimer définitivement l'utilisateur "${username}" ?\n\n- Tous ses posts seront supprimés\n- Tous ses commentaires seront supprimés\n- Cette action est IRRÉVERSIBLE`)) return;

    // Supprimer tous les posts de l'utilisateur
    let posts = getPosts().filter(p => p.user !== username);
    
    // Supprimer tous les commentaires de l'utilisateur
    posts = posts.map(p => {
        p.comments = p.comments.filter(c => c.user !== username);
        return p;
    });
    
    savePosts(posts);

    // Supprimer tous les tickets de l'utilisateur
    let tickets = getTickets().filter(t => t.user !== username);
    saveTickets(tickets);

    // Supprimer le compte
    let users = getUsers();
    delete users[username];
    saveUsers(users);

    showNotification(`🗑 Utilisateur "${username}" et tout son contenu supprimés !`);
    openAdminPanel();
}


/* =====================================================
   📨 SYSTEME DE TICKETS (AMÉLIORÉ)
===================================================== */

function openTicketPanel() {
    let tickets = getTickets();
    let user = localStorage.getItem("user");
    let isAdmin = user === ADMIN_USER;
    
    let html = "";

    tickets.forEach((t, i) => {
        let statusClass = t.status === "resolved" ? "resolved" : "pending";
        let statusText = t.status === "resolved" ? "✅ Résolu" : "⏳ En attente";
        
        html += `
        <div class="user-item" style="border-left:4px solid ${t.status === 'resolved' ? '#4caf50' : '#ff9800'};">
            <div style="flex:1;">
                <b>${t.user}</b> 
                <span style="font-size:11px;color:#aaa;margin-left:10px;">${new Date(t.date).toLocaleString()}</span>
                <br>
                <span style="color:${t.status === 'resolved' ? '#4caf50' : '#ff9800'};">${statusText}</span>
                <p style="margin:10px 0;">${t.msg}</p>
                
                ${t.response ? `
                    <div style="background:var(--bg);padding:10px;border-radius:5px;margin-top:10px;">
                        <b>Réponse admin :</b> ${t.response}
                    </div>
                ` : ""}
                
                ${isAdmin && t.status !== "resolved" ? `
                    <textarea id="response-${i}" placeholder="Répondre au ticket..." style="width:100%;margin-top:10px;"></textarea>
                    <button onclick="respondToTicket(${i})">📨 Répondre</button>
                    <button onclick="resolveTicket(${i})" style="background:#4caf50;">✅ Marquer résolu</button>
                ` : ""}
            </div>
            
            <div>
                ${(isAdmin || t.user === user) ? `
                    <button class="delete" onclick="deleteTicket(${i})">🗑</button>
                ` : ""}
            </div>
        </div>`;
    });

    if (!html) html = "<p style='text-align:center;color:#aaa;'>Aucun ticket pour le moment</p>";

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
    if (!user) return alert("Connecte-toi d'abord.");
    
    let tickets = getTickets();

    tickets.push({ 
        user, 
        msg, 
        date: Date.now(),
        status: "pending",
        response: null
    });
    
    saveTickets(tickets);

    ticketMessage.value = "";
    showNotification("📨 Ticket envoyé !");
    openTicketPanel();
}

function respondToTicket(index) {
    if (localStorage.getItem("user") !== ADMIN_USER) return;
    
    let response = document.getElementById(`response-${index}`).value.trim();
    if (!response) return alert("La réponse est vide.");
    
    let tickets = getTickets();
    tickets[index].response = response;
    saveTickets(tickets);
    
    showNotification("✅ Réponse envoyée !");
    openTicketPanel();
}

function resolveTicket(index) {
    if (localStorage.getItem("user") !== ADMIN_USER) return;
    
    let tickets = getTickets();
    tickets[index].status = "resolved";
    saveTickets(tickets);
    
    showNotification("✅ Ticket marqué comme résolu !");
    openTicketPanel();
}

function deleteTicket(i) {
    if (!confirm("Supprimer ce ticket ?")) return;
    
    let tickets = getTickets();
    tickets.splice(i, 1);
    saveTickets(tickets);
    openTicketPanel();
    showNotification("🗑 Ticket supprimé !");
}


/* =====================================================
   📝 CRÉATION DE POST
===================================================== */

function addPost() {
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
   📝 AFFICHAGE DES POSTS - AMÉLIORÉ
===================================================== */

function renderPosts() {
    let posts = getPosts();
    let user = localStorage.getItem("user");
    let filter = currentFilter;
    let query = searchInput.value.toLowerCase();

    // Filtre recherche
    posts = posts.filter(p => p.content.toLowerCase().includes(query));

    // Filtres par onglets (TOUS FONCTIONNELS)
    if (filter === "top") {
        posts.sort((a,b) => b.votes - a.votes);
    }
    else if (filter === "recent") {
        posts.sort((a,b) => b.date - a.date);
    }
    else if (filter === "mine") {
        posts = posts.filter(p => p.user === user);
    }
    else {
        // "all" - tri par date décroissante par défaut
        posts.sort((a,b) => b.date - a.date);
    }

    let html = "";

    posts.forEach(p => {
        let displayUser = p.anonymous ? "Anonyme" : p.user;
        let badges = p.anonymous ? "" : getBadgeHTML(p.user);

        let pfp = p.anonymous
            ? "https://i.imgur.com/CJH0pCj.
