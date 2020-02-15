const redux = require('redux')
const axios = require('axios')
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default

const createStore = redux.createStore

const InitialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const fetchUersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUersSuccess = data => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: data
    }
}

const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const reducer = (state= InitialState, action ) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
    
        default:
            return state
    }
}

const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                //response.data is array of users
                const users = response.data.map(users => users.id)
                dispatch(fetchUersSuccess(users))
            })
            .catch(error => {
                //error.message is the error description
                dispatch(fetchUsersFailure(error.message))
            })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())

