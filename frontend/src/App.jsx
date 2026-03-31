import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Consultants from "./pages/Consultants";
import ConsultantForm from "./pages/ConsultantForm";
import ConsultantProfile from "./pages/ConsultantProfile";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/consultants" element={<Consultants />} />
          <Route path="/consultants/:id" element={<ConsultantProfile />} />
          <Route path="/add" element={<ConsultantForm />} />
          <Route path="/consultants/:id/edit" element={<ConsultantForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
