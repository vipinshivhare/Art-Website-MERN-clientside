// import React, { useContext } from "react";
// import "./ArtItem.css";
// import { assets } from "../../assets/assets";
// import { StoreContext } from "../../context/StoreContext";

// const ArtItem = ({ id, name, price, description, image }) => {

//   const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

//   return (
//     <div className='food-item'>
//       <div className="food-item-img-container">
//         <img className='food-item-image' src={url + "/images/" + image} alt="" />
//         {!cartItems[id]
//           ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
//           : <div className='food-item-counter'>
//             <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
//             <p>{cartItems[id]}</p>
//             <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
//           </div>

//         }
//       </div>
//       <div className="food-item-info">
//         <div className="food-item-name-rating">
//           <p>{name}</p>
//           <img src={assets.rating_starts} alt="" />
//         </div>
//         <p className="food-item-desc">{description}</p>
//         <p className="food-item-price">₹{price}</p>
//       </div>
//     </div>
//   );
// };

// export default ArtItem;

import React, { useContext, useRef, useState } from "react";
import "./ArtItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const ArtItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const imageRef = useRef(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    setX(xPercent);
    setY(yPercent);
  };

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
    setX(0);
    setY(0);
  };

  return (
    <div className='food-item'>
      <div
        className="food-item-img-container"
        onMouseMove={handleMouseMove}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <img
          ref={imageRef}
          className='food-item-image'
          src={url + "/images/" + image}
          alt=""
          style={{
            transform: isHovered ? `translate(${50 - x}% ,${50 - y}%) scale(1.5)` : 'translate(0, 0) scale(1)',
            transition: 'transform 0.2s ease',
            maxWidth: '100%', 
            maxHeight: '100%',
          }}
        />
        {!cartItems[id] ? (
          <img
            className='add'
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className='food-item-counter'>
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}/- only</p>
      </div>
    </div>
  );
};

export default ArtItem;