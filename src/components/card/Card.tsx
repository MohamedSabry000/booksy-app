import { Link } from "react-router-dom";
import { IBook } from "../../@types/gutendex";

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

export default Card;