import {useState, useEffect} from 'react';
import UseItems from "../hooks/use-items";
// import UseAnotherHook from "../hooks/use-another-hook";
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter, faTimes} from "@fortawesome/free-solid-svg-icons";
import UseElementVisibility from "../hooks/use-element-visibility";



function StateMutator() {
    // const [items, setItems] = useContext(ItemContext)
    const {fetchItems, maxCost, minCost, makeFiltering} = UseItems()
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

    const {visibility, toggleVisibility} = UseElementVisibility();
    const visibilityClass = visibility === true ? 'visible' : ''
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
        if(searchName!== '' || sliderValue !== maxCost || rarityFormItems.size > 0 ) {
            fetchItems()
        }
        setSearchName('')
        setSliderValue(maxCost)
        setRarityFormItems(new Set())
        filterFormState.rarityCheck = new Set()
        filterFormState.priceRange = maxCost
        filterFormState.searchTerm = ''
        setFilterForm(filterFormState)
    }
    const handleFiltersForm = async (e=null, filterForm = null) => {
        if(e!==null){
            e.preventDefault()
        }
        await makeFiltering(filterForm)
    }
    const stickyFilters = () => {
        window.addEventListener('scroll', function() {
            console.log('scrolling')
            const actionBar = document.getElementById('actionsBarWrapper')
            if(actionBar){
                const actionBarOffset = actionBar.getBoundingClientRect()
                const windowOffset =window.pageYOffset

                if(actionBarOffset.top <= 20 && windowOffset >= 168) {
                    actionBar.classList.add('fixed')
                } else {
                    actionBar.classList.remove('fixed')
                }
            }
        })
    }
    const handleVisibility = () => {
        toggleVisibility()
    }
    useEffect(() => {
        setSliderValue(maxCost)
        setFilterForm({
            'searchTerm': searchName,
            'rarityCheck': rarityFormItems,
            'priceRange': maxCost
        })
        stickyFilters();
    }, [maxCost])


    return (
        <div className={'actionsBarWrapper ' + visibilityClass} id={'actionsBarWrapper'}>
            <div className={'actionsBar '} id={'actionBar'}>
                <div className="actionsToggle" onClick={(e) => handleVisibility()}>
                    <FontAwesomeIcon icon={faFilter} size="lg" /> Filters
                </div>
                {visibility ?   <div className="closeFilters" onClick={(e) => handleVisibility()}>
                    <FontAwesomeIcon icon={faTimes} size="md" color={'#ffffff'} />
                </div> : ''  }

                {/*<h2>Actions</h2>*/}
                {/*<div className="actionButtonsWrapper">*/}
                {/*    <button onClick={resetItems}>RESET ITEMS</button>*/}
                {/*    /!*<button onClick={resetItems2}>RESET ITEMS FROM ANOTHER HOOK</button>*!/*/}
                {/*    <button style={{marginLeft:30}} onClick={fetchItems}>REFETCH ITEMS</button>*/}
                {/*    /!*<button onClick={fetchItems2}>REFETCH ITEMS FROM ANOTHER HOOK</button>*!/*/}
                {/*</div>*/}
                <h2>Filters</h2>
                <div className="filtersWrapper">
                    <form onSubmit={(e) => handleFiltersForm(e,filterForm)} onReset={(e)=>handleResetForm(e)}>
                        <div className="searchByNameWrapper">
                            <h3>Search by name</h3>
                            <input type='text' value={searchName} onChange={ (e) => handleSearchName(e) }/>
                        </div>
                        <div className="rarityFilterWrapper">

                            <div className="formHeader">
                                <h3>Rarity</h3>
                            </div>
                            <div className="rarityFilter">
                                <input  type='checkbox' onInput={(e) => handleRarityFormItems(e.target)} name='rarityFilter' id='epicRarityFilter' value='epic'/>
                                <label className={'rarityCheckbox'} htmlFor='epicRarityFilter'>
                                    Epic
                                </label>
                            </div>
                            <div className="rarityFilter">
                                <input type='checkbox' onInput={(e) => handleRarityFormItems(e.target)} name='rarityFilter' id='rareRarityFilter' value='rare'/>
                                <label className={'rarityCheckbox'} htmlFor='rareRarityFilter'>
                                    Rare
                                </label>
                            </div>
                            <div className="rarityFilter">
                                <input type='checkbox' onInput={(e) => handleRarityFormItems(e.target)} name='rarityFilter' id='uncommonRarityFilter' value='uncommon'/>
                                <label className={'rarityCheckbox'} htmlFor='uncommonRarityFilter'>
                                    Uncommon
                                </label>
                            </div>
                            <div className="rarityFilter">
                                <input type='checkbox' onInput={(e) => handleRarityFormItems(e.target)} name='rarityFilter' id='allRarityFilter' value='all'/>
                                <label className={'rarityCheckbox'} htmlFor='allRarityFilter'>
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
                            <button style={{marginTop: 70, marginRight: 5}} type="reset">RESET</button>
                            <button style={{marginTop: 70}} type='submit' value='submit'>SUBMIT FILTERS</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default StateMutator;
