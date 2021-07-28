import React from "react";
import { canLoadMore } from "./utils/functions";

export function useLoad(listItems) {
  const DEFAULT_LENGTH = 10;
  const [originalJSON] = React.useState(listItems);
  const [list, setList] = React.useState({
    current: 0,
    listItems: [],
  });
  const [laoding, setLoading] = React.useState(false);

  const loadingTest = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });

  const handleLoad = (value: boolean) => setLoading(value)

  const handlecanLoadMore = async () => {
    setLoading(true);
    const orignal = originalJSON.length;
    if (canLoadMore(orignal, list.current)) {
      const newResult = originalJSON.slice(0, list.current + DEFAULT_LENGTH);
      await loadingTest.then(() => {
        setLoading(false);
        setList({
          ...list,
          current: newResult.length,
          listItems: newResult,
        });
      });
    }
  };

  return { handlecanLoadMore, laoding , handleLoad, list, setList}
}
