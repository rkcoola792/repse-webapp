import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/header'
import NewsletterFooter from './components/footer'
import CartSidebar from './components/cart/cart'
import { useSelector, useDispatch } from 'react-redux'
import { toggleCart, closeCart } from './store/uiSlice'

const Body = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(state => state.ui.isCartOpen);

  const handleToggleCart = () => dispatch(toggleCart());
  const handleCloseCart = () => dispatch(closeCart());

  return (
     <div className={`h-screen ${isCartOpen ? 'overflow-hidden' : ''}`}>
        <Header onCartClick={handleToggleCart} />
        <Outlet />
        <NewsletterFooter/>
        <CartSidebar isOpen={isCartOpen} onClose={handleCloseCart} />
      </div>
   )
}

export default Body
