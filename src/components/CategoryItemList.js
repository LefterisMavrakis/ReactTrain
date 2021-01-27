import {Link} from "react-router-dom";
import UseItems from "../hooks/use-items";

function CategoryItemList() {
    const {items} = UseItems()

    return (
        <div className='itemsWrapper'>
            {items.length > 0 ?
                items.map((item) => {
                    return (
                        <Link to={`/shop/${item.itemId}`} key={item.itemId}>
                            <div className='item'>
                                {item.item.images ?  <div className="itemImage">
                                    <img src={item.item.images.icon} alt="Item"/>
                                </div> : '' }

                                <div className="itemName">
                                    {item.item.name}
                                </div>
                                <div className="itemName">
                                    rarity: {item.item.rarity}
                                </div>
                                <div className="itemName">
                                    cost: {item.store.cost}
                                </div>
                            </div>
                        </Link>
                    )
                }) : 'No items found'
            }
        </div>
    );
}

export default CategoryItemList;
