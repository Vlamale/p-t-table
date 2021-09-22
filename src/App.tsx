import React, { useState } from 'react';
import DataUrlInput from './components/DataUrlInput';
import PageContent from './components/PageContent'
import Table from './components/Table';
import AppContext from './AppContext'

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([])

  return (
    <AppContext.Provider value={{data, setData}}>
      <div className='container'>
        <PageContent />
        <DataUrlInput />
        <Table />
        <PageContent />
      </div>
    </AppContext.Provider>
  );
}

export default App;
