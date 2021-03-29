import UseItems from "../hooks/use-items";
import CategoryItem from "./CategoryItem";


function CategoryItemList() {
    const {items} = UseItems()
    return (
        <div className='itemsWrapper'>
            {items.length > 0 ?
                items.map((item) => {
                    return (
                        <CategoryItem item={item} key={item.itemId}/>
                    )
                }) : 'No items found'
            }
        </div>
    );
}

export default CategoryItemList;
