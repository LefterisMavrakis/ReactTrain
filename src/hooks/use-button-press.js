import {useState} from 'react'

export default function useButtonPress(props) {
    const [buttonPress, setButtonPress] = useState('released')

    const handleMouseDown = () => {
        setButtonPress('pressed')
    }
    const handleMouseUp = () => {
        setButtonPress('released')
    }

    return {buttonPress, handleMouseDown, handleMouseUp}
}
