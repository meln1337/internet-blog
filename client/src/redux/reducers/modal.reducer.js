import { SET_SHOW_MODAL, SET_SHOW_MODAL_NEGATIVE, SET_SHOW_MODAL_AUTH, SET_SHOW_MODAL_NEGATIVE_AUTH, SET_ERRORS } from '../types'

const initialState = {
    showModal: false,
    showModalAuth: false,
    errors: []
}

const modalReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SHOW_MODAL: {
            return {
                ...state,
                showModal: true
            }
        }
        case SET_SHOW_MODAL_NEGATIVE: {
            return {
                ...state,
                showModal: false
            }
        }
        case SET_SHOW_MODAL_AUTH: {
            return {
                ...state,
                showModalAuth: true
            }
        }
        case SET_SHOW_MODAL_NEGATIVE_AUTH: {
            return {
                ...state,
                showModalAuth: false
            }
        }
        case SET_ERRORS: {
            return {
                ...state,
                errors: action.payload
            }
        }
        default: return state
    }
}

export default modalReducer