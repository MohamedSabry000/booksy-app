import React from "react";
import { Link } from "react-router-dom";
import BannerBookImage from '../../assets/banner.png'

const Banner: React.FC = () => {
  return (
    <div className="flex flex-row items-left justify-start border-2 border-gray-200 rounded-lg p-4 text-center h-60 bg-pink-100">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Welcome to the Bookshelf</h1>
        <p className="py-4">
          This is a simple app to help you keep track of your favourite books.
        </p>
        <Link className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full" to={"/books"}>
          Get Started
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        <img
          className="h-full"
          src={BannerBookImage}
          alt="Workflow"
        />
      </div>
    </div>
  );
};

export default Banner;
