import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./About.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faLeaf,
  faHeart,
  faSeedling
} from "@fortawesome/free-solid-svg-icons";

import missionImage from "../assets/images/about.jfif";

import florist1 from "../assets/images/director.jfif";
import florist2 from "../assets/images/florist 1.jfif";
import florist3 from "../assets/images/event-planners.jfif";

function About() {
  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="about-hero">

        <h3 className="section-label">
          OUR STORY
        </h3>

        <h1>
          A small studio, a life-long
          <br />
          love affair with flowers.
        </h1>

        <p className="about-intro">
          Floerella began with a single wooden bench, a pair of
          Japanese shears and a stubborn belief that a bouquet
          can change a whole day.
        </p>

      </section>


      {/* ================= MISSION ================= */}
      <section className="mission-section">

        <div className="mission-image">
          <img
            src={missionImage}
            alt="Flower studio"
          />
        </div>


        <div className="mission-content">

          <h2>Our Mission</h2>

          <p>
            To make luxury florals feel personal — sourced from
            growers we know by first name, arranged by hand, and
            delivered with a written note.
          </p>

          <p> We work in small batches so nothing is ever mass-produced. </p>
          
          <div className="mission-stats">

            <div className="stat-card">
              <FontAwesomeIcon  icon={faLeaf}  className="stat-icon"/>

              <h3>12 FARMS</h3>

              <p>LOCAL GROWERS</p>
            </div>


            <div className="stat-card">
               <FontAwesomeIcon icon={faHeart} className="stat-icon"/>

              <h3>18,400+</h3>

              <p>BOUQUETS MADE</p>
            </div>


            <div className="stat-card">
              <FontAwesomeIcon icon={faSeedling} className="stat-icon"/>


              <h3>2016</h3>

              <p>SINCE</p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= FLORISTS ================= */}
      <section className="florists-section">

        <h2>Meet Our Florists</h2>


        <div className="florists-grid">

          <div className="florist-card">

            <img
              src={florist1}
              alt="Florist"
            />

            <h3>Elena Marchetti</h3>

            <p>Founder & Creative Director</p>

          </div>


          <div className="florist-card">

            <img
              src={florist2}
              alt="Florist"
            />

            <h3>Rin Takahashi</h3>

            <p>Head Florist</p>

          </div>


          <div className="florist-card">

            <img
              src={florist3}
              alt="Florist"
            />

            <h3>Meera Shah</h3>

            <p>Florist & Events</p>

          </div>

        </div>

      </section>


      {/* ================= AWARDS ================= */}
      <section className="awards-section">

        <p className="section-label">
          AWARDS
        </p>

        <h3>
          Kind words from the industry
        </h3>


        <div className="awards-grid">

          <p>
            Best Florist 2023
          </p>

          <p>
            Wedding Vendor of the 2024
          </p>

          <p>
            Sustainable Small Business Awards
          </p>

        </div>

      </section>


      <Footer />
    </>
  );
}

export default About;