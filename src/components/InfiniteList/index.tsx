import * as React from "react";
import { useLoad } from "./useLoad";
import { canLoadMore } from "./utils/functions";

interface InfiniteListProps {
  listItems: Array<any>;
}

export function InfiniteList({ listItems = [] }: InfiniteListProps) {
  const {laoding, handleLoad, list, setList} = useLoad(listItems)
  const DEFAULT_LENGTH = 10;
  const [originalJSON] = React.useState(listItems);
  const loadingTest = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });

  const handlecanLoadMore = async () => {
    handleLoad(true);
    const orignal = originalJSON.length;
    if (canLoadMore(orignal, list.current)) {
      const newResult = originalJSON.slice(0, list.current + DEFAULT_LENGTH);
      await loadingTest.then(() => {
          handleLoad(false)
          setList({
            ...list,
            current: newResult.length,
            listItems: newResult,
          });
      });
    }
  };


  React.useEffect(() => {
    if (
      originalJSON.length &&
      canLoadMore(originalJSON.length, DEFAULT_LENGTH)
    ) {
      const newResult = originalJSON.slice(0, 10);
      setList({
        ...list,
        current: newResult.length,
        listItems: newResult,
      });
    }
  }, [originalJSON.length]);

  return (
    <div>
      {laoding ? (
        <p>loading...</p>
      ) : (
        <button onClick={handlecanLoadMore}>Load</button>
      )}
      <p data-testid="total">Lista: {list.current}</p>
      <div style={{ height: 400, overflow: "auto" }}>
        {list.listItems.map((item) => (
          <div key={item.id}>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
