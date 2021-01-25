import {createContext, useEffect, useState} from 'react'
import axios from "axios";
export const ItemContext = createContext([])

export function ItemContextProvider(props) {
    const [items, setItems] = useState([])
    const fetchItems = async () => {
        const response = await axios.get('https://fortnite-api.theapinetwork.com/store/get')
        const result = await response.data.data
        setItems(result)
    }

    useEffect(() => {
        fetchItems()
    }, [])

    return (
        <ItemContext.Provider value={[items, setItems]}>
            {props.children}
        </ItemContext.Provider>
    )
}
