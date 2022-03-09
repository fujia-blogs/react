import { useEffect, useLayoutEffect } from 'react';

import './App.css';
import Counter from './components/Counter';
import SetStateDemo from './components/setStateDemo';

function App() {
  // useLayoutEffect(() => {
  //   const greenSquare = document.querySelector('.square');
  //   greenSquare.style.transform = 'translate(-50%, -50%)';
  //   greenSquare.style.left = '50%';
  //   greenSquare.style.top = '50%';
  // });

  return (
    <div className="App">
      {/* <div className="square" /> */}
      {/* <Counter /> */}
      <SetStateDemo />
    </div>
  );
}

export default App;
