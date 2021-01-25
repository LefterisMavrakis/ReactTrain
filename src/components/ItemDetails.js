import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

function ItemDetails({match}) {
    const [item, setItem] = useState({})

    const fetchItem = async () => {
        const response = await axios.get(`https://fortnite-api.theapinetwork.com/item/get?id=${match.params.id}`)
        const result = await response.data.data
        setItem(result)
    }

    useEffect(() => {
        fetchItem()
    }, [])

    return (
        <div>
            <h1>Item Details</h1>
            {item && item.item ?
                <div>
                    <h3>{item.item.name}</h3>
                    <div className="itemImage">
                        <img src={item.item.images.icon} alt="Item Image"/>
                    </div>
                </div>
                : 'could fetch item details'}
        </div>
    );
}

export default ItemDetails;
