"use client";

import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/lib/hooks/redux";
import { orderDetails } from "../store/slice/cart";

interface Order {
  _id: string;
  formData: {
    name: string;
    email: string;
    address: string;
  }[];
  cartItems: {
    _id: string;
    productId: number;
    productName: string;
    brandName: string;
    productDescription: string;
    productPrice: number;
  }[];
}

const Orders: React.FC = () => {
  const [ordersDetailsApi, setOrdersDetailsApi] = useState<Order[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const columns: GridColDef[] = [
    { field: "_id", headerName: "Order ID", width: 200 },
    { field: "name", headerName: "Customer Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "Address", width: 300 },
    { field: "productName", headerName: "Product Name", width: 200 },
    { field: "brandName", headerName: "Brand", width: 200 },
    { field: "productDescription", headerName: "Description", width: 300 },
    { field: "productPrice", headerName: "Price", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button color="primary" onClick={() => handleViewMore(params.row)}>
          View More
        </Button>
      ),
    },
  ];
  const handleViewMore = (row: any) => {
    console.log(row);
    dispatch(orderDetails(row));
    const route = `/orderDetails`;

    router.push(route);
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const url = "/api/orders";
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await res.json();
      console.log(data);
      setOrdersDetailsApi(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  const rows = ordersDetailsApi.flatMap((order) =>
    order.formData.map((formData, index) => ({
      id: `${order._id}-${index}`,
      ...formData,
      ...order.cartItems[index],
    }))
  );

  return (
    <main className="">
      <div style={{ height: 400, width: "100%", backgroundColor: "white" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            columns: {
              columnVisibilityModel: {
                // Hide columns status and traderName, the other columns will remain visible
                name: false,
                email: false,
                address: false,
                productDescription: false,
              },
            },
          }}
        />
      </div>
    </main>
  );
};

export default Orders;
