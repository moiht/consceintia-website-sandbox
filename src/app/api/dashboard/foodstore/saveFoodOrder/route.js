import connectDB from "@/backendCodes/db";
import { FoodPayment } from "@/backendCodes/models/foodstore/foodPayment.models";
import { SellerAOrders } from "@/backendCodes/models/foodstore/sellerAOrders.models";
import { SellerBOrders } from "@/backendCodes/models/foodstore/sellerBOrders.models";
import { FoodOrder } from "@/backendCodes/models/foodstore/foodOrders.models";
import { User } from "@/backendCodes/models/user.models";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { amount, amountPaid, user, items, doc, time } = await req.json();
  await connectDB();
  let payment = await FoodPayment.findById(doc);
  if (!payment) {
    return NextResponse.json(
      { message: "Error in saving your order. Please contact helpdesk" },
      { status: 404 }
    );
  }
  let cOrder = await User.findById(user._id);
  if (!cOrder) {
    return NextResponse.json(
      { message: "Error in saving your order. Please contact helpdesk" },
      { status: 404 }
    );
  }
  let oldOrders = cOrder.foodOrders;
  let noofitems = (await FoodOrder.find({})).length + 1;
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let order = await FoodOrder.create({
      orderno: `Order#${noofitems + i}`,
      user: user._id,
      item: item,
      amount: amount,
      amountPaid: amountPaid,
      orderId: payment.orderId,
      paymentId: payment.paymentId,
      time: time,
      payment: payment._id,
    });
    oldOrders.push(order._id);
    if (item.seller === "sellerA") {
      await SellerAOrders.create({
        orderno: `Order#${noofitems + i}`,
        user: user._id,
        item: item,
        amount: item.price,
        amountPaid: item.price,
        orderId: payment.orderId,
        paymentId: payment.paymentId,
        time: time,
        payment: payment._id,
      });
    } else {
      await SellerBOrders.create({
        orderno: `Order#${noofitems + i}`,
        user: user._id,
        item: item,
        amount: item.price,
        amountPaid: item.price,
        orderId: payment.orderId,
        paymentId: payment.paymentId,
        time: time,
        payment: payment._id,
      });
    }
  }
  let uOrder = await User.findByIdAndUpdate(user._id, {
    foodOrders: oldOrders,
  });
  let orderDetails = [];
  for (let i = 0; i < oldOrders.length; i++) {
    let fOrder = await FoodOrder.findById(oldOrders[i]);
    if (!fOrder) {
      return NextResponse.json(
        { message: "Error in saving your order. Please contact helpdesk" },
        { status: 404 }
      );
    }
    orderDetails.push(fOrder);
  }

  return NextResponse.json(
    { message: "Order saved successfully", order: orderDetails },
    { status: 200 }
  );
}
