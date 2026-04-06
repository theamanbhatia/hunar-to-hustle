import Hero     from './components/Hero'
import Episodes from './components/Episodes'
import About    from './components/About'
import Contact  from './components/Contact'

export default function App() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <Hero     />
      <Episodes />
      <About    />
      <Contact  />
    </main>
  )
}
