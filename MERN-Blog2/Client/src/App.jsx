import "./App.css";
import AllPost from "./component/PostList/AllPost";
import {Routes , Route} from 'react-router-dom';

function App() {
  return (
    <>
      <h1> 🙏🏻 Welcome to the New Blogs App !! 🙏🏻</h1>
      <Routes>
        <Route path="/" element={<AllPost />} />
      </Routes>
    </>
  );
}

export default App;
