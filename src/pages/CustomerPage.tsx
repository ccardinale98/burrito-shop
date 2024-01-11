import React, { useState, useEffect, useCallback } from 'react';
import OrderForm from '../components/OrderForm';
import { Burrito } from '../types/burrito';
import { Order } from '../types/order';
import { API_BASE_URL } from '../config';
import { Alert, Box, Button } from '@mui/material';

const CustomerPage: React.FC = () => {
    const [burritos, setBurritos] = useState<Burrito[]>([]);
    const [formState, setFormState] = useState<{ [key: string]: number }>({});
    const [orderStatus, setOrderStatus] = useState<string>('');
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    useEffect(() => {
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
    }, []);

    const handleOrderSubmit = (order: Order) => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(order)
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setOrderStatus('Order submitted successfully!');
                setIsSuccess(true);
                resetFormState();
            } catch (err: any) {
                console.log(err.message);
                setOrderStatus('Failed to submit order.');
                setIsSuccess(false);
            }
        }

        fetchOrder();
    };

    const resetFormState = useCallback(() => {
        setFormState({});
    }, []);

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', my: 4 }}>
            <OrderForm burritos={burritos} formState={formState} setFormState={setFormState} onSubmit={handleOrderSubmit} />
            {orderStatus && (
                <Alert severity={isSuccess ? 'success' : 'error'} sx={{ mt: 2 }}>
                    {orderStatus}
                </Alert>
            )}
        </Box>
    );
}

export default CustomerPage;