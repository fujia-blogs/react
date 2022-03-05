import { useEffect, useLayoutEffect } from 'react';

import './App.css';
import Counter from './components/Counter';

function App() {
  useLayoutEffect(() => {
    const greenSquare = document.querySelector('.square');
    greenSquare.style.transform = 'translate(-50%, -50%)';
    greenSquare.style.left = '50%';
    greenSquare.style.top = '50%';
  });

  return (
    <div className="App">
      <div className="square" />
      <Counter />
    </div>
  );
}

export default App;
