import { useState } from 'react'
import Preloader  from './components/Preloader'
import Hero       from './components/Hero'
import Episodes   from './components/Episodes'
import Guests     from './components/Guests'
import About      from './components/About'
import Newsletter from './components/Newsletter'
import Contact    from './components/Contact'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
        <Hero       />
        <Episodes   />
        <Guests     />
        <About      />
        <Newsletter />
        <Contact    />
      </main>
    </>
  )
}
