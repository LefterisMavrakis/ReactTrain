import {useState} from 'react'

export default function UseElementVisibility(props) {
    const [visibility, setVisibility] = useState(false)

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }

    return {visibility, toggleVisibility}
}
