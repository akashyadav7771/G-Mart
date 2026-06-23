import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
// import Invoice from '../Invoice';

const Orders = () => {
  const {currency,axios} = useAppContext()
  const [orders, setOrders] = useState([])



const fetchOrders = async () => {
  try {
    const { data } = await axios.get('/api/order/seller');
    if (data.success) {
      const safeOrders = data.orders.map(order => ({
        ...order,
        address: order.address || {
          firstName: "Unknown",
          lastName: "",
          street: "",
          city: "",
          state: "",
          zipcode: "",
          country: "",
          phone: ""
        },
        items: order.items || []
      }));
      setOrders(safeOrders);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  useEffect(()=>{
    fetchOrders();
  },([]))


 



    return (
      <div className='scrollbar flex-1 h-[95vh] overflow-y-scroll'>
        <div className="md:p-10 p-4 space-y-4">
            <h2 className="text-lg font-medium">Orders List</h2>
           
            {orders?.map((order, index) => (

                <div key={index} className="flex flex-col  md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300">
                    <div className="flex gap-5 max-w-80">
                        <img className="w-12 h-12 object-cover" src={assets.box_icon} alt="boxIcon" />
                        <div>
                            {order.items.map((item, index) => (
                            // {order.items?.map((item, index) => (

                                <div key={index} className="flex flex-col">
                                    <p className="font-medium">
                                        {item.product.name} {""} 
                                        {/* {item.product?.name} {""} */}

                                        <span className="text-primary">x {item.quantity}</span>
                                    </p> 
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-sm md:text-base text-black/60">
                        <p className='text-black/80'>
                        {order.address.firstName} {order.address.lastName}</p>

                        <p>{order.address.street}, {order.address.city} </p> 
                        <p> {order.address.state}, {order.address.zipcode}, {order.address.country}</p>
                        <p></p>
                        <p>{order.address.phone}</p>



                    </div>

                    <p className="font-medium text-lg my-auto">{currency}{order.amount}</p>

                    <div className="flex flex-col text-sm md:text-base text-black/60">
                        <p>Method: {order.paymentType}</p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                    </div>
                </div>
                
              ))}


            
        </div>
        
        </div>
    );
};


export default Orders



// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// import { assets } from "../../assets/assets";
// import { useAppContext } from "../../context/AppContext";
// import Invoice from "../Invoice";

// const Orders = () => {

//   const { currency, axios } = useAppContext();

//   const [orders, setOrders] = useState([]);

//   // FETCH ORDERS
//   const fetchOrders = async () => {

//     try {

//       const { data } =
//         await axios.get("/api/order/seller");

//       if (data.success) {

//         const safeOrders =
//           data.orders.map((order) => ({
//             ...order,

//             address: order.address || {
//               firstName: "Unknown",
//               lastName: "",
//               street: "",
//               city: "",
//               state: "",
//               zipcode: "",
//               country: "",
//               phone: "",
//             },

//             items: order.items || [],
//           }));

//         setOrders(safeOrders);

//       } else {
//         toast.error(data.message);
//       }

//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // DOWNLOAD PDF
//   const downloadInvoice = async (orderId) => {

//     const input =
//       document.getElementById(
//         `invoice-${orderId}`
//       );

//     if (!input) return;

//     const canvas =
//       await html2canvas(input, {
//         scale: 2,
//       });

//     const imgData =
//       canvas.toDataURL("image/png");

//     const pdf =
//       new jsPDF("p", "mm", "a4");

//     const pdfWidth =
//       pdf.internal.pageSize.getWidth();

//     const imgWidth = pdfWidth;

//     const imgHeight =
//       (canvas.height * imgWidth) /
//       canvas.width;

//     pdf.addImage(
//       imgData,
//       "PNG",
//       0,
//       0,
//       imgWidth,
//       imgHeight
//     );

//     pdf.save(`invoice-${orderId}.pdf`);
//   };

//   return (
//     <div className="scrollbar flex-1 h-[95vh] overflow-y-scroll">

//       <div className="md:p-10 p-4 space-y-4">

//         <h2 className="text-lg font-medium">
//           Orders List
//         </h2>

//         {orders.map((order, index) => (

//           <div
//             key={index}
//             className="flex flex-col gap-5 p-5 max-w-4xl rounded-md border border-gray-300"
//           >

//             {/* ORDER INFO */}

//             <div className="flex gap-5">

//               <img
//                 className="w-12 h-12 object-cover"
//                 src={assets.box_icon}
//                 alt="boxIcon"
//               />

//               <div>

//                 {order.items.map((item, index) => (

//                   <div
//                     key={index}
//                     className="flex flex-col"
//                   >

//                     <p className="font-medium">

//                       {item.product?.name}

//                       <span className="text-primary">
//                         {" "}
//                         x {item.quantity}
//                       </span>

//                     </p>

//                   </div>
//                 ))}

//               </div>

//             </div>

//             {/* ADDRESS */}

//             <div className="text-sm text-black/60">

//               <p className="text-black font-medium">

//                 {order.address.firstName}{" "}
//                 {order.address.lastName}

//               </p>

//               <p>
//                 {order.address.street},
//                 {" "}
//                 {order.address.city}
//               </p>

//               <p>
//                 {order.address.state},
//                 {" "}
//                 {order.address.zipcode},
//                 {" "}
//                 {order.address.country}
//               </p>

//               <p>
//                 {order.address.phone}
//               </p>

//             </div>

//             {/* PAYMENT */}

//             <div>

//               <p className="font-medium text-lg">
//                 {currency}
//                 {order.amount}
//               </p>

//               <p>
//                 Method:
//                 {" "}
//                 {order.paymentType}
//               </p>

//               <p>
//                 Date:
//                 {" "}
//                 {new Date(
//                   order.createdAt
//                 ).toLocaleDateString()}
//               </p>

//               <p>
//                 Payment:
//                 {" "}
//                 {order.isPaid
//                   ? "Paid"
//                   : "Pending"}
//               </p>

//             </div>

//             {/* INVOICE */}

//             <div
//               id={`invoice-${order._id}`}
//               className="hidden"
//             >

//               <Invoice order={order} />

//             </div>

//             {/* DOWNLOAD BUTTON */}

//             <button
//               onClick={() =>
//                 downloadInvoice(order._id)
//               }
//               className="bg-black text-white px-4 py-2 rounded cursor-pointer"
//             >
//               Download Invoice
//             </button>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;