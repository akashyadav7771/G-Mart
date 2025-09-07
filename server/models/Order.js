

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    }
  ],

  amount: { type: Number, required: true },

  //  ObjectId ref: "address"
  address: { type: mongoose.Schema.Types.ObjectId, ref: "address", required: true },

  status: { type: String, default: "order placed" },
  paymentType: { type: String, required: true },
  isPaid: { type: Boolean, default: false }
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
