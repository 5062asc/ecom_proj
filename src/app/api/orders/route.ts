import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../db/db";
import OrderDetailModal from "@/app/db/models/orderDetails";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { formData, cartItems } = await request.json();
    const orderDetailsData = {
      formData,
      cartItems,
    };

    console.log(orderDetailsData);

    // for (const item of cartItems) {
    //   console.log("Checking for product:", item.productId);
    //   const newOrderDetail = new OrderDetailModal(orderDetailsData);
    //   const existingProduct = await newOrderDetail.findOne({
    //     "cartItems.productId": item.productId,
    //   });
    //   console.log("Existing product:", existingProduct);
    // }
    const newOrderDetail = new OrderDetailModal(orderDetailsData);
    const savedOrderDetail = await newOrderDetail.save();

    console.log(savedOrderDetail); // Optional: Log the saved order detail

    return Response.json({
      message: "Order details added successfully",
      data: savedOrderDetail,
    });
  } catch (error) {
    console.error("Error adding order details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();
    const products = await OrderDetailModal.find();
    console.log(products);
    return Response.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    Response.json({ error: "Internal Server Erro" });
  }
}
