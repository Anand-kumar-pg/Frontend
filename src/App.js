
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useSelector } from 'react-redux';


function App() {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  return (
    <Router>
      <Header/>
      <Routes>       
        <Route path='/signin' element={<SignIn/>}/>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated}> <Home/> </ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;



