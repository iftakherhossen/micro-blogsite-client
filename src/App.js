import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import MyPosts from './Pages/MyPosts/MyPosts';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/myPosts" element={<MyPosts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;