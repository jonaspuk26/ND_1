import React, { useEffect, useState } from 'react';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/orders')
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch orders:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading orders...</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Order List</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table className="w-full table-auto border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-400 px-4 py-2">Vardas Pavardė</th>
                            <th className="border border-gray-400 px-4 py-2">El. paštas</th>
                            <th className="border border-gray-400 px-4 py-2">Užsakymo suma (€)</th>
                            <th className="border border-gray-400 px-4 py-2">Data</th>
                            <th className="border border-gray-400 px-4 py-2">Produktai</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td className="border px-4 py-2">{order.name} {order.surname}</td>
                                <td className="border px-4 py-2">{order.email}</td>
                                <td className="border px-4 py-2">
                                    {order.orderAmount ? order.orderAmount.toFixed(2) : 'N/A'}
                                </td>
                                <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleString()}</td>
                                <td className="border px-4 py-2">
                                    <ul>
                                        {order.items && order.items.map((item, idx) => (
                                            <li key={idx}>
                                                {item.name} × {item.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
