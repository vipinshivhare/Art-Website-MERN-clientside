// import React, { useContext, useEffect, useState } from 'react';
// import './MyOrders.css';
// import { StoreContext } from '../../context/StoreContext';
// import axios from 'axios';
// import { assets } from '../../assets/assets';

// const MyOrders = () => {
//     const { url, token } = useContext(StoreContext);
//     const [data, setData] = useState([]);

//     // const fetchOrders = async () => {

//     //     try {
//     //         const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
//     //         setData(response.data.data);
//     //         console.log("Items in order:", order.item);
            
//     //     } catch (error) {
//     //         console.error("Error fetching orders", error);
//     //     }
//     // };

//     const fetchOrders = async () => {
//         try {
//             console.log("Fetching orders...");
//             console.log("Token being sent:", token);
    
//             const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
    
//             console.log("API Response:", response.data);
            
//             if (!response.data || !response.data.data) {
//                 console.log("No data received from API");
//                 return;
//             }
    
//             setData(response.data.data);
    
//             response.data.data.forEach(order => {
//                 console.log("Items in order:", order.item);
//             });
    
//         } catch (error) {
//             console.error("Error fetching orders", error);
//         }
//     };
    

//     useEffect(() => {
//         if (token) {
//             fetchOrders();
//         }
//     }, [token]);
    
//     return (
//         <div className='my-orders'>
//             <h2>My Orders</h2>
//             <div className="container">
//                 {data.map((order, index) => (
//                     <div key={index} className='my-orders-order'>
//                         <img src={assets.parcel_icon} alt="" />
                        
//                         <p>{order.item.map((item, idx) => (
//                             <span key={idx}>{item.name} x {item.quantity}{idx !== order.item.length - 1 ? ", " : ""}</span>
//                         ))}
//                         </p>
//                         <p>₹ {order.amount}.00</p>
//                         <p>Order Placed</p>
//                         {/* <p>Items: {order.item.length}</p> */}
//                         <p>
//                             <span>&#x25cf;</span> 
//                             <b>
//                                 {order.status === "Accepted" 
//                                     ? "Accepted ✅" 
//                                     : order.status === "Not Accepted" 
//                                     ? "Not Accepted ❌" 
//                                     : "Pending ⏳"}
//                             </b>
//                         </p>
//                         <button>Track Order</button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MyOrders;

import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            

            const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });

            console.log(response.data.data);

            if (response.data && response.data.data) {
                setData(response.data.data); // Only set data here
                response.data.data.forEach(order => {
                    // console.log("Order Item Array:", order.item);
                    if (order.item && order.item.length > 0) {
                        order.item.forEach(item => {
                            console.log("Item Object:", item);
                        });
                    }
                });
            } else {
                console.log("No data received from API");
            }

            console.log("API Response:", response.data);

        } catch (error) {
            console.error("Error fetching orders", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => (
                    <div key={index} className='my-orders-order'>
                        <img src={assets.parcel_icon} alt="" />
                        <p>
                            {order.item && order.item.length > 0 ? (
                                order.item.map((item, index) => {
                                    if (index === order.item.length - 1) { // Corrected line
                                        return item.name;
                                    } else {
                                        return item.name + " ";
                                    }
                                })
                            ) : (
                                // <span>No items in this order</span>
                                <span> </span>
                            )}
                        </p>
                        <p>₹ {order.amount}.00</p>
                        <p>Order Placed</p>
                        <p>
                            <span>&#x25cf;</span>
                            <b>
                                {order.status === "Accepted"
                                    ? "Accepted ✅"
                                    : order.status === "Not Accepted"
                                        ? "Not Accepted ❌"
                                        : "Pending ⏳"}
                            </b>
                        </p>
                        <button>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;