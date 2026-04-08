import { useRef, useCallback, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─────────────────────────────────────────
   GUEST DATA
   Add photos to /public/guests/ folder.
   File name format: Firstname_Lastname.jpg
   Update this array to add/remove guests.
───────────────────────────────────────── */
const guests = [
  { photo: '/guests/Raza_murad.png',        name: 'Raza Murad' },
  { photo: '/guests/Virendra_Saxena.png',   name: 'Virendra Saxena' },
  { photo: '/guests/Govind_Namdev.png',     name: 'Govind Namdev' },
  { photo: '/guests/Kiran_Kumar.png',       name: 'Kiran Kumar' },
  { photo: '/guests/Ranjeet.png',           name: 'Ranjeet' },
  { photo: '/guests/Shahbaz_Khan.png',      name: 'Shahbaz Khan' },
  { photo: '/guests/Sudesh_ Berry.png',     name: 'Sudesh Berry' },
  { photo: '/guests/Upasna_SIngh.png',      name: 'Upasna Singh' },
  { photo: '/guests/Vindu_Dara_Singh.png',  name: 'Vindu Dara Singh' },
]

const CARD_GAP = 24

export default function Guests() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const CARD_WIDTH  = isMobile ? 200 : 280
  const SCROLL_STEP = CARD_WIDTH + CARD_GAP

  const trackRef   = useRef(null)
  const sectionRef = useRef(null)
  const isDown     = useRef(false)
  const startX     = useRef(0)
  const scrollStart = useRef(0)
  const isDragging = useRef(false)
  const touchStart = useRef(0)

  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const scroll = useCallback((dir) => {
    trackRef.current?.scrollBy({
      left: dir === 'left' ? -SCROLL_STEP : SCROLL_STEP,
      behavior: 'smooth',
    })
  }, [])

  const onMouseDown = (e) => {
    isDown.current = true
    isDragging.current = false
    startX.current = e.pageX - trackRef.current.offsetLeft
    scrollStart.current = trackRef.current.scrollLeft
    trackRef.current.style.cursor = 'grabbing'
    trackRef.current.style.userSelect = 'none'
  }
  const onMouseMove = (e) => {
    if (!isDown.current) return
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX.current) * 1.4
    if (Math.abs(walk) > 4) isDragging.current = true
    trackRef.current.scrollLeft = scrollStart.current - walk
  }
  const onMouseUp = () => {
    isDown.current = false
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab'
      trackRef.current.style.userSelect = ''
    }
  }
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX }
  const onTouchMove  = (e) => {
    const dx = touchStart.current - e.touches[0].clientX
    trackRef.current.scrollLeft += dx * 0.8
    touchStart.current = e.touches[0].clientX
  }

  return (
    <section style={{ paddingTop: '100px', paddingBottom: '80px', background: '#0a0a0a', overflow: 'hidden' }}>

      {/* Header */}
      <div
        ref={sectionRef}
        style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: '40px', padding: '0 clamp(24px, 5vw, 80px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: '11px',
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.7)', margin: '0 0 10px',
          }}>Featured</p>
          <h2 style={{
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
            fontWeight: 800, color: '#f5f5f5',
            lineHeight: 1.0, margin: 0, letterSpacing: '-0.03em',
          }}>Our Guests</h2>
        </motion.div>

        {/* Arrows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'flex', gap: '10px', paddingBottom: '4px', flexShrink: 0 }}
        >
          {['left', 'right'].map(dir => (
            <motion.button
              key={dir}
              onClick={() => scroll(dir)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              aria-label={dir === 'left' ? 'Previous guests' : 'Next guests'}
              style={{
                width: 52, height: 52, borderRadius: '50%',
                border: '1px solid rgba(201,168,76,0.4)',
                background: 'rgba(10,10,10,0.8)',
                color: '#c9a84c', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
                backdropFilter: 'blur(8px)', transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.9)'
                e.currentTarget.style.background = 'rgba(201,168,76,0.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'
                e.currentTarget.style.background = 'rgba(10,10,10,0.8)'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                {dir === 'left'
                  ? <path d="M11 3L5 9L11 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  : <path d="M7 3L13 9L7 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                }
              </svg>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Slider track */}
      <div
        ref={trackRef}
        className="episodes-track"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        style={{
          display: 'flex', gap: `${CARD_GAP}px`, alignItems: 'flex-start',
          overflowX: 'auto', overflowY: 'visible',
          paddingLeft: 'clamp(24px, 5vw, 80px)',
          paddingRight: 'clamp(24px, 5vw, 80px)',
          paddingBottom: '16px', cursor: 'grab',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {guests.map((guest, i) => (
          <GuestCard key={guest.photo + i} guest={guest} index={i} isInView={isInView} cardWidth={CARD_WIDTH} />
        ))}
      </div>
    </section>
  )
}

function GuestCard({ guest, index, isInView, cardWidth }) {
  const firstName = guest.name.split(' ')[0]
  const lastName  = guest.name.split(' ').slice(1).join(' ')

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ flexShrink: 0, width: `${cardWidth}px`, textAlign: 'center' }}
    >
      {/* Photo */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          width: '100%', aspectRatio: '1 / 1',
          borderRadius: '16px', overflow: 'hidden',
          border: '1px solid rgba(201,168,76,0.12)',
          background: '#111',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          position: 'relative',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)'
          e.currentTarget.style.boxShadow = '0 0 32px rgba(201,168,76,0.1), 0 12px 40px rgba(0,0,0,0.6)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(201,168,76,0.12)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'
        }}
      >
        <img
          src={guest.photo}
          alt={guest.name}
          draggable={false}
          onError={e => { e.currentTarget.style.display = 'none' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
        />
        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
          background: 'linear-gradient(to top, rgba(10,10,10,0.5), transparent)',
          pointerEvents: 'none',
        }} />
      </motion.div>

      {/* Name */}
      <div style={{ marginTop: '14px' }}>
        <p style={{
          fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
          fontSize: '15px', fontWeight: 700,
          color: 'rgba(245,245,245,0.9)', margin: 0, lineHeight: 1.2,
        }}>
          {firstName}
        </p>
        {lastName && (
          <p style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '13px', fontWeight: 300,
            color: 'rgba(245,245,245,0.45)', margin: '2px 0 0',
          }}>
            {lastName}
          </p>
        )}
      </div>
    </motion.div>
  )
}
