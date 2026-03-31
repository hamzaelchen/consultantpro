import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Mail, Phone, Briefcase, Calendar, ChevronLeft, Edit2, Trash2 } from "lucide-react";
import api from "../api/api";

export default function ConsultantProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [consultant, setConsultant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsultant = async () => {
      try {
        const response = await api.get(`/consultants/${id}`);
        setConsultant(response.data);
        setLoading(false);
      } catch (err) {
        setError("Profil consultant introuvable.");
        setLoading(false);
        console.error(err);
      }
    };
    fetchConsultant();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce consultant ?")) return;
    try {
      await api.delete(`/consultants/${id}`);
      navigate("/consultants");
    } catch (err) {
      alert("Erreur lors de la suppression");
      console.error(err);
    }
  };

  if (loading) return <div>Chargement du profil...</div>;
  if (error) return <div style={{ color: "var(--danger)" }}>{error}</div>;
  if (!consultant) return null;

  const avatarInitials = `${consultant.prenom?.[0] || ''}${consultant.nom?.[0] || ''}`.toUpperCase();

  return (
    <div className="glass-card slideUp" style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem" }}>
      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", marginBottom: "2.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "2rem" }}>
        <div style={{
          width: "100px", height: "100px", borderRadius: "50%",
          background: "linear-gradient(135deg, var(--primary-color), var(--accent-color))",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "2.5rem", fontWeight: "700", color: "#fff",
          boxShadow: "0 8px 20px rgba(99, 102, 241, 0.4)", flexShrink: 0
        }}>
          {avatarInitials}
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <h2 style={{ fontSize: "2rem", color: "var(--text-dark)", margin: 0 }}>
              {consultant.prenom} {consultant.nom}
            </h2>
            {consultant.disponible ? (
              <span className="badge badge-success" style={{ fontSize: "0.9rem" }}>Disponible</span>
            ) : (
              <span className="badge badge-primary" style={{ fontSize: "0.9rem" }}>En mission</span>
            )}
          </div>
          <p style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-light)", fontSize: "1.1rem" }}>
            <Briefcase size={18} /> {consultant.specialite}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "3rem" }}>
        <div style={{ background: "rgba(255,255,255,0.03)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
          <h3 style={{ fontSize: "0.9rem", color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1rem" }}>Contact</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ padding: "0.5rem", background: "rgba(99,102,241,0.1)", borderRadius: "8px", color: "var(--primary-color)" }}><Mail size={20} /></div>
              <div>
                <span style={{ display: "block", fontSize: "0.8rem", color: "var(--text-light)" }}>Email</span>
                <a href={`mailto:${consultant.email}`} style={{ color: "var(--text-dark)", fontWeight: "500", transition: "color 0.3s" }} onMouseOver={e => e.target.style.color="var(--primary-color)"} onMouseOut={e => e.target.style.color="var(--text-dark)"}>{consultant.email}</a>
              </div>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ padding: "0.5rem", background: "rgba(99,102,241,0.1)", borderRadius: "8px", color: "var(--primary-color)" }}><Phone size={20} /></div>
              <div>
                <span style={{ display: "block", fontSize: "0.8rem", color: "var(--text-light)" }}>Téléphone</span>
                <span style={{ color: "var(--text-dark)", fontWeight: "500" }}>{consultant.telephone || "Non renseigné"}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.03)", padding: "1.5rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
           <h3 style={{ fontSize: "0.9rem", color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1rem" }}>Informations système</h3>
           <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ padding: "0.5rem", background: "rgba(168,85,247,0.1)", borderRadius: "8px", color: "var(--accent-color)" }}><Calendar size={20} /></div>
              <div>
                <span style={{ display: "block", fontSize: "0.8rem", color: "var(--text-light)" }}>Date d'ajout</span>
                <span style={{ color: "var(--text-dark)", fontWeight: "500" }}>
                  {consultant.created_at ? new Date(consultant.created_at).toLocaleDateString("fr-FR", {
                    day: 'numeric', month: 'long', year: 'numeric'
                  }) : "Date non disponible"}
                </span>
              </div>
            </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/consultants" className="btn btn-outline" style={{marginRight: 'auto'}}>
          <ChevronLeft size={16} /> Retour à la liste
        </Link>
        <Link to={`/consultants/${consultant.id}/edit`} className="btn btn-primary">
          <Edit2 size={16} /> Modifier
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          <Trash2 size={16} /> Supprimer
        </button>
      </div>
    </div>
  );
}
