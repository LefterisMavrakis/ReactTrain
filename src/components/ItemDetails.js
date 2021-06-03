import {useState, useEffect} from 'react'
import axios from 'axios'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import useButtonPress from "../hooks/use-button-press";
import UseCart from "../hooks/use-cart";
import UseItems from "../hooks/use-items";
import UseCounter from "../hooks/use-counter";

function ItemDetails({match}) {
    const {items} = UseItems()
    const [item, setItem] = useState({})
    const {addToCart} = UseCart()
    const {buttonPress, handleMouseDown, handleMouseUp} = useButtonPress()
    const {counter, increaseCounter, decreaseCounter, resetCounter} = UseCounter()

    const fetchItem = async () => {
        const response = await axios.get(`https://fortnite-api.theapinetwork.com/item/get?id=${match.params.id}`)
        const result = await response.data.data
        setItem(result)
    }
    // fortnite api has different response for item details and item list
    const handleAddToCartDetails = (item, quantity) => {
        const itemToAdd = items.find(stateItem => stateItem.itemId === item.itemId)
        addToCart(itemToAdd, quantity)
        resetCounter()
    }

    useEffect( () => {
        fetchItem()
    },[])

    return (
        <div className={'containerWrapper'}>
            <div className="container">
                <div className="containerPage">
                    {item && item.item ?
                        <div className={'itemDetails'}>
                            <div className="itemDetailsImageWrapper">
                                <div className="itemDetailsImage" style={{
                                    backgroundImage: `url("${item.item.images.icon}")`
                                }} >
                                </div>
                            </div>
                            <div className="itemsDetailsInfoWrapper">
                                <h2>{item.item.name}</h2>
                                <div className="itemDetailsDescription">
                                    {item.item.description}
                                </div>
                                {item.item.media.length > 0 ?
                                    <div className="itemDetailsVideo">
                                        <video width="100%" height="auto" controls>
                                            <source src={item.item.media[0].src} type={item.item.media[0].type}/>
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    : 'No video provided'}
                                <div className="cartItemQuantity">
                                    Quantity:
                                    <div className={'quantityBtn'} onClick={(e)=> decreaseCounter(e)}>
                                        <FontAwesomeIcon icon={faMinus} size="sm" color={'#000000'} />
                                    </div>
                                    <div className={'cartItemQuantityValue'}>
                                        {counter}
                                    </div>
                                    <div className={'quantityBtn'} style={{position: "relative"}} onClick={(e)=> increaseCounter(e) }>
                                        <FontAwesomeIcon icon={faPlus} size="sm" color={'#000000'} />
                                    </div>
                                </div>
                                <div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className={'addToCartBtn detailsAddToCart'} onClick={(e) => handleAddToCartDetails( item, counter)}>
                                    <button className={buttonPress}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                        : 'can not fetch item details'}
                </div>
            </div>
        </div>
    );
}

export default ItemDetails;
