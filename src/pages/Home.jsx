import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import ServicesSection from "../tt/components/ServicesSection";
import VetSection from "../tt/components/VetSection";
import TestimonialsSection from "../tt/components/TestimonialsSection";
import CtaSection from "../tt/components/CtaSection";
import Topbarber from '../components/Topbarber'
import Banner from '../components/Banner'
// import Mobile from '../components/mobile'

const Home = () => {
  return (
    <div>
      <Header />
      <ServicesSection />
      <VetSection />
      <TestimonialsSection />
      <CtaSection />
      <Topbarber />

      {/* <Banner /> */}

      {/* <Mobile/> */}

    </div>
  )
}

export default Home