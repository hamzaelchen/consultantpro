import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register as registerApi } from '@/api/auth'
import styles from './Login.module.css'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      return setError('Les mots de passe ne correspondent pas.')
    }

    setLoading(true)
    try {
      await registerApi({
        nom: form.nom,
        prenom: form.prenom,
        email: form.email,
        password: form.password
      })
      navigate('/login', { state: { message: 'Compte créé avec succès ! Connectez-vous.' } })
    } catch (error) {
      const msg = error.response?.data?.detail || error.message || 'Erreur inconnue'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>CP</div>
        <h1 className={styles.title}>Rejoignez-nous</h1>
        <p className={styles.sub}>Créez votre compte ConsultantPro</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <label className={styles.label}>
              Nom
              <input
                type="text"
                className={styles.input}
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
                required
              />
            </label>
            <label className={styles.label}>
              Prénom
              <input
                type="text"
                className={styles.input}
                value={form.prenom}
                onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                required
              />
            </label>
          </div>
          
          <label className={styles.label}>
            Email
            <input
              type="email"
              className={styles.input}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>

          <label className={styles.label}>
            Mot de passe
            <input
              type="password"
              className={styles.input}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </label>

          <label className={styles.label}>
            Confirmer le mot de passe
            <input
              type="password"
              className={styles.input}
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
            />
          </label>

          <button
            type="submit"
            className={styles.submit}
            disabled={loading}
          >
            {loading ? 'Inscription…' : "S'inscrire"}
          </button>
        </form>

        <div className={styles.footer}>
          Déjà un compte ? 
          <Link to="/login" className={styles.link}>Se connecter</Link>
        </div>
      </div>
    </div>
  )
}
