import React, { useState, useEffect } from "react";
import "./Header.css";

const images = [
  "https://res.cloudinary.com/dgwfrstao/image/upload/v1753282597/Art_1_bhmnjw.jpg",
  "https://res.cloudinary.com/dgwfrstao/image/upload/v1753282670/Art_2_s5styc.jpg",
  "https://res.cloudinary.com/dgwfrstao/image/upload/v1753282688/Art_3_gpqpla.png",
  "https://res.cloudinary.com/dgwfrstao/image/upload/v1753282703/Art_4_wwfwhb.jpg",
  "https://res.cloudinary.com/dgwfrstao/image/upload/v1753282712/Art_5_vf29kt.jpg",
  "https://res.cloudinary.com/dgwfrstao/image/upload/v1753282774/Art_6_euyu4x.jpg",
  "https://res.cloudinary.com/dgwfrstao/image/upload/v1753282779/Art_7_p6s1g6.jpg",
  "https://res.cloudinary.com/dgwfrstao/image/upload/v1753282802/Art_8_xzu8ie.jpg",
  "https://res.cloudinary.com/dgwfrstao/image/upload/v1753282816/Art_9_hlvuow.jpg",
  "https://res.cloudinary.com/dgwfrstao/image/upload/v1753282825/Art_10_yzvqmx.jpg",
  "https://res.cloudinary.com/dgwfrstao/image/upload/v1753282839/Art_11_ugv2ah.jpg",
  "https://res.cloudinary.com/dgwfrstao/image/upload/v1753282847/Art_12_nlldig.jpg",
  "https://res.cloudinary.com/dgwfrstao/image/upload/v1753282855/Art_13_ouwof8.png",
  "https://res.cloudinary.com/dgwfrstao/image/upload/v1753282865/Art_14_jkogom.jpg",
  "https://res.cloudinary.com/dgwfrstao/image/upload/v1753282868/Art_15_syps9x.jpg",
  "https://res.cloudinary.com/dgwfrstao/image/upload/v1753282875/Art_16_ju9cni.jpg",
  "https://res.cloudinary.com/dgwfrstao/image/upload/v1753282882/Art_17_il4rqh.jpg",
  "https://res.cloudinary.com/dgwfrstao/image/upload/v1753282893/Art_18_omlego.jpg",
  "https://res.cloudinary.com/dgwfrstao/image/upload/v1753282902/Art_19_pmm5jr.png",
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
