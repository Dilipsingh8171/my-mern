import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { useAuth } from "./context/Auth";
import Header from "./components/Header";



function App() {


  const [auth, setAuth] = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/dashboard" element={auth?.user?.role !== 1 ? <AdminDashboard /> : <Navigate to='/login' />}>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;