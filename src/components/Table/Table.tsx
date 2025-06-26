import React, { useState } from 'react';
import Button from '../Button/Button'
import { ButtonProps } from '../Button/Button'

interface TableProps {
  buttons?: ButtonProps[],
  onSearch?: (query: string) => void,
}


function SearchBar({ onSearch }: TableProps) {
  const [query, setQuery] = useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(query);
  }};
  return (
    <form onSubmit={handleSubmit}>
      <input
      type="search"
      placeholder="Search..."
      onChange={handleInputChange}
      style={{width: '110px'}}
      />
      <button type="submit">
        🔍
      </button>
    </form>
    
  );
}


const Table = ({ buttons, onSearch }: TableProps) => {
  return (
    <div style={{textAlign: 'center'}}>
      <div style={{ border: '2px solid black', borderRadius: '2px', transform: 'translateX(-20px)'}}>
        <SearchBar onSearch={onSearch} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {buttons?.map((button, index) => (
            <tr key={index}>
              <td>
                <Button {...button} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;







/*
const Table=({ buttons, onSearch }: TableProps) => {
  <tr><th><SearchBar props.onSearch> </th></tr>
  if (props.buttons) {
    const listButton= props.buttons;
    const tableButton=listButton.map((button) =>
      <tr><Link {...button}>{button.children}</Link></tr>);
  }
  

}
*/
