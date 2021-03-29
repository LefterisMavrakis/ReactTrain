import {useContext} from 'react'
// import {CartDispatchContext} from "../context/cartContext";
import {CartStateContext} from "../context/cartContext";

export default function UseCart(props) {
    const [cartItems,setCartItems, cartTotal, setCartTotal] = useContext(CartStateContext)

    const addToCart = (item) => {
        setCartItems(prevCartItems => [...prevCartItems, item])
        setCartTotal(prevTotal => {
            const total = cartItems.reduce((acc, item)=> {
                return acc + item.store.cost
            }, item.store.cost)
            return total
        })
    }


    return {cartItems, addToCart, cartTotal}
}
