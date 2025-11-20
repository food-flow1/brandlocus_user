import React from 'react'
import HeroPage from './HeroPage'
import AboutUs from './AboutUs'
import OurServices from './OurServices'
import WhyChoose from './WhyChoose'
import Blog from './Blog'
import Reviews from './Reviews'
import FAG from './FAG'
import Unlock from './Unlock'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroPage />
      <AboutUs />
      <OurServices />
      <WhyChoose />
      <Blog />
      <Reviews />
      <FAG />
      <Unlock />
    </div>
  )
}

export default HomePage 