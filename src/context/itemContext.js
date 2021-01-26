import {createContext, useState, useEffect} from 'react'
import axios from "axios";
export const ItemContext = createContext([])

export function ItemContextProvider(props) {
    const [items, setItems] = useState([])
    const [maxCost, setMaxCost ] = useState(0)
    const [minCost, setMinCost ] = useState(0)
    const [cachedItems, setCachedItems] = useState([])
    const fetchItems = async () => {
        const response = await axios.get('https://fortnite-api.theapinetwork.com/store/get')
        const result = await response.data.data
        setItems(prevItem => {
            return result
        })
        setCachedItems(result)
        setItemsMaxCost(result)
        setItemsMinCost(result)
        return result
    }
    const setItemsMaxCost = (items) => {
        const maxCost = Math.max.apply(Math, items.map(function(item) { return item.store.cost; }))
        setMaxCost(maxCost)
    }
    const setItemsMinCost = (items) => {
        const minCost = Math.min.apply(Math, items.map(function(item) { return item.store.cost; }))
        setMinCost(minCost)
    }
    useEffect(() => {
        fetchItems()
    }, [])
    return (
        <ItemContext.Provider value={[items, setItems, fetchItems, maxCost, minCost, cachedItems]}>
            {props.children}
        </ItemContext.Provider>
    )
}
