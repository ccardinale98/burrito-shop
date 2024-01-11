import React from 'react';
import { Burrito } from '../types/burrito';

interface BurritoListProps {
    burritos: Burrito[];
}


const BurritoList: React.FC<BurritoListProps> = ({ burritos }) => {
    return (
        <div>
            <h2>Available Burritos</h2>
            <ul>
                {burritos.map(burrito => (
                    <li key={burrito._id}>{`${burrito.name} - ${burrito.size} - $${burrito.price}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default BurritoList;