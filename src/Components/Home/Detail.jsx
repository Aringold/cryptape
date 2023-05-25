import React from "react";

function Detail() {

  return (
    <div className="h-max relative bg-black bg-opacity-70 items-center p-6 mt-4">
      <div className="md:flex justify-between items-center">
        <img className="rounded-2xl" src="assets/Landing/Detail/computer.png" width={400}></img>
        <div className="space-y-3">
          <p className="text-[40px] font-normal text-white">See the Blockchain. Live</p>
          <p className="text-xl font-normal text-white">TxStreet is a live transaction and mempool visualizer featuring Bitcoin, Ethereum, Bitcoin Cash, Monero and Litecoin. When a new transaction is broadcasted to a cryptocurrency network, a person appears and attempts to board a bus in real time. If the transaction has a high enough fee, they will board the first bus and be ready to be included in the next mined block. </p>
        </div>
      </div>
    </div>
  );
}

export default Detail;