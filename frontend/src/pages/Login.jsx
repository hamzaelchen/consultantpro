import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login as loginApi } from '@/api/auth'
import { useAuth } from '@/context/AuthContext'
import styles from './Login.module.css'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm]   = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await loginApi(form)
      login(data.user, data.access_token)
      navigate('/consultants')
    } catch (err) {
      setError(err.response?.data?.detail || 'Identifiants incorrects. Veuillez réessayer.')
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
            className={styles.submit}
            disabled={loading}
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <div className={styles.footer}>
          Pas de compte ? 
          <Link to="/register" className={styles.link}>S'inscrire</Link>
        </div>
      </div>
    </div>
  )
}
