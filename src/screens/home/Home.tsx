import React from 'react'
import { useSelector } from 'react-redux';
import { IBook } from '../../@types/gutendex';
import Banner from '../../components/banner/Banner';
import Shelf from '../../components/shelf/Shelf';

const Home: React.FC = () => {
  const {allCategories} = useSelector((state: any) => state.books);

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="container mx-auto">
      {/* Create banner */}
      <Banner />
      <div>
        <h3 className="text-left text-2xl font-bold mt-4">
          Shelves and Books:
        </h3>
      </div>
      {
        allCategories.map(({name, books}: {name: string, books: Array<IBook>}) =>
          books.length > 4 && <Shelf name={name} key={name} />
        )
      }
      <h1>Home</h1>
      </div>
    </div>
  )
}

export default Home;
