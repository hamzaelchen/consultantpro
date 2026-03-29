import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '@/api/auth'
import useAuthStore from '@/store/authStore'
import styles from './Login.module.css'

export default function Login() {
  const navigate = useNavigate()
  const setToken = useAuthStore((s) => s.setToken)
  const setUser  = useAuthStore((s) => s.setUser)
  const [form, setForm]   = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await login({
        username: form.email,
        password: form.password,
      })
      setToken(data.access_token)
      setUser(data.user)
      navigate('/dashboard')
    } catch {
      setError('Identifiants incorrects. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>CP</div>
        <h1 className={styles.title}>ConsultantPro</h1>
        <p className={styles.sub}>Connectez-vous à votre espace</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Email
            <input
              id="login-email"
              type="email"
              className={styles.input}
              placeholder="vous@exemple.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>
          <label className={styles.label}>
            Mot de passe
            <input
              id="login-password"
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </label>
          <button
            id="login-submit"
            type="submit"
            className={`btn btn-primary ${styles.submit}`}
            disabled={loading}
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
