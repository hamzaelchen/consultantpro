import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Consultants from "./pages/Consultants";
import ConsultantForm from "./pages/ConsultantForm";
import ConsultantProfile from "./pages/ConsultantProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protégé par Authentification */}
            <Route element={<PrivateRoute />}>
              <Route path="/consultants" element={<Consultants />} />
              <Route path="/consultants/:id" element={<ConsultantProfile />} />
              <Route path="/add" element={<ConsultantForm />} />
              <Route path="/consultants/:id/edit" element={<ConsultantForm />} />
            </Route>
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
