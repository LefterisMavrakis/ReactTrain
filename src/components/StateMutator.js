import {useState, useEffect} from 'react';
import UseItems from "../hooks/use-items";
// import UseAnotherHook from "../hooks/use-another-hook";
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

function StateMutator() {
    // const [items, setItems] = useContext(ItemContext)
    const { resetItems, fetchItems, maxCost, minCost, makeFiltering} = UseItems()
    // const [resetItems2, fetchItems2] = UseAnotherHook()
    const [rarityFormItems, setRarityFormItems] = useState(new Set())
    const [sliderValue, setSliderValue] = useState(maxCost)
    const [searchName, setSearchName] = useState('')
    const filterFormState = {
        'searchTerm': searchName,
        'rarityCheck': rarityFormItems,
        'priceRange': sliderValue
    }
    const [filterForm, setFilterForm] = useState(filterFormState)

    const sliderLayers = {
        [minCost]: `${minCost}`,
        [maxCost / 2]: `${maxCost / 2}`,
        [maxCost]: `${maxCost}`
    }
    const handleSearchName = (e) => {
        e.preventDefault()
        setSearchName(e.target.value)
        filterFormState.searchTerm = e.target.value
        setFilterForm(filterFormState)
    }
    const handleRarityFormItems = async (eventTarget) => {
        setRarityFormItems((previousItems) => {
            const newItems = previousItems
            if (eventTarget.checked) {

                newItems.add(eventTarget.value)
            } else {
                console.log('here')
                newItems.delete(eventTarget.value)
            }
            return newItems

        })
        filterFormState.rarityCheck = rarityFormItems
        setFilterForm(filterFormState)

    }
    const handleSliderOnChange = (value) => {
        setSliderValue(value)
        setFilterForm(filterFormState)
    }

    const handleSliderOnChangeComplete = async () => {
        setFilterForm(filterFormState)
        // await handleFiltersForm(null,filterForm)
    }
    const handleResetForm = (e) => {
        e.preventDefault()
        setSearchName('')
        fetchItems()
        setSliderValue(maxCost)
        const newWordSet = new Set(rarityFormItems)
        newWordSet.clear()
        setRarityFormItems(newWordSet)
        filterFormState.rarityCheck = newWordSet
        console.log('FROMRESET:  ',filterFormState)
        setFilterForm(filterFormState)
        e.target.form.reset()
    }
    const handleFiltersForm = async (e=null, filterForm = null) => {
        console.log('handleFiltersForm:  ',filterForm)
        if(e!==null){
            e.preventDefault()
        }
        await makeFiltering(filterForm)
    }
    useEffect(() => {
        setSliderValue(maxCost)
        setFilterForm({
            'searchTerm': searchName,
            'rarityCheck': rarityFormItems,
            'priceRange': maxCost
        })
    }, [maxCost])


    return (
        <div className='actionsBar'>
            <h2>Actions</h2>
            <div className="actionButtonsWrapper">
                <button onClick={resetItems}>RESET ITEMS</button>
                {/*<button onClick={resetItems2}>RESET ITEMS FROM ANOTHER HOOK</button>*/}
                <button style={{marginLeft:30}} onClick={fetchItems}>REFETCH ITEMS</button>
                {/*<button onClick={fetchItems2}>REFETCH ITEMS FROM ANOTHER HOOK</button>*/}
            </div>
            <h2>Filters</h2>
            <div className="filtersWrapper">
                <form onSubmit={(e) => handleFiltersForm(e,filterForm)}>
                    <div className="searchByNameWrapper">
                        <h3>Search by name</h3>
                        <input type='text' value={searchName} onChange={ (e) => handleSearchName(e) }/>
                    </div>
                    <div className="rarityFilterWrapper">

                            <div className="formHeader">
                                <h3>Rarity</h3>
                            </div>
                            <div className="rarityFilter">
                                <input type='checkbox' onChange={(e) => handleRarityFormItems(e.target)} name='rarityFilter' id='epicRarityFilter' value='epic'/>
                                <label htmlFor='epicRarityFilter'>
                                    Epic
                                </label>
                            </div>
                            <div className="rarityFilter">
                                <input type='checkbox' onChange={(e) => handleRarityFormItems(e.target)} name='rarityFilter' id='rareRarityFilter' value='rare'/>
                                <label htmlFor='rareRarityFilter'>
                                    Rare
                                </label>
                            </div>
                            <div className="rarityFilter">
                                <input type='checkbox' onChange={(e) => handleRarityFormItems(e.target)} name='rarityFilter' id='uncommonRarityFilter' value='uncommon'/>
                                <label htmlFor='uncommonRarityFilter'>
                                    Uncommon
                                </label>
                            </div>
                            <div className="rarityFilter">
                                <input type='checkbox' onChange={(e) => handleRarityFormItems(e.target)} name='rarityFilter' id='allRarityFilter' value='all'/>
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
                        {/*<button style={{marginTop: 70}} onClick={handleResetForm}>RESET</button>*/}
                        <button style={{marginTop: 70}} type='submit' value='submit'>SUBMIT FILTERS</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StateMutator;
