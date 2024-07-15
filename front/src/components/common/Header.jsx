import React, { useState, useEffect } from 'react';
import EventBanner from './EventBanner';
import NavigateTop from './NavigateTop';
import CategoryMenu from './CategoryMenu';

const Header = ({response}) => {
    const [headscroll,setheadscroll] = useState(false);

    useEffect(()=>{
      const handlescroll = () => {
        if (window.scrollY > 0) {
          setheadscroll(true);
        } else {
          setheadscroll(false);
        }
      }
      window.addEventListener('scroll',handlescroll);

      return () => {
        window.addEventListener('scroll',handlescroll);
      }
    },[headscroll])

    return (
      <header className={`${headscroll ? 'scrolled': ''}`}>
        <EventBanner />
        <NavigateTop />
        <CategoryMenu response={response} />
      </header>
    );
};

export default Header;