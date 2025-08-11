import type { Meta, StoryObj } from '@storybook/react';
import Table from './Table';
import * as React from 'react';
import Button from '../Button/Button'
import { ButtonProps } from '../Button/Button'
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
    id: 'btn',
    cell: ({ row }) => {
    return <span>{row.original.btn.label}</span>;}
  } as ColumnDef<Line>,
  {
    header: "Button",
    id: 'btn',
    cell: ({ row }) => <Button {...row.original.btn} />,
  } as ColumnDef<Line>,
  {
    header: "Name",
    id: 'prsn',
    cell: ({ row }) => {
      return <span>{row.original.prsn.nom}</span>;}
  } as ColumnDef<Line>,
    {
    header: "Name",
    id: 'prsn',
    cell: ({ row }) => {
      return <span>{row.original.prsn.nom}</span>;}
  } as ColumnDef<Line>,
    {
    header: "Name",
    id: 'prsn',
    cell: ({ row }) => {
      return <span>{row.original.prsn.nom}</span>;}
  } as ColumnDef<Line>,
    {
    header: "Name",
    id: 'prsn',
    cell: ({ row }) => {
      return <span>{row.original.prsn.nom}</span>;}
  } as ColumnDef<Line>,
    {
    header: "Name",
    id: 'prsn',
    cell: ({ row }) => {
      return <span>{row.original.prsn.nom}</span>;}
  } as ColumnDef<Line>,
    {
    header: "First Name",
    id: 'prsn',
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




const CustomTable = (props: React.ComponentProps<typeof Table<Line>>) => (
  <Table<Line> {...props} />
);




const meta: Meta<typeof CustomTable>= {
  title: 'LaMeDuSe/Components/TableComponent',
  component: Table,
  parameters: {
    layout: 'centered', 
  },
};

export default meta; 

type Story = StoryObj<typeof CustomTable>;



export const Default: Story = {
  args: {
    data,
    columns,
  },
};








