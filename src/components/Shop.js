import {useState, useEffect} from 'react'
import {ItemContextProvider} from "../context/itemContext";
import CategoryItemList from "./CategoryItemList";
import StateMutator from "./StateMutator";

function Shop() {
   // item details will be provide by itemContext.js
    return (
        <ItemContextProvider>
            <div>
                <h1>Shop Page</h1>
                <div>
                    <StateMutator/>
                    <CategoryItemList />
                </div>
            </div>
        </ItemContextProvider>
    );
}

export default Shop;
