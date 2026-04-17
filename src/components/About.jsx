import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

/* ── Count-up hook ── */
function useCountUp(target, duration = 2200, decimals = 1) {
  const [value, setValue] = useState(0)
  const [done,  setDone]  = useState(false)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView || done) return
    let start = null
    const ease = t => 1 - Math.pow(1 - t, 3)
    const tick = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setValue(parseFloat((target * ease(p)).toFixed(decimals)))
      if (p < 1) requestAnimationFrame(tick)
      else { setValue(target); setDone(true) }
    }
    requestAnimationFrame(tick)
  }, [inView, done, target, duration, decimals])

  return [value, ref]
}

/* ── Ambient glow blob ── */
const Glow = ({ style }) => (
  <div aria-hidden style={{
    position: 'absolute', borderRadius: '50%',
    pointerEvents: 'none', filter: 'blur(90px)', ...style,
  }} />
)

/* ── Floating star ── */
const Star = ({ delay = 0, style }) => (
  <motion.span
    aria-hidden
    animate={{ y: [0, -10, 0], opacity: [0.25, 0.6, 0.25] }}
    transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    style={{ position: 'absolute', color: '#c9a84c', fontSize: '9px', pointerEvents: 'none', ...style }}
  >✦</motion.span>
)

/* ── Subscriber badge ── */
function SubscriberBadge() {
  const [count, ref] = useCountUp(1.27, 2200, 2)
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '14px',
          marginTop: '40px', padding: '18px 28px', borderRadius: '100px',
          border: '1px solid rgba(201,168,76,0.4)',
          background: 'rgba(201,168,76,0.07)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 0 32px rgba(201,168,76,0.07), inset 0 1px 0 rgba(255,255,255,0.05)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* shimmer sweep */}
        <motion.div
          animate={{ x: ['-120%', '220%'] }}
          transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.14), transparent)',
            pointerEvents: 'none',
          }}
        />
        <motion.span
          animate={{ rotate: [0, 18, 0, -18, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: '#c9a84c', fontSize: '18px', lineHeight: 1, flexShrink: 0 }}
        >✦</motion.span>
        <div>
          <div style={{
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: '22px', fontWeight: 700,
            color: '#c9a84c', lineHeight: 1, letterSpacing: '-0.01em',
          }}>
            {count.toFixed(1)} Million+
          </div>
          <div style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '11px', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(201,168,76,0.55)', marginTop: '4px',
          }}>
            YouTube Subscribers
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ── Main ── */
export default function About() {
  const sectionRef = useRef(null)
  const imageRef   = useRef(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], [-28, 28])

  const paras = [
    'Hunar to Hustle is where raw talent meets real stories from the entertainment industry. Each episode dives into the journeys of actors, creators, performers, and industry insiders who have turned their passion into a profession.',
    'From behind-the-scenes struggles to breakthrough moments, the podcast uncovers what it truly takes to build a career in a competitive creative space. Expect honest conversations, career insights, and lessons that go beyond the spotlight.',
    "Whether you're an aspiring artist or simply curious about the realities of the industry, Hunar to Hustle offers a grounded, unfiltered look at what it means to chase and sustain success.",
  ]

  return (
    <section id="about" ref={sectionRef} style={{
      position: 'relative', paddingTop: '140px', paddingBottom: '160px',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #0e0e0e 50%, #0a0a0a 100%)',
      overflow: 'hidden',
    }}>
      {/* Glows */}
      <Glow style={{ top: '-5%', right: '-6%', width: '550px', height: '550px', background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 65%)' }} />
      <Glow style={{ bottom: '5%', left: '-8%', width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 65%)' }} />
      <Star delay={0}   style={{ top: '20%', left: '6%' }} />
      <Star delay={1.6} style={{ top: '65%', right: '5%' }} />
      <Star delay={0.9} style={{ bottom: '18%', left: '42%' }} />

      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 clamp(24px, 5vw, 80px)', position: 'relative', zIndex: 1,
      }}>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          style={{
            fontFamily: '"DM Sans", sans-serif', fontSize: '11px',
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.7)', marginBottom: '14px',
          }}
        >About</motion.p>

        {/* Heading */}
        <div style={{ marginBottom: '72px', overflow: 'hidden' }}>
          <motion.h2
            initial={{ opacity: 0, y: 56 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: 'clamp(3rem, 6.5vw, 6rem)',
              fontWeight: 800, lineHeight: 1.0,
              letterSpacing: '-0.03em', color: '#f5f5f5', margin: 0,
            }}
          >
            Hunar to Hustle
          </motion.h2>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: 'clamp(48px, 6vw, 96px)', alignItems: 'start',
        }}>

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -44 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Gold rule */}
            <motion.div
              initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.55, delay: 0.3 }}
              style={{ height: '1px', width: '40px', background: 'linear-gradient(90deg, #c9a84c, rgba(201,168,76,0.2))', marginBottom: '28px', transformOrigin: 'left' }}
            />

            {/* Paragraphs — clean, no glass card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {paras.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 'clamp(15px, 1.4vw, 16.5px)', lineHeight: 1.82,
                    fontWeight: 300, color: 'rgba(245,245,245,0.68)', margin: 0,
                  }}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <SubscriberBadge />
          </motion.div>

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0, x: 44 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative' }}
          >
            {/* Corner brackets */}
            {[
              { top: '-14px', left: '-14px', borderTop: '1.5px solid rgba(201,168,76,0.55)', borderLeft: '1.5px solid rgba(201,168,76,0.55)', borderRadius: '2px 0 0 0' },
              { bottom: '-14px', right: '-14px', borderBottom: '1.5px solid rgba(201,168,76,0.55)', borderRight: '1.5px solid rgba(201,168,76,0.55)', borderRadius: '0 0 2px 0' },
            ].map((s, i) => (
              <motion.div key={i} aria-hidden
                initial={{ opacity: 0, scale: 0.6 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.45, delay: 0.7 + i * 0.08 }}
                style={{ position: 'absolute', width: '36px', height: '36px', zIndex: 2, ...s }}
              />
            ))}

            {/* Glow behind image */}
            <div aria-hidden style={{
              position: 'absolute', inset: '-20px', borderRadius: '20px',
              background: 'radial-gradient(ellipse at 55% 40%, rgba(201,168,76,0.1) 0%, transparent 68%)',
              filter: 'blur(18px)', pointerEvents: 'none',
            }} />

            {/* Image card */}
            <div ref={imageRef} style={{
              position: 'relative', borderRadius: '16px', overflow: 'hidden',
              border: '1px solid rgba(201,168,76,0.22)',
              boxShadow: '0 28px 72px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03)',
            }}>
              {/* Top shimmer */}
              <div aria-hidden style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px', zIndex: 2,
                background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.45) 50%, transparent)',
              }} />

              <motion.img
                src="/raj_main.png"
                alt="Raj Sandhu — Host of Hunar to Hustle"
                draggable={false}
                style={{ y: imageY, display: 'block', width: '100%', height: 'auto', maxHeight: '640px', objectFit: 'cover', objectPosition: 'center top' }}
                onError={e => { if (!e.currentTarget.src.includes('.jpg')) e.currentTarget.src = '/Raj_main.jpg' }}
              />

              {/* Bottom fade + name */}
              <div aria-hidden style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
                background: 'linear-gradient(to top, rgba(10,10,10,0.65), transparent)',
                pointerEvents: 'none',
              }} />
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.85 }}
                style={{ position: 'absolute', bottom: '20px', left: '22px', zIndex: 3 }}
              >
                <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '17px', fontWeight: 700, color: 'rgba(245,245,245,0.92)', margin: 0, textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}>
                  Raj Sandhu
                </p>
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.8)', margin: '3px 0 0', textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
                  Host &amp; Creator
                </p>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Platform Stats Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop:    '96px',
            border:       '1px solid rgba(201,168,76,0.15)',
            borderRadius: '20px',
            overflow:     'hidden',
          }}
        >
          {/* Table header */}
          <div style={{
            display:             'grid',
            gridTemplateColumns: '1.4fr 1.2fr 1.4fr 2fr',
            padding:             '16px 32px',
            borderBottom:        '1px solid rgba(255,255,255,0.06)',
          }}>
            {['Platform', 'Followers', 'Lifetime Views', 'Key Highlights'].map(h => (
              <span key={h} style={{
                fontFamily:    '"DM Sans", sans-serif',
                fontSize:      '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color:         'rgba(245,245,245,0.3)',
              }}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          {/* YouTube */}
          {[
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="6" fill="#FF0000" opacity="0.15"/>
                  <path d="M21.8 7.2s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.6 4 12 4 12 4s-4.6 0-7 .3c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 8.8 2 10.4v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.3.9C6.8 18 12 18 12 18s4.6 0 7-.3c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 8.8 21.8 7.2 21.8 7.2zM9.7 14.5V9l5.4 2.8-5.4 2.7z" fill="#FF0000"/>
                </svg>
              ),
              name: 'YouTube', followers: '1.3+ Million', views: '410K+', highlight: 'Fastest growing channel.',
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="6" fill="url(#ig)" opacity="0.2"/>
                  <defs>
                    <linearGradient id="ig" x1="0" y1="24" x2="24" y2="0">
                      <stop stopColor="#F58529"/><stop offset="0.5" stopColor="#DD2A7B"/><stop offset="1" stopColor="#8134AF"/>
                    </linearGradient>
                  </defs>
                  <rect x="2" y="2" width="20" height="20" rx="6" stroke="url(#ig)" strokeWidth="1.8" fill="none"/>
                  <circle cx="12" cy="12" r="4.5" stroke="url(#ig)" strokeWidth="1.8" fill="none"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="#DD2A7B"/>
                </svg>
              ),
              name: 'Instagram', followers: '966K', views: '16.8 Million+', highlight: '10+ Pages posting 30+ daily posts.',
            },
          ].map((row, i) => (
            <motion.div
              key={row.name}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
              style={{
                display: 'grid', gridTemplateColumns: '1.4fr 1.2fr 1.4fr 2fr',
                padding: '22px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)',
                alignItems: 'center', transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.03)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {row.icon}
                <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '15px', fontWeight: 600, color: 'rgba(245,245,245,0.85)' }}>{row.name}</span>
              </div>
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '15px', fontWeight: 500, color: 'rgba(245,245,245,0.75)' }}>{row.followers}</span>
              <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '15px', fontWeight: 600, color: '#c9a84c' }}>{row.views}</span>
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', fontWeight: 300, color: 'rgba(245,245,245,0.45)', lineHeight: 1.5 }}>{row.highlight}</span>
            </motion.div>
          ))}

          {/* TikTok — Coming Soon */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.66 }}
            style={{
              display: 'grid', gridTemplateColumns: '1.4fr 3.6fr',
              padding: '22px 32px', alignItems: 'center', transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.03)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="6" fill="#010101" opacity="0.6"/>
                <path d="M19.6 8.4a4.8 4.8 0 01-4.8-4.8h-2.4v10.7a2.4 2.4 0 11-2.4-2.3v-2.5a4.8 4.8 0 104.8 4.8V9.5a7.2 7.2 0 004.8 1.8V8.9a4.8 4.8 0 01-4.8-4.8" fill="white" opacity="0.8"/>
              </svg>
              <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '15px', fontWeight: 600, color: 'rgba(245,245,245,0.85)' }}>TikTok</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <span style={{
                fontFamily:    '"DM Sans", sans-serif',
                fontSize:      '12px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color:         'rgba(201,168,76,0.45)',
                border:        '1px solid rgba(201,168,76,0.2)',
                padding:       '5px 16px',
                borderRadius:  '100px',
              }}>Coming Soon</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
