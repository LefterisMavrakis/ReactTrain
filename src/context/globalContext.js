
import {CartContextProvider} from "./cartContext";
import {ItemContextProvider} from "./itemContext";
// import UseCart from "../hooks/use-cart";
// import UseItems from "../hooks/use-items";
// import {ItemContext} from "./itemContext";
// import {CartStateContext} from "./cartContext";




export default function GlobalContextProvider(props) {

    return (
        <ItemContextProvider>
            <CartContextProvider>
                    {props.children}
            </CartContextProvider>
        </ItemContextProvider>
    )
}
