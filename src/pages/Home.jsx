import React from 'react';
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from '../components/Features';
import flowers from "../data/Flower";
import FlowerCard from "../components/Flowercard";
import Footer from "../components/Footer"

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />

      <section className="best-seller">
          <h2 style={{color: "rgb(87, 71, 95)"}}>Best Sellers</h2>

          <div className="flower-grid"  >
              {flowers.slice(0, 8).map((flower) => (
                <FlowerCard
                key={flower.id}
                 id={flower.id}
                image={flower.image}
                name={flower.name}
                price={flower.price}
               
                />
              ))}
          </div>
      </section>

      <Features />
      <Footer />
    </>
  )
}


export default Home

