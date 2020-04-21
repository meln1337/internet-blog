import React from 'react'
import { Card } from 'antd'
import { NavLink } from 'react-router-dom'
import './css/Posts.css'

const { Meta } = Card

const cutString = string => {
    if (string.length > 100) return `${string.substr(0, 100)}...`
}

export default ({ posts }) => (
    <div className="container posts-container">{posts.map(post => (
        <NavLink to={`/posts/${post._id}`} className="post-link">
            <Card
                className="post-card"
                hoverable
                cover={<img alt="example" src={post.img} className="post-img" />}
            >
                <Meta title={post.title} description={cutString(post.text)} />
            </Card>
        </NavLink>
    ))}</div>
)