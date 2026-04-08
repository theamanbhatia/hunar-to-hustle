import Hero     from './components/Hero'
import Episodes from './components/Episodes'
import Guests   from './components/Guests'
import About    from './components/About'
import Contact  from './components/Contact'

export default function App() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <Hero     />
      <Episodes />
      <Guests   />
      <About    />
      <Contact  />
    </main>
  )
}
