import { useState } from 'react'
import { Plus, Calendar, User } from 'lucide-react'
import styles from './Missions.module.css'

const mockMissions = [
  { id: 1, title: 'Migration Cloud AWS',    client: 'TotalEnergies',    consultant: 'Amira Benali',  start: '2024-03-01', end: '2024-08-30', status: 'En cours',   tjm: 850 },
  { id: 2, title: 'Audit Cybersécurité',    client: 'BNP Paribas',      consultant: 'Karim Douhi',   start: '2024-04-15', end: '2024-07-15', status: 'En cours',   tjm: 950 },
  { id: 3, title: 'Dev API REST',           client: 'SNCF',             consultant: 'Léa Moreau',    start: '2024-01-10', end: '2024-06-01', status: 'Terminée',   tjm: 780 },
  { id: 4, title: 'Data Warehouse BI',      client: 'Société Générale', consultant: 'Yassir Tahir',  start: '2024-07-01', end: '2024-09-10', status: 'En attente', tjm: 900 },
  { id: 5, title: 'Refonte SI RH',          client: 'Capgemini',        consultant: 'Sophie Renard', start: '2024-02-20', end: '2024-05-20', status: 'Terminée',   tjm: 820 },
]

const statusClass = { 'En cours': 'badge-primary', 'Terminée': 'badge-success', 'En attente': 'badge-warning' }

export default function Missions() {
  const [filter, setFilter] = useState('Tous')
  const statuses = ['Tous', 'En cours', 'Terminée', 'En attente']
  const shown = filter === 'Tous' ? mockMissions : mockMissions.filter((m) => m.status === filter)

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <div>
          <h1 className={styles.title}>Missions</h1>
          <p className={styles.sub}>{mockMissions.length} missions au total</p>
        </div>
        <button id="add-mission" className="btn btn-primary">
          <Plus size={16} /> Nouvelle mission
        </button>
      </div>

      {/* Filter tabs */}
      <div className={styles.filters}>
        {statuses.map((s) => (
          <button
            key={s}
            className={`${styles.filterBtn} ${filter === s ? styles.active : ''}`}
            onClick={() => setFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Mission cards */}
      <div className={styles.list}>
        {shown.map((m) => (
          <div key={m.id} className={`card ${styles.mission}`}>
            <div className={styles.missionLeft}>
              <div className={styles.missionTop}>
                <h3 className={styles.missionTitle}>{m.title}</h3>
                <span className={`badge ${statusClass[m.status]}`}>{m.status}</span>
              </div>
              <div className={styles.meta}>
                <span className={styles.metaItem}>
                  <User size={13} /> {m.consultant}
                </span>
                <span className={styles.metaItem}>
                  <Calendar size={13} /> {m.start} → {m.end}
                </span>
              </div>
              <p className={styles.client}>{m.client}</p>
            </div>
            <div className={styles.tjm}>
              <span className={styles.tjmValue}>{m.tjm} €</span>
              <span className={styles.tjmLabel}>/ jour</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
