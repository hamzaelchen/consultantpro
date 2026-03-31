import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">ConsultantPro</Link>
      <div className="nav-links">
        <NavLink 
          to="/" 
          className={({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link")}
          end
        >
          Accueil
        </NavLink>
        {token ? (
          <>
            <NavLink 
              to="/consultants" 
              className={({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link")}
            >
              Consultants
            </NavLink>
            <NavLink 
              to="/add" 
              className={({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link")}
            >
              Ajouter
            </NavLink>
            <button onClick={handleLogout} className="btn-logout">
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <NavLink 
              to="/login" 
              className={({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link")}
            >
              Connexion
            </NavLink>
            <NavLink 
              to="/register" 
              className={({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link")}
            >
              S'inscrire
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
