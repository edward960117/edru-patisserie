import AnnouncementBar from './components/AnnouncementBar'
import Header from './components/Header'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import { LanguageProvider } from './i18n/LanguageContext'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CakeOptionsPage from './pages/CakeOptionsPage'
import ProductDetailPage from './pages/ProductDetailPage'

/**
 * Top-level page composition for the ÈDRU PATISSERIE single-page site.
 * Page now starts directly from ProductGrid ("Our Seasonal Creations").
 * Wrapped in `LanguageProvider` so sections can render in English or Chinese.
 */
function App() {
  return (
    <LanguageProvider>
      <div id="top" className="min-h-screen flex flex-col">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cakes/:productId" element={<CakeOptionsPage />} />
            <Route path="/product/:productId/:optionId" element={<ProductDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </LanguageProvider>
  )
}

export default App
