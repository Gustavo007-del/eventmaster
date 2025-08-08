import { Header } from '@/components/layout/Header'
import { BookingForm } from '@/components/forms/BookingForm'
import { Footer } from '@/components/layout/Footer'

export default function BookingPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="section-padding">
          <div className="container mx-auto container-padding">
            <div className="text-center mb-16">
              <h1 className="text-heading text-gray-900 mb-4 font-bold">Book Your Event</h1>
              <p className="text-subheading text-gray-600 max-w-2xl mx-auto">
                Let's create something amazing together
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <BookingForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
