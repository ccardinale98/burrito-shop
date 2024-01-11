import React, { useEffect, useState } from 'react';
import { Burrito } from '../types/burrito';
import { Order } from '../types/order';
import { Button, TextField, Typography, Box, Card, CardContent, Grid } from '@mui/material';

interface OrderFormProps {
    burritos: Burrito[];
    formState: { [key: string]: number };
    setFormState: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
    onSubmit: (order: Order) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ burritos, formState, setFormState, onSubmit }) => {
    const [totalCost, setTotalCost] = useState<number>(0);

    useEffect(() => {
        const cost = burritos.reduce((acc, burrito) => {
            const quantity = formState[burrito._id] || 0;
            return acc + (quantity * burrito.price);
        }, 0);
        setTotalCost(cost);
    }, [formState, burritos]);

    const handleQuantityChange = (burritoId: string, quantity: number) => {
        setFormState(prev => ({
            ...prev,
            [burritoId]: quantity
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const items = Object.entries(formState)
            .filter(([_, quantity]) => quantity > 0)
            .map(([burrito, quantity]) => ({ burrito, quantity }));
        onSubmit({ items });
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', my: 4 }}>
            <form onSubmit={handleSubmit}>
                <Typography variant="h4" gutterBottom>
                    Order Your Burrito
                </Typography>

                {burritos.map(burrito => (
                    <Card key={burrito._id} variant="outlined" sx={{ my: 2 }}>
                        <CardContent>
                            <Typography variant="h6">{`${burrito.name} - ${burrito.size.toUpperCase()} - $${burrito.price}`}</Typography>
                            <TextField
                                type="number"
                                label="Quantity"
                                variant="outlined"
                                size="small"
                                fullWidth
                                margin="normal"
                                InputProps={{ inputProps: { min: 0 } }}
                                value={formState[burrito._id] || 0}
                                onChange={(e) => handleQuantityChange(burrito._id, parseInt(e.target.value) || 0)}
                            />
                        </CardContent>
                    </Card>
                ))}

                <Grid container justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Total Cost: ${totalCost.toFixed(2)}</Typography>
                    <Button type="submit" variant="contained" color="primary">
                        Submit Order
                    </Button>
                </Grid>
            </form>
        </Box>
    );
};

export default OrderForm;
