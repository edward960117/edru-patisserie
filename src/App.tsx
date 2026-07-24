import ProductGrid from './components/ProductGrid'
import StoryBanner from './components/StoryBanner'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import { LanguageProvider } from './i18n/LanguageContext'

/**
 * Top-level page composition for the ÈDRU PATISSERIE single-page site.
 * Page now starts directly from ProductGrid ("Our Seasonal Creations").
 * Wrapped in `LanguageProvider` so sections can render in English or Chinese.
 */
function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          <ProductGrid />
          <StoryBanner />
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </LanguageProvider>
  )
}

export default App
