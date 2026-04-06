import { useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─────────────────────────────────────────
   EPISODE DATA
   Replace VIDEO_IDs with actual YouTube IDs
   in chronological order before deploying.
───────────────────────────────────────── */
const episodes = [
  { id: 'N9oL2Z_dF_g', title: 'Legend of Bollywood — Raza Murad (Ep. 1)' },
  { id: 'O2zyDZrPApw', title: 'You\'ve Seen Him Everywhere — Virendra Saxena (Promo)' },
  { id: '6rWpPIsNzF0', title: 'A Journey Through Life and Cinema — Raza Murad' },
  { id: '0gtiYBJJ2iM', title: 'From Struggles to Success — Virendra Saxena' },
  { id: '80j8jFRo_II', title: 'Real Talk with Virendra Saxena (Ep. 2)' },
]

const CARD_WIDTH   = 560
const CARD_GAP     = 28
const SCROLL_STEP  = CARD_WIDTH + CARD_GAP

function ArrowButton({ direction, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      aria-label={direction === 'left' ? 'Previous episodes' : 'Next episodes'}
      style={{
        width: 52,
        height: 52,
        borderRadius: '50%',
        border: '1px solid rgba(201, 168, 76, 0.4)',
        background: 'rgba(10, 10, 10, 0.8)',
        color: '#c9a84c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        backdropFilter: 'blur(8px)',
        transition: 'border-color 0.2s, background 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201, 168, 76, 0.9)'
        e.currentTarget.style.background   = 'rgba(201, 168, 76, 0.1)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(201, 168, 76, 0.4)'
        e.currentTarget.style.background   = 'rgba(10, 10, 10, 0.8)'
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        {direction === 'left' ? (
          <path d="M11 3L5 9L11 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M7 3L13 9L7 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </motion.button>
  )
}

export default function Episodes() {
  const trackRef    = useRef(null)
  const sectionRef  = useRef(null)
  const isDown      = useRef(false)
  const startX      = useRef(0)
  const scrollStart = useRef(0)
  const isDragging  = useRef(false)

  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  /* ── Arrow navigation ── */
  const scroll = useCallback((dir) => {
    trackRef.current?.scrollBy({
      left: dir === 'left' ? -SCROLL_STEP : SCROLL_STEP,
      behavior: 'smooth',
    })
  }, [])

  /* ── Mouse drag ── */
  const onMouseDown = (e) => {
    isDown.current  = true
    isDragging.current = false
    startX.current  = e.pageX - trackRef.current.offsetLeft
    scrollStart.current = trackRef.current.scrollLeft
    trackRef.current.style.cursor = 'grabbing'
    trackRef.current.style.userSelect = 'none'
  }

  const onMouseMove = (e) => {
    if (!isDown.current) return
    const x    = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX.current) * 1.4
    if (Math.abs(walk) > 4) isDragging.current = true
    trackRef.current.scrollLeft = scrollStart.current - walk
  }

  const onMouseUp = () => {
    isDown.current = false
    if (trackRef.current) {
      trackRef.current.style.cursor    = 'grab'
      trackRef.current.style.userSelect = ''
    }
  }

  /* ── Touch swipe (native) ── */
  const touchStart = useRef(0)
  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX
  }
  const onTouchMove = (e) => {
    const dx = touchStart.current - e.touches[0].clientX
    trackRef.current.scrollLeft += dx * 0.8
    touchStart.current = e.touches[0].clientX
  }

  return (
    <section
      id="episodes"
      style={{
        paddingTop:    '120px',
        paddingBottom: '120px',
        background:    '#0a0a0a',
        overflow:      'hidden',
      }}
    >
      {/* Heading row — label + title left, arrows right */}
      <div
        ref={sectionRef}
        style={{
          display:       'flex',
          alignItems:    'flex-end',
          justifyContent:'space-between',
          marginBottom:  '36px',
          padding:       '0 clamp(24px, 5vw, 80px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{
            fontFamily:    '"DM Sans", sans-serif',
            fontSize:      '11px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color:         'rgba(201,168,76,0.7)',
            marginBottom:  '10px',
            margin:        '0 0 10px',
          }}>
            Watch
          </p>
          <h2 style={{
            fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize:     'clamp(2.4rem, 5vw, 4.5rem)',
            fontWeight:   800,
            color:        '#f5f5f5',
            lineHeight:   1.0,
            margin:       0,
            letterSpacing:'-0.03em',
          }}>
            Latest Episodes
          </h2>
        </motion.div>

        {/* Arrows — top right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'flex', gap: '10px', paddingBottom: '4px', flexShrink: 0 }}
        >
          <ArrowButton direction="left"  onClick={() => scroll('left')}  />
          <ArrowButton direction="right" onClick={() => scroll('right')} />
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
          display:         'flex',
          gap:             `${CARD_GAP}px`,
          overflowX:       'auto',
          overflowY:       'visible',
          paddingLeft:     'clamp(24px, 5vw, 80px)',
          paddingRight:    'clamp(24px, 5vw, 80px)',
          paddingBottom:   '12px',
          cursor:          'grab',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {episodes.map((ep, i) => (
          <EpisodeCard
            key={ep.id}
            episode={ep}
            index={i}
            isInView={isInView}
            isDragging={isDragging}
          />
        ))}
      </div>
    </section>
  )
}

function EpisodeCard({ episode, index, isInView, isDragging }) {
  const handleClick = (e) => {
    // Prevent iframe clicks from firing while drag is in progress
    if (isDragging.current) e.preventDefault()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay:    index * 0.12,
        ease:     [0.25, 0.1, 0.25, 1],
      }}
      style={{
        flexShrink:   0,
        width:        `min(${CARD_WIDTH}px, 88vw)`,
        borderRadius: '14px',
        overflow:     'hidden',
        background:   '#111111',
        border:       '1px solid rgba(201, 168, 76, 0.1)',
        transition:   'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201, 168, 76, 0.55)'
        e.currentTarget.style.boxShadow   = '0 0 40px rgba(201, 168, 76, 0.08), 0 8px 32px rgba(0,0,0,0.5)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(201, 168, 76, 0.1)'
        e.currentTarget.style.boxShadow   = 'none'
      }}
    >
      {/* 16:9 iframe container */}
      <div
        onClick={handleClick}
        style={{
          position:    'relative',
          aspectRatio: '16 / 9',
          background:  '#000',
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${episode.id}`}
          title={episode.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            position: 'absolute',
            inset:    0,
            width:    '100%',
            height:   '100%',
            border:   'none',
            display:  'block',
          }}
          loading="lazy"
        />
      </div>

      {/* Card footer */}
      <div style={{
        padding:        '18px 20px',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
      }}>
        <p style={{
          fontFamily:   '"Plus Jakarta Sans", system-ui, sans-serif',
          fontSize:     '14px',
          fontWeight:   600,
          color:        'rgba(245, 245, 245, 0.85)',
          margin:       0,
          letterSpacing:'-0.01em',
        }}>
          {episode.title}
        </p>
        <span style={{
          fontFamily:    '"DM Sans", sans-serif',
          fontSize:      '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color:         'rgba(201, 168, 76, 0.5)',
        }}>
          #{String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </motion.div>
  )
}
