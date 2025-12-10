import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/header'
import NewsletterFooter from './components/footer'

const Body = () => {
  return (
     <div className="h-screen">
      <Header />
      <Outlet />
      <NewsletterFooter/>
    </div>
  )
}

export default Body
