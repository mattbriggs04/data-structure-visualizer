import './App.css';
import { useState, useEffect } from 'react';
import Menu from './comp/Menu';
import Visualizer from './comp/Visualizer';
import Description from './comp/Description';
import ControlPanel from './comp/ControlPanel';
import StructureModal from './comp/StructureModal';
import { DataType, StructureType } from './types/types';
import { BST, AVL, Heap } from './data_structures/tree';
import { Stack } from './data_structures/stack';
import { Graph } from './data_structures/graph';

function App() {
  const [structure, setStructure] = useState<StructureType>('');
  const [theme, setTheme] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); // default is system theme
  const [isStructureModalOpen, setIsStructureModalOpen] = useState(false);

  const [data, setData] = useState<DataType>({
    'linkedlist': [],
    'bst': new BST(),
    'stack': new Stack(),
    'avl': new AVL(),
    'minheap': new Heap("min"),
    'maxheap': new Heap("max"),
    'graph': new Graph(),
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app-shell">
      {isStructureModalOpen && (
        <StructureModal
          onClose={() => setIsStructureModalOpen(false)}
          setStructure={setStructure}
        />
      )}
      <div className="app-wrapper">
        <Menu
          structure={structure}
          theme={theme}
          setTheme={setTheme}
          onOpenStructureModal={() => setIsStructureModalOpen(true)}
        />
        {structure !== '' && (
          <ControlPanel structure={structure} data={data} setData={setData} />
        )}
        <main className="app-content">
          <Visualizer
            structure={structure}
            data={data}
            onOpenStructureModal={() => setIsStructureModalOpen(true)}
          />
          {structure !== '' && <Description structure={structure} />}
        </main>
      </div>
    </div>
  )
}

export default App;
