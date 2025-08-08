import { Header } from '@/components/layout/Header'
import { EquipmentList } from '@/components/equipment/EquipmentList'
import { Footer } from '@/components/layout/Footer'

export default function EquipmentPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="section-padding">
          <div className="container mx-auto container-padding">
            <div className="text-center mb-16">
              <h1 className="text-heading text-gray-900 mb-4 font-bold">Equipment Rental</h1>
              <p className="text-subheading text-gray-600 max-w-2xl mx-auto">
                Premium quality equipment for all your event needs
              </p>
            </div>
            <EquipmentList />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
