import { useContext} from 'react'
import {ItemContext} from "../context/itemContext";

// function itemsReducer(state, action) {
//     switch (action.type) {
//         case 'epic':
//             return action.payload.filter(item => item.item.rarity === action.type);
//         case 'rare':
//             return action.payload.filter(item => item.item.rarity === action.type);
//         case 'uncommon':
//             return action.payload.filter(item => item.item.rarity === action.type);
//         case 'reset':
//             return action.payload;
//         // ... other actions ...
//         default:
//             return state;
//     }
// }

export default function UseItems (props) {
    const [items, setItems, fetchItems, maxCost, minCost, cachedItems ] = useContext(ItemContext)

    const resetItems = () => {
        setItems([])
    }

    const raritySearch = async (rarityFormItems) => {
        let itemsToFind = []
        // await fetchItems().then((data)=> {
            for (let searchWord of rarityFormItems) {
                // let itemsToFind = data.filter(item => item.item.rarity === searchWord)
                cachedItems.forEach((item, index) => {
                    if (item.item.rarity === searchWord) {
                        itemsToFind.push(item)
                    }
                })
            }
            if(rarityFormItems.has('all') || rarityFormItems.size === 0) {
                setItems(cachedItems)
            } else {
                setItems(itemsToFind)
            }
        // })
    }

    const handleSearch = async (priceValue, rarityFormItems) => {
        await fetchItems().then( async (data)=> {
            if(rarityFormItems.size !== 0) {
                await raritySearch(rarityFormItems)
                // this is for price searching
                setItems(prevItems => {
                    const itemsToSet = prevItems.filter(item => item.store.cost <= priceValue )
                    return itemsToSet
                })
            } else {
                const itemsToSet = data.filter(item => item.store.cost <= priceValue )
                setItems(itemsToSet)
            }

        })

    }

    return {items, resetItems,fetchItems, handleSearch, maxCost, minCost}
}
