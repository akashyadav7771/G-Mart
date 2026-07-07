import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user, cancelOrders } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //cncl order hndlr with confirmation
  const handleCancelClick = (orderId)=>{
    const cancelConfirm = window.confirm( "Are you sure you want to cancel this order?")
    if(cancelConfirm){
      return handleCancelOrder(orderId)
    }
  }
  const handleCancelOrder = async (orderId) => {
    try {
      const resp = await cancelOrders(orderId);
      if (resp.success) {
        toast("Order cancelled");

        fetchMyOrders();
      }
    } catch (error) {
      console.log(error);
      toast("failed to cancelled order");
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="mt-16 pb-16">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
      {myOrders.map((order, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
        >
          <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
            <span>OrderId : {order._id}</span>
            <span>Payment : {order.paymentType}</span>
            <span>
              Total Amount : {currency}
              {order.amount}
            </span>
          </p>
          {order.items.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-5 mb-4"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                {/* Product */}
                <div className="flex items-center gap-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <img
                      src={item.product.image[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.product.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {item.product.category}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Qty: {item.quantity}
                    </p>

                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <p className="text-xl font-bold text-green-600">
                    {currency}
                    {item.product.offerPrice * item.quantity}
                  </p>
                </div>

                {/* Status */}
                <div className="flex flex-col items-start md:items-end gap-3">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      order.status === "Cancelled"
                        ? "bg-red-100 text-red-600"
                        : order.status === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>

                  {order.status !== "Cancelled" &&
                    order.status !== "Delivered" && (
                      <button
                        onClick={() => handleCancelClick(order._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
                      >
                        Cancel Order
                      </button>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
