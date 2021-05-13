import {useContext} from 'react'
// import {CartDispatchContext} from "../context/cartContext";
import {CartStateContext} from "../context/cartContext";

export default function UseCart(props) {
    const [cartItems,setCartItems, cartTotal, setCartTotal] = useContext(CartStateContext)

    const addToCart = (item) => {
        const cartItemsToSet = cartItems
        const cartItem = item
        const sameCartItem = cartItemsToSet.find(cartItem => cartItem.itemId === item.itemId )
        if(sameCartItem){
            cartItemsToSet.forEach(item=>{
                if(sameCartItem.itemId === item.itemId) {
                    item.quantity++
                    item.quantityCost = item.store.cost * item.quantity
                }
            })
        }
        else {
            cartItem.quantity = 1
            cartItem.quantityCost = cartItem.store.cost
            cartItemsToSet.push(cartItem)
        }
        // setCartItems(prevCartItems => [...prevCartItems, cartItem])
        setCartItems(cartItemsToSet)
        window.localStorage.setItem('cart', JSON.stringify(cartItems));
        const total = cartItems.reduce((acc, item)=> {
            return acc + item.quantityCost
        }, 0)
        setCartTotal(total)
        window.localStorage.setItem('cartTotal', JSON.stringify(total));
    }


    return {cartItems, addToCart, cartTotal}
}
