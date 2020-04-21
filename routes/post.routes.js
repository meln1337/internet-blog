const { Router } = require('express')
const Post = require('../models/post.model')
const { check, validationResult } = require('express-validator')
const path = require('path')
const router = Router()

router.get('/posts', async (req, res) => {
    const posts = await Post.find({})
    res.json(posts)
})

router.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.json({ post })
})

router.get('/categories/:category', async (req, res) => {
    const posts = await Post.find({ categories: req.params.category })
    res.json(posts)
})

router.post('/posts', [
    check('title', 'Post title length must be greater than 10 and less than 250 symbols').isLength({ min: 10, max: 250 }),
    check('text', 'Post text length must be greater than 300 symbols').isLength({ min: 300 })
], async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })

    const { title, text, author, img } = req.body
    const post = new Post({ title, text, author, img })
    const savedPost = await post.save()

    res.status(201).json({ post: savedPost })
})

router.get('/postsByName/:name', async (req, res) => {
    const posts = await Post.find({ title: { $regex: req.params.name, $options: 'i' }})
    res.json({ posts })
})

module.exports = router