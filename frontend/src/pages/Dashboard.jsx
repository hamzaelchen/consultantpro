import { Users, Briefcase, TrendingUp, Clock } from 'lucide-react'
import styles from './Dashboard.module.css'

const stats = [
  { label: 'Consultants actifs', value: '48',  icon: Users,      color: 'var(--color-primary)' },
  { label: 'Missions en cours',  value: '23',  icon: Briefcase,  color: 'var(--color-accent)'  },
  { label: 'Taux d\'occupation', value: '87%', icon: TrendingUp, color: 'var(--color-success)' },
  { label: 'Jours restants moy.', value: '14', icon: Clock,      color: 'var(--color-warning)' },
]

const recentMissions = [
  { id: 1, title: 'Migration Cloud AWS', client: 'TotalEnergies', consultant: 'Amira Benali',   status: 'En cours',  end: '2024-08-30' },
  { id: 2, title: 'Audit Cybersécurité', client: 'BNP Paribas',   consultant: 'Karim Douhi',    status: 'En cours',  end: '2024-07-15' },
  { id: 3, title: 'Dev API REST',        client: 'SNCF',          consultant: 'Léa Moreau',     status: 'Terminée',  end: '2024-06-01' },
  { id: 4, title: 'Data Warehouse',      client: 'Société Générale', consultant: 'Yassir Tahir', status: 'En attente', end: '2024-09-10' },
]

const statusClass = { 'En cours': 'badge-primary', 'Terminée': 'badge-success', 'En attente': 'badge-warning' }

export default function Dashboard() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Tableau de bord</h1>
        <p className={styles.sub}>Vue d'ensemble de votre activité</p>
      </div>

      {/* KPI cards */}
      <div className={styles.grid}>
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className={`card ${styles.stat}`}>
            <div className={styles.statIcon} style={{ background: `${color}22`, color }}>
              <Icon size={22} />
            </div>
            <div>
              <p className={styles.statValue}>{value}</p>
              <p className={styles.statLabel}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent missions table */}
      <div className={`card ${styles.tableCard}`}>
        <h2 className={styles.tableTitle}>Missions récentes</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Mission</th>
                <th>Client</th>
                <th>Consultant</th>
                <th>Fin</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {recentMissions.map((m) => (
                <tr key={m.id}>
                  <td className={styles.missionTitle}>{m.title}</td>
                  <td>{m.client}</td>
                  <td>{m.consultant}</td>
                  <td className={styles.date}>{m.end}</td>
                  <td>
                    <span className={`badge ${statusClass[m.status]}`}>{m.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
