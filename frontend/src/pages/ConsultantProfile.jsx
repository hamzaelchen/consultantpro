import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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

  return (
    <div className="profile-card">
      <div className="profile-header">
        <h2>
          Profil: {consultant.prenom} {consultant.nom}
        </h2>
        <div>
          {consultant.disponible ? (
            <span className="badge badge-available">Disponible</span>
          ) : (
            <span className="badge badge-unavailable">En mission</span>
          )}
        </div>
      </div>

      <div className="profile-info">
        <div className="info-group">
          <strong>Nom complet</strong>
          <p>{consultant.prenom} {consultant.nom}</p>
        </div>
        
        <div className="info-group">
          <strong>Spécialité Principale</strong>
          <p>{consultant.specialite}</p>
        </div>
        
        <div className="info-group">
          <strong>Email</strong>
          <p><a href={`mailto:${consultant.email}`}>{consultant.email}</a></p>
        </div>
        
        <div className="info-group">
          <strong>Téléphone</strong>
          <p>{consultant.telephone || "Non renseigné"}</p>
        </div>
        
        <div className="info-group" style={{ gridColumn: "1 / -1", marginTop: "1rem" }}>
          <strong>Date d'ajout dans la base</strong>
          <p>{new Date(consultant.created_at).toLocaleDateString("fr-FR", {
            day: 'numeric', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
          })}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
        <Link to="/consultants" className="btn btn-outline" style={{marginRight: 'auto'}}>Retour à la liste</Link>
        <Link to={`/consultants/${consultant.id}/edit`} className="btn btn-primary">Modifier</Link>
        <button onClick={handleDelete} className="btn btn-danger">Supprimer</button>
      </div>
    </div>
  );
}
