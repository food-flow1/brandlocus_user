import React from 'react'
import HeroSection from './HeroSection'
import WhyChoose from '../home/WhyChoose'
import OurCore from './OurCore'
import OurTeam from './OurTeam'
import AboutFAG from './AboutFAG'
import Unlock from '../home/Unlock'

const AboutUsPage = () => {
  return (
    <div className=" pt-20">
      <HeroSection />
      <WhyChoose />
      <OurCore />
      <OurTeam />
      <AboutFAG />
      <Unlock />
    </div>
  )
}

export default AboutUsPage