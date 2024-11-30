import './App.css'
import { useState } from 'react';
import Menu from './comp/Menu'
import Visualizer from './comp/Visualizer';
import CodeBlock from './comp/CodeBlock';
import { DataType } from './types/types';
import { BST } from './data_structures/tree';


function App() {
  const [structure, setStructure] = useState('');
  const [codeLang, setCodeLang] = useState('C');

  const [data, setData] = useState<DataType>({
    'linkedlist': [],
    'bst': new BST()
  });
  const code = `hello`;
  return (
    <div className={`app-wrapper`}>
      <div className={`flex-container`}>
        <Menu structure={structure} setStructure={setStructure} data={data} setData={setData} />
        <Visualizer structure={structure} data={data} />
      </div>
      <CodeBlock structure={structure} language={codeLang} code={code} />
    </div>
  )
}

export default App;
