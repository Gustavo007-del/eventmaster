import { Header } from '@/components/layout/Header'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { Footer } from '@/components/layout/Footer'

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="section-padding">
          <div className="container mx-auto container-padding">
            <div className="text-center mb-16">
              <h1 className="text-heading text-gray-900 mb-4 font-bold">Event Gallery</h1>
              <p className="text-subheading text-gray-600 max-w-2xl mx-auto">
                Explore our portfolio of successfully executed events
              </p>
            </div>
            <GalleryGrid />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
