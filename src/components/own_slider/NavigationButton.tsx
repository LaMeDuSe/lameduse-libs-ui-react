import React from 'react';
import {NavigationButtonsProps} from './NavigationButton.ts'

export function NavigationButtons({ onPrev, onNext }: NavigationButtonsProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
      <button onClick={onPrev} style={buttonStyle}>
        Précédent
      </button>
      <button onClick={onNext} style={buttonStyle}>
        Suivant 
      </button>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  backgroundColor: '#333',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  position: 'absolute'
};
