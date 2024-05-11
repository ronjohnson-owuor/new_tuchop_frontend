import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://tuchop.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://tuchop.com/about',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://tuchop.com/contact-us',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
	{
		url: 'https://tuchop.com/create-notes',
		lastModified: new Date(),
		changeFrequency: 'yearly',
		priority: 0.8,
	  },
	  {
		url: 'https://tuchop.com/dashboard',
		lastModified: new Date(),
		changeFrequency: 'weekly',
		priority: 0.8,
	  },
	  {
		url: 'https://tuchop.com/edit-lesson',
		lastModified: new Date(),
		changeFrequency: 'daily',
		priority: 0.8,
	  },
	  {
		url: 'https://tuchop.com/lesson-view',
		lastModified: new Date(),
		changeFrequency: 'daily',
		priority: 0.8,
	  },
	  {
		url: 'https://tuchop.com/lessons',
		lastModified: new Date(),
		changeFrequency: 'daily',
		priority: 0.8,
	  },
	  {
		url: 'https://tuchop.com/login',
		lastModified: new Date(),
		changeFrequency: 'yearly',
		priority: 0.8,
	  },
	  {
		url: 'https://tuchop.com/my-notes',
		lastModified: new Date(),
		changeFrequency: 'daily',
		priority: 0.8,
	  },
	  {
		url: 'https://tuchop.com/policy',
		lastModified: new Date(),
		changeFrequency: 'yearly',
		priority: 0.8,
	  },
	  {
		url: 'https://tuchop.com/signup',
		lastModified: new Date(),
		changeFrequency: 'yearly',
		priority: 0.8,
	  },
	  {
		url: 'https://tuchop.com/terms',
		lastModified: new Date(),
		changeFrequency: 'yearly',
		priority: 0.8,
	  },
	  {
		url: 'https://tuchop.com/usage',
		lastModified: new Date(),
		changeFrequency: 'daily',
		priority: 0.8,
	  },
	  {
		url: 'https://tuchop.com/view-notes',
		lastModified: new Date(),
		changeFrequency: 'daily',
		priority: 0.8,
	  },
  ]
}