import React from 'react'
import Navigation from '../components/navigation/Navigation'
import Link from 'next/link'
import Footer from '../components/footer/Footer'

function page() {
  return (
	<div>
		<Navigation/>
		<div className="leading-loose w-[90%] md:w-[80%] min-h-[10rem] shadow-md mx-4 my-10  rounded-sm p-4">
			<h1 className="my-4 font-bold mx-4 text-primary">Terms & conditions</h1>	
				<h3 className='text-accent my-2'>1. ACCEPTANCE OF TERMS</h3>
			<p>By using this website ("zeron labs"), you agree to comply with and be bound by the following terms and conditions of use.</p>
			<h3 className='text-accent my-2'>2. INTELLECTUAL PROPERTY</h3>
			<p>All content on this Website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and data, is the property of ZeroN Labs and is protected by copyright laws.And any outside content is given credit to as necessary.</p>
			<h3 className='text-accent my-2'>3. USER CONDUCT</h3>
			<p>You agree not to use the Website for any unlawful purpose or any purpose prohibited by these terms and conditions.Zeron Labs will not be liable for damages you cause while using our service in an unlawfull way.This website is for educational purposes ONLY.</p>
			<h3 className='text-accent my-2'>4. DISCLAIMER OF WARRANTIES</h3>
			<p>This Website is provided "as is" without any representations or warranties, express or implied. ZeroN Labs makes no representations or warranties in relation to this Website or the information and materials provided on this Website.</p>
			<h3 className='text-accent my-2'>5. LIMITATION OF LIABILITY</h3>
			<p>ZeroN Labs will not be liable to you (whether under the law of contract, the law of torts, or otherwise) in relation to the contents of, or use of, or otherwise in connection with, this Website.</p>
			<h3 className='text-accent my-2'>6. MODIFICATIONS TO TERMS</h3>
			<p>ZeroN Labs may revise these terms of use at any time without notice. By using this Website, you agree to be bound by the then-current version of these terms of use.</p>
			<h3 className='text-accent my-2'>7. GOVERNING LAW</h3>
			<p>These terms and conditions are governed by and construed in accordance with the laws of Data protection Act of kenya 2023.</p>
			<h3 className='text-accent my-2'>8. CONTACT INFORMATION</h3>
			<p>For any questions about these terms and conditions, please contact ZeroN Labs at zeronlabs@gmail.com or check our <Link className='text-accent' href="/contact-us">contact page</Link>.</p>
		</div>
		<Footer/>
	</div>
  )
}

export default page