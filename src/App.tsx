import AnnouncementBar from './components/AnnouncementBar'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import PromoBanner from './components/PromoBanner'
import StoryBanner from './components/StoryBanner'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'

/**
 * Top-level page composition for the EDRU PATISSERIE single-page site.
 * Sections are ordered to mirror the reference layout: announcement ->
 * header/nav -> hero -> product catalogue -> promo -> story -> footer.
 */
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductGrid />
        <PromoBanner />
        <StoryBanner />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}

export default App
