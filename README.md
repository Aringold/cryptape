# Cryptape

![](https://github.com/suzukidavid/cryptape/blob/main/public/assets/cryptape.jpg)
This is a [React](https://reactjs.org) project with [Vite](https://vitejs.dev).

## What's inside?

- [ReactJS](https://reactjs.org)
- [Vite](https://vitejs.dev)
- [Jest](https://jestjs.io)
- [Testing Library](https://testing-library.com)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Polyfills](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy#readme)

## How to developed this?

1. Create React project with Vite.js and Tailwind CSS

   ```bash
   npm create vite@latest cryptape -- --template react
   cd cryptape
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. Configure template paths

   ```bash
   /** @type {import('tailwindcss').Config} */
   export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
    extend: {},
   },
   plugins: [],
   }
   ```

3. Build UI/UX.
4. Run CKB node on VPS
   Frist. download the CKB node from the [CKB Node Release page](https://github.com/nervosnetwork/ckb/releases)
   Then initialize the blockchain to the mainnet and run the node:

   ```bash
   ckb init --chain mainnet
   ckb run
   ```

   By default CKB RPC only binds to HTTP service, you need to bind WebSocket in ckb.toml.

   ```bash
   tcp_listen_address = "127.0.0.1:18114"
   ws_listen_address = "127.0.0.1:443"
   reject_ill_transactions = true
   ```

   Then you can access the rpc by your vps ip address and your own port.

5. Development
   [CKB JSON-RPC Protocols] (https://github.com/nervosnetwork/ckb/blob/develop/rpc/README.md)
   Install CKB Javascript SDK and config.

   ```bash
   npm install @nervosnetwork/ckb-sdk-core

   import { default as CKB } from "@nervosnetwork/ckb-sdk-core";
   const ckb = new CKB('http://YOUR_IP_ADDRESS:YOUR_PORT');
   ```

   Handle new transaction, new block, new rejected transaction event using subscribe function of ckb rpc.

   ```bash
   const mySocket = new WebSocket('YOUR_IP_ADDRESS:YOUR_PORT');
   mySocket.addEventListener('open', function (event) {
      console.log('WebSocket connection established');

      // Subscribe to new transaction events
      mySocket.send('{"id": 2, "jsonrpc": "2.0", "method": "subscribe", "params": ["new_transaction"]}');
      // Subscribe to new block events
      mySocket.send('{"id": 3, "jsonrpc": "2.0", "method": "subscribe", "params": ["new_tip_header"]}');
      // Subscribe to new rejected transaction event
      mySocket.send('{"id": 4, "jsonrpc": "2.0", "method": "subscribe", "params": ["rejected_transaction"]}');
    });

    mySocket.onmessage = async (event) => {
      //Handle new block event.
      Call function that moves block on screen.
      //Handle new transaction event.
      Call function that create transaction avatar on screen and move it to the pending txs pool.
      //Handle new rejected tx event.
      Call function that moves avatar from pending pool to home and remove it on screen.
    }
   ```

   Get block information and transaction information by mouse clicking.

   ```bash
   const getBlockInfo = async (blockNumber) => {
    const blockInfo = await ckb.rpc.getBlockByNumber(blockNumber);
    setDetailBlock(blockInfo);
   }

   const getTransactionInfo = async (hash) => {
    const response = await ckb.rpc.getTransaction(hash);
    setTransactionStatus(response.txStatus.status);
    // setPendingTransaction(response);
   }
   ```

## Getting started

1. Clone the project.

   ```bash
   git clone https://github.com/suzukidavid/cryptape.git
   ```

2. Access the project directory.

   ```bash
   cd cryptape
   ```

3. Install dependencies.

   ```bash
   npm install
   ```

4. Start dev server with hot reload at http://localhost:5173.
   ```bash
   npm run dev
   ```

## Recommended VS Code extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Other commands

### Build commands

```bash
npm run build
```

### Run the app in production mode at http://localhost:5173.

```bash
npm run serve
```

## License

This project is licensed under the MIT License.
