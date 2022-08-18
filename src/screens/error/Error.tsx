import React from 'react'

const Error = ({message}: {message: string}) => {
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="container mx-auto">
        <div className="flex flex-row justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-8">
          <div className="flex flex-col flex-1">
            <h1 className="text-left text-2xl font-bold mt-4">
              {message || "Something went wrong"}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error;
