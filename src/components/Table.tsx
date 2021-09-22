import React, { useContext, useLayoutEffect, createRef } from 'react'
import AppContext from '../AppContext'

const Table: React.FC = () => {
    const { data } = useContext(AppContext)
    const tableHeaderRef = createRef<HTMLTableSectionElement>()
    const tableRef = createRef<HTMLTableElement>()


    useLayoutEffect(() => {
        let transformHeader: NodeJS.Timeout

        const scrollHandler = (): void => {
            if (tableRef.current && tableHeaderRef.current) {
                const tableTopPosition: number = tableRef.current.offsetTop
                const scrollTop: number = window.pageYOffset
                const tableHeight: number = tableRef.current.clientHeight
                const headerHeight: number = tableHeaderRef.current.clientHeight
                const headeStyle: CSSStyleDeclaration = tableHeaderRef.current.style
                if (scrollTop > tableTopPosition + 20 && scrollTop < tableTopPosition + (tableHeight - headerHeight)) {
                    headeStyle.transition = 'none'
                    headeStyle.opacity = '0'
                    headeStyle.transform = `translateY(${scrollTop - (tableTopPosition + 1)}px)`
                    transformHeader = setTimeout(() => {
                        clearTimeout(transformHeader)
                        headeStyle.transition = 'opacity .5s ease-in'
                        headeStyle.opacity = '1'
                    }, 500)
                } else {
                    headeStyle.transform = `translateY(0px)`
                }
            }
        }
        if (data.length > 0) window.addEventListener('scroll', scrollHandler)
        return () => { if (data.length > 0) window.removeEventListener('scroll', scrollHandler) }
    }, [tableHeaderRef])


    if (data.length === 0) {
        return <p>Enter request adress</p>
    }

    return (
        <div className='table-wrapper'>
            <table ref={tableRef}>
                <thead className="table-header" ref={tableHeaderRef}>
                    <tr className='title-row'>
                        {Object.keys(data[0]).map((key: string, index: number) => <th key={index}><strong>{key}</strong></th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((objectData: any, index: number) => {
                        return (
                            <tr key={index} className='data-row' style={{ backgroundColor: index % 2 !== 0 ? "#e8e8e8" : '#fff' }}>
                                {Object.keys(objectData).map((key: string) => <td key={`${key}${index}`}>{objectData[key]}</td>)}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table