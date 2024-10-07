import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer '>
      <h4 className='text-center'>Alright Reserved &copy; Dk </h4>
      <p className='text-center mt-3 text-center'>
        <Link to="/about">About</Link>
        |
        <Link to="/contact">Contact</Link>
        |
        <Link to="/policy">Privacy policy</Link>

      </p>
    </div>
  )
}

export default Footer
