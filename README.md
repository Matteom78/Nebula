<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mini Réseau Social</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f4f4f4;
        }
        h1 {
            text-align: center;
        }
        .post-form, .post {
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        textarea {
            width: 100%;
            height: 70px;
            padding: 8px;
        }
        button {
            padding: 10px 15px;
            background: #007bff;
            border: none;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background: #0056b3;
        }
        .comment {
            margin-left: 20px;
            padding: 8px;
            background: #eee;
            border-radius: 5px;
            margin-top: 5px;
        }
        input[type="text"] {
            width: 80%;
            padding: 6px;
        }
    </style>
</head>
<body>

<h1>Mini Réseau Social</h1>

<div class="post-form">
    <h3>Créer un post</h3>
    <textarea id="postContent" placeholder="Écris quelque chose..."></textarea>
    <br><br>
    <button onclick="addPost()">Publier</button>
</div>

<div id="posts"></div>

<script>
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    function savePosts() {
        localStorage.setItem("posts", JSON.stringify(posts));
    }

    function addPost() {
        const content = document.getElementById("postContent").value;
        if (!content.trim()) return;
        
        posts.unshift({
            id: Date.now(),
            content: content,
            comments: []
        });
        
        document.getElementById("postContent").value = "";
        savePosts();
        displayPosts();
    }

    function addComment(postId) {
        const input = document.getElementById("comment-" + postId);
        const text = input.value;
        if (!text.trim()) return;

        const post = posts.find(p => p.id === postId);
        post.comments.push(text);

        input.value = "";
        savePosts();
        displayPosts();
    }

    function displayPosts() {
        const container = document.getElementById("posts");
        container.innerHTML = "";

        posts.forEach(post => {
            const div = document.createElement("div");
            div.className = "post";
            
            div.innerHTML = `
                <p>${post.content}</p>
                <h4>Commentaires :</h4>
                ${post.comments.map(c => `<div class="comment">${c}</div>`).join("")}
                <input id="comment-${post.id}" type="text" placeholder="Ajouter un commentaire">
                <button onclick="addComment(${post.id})">Commenter</button>
            `;

            container.appendChild(div);
        });
    }

    displayPosts();
</script>

</body>
</html>
