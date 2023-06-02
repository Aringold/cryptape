import React, { useState, useEffect } from "react";
import { FaHandPaper, FaArrowRight } from 'react-icons/fa';
import { Link } from "react-router-dom";
import Loading from "../Loading";

var myHeaders = new Headers();
myHeaders.append("Accept", "application/vnd.api+json");
myHeaders.append("User-Agent", "Apifox/1.0.0 (https://www.apifox.cn)");
myHeaders.append("Content-Type", "application/vnd.api+json");
const mySocket = new WebSocket('ws://81.0.246.174:443');

function Transaction() {
  const [lastTransactions, setLastTransactions] = useState([]);

  const getLastTransactions = async () => {
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    await fetch("https://mainnet-api.explorer.nervos.org/api/v1/transactions?page=1&page_size=20", requestOptions)
      .then(response => response.json())
      .then((result) => {
        const transactionArray = result.data.map(item => item.attributes.transaction_hash)
        setLastTransactions(transactionArray);
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    getLastTransactions();
  }, []);

  useEffect(() => {
    getLastTransactions();
  }, []);

  useEffect(() => {
    initWebSocket();
    return () => {
      mySocket.close()
    };
  }, []);

  function initWebSocket() {
    mySocket.addEventListener('open', function (event) {
      console.log('WebSocket connection established1');

      // Subscribe to new block events
      mySocket.send('{"id": 2, "jsonrpc": "2.0", "method": "subscribe", "params": ["new_transaction"]}');
    });

    mySocket.addEventListener('error', function (event) {
      console.error('WebSocket encountered an error:', event);
    });

    mySocket.addEventListener('close', function (event) {
      console.warn('WebSocket connection closed:', event);
    });
  }

  mySocket.onmessage = function (event) {

    if (lastTransactions.length) {
      const newTransactions = [...lastTransactions];
      newTransactions.pop();
      newTransactions.reverse();
      newTransactions.push(JSON.parse(JSON.parse(event.data).params.result).transaction.hash);
      newTransactions.reverse();
      setLastTransactions(newTransactions);
    }
  };

  return (
    <div className="h-max relative items-center p-6 bg-black bg-opacity-70 md:px-20">
      <div className="md:flex justify-between items-center w-full gap-8">
        <div className="space-y-3 md:w-1/2 w-full">
          <p className="text-[40px] font-normal text-white">Track your Transactions.</p>
          <p className="text-xl font-normal text-white">And anyone else's.</p>
          <p className="text-xl font-normal text-white text-justify">With the CKB blockchain, it's important to be able to track your transactions in real-time and know exactly how close they are to confirming. And with our new tool, you'll be able to do just that - automatically!

            Simply enter your address in the search bar and click "Follow" to start tracking any new transaction that you send or receive. You'll receive automatic updates on its progress, and if needed, you can speed up the confirmation process.

            But that's not all! With our tool, you can also follow anyone else's transactions. Get a glimpse into what goes on inside the mempool by watching other users' transactions and seeing how they move through the network. It's a great way to learn more about how the CKB blockchain works and what makes it so secure and reliable.

            So why wait? Start tracking your transactions today - and anyone else's too!</p>

        </div>
        <div className="bg-white bg-opacity-10 p-4 md:w-1/2 w-full md:mt-0 mt-8">
          <div className="border-4 border-black w-full h-[400px] overflow-y-scroll">
            {
              lastTransactions.length ?
                (lastTransactions.map((transaction, index) => (
                  <div className="bg-black bg-opacity-20 border-2 border-black px-8 py-2 flex items-center justify-between w-full" key={index}>
                    <Link to={`https://explorer.nervos.org/transaction/${transaction}`} target="_blank"><p className="text-white">{`${transaction.slice(0, 10)}...${transaction.slice(transaction.length - 10, transaction.length)}`}</p></Link>
                    <FaHandPaper color="white" />
                  </div>
                )))
                :
                <Loading />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaction;