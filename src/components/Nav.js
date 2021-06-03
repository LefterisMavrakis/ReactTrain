import {NavLink} from 'react-router-dom';
import UseCart from "../hooks/use-cart";
// import UseItems from "../hooks/use-items";
// import {CartContext} from "../context/cartContext";
import Cart from "./Cart";

function Nav() {
    // const {items} = UseItems()
    const {cartItems} = UseCart()

    // const {cart} = useCart()
    const navStyle = {
        color: 'white'
    }
    // console.log(cart)
    return (
        <nav className="Nav">
                <div className={'appLogo'}><img src={'./fortnite_logo.png'} alt="App Logo"/></div>
                <div className="nav-links ">
                    <NavLink style={navStyle} to={'/'} exact>
                        <div>Home</div>
                    </NavLink>
                    <NavLink style={navStyle} to={'/shop'} exact>
                        <div>Shop</div>
                    </NavLink>
                </div>
                <div className="positionCart">
                    {cartItems ? <Cart/> : 'cart null'}
                </div>
        </nav>
    );
}

export default Nav;
