import './App.css';
import { useState, useEffect } from 'react';
import Menu from './comp/Menu';
import Visualizer from './comp/Visualizer';
import Description from './comp/Description';
import { DataType } from './types/types';
import { BST, AVL, Heap } from './data_structures/tree';
import { Stack } from './data_structures/stack';

function App() {
  const [structure, setStructure] = useState('');
  const [theme, setTheme] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); // default is system theme

  const [data, setData] = useState<DataType<number>>({
    'linkedlist': [],
    'bst': new BST(),
    'stack': new Stack(),
    'avl': new AVL(),
    'minheap': new Heap("min"),
    'maxheap': new Heap("max")
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    console.log("theme updated");
  }, [theme]);

  return (
    <div className={`app-wrapper`}>
      <div className={`flex-container`}>
        <Menu structure={structure} theme={theme} setTheme={setTheme} setStructure={setStructure} data={data} setData={setData} />
        <Visualizer structure={structure} data={data} />
        <Description structure={structure} />
      </div>
    </div>
  )
}

export default App;
