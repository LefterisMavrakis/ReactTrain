import {useState, useEffect} from 'react';
import UseItems from "../hooks/use-items";
import UseAnotherHook from "../hooks/use-another-hook";
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

function StateMutator() {
    // const [items, setItems] = useContext(ItemContext)
    const { resetItems, fetchItems, handleSearch, maxCost, minCost, cachedItems} = UseItems()
    const [resetItems2, fetchItems2] = UseAnotherHook()
    const [rarityFormItems, setRarityFormItems] = useState(new Set())
    const [sliderValue, setSliderValue] = useState(maxCost)
    const sliderLayers = {
        [minCost]: `${minCost}`,
        [maxCost / 2]: `${maxCost / 2}`,
        [maxCost]: `${maxCost}`
    }

    const handleRarityFormItems = async (eventTarget) => {
        setRarityFormItems((previousItems) => {
            if (eventTarget.checked) {
                previousItems.add(eventTarget.value)
            } else {
                previousItems.delete(eventTarget.value)
            }
            // console.log(set)
            return previousItems

        })
        await handleSearch(sliderValue, rarityFormItems)
    }
    const handleSliderOnChange = (value) => {
        // console.log(value)
        setSliderValue(value)
    }

    const handleSliderOnChangeComplete = async (value) => {
        await handleSearch(sliderValue, rarityFormItems)
    }
    const handleResetForm = (e) => {
        e.preventDefault()
        e.target.form.reset()
        fetchItems()
        setSliderValue(maxCost)
        const newWordSet = new Set(rarityFormItems)
        newWordSet.clear()
        setRarityFormItems(newWordSet)
        // e.target.form.reset()


    }
    useEffect(() => {
        setSliderValue(maxCost)
    }, [maxCost])

    return (
        <div className='actionsBar'>
            <h2>Actions</h2>
            <div className="actionButtonsWrapper">
                <button onClick={resetItems}>RESET ITEMS</button>
                <button onClick={resetItems2}>RESET ITEMS FROM ANOTHER HOOK</button>
                <button onClick={fetchItems}>REFETCH ITEMS</button>
                <button onClick={fetchItems2}>REFETCH ITEMS FROM ANOTHER HOOK</button>
            </div>
            <h2>Filters</h2>
            <div className="rarityFilterWrapper">
                <form onChange={(e) => handleRarityFormItems(e.target)}>
                    <div className="formHeader">
                        <h3>Rarity</h3>
                    </div>
                    <div className="rarityFilter">
                        <input type='checkbox' name='rarityFilter' id='epicRarityFilter' value='epic'/>
                        <label htmlFor='epicRarityFilter'>
                            Epic
                        </label>
                    </div>
                    <div className="rarityFilter">
                        <input type='checkbox' name='rarityFilter' id='rareRarityFilter' value='rare'/>
                        <label htmlFor='rareRarityFilter'>
                            Rare
                        </label>
                    </div>
                    <div className="rarityFilter">
                        <input type='checkbox' name='rarityFilter' id='uncommonRarityFilter' value='uncommon'/>
                        <label htmlFor='uncommonRarityFilter'>
                            Uncommon
                        </label>
                    </div>
                    <div className="rarityFilter">
                        <input type='checkbox' name='rarityFilter' id='allRarityFilter' value='all'/>
                        <label htmlFor='allRarityFilter'>
                            All
                        </label>
                    </div>
                    <h3>Price</h3>
                    {minCost !== 0 && maxCost !== 0 ?
                        <Slider
                            min={minCost}
                            max={maxCost}
                            step={1}
                            value={sliderValue}
                            onChange={handleSliderOnChange}
                            onChangeComplete={handleSliderOnChangeComplete}
                            labels={sliderLayers}
                        />
                        : ''}
                    <button style={{marginTop: 70}} onClick={handleResetForm}>clear selections</button>
                </form>
            </div>
        </div>
    );
}

export default StateMutator;
