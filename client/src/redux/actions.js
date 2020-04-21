import { SET_POSTS, SET_POST, SET_POSTS_BY_CATEGORY, SET_SHOW_MODAL, SET_SHOW_MODAL_NEGATIVE, SET_SHOW_MODAL_AUTH, SET_SHOW_MODAL_NEGATIVE_AUTH, SET_ERRORS, SET_USER, SET_COMMENTS, SET_POSTS_BY_NAME, ADD_COMMENT } from './types'

const setPostsAC = payload => ({ type: SET_POSTS, payload })
const setPostAC = payload => ({ type: SET_POST, payload })
const setPostsByCategoryAC = payload => ({ type: SET_POSTS_BY_CATEGORY, payload })
const setErrorsAC = payload => ({ type: SET_ERRORS, payload })
const setPostsByNameAC = payload => ({ type: SET_POSTS_BY_NAME, payload })
const addPostAC = payload => ({ type: ADD_COMMENT, payload })
export const setShowModalAC = payload => ({ type: SET_SHOW_MODAL, payload })
export const setShowModalNegativeAC = payload => ({ type: SET_SHOW_MODAL_NEGATIVE, payload })
export const setShowModalAuthAC = payload => ({ type: SET_SHOW_MODAL_AUTH, payload })
export const setShowModalNegativeAuthAC = payload => ({ type: SET_SHOW_MODAL_NEGATIVE_AUTH, payload })
export const setUserAC = payload => ({ type: SET_USER, payload })
export const setCommentsAC = payload => ({ type: SET_COMMENTS, payload })

export const setPostsThunk = () => async dispatch => {
    const response = await fetch('/api/posts')
    const data = await response.json()
    dispatch(setPostsAC(data))
}

export const setPostThunk = ({ id }) => async dispatch => {
    const response = await fetch(`/api/posts/${id}`)
    const data = await response.json()
    dispatch(setPostAC([data.post]))
}

export const setPostsByCategoryThunk = ({ category }) => async dispatch => {
    debugger
    const response = await fetch(`/api/categories/${category}`)
    const data = await response.json()
    dispatch(setPostsByCategoryAC({ data, category }))
}

export const signUpThunk = ({ name, password, email }) => async dispatch => {
    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ name, password, email })
    })
    const data = await response.json()
}

export const signInThunk = ({ password, email }) => async dispatch => {
    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
    const data = await response.json()
    localStorage.setItem('token', data)
    dispatch(isAuthThunk())
}

export const isAuthThunk = () => async dispatch => {
    const response = await fetch('/auth/me', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        credentials: 'include'
    });
    const data = await response.json()
    dispatch(setUserAC(data.user))
}

export const logoutThunk = () => async dispatch => {
    const response = await fetch('/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        credentials: 'include'
    });
    const data = await response.json()
    localStorage.removeItem('token')
    dispatch(setUserAC(null))
}

export const setCommentsThunk = ({ postId }) => async dispatch => {
    const response = await fetch(`/api/comments/${postId}`)
    const data = await response.json()
    dispatch(setCommentsAC(data))
}

export const searchPostsByNameThunk = ({ name }) => async dispatch => {
    const response = await fetch(`/api/postsByName/${name}`)
    const data = await response.json()
    dispatch(setPostsByNameAC(data.posts))
}

export const addCommentThunk = comment => async dispatch => {
    const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    const data = await response.json()
    dispatch(addPostAC(data))
}