import { Link } from "react-router-dom";
import "./Footer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import {
  faInstagram,
  faFacebook,
  faPinterest, 
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="subscription">
              <h1>Floerella</h1>
               <p className="message">A neighborhood flower bouquet. 
                 Handcrafted bouqueets,   wedding florals, 
                 and living greenery delivered the same ady with care.</p>
               <div className="subs">
                 <p className="address">Your email for seasonal dro</p>
                 <button class="btn2">Subscribe</button>
               </div>
        </div>
       
    
        <div className="visit">
            <h4>VISIT</h4>
            <p className="address">   <FontAwesomeIcon icon={faLocationDot} />   24 Luby Circular Road, Dhanbad </p>
            <p className="address">  <FontAwesomeIcon icon={faPhone} />  +91 906-519-7272</p>
            <p className="address">  <FontAwesomeIcon icon={faEnvelope} /> hello@floerella.com</p>

           <div className="more" >
            <FontAwesomeIcon   className="brands" icon={faInstagram} />
            <FontAwesomeIcon   className="brands" icon={faFacebook} />
            <FontAwesomeIcon   className="brands" icon={faPinterest} />
          </div>
       
         </div>

       

      </div>

      <div className="copyright">
        <p>© 2026 Flower Shop. All rights reserved.</p>
        <p>Fresh Flower * Same-day-deliver  *  secure Checkouts </p>
      </div>
    </footer>
  );
}

export default Footer;