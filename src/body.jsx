import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/header'
import NewsletterFooter from './components/footer'
import CartSidebar from './components/cart/cart'

const Body = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const closeCart = () => setIsCartOpen(false);

  return (
     <div className={`h-screen ${isCartOpen ? 'overflow-hidden' : ''}`}>
        <Header onCartClick={toggleCart} />
        <Outlet />
        <NewsletterFooter/>
        <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
      </div>
   )
}

export default Body
