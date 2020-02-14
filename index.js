const redux = require('redux')

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';
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
initialState = {
    numOfCakes: 10,
    numOfIcecream: 20
}

//Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE: return{
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        case BUY_ICECREAM: return{
            ...state,
            numOfIcecream: state.numOfIcecream -1
        }
    
        default: return state
    }
}


//Store
const store = createStore(reducer)
console.log('Initial State', store.getState())
const unsubscribe = store.subscribe(() => console.log('Updated State', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
unsubscribe()