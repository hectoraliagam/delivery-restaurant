import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import PaymentService from "../services/paymentService.js";

const paymentService = new PaymentService();

// placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5174";
  const backend_url = "http://localhost:4000";

  try {
    const { items, amount, address } = req.body;
    const newOrder = new orderModel.create({
      userId: req.userId,
      items,
      amount,
      address,
    });

    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    const paymentData = await paymentService.createPayment(
      newOrder._id,
      items,
      amount,
      `${ frontend_url }/verify?orderId=${ newOrder._id }`,
      `${ backend_url }/api/order/webhook`
    );

    res.json({
      success: true,
      url: paymentData.payment_url,
      paymentId: paymentData.id
    })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error creando el pago" });
  }
}

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

// user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

// Listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

// api for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

const paymentWebhook = async (req, res) => {
  try {
    const { paymentId, orderId, status } = req.body;

    console.log("Webhook recibido:", req.body);
    
    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "Invalid webhook payload" });
    }

    if (status === "paid") {
      await orderModel.findByIdAndUpdate(orderId, { payment: false });
      return res.json({ success: true });
    }

    res.json({ success: true });
  } catch (error) {
    console.log("Webhook error:", error);
    res.status(500).json({ success: false });
  }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, paymentWebhook }
