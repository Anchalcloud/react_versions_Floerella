import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import flowers from "../data/Flower";
import Shopcard from "../components/Shopcard";
import "./Shop.css";
import Shopsection from "../components/Shop-section";
import { useSearchParams } from "react-router-dom";


function Shop() {

  const [searchParams] = useSearchParams();
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedOccasion, setSelectedOccasion] = useState("All");
  const [maxPrice, setMaxPrice] = useState(2500);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const navbarSearch = searchParams.get("search") || "";
    setSearchTerm(navbarSearch);
  }, [searchParams]);

  const filteredFlowers = flowers.filter((flower) => {

      const colorMatch =  selectedColor === "All" ||  flower.color === selectedColor;
      const occasionMatch =  selectedOccasion === "All" ||  flower.occasion === selectedOccasion;
      const priceMatch = flower.price <= maxPrice;
      const searchMatch = searchTerm.trim() === "" ||
        flower.name.toLowerCase().includes(searchTerm.toLowerCase());

      return colorMatch && occasionMatch && priceMatch && searchMatch;
  });

  return (
    <>
      <Navbar />
      <Shopsection />
      <section className="shop-page">

        {/* LEFT SIDEBAR */}
        <aside className="shop-sidebar">

          <input type="text" placeholder="Search bouquets..." className="shop-search"
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

          <h3>OCCASION</h3>

          <div className="filter-btns">

            <button className={selectedOccasion === "All" ? "active" : ""}
              onClick={() => setSelectedOccasion("All")}>  All  </button>

            <button className={selectedOccasion === "Anniversary" ? "active" : ""}
              onClick={() => setSelectedOccasion("Anniversary")}> Anniversary </button>

            <button className={selectedOccasion === "Birthday" ? "active" : ""}
              onClick={() => setSelectedOccasion("Birthday")}> Birthday  </button>

            <button className={selectedOccasion === "Wedding" ? "active" : ""}
              onClick={() => setSelectedOccasion("Wedding")}> Wedding </button>

            <button className={selectedOccasion === "Sympathy" ? "active" : ""}
              onClick={() => setSelectedOccasion("Sympathy")}>  Sympathy </button>

            <button  className={selectedOccasion === "Date" ? "active" : ""}
              onClick={() => setSelectedOccasion("Date")}>  Date  </button>

         </div>

          <h3>COLOUR</h3>

          <div className="filter-btns">

            <button className={selectedColor === "All" ? "active" : ""}
              onClick={() => setSelectedColor("All")}> All </button>

            <button className={selectedColor === "Pink" ? "active" : ""}
              onClick={() => setSelectedColor("Pink")}>  Pink  </button>

            <button className={selectedColor === "White" ? "active" : ""}
              onClick={() => setSelectedColor("White")}>  White  </button>

            <button className={selectedColor === "Yellow" ? "active" : ""}
              onClick={() => setSelectedColor("Yellow")}>  Yellow  </button>

            <button className={selectedColor === "Red" ? "active" : ""}
              onClick={() => setSelectedColor("Red")}>  Red  </button>

            <button  className={selectedColor === "Orange" ? "active" : ""}
              onClick={() => setSelectedColor("Orange")}>  Orange </button>

          </div>

          <h3>PRICE</h3>

          <input type="range" min="0" max="2500" value={maxPrice} 
            onChange={(e) => setMaxPrice(Number(e.target.value))}/>

          <p>Up to ₹{maxPrice}</p>

        </aside>

        {/* RIGHT PRODUCTS */}
        <div className="shop-products">
          {filteredFlowers.map((flower) => (
            <Shopcard
              key={flower.id}
              id={flower.id}
              name={flower.name}
              price={flower.price}
              image={flower.image}
               occasion={flower.occasion}
               color={flower.color} 
            />
          ))}

          
        </div>

      </section>

      <Footer />
    </>
  );
}

export default Shop;