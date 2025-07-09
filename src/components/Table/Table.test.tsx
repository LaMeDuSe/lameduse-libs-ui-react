import React from "react";
import Button from '../Button/Button'
import { ButtonProps } from '../Button/Button'
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import Table from "./Table";
import '@testing-library/jest-dom';
import { ColumnDef } from "@tanstack/react-table";


type Personne = { nom: string, prenom: string, age: number };

type Icon= string;

type Line = {
  btn: ButtonProps;
  prsn: Personne;
  icon: Icon;
};

const data: Line[] = [
  { btn: {
  label: "Modify",
  type: "primary",
  style: "solid" ,
  form: "rounded",
  size: "small",
  },
  prsn: {nom: "Had", prenom: "Sara", age:22 },
  icon: 'https://assets.lameduse.net/logo/lameduse_logo_grad.webp',
  },
  {
  btn: {
  label: "Send",
  type: "primary",
  style: "solid" ,
  form: "rounded",
  size: "small",
  },
  prsn: {nom: "Williams", prenom: "Lili", age: 25 },
  icon: 'https://assets.lameduse.net/logo/lameduse_logo_grad.webp',
  },
  {
  btn: {
  label: "Delete",
  type: "primary",
  style: "solid" ,
  form: "rounded",
  size: "small",
  },
  prsn: {nom: "Kane", prenom: "Diane", age: 32 },
  icon: 'https://assets.lameduse.net/logo/lameduse_logo_grad.webp'
},
]

const columns = [
  {
    header: () => "Action",
    id: 'btn1',
    cell: ({ row }) => {
    return <span>{row.original.btn.label}</span>;}
  } as ColumnDef<Line>,
  {
    header: "Button",
    id: 'btn2',
    cell: ({ row }) => <Button {...row.original.btn} />,
  } as ColumnDef<Line>,
  {
    header: "Name",
    id: 'prsn1',
    cell: ({ row }) => {
      return <span>{row.original.prsn.nom}</span>;}
  } as ColumnDef<Line>,
    {
    header: "First Name",
    id: 'prsn2',
    cell: ({ row }) => {
      return <span>{row.original.prsn.prenom}</span>;}
  } as ColumnDef<Line>,
      {
    header: "Age",
    id: 'prsn',
    cell: ({ row }) => {
      return <span>{row.original.prsn.age}</span>;}
  } as ColumnDef<Line>,
    {
    header: "Icon",
    id: 'icon',
    cell: ({ row }) => {
      return <img src= { row.original.icon } width='24px' height='24px'/>;}
  } as ColumnDef<Line>,
];


describe("Table", () => {
  test("display of the buttons and the search bar", () => {
    render(<Table
      data={ data }
      columns= { columns } />);
  });
  test("call of the search function by pressing on the magnifying glass button", async() => {
    const Search = jest.fn();
    render(<Table data={ data } columns={ columns } onSearch={Search}/>)
    const input = screen.getByPlaceholderText("Search...");
    await userEvent.type(input, 'test');
    fireEvent.click(screen.getByRole('button', {name: "Recherche" }));
    expect(Search).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('test');
    expect(Search).toHaveBeenCalledWith('test');
  })
  test("call of the search function by pressing on Enter", async() =>{
    const Search=jest.fn();
    const { container } = render(<Table data={ data } columns={ columns } onSearch={Search}/>)
    const input = screen.getByPlaceholderText("Search...");
    await userEvent.type(input, 'test');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', keyCode: 13 });
    const form = container.querySelector('form');
    fireEvent.submit(form!);
    expect(Search).toHaveBeenCalledWith('test');
    expect(input).toHaveValue('test');
    expect(Search).toHaveBeenCalledTimes(1);
  })
    test("search function not called by pressing on Enter when the search bar is empty", () =>{
    const Search=jest.fn();
    const { container } = render(<Table data={ data } columns={ columns } onSearch={Search}/>)
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    const value = input.value;
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', keyCode: 13 });
    const form = container.querySelector('form');
    fireEvent.submit(form!);
    expect(input.value).toBe("");
    expect(Search).toHaveBeenCalledTimes(0);
  })
    test("search function not called by pressing on the magnifying glass button when the search bar is empty", () => {
    const Search = jest.fn();
    render(<Table data={ data } columns={ columns } onSearch={Search}/>)
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;
    const value = input.value;
    fireEvent.click(screen.getByRole('button', {name: "Recherche" }));
    expect(input.value).toBe("");
    expect(Search).toHaveBeenCalledTimes(0);
  })
    test("delete characters from the search bar", async() => {
    const Search = jest.fn();
    render(<Table data={ data } columns={ columns } onSearch={Search}/>)
    const input = screen.getByPlaceholderText("Search...");
    await userEvent.type(input, 'test');
    await userEvent.type(input, '{backspace}');
    expect(input).toHaveValue('tes');
  })
});

