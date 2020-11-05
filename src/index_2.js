import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App_2';
// import reportWebVitals from './reportWebVitals';

//COMPONENT
// import rootReducer from './reducers'

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';

//LIB
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const globalState = {
	code: '',
}

// reducer (function yang digunakan untuk mengakses store dan merubahnya)
const rootReducer = (state = globalState, action) => {
  switch(action.type){
    case "CHANGE_CODE_NUMPAD":
      return changeCodeNumpad(state, action);
    case "HANDLE_STEP_CHANGE":
      return handleStepChange(state, action);
    default:
      return state;
  }
}

const changeCodeNumpad = (state, action) =>{
  let value_ = '';
    if(state.code === ''){
      if(action.value === 'backspace'){
        value_ = ''
      }else{
        value_ = action.value;
      }
    }else{
      if(action.value === 'backspace'){
        value_ = state.code.slice(0,-1)
      }else if(action.value === ''){
        value_ = '';
      }else{
        value_ = state.code+""+action.value
      }
    }
    return{
      ...state,
      code: value_
    }
}

const handleStepChange = (state, action) => {
  let {id, idcategory, method} = action.data
		if(action.stepAction === 'NEXT1TO2'){
			// if(action.data.idcategory === '1'){
				return{
					...state,
					id: id,
					idcategory: idcategory,
					method: method,
				// }
			}
		}
}

// store (create store)
const storeRedux = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// const storeRedux = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={storeRedux}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
