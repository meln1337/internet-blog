import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setPostsByCategoryThunk } from '../redux/actions'
import Posts from '../components/Posts'
import Spinner from '../components/Spinner'

class PostsByCategoryContainer extends Component {
    componentDidMount() {
        this.props.setPostsByCategory(this.props.category)
    }

    componentDidUpdate() {
        if (!this.props.postReducer.categories.hasOwnProperty(this.props.category)) this.props.setPostsByCategory(this.props.category)
    }

    render() {
        return this.props.posts ? <Posts posts={this.props.posts} /> : <Spinner />
    }
}

const mapStateToProps = ({ postReducer }, { match }) => ({
    posts: postReducer.categories[match.params.category],
    category: match.params.category,
    postReducer: postReducer
})

const mapDispatchToProps = dispatch => ({
    setPostsByCategory: category => dispatch(setPostsByCategoryThunk({ category }))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostsByCategoryContainer))
