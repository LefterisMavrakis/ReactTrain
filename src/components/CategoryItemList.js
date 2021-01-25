import {useContext} from 'react';
import {ItemContext} from "../context/itemContext";
import {Link} from "react-router-dom";
import UseItems from "../hooks/use-items";

function CategoryItemList() {
    // const [items, setItems] = useContext(ItemContext)
    const {items} = UseItems()

    return (
        <div className='itemsWrapper'>
            {items.length > 0 ?
                items.map((item) => {
                    return (
                        <Link to={`/shop/${item.itemId}`} key={item.itemId}>
                            <div className='item'>
                                {item.item.images ?  <div className="itemImage">
                                    <img src={item.item.images.icon} alt="Item Image"/>
                                </div> : '' }

                                <div className="itemName">
                                    {item.item.name}
                                </div>
                            </div>
                        </Link>
                    )
                }) : 'No items found'
            })
        </div>
    );
}

export default CategoryItemList;
