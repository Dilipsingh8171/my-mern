import React from 'react'
import Layout from '../components/Layout'
import img from "../assets/Images/contactus.jpg"
import { BiLogoGmail } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout>
      <div className="contact-us-container">
        <div className="contact-us-image">
          <img src={img} alt="Contact Us" />
        </div>
        <div className="contact-us-content">
          <h2>Contact Us</h2>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </Layout>

  )
}


export default Contact;
