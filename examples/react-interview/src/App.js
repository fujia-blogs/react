// import { useEffect, useLayoutEffect } from 'react';
import { createRef } from 'react';

// import './App.css';
// import Counter from './components/Counter';
// import SetStateDemo from './components/setStateDemo';
import { FancyInput } from './components/FancyInput';

function App() {
  // useLayoutEffect(() => {
  //   const greenSquare = document.querySelector('.square');
  //   greenSquare.style.transform = 'translate(-50%, -50%)';
  //   greenSquare.style.left = '50%';
  //   greenSquare.style.top = '50%';
  // });
  const inputRef = createRef();
  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      {/* <div className="square" /> */}
      {/* <Counter /> */}
      {/* <SetStateDemo /> */}
      <FancyInput ref={inputRef} />

      <button onClick={handleFocusInput}>click me</button>
    </div>
  );
}

export default App;
