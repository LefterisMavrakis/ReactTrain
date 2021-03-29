import { useContext} from 'react'
import {ItemContext} from "../context/itemContext";
import {CartStateContext} from "../context/cartContext";
import UseCart from "./use-cart";

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

export default function UseItems(props) {
    const [items, setItems, fetchItems, maxCost, minCost] = useContext(ItemContext)

    const resetItems = () => {
        setItems([])
    }

    const makeFiltering = async (filterForm) => {

        await fetchItems().then(async (data) => {
            const searchByNameItems = filterForm.searchTerm !== "" ? data.filter(item => item.item.name.toLowerCase().includes(filterForm.searchTerm.toLowerCase())) : null
            let searchByRarityItems = []
            if (searchByNameItems !== null) {
                searchByNameItems.forEach(item => {
                    if (filterForm.rarityCheck.size > 0) {
                        for (let rarityValue of filterForm.rarityCheck) {
                            if (item.item.rarity === rarityValue && item.store.cost <= filterForm.priceRange) {
                                searchByRarityItems.push(item)
                            }
                            // if (item.item.rarity !== rarityValue) {
                            //     searchByRarityItems = []
                            // }
                        }
                    } else {
                        if (item.store.cost <= filterForm.priceRange) {
                            searchByRarityItems.push(item)
                        }
                    }
                    if (filterForm.rarityCheck.has('all')) {
                        searchByRarityItems = data
                    }
                })
                setItems(searchByRarityItems)
            } else {
                const newItems = await data.filter((item, index) => {
                    for (let rarityValue of filterForm.rarityCheck) {
                        if (item.item.rarity === rarityValue && item.store.cost <= filterForm.priceRange) {
                            return item
                        }
                    }
                })
                if (newItems.length > 0 && !filterForm.rarityCheck.has('all')) {
                    setItems(newItems)
                } else if (newItems.length === 0 || filterForm.rarityCheck.has('all')) {
                    setItems(() => {
                        const newItems = data.filter(item => item.store.cost <= filterForm.priceRange)
                        return newItems
                    })
                }

            }
        })
    }

    return {items, resetItems, fetchItems, maxCost, minCost, makeFiltering}
}
