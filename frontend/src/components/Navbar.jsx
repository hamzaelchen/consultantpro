import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
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
      </div>
    </nav>
  );
}
