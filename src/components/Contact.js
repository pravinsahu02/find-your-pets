// Contact.js
import React from 'react';
import '../App.css';

function Contact() {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>
        We’re here to help you find your perfect furry friend! Reach out with any questions about our adoptable dogs or the adoption process. 
        Our team is dedicated to ensuring a smooth and joyful experience for both you and your future pet.
      </p>
      <div className="contact-card">
        <p><strong>Email:</strong> <a href="mailto:info@findyourpaws.org">info@findyourpaws.org</a></p>
        <p><strong>Address:</strong> 123 Pawsome Lane, Nagpur,440000</p>
        <p><strong>Phone:</strong> (+91) 123-4567-892</p>
      </div>
      <p>
        Ready to adopt? Visit our <a href="/pets">Pets page</a> to meet our adorable dogs or submit an inquiry directly through the adoption form.
      </p>
    </div>
  );
}

export default Contact;