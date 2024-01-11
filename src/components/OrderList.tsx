import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Burrito } from '../types/burrito';
import { OrderResponse } from '../types/orderResponse';
import { API_BASE_URL } from '../config';

const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [burritos, setBurritos] = useState<Burrito[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}orders`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setOrders(data);
            } catch (err: any) {
                console.log(err.message);
            }
        };

        const fetchBurritos = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}burrito`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setBurritos(data);
            } catch (err: any) {
                console.log(err.message);
            }
        };

        fetchBurritos();
        fetchOrders();
    }, []);

    const getBurritoDetails = (burritoId: string) => {
        return burritos.find(burrito => burrito._id === burritoId);
    };

    return (
        <Box p={3}>
            <Typography variant="h4">Active Orders</Typography>
            <List>
                {orders.map(order => (
                    <div key={order._id}>
                        <ListItem>
                            <ListItemText primary={`Order ID: ${order._id}`} secondary={`Total Cost: $${order.totalCost.toFixed(2)}`} />
                        </ListItem>
                        <Divider />
                        <List>
                            {order.items.map(item => {
                                const burrito = getBurritoDetails(item.burrito);
                                return (
                                    <ListItem key={item._id}>
                                        <ListItemText primary={`${burrito?.name} - Quantity: ${item.quantity}`} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </div>
                ))}
            </List>
        </Box>
    );
};

export default OrderList;
