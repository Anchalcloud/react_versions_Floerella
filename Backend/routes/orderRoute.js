import express from "express";
import { placeOrder ,  getAllOrders,  updateOrderStatus, 
    getMyOrders,  deleteOrder,} from "../controllers/orderController.js";
import authAdmin from "../middlewares/authAdmin.js";
import authUser from "../middlewares/authUser.js";

const orderRouter = express.Router();

// Place Order API
orderRouter.post("/place", authUser,  placeOrder);

orderRouter.get("/all",  authAdmin,  getAllOrders);

orderRouter.get("/my-orders", authUser, getMyOrders);

orderRouter.put("/update/:id",  authAdmin,  updateOrderStatus);

orderRouter.delete("/delete/:id",  authAdmin,  deleteOrder);

export default orderRouter;