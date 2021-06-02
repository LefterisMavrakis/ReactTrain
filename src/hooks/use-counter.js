import {useState} from 'react';

export default function UseCounter(props) {
    const [counter, setCounter] = useState(1)

    const increaseCounter = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let count = counter
        count++
        console.log(count)
        setCounter(count)
    }
    const decreaseCounter = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let count = counter
        count !== 1 ? count-- : count = 1
        setCounter(count)
    }


    return {counter, increaseCounter, decreaseCounter}
}
