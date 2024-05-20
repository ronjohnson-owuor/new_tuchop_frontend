import React from 'react'
import Navigation from '../components/navigation/Navigation'
import Footer from '../components/footer/Footer'
import Link from 'next/link'

function Page() {
  return (
	<div>
      <Navigation/>
    		<div className=" leading-loose w-[90%] min-h-[10rem] my-4 shadow-md mx-4  rounded-sm p-4">
    <h1 className="my-4 font-bold mx-4 text-primary">Website Policy</h1>	
		<h3 className='text-accent my-2'>1. INFORMATION COLLECTION</h3>
    <p>ZeroN Labs may collect personal information, such as,but not limited to your name and email address,location when you voluntarily submit it through our Website.</p>

    <h3 className='text-accent my-2'>2. COOKIES</h3>
    <p>Our Website may use cookies to enhance your user experience. You can adjust your browser settings to refuse all cookies.But this may result to our website not functioning as expected.</p>

    <h3 className='text-accent my-2'>3. INFORMATION USAGE</h3>
    <p>We may use the information collected for purposes such as providing and personalizing our services, improving our Website, and sending you updates and marketing communications.</p>

    <h3 className='text-accent my-2'>4. INFORMATION SHARING</h3>
    <p>We do not sell, trade, or otherwise transfer your personal information to outside parties. This does not include trusted third parties who assist ZeroN Labs in operating our Website or conducting our business.</p>

    <h3 className='text-accent my-2'>5. SECURITY</h3>
    <p>We implement a variety of security measures to maintain the safety of your personal information and your data you submit is always in safe hands.</p>

    <h3 className='text-accent my-2'>6. CHANGES TO PRIVACY POLICY</h3>
    <p>ZeroN Labs reserves the right to modify this privacy policy at any time. Changes will be effective immediately upon posting.</p>

    <h3 className='text-accent my-2'>7. QUESTIONS</h3>
    <p>If you have any questions regarding this privacy policy, you may contact ZeroN Labs at zeronlabs@gmail.com or check our <Link className='text-accent' href="/contact-us">contact Page</Link>.</p>
		</div>
    <Footer/>
  </div>
  )
}

export default Page