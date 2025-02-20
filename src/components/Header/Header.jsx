import React, { useState, useEffect } from "react";
import "./Header.css";

const images = [
  "./Art_1.jpg",
  "./Art_2.jpg",
  "./Art_3.jpg",
  "./Art_4.jpg",
  "./Art_5.jpg",
  "./Art_6.jpg",
  "./Art_7.jpg",
  "./Art_8.jpg",
  "./Art_9.jpg",
  "./Art_10.jpg",
  "./Art_11.jpg",
  "./Art_12.jpg",
  "./Art_13.jpg",
  "./Art_14.jpg",
  "./Art_15.jpg",
  "./Art_16.jpg",
  "./Art_17.jpg",
  "./Art_18.jpg",
  "./Art_19.jpg",
];

const Header = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Har 3 second me image change hogi

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="header"
      style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
    >
      <div className="header-contents">
        <h2>Order your favourite painting here</h2>
        <p>
          Explore a diverse collection of stunning sketches and breathtaking
          paintings, each crafted with passion and precision. Our mission is to
          bring creativity to life and inspire you with every masterpiece, one
          stroke at a time.
        </p>
        <button>View</button>
      </div>
    </div>
  );
};

export default Header;
