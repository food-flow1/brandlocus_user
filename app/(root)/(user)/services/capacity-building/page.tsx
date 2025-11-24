import React from 'react'
import HeroSection from '../(components)/HeroSection'
import { images } from '@/constants'
import OurExpertise from '../(components)/OurExpertise'

const CapacityBuildingPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <HeroSection
        title="Capacity Building"
        description="Our Capacity Building services focus on strengthening the people and processes that drive organizational success. We equip businesses with the tools to adapt, grow, and achieve long-term impact."
        image={images.capacityBuilding} />
      <OurExpertise
        title="Build stronger teams with skills that drive sustainable growth"
        description="We design capacity-building programs that empower leaders, sharpen workforce capabilities, and prepare organizations for future challenges."
        offerings={[
          {
            title: "Leadership Development",
            description: "Train and mentor leaders to inspire teams, make better decisions, and drive long-term success"
          },
          {
            title: "Workforce Upskilling",
            description: "Equip employees with relevant, future-ready skills through tailored training modules and workshops."
          },
          {
            title: "Organizational Learning Programs",
            description: "Design systems that embed continuous learning, knowledge sharing, and innovation."
          },
          {
            title: "Change Management Support",
            description: "Guide teams through organizational shifts with proven frameworks that reduce resistance and improve adoption."
          },
          {
            title: "Performance Coaching",
            description: "Provide personalized coaching that strengthens individual and team performance for measurable impact."
          }
        ]}
      />
    </div>
  )
}

export default CapacityBuildingPage