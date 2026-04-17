import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 700) // wait for fade-out before unmounting
    }, 2400)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{
            position:       'fixed',
            inset:          0,
            background:     '#0a0a0a',
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            justifyContent: 'center',
            zIndex:         99999,
            gap:            '32px',
          }}
        >
          {/* Logo */}
          <motion.img
            src="/logo.png"
            alt="Hunar to Hustle"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '180px', height: '180px', objectFit: 'contain' }}
          />

          {/* Loading text + spinner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
          >
            <div style={{
              width:        '32px',
              height:       '32px',
              borderRadius: '50%',
              border:       '1.5px solid rgba(201,168,76,0.15)',
              borderTop:    '1.5px solid #c9a84c',
              animation:    'preloader-spin 0.9s linear infinite',
            }} />
            <p style={{
              fontFamily:    '"DM Sans", sans-serif',
              fontSize:      '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color:         'rgba(201,168,76,0.5)',
              margin:        0,
            }}>Loading</p>
          </motion.div>

          <style>{`
            @keyframes preloader-spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
