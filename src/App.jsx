import { useState, useEffect } from 'react'
import { buildIndex } from './data/loader'
import { COLORS } from './constants'
import MarketOverview from './components/MarketOverview'
import ProductTrends from './components/ProductTrends'
import CountryIntelligence from './components/CountryIntelligence'

const NAV = [
  { id: 'overview',   label: '📊 Market Overview' },
  { id: 'commodity',  label: '🌿 Commodity Trends' },
  { id: 'country',    label: '🌍 Country Intelligence' },
]

export default function App() {
  const [data, setData]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)
  const [view, setView]     = useState('overview')

  useEffect(() => {
    // Dynamic import so the 3.4MB JSON is code-split automatically by Vite
    import('./data/apeda_compact.json')
      .then(mod => {
        setData(buildIndex(mod.default ?? mod))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: COLORS.darkBg, color: COLORS.text }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header style={{
        background: '#0d1424',
        borderBottom: `1px solid ${COLORS.border}`,
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            height: 64, gap: 20, flexWrap: 'wrap',
          }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: 'linear-gradient(135deg, #00d4aa, #7c3aed)',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 18,
              }}>
                🌾
              </div>
              <div>
                <div style={{
                  fontSize: 16, fontWeight: 800,
                  fontFamily: "'Syne', sans-serif",
                  color: COLORS.text, lineHeight: 1.2,
                }}>
                  MNTP Trade Intelligence
                </div>
                <div style={{ fontSize: 11, color: COLORS.muted }}>
                  India Agri-Export Analytics • 2020–25
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav style={{ display: 'flex', gap: 4 }}>
              {NAV.map(item => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  style={{
                    padding: '8px 16px', borderRadius: 8,
                    border: 'none', cursor: 'pointer',
                    fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                    background: view === item.id ? '#00d4aa15' : 'transparent',
                    color: view === item.id ? COLORS.accent : COLORS.subtle,
                    borderBottom: view === item.id
                      ? `2px solid ${COLORS.accent}`
                      : '2px solid transparent',
                    transition: 'all 0.2s',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <main style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        {loading && (
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            minHeight: 400, gap: 16,
          }}>
            <div style={{
              width: 48, height: 48,
              border: `3px solid ${COLORS.border}`,
              borderTopColor: COLORS.accent,
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }} />
            <p style={{ color: COLORS.muted, fontSize: 14 }}>Loading trade data…</p>
          </div>
        )}

        {error && (
          <div style={{
            background: '#1c0a0a', border: '1px solid #7f1d1d',
            borderRadius: 12, padding: 24, color: '#fca5a5',
          }}>
            <strong>Error loading data:</strong> {error}
            <p style={{ color: COLORS.muted, fontSize: 12, marginTop: 8 }}>
              Make sure <code>src/data/apeda_compact.json</code> exists. Run{' '}
              <code style={{ background: '#0f172a', padding: '2px 6px', borderRadius: 4 }}>
                npm run dev
              </code>{' '}
              from the project root.
            </p>
          </div>
        )}

        {data && !loading && (
          <>
            {view === 'overview'  && <MarketOverview data={data} />}
            {view === 'commodity' && <ProductTrends data={data} />}
            {view === 'country'   && <CountryIntelligence data={data} />}
          </>
        )}
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: `1px solid ${COLORS.border}`,
        padding: '16px 24px', textAlign: 'center',
        fontSize: 11, color: '#374151', marginTop: 40,
      }}>
        MNTP Trade Intelligence Dashboard • Data: Agricultural &amp; Processed Food Products
        Export Development Authority • Values in USD Million
      </footer>
    </div>
  )
}