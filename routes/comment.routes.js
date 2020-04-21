const { Router } = require('express')
const Comment = require('../models/comment.model')
const router = Router()

router.post('/comments', async (req, res) => {
    const { authorId, text, postId } = req.body.comment

    const comment = new Comment({ authorId, text, postId })

    const savedComment = await comment.save()

    res.status(201).json({ comment: savedComment, postId })
})

router.get('/comments/:postId', async (req, res) => {
    const comments = await Comment.find({ postId: req.params.postId })
    res.json({ data: comments, postId: req.params.postId })
})

module.exports = router