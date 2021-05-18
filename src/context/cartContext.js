import {createContext, useState, useEffect} from 'react'
export const CartStateContext = createContext()
// function cartReducer(state, action) {
//     switch (action.type) {
//         case 'add':
//             state.items.push(action.payload)
//             return state
//         case 'set':
//             return action.payload
//         default:
//             return state;
//     }
// }

export function CartContextProvider(props) {
    // const [cartItems, setCartItems] = useState([])
    const [cartItems, setCartItems] = useState(()=>{
        const cachedCart = window.localStorage.getItem('cart')
        return cachedCart ? JSON.parse(cachedCart) : []
    })
    // const [cartTotal, setCartTotal] = useState(0)
    const [cartTotal, setCartTotal] = useState(()=>{
        const cachedCartTotal = window.localStorage.getItem('cartTotal')
        return cachedCartTotal ? JSON.parse(cachedCartTotal) : 0
    })
    // const cartInitialState = {items:[], total: 0}
    // const [cart, dispatch] = useReducer(cartReducer, cartInitialState  )
    // useEffect(()=>{
    //     // dispatch({type:'set', payload:{
    //     //         items:[],
    //     //         total: 0
    //     //     }})
    //     // setCart({
    //     //     items:[],
    //     //     total: 0
    //     // })
    // },[])
    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(cartItems));
        window.localStorage.setItem('cartTotal', JSON.stringify(cartTotal));
    });
    return (
        <CartStateContext.Provider value={[cartItems, setCartItems, cartTotal, setCartTotal]}>
            {props.children}
        </CartStateContext.Provider>
    )
}
