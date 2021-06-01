import React from 'react';
import { useRecord } from '../hooks/hooks';

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
