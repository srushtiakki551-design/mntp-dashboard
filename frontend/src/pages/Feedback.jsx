import { useState } from 'react'
import axios from 'axios'

export default function Feedback({ user, onClose }) {
  const [form, setForm] = useState({ message: '', rating: 5 })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await axios.post('http://localhost:5000/api/feedback', {
        userId: user.id,
        name: user.name,
        email: user.email,
        message: form.message,
        rating: Number(form.rating),
      })
      setSubmitted(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 16,
        padding: '36px',
        width: '100%',
        maxWidth: 460,
        position: 'relative',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      }}>

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'transparent', border: 'none',
            color: '#94a3b8', fontSize: 20, cursor: 'pointer',
          }}
        >
          ✕
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
            <h2 style={{
              color: '#0f172a', fontWeight: 800, marginBottom: 8,
              fontFamily: 'Arial, sans-serif',
            }}>
              Thank you!
            </h2>
            <p style={{ color: '#94a3b8', fontSize: 14 }}>
              Your feedback has been submitted.
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: 24, background: '#2563eb',
                color: '#ffffff', border: 'none',
                borderRadius: 8, padding: '10px 28px',
                fontSize: 14, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'Arial, sans-serif',
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 style={{
              color: '#0f172a', fontSize: 20, fontWeight: 800,
              marginBottom: 6, fontFamily: 'Arial, sans-serif',
            }}>
              Share Feedback
            </h2>
            <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 24 }}>
              Help us improve the dashboard
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

              {/* Rating */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{
                  fontSize: 12, color: '#64748b', fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>
                  Rating
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setForm({ ...form, rating: n })}
                      style={{
                        width: 40, height: 40, borderRadius: 8,
                        border: '1px solid',
                        borderColor: form.rating >= n ? '#2563eb' : '#e2e8f0',
                        background: form.rating >= n ? '#eff6ff' : '#f8fafc',
                        color: form.rating >= n ? '#2563eb' : '#94a3b8',
                        fontSize: 18, cursor: 'pointer',
                        fontFamily: 'Arial, sans-serif',
                      }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{
                  fontSize: 12, color: '#64748b', fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what you think..."
                  required
                  rows={4}
                  style={{
                    background: '#f8fafc', border: '1px solid #e2e8f0',
                    borderRadius: 8, color: '#0f172a',
                    padding: '10px 14px', fontSize: 14,
                    outline: 'none', fontFamily: 'Arial, sans-serif',
                    resize: 'vertical',
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
                  fontFamily: 'Arial, sans-serif',
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}