import mongoose from "mongoose";

const orderDetailSchema = new mongoose.Schema({
  formData: {
    type: [mongoose.Schema.Types.Mixed], // Array of objects with any structure
    required: true,
  },
  cartItems: {
    type: [mongoose.Schema.Types.Mixed], // Array of objects with any structure
    required: true,
  },
});

const OrderDetailModal =
  mongoose.models.OrderDetail ||
  mongoose.model("OrderDetail", orderDetailSchema);

export default OrderDetailModal;
