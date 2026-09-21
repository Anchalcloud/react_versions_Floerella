import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faLeaf,
  faGem,
  faCheck
} from "@fortawesome/free-solid-svg-icons";

import "./Features.css";

function Features() {
  return (


    <section className="features">

      <div className="feature-card">
        <h3> <FontAwesomeIcon icon={faLeaf} /> Fresh Flowers</h3>
        <p>Cut at dawn from local farmers we've known for years..</p>
      </div>

      <div className="feature-card">
        <h3> <FontAwesomeIcon icon={faTruck} /> Free Delivery</h3>
        <p>Fresh flowers delivered to your doorstep.</p>
      </div>

      <div className="feature-card">
        <h3> <FontAwesomeIcon icon={faGem} /> Premium Quality</h3>
        <p>Only the freshest blooms for every occasion.</p>
      </div>

      <div className="feature-card">
        <h3> <FontAwesomeIcon icon={faCheck} /> Secure Payments</h3>
        <p>Encrypted checkout with all major cards.</p>
      </div>
    </section>
  );
}

export default Features;