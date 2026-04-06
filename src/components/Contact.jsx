import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Youtube, Instagram, Facebook, Mail, Phone } from 'lucide-react'

const links = [
  { icon: Youtube,   label: 'YouTube',            sub: '@hunartohustleshow',    href: 'https://www.youtube.com/@hunartohustleshow' },
  { icon: Instagram, label: 'Instagram — Show',    sub: '@hunartohustleshow',    href: 'https://www.instagram.com/hunartohustleshow' },
  { icon: Instagram, label: 'Instagram — Raj Sandhu', sub: '@rajsandhu.x',      href: 'https://www.instagram.com/rajsandhu.x' },
  { icon: Facebook,  label: 'Facebook',            sub: 'SwaranSandhuOfficial', href: 'https://www.facebook.com/SwaranSandhuOfficial' },
  { icon: Mail,      label: 'info@starcrew.com',   sub: 'Email us',             href: 'mailto:info@starcrew.com' },
  { icon: Phone,     label: '+91-73738-00001',      sub: 'Call us',             href: 'tel:+917373800001' },
]

export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" ref={ref} style={{
      paddingTop: '130px', paddingBottom: '80px',
      background: '#0a0a0a', textAlign: 'center',
    }}>
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 48px)' }}>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: '11px',
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.7)', marginBottom: '12px',
          }}
        >Connect</motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            fontWeight: 800, letterSpacing: '-0.03em',
            color: '#f5f5f5', lineHeight: 1.0, margin: '0 0 52px',
          }}
        >
          Find Us
        </motion.h2>

        {/* Card rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {links.map((link, i) => (
            <motion.a
              key={link.href + i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ x: 4 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                padding: '18px 24px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                textDecoration: 'none', cursor: 'pointer',
                transition: 'background 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background     = 'rgba(201,168,76,0.06)'
                e.currentTarget.style.borderColor    = 'rgba(201,168,76,0.25)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background     = 'rgba(255,255,255,0.03)'
                e.currentTarget.style.borderColor    = 'rgba(255,255,255,0.06)'
              }}
            >
              {/* Icon */}
              <div style={{
                width: '38px', height: '38px', borderRadius: '10px',
                background: 'rgba(201,168,76,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <link.icon size={17} color="#c9a84c" strokeWidth={1.6} />
              </div>

              {/* Text */}
              <div style={{ textAlign: 'left', flex: 1 }}>
                <p style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: '15px', fontWeight: 600,
                  color: 'rgba(245,245,245,0.88)', margin: 0, lineHeight: 1.3,
                }}>
                  {link.label}
                </p>
                <p style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '12px', fontWeight: 300,
                  color: 'rgba(245,245,245,0.38)', margin: '2px 0 0',
                }}>
                  {link.sub}
                </p>
              </div>

              {/* Arrow */}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, opacity: 0.3 }}>
                <path d="M3 11L11 3M11 3H5M11 3V9" stroke="rgba(245,245,245,0.8)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          style={{ marginTop: '64px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: '18px', fontWeight: 700, letterSpacing: '-0.01em',
            color: 'rgba(201,168,76,0.4)', marginBottom: '8px',
          }}>
            Hunar to Hustle
          </p>
          <p style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: '12px',
            letterSpacing: '0.04em', color: 'rgba(245,245,245,0.22)', margin: 0,
          }}>
            © 2025 Hunar to Hustle. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
