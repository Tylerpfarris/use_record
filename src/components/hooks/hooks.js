import  {  useEffect, useRef, useState } from 'react';
export function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if(delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function useRecord(initial) {
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