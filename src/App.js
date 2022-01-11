import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import MyPosts from './Pages/MyPosts/MyPosts';
import AuthProvider from './context/AuthProvider/AuthProvider';
import UserProfile from './Pages/UserProfile/UserProfile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/myPosts" element={<MyPosts />} />
          <Route path="/:username" element={<UserProfile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;