import React, { useEffect } from "react";
import { SectionTitle } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../store";
import { calculateTotals, clearCart } from "../features/cart/cartSlice";
 

const ThankYou = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveToOrderHistory = async () => {
    try {
      const response = await axios.post("http://localhost:3000/orders", {
        userId: localStorage.getItem("id"),
        orderStatus: "in progress",
        subtotal: total,
        cartItems: cartItems,
      });
    } catch (err) {
      toast.error(err.response);
    }
  };

  if (cartItems.length > 0) {
    saveToOrderHistory();
    store.dispatch(clearCart());
    store.dispatch(calculateTotals());
    toast.success("Order completed");
  }

  useEffect(() => {
    if (!loginState) {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }, []);


  return (
    <> 
      <SectionTitle title="Thank You" path="Home | Cart | Thank you" />


      
      {/* <div><h1>FFFF</h1></div> */}
      <div class="bg-gray-100 dark:bg-gray-900">
    <div class="w-full max-w-3xl mx-auto p-8">
        <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
            <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Checkout</h1>

            
            <div class="mb-6">
                <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-2">Shipping Address</h2>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="first_name" class="block text-gray-700 dark:text-white mb-1">First Name</label>
                        <input type="text" id="first_name" class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"/>
                    </div>
                    <div>
                        <label for="last_name" class="block text-gray-700 dark:text-white mb-1">Last Name</label>
                        <input type="text" id="last_name" class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"/>
                    </div>
                </div>

                <div class="mt-4">
                    <label for="address" class="block text-gray-700 dark:text-white mb-1">Address</label>
                    <input type="text" id="address" class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"/>
                </div>

                <div class="mt-4">
                    <label for="city" class="block text-gray-700 dark:text-white mb-1">City</label>
                    <input type="text" id="city" class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"/>
                </div>

                <div class="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label for="state" class="block text-gray-700 dark:text-white mb-1">State</label>
                        <input type="text" id="state" class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"/>
                    </div>
                    <div>
                        <label for="zip" class="block text-gray-700 dark:text-white mb-1">ZIP Code</label>
                        <input type="text" id="zip" class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"/>
                    </div>
                </div>
            </div>

            
            <div>
                <h2 class="text-xl font-semibold text-gray-700 dark:text-white mb-2">Payment Information</h2>
                <div class="mt-4">
                    <label for="card_number" class="block text-gray-700 dark:text-white mb-1">Card Number</label>
                    <input type="text" id="card_number" class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"/>
                </div>

                <div class="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label for="exp_date" class="block text-gray-700 dark:text-white mb-1">Expiration Date</label>
                        <input type="text" id="exp_date" class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"/>
                    </div>
                    <div>
                        <label for="cvv" class="block text-gray-700 dark:text-white mb-1">CVV</label>
                        <input type="text" id="cvv" class="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"/>
                    </div>
                </div>
            </div>

            <div class="mt-8 flex justify-end">
                <button class="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900">Place Order</button>
            </div>
        </div>
    </div>
</div>


       
      <div className="thankyou-content text-center text-accent-content px-10 max-w-7xl mx-auto">
        <h2 className="text-6xl max-sm:text-4xl">
          Thank you for your purchase!
        </h2>

        <h3 className="text-2xl mt-10 max-sm:text-xl">
          We hope you love your new products! We appreciate your
          business and look forward to seeing you again soon.
        </h3>
        <h3 className="text-2xl mt-5 max-sm:text-xl">
          Here are some things you can do next:
        </h3>
        <ul className="text-xl mt-5 text-blue-500 max-sm:text-lg">
          <li className="hover:text-blue-600 cursor-pointer">
            <Link to="/order-history">&rarr; See order history &larr;</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            <Link to="/">&rarr; Browse more product and buy more &larr;</Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            &rarr; Follow us on social media &larr;
          </li>
        </ul>

        <h4 className="text-xl mt-5 max-sm:text-lg">
          Thank you again for your purchase!
        </h4>
        <h4 className="text-xl max-sm:text-lg">
          Sincerely, The Prima clean team
        </h4>
          
      </div>
    </>
   
  );
};

export default ThankYou;
