import { images } from '@/constants'
import React from 'react'
import HeroSection from '../(components)/HeroSection'
import OurExpertise from '../(components)/OurExpertise'

const TradeInvestmentPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <HeroSection
        title="Trade & Investment Facilitation"
        description="Our Trade & Investment Facilitation services are designed to help businesses access new markets, attract the right investors, and build the networks needed for expansion"
        image={images.tradeInvestment} 
        />
        <OurExpertise
          title="Connect with capital, markets, and partnerships that fuel growth"
          description="We help businesses unlock new opportunities by facilitating trade, investment, and cross-border expansion with reduced risk."
          offerings={[
            {
              title: "Market Entry Strategy",
              description: "Research, plan, and navigate new markets with clear strategies and compliance support."
            },
            {
              title: "Investor & Partner Connections",
              description: "Build relationships with investors, distributors, and strategic partners."
            },
            {
              title: "Regulatory Compliance Guidance",
              description: "Navigate trade regulations and legal frameworks with confidence."
            },
            {
              title: "Deal Structuring & Advisory",
              description: "Support negotiations, due diligence, and proposals that lead to successful outcomes"
            },
            {
              title: "Investment Readiness Programs",
              description: "Prepare businesses with the tools and insights needed to attract funding."
            }
          ]}
        />
    </div>
  )
}

export default TradeInvestmentPage