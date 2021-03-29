import {Link} from 'react-router-dom';
import UseCart from "../hooks/use-cart";
import UseItems from "../hooks/use-items";
// import {CartContext} from "../context/cartContext";
import Cart from "./Cart";

function Nav() {
    const {items} = UseItems()
    const {cartItems} = UseCart()


    // const {cart} = useCart()
    const navStyle = {
        color: 'white'
    }
    // console.log(cart)
    return (
        <nav className="Nav">
                <h3>Logo</h3>
                <ul className="nav-links">
                    <Link style={navStyle} to={'/about'}>
                        <li>About</li>
                    </Link>
                    <Link style={navStyle} to={'/shop'}>
                        <li>Shop</li>
                    </Link>

                    {cartItems ? <Cart/> : 'cart null'}
                </ul>
        </nav>
    );
}

export default Nav;
