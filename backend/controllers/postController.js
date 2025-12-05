const Post = require("../models/Post");
const cloudinary = require("../config/cloudinary");

exports.createPost = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      // Promisify upload_stream pour pouvoir await l'upload
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      if (result && result.secure_url) {
        imageUrl = result.secure_url;
      }
    }

    const post = await Post.create({
      author: req.user.id || req.user._id, // sécurité si structure du token diffère
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      image: imageUrl
    });

    res.status(201).json(post);
  } catch (err) {
    console.error("createPost error:", err);
    res.status(500).json({ message: "Erreur lors de la création du post", error: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const filter = {};
    // support pour filtrer par category via query si besoin
    if (req.query.category) filter.category = req.query.category;
    const posts = await Post.find(filter).populate("author", "username avatar");
    res.json(posts);
  } catch (err) {
    console.error("getPosts error:", err);
    res.status(500).json({ message: "Erreur lors de la récupération des posts" });
  }
};

exports.vote = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post non trouvé" });
    const value = Number(req.body.value) || 0;
    post.votes += value;
    await post.save();
    res.json(post);
  } catch (err) {
    console.error("vote error:", err);
    res.status(500).json({ message: "Erreur lors du vote" });
  }
};