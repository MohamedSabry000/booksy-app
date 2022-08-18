import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IBook } from '../../@types/gutendex';
import { getBooksPage } from '../../api';
import Card from '../../components/card/Card';
import PageTitle from '../../components/page-title/PageTitle';
import { addResults } from '../../redux/reducers/books';

const Store: React.FC = () => {

  const [books, setBooks] = React.useState<IBook[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const {shelfName} = useParams();

  const {allResults, allCategories, apiPage} = useSelector((state: any) => state.books);

  const refBtn = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if(shelfName) {
      const sh = shelfName.split('-').join(' ');
      const shelf = allCategories.find((category: {name: string, books: Array<IBook>}) => category.name === sh);
      setBooks(shelf ? shelf.books : []);
      refBtn.current && (shelf.books.length > page * 12 ? refBtn.current.disabled = false : refBtn.current.disabled = true);
    } else {
      console.log(allResults);
      setBooks(allResults);
      refBtn.current && (allResults.length > page * 12 ? refBtn.current.disabled = false : refBtn.current.disabled = true);
    }
  } , [allResults]);

  const handleLoadMore = () => {
    if(books.length > (page) * 12) {
      setPage(page + 1);
    } else {
      console.log("API page: ", apiPage);
      !shelfName && getBooksPage(apiPage).then((res: any) => {
        dispatch(addResults(res));
        setPage(page + 1);
      }).catch((err: any) => {
        console.log(err);
      })
    }
  }

  return (
    <>
      <PageTitle title={shelfName ? shelfName : 'All Books'} />
      <div className="flex justify-center items-center mt-4">
        <div className="container mx-auto">
          <div className="flex flex-row justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {books.slice(0, page * 12).map((book: IBook) => <Card book={book} key={book.id} />)}
          </div>
          <div className="flex flex-row justify-center mt-4 mb-4">
            {
              shelfName && books.length <= page * 12 ? null :
              <button className="mb-4 bg-gray-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full" ref={refBtn} onClick={handleLoadMore}>
                Load More
              </button>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Store;
