import React, { useState } from 'react';
import { useInterval } from '../hooks/hooks';

const useRecord = (initial) => {
  const [current, setCurrent] = useState([initial]);
  const [index, setIndex] = useState(0);
  const [disco, setDisco] = useState(false);

  const record = (hexColor) => {
    setCurrent((prevState) => [...prevState, hexColor]);
    setIndex(current.length);
  };

  const undo = () => {
    if (index > 0) setIndex((prevIndex) => prevIndex - 1);
    else record('#000000');
  };
  const undo10 = () => {
    if (index > 0) setIndex((prevIndex) => prevIndex - 10);
    else record('#000000');
  };
  const redo = () => {
    if (index < current.length - 1) setIndex((prevIndex) => prevIndex + 1);
    else record('#000000');
  };
  const redo10 = () => {
    if (index < current.length - 1) setIndex((prevIndex) => prevIndex + 10);
    else record('#000000');
  };

  const randomColor = () => {
    let hexColor = '#';
    for (let i = 0; i < 6; i++) {
      const random = Math.random();
      const bit = (random * 16) | 0;
      hexColor += bit.toString(16);
    }
    record(hexColor);
  };

  const handleDisco = () => {
    if (!disco) setDisco(true);
    else setDisco(false);
  };

  useInterval(() => {
    if (disco) { 
      let randomDisco = randomColor();
      record(randomDisco)
  }
  }, 300) 


  return {
    index,
    current,
    record,
    undo,
    undo10,
    redo,
    redo10,
    randomColor,
    handleDisco,
    disco
  };
};

function App() {
  const {
    current,
    index,
    undo,
    redo,
    undo10,
    redo10,
    randomColor,
    record,
    handleDisco,
    disco
  } = useRecord('#FF0101');

  return (
    <>
      <button data-testid="undo10-button" onClick={undo10}>
        undo10
      </button>
      <br />
      <button data-testid="undo-button" onClick={undo}>
        undo
      </button>
      <br />
      <button data-testid="random-button" onClick={randomColor}>
        random color
      </button>
      <br />
      {!disco ? (
        <button data-testid="disco-button" onClick={handleDisco}>
          Disco 
        </button>
      ) : (
        <button data-testid="disco-button" onClick={handleDisco}>
          No Disco
        </button>
      )}
      <br />
      <button data-testid="redo-button" onClick={redo}>
        redo
      </button>
      <br />
      <button data-testid="redo10-button" onClick={redo10}>
        redo10
      </button>
      <br />
      <input
        data-testid="color-selector"
        type="color"
        value={current[index]}
        onChange={({ target }) => record(target.value)}
      />
      <div
        data-testid="display-div"
        style={{
          backgroundColor: current[index],
          width: '10rem',
          height: '10rem',
          borderRadius: '100px',
        }}
      ></div>
    </>
  );
}

export default App;
