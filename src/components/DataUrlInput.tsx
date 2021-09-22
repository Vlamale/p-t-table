import React, { useContext, useState } from 'react'
import AppContext from '../AppContext'

const DataUrlInput: React.FC = () => {
    const {setData} = useContext(AppContext)
    
    const [inputValue, setInputValue] = useState('')
    const getData = async () => {
        try {
            const data = await fetch(inputValue)
            const parseData: any[] = await data.json()
            setData(parseData)
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="input-form">
            <label htmlFor='inputUrl'>URL:</label>
            <input
                className="input-url"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder='dataUrl'
                id='inputUrl'
            />
            <button className="button-url" onClick={getData}>Get data</button>
        </div>
    )
}

export default DataUrlInput