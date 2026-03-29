import { useState } from 'react'
import { Plus, Search, Mail, Phone } from 'lucide-react'
import styles from './Consultants.module.css'

const mockData = [
  { id: 1, name: 'Amira Benali',   role: 'Cloud Architect',      email: 'amira@consultantpro.fr',   phone: '+33 6 01 02 03 04', status: 'Disponible',  avatar: 'AB' },
  { id: 2, name: 'Karim Douhi',    role: 'Cybersecurity Expert', email: 'karim@consultantpro.fr',   phone: '+33 6 05 06 07 08', status: 'En mission',  avatar: 'KD' },
  { id: 3, name: 'Léa Moreau',     role: 'Backend Developer',    email: 'lea@consultantpro.fr',     phone: '+33 6 09 10 11 12', status: 'Disponible',  avatar: 'LM' },
  { id: 4, name: 'Yassir Tahir',   role: 'Data Engineer',        email: 'yassir@consultantpro.fr',  phone: '+33 6 13 14 15 16', status: 'En mission',  avatar: 'YT' },
  { id: 5, name: 'Sophie Renard',  role: 'Scrum Master',         email: 'sophie@consultantpro.fr',  phone: '+33 6 17 18 19 20', status: 'Congé',       avatar: 'SR' },
  { id: 6, name: 'Thomas Klein',   role: 'DevOps Engineer',      email: 'thomas@consultantpro.fr',  phone: '+33 6 21 22 23 24', status: 'Disponible',  avatar: 'TK' },
]

const statusClass = { 'Disponible': 'badge-success', 'En mission': 'badge-primary', 'Congé': 'badge-warning' }

export default function Consultants() {
  const [search, setSearch] = useState('')
  const filtered = mockData.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <div>
          <h1 className={styles.title}>Consultants</h1>
          <p className={styles.sub}>{mockData.length} consultants enregistrés</p>
        </div>
        <button id="add-consultant" className="btn btn-primary">
          <Plus size={16} /> Ajouter
        </button>
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

      <div className={styles.grid}>
        {filtered.map((c) => (
          <div key={c.id} className={`card ${styles.card}`}>
            <div className={styles.cardTop}>
              <div className={styles.avatar}>{c.avatar}</div>
              <span className={`badge ${statusClass[c.status]}`}>{c.status}</span>
            </div>
            <h3 className={styles.name}>{c.name}</h3>
            <p className={styles.role}>{c.role}</p>
            <div className={styles.contacts}>
              <a href={`mailto:${c.email}`} className={styles.contact}>
                <Mail size={13} /> {c.email}
              </a>
              <a href={`tel:${c.phone}`} className={styles.contact}>
                <Phone size={13} /> {c.phone}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
