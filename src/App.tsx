import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import { getGutendex } from './api';
import { resetBooks, setBooksy } from './redux/reducers/books';

import Home from './screens/home/Home';
import Error from './screens/error/Error';

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
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/error" element={<Error message={error} />} />
    </Routes>
  );
}

export default App;
