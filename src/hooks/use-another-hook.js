import UseItems from "./use-items";


export default function UseAnotherHook (props) {
    const {resetItems, fetchItems} = UseItems()

    const resetItems2 = () => {
        resetItems()
    }
    const fetchItems2 = () => {
        fetchItems()
    }

    return [resetItems2, fetchItems2]
}
