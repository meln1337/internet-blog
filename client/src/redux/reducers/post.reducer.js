import { SET_POSTS, SET_POST, SET_POSTS_BY_CATEGORY, SET_COMMENTS, SET_POSTS_BY_NAME, ADD_COMMENT } from '../types'

const initialState = {
    posts: [],
    comments: {},
    categories: {},
    postsByName: []
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS: {
            return {
                ...state,
                posts: action.payload
            }
        }
        case SET_POST: {
            return {
                ...state,
                posts: action.payload
            }
        }
        case SET_POSTS_BY_CATEGORY: {
            return {
                ...state,
                categories: {
                    ...state.categories,
                    [action.payload.category]: action.payload.data
                }
            }
        }
        case SET_COMMENTS: {
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [action.payload.postId]: action.payload.data
                }
            }
        }
        case SET_POSTS_BY_NAME: {
            return {
                ...state,
                postsByName: action.payload
            }
        }
        case ADD_COMMENT: {
            return {
                ...state,
                comments: {
                    ...state.comments,
                    [action.payload.postId]: [
                        ...state.comments[action.payload.postId],
                        action.payload.comment
                    ]
                }
            }
        }
        default: return state
    }
}

export default postReducer