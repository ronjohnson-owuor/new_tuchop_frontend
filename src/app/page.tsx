
import React from 'react'
import Navigation from './components/landingPage/Navigation';
import Hero from './components/landingPage/Hero';
import Video from './components/landingPage/Video';
import Features from './components/landingPage/Features';
import Footer from './components/footer/Footer';

function Page() {
  return (
    <div>
        <Navigation/>
        <Hero/>
        <Video/>
        <Features/>
        <Footer/>
    </div>
  )
}

export default Page;