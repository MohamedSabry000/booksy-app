import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IBook } from '../../@types/gutendex';
import Card from '../../components/card/Card';
import { addResults } from '../../redux/reducers/books';

const Store: React.FC = () => {

  const [books, setBooks] = React.useState<IBook[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const {shelfName} = useParams();

  const {allResults, allCategories} = useSelector((state: any) => state.books);

  const refBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if(shelfName) {
      const sh = shelfName.split('-').join(' ');
      const shelf = allCategories.find((category: {name: string, books: Array<IBook>}) => category.name === sh);
      setBooks(shelf ? shelf.books : []);
      refBtn.current && (shelf.books.length > page * 12 ? refBtn.current.disabled = false : refBtn.current.disabled = true);
    } else {
      setBooks(allResults);
      refBtn.current && (allResults.length > page * 12 ? refBtn.current.disabled = false : refBtn.current.disabled = true);
    }
  } , [allResults]);

  const handleLoadMore = () => {
    if(books.length > (page+1) * 12) {
      setPage(page + 1);
    } else {
      !shelfName &&  dispatch()
  }

  return (
    <>
    <div className="flex justify-center items-center mt-4">
      <div className="container mx-auto">
        <div className="flex flex-row justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-8">
          <div className="flex flex-col flex-1">
            <h1 className="text-left text-2xl font-bold mt-4">
              {shelfName || "Store"}
            </h1>
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-center items-center mt-4">
      <div className="container mx-auto">
        <div className="flex flex-row justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {books.slice(0, page * 12).map((book: IBook) => <Card book={book} key={book.id} />)}
        </div>
        <div className="flex flex-row justify-center mt-4 mb-4">
          <button className="mb-4 bg-gray-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full" ref={refBtn} onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Store;
