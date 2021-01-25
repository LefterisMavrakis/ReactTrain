import { useEffect, useState, useReducer, useCallback, useContext} from 'react'
import axios from "axios";
import UseItems from "./use-items";


export default function UseAnotherHook (props) {
    const {items, resetItems, fetchItems} = UseItems()

    const resetItems2 = () => {
        resetItems()
    }
    const fetchItems2 = () => {
        fetchItems()
    }

    return [resetItems2, fetchItems2]
}
