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
    --border: #2a252;
    --muted: #9aa0c7;
    --success: #27ae60;
    --danger: #e74c3c;
    --warning: #f39c12;
}

.light {
    --bg: #f5f5f5;
    --bg2: #ffffff;
    --text: #000;
    --accent: #7a4cff;
    --accent2: #ff4cff;
    --box: #e6e6e6;
    --border: #cccccc;
    --muted: #666;
    --success: #27ae60;
    --danger: #e74c3c;
    --warning: #f39c12;
}

body {
    background: var(--bg);
    color: var(--text);
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 20px;
}

h1 {
    text-align: center;
    font-size: 36px;
    color: var(--accent2);
    text-shadow: 0 0 18px var(--accent);
    margin-bottom: 12px;
}

.box {
    background: var(--box);
    padding: 15px;
    border: 1px solid var(--border);
    border-radius: 12px;
    margin-bottom: 20px;
    box-shadow: 0 0 12px #0004;
}

input, textarea {
    width: 100%;
    padding: 10px;
    margin-top: 8px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--bg2);
    color: var(--text);
}

button {
    background: var(--accent);
    border: none;
    padding: 8px 14px;
    margin-top: 8px;
    border-radius: 8px;
    cursor: pointer;
    color: white;
    transition: 0.14s;
    font-weight: 600;
}

button:hover {
    background: var(--accent2);
    transform: translateY(-1px);
    box-shadow: 0 6px 18px #0008;
}

.post {
    background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent);
    padding: 14px;
    border-radius: 12px;
    margin-bottom: 14px;
    border-left: 4px solid var(--accent);
    overflow: hidden;
    transition: transform 0.15s, box-shadow 0.15s;
}

.post:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px #0008;
}

.vote-btn {
    padding: 6px 8px;
    border-radius: 8px;
    font-weight: 700;
    margin-right: 8px;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text);
}

.vote-btn:hover {
    background: rgba(255,255,255,0.03);
    color: var(--accent2);
}

.pfp {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--border);
}

.post-meta {
    display:flex;
    gap:10px;
    align-items:center;
    color:var(--muted);
    font-size:13px;
}

.comment {
    background: var(--bg2);
    padding: 10px;
    border-radius: 8px;
    margin-top: 8px;
    color: var(--text);
}

.notification {
    position: fixed;
    top: 80px;
    right: 20px;
    background: var(--accent);
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    box-shadow: 0 5px 20px #0007;
    animation: slideIn 0.28s;
    z-index: 1000;
}

