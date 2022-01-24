import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from './context/AuthProvider/AuthProvider';
import Home from './Pages/Home/Home';
import UserProfile from './Pages/UserProfile/UserProfile';
import SavedPosts from './Pages/SavedPosts/SavedPosts';
import SinglePosts from './Pages/SinglePosts/SinglePosts';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users/:displayName" element={<UserProfile />} />
          <Route path="/:displayName/posts/:id" element={<SinglePosts />} />
          <Route path="/users/:displayName/savedPosts" element={<SavedPosts />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;