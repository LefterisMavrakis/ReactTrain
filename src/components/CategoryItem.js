import {Link} from "react-router-dom";
import UseCart from "../hooks/use-cart";
import {useCallback} from 'react'
import UseItems from "../hooks/use-items";
import UseElementVisibility from "../hooks/use-element-visibility";

function CategoryItem({item}) {
    const {addToCart} = UseCart()

    const handleAddToCart = (e, cartItem) => {
        e.stopPropagation()
        addToCart(cartItem)
    }

    return (
        <div className='item'>
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
            <button onClick={(e) => handleAddToCart(e, item)}> Add to Cart</button>
        </div>
    );
}

export default CategoryItem;
