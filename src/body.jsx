import React, { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/header'
import NewsletterFooter from './components/footer'
import CartSidebar from './components/cart/cart'
import { useSelector, useDispatch } from 'react-redux'
import { toggleCart, closeCart } from './store/uiSlice'

const Body = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(state => state.ui.isCartOpen);
  const scrollTopRef = useRef(0);

  const handleToggleCart = () => dispatch(toggleCart());
  const handleCloseCart = () => dispatch(closeCart());

  useEffect(() => {
    if (isCartOpen) {
      const currentScroll = window.scrollY;
      scrollTopRef.current = currentScroll;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${currentScroll}px`;
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollTopRef.current);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isCartOpen]);

  return (
      <div className="min-h-screen">
         <Header onCartClick={handleToggleCart} />
         <main className="pt-16">
           <Outlet />
         </main>
         <NewsletterFooter/>
         <CartSidebar isOpen={isCartOpen} onClose={handleCloseCart} />
       </div>
     )
}

export default Body
