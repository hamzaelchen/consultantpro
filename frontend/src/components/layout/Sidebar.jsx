import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, Briefcase, Settings, LogOut } from 'lucide-react'
import useAuthStore from '@/store/authStore'
import styles from './Sidebar.module.css'

const links = [
  { to: '/dashboard',   label: 'Dashboard',    icon: LayoutDashboard },
  { to: '/consultants', label: 'Consultants',  icon: Users },
  { to: '/missions',    label: 'Missions',     icon: Briefcase },
  { to: '/settings',   label: 'Paramètres',   icon: Settings },
]

export default function Sidebar() {
  const logout = useAuthStore((s) => s.logout)

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.logo}>CP</span>
        <span className={styles.name}>ConsultantPro</span>
      </div>

      <nav className={styles.nav}>
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <button className={styles.logout} onClick={logout}>
        <LogOut size={18} />
        <span>Déconnexion</span>
      </button>
    </aside>
  )
}
