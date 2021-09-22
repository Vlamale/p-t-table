import React from 'react'

type AppContextType = {
    data: any[]
    setData: (c: any[]) => void
}

const AppContext = React.createContext<AppContextType>({
    data: [],
    setData: () => {}
})

export default AppContext