@keyframes slideIn {
    from { transform: translateX(300px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

/* Badges */
.badge {
    display: inline-block;
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 700;
    margin-left: 8px;
    vertical-align: middle;
    color: white;
}

.badge-admin { background: linear-gradient(135deg,#667eea,#764ba2); box-shadow: 0 0 12px #667eea;}
.badge-vip { background: linear-gradient(135deg,#f093fb,#f5576c); }
.badge-verified { background: linear-gradient(135deg,#4facfe,#00f2fe); }
.badge-star { background: linear-gradient(135deg,#ffd89b,#19547b); }

/* Tickets */
.ticket-item {
    background: var(--box);
    border-radius: 10px;
    padding: 12px;
    margin-bottom: 10px;
    border-left: 4px solid var(--accent);
    display:flex;
    gap:10px;
    align-items:flex-start;
}

.ticket-meta { font-size:12px; color:var(--muted); }

.ticket-status.open { color: var(--warning); font-weight:700; }
.ticket-status.resolved { color: var(--success); font-weight:700; }

/* profile preview */
#profilePreview { width:80px; height:80px; border-radius:50%; object-fit:cover; border:2px solid var(--border); }

/* small UI tweaks */
.small { font-size:12px; color:var(--muted); }
.align-right { margin-left:auto; }

/* responsive */
@media (max-width:600px) {
    .post-meta { flex-wrap:wrap; gap:6px; }
}

/* badge-option (admin assign UI) */
.badge-option {
    padding:6px 8px;
    border-radius:12px;
    cursor:pointer;
    margin-right:6px;
    border:2px solid transparent;
    display:inline-flex;
    align-items:center;
    gap:6px;
    font-weight:700;
}
.badge-option.active {
    border-color: var(--accent);
    transform: scale(1.03);
}
</style>
</head>
<body>

<h1>🌌 NEBULA – Reddit Cosmique</h1>
<button class="theme-btn" onclick="toggleTheme()" style="position:fixed;top:20px;right:20px;">🌗 Mode Sombre / Clair</button>

<!-- Search -->
<div class="search-box box">
    <input id="searchInput" placeholder="🔍 Rechercher des posts..." oninput="filterPosts()">
</div>

<!-- Filter tabs -->
<div class="filter-tabs box" id="filterTabs" style="display:flex;gap:8px;flex-wrap:wrap;">
    <div class="tab active" data-filter="all" onclick="setFilter('all')">🌟 Tous</div>
    <div class="tab" data-filter="top" onclick="setFilter('top')">🔥 Populaires</div>
    <div class="tab" data-filter="recent" onclick="setFilter('recent')">⏰ Récents</div>
    <div class="tab" data-filter="mine" onclick="setFilter('mine')">👤 Mes posts</div>
</div>

<!-- Auth box -->
<div id="authBox" class="box">
    <h3>Connexion / Inscription</h3>
    <input id="username" placeholder="Nom d'utilisateur">
    <input id="password" type="password" placeholder="Mot de passe (min 4 caractères)">
    <div style="display:flex;gap:8px">
        <button onclick="register()">Créer un compte</button>
        <button onclick="login()">Connexion</button>
    </div>
    <div class="small" style="margin-top:8px;color:var(--muted)">Après inscription, connexion automatique.</div>
</div>

<!-- User area -->
<div id="userBox" class="box" style="display:none;">
    <img id="userPfp" class="pfp" src="">
    Connecté en tant que : <b id="currentUser"></b>
    <button id="myProfileBtn" onclick="openProfile()" style="margin-left:8px;">Mon Profil</button>
    <button id="adminPanelBtn" onclick="openAdminPanel()" style="display:none;background:#764ba2;margin-left:8px;">👑 Panel Admin</button>
    <button onclick="logout()" style="margin-left:8px;background:#e74c3c;">Se déconnecter</button>
</div>

<!-- New post -->
<div id="postBox" class="box" style="display:none;">
    <h3>Nouveau post</h3>
    <textarea id="postContent" placeholder="Écris quelque chose..."></textarea>

    <div style="display:flex;gap:8px;margin-top:8px;align-items:center">
        <label style="display:flex;gap:8px;align-items:center">
            <input type="checkbox" id="anonymousMode"> Poster en anonyme
        </label>
        <input type="file" id="postImage" accept="image/*" style="flex:1">
        <button onclick="addPost()">Publier</button>
    </div>
</div>

<!-- Posts container -->
<div id="posts"></div>

<!-- Profile modal -->
<div id="profilePage" class="box" style="display:none;position:relative;">
    <h2>Profil</h2>
    <div style="display:flex;gap:12px;align-items:center;">
        <img id="profilePicture" class="pfp" src="">
        <div>
            <p><b>Nom :</b> <span id="profileName"></span></p>
            <p><b>Karma :</b> <span id="profileKarma"></span> • <b>Posts :</b> <span id="profilePosts"></span></p>
            <p class="small"><b>Inscrit le :</b> <span id="profileSince"></span></p>
            <div id="profileBadges"></div>
        </div>
        <div class="align-right" style="margin-left:auto;text-align:right">
            <img id="profilePreview" src="" style="display:none;">
            <div style="margin-top:8px">
                <button id="changeProfileBtn" onclick="triggerProfileImagePick()" style="display:none;">Changer la photo</button>
                <button id="saveProfileImage" onclick="saveProfileImage()" style="display:none;">Enregistrer</button>
                <button id="cancelProfileImage" onclick="cancelProfileImage()" style="display:none;">Annuler</button>
            </div>
        </div>
    </div>

    <!-- hidden input for profile image -->
    <input type="file" id="profileImageInput" accept="image/*" style="display:none;">

    <button onclick="closeProfile()" style="margin-top:12px;">Fermer</button>
</div>

<!-- Admin modal -->
<div id="adminModal" class="modal" style="display:none;align-items:flex-start;">
    <div class="modal-content box" style="max-width:900px;">
        <h2>👑 Panel Admin</h2>
        <p class="small">Gestion des utilisateurs, badges, tickets et moderation</p>

        <div style="margin-top:12px;">
            <h3>Utilisateurs</h3>
            <div id="usersList"></div>
        </div>

        <div style="margin-top:12px;">
            <h3>Badges personnalisés</h3>

            <!-- NOTE: indicate that the option is in the admin panel -->
            <div class="small" style="margin-bottom:8px;color:var(--muted);">
                ℹ️ Cette option est disponible dans le Panel Admin — crée et attribue des badges depuis ici.
            </div>

            <div class="custom-badge-form" style="display:flex;gap:8px;align-items:center;">
                <input type="text" id="customBadgeName" placeholder="Nom du badge">
                <input type="text" id="customBadgeIcon" placeholder="Icône (emoji)">
                <input type="color" id="customBadgeColor" value="#ff0000">
                <button onclick="createCustomBadge()">Créer</button>
            </div>
            <div id="customBadgesList" style="margin-top:10px;"></div>
        </div>

        <button onclick="closeAdminPanel()" style="margin-top:12px;">Fermer</button>
    </div>
</div>

<!-- Ticket modal -->
<div id="ticketModal" class="modal" style="display:none;align-items:flex-start;">
    <div class="modal-content box" style="max-width:900px;">
        <h2>📨 Tickets de Support</h2>

        <div style="display:flex;gap:8px;align-items:center">
            <textarea id="ticketMessage" placeholder="Explique ton problème..." style="flex:1"></textarea>
            <button onclick="sendTicket()">Envoyer</button>
        </div>

        <hr>

        <h3>📋 Tickets envoyés</h3>
        <div id="ticketsList"></div>

        <button onclick="closeTicketPanel()" style="margin-top:12px;">Fermer</button>
    </div>
</div>

<!-- Support button -->
<button onclick="openTicketPanel()" style="position:fixed;bottom:20px;right:20px;background:#4facfe;padding:10px;border-radius:12px;">
    📨 Support
</button>

<script>
/* =====================================================
   Constants & DOM refs
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
const adminPanelBtn = document.getElementById('adminPanelBtn');
const userPfp = document.getElementById('userPfp');
const myProfileBtn = document.getElementById('myProfileBtn');

const profilePage = document.getElementById('profilePage');
const profilePicture = document.getElementById('profilePicture');
const profileName = document.getElementById('profileName');
const profilePosts = document.getElementById('profilePosts');
const profileKarma = document.getElementById('profileKarma');
const profileSince = document.getElementById('profileSince');
const profileBadges = document.getElementById('profileBadges');

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

let stagedProfileImageData = null;

/* Storage helpers */
function getUsers() { return JSON.parse(localStorage.getItem("users") || "{}"); }
function saveUsers(u) { localStorage.setItem("users", JSON.stringify(u)); }

function getPosts() { return JSON.parse(localStorage.getItem("posts") || "[]"); }
function savePosts(p) { localStorage.setItem("posts", JSON.stringify(p)); }

function getTickets() { return JSON.parse(localStorage.getItem("tickets") || "[]"); }
function saveTickets(t) { localStorage.setItem("tickets", JSON.stringify(t)); }

function getCustomBadges() { return JSON.parse(localStorage.getItem("customBadges") || "{}"); }

/* =====================================================
   Utility: time ago & format date
===================================================== */
function timeAgo(ts) {
    if (!ts) return "";
    const d = Math.floor((Date.now() - ts) / 1000);
    if (d < 10) return "À l'instant";
    if (d < 60) return `${d} s`;
    if (d < 3600) return `${Math.floor(d/60)} min`;
    if (d < 86400) return `${Math.floor(d/3600)} h`;
    if (d < 604800) return `${Math.floor(d/86400)} j`;
    const dt = new Date(ts);
    return dt.toLocaleString();
}
function formatDate(ts) {
    if (!ts) return "";
    const dt = new Date(ts);
    return dt.toLocaleString();
}

/* =====================================================
   Authentication (register/login/logout)
   - password min 4 chars
   - set createdAt date
   - auto-login after registration
===================================================== */

function register() {
    const user = username.value.trim();
    const pass = password.value.trim();

    if (!user || !pass) return alert("Champs vides.");
    if (pass.length < 4) return alert("Mot de passe trop court (min 4 caractères).");

    const users = getUsers();
    const usernames = Object.keys(users).map(u => u.toLowerCase());
    if (usernames.includes(user.toLowerCase())) return alert("Nom d'utilisateur déjà pris.");

    users[user] = {
        pass,
        pfp: "",
        karma: 0,
        badges: [],
        createdAt: Date.now()
    };

    saveUsers(users);

    // Auto login
    localStorage.setItem('user', user);
    loadUserUI();
    showNotification("✅ Compte créé et connecté !");
}

function login() {
    const user = username.value.trim();
    const pass = password.value.trim();

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        localStorage.setItem("user", user);
        loadUserUI();
        return;
    }

    const users = getUsers();
    if (!users[user] || users[user].pass !== pass) {
        return alert("Identifiants incorrects.");
    }

    localStorage.setItem("user", user);
    loadUserUI();
}

function logout() {
    localStorage.removeItem("user");
    location.reload();
}

/* =====================================================
   UI: load user interface
===================================================== */
function loadUserUI() {
    const user = localStorage.getItem("user");
    if (!user) return;

    authBox.style.display = "none";
    userBox.style.display = "block";
    postBox.style.display = "block";

    currentUser.textContent = user;
    adminPanelBtn.style.display = user === ADMIN_USER ? "inline-block" : "none";

    const users = getUsers();
    const pfp = user === ADMIN_USER ? "https://i.imgur.com/0YzJ6aC.png" : (users[user]?.pfp || "https://i.imgur.com/4ZQZ4Fc.png");
    userPfp.src = pfp;
}

/* =====================================================
   Notifications helper
===================================================== */
function showNotification(msg) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = msg;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

/* =====================================================
   Badges rendering
===================================================== */
function getBadgeHTML(username) {
    if (!username) return "";
    if (username === ADMIN_USER) return '<span class="badge badge-admin">👑 Admin</span>';

    const users = getUsers();
    const u = users[username];
    if (!u || !u.badges) return "";

    const customBadges = getCustomBadges();

    return u.badges.map(b => {
        if (b === "vip") return '<span class="badge badge-vip">💎 VIP</span>';
        if (b === "verified") return '<span class="badge badge-verified">✓ Vérifié</span>';
        if (b === "star") return '<span class="badge badge-star">⭐ Star</span>';
        if (customBadges[b]) return `<span class="badge" style="background:${customBadges[b].color}">${customBadges[b].icon || ''} ${b}</span>`;
        return '';
    }).join(' ');
}

/* =====================================================
   Admin: users list, delete user, reset password
   - delete removes user, all posts, all comments by user, and user's tickets
   - also renders and manages custom badges and assignment UI
===================================================== */

function openAdminPanel() {
    if (localStorage.getItem("user") !== ADMIN_USER) return;
    const users = getUsers();
    const custom = getCustomBadges();

    // Users list with badge assignment controls
    let html = '';
    for (let uname in users) {
        if (uname === ADMIN_USER) continue;
        const u = users[uname];

        // Build badge selector HTML (standard + custom)
        let badgeSelectorHtml = '';
        const standardBadges = [
            { key: 'vip', label: '💎 VIP' },
            { key: 'verified', label: '✓ Vérifié' },
            { key: 'star', label: '⭐ Star' }
        ];

        standardBadges.forEach(b => {
            const active = (u.badges || []).includes(b.key) ? 'active' : '';
            badgeSelectorHtml += `<div class="badge-option ${active}" onclick="toggleBadge('${uname}','${b.key}', this)">${b.label}</div>`;
        });

        // custom badges
        for (let cb in custom) {
            const active = (u.badges || []).includes(cb) ? 'active' : '';
            badgeSelectorHtml += `<div class="badge-option ${active}" style="background:${custom[cb].color}" onclick="toggleBadge('${uname}','${cb}', this)">${custom[cb].icon || ''} ${cb}</div>`;
        }

        html += `<div class="user-item" style="display:flex;align-items:center;justify-content:space-between;padding:8px;border:1px solid var(--border);margin-bottom:8px;border-radius:8px;">
            <div style="display:flex;gap:10px;align-items:center;">
                <img class="pfp" src="${u.pfp || 'https://i.imgur.com/4ZQZ4Fc.png'}" style="width:36px;height:36px;">
                <div>
                  <b>${uname}</b> <div class="small">${u.karma || 0} karma • inscrit ${formatDate(u.createdAt)}</div>
                  <div style="margin-top:6px;">${getBadgeHTML(uname)}</div>
                  <div style="margin-top:8px;">${badgeSelectorHtml}</div>
                </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;">
                <button onclick="resetPassword('${uname}')">🔑 Reset</button>
                <button onclick="deleteUser('${uname}')" style="background:var(--danger);">🗑 Supprimer</button>
            </div>
        </div>`;
    }
    usersList.innerHTML = html;

    // Custom badges list (editable)
    const customListEl = document.getElementById('customBadgesList');
    let cbHtml = '';
    const customKeys = Object.keys(custom || {});
    if (customKeys.length === 0) {
        cbHtml = '<div class="small">Aucun badge personnalisé</div>';
    } else {
        customKeys.forEach(cb => {
            const b = custom[cb];
            cbHtml += `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px;border:1px solid var(--border);margin-bottom:6px;border-radius:8px;">
                <div style="display:flex;align-items:center;gap:10px;">
                    <div class="badge" style="background:${b.color};padding:6px 10px;">${b.icon || ''} ${cb}</div>
                    <div class="small">${b.color}</div>
                </div>
                <div>
                    <button onclick="deleteCustomBadge('${cb}')" style="background:var(--danger)">Supprimer</button>
                </div>
            </div>`;
        });
    }
    customListEl.innerHTML = cbHtml;

    document.getElementById('adminModal').style.display = 'flex';
}

function closeAdminPanel() {
    document.getElementById('adminModal').style.display = 'none';
}

function resetPassword(username) {
    if (localStorage.getItem('user') !== ADMIN_USER) return;
    if (!confirm(`Réinitialiser le mot de passe de ${username} ?`)) return;
    const newPass = prompt('Nouveau mot de passe (min 4 caractères)');
    if (!newPass || newPass.length < 4) return alert('Mot de passe invalide.');
    const users = getUsers();
    users[username].pass = newPass;
    saveUsers(users);
    showNotification(`🔑 Mot de passe réinitialisé pour ${username}`);
}

function deleteUser(username) {
    if (localStorage.getItem('user') !== ADMIN_USER) return;
    if (!confirm(`Supprimer l'utilisateur ${username} ET TOUT son contenu ? Cela supprimera posts, commentaires et tickets.`)) return;

    // remove posts by user
    let posts = getPosts();
    posts = posts.filter(p => p.user !== username);

    // remove comments by user (iterate remaining posts)
    posts.forEach(p => {
        if (!p.comments) return;
        p.comments = p.comments.filter(c => c.user !== username);
    });

    savePosts(posts);

    // remove tickets by user
    let tickets = getTickets();
    tickets = tickets.filter(t => t.user !== username);
    saveTickets(tickets);

    // remove account
    const users = getUsers();
    delete users[username];
    saveUsers(users);

    showNotification(`🗑 Utilisateur ${username} et tout son contenu supprimé.`);
    openAdminPanel();
}

/* =====================================================
   Custom badges management
   createCustomBadge() and deleteCustomBadge(name)
===================================================== */

function createCustomBadge() {
    if (localStorage.getItem('user') !== ADMIN_USER) return alert("Accès admin requis.");
    const nameEl = document.getElementById('customBadgeName');
    const iconEl = document.getElementById('customBadgeIcon');
    const colorEl = document.getElementById('customBadgeColor');

    const name = (nameEl && nameEl.value || '').trim();
    const icon = (iconEl && iconEl.value || '').trim();
    const color = (colorEl && colorEl.value) || '#ff0000';

    if (!name) return alert('Nom de badge vide.');

    const badges = getCustomBadges();
    if (badges[name]) return alert('Un badge avec ce nom existe déjà.');

    badges[name] = { icon, color };
    localStorage.setItem('customBadges', JSON.stringify(badges));

    // reset inputs
    if (nameEl) nameEl.value = '';
    if (iconEl) iconEl.value = '';
    if (colorEl) colorEl.value = '#ff0000';

    showNotification(`🎖 Badge personnalisé "${name}" créé !`);
    openAdminPanel();
}

function deleteCustomBadge(name) {
    if (localStorage.getItem('user') !== ADMIN_USER) return alert("Accès admin requis.");
    if (!confirm(`Supprimer le badge personnalisé "${name}" ?`)) return;
    const badges = getCustomBadges();
    delete badges[name];
    localStorage.setItem('customBadges', JSON.stringify(badges));
    showNotification(`❌ Badge "${name}" supprimé.`);
    openAdminPanel();
}

/* =====================================================
   Badge assignment: toggleBadge(username, badge)
   - works for standard and custom badges
   - updates users[username].badges and refreshes admin panel
===================================================== */
function toggleBadge(username, badge, elm) {
    if (localStorage.getItem('user') !== ADMIN_USER) return alert("Accès admin requis.");
    const users = getUsers();
    if (!users[username]) return alert("Utilisateur introuvable.");

    users[username].badges = users[username].badges || [];
    const idx = users[username].badges.indexOf(badge);
    if (idx >= 0) {
        users[username].badges.splice(idx,1);
        showNotification(`❌ Badge "${badge}" retiré à ${username}`);
    } else {
        users[username].badges.push(badge);
        showNotification(`✅ Badge "${badge}" attribué à ${username}`);
    }
    saveUsers(users);

    // Update the element visual state quickly (if provided)
    if (elm) {
        elm.classList.toggle('active');
    }
    // Refresh admin panel to reflect changes in other UI places
    openAdminPanel();
}

/* =====================================================
   Tickets: send, render, admin reply, mark resolved, delete
===================================================== */

function openTicketPanel() {
    renderTicketList();
    document.getElementById('ticketModal').style.display = 'flex';
}

function closeTicketPanel() {
    document.getElementById('ticketModal').style.display = 'none';
}

function sendTicket() {
    const msg = ticketMessage.value.trim();
    if (!msg) return alert('Le message est vide.');
    const user = localStorage.getItem('user') || 'Anonyme';
    const tickets = getTickets();
    tickets.push({
        user,
        msg,
        status: 'En attente',
        createdAt: Date.now(),
        replies: []
    });
    saveTickets(tickets);
    ticketMessage.value = '';
    showNotification('📨 Ticket envoyé !');
    renderTicketList();
}

function renderTicketList() {
    const tickets = getTickets();
    if (!tickets.length) {
        ticketsList.innerHTML = '<div class="small">Aucun ticket</div>';
        return;
    }
    let html = '';
    tickets.forEach((t, i) => {
        html += `<div class="ticket-item">
            <div style="flex:1">
                <div style="display:flex;align-items:center;gap:8px;">
                    <b>${t.user}</b>
                    <span class="small">${timeAgo(t.createdAt)} • ${formatDate(t.createdAt)}</span>
                    <span class="ticket-status ${t.status === 'Résolu' ? 'resolved' : 'open'}" style="margin-left:8px">${t.status}</span>
                </div>
                <div style="margin-top:6px;">${t.msg}</div>
                <div style="margin-top:8px;">${(t.replies||[]).map(r=>`<div class="comment small"><b>${r.by}</b> • ${timeAgo(r.at)}<div>${r.msg}</div></div>`).join('')}</div>
            </div>

            <div style="display:flex;flex-direction:column;gap:8px;margin-left:10px;">
                ${localStorage.getItem('user') === ADMIN_USER ? `
                    <textarea id="reply-input-${i}" placeholder="Répondre..." style="width:220px;height:60px;"></textarea>
                    <button onclick="replyToTicket(${i})">Répondre</button>
                    <button onclick="markTicketResolved(${i})" style="background:var(--success)">Marquer résolu</button>
                ` : `
                    ${t.status !== 'Résolu' ? `<button onclick="markMyTicket(${i})">Marquer comme résolu (si résolu)</button>` : ``}
                `}
                <button onclick="deleteTicket(${i})" style="background:var(--danger)">Suppr.</button>
            </div>
        </div>`;
    });
    ticketsList.innerHTML = html;
}

function replyToTicket(i) {
    if (localStorage.getItem('user') !== ADMIN_USER) return;
    const el = document.getElementById(`reply-input-${i}`);
    if (!el) return;
    const text = el.value.trim();
    if (!text) return alert('Réponse vide.');
    const tickets = getTickets();
    tickets[i].replies = tickets[i].replies || [];
    tickets[i].replies.push({ by: ADMIN_USER, msg: text, at: Date.now() });
    tickets[i].status = 'En attente';
    saveTickets(tickets);
    showNotification('✉️ Répondu au ticket.');
    renderTicketList();
}

function markTicketResolved(i) {
    if (localStorage.getItem('user') !== ADMIN_USER) return;
    const tickets = getTickets();
    tickets[i].status = 'Résolu';
    tickets[i].resolvedAt = Date.now();
    saveTickets(tickets);
    showNotification('✅ Ticket marqué comme résolu.');
    renderTicketList();
}

function markMyTicket(i) {
    const user = localStorage.getItem('user') || 'Anonyme';
    const tickets = getTickets();
    if (tickets[i].user !== user) return alert("Vous ne pouvez marquer que vos propres tickets.");
    if (!confirm("Marquer ce ticket comme résolu ?")) return;
    tickets[i].status = 'Résolu';
    tickets[i].resolvedAt = Date.now();
    saveTickets(tickets);
    renderTicketList();
}

function deleteTicket(i) {
    if (!confirm("Supprimer ce ticket ?")) return;
    const tickets = getTickets();
    tickets.splice(i,1);
    saveTickets(tickets);
    renderTicketList();
}

/* =====================================================
   Posts: create, save, render
===================================================== */

function addPost() {
    if (!localStorage.getItem('user')) return alert("Tu dois être connecté pour poster.");
    const content = postContent.value.trim();
    if (!content) return alert("Le post est vide.");

    if (postImage.files[0]) {
        const reader = new FileReader();
        reader.onload = () => savePost(content, reader.result);
        reader.readAsDataURL(postImage.files[0]);
    } else {
        savePost(content, "");
    }
}

function savePost(content, img) {
    const posts = getPosts();
    const user = localStorage.getItem('user');
    const post = {
        id: Date.now(),
        user,
        content,
        img,
        date: Date.now(),
        votes: 0,
        comments: [],
        anonymous: !!anonymousMode.checked
    };
    posts.unshift(post);
    savePosts(posts);
    postContent.value = '';
    postImage.value = '';
    anonymousMode.checked = false;
    showNotification("🚀 Post publié !");
    renderPosts();
}

function renderPosts() {
    let posts = getPosts();
    const me = localStorage.getItem('user');
    const filter = currentFilter || 'all';
    const query = (searchInput && searchInput.value) ? searchInput.value.toLowerCase() : '';

    // search filter
    if (query) posts = posts.filter(p => p.content.toLowerCase().includes(query));

    // filters
    if (filter === 'top') posts.sort((a,b) => b.votes - a.votes);
    else if (filter === 'recent') posts.sort((a,b) => b.date - a.date);
    else if (filter === 'mine') posts = posts.filter(p => p.user === me);

    let html = '';
    if (posts.length === 0) {
        html = '<div class="box small">Aucun post pour le moment.</div>';
    } else {
        posts.forEach(p => {
            const displayUser = p.anonymous ? 'Anonyme' : p.user;
            const badges = p.anonymous ? '' : getBadgeHTML(p.user);
            const pfp = p.anonymous ? 'https://i.imgur.com/CJH0pCj.png' : (getUsers()[p.user]?.pfp || 'https://i.imgur.com/4ZQZ4Fc.png');

            html += `<div class="post">
                <div style="display:flex;align-items:center;gap:10px;">
                    <img class="pfp" src="${pfp}">
                    <div style="flex:1">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <b style="cursor:pointer" onclick="openProfile('${p.user}')">${displayUser}</b>
                            ${badges}
                            <div class="post-meta">${timeAgo(p.date)} • ${formatDate(p.date)}</div>
                        </div>
                        <div style="margin-top:8px;font-size:15px">${escapeHtml(p.content)}</div>
                    </div>
                </div>
                ${p.img ? `<img src="${p.img}" style="max-width:100%;border-radius:8px;margin-top:10px;">` : ''}
                <div style="margin-top:10px;display:flex;align-items:center;">
                    <button class="vote-btn" onclick="vote(${p.id},1)">▲</button>
                    <div class="small" style="width:40px;text-align:center">${p.votes}</div>
                    <button class="vote-btn" onclick="vote(${p.id},-1)">▼</button>
                    <button onclick="toggleComments(${p.id})" style="margin-left:12px;">💬 Commentaires (${p.comments?.length || 0})</button>
                    ${(me === p.user || me === ADMIN_USER) ? `<button class="small" style="margin-left:auto;background:var(--danger)" onclick="deletePost(${p.id})">🗑 Suppr.</button>` : ''}
                </div>
                <div id="comments-${p.id}" style="display:none;margin-top:10px;">
                    <textarea id="comment-input-${p.id}" placeholder="Ajouter un commentaire..."></textarea>
                    <button onclick="addComment(${p.id})">Publier</button>
                    <div id="comment-list-${p.id}">${renderCommentsHTML(p)}</div>
                </div>
            </div>`;
        });
    }
    postsContainer.innerHTML = html;
}

function renderCommentsHTML(post) {
    const me = localStorage.getItem('user');
    return (post.comments || []).map((c,i) => `
        <div class="comment">
            <b>${c.user}</b> <span class="small">• ${timeAgo(c.at)}</span>
            <div style="margin-top:6px;">${escapeHtml(c.text)}</div>
            ${(c.user === me || me === ADMIN_USER) ? `<button style="background:var(--danger);margin-top:6px;" onclick="deleteComment(${post.id},${i})">x</button>` : ''}
        </div>
    `).join('');
}

/* escape HTML to avoid injection in content */
function escapeHtml(s) {
    return (s+'').replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; });
}

/* votes */
function vote(id, val) {
    const posts = getPosts();
    const p = posts.find(x => x.id === id);
    if (!p) return;
    p.votes += val;
    savePosts(posts);

    // update karma for author
    const users = getUsers();
    if (users[p.user]) {
        // recompute karma as sum of votes
        const allPosts = getPosts().filter(pp => pp.user === p.user);
        users[p.user].karma = allPosts.reduce((s,pp) => s + (pp.votes||0), 0);
        saveUsers(users);
    }
    renderPosts();
}

/* comments */
function toggleComments(id) {
    const box = document.getElementById('comments-' + id);
    if (!box) return;
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
}

function addComment(id) {
    if (!localStorage.getItem('user')) return alert("Tu dois être connecté pour commenter.");
    const posts = getPosts();
    const p = posts.find(x => x.id === id);
    if (!p) return;
    const textEl = document.getElementById('comment-input-' + id);
    const text = textEl.value.trim();
    if (!text) return;
    p.comments = p.comments || [];
    p.comments.push({ user: localStorage.getItem('user'), text, at: Date.now() });
    savePosts(posts);
    textEl.value = '';
    renderPosts();
}

function deleteComment(postId, index) {
    if (!confirm("Supprimer ce commentaire ?")) return;
    const posts = getPosts();
    const p = posts.find(x => x.id === postId);
    if (!p) return;
    p.comments.splice(index,1);
    savePosts(posts);
    renderPosts();
}

/* delete post */
function deletePost(id) {
    if (!confirm("Supprimer ce post ?")) return;
    let posts = getPosts();
    const p = posts.find(x => x.id === id);
    if (!p) return;
    posts = posts.filter(x => x.id !== id);
    savePosts(posts);
    renderPosts();
}

/* =====================================================
   Filters
===================================================== */
let currentFilter = 'all';
function setFilter(f) {
    currentFilter = f;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    const tab = Array.from(document.querySelectorAll('.tab')).find(t => t.getAttribute('data-filter') === f);
    if (tab) tab.classList.add('active');
    renderPosts();
}
function filterPosts() { renderPosts(); }

/* =====================================================
   Theme
===================================================== */
function applyTheme(theme) {
    if (theme === 'light') document.documentElement.classList.add('light');
    else document.documentElement.classList.remove('light');
    localStorage.setItem('theme', theme);
}
function toggleTheme() {
    const current = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
}

/* =====================================================
   Profile: open, pick image, save, cancel
===================================================== */
function openProfile(username) {
    const viewer = localStorage.getItem('user');
    const target = username || viewer;
    if (!target) return alert('Aucun utilisateur sélectionné.');

    const users = getUsers();
    const u = users[target] || {};
    profileName.textContent = target;
    profilePicture.src = u.pfp || 'https://i.imgur.com/4ZQZ4Fc.png';
    profilePreview.style.display = 'none';
    profilePreview.src = '';

    const posts = getPosts().filter(p => p.user === target);
    profilePosts.textContent = posts.length;
    profileKarma.textContent = u.karma || 0;
    profileSince.textContent = u.createdAt ? formatDate(u.createdAt) : '-';
    profileBadges.innerHTML = getBadgeHTML(target) || '<span class="small">Aucun badge</span>';

    if (viewer && viewer === target) {
        changeProfileBtn.style.display = 'inline-block';
    } else {
        changeProfileBtn.style.display = 'none';
    }

    stagedProfileImageData = null;
    document.getElementById('profilePage').style.display = 'block';
}

function closeProfile() {
    document.getElementById('profilePage').style.display = 'none';
    profileImageInput.value = '';
    profilePreview.style.display = 'none';
    stagedProfileImageData = null;
}

function trigger_profileImagePick_compat() {
    profileImageInput.click();
}

function triggerProfileImagePick() {
    profileImageInput.click();
}

profileImageInput.addEventListener('change', function() {
    const file = profileImageInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        stagedProfileImageData = reader.result;
        profilePreview.src = stagedProfileImageData;
        profilePreview.style.display = 'block';
        saveProfileImageBtn.style.display = 'inline-block';
        cancelProfileImageBtn.style.display = 'inline-block';
        profilePicture.src = stagedProfileImageData;
    };
    reader.readAsDataURL(file);
});

function saveProfileImage() {
    const username = localStorage.getItem('user');
    if (!username) return alert("Tu dois être connecté pour changer la photo.");
    if (!stagedProfileImageData) return alert("Aucune image sélectionnée.");
    const users = getUsers();
    users[username] = users[username] || { pass:'', pfp:'', karma:0, badges:[], createdAt: Date.now() };
    users[username].pfp = stagedProfileImageData;
    saveUsers(users);
    userPfp.src = stagedProfileImageData;
    profilePicture.src = stagedProfileImageData;
    profilePreview.style.display = 'none';
    profileImageInput.value = '';
    saveProfileImageBtn.style.display = 'none';
    cancelProfileImageBtn.style.display = 'none';
    stagedProfileImageData = null;
    showNotification('✅ Photo de profil mise à jour !');
    renderPosts();
}

function cancelProfileImage() {
    const username = localStorage.getItem('user');
    const users = getUsers();
    profilePicture.src = users[username]?.pfp || 'https://i.imgur.com/4ZQZ4Fc.png';
    profilePreview.style.display = 'none';
    profileImageInput.value = '';
    stagedProfileImageData = null;
    saveProfileImageBtn.style.display = 'none';
    cancelProfileImageBtn.style.display = 'none';
}

/* =====================================================
   Init on load
===================================================== */
window.onload = () => {
    // apply theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // Setup tab click listeners (already have inline onclick, but keep reliable)
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const f = tab.getAttribute('data-filter');
            setFilter(f);
        });
    });

    // Show user UI if logged
    if (localStorage.getItem('user')) loadUserUI();

    renderPosts();
};

/* close modals on outside click */
window.onclick = function(e) {
    const adminModal = document.getElementById('adminModal');
    const ticketModal = document.getElementById('ticketModal');
    if (e.target === adminModal) adminModal.style.display = 'none';
    if (e.target === ticketModal) ticketModal.style.display = 'none';
};
</script>

</body>
</html>
