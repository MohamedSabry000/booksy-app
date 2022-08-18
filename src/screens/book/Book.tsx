import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IBook } from '../../@types/gutendex';


const Book: React.FC = () => {

  const {id} = useParams();
  const book = useSelector((state: any) => state.books.results.find((book: IBook) => String(book.id) === id));
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="container mx-auto">
        <div className="flex flex-row justify-center">
          <div className="flex flex-col flex-1">
            <h1 className="text-left text-2xl font-bold mt-4">
              {book.title}
            </h1>
            <h2 className="text-left text-xl font-bold mt-4">
              <strong className="font-bold">Author:</strong> {book.authors.reduce((acc:string, author:{name:string}) => acc + author.name + ', ', '').slice(0, -2)}
            </h2>

          </div>
        <img src={book.formats['image/jpeg']} alt="Sunset in the mountains" className=' flex-1' style={{objectFit: "cover", borderRadius: "5px 5px 0px 0px"}} />
        </div>
      </div>
    </div>
  )
}

export default Book;