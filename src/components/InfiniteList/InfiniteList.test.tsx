import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { InfiniteList } from ".";
import mockedList from "../../utils/mockedList.json";

describe("Testing the hook", () => {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  it("Should load 10 itens when receive a big list", () => {
    render(<InfiniteList listItems={mockedList} />);
    const totalValue = screen.getByTestId(/total/i);
    expect(totalValue).toBeInTheDocument();
  });

  it("Should load 10 itens", async () => {
    act(() => {
      render(<InfiniteList listItems={mockedList} />);
    });
    expect(screen.getByText(/lista: 10/i)).toBeInTheDocument();
  });

  it("Should load more 10 itens and return 20", async () => {
    const incrementButton = jest.fn();
    act(() => {
      render(<InfiniteList listItems={mockedList} />);
    });
    fireEvent.click(screen.getByRole("button", { name: "Load" }));
    await waitFor(() =>  screen.findByText(/loading.../i) , {timeout: 1000})
    await waitFor(() =>  screen.findByText(/lista: 20/i) , {timeout: 3000})
  });
});
