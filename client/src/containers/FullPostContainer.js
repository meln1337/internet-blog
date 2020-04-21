import React, { Component } from 'react'
import { setPostThunk, setCommentsThunk, addCommentThunk } from '../redux/actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import FullPost from '../components/FullPost'
import Spinner from '../components/Spinner'

class FullPostContainer extends Component {
    componentDidMount() {
        debugger
        if (!this.props.post) this.props.setPost(this.props.id)
        if (!this.props.comments) this.props.setComments(this.props.id)
    }

    componentDidUpdate(prevProps) {
        debugger
        if (this.props.id !== prevProps.id) {
            if (!this.props.post) this.props.setPost(this.props.id)
            if (!this.props.comments) this.props.setComments(this.props.id)
        }
    }

    render() {
        return this.props.post ? 
            <FullPost 
                title={this.props.post.title} 
                text={this.props.post.text} 
                title={this.props.post.title} 
                timestamps={this.props.post.timestamps} 
                authorName={this.props.post.authorName}
                img={this.props.post.img}
                user={this.props.user}
                comments={this.props.comments}
                authorId={this.props.post.authorId}
                addComment={this.props.addComment}
                postId={this.props.id}
                userId={this.props.user.id}
            /> : <Spinner />
    }
}

const mapStateToProps = ({ postReducer, authReducer }, { match }) => ({
    post: postReducer.posts.filter(post => post._id === match.params.id)[0],
    comments: postReducer.comments[match.params.id],
    user: authReducer.user,
    id: match.params.id
})

const mapDispatchToProps = dispatch => ({
    setPost: id => dispatch(setPostThunk({ id })),
    setComments: postId => dispatch(setCommentsThunk({ postId })),
    addComment: comment => dispatch(addCommentThunk({ comment }))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FullPostContainer))