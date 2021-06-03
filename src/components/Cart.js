import UseCart from "../hooks/use-cart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart, faPlus, faMinus, faTimes} from "@fortawesome/free-solid-svg-icons";
import UseElementVisibility from "../hooks/use-element-visibility";


function Cart() {
    const {cartItems, cartTotal, addToCart, removeFromCart} = UseCart()
    const {visibility, toggleVisibility} = UseElementVisibility()
    const visibilityClass = visibility === true ? 'visible' : ''
    const handleIncrease = (e,item) => {
        e.stopPropagation()
        e.preventDefault()
        addToCart(item)
    }
    const handleDecrease = (e,item) => {
        e.stopPropagation()
        e.preventDefault()
        if(cartItems.length === 1 && item.quantity === 1 ) {
            toggleVisibility()
        }
        removeFromCart(item)

    }

    return (
        <div className="cartWrapper">
            <div className="cartIconWrapper" onClick={toggleVisibility}>
                <div className="cartIcon">
                    <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                </div>
                <div className="cartQuantity">
                    {
                        cartItems.reduce((acc,item) => {
                        return acc + item.quantity
                    },0)
                    }
                </div>
            </div>

            <div className={'cartPopupWrapper ' + visibilityClass}>
                {visibility ?   <div className="closeFilters" onClick={(e) => {e.stopPropagation(); toggleVisibility()}}>
                    <FontAwesomeIcon icon={faTimes} size="md" color={'#ffffff'} />
                </div> : ''  }
                <div className="cartItemsWrapper">
                    {cartItems ?
                        cartItems.map((item, index) => {
                            return (
                                <div className="cartItem" key={`${item.itemId}-${index}`}>
                                    <div className="cartItemImage" style={ {"backgroundImage" : `url(${item.item.images.icon})`} }>
                                    </div>
                                    <div className="cartItemInfo">
                                        <div className="cartItemName">
                                            {item.item.name}
                                        </div>
                                        <div className="cartItemCost">
                                            Price: {item.store ? item.store.cost : item.cost }
                                        </div>
                                        <div className="cartItemQuantity">
                                            Quantity:
                                            <div className={'quantityBtn'} onClick={(e)=>handleDecrease(e,item)}>
                                                <FontAwesomeIcon icon={faMinus} size="sm" color={'#000000'} />
                                            </div>
                                            <div className={'cartItemQuantityValue'}>
                                                {item.quantity}
                                            </div>
                                            <div className={'quantityBtn'} style={{position: "relative"}} onClick={(e)=>handleIncrease(e,item)}>
                                                <FontAwesomeIcon icon={faPlus} size="sm" color={'#000000'} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                        : 'null cart'
                    }
                </div>
                <div className={'cartTotal'}>
                    Total: {cartTotal}
                </div>

            </div>


        </div>
    );
}

export default Cart;
