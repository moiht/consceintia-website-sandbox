import React from "react";
import styles from "@/components/Dashboard/Sections/styles/DashboardFoodCart.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  clearCart,
} from "@/lib/features/foodstore/foodSlice";
import toast from "react-hot-toast";
import { setFoodHistory } from "@/lib/features/auth/authSlice";

function DashboardFoodCart() {
  const { finalCart, finalCartTotal } = useSelector((state) => state.foodStore);
  const dispatch = useDispatch();
  const { currUser, isAllFilled } = useSelector((state) => state.auth);
  let userOrders = currUser && currUser.foodOrders;

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const doCheckout = async () => {
    if (!isAllFilled) {
      return toast.error("Please complete your profile before ordering");
    }
    let t = toast.loading("Processing your order...");
    const response = await fetch("/api/payments/initPayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.floor(1.02 * finalCartTotal),
        receipt: `FOOD-${new Date().getTime()}`,
        user: currUser,
        items: finalCart,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (response.status !== 200) {
      toast.dismiss(t);
      toast.error(data.message);
      return;
    }
    toast.dismiss(t);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("Razropay failed to load!!");
      toast.dismiss(t);
      return;
    }
    let options = {
      key: "rzp_test_uMjILIOyjNmhGV", // Enter the Key ID generated from the Dashboard
      amount: Math.floor(1.02 * finalCartTotal), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "FoodStore - Conscientia 2k24",
      description: "Transcation for food purchiasing in Conscientia 2k24",
      image: "https://www.conscientia.co.in/images/logo.png",
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        toast.dismiss(t);
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
        let res = await fetch("/api/payments/verifyPayment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pid: response.razorpay_payment_id,
            oid: response.razorpay_order_id,
            signature: response.razorpay_signature,
          }),
        });
        let rdata = await res.json();
        if (res.status !== 200) {
          toast.error("Payment failed");
          return;
        }
        toast.success("Payment successful");
        let t2 = toast.loading("Saving your order...");
        let saveRes = await fetch("/api/dashboard/foodstore/saveFoodOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: finalCartTotal / 100,
            amountPaid: Math.floor(1.02 * finalCartTotal) / 100,
            doc: rdata.id,
            items: finalCart,
            user: currUser,
            time: new Date().getTime(),
          }),
        });
        if (saveRes.status !== 200) {
          toast.error("Payment failed");
          return;
        }
        let { order } = await saveRes.json();
        dispatch(setFoodHistory(order));
        toast.dismiss(t2);
        toast.success("Order saved successfully");
        dispatch(clearCart());
      },
      prefill: {
        name: currUser.name,
        email: currUser.email,
        contact: currUser.mobile,
      },
      notes: {
        address: "IIST_Campus, Valiamala, Thiruvananthapuram, Kerala, India",
      },
      theme: {
        color: "#000",
      },
    };

    console.log(options);

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", async function (response) {
      toast.dismiss(t);
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
      toast.error(response.error.description);
    });
    rzp.open();
  };

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full gap-2">
      <div className={`${styles["card"]}  lg:col-span-3`}>
        <div className="flex mt-4 gap-5 justify-center items-center">
          <div className="text-lg text-[#b0d62b]">CART</div>
        </div>
        {finalCart.length == 0 && (
          <div className={`h-full w-full flex items-center justify-center `}>
            <span className="text-2xl text-white">Cart is empty</span>
          </div>
        )}
        <div className="mt-4 mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full overflow-hidden">
          {finalCart.map((product) => (
            <div
              className={
                "p-[20px] text-center grid justify-center transit-[0.3s]"
              }
              key={product._id}
            >
              <img className="rounded" src={product.image} alt="" />
              <div className={"mt-[28px]"}>
                <h1 className="text-[20px] font-medium">{product.name}</h1>
                <h2 className="text-[18px] font-bold text-[#1e8e02]">
                  ₹{product.price}
                </h2>
                <div className="flex w-full items-center justify-center gap-3 content-evenly ">
                  <div
                    className={styles.button}
                    onClick={() => dispatch(increaseQty(product._id))}
                  >
                    +
                  </div>
                  <h2 className="text-[16px] font-medium">
                    {product.quantity}
                  </h2>
                  <div
                    className={styles.button}
                    onClick={() => dispatch(decreaseQty(product._id))}
                  >
                    -
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles["card"]} col-span-1 max-h-96`}>
        <div className="flex mt-4 gap-5 justify-center items-center">
          <div className="text-lg text-[#b0d62b]">Total</div>
        </div>
        <div class="flex flex-col gap-2 p-8">
          <p class="text-center text-3xl text-gray-300 mb-4">
            ₹{Math.floor(1.02 * finalCartTotal) / 100}*
          </p>
          <button
            onClick={doCheckout}
            disabled={finalCartTotal <= 0}
            class="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95 disabled:cursor-default disabled:bg-gray-500 disabled:opacity-50 disabled:hover:bg-gray-500"
          >
            Checkout
          </button>

          <span className="mt-3 text-sm">
            *Inclusive of all taxes and charges
          </span>
          <span className="mt-3 text-sm">
            For delivery, visit the respective counter. For any queries, contact
            the help desk.
          </span>
        </div>
      </div>
      <div
        className={`${styles["card"]} mt-10 md:col-span-3 sm:col-span-2 col-span-1 lg:col-span-4`}
      >
        <div className="flex mt-4 gap-5 justify-center items-center">
          <div className="text-lg text-[#b0d62b]">HISTORY</div>
        </div>
        {userOrders && userOrders.length == 0 && (
          <div className={`h-full w-full flex items-center justify-center `}>
            <span className="text-2xl text-white">
              We are waiting for your orders
            </span>
          </div>
        )}
        <div className="mt-5 mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full overflow-hidden">
          {userOrders &&
            userOrders.map((order) => (
              <div
                className={
                  "p-[20px] text-center grid justify-center transit-[0.3s]"
                }
                key={order._id}
              >
                <img className="rounded" src={order.item.image} alt="" />
                <div className={"mt-[28px]"}>
                  <h1 className="text-[20px] font-medium">{order.item.name}</h1>
                  <h1 className="text-[16px] font-medium text-white">
                    {order.orderno}
                  </h1>
                  <h1 className="text-[16px] font-medium text-white">
                    {new Date(order.time).toLocaleString()}
                  </h1>
                  <h2 className="text-[18px] font-bold text-[#1e8e02]">
                    ₹{order.item.price * order.item.quantity}
                  </h2>
                  <h2 className="text-[16px] font-medium">
                    Qty: {order.item.quantity}
                  </h2>
                  <div className="flex w-full items-center justify-center gap-3 content-evenly ">
                    <h1 className="text-lg text-blue-600">
                      {order.status.toUpperCase()}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardFoodCart;
