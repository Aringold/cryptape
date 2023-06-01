import React from "react";

function Detail() {

  return (
    <div className="h-max relative bg-black bg-opacity-70 items-center md:px-20 px-6 py-6">
      <div className="md:flex justify-between items-center">
        <img className="rounded-2xl" src="assets/Landing/Detail/computer.png" width={500}></img>
        <div className="space-y-3">
          <p className="text-[40px] font-normal text-white">See the CKB Blockchain. Live</p>
          <p className="text-xl font-normal text-white text-justify">CKB Nervos Network is a next-generation, open-source blockchain infrastructure that provides users with a secure, decentralized platform for storing, managing, and transferring digital assets. CKB utilizes a Proof of Work consensus mechanism, which requires miners to solve complex mathematical equations in order to add new blocks to the blockchain and process transactions.

            In order to help users understand how their token transfers are processed on the CKB network, we propose CKB Street - a visualizer that allows users to see their transactions being broadcasted in real-time and monitor their status as they move through the network.

            Imagine a virtual street in a space-themed environment, where each building represents a node on the CKB network. As users make token transfer transactions, they will see a character representing themselves appear on the street and attempt to board a spaceship headed towards their intended destination. The higher the transaction fee, the faster their character will board the first available spaceship and reach their destination.

            As a transaction moves through the network, users can monitor its progress on the street and check its status at various points along the way. They can also see other transactions being processed on the same street, giving them an idea of the congestion level in the mempool and helping them understand how network fees affect transaction processing times.</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;