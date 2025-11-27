import React from 'react'
import JoinPlayTest from '../business-quest/JoinPlayTest'
import FAQBusiness from '../business-quest/FAQBusiness'

const JoinTheWaitlistPage = () => {
  return (
    <div className="pt-20">
      {/* Hero/Form Section */}
      <JoinPlayTest />
      
      {/* FAQ Section */}
      <FAQBusiness />
    </div>
  )
}

export default JoinTheWaitlistPage