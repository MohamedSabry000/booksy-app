import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IBook } from '../../@types/gutendex';

const Shelf = ({name}: {name: string}) => {
  const [books, setBooks]: [IBook[], any] = React.useState([]);

  const {allCategories} = useSelector((state: any) => state.books);

  useEffect(() => {
    const sh = allCategories.find((cat: {name: string}) => cat.name === name).books;
    setBooks(getMultipleRandom(sh, 4));
  } , []);

  const getMultipleRandom = (arr:IBook[], num:number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  const Card = ({book}: {book: IBook}) => {
    return (
      <Link to={`/book/${book.id}`}>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src={book.formats['image/jpeg']} alt="Sunset in the mountains" style={{maxHeight: "250px", objectFit: "cover", borderRadius: "5px 5px 0px 0px"}} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{book.title}</div>
          </div>
          <div className="px-6 pt-4 pb-2">
            <p className="text-gray-700 text-base font-bold">{book.authors.reduce((acc, author) => acc + author.name + ', ', '').slice(0, -2)}</p>
            <p className="text-gray-700 text-base font-bold">
              Download Count is: {book.download_count}
            </p>
            </div>
        </div>
      </Link>
    );
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row justify-space-between'>
        <div className='flex flex-col flex-1'>
          <h1 className='text-left text-2xl font-bold mt-4'>
            {name}
          </h1>
        </div>
        <div className='flex flex-col flex-1 justify-right'>
          <Link className='text-left font-bold mt-4 text-right text-pink-500' to={`/shelves/${name.split(' ').join('-')}`}>
            view All
          </Link>
        </div>
      </div>
      <div className='flex flex-row justify-space-around grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8'>
        {books.map((book: IBook) => <Card book={book} key={book.id} />)}
      </div>

    </div>
  )
}

export default Shelf;
