import axios from "axios";
import StoreContext from "./StoreContext";
import { useEffect, useState } from "react";

function StoreContextProvider({ children }) {

    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [cartItems, setCartItems] = useState({});
    const [foodList, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
      if (!cartItems[itemId]) {
        setCartItems((prev) => ({ ...prev, [itemId] : 1 }));
      } else {
        setCartItems((prev) => ({ ...prev, [itemId] : prev[itemId] + 1 }));
      }
      if (token) {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      }
    }

    const removeFromCart = async (itemId) => {
      setCartItems((prev) => ({ ...prev, [itemId]:prev[itemId] - 1 }));
      if (token) {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      }
    }

    const getTotalCartAmount = () => {
      let totalAmount = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemInfo = foodList.find((product) => product._id === item);
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
      return totalAmount;
    }

    const fetchFoodList = async () => {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data);
    }

    const loadCartData = async (token) => {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
      setCartItems(response.data.cartData);
    }

    useEffect(() => {
      async function loadData() {
        await fetchFoodList();
        const tk = localStorage.getItem("token");
        if (tk) {
          setToken(tk);
          await loadCartData(tk);
        }
      }
      loadData();
    }, []);

    useEffect(() => {
      async function syncCart() {
        if (token) {
          await loadCartData(token);
        } else {
          setCartItems({});
        }
      }
      syncCart();
    }, [token]);
    
  return (
    <StoreContext.Provider value={ {
      foodList,
      setFoodList,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      url,
      token,
      setToken
    } }>
      { children }
    </StoreContext.Provider>
  );
}

export default StoreContextProvider;
