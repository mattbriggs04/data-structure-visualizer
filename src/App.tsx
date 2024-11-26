import './App.css'
import { useState } from 'react';
import Menu from './comp/Menu'
import Visualizer from './comp/Visualizer';
import { DataType } from './types/types';

function App() {
  const [structure, setStructure] = useState('');
  const [data, setData] = useState<DataType>({
    'linkedlist': [0, 0]
  })

  return (
    <div className={`app-wrapper`}>
      <div className={`flex-container`}>
        <Menu structure={structure} setStructure={setStructure} data={data} setData={setData} />
        <Visualizer structure={structure} data={data} />
      </div>
    </div>
  )
}

export default App;
