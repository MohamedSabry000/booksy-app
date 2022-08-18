import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IBook } from '../../@types/gutendex';
import { getBook } from '../../api';


const Book: React.FC = () => {
  const [book, setBook] = React.useState<IBook>();
  const {id} = useParams();
  const navigate = useNavigate();
  const bookDetails = useSelector((state: any) => state.books.results.find((book: IBook) => String(book.id) === id));

  useEffect(() => {
      setBook(bookDetails);

      if (!bookDetails) {
        id && getBook(id).then((data: IBook) => {
          setBook(data);
        }).catch(err => {
          navigate('/')
        })
      }
  } , [id]);

  return (
    book ?
    <div className="flex justify-center items-center mt-4">
      <div className="container mx-auto">
        <div className="flex flex-row justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-8">
          <div className="flex flex-col flex-1">
            <h1 className="text-left text-2xl font-bold mt-4">
              {book.title}
            </h1>
            <table className="table-auto w-full text-left">
              <tbody>
                <tr>
                  <td className="px-4 py-2">Author</td>
                  <td className="px-4 py-2">
                    {book.authors.map(
                      (author: {name: string, birth_year: number, death_year: number}) => (
                        <div key={author.name}>
                          {author.name}, {author.birth_year} - {author.death_year}
                        </div>
                      ))}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Subjects</td>
                  <td className="px-4 py-2">
                    {book.subjects?.map(
                      (subject: string) => (
                        <div key={subject}>
                          {subject}
                        </div>
                      ))

                    }
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Book Shelves</td>
                  <td className="px-4 py-2">
                    {book.bookshelves.map(
                      (shelf: string) => (
                        <div key={shelf}>
                          {shelf}
                        </div>
                      ))}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Languages</td>
                  <td className="px-4 py-2">
                    {book.languages.map(
                      (lang: string) => (
                        <div key={lang}>
                          {lang}
                        </div>
                      ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col flex-1">
            <img src={book.formats['image/jpeg']} alt="Sunset in the mountains" className=' flex-1' style={{maxWidth: "fit-content", alignSelf: "center", borderRadius: "5px 5px 0px 0px"}} />
          </div>
        </div>
      </div>
    </div>
    : <div>Loading...</div>
  )
}

export default Book;