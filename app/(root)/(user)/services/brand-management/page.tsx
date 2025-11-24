import React from 'react'
import HeroSection from '../(components)/HeroSection'
import { images } from '@/constants'
import OurExpertise from '../(components)/OurExpertise'

const BrandManagementPage = () => {
  return (
    <div className="min-h-screen pt-20 overflow-x-hidden">
      <HeroSection
        title="Brand Management"
        description="Our Brand Management services focus on shaping strong brand identities and maintaining consistent communication across all touchpoints. From strategy to execution, we ensure your brand reflects its value"
        image={images.brandManagementServices}
      />
      <OurExpertise
        title="Tell a story that moves people and markets."
        description="Campaigns that drive awareness, engagement, and conversion online and offline"
        offerings={[
          {
            title: "Brand Identity Development",
            description: "We'll work with you to craft a distinctive identity with logos, messaging, and a brand voice that reflects your values and captivates your audience."
          },
          {
            title: "Marketing Strategy & Campaign Planning",
            description: "Develop data-driven campaigns that drive awareness, engagement, and conversions across digital and traditional channels."
          },
          {
            title: "Content Creation & Storytelling",
            description: "Create impactful content that communicates your brand story, including blogs, social media posts, videos, and more."
          },
          {
            title: "Social Media Strategy & Management",
            description: "Build and execute comprehensive social media strategies that engage your audience, build community, and drive meaningful interactions across platforms."
          },
          {
            title: "Performance Analytics & Insights",
            description: "Track, measure, and analyze campaign performance to gain actionable insights that optimize your marketing efforts and maximize ROI."
          }
        ]}
      />
    </div>
  )
}

export default BrandManagementPage

