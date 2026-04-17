import { useState } from 'react'
import { motion } from 'framer-motion'

const FORM_URL = 'https://script.google.com/macros/s/AKfycbxQbvWAVuSOInwSt0Ug4QFxfhkS9YNIq7VpaSzgkxP5u_GNDraFy4Eaoz97C-tb7msQ/exec'

export default function Newsletter() {
  const [form, setForm]       = useState({ name: '', email: '', phone: '' })
  const [status, setStatus]   = useState('idle') // idle | loading | success | error

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const url = `${FORM_URL}?name=${encodeURIComponent(form.name)}&email=${encodeURIComponent(form.email)}&phone=${encodeURIComponent(form.phone)}`
      await fetch(url, { method: 'GET', mode: 'no-cors' })
      setStatus('success')
      setForm({ name: '', email: '', phone: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="newsletter"
      style={{
        padding:    'clamp(80px, 12vw, 140px) clamp(24px, 5vw, 80px)',
        background: '#0a0a0a',
        position:   'relative',
        overflow:   'hidden',
        zIndex:     1,
      }}
    >
      {/* Subtle gold glow behind */}
      <div aria-hidden style={{
        position:     'absolute',
        top:          '50%',
        left:         '50%',
        transform:    'translate(-50%, -50%)',
        width:        '600px',
        height:       '300px',
        background:   'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)',
        pointerEvents:'none',
      }} />

      <div style={{ maxWidth: '560px', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <p style={{
            fontFamily:    '"DM Sans", sans-serif',
            fontSize:      '11px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color:         'rgba(201,168,76,0.7)',
            margin:        '0 0 14px',
          }}>
            Stay in the loop
          </p>
          <h2 style={{
            fontFamily:    '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize:      'clamp(2rem, 4.5vw, 3.6rem)',
            fontWeight:    800,
            color:         '#f5f5f5',
            lineHeight:    1.05,
            margin:        '0 0 16px',
            letterSpacing: '-0.03em',
          }}>
            Never Miss an Episode
          </h2>
          <p style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize:   '15px',
            color:      'rgba(245,245,245,0.45)',
            margin:     0,
            lineHeight: 1.6,
          }}>
            Get notified the moment a new episode of Hunar to Hustle drops.
          </p>
        </motion.div>

        {/* Form */}
        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              textAlign:    'center',
              padding:      '48px 32px',
              border:       '1px solid rgba(201,168,76,0.25)',
              borderRadius: '20px',
              background:   'rgba(201,168,76,0.04)',
            }}
          >
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🎙️</div>
            <h3 style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize:   '22px', fontWeight: 700,
              color:      '#f5f5f5', margin: '0 0 10px',
            }}>You're in!</h3>
            <p style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize:   '15px',
              color:      'rgba(245,245,245,0.45)',
              margin:     0,
            }}>
              We'll notify you when the next episode drops.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {[
              { name: 'name',  label: 'Your Name',     type: 'text',  placeholder: '',  required: true  },
              { name: 'email', label: 'Email Address',  type: 'email', placeholder: '',  required: false },
              { name: 'phone', label: 'Phone Number',   type: 'tel',   placeholder: '',  required: true  },
            ].map(field => (
              <div key={field.name}>
                <label style={{
                  display:       'block',
                  fontFamily:    '"DM Sans", sans-serif',
                  fontSize:      '12px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color:         'rgba(201,168,76,0.6)',
                  marginBottom:  '8px',
                }}>
                  {field.label}{field.required && <span style={{ color: '#c9a84c' }}> *</span>}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.required}
                  style={{
                    width:        '100%',
                    padding:      '14px 18px',
                    background:   'rgba(255,255,255,0.04)',
                    border:       '1px solid rgba(201,168,76,0.18)',
                    borderRadius: '12px',
                    color:        '#f5f5f5',
                    fontFamily:   '"DM Sans", sans-serif',
                    fontSize:     '15px',
                    outline:      'none',
                    boxSizing:    'border-box',
                    transition:   'border-color 0.2s',
                  }}
                  onFocus={e  => e.target.style.borderColor = 'rgba(201,168,76,0.6)'}
                  onBlur={e   => e.target.style.borderColor = 'rgba(201,168,76,0.18)'}
                />
              </div>
            ))}

            {status === 'error' && (
              <p style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize:   '13px',
                color:      'rgba(255,100,100,0.8)',
                margin:     0,
              }}>
                Something went wrong. Please try again.
              </p>
            )}

            <motion.button
              type="submit"
              disabled={status === 'loading'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                marginTop:     '8px',
                padding:       '16px 32px',
                background:    'linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #c9a84c 100%)',
                border:        'none',
                borderRadius:  '12px',
                color:         '#0a0a0a',
                fontFamily:    '"Plus Jakarta Sans", sans-serif',
                fontSize:      '15px',
                fontWeight:    700,
                letterSpacing: '0.02em',
                cursor:        status === 'loading' ? 'not-allowed' : 'pointer',
                opacity:       status === 'loading' ? 0.7 : 1,
                transition:    'opacity 0.2s',
              }}
            >
              {status === 'loading' ? 'Submitting…' : 'Notify Me →'}
            </motion.button>

            <p style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize:   '12px',
              color:      'rgba(245,245,245,0.25)',
              textAlign:  'center',
              margin:     '4px 0 0',
            }}>
              No spam. Only new episode alerts.
            </p>
          </motion.form>
        )}
      </div>
    </section>
  )
}
