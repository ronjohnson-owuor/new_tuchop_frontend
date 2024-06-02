import React from 'react'
import Navigation from '../components/navigation/Navigation'
import Bloglist from '../components/blog/Bloglist'
import Footer from '../components/footer/Footer'

function Page() {
  return (
    <div>
      <Navigation/>
      {/* list blog components */}
      <Bloglist/>
      <Footer/>
    </div>
  )
}

export default Page