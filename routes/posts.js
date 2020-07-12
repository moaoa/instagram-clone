const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const auth = require("../helpers/auth");
let acceptLikeRequest = true;

router.get("/", async (req, res) => {
  const posts = await Post.find()
    .populate("createdBy", "name _id")
    .populate("comments.createdBy", "name _id");
  res.json({ posts });
});

router.get("/myposts", auth, async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.user._id });
    res.json({ posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
});

router.post("/", auth, async (req, res) => {
  const { title, body, imgUrl } = req.body;
  console.log("img url: ", imgUrl);

  if (!title || !body)
    return res.status(400).json({ msg: "Provide All Fields" });

  const post = new Post({ title, body, createdBy: req.user, imgUrl });
  try {
    await post.save();
    return res.status(201).json({ post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something Went Wrong" });
  }
});

router.put("/like", auth, (req, res) => {
  if (!req.body.postId) return res.status(400).json({ msg: "provide post id" });
  if (!acceptLikeRequest)
    return res
      .status(429)
      .json({ msg: "to many requests try again after a minet " });
  acceptLikeRequest = false;
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ msg: err });
    }
    acceptLikeRequest = true;
    res.json(result);
  });
});

router.put("/unlike", auth, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      console.log(err);

      return res.status(422).json({ msg: err });
    }
    res.json(result);
  });
});

router.put("/comment", auth, (req, res) => {
  const { postId, text } = req.body;
  Post.findByIdAndUpdate(
    postId,
    {
      $push: { comments: { text: text, createdBy: req.user._id } },
    },
    { new: true }
  )
    .populate("comments.createdBy", "name _id")
    .exec((err, result) => {
      if (err) return res.status(422).json({ msg: err });
      console.log(result);
      res.json({ result });
    });
});

module.exports = router;
