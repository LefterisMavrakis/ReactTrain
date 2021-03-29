// import {CartContextProvider} from "../context/cartContext";
// import {ItemContextProvider} from "../context/itemContext";
import CategoryItemList from "./CategoryItemList";
import StateMutator from "./StateMutator";


function Shop() {
    // item details will be provide by itemContext.js
    return (
            <div className='containerWrapper'>
                <h1>Shop Page</h1>
                <div className='container'>
                        <StateMutator/>
                        <CategoryItemList/>
                </div>
            </div>
    );
}

export default Shop;
