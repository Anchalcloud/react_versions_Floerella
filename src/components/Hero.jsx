import "./Hero.css";
import Home from "../assets/images/home-img.jfif";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero-text">
        <h2>
          Send Flowers like you mean it.
        </h2>

         <button className="order"   onClick={() => navigate("/shop")}>Order Now</button>
        
        <p className="text ">
          Where flowers are our inspiration to creste lasting memories.
           Whatever the occasion, our flowers will 
           make it special cursus a sit amet mauris.
        </p>

        <h3>Floerella</h3>

       
      </div>

      <div className="hero-image">
        <img src={Home} alt="Home" />
      </div>
    </section>
  );
}

export default Hero;