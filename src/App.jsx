import { useState } from 'react'
import './App.css'
import Header from './components/header'
import Hero from './components/hero'
import NewArrivals from './components/newArrival'
import TopSelling from './components/topSelling'
import BrowseByDressStyle from './components/dressStyleComponent'
import OurHappyCustomers from './components/reviews'
import NewsletterFooter from './components/footer'

function App() {

  return (
  <div className='text-3xl'><Header></Header>
  <Hero></Hero>
  <NewArrivals/>
  <TopSelling/>
  <BrowseByDressStyle/>
  <OurHappyCustomers/>
  <NewsletterFooter/>

  </div>
  )
}

export default App
