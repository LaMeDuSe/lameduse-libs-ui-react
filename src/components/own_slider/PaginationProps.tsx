import React from 'react'
import {PaginationProps} from './PaginationProps'

//div style permet d'afficher les boutons

export function Pagination({total, activeIndex, onSelect}: PaginationProps) {
    return (
        <div style={{display: 'flex', gap: '0.5rem', justifyContent: 'center'}}> 
            {Array.from({length: total}).map((_,i) => (
            <button
                key={i}
                onClick={() => onSelect(i)}
                style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: i=== activeIndex ? 'black' : 'lightgray',
                    cursor: 'pointer'
                }}
                    aria-label={'Aller à la slide ${i+1}'}
                    />
            ))}

        </div>
    );
}