import {Link} from "react-router-dom";
import UseCart from "../hooks/use-cart";
import {useCallback} from 'react'
import UseItems from "../hooks/use-items";

function CategoryItem({item}) {
    const {addToCart} = UseCart()

    const handleAddToCart = (e, cartItem) => {
        e.stopPropagation()
        addToCart(cartItem)
    }

    return (
        <div className='item'>
            {/*<Link to={`/shop/${item.itemId}`}>*/}
                {item.item.images ? <div className="itemImage">
                    <img src={item.item.images.icon} alt="Item"/>
                </div> : ''}
            {/*</Link>*/}
            <div className="itemName">
                {item.item.name}
            </div>
            <div className="itemName">
                rarity: {item.item.rarity}
            </div>
            <div className="itemName">
                cost: {item.store.cost}
            </div>
            <button onClick={(e) => handleAddToCart(e, item)}> Add to Cart</button>
        </div>
    );
}

export default CategoryItem;
