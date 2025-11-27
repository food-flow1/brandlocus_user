import React from 'react'
import HeroSection from './HeroSection'
import Enpowering from './Enpowering'
import GameComponent from './GameComponent'
import Desk from './Desk'
import WhyItWorks from './WhyItWorks'
import HowPlayTestingWoks from './HowPlayTestingWoks'
import JoinPlayTest from './JoinPlayTest'
import PlayTester from './PlayTester'
import FAQBusiness from './FAQBusiness'
import ReadyToTurn from './ReadyToTurn'

const BusinessQuestPage = () => {
  return (
    <div className="pt-20">
      <HeroSection />
      <Enpowering />
      <GameComponent />
      <Desk />
      <WhyItWorks />
      <HowPlayTestingWoks />
      <JoinPlayTest />
      <PlayTester />
      <FAQBusiness />
      <ReadyToTurn />
    </div>
  )
}

export default BusinessQuestPage