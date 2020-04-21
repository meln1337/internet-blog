import React, { Component } from 'react'
import { setPostsThunk } from '../redux/actions'
import { connect } from 'react-redux'
import Posts from '../components/Posts'
import Spinner from '../components/Spinner'

class PostsContainer extends Component {
    componentDidMount() {
        if (this.props.posts.length < 2) this.props.setPosts()
    }

    render() {
        return this.props.posts ? <Posts posts={this.props.posts} /> : <Spinner /> 
    }
}

const mapStateToProps = ({ postReducer }) => ({
    posts: postReducer.posts
})

const mapDispatchToProps = dispatch => ({
    setPosts: () => dispatch(setPostsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer)