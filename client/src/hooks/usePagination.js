import { useState, useEffect } from 'react';

// 3 args:
//0: array of data items to be sliced and displayed
//1: the number of items per page
//2: The current selected page

// 2 values returned:
// pagesArray: an array to be mapped into numbered pages
// current items: the current items for the selected page

const usePagination = (array, itemsPerPage, currentPage) => {
  const [numOfPages, setNumOfPages] = useState(null);
  const [pagesArray, setPagesArray] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [numOfItems, setNumOfItems] = useState(null);

  useEffect(() => {
    setNumOfItems(array.length);
  }, [array]);

  useEffect(() => {
    setNumOfPages(Math.ceil(numOfItems / itemsPerPage));
  }, [numOfItems]);

  useEffect(() => {
    // array will be used to create numbered page buttons.
    const arr = [];
    for (let i = 0; i < numOfPages; i++) {
      arr.push(i);
    }
    setPagesArray(arr);
  }, [numOfPages]);

  useEffect(() => {
    const endIndex = currentPage * itemsPerPage;
    const startIndex = endIndex - itemsPerPage;
    setCurrentItems(() => {
      return array.slice(startIndex, endIndex);
    });
  }, [currentPage, array]);

  return { currentItems, pagesArray };
};

export default usePagination;
