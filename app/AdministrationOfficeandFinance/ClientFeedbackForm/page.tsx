import ClientFeedbackForm from '@/components/ClientFeedbackForm'
import React from 'react'

const page = () => {
  return (
    <section className='w-screen-h-screen'> 
      <div className='border border-red-500  w-full h-auto'>
        
    <ClientFeedbackForm/>
      </div>
    </section>
  )
}

export default page