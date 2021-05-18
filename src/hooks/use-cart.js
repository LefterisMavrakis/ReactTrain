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
        setCartItems(cartItemsToSet)
        handleCartTotal()
    }

    const removeFromCart = (item) => {
        if (item.quantity > 1) {
            decreaseCartProductQuantity(item)
            handleCartTotal()
        } else {
            deleteCartProduct(item)
            handleCartTotal()
        }

    }

    const deleteCartProduct = (item) => {
        let cartItemsToSet = []
        const cartItemsToFind = cartItems
        cartItemsToFind.find(cartItem => cartItem.itemId === item.itemId).quantity = 0
        cartItemsToFind.find(cartItem => cartItem.itemId === item.itemId).quantityCost = 0
        cartItemsToSet = cartItemsToFind.filter(cartItem => cartItem.itemId !== item.itemId)
        setCartItems(cartItemsToSet)
        handleCartTotal()
    }

    const decreaseCartProductQuantity = (item) => {
        const cartItemsToSet = cartItems
        cartItemsToSet.find(cartItem => cartItem.itemId === item.itemId).quantity--
        cartItemsToSet.find(cartItem => cartItem.itemId === item.itemId).quantityCost =
            cartItemsToSet.find(cartItem => cartItem.itemId === item.itemId).store.cost *
            cartItemsToSet.find(cartItem => cartItem.itemId === item.itemId).quantity
        setCartItems(cartItemsToSet)
    }

    const handleCartTotal = () => {
        const total = cartItems.reduce((acc, item)=> {
            return acc + item.quantityCost
        }, 0)
        setCartTotal(total)
    }

    return {cartItems, addToCart, removeFromCart, cartTotal}
}
