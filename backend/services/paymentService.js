import axios from "axios";

export default class PaymentService {
  constructor() {
    this.apiKey = process.env.VEXOR_API_KEY;
    this.baseUrl = process.env.VEXOR_BASE_URL;
  }

  async createPayment(orderId, items, amount, returnUrl, callbackUrl) {
    try {
      const body = {
        amount,
        currency: "PEN",
        description: `Orden ${ orderId }`,
        metadata: { orderId },
        items: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          unit_price: item.price,
        })),
        return_url: returnUrl,
        callback_url: callbackUrl,
      }

      const response = await axios.post(
        `${this.baseUrl}/payments`,
        body,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error al crear el pago:", error.response?.data || error.message);
      throw new Error("Error al crear el enlace de pago");
    }
  }

  async getPaymentStatus(paymentId) {
    try {
      const res = await axios.get(
        `${this.baseUrl}/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;
    } catch (error) {
      console.error("Error consultando pago:", error.response?.data || error.message);
      throw new Error("Error al consultar el estado del pago");
    }
  }
}
