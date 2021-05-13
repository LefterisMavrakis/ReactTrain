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
                <div>Logo</div>
                <div className="nav-links ">
                    <Link style={navStyle} to={'/about'}>
                        <div>About</div>
                    </Link>
                    <Link style={navStyle} to={'/shop'}>
                        <div>Shop</div>
                    </Link>
                </div>
                <div className="positionCart">
                    {cartItems ? <Cart/> : 'cart null'}
                </div>
        </nav>
    );
}

export default Nav;
