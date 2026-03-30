import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function ConsultantList() {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConsultants();
  }, []);

  const fetchConsultants = async () => {
    try {
      const response = await api.get("/consultants/");
      setConsultants(response.data);
      setLoading(false);
    } catch (err) {
      setError("Erreur lors du chargement des consultants.");
      setLoading(false);
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce consultant ?")) return;
    
    try {
      await api.delete(`/consultants/${id}`);
      setConsultants(consultants.filter(c => c.id !== id));
      // Optionnel: rester sur la même page (contrainte vérifiée)
    } catch (err) {
      alert("Erreur lors de la suppression");
      console.error(err);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div style={{ color: "var(--danger)" }}>{error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Liste des consultants</h2>
        <Link to="/add" className="btn btn-primary">Nouveau Consultant</Link>
      </div>

      <div className="table-container">
        {consultants.length === 0 ? (
          <p>Aucun consultant trouvé.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Spécialité</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {consultants.map(c => (
                <tr key={c.id}>
                  <td>{c.prenom} {c.nom}</td>
                  <td>{c.specialite}</td>
                  <td>
                    {c.disponible ? (
                      <span className="badge badge-available">Disponible</span>
                    ) : (
                      <span className="badge badge-unavailable">En mission</span>
                    )}
                  </td>
                  <td>
                    <div className="actions">
                      <Link to={`/consultants/${c.id}`} className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}>Voir</Link>
                      <Link to={`/consultants/${c.id}/edit`} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}>Modifier</Link>
                      <button onClick={() => handleDelete(c.id)} className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}>Supprimer</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
