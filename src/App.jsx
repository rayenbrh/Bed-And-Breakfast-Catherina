import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { LoadingScreen } from './components/LoadingScreen'
import { ScrollToTop } from './components/ScrollToTop'
import { SkipToContent } from './components/SkipToContent'
import { AboutSection } from './components/sections/AboutSection'
import { AmenitiesSection } from './components/sections/AmenitiesSection'
import { BookingSection } from './components/sections/BookingSection'
import { GallerySection } from './components/sections/GallerySection'
import { HeroSection } from './components/sections/HeroSection'
import { LocationSection } from './components/sections/LocationSection'
import { RoomsSection } from './components/sections/RoomsSection'
import { TestimonialsSection } from './components/sections/TestimonialsSection'
import { BokehBackground } from './components/ui/BokehBackground'

function HomePage() {
  return (
    <>
      <SkipToContent />
      <Navbar />
      <main id="main-content" className="relative z-10 outline-none" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <RoomsSection />
        <AmenitiesSection />
        <GallerySection />
        <LocationSection />
        <TestimonialsSection />
        <BookingSection />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollToTop />
        <LoadingScreen>
          <div className="relative min-h-screen overflow-x-hidden">
            <BokehBackground />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </LoadingScreen>
      </HashRouter>
    </ThemeProvider>
  )
}
