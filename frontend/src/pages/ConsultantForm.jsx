import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

export default function ConsultantForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    specialite: "",
    disponible: true
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      api.get(`/consultants/${id}`)
        .then(res => {
          setFormData({
            nom: res.data.nom || "",
            prenom: res.data.prenom || "",
            email: res.data.email || "",
            telephone: res.data.telephone || "",
            specialite: res.data.specialite || "",
            disponible: res.data.disponible
          });
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError("Consultant introuvable");
          setLoading(false);
        });
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEditing) {
        await api.put(`/consultants/${id}`, formData);
      } else {
        await api.post("/consultants/", formData);
      }
      navigate("/consultants");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Une erreur est survenue lors de l'enregistrement.");
      setLoading(false);
    }
  };

  if (loading && isEditing) return <div>Chargement...</div>;

  return (
        <div className="glass-card slideUp" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "1.5rem", color: "var(--text-dark)" }}>{isEditing ? "Modifier le consultant" : "Ajouter un consultant"}</h2>
      {error && <div style={{ color: "var(--danger)", marginBottom: "1rem", padding: "0.5rem", background: "rgba(239,68,68,0.1)", borderRadius: "8px" }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: "1.2rem" }}>
          <label htmlFor="prenom">Prénom *</label>
          <input 
            type="text" 
            id="prenom" 
            name="prenom" 
            value={formData.prenom} 
            onChange={handleChange} 
            required 
            className="form-control" 
          />
        </div>
        
        <div className="form-group" style={{ marginBottom: "1.2rem" }}>
          <label htmlFor="nom">Nom *</label>
          <input 
            type="text" 
            id="nom" 
            name="nom" 
            value={formData.nom} 
            onChange={handleChange} 
            required 
            className="form-control" 
          />
        </div>

        <div className="form-group" style={{ marginBottom: "1.2rem" }}>
          <label htmlFor="email">Email *</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="form-control" 
          />
        </div>

        <div className="form-group" style={{ marginBottom: "1.2rem" }}>
          <label htmlFor="telephone">Téléphone</label>
          <input 
            type="text" 
            id="telephone" 
            name="telephone" 
            value={formData.telephone} 
            onChange={handleChange} 
            className="form-control" 
          />
        </div>

        <div className="form-group" style={{ marginBottom: "1.2rem" }}>
          <label htmlFor="specialite">Spécialité *</label>
          <input 
            type="text" 
            id="specialite" 
            name="specialite" 
            value={formData.specialite} 
            onChange={handleChange} 
            required 
            className="form-control" 
          />
        </div>

        <div className="form-group form-check" style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
          <input 
            type="checkbox" 
            id="disponible" 
            name="disponible" 
            checked={formData.disponible} 
            onChange={handleChange} 
            style={{ width: "auto" }}
          />
          <label htmlFor="disponible" style={{ marginBottom: 0 }}>Disponible pour de nouvelles missions</label>
        </div>

        <div className="form-actions" style={{ display: "flex", gap: "1rem" }}>
          <button type="button" className="btn btn-outline" onClick={() => navigate("/consultants")} style={{ flex: 1 }}>
            Annuler
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 2 }}>
            {loading ? "Enregistrement..." : (isEditing ? "Enregistrer les modifications" : "Créer le consultant")}
          </button>
        </div>
      </form>
    </div>
  );
}
