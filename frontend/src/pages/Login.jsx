import { useState } from 'react'
import axios from 'axios'

export default function Login({ onLogin, onSwitch }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      onLogin(res.data.user)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 16,
        padding: '40px 36px',
        width: '100%',
        maxWidth: 420,
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
      }}>

        <div style={{ fontSize: 36, textAlign: 'center', marginBottom: 12 }}>🌾</div>

        <h1 style={{
          color: '#0f172a', fontSize: 22, fontWeight: 800,
          textAlign: 'center', margin: '0 0 6px',
          fontFamily: 'Arial, sans-serif',
        }}>
          MNTP Dashboard
        </h1>

        <p style={{ color: '#94a3b8', fontSize: 13, textAlign: 'center', marginBottom: 28 }}>
          Sign in to your account
        </p>

        {error && (
          <div style={{
            background: '#fef2f2', border: '1px solid #fecaca',
            color: '#dc2626', borderRadius: 8,
            padding: '10px 14px', fontSize: 13, marginBottom: 16,
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{
              fontSize: 12, color: '#64748b', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@company.com"
              required
              style={{
                background: '#f8fafc', border: '1px solid #e2e8f0',
                borderRadius: 8, color: '#0f172a',
                padding: '10px 14px', fontSize: 14,
                outline: 'none', fontFamily: 'Arial, sans-serif',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{
              fontSize: 12, color: '#64748b', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              style={{
                background: '#f8fafc', border: '1px solid #e2e8f0',
                borderRadius: 8, color: '#0f172a',
                padding: '10px 14px', fontSize: 14,
                outline: 'none', fontFamily: 'Arial, sans-serif',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#2563eb', color: '#ffffff',
              border: 'none', borderRadius: 8,
              padding: '12px', fontSize: 14, fontWeight: 700,
              marginTop: 4, fontFamily: 'Arial, sans-serif',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ color: '#94a3b8', fontSize: 13, textAlign: 'center', marginTop: 20 }}>
          Don't have an account?{' '}
          <span
            onClick={onSwitch}
            style={{ color: '#2563eb', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  )
}