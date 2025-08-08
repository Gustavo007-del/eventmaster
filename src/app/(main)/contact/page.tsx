import { Header } from '@/components/layout/Header'
import { ContactForm } from '@/components/forms/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { Footer } from '@/components/layout/Footer'

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="section-padding">
          <div className="container mx-auto container-padding">
            <div className="text-center mb-16">
              <h1 className="text-heading text-gray-900 mb-4 font-bold">Get In Touch</h1>
              <p className="text-subheading text-gray-600 max-w-2xl mx-auto">
                Ready to create magical moments? Contact us to discuss your event requirements
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-16">
              <ContactInfo />
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
