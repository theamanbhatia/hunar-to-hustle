import { useEffect, useRef, useState, Suspense } from 'react'
import Spline from '@splinetool/react-spline'
import ScrollIndicator from './ScrollIndicator'

/* Loading placeholder shown while Spline initialises */
function SplineLoader() {
  return (
    <div style={{
      position:       'absolute',
      inset:          0,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      background:     '#0a0a0a',
    }}>
      <div style={{
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        gap:           '16px',
      }}>
        {/* Gold pulsing ring */}
        <div style={{
          width:        '48px',
          height:       '48px',
          borderRadius: '50%',
          border:       '1.5px solid rgba(201,168,76,0.2)',
          borderTop:    '1.5px solid #c9a84c',
          animation:    'spin 1s linear infinite',
        }} />
        <span style={{
          fontFamily:    '"DM Sans", sans-serif',
          fontSize:      '11px',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color:         'rgba(201,168,76,0.45)',
        }}>
          Loading
        </span>
      </div>
    </div>
  )
}

function useRemoveSplineBadge() {
  useEffect(() => {
    const interval = setInterval(() => {
      const viewer = document.querySelector('spline-viewer')
      if (viewer && viewer.shadowRoot) {
        const logo = viewer.shadowRoot.querySelector('#logo')
        if (logo) {
          logo.remove()
          clearInterval(interval)
        }
      }
    }, 500)
    return () => clearInterval(interval)
  }, [])
}

export default function Hero() {
  useRemoveSplineBadge()

  const [tilt, setTilt]         = useState({ x: 0, y: 0 })
  const [gyroOn, setGyroOn]     = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const tiltTarget              = useRef({ x: 0, y: 0 })
  const rafRef                  = useRef(null)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* ─────────────────────────────────────────────────────────────
     MOBILE GYROSCOPE — device orientation → CSS 3D perspective tilt
  ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    const isPhone = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (!isPhone) return

    const lerp = (a, b, t) => a + (b - a) * t
    const tick = () => {
      setTilt(prev => {
        const nx = lerp(prev.x, tiltTarget.current.x, 0.07)
        const ny = lerp(prev.y, tiltTarget.current.y, 0.07)
        if (Math.abs(nx - prev.x) < 0.01 && Math.abs(ny - prev.y) < 0.01) return prev
        return { x: nx, y: ny }
      })
      rafRef.current = requestAnimationFrame(tick)
    }

    const onOrientation = (e) => {
      tiltTarget.current = {
        x: Math.max(-22, Math.min(22,  e.gamma ?? 0)),
        y: Math.max(-14, Math.min(14, (e.beta  ?? 45) - 45)),
      }
    }

    const startListening = () => {
      window.addEventListener('deviceorientation', onOrientation, { passive: true })
      setGyroOn(true)
      rafRef.current = requestAnimationFrame(tick)
    }

    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      window.addEventListener('touchstart', () => {
        DeviceOrientationEvent.requestPermission()
          .then(s => { if (s === 'granted') startListening() })
          .catch(() => {})
      }, { once: true })
    } else {
      startListening()
    }

    return () => {
      window.removeEventListener('deviceorientation', onOrientation)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const gyroTransform = gyroOn
    ? `perspective(900px) rotateY(${tilt.x * 0.22}deg) rotateX(${-tilt.y * 0.18}deg)`
    : 'none'

  return (
    <>
      {/* Spinner keyframe — injected once */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/*
        OUTER section — 250vh gives the Spline scroll animation
        its full runway. Now that Spline runs in the same JS
        context (not an iframe), it reads window.scrollY natively
        and the parallax animation plays as you scroll through.
      */}
      <section
        id="hero"
        style={{ position: 'relative', height: isMobile ? '80vh' : '250vh', backgroundColor: '#0a0a0a' }}
      >
        {/* STICKY VIEWPORT — square (1:1) on mobile, full-height on desktop */}
        <div
          style={{
            position:   'sticky',
            top:        0,
            height:     isMobile ? '75vh' : '100vh',
            width:      '100%',
            transform:  gyroTransform,
            willChange: gyroOn ? 'transform' : 'auto',
          }}
        >
          <Suspense fallback={<SplineLoader />}>
            <Spline
              scene="https://prod.spline.design/bGfAUvcFMeAHkNNv/scene.splinecode"
              style={{
                position: 'absolute',
                inset:    0,
                width:    '100%',
                height:   '100%',
              }}
            />
          </Suspense>

          <ScrollIndicator />

          {/* Cover the "Built with Spline" badge — full-width strip at bottom */}
          <div aria-hidden style={{
            position:   'absolute',
            bottom:     0,
            left:       0,
            right:      0,
            height:     '60px',
            background: '#0a0a0a',
            zIndex:     9999,
          }} />
        </div>
      </section>
    </>
  )
}
