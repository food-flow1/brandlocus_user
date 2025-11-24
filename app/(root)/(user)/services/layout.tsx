import React from 'react'
import Unlock from '../home/Unlock'
import FAQService from './(components)/FAQService'
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        {children}
        <FAQService />
        <Unlock />
    </div>
  )
}

export default layout