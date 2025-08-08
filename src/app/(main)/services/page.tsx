import { Header } from '@/components/layout/Header'
import { ServicesList } from '@/components/services/ServicesList'
import { Footer } from '@/components/layout/Footer'

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="section-padding">
          <div className="container mx-auto container-padding">
            <div className="text-center mb-16">
              <h1 className="text-heading text-gray-900 mb-4 font-bold">Our Services</h1>
              <p className="text-subheading text-gray-600 max-w-2xl mx-auto">
                From intimate celebrations to grand spectacles, we create unforgettable experiences
              </p>
            </div>
            <ServicesList />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
