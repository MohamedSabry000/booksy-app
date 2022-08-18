import React from 'react'
import { useSelector } from 'react-redux';
import { IBook } from '../../@types/gutendex';
import Card from '../../components/card/Card';
import PageTitle from '../../components/page-title/PageTitle';

const Favoutites: React.FC = () => {

  const {favourites} = useSelector((state: any) => state.books);

  return (
    <>
      <PageTitle title={'Favourites'} />
      <div className="flex justify-center items-center mt-4">
        <div className="container mx-auto">
          <div className="flex flex-row justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {favourites.map((book: IBook) => <Card book={book} key={book.id} />)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Favoutites;