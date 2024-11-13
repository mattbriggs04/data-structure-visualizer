import './App.css'
import { useState } from 'react';
import Menu from './comp/Menu'
import Visualizer from './comp/Visualizer';

function App() {
  const [structure, setStructure] = useState('');
  let data = {
    "linkedlist": [1, 2, 4]
  }
  return (
    <div className={`app-wrapper`}>
      <div className={`flex-container`}>
        <Menu structure={structure} setStructure={setStructure} />
        <Visualizer structure={structure} data={data} />
      </div>
    </div>
  )
}

export default App;
