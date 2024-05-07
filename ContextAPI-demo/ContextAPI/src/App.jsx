import { useContext, useState } from "react";
// import { MyContext } from "./Context";
import "./App.css";
// import MyComponent from "./MyComponent";
import store from './store/store.js';
import {Provider} from 'react-redux'
import Counter from "./Counter.jsx";


function App() {
  const [text, setText] = useState("");

  return (
    <>
      <div>
        <h1> ContextAPI Demos </h1>
        {/* <MyContext.Provider value={{ text, setText }}>
          <MyComponent />
        </MyContext.Provider> */}
        <Provider store={store}>
          <Counter />
        </Provider>
      </div>
    </>
  );
}

export default App;
