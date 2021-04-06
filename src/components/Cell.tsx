import React, { Component } from 'react';

export interface ProductData {
    id: string;
    image?: string;
    title?: string;
    price?: number;
    stock?: number;
}

export interface CellProps {
    product: ProductData;
}
 
export interface CellState {
    
}
 
export class Cell extends Component<CellProps, CellState> {
    constructor(props: CellProps) {
        super(props);
    }
    render() { 
        return ( <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div>Yeet</div>
        </div> );
    }
}