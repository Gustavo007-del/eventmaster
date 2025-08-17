import { Header } from '@/components/layout/Header'
import { Hero } from '@/components/sections/Hero'
import { ServicesPreview } from '@/components/sections/ServicesPreview'
import { EquipmentPreview } from '@/components/sections/EquipmentPreview'
import { Testimonials } from '@/components/sections/Testimonials'
import { Stats } from '@/components/sections/Stats'
import { CTA } from '@/components/sections/CTA'
import { Footer } from '@/components/layout/Footer'
import { DecorationsPreview } from '@/components/sections/DecorationsPreview'
import { CateringPreview } from '@/components/sections/CateringPreview'
import { TablesChairsPreview } from '@/components/sections/TablesChairsPreview'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <ServicesPreview />
        <DecorationsPreview />
        <TablesChairsPreview />
        <EquipmentPreview />
        <CateringPreview />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
