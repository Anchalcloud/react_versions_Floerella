import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faClock,
  faComment
} from "@fortawesome/free-solid-svg-icons";

import "./Contact.css";


function Contact() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    // Show success message
    setSuccessMessage("Your message has been sent successfully!");

    // Clear form
    setName("");
    setEmail("");
    setMessage("");

    setTimeout(() => {
       setSuccessMessage("");
    }, 3000);
  };

  const handleWhatsApp = () => {
  const phoneNumber = "917870452029";

  const message = "Hello! I would like to know more about your flowers.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}

      <section className="contact-hero">

        <p className="section-label">CONTACT</p>

        <h1>Let's Talk Flowers</h1>

        <p className="contact-intro">
          Weddings, custom bouquets, or a quiet hello — we love mail.
        </p>

      </section>


      {/* CONTACT CONTENT */}

      <section className="contact-section">


        {/* LEFT SIDE */}

        <div className="contact-info">


          <div className="contact-card">

            <FontAwesomeIcon
              icon={faLocationDot}
              className="contact-icon"
            />

            <div>
              <h3>Studio</h3>

              <p>24 Rosebank Lane, Suite 3</p>
            </div>

          </div>


          <div className="contact-card">

            <FontAwesomeIcon
              icon={faPhone}
              className="contact-icon"
            />

            <div>
              <h3>Phone</h3>

              <p>+91 90651 97272</p>
            </div>

          </div>


          <div className="contact-card">

            <FontAwesomeIcon
              icon={faEnvelope}
              className="contact-icon"
            />

            <div>
              <h3>Email</h3>

              <p>hello@floerella.com</p>
            </div>

          </div>


          <div className="contact-card">

            <FontAwesomeIcon
              icon={faClock}
              className="contact-icon"
            />

            <div>
              <h3>Hours</h3>

              <p>Tuesday – Sunday, 9 AM – 6 PM</p>
            </div>

          </div>


          <button className="whatsapp-btn" onClick={handleWhatsApp}>
      
            <FontAwesomeIcon icon={faComment} /> Chat On WhatsApp

          </button>

        </div>


        {/* RIGHT SIDE FORM */}

        <div className="contact-form">

          <h2>Send us a Note</h2>

          
          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>NAME</label>

            <input type="text" placeholder="Your name" value={name}
              onChange={(e) => setName(e.target.value)}/>

            </div>


            <div className="form-group">

              <label>EMAIL</label>

              <input type="email" placeholder="Your email" value={email} 
                onChange={(e) => setEmail(e.target.value)}/>

            </div>


            <div className="form-group">

              <label>MESSAGE</label>

              <textarea placeholder="Tell us what you need..." value={message}
                onChange={(e) => setMessage(e.target.value)}/>

            </div>


            <button type="submit" className="send-btn"> Send Message </button>


            {successMessage && (
                <p className="success-message"> {successMessage} </p>
            )}

          </form>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Contact;