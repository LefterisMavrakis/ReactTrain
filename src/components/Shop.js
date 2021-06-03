// import {CartContextProvider} from "../context/cartContext";
// import {ItemContextProvider} from "../context/itemContext";
import CategoryItemList from "./CategoryItemList";
import StateMutator from "./StateMutator";


function Shop() {
    // item details will be provide by itemContext.js
    return (
            <div className='containerWrapper'>
                <h2 className={'generalTitle'}>Shop Page</h2>
                <div className='container'>
                    <div className="catalogWrapper">
                        <StateMutator/>
                        <CategoryItemList/>
                    </div>

                </div>
            </div>
    );
}

export default Shop;
