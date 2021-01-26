import {ItemContextProvider} from "../context/itemContext";
import CategoryItemList from "./CategoryItemList";
import StateMutator from "./StateMutator";

function Shop() {
   // item details will be provide by itemContext.js
    return (
        <ItemContextProvider>
            <div className='containerWrapper'>
                <h1>Shop Page</h1>
                <div className='container'>
                    <StateMutator/>
                    <CategoryItemList />
                </div>
            </div>
        </ItemContextProvider>
    );
}

export default Shop;
