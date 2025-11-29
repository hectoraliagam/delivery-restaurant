import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN
});

// placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const { items, amount, address } = req.body;
    const newOrder = new orderModel({
      userId: req.userId,
      items,
      amount,
      address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    const preference = new Preference(client);
    const response = await preference.create({
      body: {
        items: items.map((item) => ({
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: "PEN"
        })),

        back_urls: {
          success: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
          failure: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
          pending: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        },
        
        auto_return: "approved",
        external_reference: String(newOrder._id)
      }
    });

    res.json({ success: true, url: response.init_point });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
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

export { placeOrder, verifyOrder }
