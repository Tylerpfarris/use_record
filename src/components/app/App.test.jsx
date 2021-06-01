/**
 * @jest-environment jsdom
 */

import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  it('allows users to select a color from an input color picker, as well as undo/redo by intervals of one and ten, and pick a random color.', () => {
    render(<App />);

    const undo10El = screen.getByTestId('undo10-button');
    expect(undo10El).toHaveTextContent('undo10');
    const undoEl = screen.getByTestId('undo-button');
    expect(undoEl).toHaveTextContent('undo');
    const redo10El = screen.getByTestId('redo10-button');
    expect(redo10El).toHaveTextContent('redo10');
    const redoEl = screen.getByTestId('redo-button');
    expect(redoEl).toHaveTextContent('redo');
    const displayEl = screen.getByTestId('display-div');
    expect(displayEl).toHaveStyle({
      backgroundColor: 'current[index]',
      width: '10rem',
      height: '10rem',
    });
    const colorSelectorEl = screen.getByTestId('color-selector');
    expect(colorSelectorEl).toHaveAttribute('type', 'color');

    fireEvent.input(colorSelectorEl, { target: { value: '#333333' } });
    expect(colorSelectorEl).toHaveValue('#333333');

    fireEvent.input(colorSelectorEl, { target: { value: '#ff3333' } });
    expect(colorSelectorEl).toHaveValue('#ff3333');

    userEvent.click(undoEl);
    expect(colorSelectorEl).toHaveValue('#333333');

    userEvent.click(redoEl);
     expect(colorSelectorEl).toHaveValue('#ff3333');
     
     //testing undo by ten
     fireEvent.input(colorSelectorEl, { target: { value: '#aa0029' } });
     fireEvent.input(colorSelectorEl, { target: { value: '#af3333' } });
     fireEvent.input(colorSelectorEl, { target: { value: '#f73833' } });
     fireEvent.input(colorSelectorEl, { target: { value: '#f90333' } });
     fireEvent.input(colorSelectorEl, { target: { value: '#fb3533' } });//TODO ff3333 duplicate values on firEvent breaking test
     fireEvent.input(colorSelectorEl, { target: { value: '#fb3983' } });
     fireEvent.input(colorSelectorEl, { target: { value: '#f78333' } });
     fireEvent.input(colorSelectorEl, { target: { value: '#df3213' } });
     fireEvent.input(colorSelectorEl, { target: { value: '#f78333' } });
     fireEvent.input(colorSelectorEl, { target: { value: '#ff3353' } });
     fireEvent.input(colorSelectorEl, { target: { value: '#ff3234' } });

     expect(colorSelectorEl).toHaveValue('#ff3234');
     userEvent.click(undo10El);
    expect(colorSelectorEl).toHaveValue('#aa0029');

     userEvent.click(redo10El);
     expect(colorSelectorEl).toHaveValue('#ff3234')

    
  });
});
