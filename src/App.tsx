import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import { getGutendex } from './api';
import { resetBooks, setBooksy } from './redux/reducers/books';

import Home from './screens/home/Home';
import Book from './screens/book/Book';
import Error from './screens/error/Error';
import Favourites from './screens/fav/Favourites';
import Navbar from './components/nav/Navbar';
import Store from './screens/store/Store';


function App() {
  const [error, setError] = React.useState("");

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetBooks());

    getGutendex().then(data => {
      dispatch(setBooksy(data));
      setError("");
    }).catch(err => {
      console.log(err)
      setError("Something went wrong!");
    })
  } , []);

  return (
    <>
    <Navbar />
    <Routes>
      {error? <Route index element={<Error message={error} />} />
      : <>
          <Route index element={<Home />} />
          <Route path="book/:id" element={<Book />} />
          <Route path="books" element={<Store />} />
          <Route path="shelves/:shelfName" element={<Store />} />
          <Route path="fav" element={<Favourites />} />
        </>
      }
    </Routes>
    </>
  );
}

export default App;
