import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";



//type Data= string | ButtonProps | File 

/*interface TableProps {
  data?: Data,
  columns?: Data[],
  onSearch?: (query: string) => void,
}
*/

export type TableProps<T> = {
  data?: T[];
  columns?: ColumnDef<T>[];
  onSearch?: (value: string) => void;
};


function SearchBar <T,>( props: TableProps<T>) {
  const [query, setQuery] = useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (props.onSearch && query!="") {
      props.onSearch(query);
  }};
  return (
    <div style={{ width: '100%', margin: '0 auto', border: '2px solid grey', borderRadius: '2px' }} >
    <form onSubmit={handleSubmit}>
      <input
      type="search"
      placeholder="Search..."
      onChange={handleInputChange}
      style={{width: '90%'}}
      />
      <button style={{float: 'right'}} type="submit" aria-label="Recherche">
        🔍
      </button>
    </form>
    </div>
  );
}


const Table = <T,>({ data, columns, onSearch }: TableProps<T>) => {
  if (!data || !columns) return null;
    const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
        <SearchBar onSearch={onSearch} />
      <br/>      
      <table style={{width: '100%', border: '2px solid black'}}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th style={{fontWeight: 'bold', padding: '5px'}} key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr style={{border: '1px solid black'}} key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td style={{textAlign: 'center', padding: '10px' }} key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    );
  }
export default Table;

