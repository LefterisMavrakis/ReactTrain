import {NavLink} from 'react-router-dom';
import UseCart from "../hooks/use-cart";
// import UseItems from "../hooks/use-items";
// import {CartContext} from "../context/cartContext";
import Cart from "./Cart";
import {useLocation} from 'react-router-dom';

function Nav() {
    // const {items} = UseItems()
    const {cartItems} = UseCart()
    const location = useLocation()
    console.log(location)


    // const {cart} = useCart()
    const navStyle = {
        color: 'white'
    }
    // console.log(cart)
    return (
        <nav className="Nav">
                <div className={'appLogo'} style={{width:'150px'}}><img src={'./fortnite_logo.png'} alt="App Logo"/></div>
                <div className="nav-links ">
                    <NavLink style={navStyle} to={'/about'}>
                        <div>About</div>
                    </NavLink>
                    <NavLink style={navStyle} to={'/shop'}>
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
