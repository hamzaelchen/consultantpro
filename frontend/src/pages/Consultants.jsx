import { useState, useEffect } from 'react'
import { Plus, Search, Mail, Phone, Eye, Edit2, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../api/client'
import styles from './Consultants.module.css'

export default function Consultants() {
  const [consultants, setConsultants] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchConsultants()
  }, [])

  const fetchConsultants = async () => {
    try {
      setLoading(true)
      const response = await api.get("/consultants/")
      setConsultants(response.data)
      setLoading(false)
    } catch (err) {
      setError("Erreur lors du chargement des consultants.")
      setLoading(false)
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    console.log("Attempting to delete consultant with ID:", id)
    if (!window.confirm("Voulez-vous vraiment supprimer ce consultant ?")) return
    try {
      const response = await api.delete(`/consultants/${id}`)
      console.log("Delete response:", response.status)
      setConsultants(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      alert("Erreur lors de la suppression")
      console.error("Delete error:", err)
    }
  }

  const filtered = consultants.filter((c) => {
    const fullName = `${c.prenom} ${c.nom}`.toLowerCase()
    const spec = (c.specialite || '').toLowerCase()
    const term = search.toLowerCase()
    return fullName.includes(term) || spec.includes(term)
  })

  return (
    <div className={`${styles.page} fadeIn`}>
      <div className={styles.topbar}>
        <div>
          <h1 className={styles.title}>Consultants</h1>
          <p className={styles.sub}>
            {loading ? "Chargement..." : `${consultants.length} consultants enregistrés`}
          </p>
        </div>
        <Link to="/add" id="add-consultant" className="btn btn-primary">
          <Plus size={16} /> Ajouter
        </Link>
      </div>

      <div className={styles.searchWrap}>
        <Search size={16} className={styles.searchIcon} />
        <input
          id="consultant-search"
          type="text"
          placeholder="Rechercher un consultant…"
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <div style={{ color: "var(--danger)", padding: "1rem 0" }}>{error}</div>}

      {!loading && !error && consultants.length === 0 ? (
        <div className="glass-card" style={{ textAlign: "center", padding: "4rem 2rem" }}>
          <h2 style={{ marginBottom: "1rem", color: "var(--text-dark)" }}>Aucun consultant pour le moment</h2>
          <p style={{ color: "var(--text-light)", marginBottom: "2rem" }}>Commencez par ajouter votre premier consultant dans la base de données.</p>
          <Link to="/add" className="btn btn-primary">
            <Plus size={18} /> Ajouter un consultant
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((c) => {
            const avatarInitials = `${c.prenom?.[0] || ''}${c.nom?.[0] || ''}`.toUpperCase()
            const statusLabel = c.disponible ? "Disponible" : "En mission"
            const statusClass = c.disponible ? "badge-success" : "badge-primary"

            return (
              <div key={c.id} className={`card ${styles.card}`}>
                <div className={styles.cardTop}>
                  <div className={styles.avatar}>{avatarInitials}</div>
                  <span className={`badge ${statusClass}`}>{statusLabel}</span>
                </div>
                
                <h3 className={styles.name}>{c.prenom} {c.nom}</h3>
                <p className={styles.role}>{c.specialite}</p>
                
                <div className={styles.contacts}>
                  {c.email && (
                    <a href={`mailto:${c.email}`} className={styles.contact}>
                      <Mail size={13} /> {c.email}
                    </a>
                  )}
                  {c.telephone && (
                    <a href={`tel:${c.telephone}`} className={styles.contact}>
                      <Phone size={13} /> {c.telephone}
                    </a>
                  )}
                </div>

                <div className={styles.actions}>
                  <Link to={`/consultants/${c.id}`} className="btn btn-secondary" style={{ flex: 1, padding: "0.4rem" }}>
                    <Eye size={14} /> Voir
                  </Link>
                  <Link to={`/consultants/${c.id}/edit`} className="btn btn-outline" style={{ flex: 1, padding: "0.4rem" }}>
                    <Edit2 size={14} />
                  </Link>
                  <button 
                    onClick={() => handleDelete(c.id)} 
                    className="btn btn-danger" 
                    title="Supprimer"
                    style={{ padding: "0.4rem 0.8rem", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <Trash2 size={14} style={{ pointerEvents: "none" }} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
