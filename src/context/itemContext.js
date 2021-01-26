import {createContext, useEffect, useState} from 'react'
import axios from "axios";
export const ItemContext = createContext([])

export function ItemContextProvider(props) {
    const [items, setItems] = useState([])

    return (
        <ItemContext.Provider value={[items, setItems]}>
            {props.children}
        </ItemContext.Provider>
    )
}
