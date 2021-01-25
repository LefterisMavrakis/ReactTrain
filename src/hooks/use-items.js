import { useEffect, useContext} from 'react'
import axios from "axios";
import {ItemContext} from "../context/itemContext";

function itemsReducer(state, action) {
    switch (action.type) {
        case 'reset':
            console.log(action)
            return action.payload;
        case 'set':
            return action.payload;
        // ... other actions ...
        default:
            return state;
    }
}

export default function UseItems (props) {
    // const [state, dispatch] = useReducer(itemsReducer,[])
    const [items, setItems ] = useContext(ItemContext)
    const fetchItems = async () => {
        const response = await axios.get('https://fortnite-api.theapinetwork.com/store/get')
        const result = await response.data.data
        // setItems(result)
        // dispatch({type:'set', payload:result})
        setItems(result)
    }
    const resetItems = () => {
        setItems([])
    }

    useEffect(() => {
        fetchItems()
    }, [])
    return {items, resetItems,fetchItems}
}
