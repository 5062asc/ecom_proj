"use client";
import { useState } from "react";
import { useAppSelector } from "@/app/lib/hooks/redux";
import { cartItemsAvailable } from "../store/slice/cart";
import { useRouter } from "next/navigation";
import axios from "axios";

interface FormData {
  name: string;
  email: string;
  address: string;
}

interface IProduct {
  _id: number;
  productName: string;
  productPrice: number;
  productDescription: string;
  productId: number;
}

export default function PlaceOrder() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    address: "",
  });
  const router = useRouter();
  //   const [productsData, setProductsData] = useState<IProduct[]>([]);
  const cartItems = useAppSelector(cartItemsAvailable);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/orders", { formData, cartItems });
      console.log("Response:", response.data);
      if (response.data.message === "Order details added successfully") {
        router.push("/orders");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // alert("Order placed");
  };

  return (
    <main>
      <div className="container mx-auto mt-10">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-3/4 mr-2 bg-white p-5 shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Checkout</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Shipping Address
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  placeholder="123 Main St"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
