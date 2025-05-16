import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

import getPastOrders from "../api/getPastOrders";
import getPastOrder from "../api/getPastOrder";
import Modal from "../Modal";
import ErrorBoundary from "../ErrorBoundary";

export const Route = createLazyFileRoute("/past")({
  component: ErrorBoundaryWrappedPastOrderRoute,
});

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function PastOrdersRoute() {
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState();

  const { isLoading, data } = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 15000,
  });

  const { isLoading: isOrderLoading, data: orderData } = useQuery({
    queryKey: ["past-order", selectedOrder],
    queryFn: () => getPastOrder(selectedOrder),
    enabled: !!selectedOrder,
    staleTime: 24 * 60 * 60 * 1000,
  });

  // throw new Error("haha terjadi error");

  if (isLoading) {
    return (
      <div className="past-orders">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <td>Order ID</td>
            <td>Date</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>
                <button onClick={() => setSelectedOrder(order.order_id)}>
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <div>{page}</div>
        <button onClick={() => setPage(page + 1)} disabled={data.length < 10}>
          Next
        </button>
      </div>
      {selectedOrder ? (
        <Modal>
          <h2>Order number {selectedOrder}</h2>
          {!isOrderLoading ? (
            <table>
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Name</td>
                  <td>Size</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {orderData.orderItems.map((item) => (
                  <tr key={`${item.pizzaTypeId}_${item.size}`}>
                    <td>
                      <img src={item.image} alt={item.name} />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.size}</td>
                    <td>{item.quantity}</td>
                    <td>{currency.format(item.price)}</td>
                    <td>{currency.format(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading...</p>
          )}
          <button onClick={() => setSelectedOrder()}>Tutup</button>
        </Modal>
      ) : null}
    </div>
  );
}

function ErrorBoundaryWrappedPastOrderRoute() {
  return (
    <ErrorBoundary>
      <PastOrdersRoute />
    </ErrorBoundary>
  );
}
