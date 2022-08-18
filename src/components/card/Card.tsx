import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IBook } from "../../@types/gutendex";
import { toggleFavourite } from '../../redux/reducers/books'

const Card = ({book}: {book: IBook}) => {

  const { favourites } = useSelector((state: any) => state.books);
  const dispatch =useDispatch();

  const handleClick = () => {
      dispatch(toggleFavourite(book));
  }

  return (
    <div className="relative">
    <Link to={`/book/${book.id}`}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg h-full relative" style={{border: "1px solid #CCC"}}>
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
    {/* favourite button */}
    <div className="px-6 pt-4 pb-2">
        {
          favourites.includes(book) ?
            <button className="bg-slate-300 hover:bg-slate-700 text-white font-bold py-2 px-2 rounded-full absolute bottom-2 right-2" onClick={handleClick}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{color: "#ec4899"}}>
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
          :
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full absolute bottom-2 right-2" onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
            </button>
        }
      </div>
    </div>
  );
}

export default Card;