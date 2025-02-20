// import React, { useContext, useState } from 'react'
// import './PlaceOrder.css'
// import { StoreContext } from '../../context/StoreContext'
// import axios from 'axios'

// const PlaceOrder = () => {

//   const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

//   const [data, setData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zip_code: "",
//     country: "",
//     phone: ""
//   })

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData(data => ({ ...data, [name]: value }))
//   }

//   const placeOrder = async (event) => {
//     event.preventDefault();
//     let orderItems = [];
//     food_list.map((item) => {
//       if (cartItems[item._id] > 0) {
//         let itemInfo = item;
//         itemInfo["quantity"] = cartItems[item._id];
//         orderItems.push(itemInfo);
//       }
//     })
//     let orderData = {
//       address: data,
//       items: orderItems,
//       amount: getTotalCartAmount() + 20, // Delivery charge
//     }
//     let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
//     if (response.data.success) {
//       const { session_url } = response.data;
//       window.location.replace(session_url);
//     }
//     else {
//       alert("Error");
//     }
//   }

//   return (
//     <form onSubmit={placeOrder} className='place-order'>
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-fields">
//           <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
//           <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
//         </div>
//         <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
//         <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
//         <div className="multi-fields">
//           <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
//           <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
//         </div>
//         <div className="multi-fields">
//           <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
//           <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
//         </div>
//         <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
//       </div>
//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>₹{getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>₹{getTotalCartAmount() === 0 ? 0 : 20}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>₹{getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 20)}</b>
//             </div>
//           </div>
//           <button type='submit'>PROCEED TO PAYMENT</button>
//         </div>
//       </div>
//     </form>
//   )
// }

// export default PlaceOrder



import React, { useContext, useState, useEffect } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    phone: ""
  });

  const [mapData, setMapData] = useState({
    latitude: 28.7041,
    longitude: 77.1025,
    address: "New Delhi, Delhi, India, 110001"
  });

  const [map, setMap] = useState(null);
  const [addressManuallyEntered, setAddressManuallyEntered] = useState(false);

  useEffect(() => {
    const initializeMap = () => {
      const geocoder = new window.google.maps.Geocoder();
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: mapData.latitude, lng: mapData.longitude },
        zoom: 12,
      });

      map.addListener('click', (event) => {
        const latitude = event.latLng.lat();
        const longitude = event.latLng.lng();
        setMapData({ latitude, longitude });

        geocoder.geocode({ location: event.latLng }, (results, status) => {
          if (status === 'OK') {
            const address = results[0].formatted_address;
            const addressComponents = results[0].address_components;
            setMapData(prev => ({ ...prev, address }));

            const zip_code = addressComponents.find(component => component.types.includes('postal_code'))?.long_name || "";
            const street = addressComponents.find(component => component.types.includes('street_number'))?.long_name + ' ' + addressComponents.find(component => component.types.includes('route'))?.long_name || "";
            const city = addressComponents.find(component => component.types.includes('locality'))?.long_name || "";
            const state = addressComponents.find(component => component.types.includes('administrative_area_level_1'))?.long_name || "";
            const country = addressComponents.find(component => component.types.includes('country'))?.long_name || "";

            setData(prev => ({ ...prev, zip_code, street, city, state, country }));
            setAddressManuallyEntered(false); // Reset manual entry flag
          } else {
            console.error('Geocode was not successful: ' + status);
          }
        });
      });
      setMap(map);
    };

    if (window.google && window.google.maps) {
      initializeMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDAW_cOQrZ0cVib2wUjMla4CFfGvD2p30c&libraries=places`; // Replace with your API key
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.body.appendChild(script);
    }
  }, []);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
    setAddressManuallyEntered(true); // Address manually entered
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    // Determine which address to use (manual or map)
    const orderAddress = addressManuallyEntered ? data : mapData.address ? {
      street: data.street,
      city: data.city,
      state: data.state,
      zip_code: data.zip_code,
      country: data.country
    } : data; // Fallback to data if map address is not available


    let orderData = {
      address: data, // Use the correct address object
      items: orderItems,
      amount: getTotalCartAmount() + 20,
    };

    try {
      const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order.");
        console.error("Server error:", response.data);
      }
    } catch (error) {
      alert("An error occurred.");
      console.error("Axios error:", error);
    }
  };

  const getMapData = async () => {
    if (!map) return;
    const geocoder = new window.google.maps.Geocoder();
    const { latitude, longitude } = mapData;
    const latLng = { lat: latitude, lng: longitude };

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK') {
        const address = results[0].formatted_address;
        const addressComponents = results[0].address_components;

        const street = addressComponents.find(component => component.types.includes('street_number'))?.long_name + ' ' + addressComponents.find(component => component.types.includes('route'))?.long_name || "";
        const city = addressComponents.find(component => component.types.includes('locality'))?.long_name || "";
        const state = addressComponents.find(component => component.types.includes('administrative_area_level_1'))?.long_name || "";
        const zip_code = addressComponents.find(component => component.types.includes('postal_code'))?.long_name || "";
        const country = addressComponents.find(component => component.types.includes('country'))?.long_name || "";

        setData(prev => ({ ...prev, street, city, state, zip_code, country }));
        setAddressManuallyEntered(false);
      } else {
        console.error('Geocode was not successful: ' + status);
      }
    });
  };

  return (
    <form onSubmit={placeOrder} className='place-order'> {/* Correct onSubmit handler */}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='first_name' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='last_name' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zip_code' onChange={onChangeHandler} value={data.zip_code} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
           <h2>Cart Totals</h2>
           <div>
             <div className="cart-total-details">
               <p>Subtotal</p>
               <p>₹{getTotalCartAmount()}</p>
             </div>
             <hr />
             <div className="cart-total-details">
               <p>Delivery Fee</p>
               <p>₹{getTotalCartAmount() === 0 ? 0 : 20}</p>
             </div>
             <hr />
             <div className="cart-total-details">
               <b>Total</b>
               <b>₹{getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 20)}</b>
             </div>
           </div>
           <button type='submit'>PROCEED TO PAYMENT</button>
         </div>
        <div className="cart-map">
          <div id="map" style={{ width: '100%', height: '300px' }}></div>
          <button type="button" onClick={getMapData} className="use-address-button">
          Use this address
        </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
