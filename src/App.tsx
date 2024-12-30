import './App.css'
import { useState } from 'react';
import Menu from './comp/Menu'
import Visualizer from './comp/Visualizer';
// import CodeBlock from './comp/CodeBlock';
import { DataType } from './types/types';
import { BST, AVL } from './data_structures/tree';
import { Stack } from './data_structures/stack';


function App() {
  const [structure, setStructure] = useState('');
  // const [codeLang, setCodeLang] = useState('C');

  const [data, setData] = useState<DataType<number>>({
    'linkedlist': [],
    'bst': new BST(),
    'stack': new Stack(),
    'avl': new AVL()
  });

  // const code = `#include <stdio.h>`;
  return (
    <div className={`app-wrapper`}>
      <div className={`flex-container`}>
        <Menu structure={structure} setStructure={setStructure} data={data} setData={setData} />
        <Visualizer structure={structure} data={data} />
      </div>
      {/* <CodeBlock language={codeLang} code={code} /> */}
    </div>
  )
}

export default App;
