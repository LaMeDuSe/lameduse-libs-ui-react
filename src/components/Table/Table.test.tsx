import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import Table from "./Table";
import '@testing-library/jest-dom';



describe("Table", () => {
  test("display of the buttons and the search bar", () => {
    render(<Table
      buttons={[
          {
            label: "Modify",
            type: "primary",
            style: "solid" ,
            form: "rounded",
            size: "small",
            },
            {
            label: "Send",
            type: "primary",
            style: "solid" ,
            form: "rounded",
            size: "small",
            },
      ]} />);
  });
  test("call of the search function by pressing on the magnifying glass button", () => {
    const Search = jest.fn();
    render(<Table onSearch={Search}/>)
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, {target: {value: 'test'}});
    fireEvent.click(screen.getByRole('button'));
    expect(Search).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('test');
    expect(Search).toHaveBeenCalledWith('test');
  })
  test("call of the search function by pressing on Enter", () =>{
    const Search=jest.fn();
    const { container } = render(<Table onSearch={Search}/>)
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, {target: {value: 'test'}});
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', keyCode: 13 });
    const form = container.querySelector('form');
    fireEvent.submit(form!);
    expect(Search).toHaveBeenCalledWith('test');
    expect(Search).toHaveBeenCalledTimes(1);
  })


});

