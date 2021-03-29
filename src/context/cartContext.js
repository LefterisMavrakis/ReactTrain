import {createContext, useState} from 'react'
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
    const [cartItems, setCartItems] = useState([])
    const [cartTotal, setCartTotal] = useState(0)
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
    return (
        <CartStateContext.Provider value={[cartItems, setCartItems, cartTotal, setCartTotal]}>
            {props.children}
        </CartStateContext.Provider>
    )
}
