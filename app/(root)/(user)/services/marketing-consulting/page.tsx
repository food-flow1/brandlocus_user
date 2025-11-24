import React from 'react'
import HeroSection from '../(components)/HeroSection'
import { images } from '@/constants'
import OurExpertise from '../(components)/OurExpertise'

const MarketingConsultingPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <HeroSection title="Marketing Consulting"
        description="We specialize in crafting and managing brands that resonate, inspire, and drive results. From strategy development to execution, we ensure your brand captures your unique essence and engages your target audience across every touchpoint."
        image={images.brandManagement} 
        />
      <OurExpertise
        title="Transform your marketing into a growth engine."
        description="We provide strategic marketing consulting to align campaigns with business goals, optimize performance, and maximize ROI."
        offerings={[
          {
            title: "Marketing Strategy Audits",
            description: "Assess funnels, messaging, and channels to identify high-impact improvements."
          },
          {
            title: "Campaign Planning & Execution",
            description: "Design and oversee campaigns that connect with the right audience."
          },
          {
            title: "Performance Analytics",
            description: "Track KPIs, optimize budgets, and measure results for transparency and growth."
          },
          {
            title: "Team Training & Upskilling",
            description: "Build in-house marketing capabilities with proven best practices."
          },
          {
            title: "Content & Messaging Alignment",
            description: "Refine brand messages for clarity, consistency, and market relevance."
          }
        ]}
      />
    </div>
  )
}

export default MarketingConsultingPage

