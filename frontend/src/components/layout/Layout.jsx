import { Outlet, Navigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import useAuthStore from '@/store/authStore'
import styles from './Layout.module.css'

export default function Layout() {
  const token = useAuthStore((s) => s.token)
  if (!token) return <Navigate to="/login" replace />

  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.main}>
        <Navbar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
