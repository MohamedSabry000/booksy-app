import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IBook } from '../../@types/gutendex';
import Card from '../../components/card/Card';
import PageTitle from '../../components/page-title/PageTitle';

const Search: React.FC = () => {

  const [books, setBooks] = React.useState<IBook[]>([]);
  const {query} = useParams();
  const {allResults} = useSelector((state: any) => state.books);

  useEffect(() => {
    setBooks([]);
    allResults.map((book: IBook) => {
      if(book.title.toLocaleLowerCase().includes((query+"").toLocaleLowerCase())) {
        setBooks(prev => [...prev, book]);
      }
    })
    console.log(query)
  } , [allResults, query]);

  return (
    <>
      <PageTitle title={'Search Results'} />
      <div className="flex justify-center items-center mt-4">
        <div className="container mx-auto">
          <div className="flex flex-row justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {books.map((book: IBook) => <Card book={book} key={book.id} />)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Search;