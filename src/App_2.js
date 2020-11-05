import logo from './logo.svg';
import './App.css';
import {useDispatch, useSelector} from 'react-redux'

import Form from './components/Form';
import {increment, decrement} from './actions';

// function App() {
//   const counter = useSelector(state => state.CounterReducer);
//   const dispatch = useDispatch();

//   return (
//     <div className="App">
//       <h1>Counter {counter}</h1>
//       <button className="btn btn-primary" onClick={() => dispatch(increment())}>add</button>
//       <button className="btn btn-warning" onClick={() => dispatch(decrement())}>sub</button>
//     </div>
//   );
// }

function App() {
  
  return (
    <div className="content-wrapper">
      <Form></Form>
    </div>
  );
}

export default App;
