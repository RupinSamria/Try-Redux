const redux = require('redux')

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';
const combineReducers = redux.combineReducers;
const createStore = redux.createStore;

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
    cake: CakeReducer,
    Icecream: IcecreamReducer
}) 
const store = createStore(rootReducer)
console.log('Initial State', store.getState())
const unsubscribe = store.subscribe(() => console.log('Updated State', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
unsubscribe()