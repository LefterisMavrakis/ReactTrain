import {Link} from "react-router-dom";
import UseCart from "../hooks/use-cart";
import {useState, useEffect} from 'react'
import useButtonPress from "../hooks/use-button-press";

function CategoryItem({item}) {
    const {addToCart} = UseCart()
    const {buttonPress, handleMouseDown, handleMouseUp} = useButtonPress()

    const handleAddToCart = (e, cartItem) => {
        e.stopPropagation()
        addToCart(cartItem)
    }
    return (
        <div className={'item ' + item.item.rarity }>
            {/*<Link to={`/shop/${item.itemId}`}>*/}
                {item.item.images ?
                    <div className="itemImage" style={ {"backgroundImage" : `url(${item.item.images.icon})`} } >
                    </div>
                    : ''}
            {/*</Link>*/}
            <div className="categoryItemInfo">
                <div className={"itemName"}>
                    {item.item.name}
                </div>
                <div className="itemName">
                    rarity: {item.item.rarity}
                </div>
                <div className="itemName">
                    cost: {item.store.cost}
                </div>
            </div>
            <div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className={'addToCartBtn'} onClick={(e) => handleAddToCart(e, item)}>
                <button className={buttonPress}>Add to Cart</button>
            </div>
        </div>
    );
}

export default CategoryItem;
