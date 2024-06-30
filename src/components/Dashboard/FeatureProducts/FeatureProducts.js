import React, { useState, useEffect } from "react";
import "./FeatureProducts.css";
import { MdDoubleArrow } from "react-icons/md";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, showCart } from "@/lib/features/foodstore/foodSlice";
import {
  setUser,
  setIsUser,
  refreshFoodOrder,
} from "@/lib/features/auth/authSlice";

const FeatureProducts = () => {
  const [sellerA, setSellerA] = useState([]);
  const [sellerB, setSellerB] = useState([]);
  const [sellerDetails, setSellerDetails] = useState([]);
  console.log(process.env.NEXT_PUBLIC_SOCKETURL);
  const socket = io(process.env.NEXT_PUBLIC_SOCKETURL);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.foodStore);

  const fetchSellerA = async () => {
    let res = await fetch("/api/dashboard/foodstore/fetchProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        seller: "sellerA",
      }),
    });
    let data = await res.json();
    if (res.status === 200) {
      setSellerA(data.data);
    } else {
      toast.error("Failed to fetch products");
    }
  };

  const fetchSellerB = async () => {
    let res = await fetch("/api/dashboard/foodstore/fetchProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        seller: "sellerB",
      }),
    });
    let data = await res.json();
    if (res.status === 200) {
      setSellerB(data.data);
    } else {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      console.log("Connected to server");
      socket.on("sellerAProduct", (data) => {
        setSellerA(data);
      });
      socket.on("sellerBProduct", (data) => {
        setSellerB(data);
      });
      socket.on("sellerDetails", (data) => {
        setSellerDetails(data);
      });
      socket.on("foodOrders", async (data) => {
        console.log(data);
        dispatch(refreshFoodOrder(data));
      });
    }

    function onDisconnect() {}

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
  }, []);

  return (
    <div className="mx-[5px] mt-[5px]">
      <div className="mb-14">
        <div className="section-title">
          <div className="section-line"></div>
          <h1>{sellerDetails.length > 0 && sellerDetails[0].name}</h1>
          <div className="section-line"></div>
        </div>

        {sellerDetails.length > 0 && !sellerDetails[0].open && (
          <div className={`h-full w-full flex items-center justify-center `}>
            <span className="text-2xl text-white">STORE IS CLOSED</span>
          </div>
        )}
        <div className="mt-[60px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full overflow-hidden">
          {sellerDetails.length > 0 &&
            sellerDetails[0].open &&
            sellerA.map((product) => (
              <div className="hoverIncrease" key={product._id}>
                {product.available === false && (
                  <span className="h-full w-full z-10 bg-slate-800">
                    OUT OF STOCK
                  </span>
                )}
                <img className="rounded" src={product.image} alt="" />
                <div className="content">
                  <h1>{product.name}</h1>
                  <h2>₹{product.price}</h2>
                  <div className="price-underline"></div>
                  {product.available === true && (
                    <div className=" select-btn">
                      {cart.includes(product) ? (
                        <p
                          className="hover:text-white cursor-pointer"
                          onClick={() => dispatch(showCart(true))}
                        >
                          ADDED TO CART
                        </p>
                      ) : (
                        <p
                          className="hover:text-white cursor-pointer"
                          onClick={() => dispatch(addToCart(product))}
                        >
                          ADD TO CART
                        </p>
                      )}
                      <MdDoubleArrow className="ml-1" />
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="mb-14">
        <div className="section-title">
          <div className="section-line"></div>
          <h1>{sellerDetails.length > 0 && sellerDetails[1].name}</h1>
          <div className="section-line"></div>
        </div>

        {sellerDetails.length > 0 && !sellerDetails[1].open && (
          <div className={`h-full w-full flex items-center justify-center `}>
            <span className="text-2xl text-white">STORE IS CLOSED</span>
          </div>
        )}

        <div className="mt-[60px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full overflow-hidden">
          {sellerDetails.length > 0 &&
            sellerDetails[1].open &&
            sellerB.map((product) => (
              <div className="hoverIncrease overflow-hidden" key={product._id}>
                {product.available === false && (
                  <span className="h-full w-full z-10 bg-slate-800">
                    OUT OF STOCK
                  </span>
                )}
                <img className="rounded" src={product.image} alt="" />
                <div className="content">
                  <h1>{product.name}</h1>
                  <h2>₹{product.price}</h2>
                  <div className="price-underline"></div>
                  {product.available === true && (
                    <div className=" select-btn">
                      {cart.includes(product) ? (
                        <p
                          className="hover:text-white cursor-pointer"
                          onClick={() => dispatch(showCart(true))}
                        >
                          ADDED TO CART
                        </p>
                      ) : (
                        <p
                          className="hover:text-white cursor-pointer"
                          onClick={() => dispatch(addToCart(product))}
                        >
                          ADD TO CART
                        </p>
                      )}
                      <MdDoubleArrow className="ml-1" />
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureProducts;
