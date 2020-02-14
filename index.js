const redux = require('redux')

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';
const combineReducers = redux.combineReducers;
const createStore = redux.createStore;

//Middleware
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()
const applyMiddleware = redux.applyMiddleware


//Action Creator
function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'first redux action'
    }
}
function buyIcecream() {
    return{
        type: BUY_ICECREAM,
    }
}
//
initialCakeState = {
    numOfCakes: 10,
}


initialIcecreamState = {
    numOfIcecream: 20,
}
//Reducer
const CakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE: return{
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
}

const IcecreamReducer = (state = initialIcecreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM: return{
            ...state,
            numOfIcecream: state.numOfIcecream -1
        }
    
        default: return state
    }
}


//Store
const rootReducer = combineReducers({
    Cake: CakeReducer,
    Icecream: IcecreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial State', store.getState())
const unsubscribe = store.subscribe(() => {})
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
unsubscribe()