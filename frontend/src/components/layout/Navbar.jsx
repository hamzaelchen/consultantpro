import { Bell, Search } from 'lucide-react'
import useAuthStore from '@/store/authStore'
import styles from './Navbar.module.css'

export default function Navbar() {
  const user = useAuthStore((s) => s.user)

  return (
    <header className={styles.navbar}>
      <div className={styles.search}>
        <Search size={16} className={styles.searchIcon} />
        <input
          id="global-search"
          type="text"
          placeholder="Rechercher…"
          className={styles.searchInput}
        />
      </div>

      <div className={styles.actions}>
        <button className={styles.iconBtn} aria-label="Notifications">
          <Bell size={18} />
          <span className={styles.badge}>3</span>
        </button>

        <div className={styles.avatar}>
          {user?.full_name?.[0] ?? 'U'}
        </div>
      </div>
    </header>
  )
}
