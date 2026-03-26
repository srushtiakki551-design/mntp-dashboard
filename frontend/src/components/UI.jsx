import { COLORS, PALETTE } from '../constants'
import { fmtVal, fmtQty } from '../utils/format'

export function CustomTooltip({ active, payload, label, mode = 'val' }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#ffffff', border: '1px solid #e2e8f0',
      borderRadius: 8, padding: '10px 14px', fontSize: 12, maxWidth: 260,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    }}>
      <p style={{ color: '#64748b', marginBottom: 6, fontWeight: 600 }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} style={{
          display: 'flex', justifyContent: 'space-between',
          gap: 12, color: p.color || COLORS.text, marginBottom: 2,
        }}>
          <span style={{ color: '#64748b' }}>{p.name}</span>
          <span style={{ fontWeight: 700 }}>
            {mode === 'qty' ? fmtQty(p.value) : fmtVal(p.value)}
          </span>
        </div>
      ))}
    </div>
  )
}

export function StatCard({ label, value, sub, color = COLORS.accent }) {
  return (
    <div style={{
      background: '#ffffff', border: '1px solid #e2e8f0',
      borderRadius: 12, padding: '18px 20px',
      position: 'relative', overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: 3, height: '100%', background: color,
        borderRadius: '3px 0 0 3px',
      }} />
      <div style={{
        fontSize: 11, color: '#94a3b8',
        textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6,
        fontFamily: 'Arial, sans-serif',
      }}>
        {label}
      </div>
      <div style={{
        fontSize: 22, fontWeight: 800, color: '#0f172a',
        fontFamily: 'Arial, sans-serif',
      }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 11, color: color, marginTop: 4 }}>{sub}</div>
      )}
    </div>
  )
}

export function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{
        margin: 0, fontSize: 17, fontWeight: 700,
        color: '#0f172a', fontFamily: 'Arial, sans-serif',
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ margin: '4px 0 0', fontSize: 12, color: '#94a3b8' }}>{subtitle}</p>
      )}
    </div>
  )
}

export function Select({ value, onChange, options, label, wide }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: wide ? 280 : 160 }}>
      {label && (
        <label style={{
          fontSize: 11, color: '#94a3b8',
          textTransform: 'uppercase', letterSpacing: '0.06em',
          fontFamily: 'Arial, sans-serif',
        }}>
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          background: '#ffffff', border: '1px solid #e2e8f0',
          borderRadius: 8, color: '#0f172a',
          padding: '8px 12px', fontSize: 13,
          cursor: 'pointer', outline: 'none',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {options.map(o => (
          <option key={o.value ?? o} value={o.value ?? o}>
            {o.label ?? o}
          </option>
        ))}
      </select>
    </div>
  )
}

export function Tabs({ tabs, active, onChange }) {
  return (
    <div style={{
      display: 'flex', gap: 4, background: '#f1f5f9',
      borderRadius: 10, padding: 4,
    }}>
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            padding: '8px 16px', borderRadius: 8, border: 'none',
            cursor: 'pointer', fontSize: 13, fontWeight: 600,
            fontFamily: 'Arial, sans-serif',
            background: active === t.id ? '#2563eb' : 'transparent',
            color: active === t.id ? '#ffffff' : '#64748b',
            transition: 'all 0.2s',
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

export function CategoryBadge({ category }) {
  const isProcessed = category?.includes('Processed')
  return (
    <span style={{
      background: isProcessed ? '#ede9fe' : '#dcfce7',
      color: isProcessed ? '#7c3aed' : '#16a34a',
      borderRadius: 4, padding: '2px 7px',
      fontSize: 10, fontWeight: 600,
      fontFamily: 'Arial, sans-serif',
    }}>
      {isProcessed ? 'Processed' : 'Fresh'}
    </span>
  )
}

export function DataTable({ columns, rows }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} style={{
                textAlign: 'left', padding: '8px 12px',
                color: '#94a3b8', borderBottom: '1px solid #e2e8f0',
                fontWeight: 600, textTransform: 'uppercase',
                fontSize: 10, letterSpacing: '0.05em',
                fontFamily: 'Arial, sans-serif',
              }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
              {columns.map(col => (
                <td key={col.key} style={{
                  padding: '8px 12px',
                  color: col.color || '#0f172a',
                  fontWeight: col.bold ? 500 : 400,
                  fontFamily: 'Arial, sans-serif',
                }}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}