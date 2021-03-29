import UseCart from "../hooks/use-cart";

function Cart() {
    const {cartItems, cartTotal} = UseCart()
    // console.log(cart)
    return (
        <div className="cartWrapper">
            {cartItems ?
                <div>
                    Cart: {cartItems.length} / Cart Total {cartTotal}
                </div>
                : 'null cart'
            }

        </div>
    );
}

export default Cart;
