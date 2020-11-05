const CounterReducer = (state = 0, action) => {
    // eslint-disable-next-line default-case
    switch(action.type){
        case "increment":
            return state + 1;
        case "decrement":
            return state - 1;
        default:
            return state
    }
}

export default CounterReducer;