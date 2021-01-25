import UseItems from "../hooks/use-items";
import UseAnotherHook from "../hooks/use-another-hook";

function StateMutator() {
    // const [items, setItems] = useContext(ItemContext)
    const {resetItems,fetchItems} = UseItems()
    const [resetItems2, fetchItems2] = UseAnotherHook()

    return (
        <div>
            <button onClick={resetItems}>RESET ITEMS</button>
            <button onClick={resetItems2}>RESET ITEMS FROM ANOTHER HOOK</button>
            <button onClick={fetchItems}>REFETCH ITEMS</button>
            <button onClick={fetchItems2}>REFETCH ITEMS FROM ANOTHER HOOK</button>
        </div>
    );
}

export default StateMutator;
