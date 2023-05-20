import React from 'react';

function Loading(props) {
  return (
    <div className="z-50 top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-70 dark:bg-gray-800">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-8 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
