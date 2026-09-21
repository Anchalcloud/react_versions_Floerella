import Order from "../models/Order.js";

const placeOrder = async (req, res) => {

  try {
    const {
      customer,
      items,
      paymentMethod,
      subtotal,
      deliveryCharge,
      totalAmount,
    } = req.body;

    const userId = req.userId;

    const newOrder = new Order({
      userId,
      customer,
      items,
      paymentMethod,
      subtotal,
      deliveryCharge,
      totalAmount,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.log("Order Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to place order",
    });
  }
};

export { placeOrder };


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId").sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);

    res.json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
  console.error("Update Order Error:", error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order deleted successfully",
      order: deletedOrder,
    });
  } catch (error) {
    console.error("Delete Order Error:", error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId, }).sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get My Orders Error:", error);

    res.json({
      success: false,
      message: "Failed to fetch your orders",
    });
  }
};