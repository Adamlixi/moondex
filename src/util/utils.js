import {
    connect,
    createDataItemSigner
  } from "@permaweb/aoconnect";

  const { result, results, message, spawn, monitor, unmonitor, dryrun } = connect(
    {
      MU_URL: "https://mu.ao-testnet.xyz",
      CU_URL: "https://cu.ao-testnet.xyz",
      GATEWAY_URL: "https://arweave.net",
    },
  );
var publicKey = ""

export async function getPublicKey() {
    // 从localStorage中获取publicKey
    try {
      var a = await window.arweaveWallet.getActiveAddress()
      publicKey = localStorage.getItem("publicKey");
      return publicKey;
    } catch (error) {
      return ""
    }
}

export async function setPublicKey() {
    publicKey = await window.arweaveWallet.getActiveAddress();
    localStorage.setItem("publicKey", publicKey);
}

export async function connectWallet() {
    try {
      // connect to the ArConnect browser extension
      await window.arweaveWallet.connect(
        // request permissions
        ["ACCESS_ADDRESS", "SIGN_TRANSACTION", "ACCESS_PUBLIC_KEY"],
      );
      publicKey = await window.arweaveWallet.getActiveAddress();
      localStorage.setItem("publicKey", publicKey);
    } catch (error) {
        console.log(error)
      alert('You should connect to ArConnect browser extension.');
      return false;
    }
  
    return true;
}

export async function getResult(processId, messageId) {
    let { Messages } = await result({
        // the arweave TXID of the message
        message: messageId,
        // the arweave TXID of the process
        process: processId,
      });
    return Messages
}


export async function messageToAO(process, data, action) {
    try {
      const messageId = await message({
        process: process,
        signer: createDataItemSigner(window.arweaveWallet),
        tags: [{ name: 'Action', value: action }],
        data: JSON.stringify(data)
      });
  
      // console.log("messageId:", messageId)
      return messageId;
    } catch (error) {
      console.log("messageToAO -> error:", error)
      return '';
    }
  }

  export async function AOCreateOrder(process, fromCoin, toCoin, fromQuantity, toQuantity) {
    try {
      const messageId = await message({
        process: process,
        signer: createDataItemSigner(window.arweaveWallet),
        tags: [{ name: 'Action', value: "CreateOrder" }, { name: 'FromCoin', value: fromCoin }, { name: 'ToCoin', value: toCoin },
        { name: 'FromQuantity', value: fromQuantity },{ name: 'ToQuantity', value: toQuantity }
        ],
      });
  
      console.log("messageId:", messageId)
      return messageId;
    } catch (error) {
      console.log("messageToAO -> error:", error)
      return '';
    }
  }

  export async function sendCoin(process, recipient, quantity) {
    try {
      const messageId = await message({
        process: process,
        signer: createDataItemSigner(window.arweaveWallet),
        tags: [{ name: 'Action', value: "Transfer" }, { name: 'Recipient', value: recipient }, { name: 'Quantity', value: quantity }
        ],
      });
  
      console.log("messageId:", messageId)
      return messageId;
    } catch (error) {
      console.log("messageToAO -> error:", error)
      return '';
    }
  }


  export async function getDataFromAO(
    process,
    action,
    data
  ) {
  
    let start = performance.now();
    // console.log('==> [getDataFromAO]');
    let result;
    try {
      result = await dryrun({
        process,
        tags: [{ name: 'Action', value: action }]
      });
    } catch (error) {
      console.log('getDataFromAO --> ERR:', error)
      return '';
    }
  
    let resp = result.Messages[0].Data;
  
    let end = performance.now();
    // console.log(`<== [getDataFromAO] [${Math.round(end - start)} ms]`);
  
    return JSON.parse(resp);
  }

  export async function getDataByTime(
    process,
    time
  ) {
    // console.log('==> [getDataFromAO]');
    let result;
    try {
      result = await dryrun({
        process,
        tags: [{ name: 'Action', value: 'GetResultsByTime' }, { name: 'StartTime', value: time.toString()}]
      });
    } catch (error) {
      console.log('getDataFromAO --> ERR:', error)
      return '';
    }
  
    console.log(result)
    let resp = result.Messages[0].Data;

  
    return JSON.parse(resp);
  }

  export async function getOrderByAddress(
    process,
    action,
    address
  ) {
  
    let start = performance.now();
    // console.log('==> [getDataFromAO]');
    let result;
    try {
      result = await dryrun({
        process,
        tags: [{ name: 'Action', value: action }, { name: 'ADDRESS', value: address }]
      });
    } catch (error) {
      console.log('getDataFromAO --> ERR:', error)
      return '';
    }
  
    let resp = result.Messages[0].Data;
  
    let end = performance.now();
    // console.log(`<== [getDataFromAO] [${Math.round(end - start)} ms]`);
  
    return JSON.parse(resp);
  }

  export async function getAccountByAddress(
    process,
    action,
    address
  ) {
  
    let start = performance.now();
    // console.log('==> [getDataFromAO]');
    let result;
    try {
      result = await dryrun({
        process,
        tags: [{ name: 'Action', value: action }, { name: 'ADDRESS', value: address }]
      });
    } catch (error) {
      console.log('getDataFromAO --> ERR:', error)
      return '';
    }
  
    let resp = result.Messages[0].Data;
  
    let end = performance.now();
    // console.log(`<== [getDataFromAO] [${Math.round(end - start)} ms]`);
  
    return JSON.parse(resp);
  }

  export async function getOrdersFromAO(
    process,
    action,
    dir
  ) {
  
    let start = performance.now();
    // console.log('==> [getDataFromAO]');
    let result;
    try {
      result = await dryrun({
        process,
        tags: [{ name: 'Action', value: action }, {name:"DIR", value: dir}]
      });
    } catch (error) {
      console.log('getDataFromAO --> ERR:', error)
      return '';
    }
  
    let resp = result.Messages[0].Data;
  
    let end = performance.now();
    // console.log(`<== [getDataFromAO] [${Math.round(end - start)} ms]`);
  
    return JSON.parse(resp);
  }

  export async function withDrawOrders(process, id) {
    try {
      console.log(id)
      const messageId = await message({
        process: process,
        signer: createDataItemSigner(window.arweaveWallet),
        tags: [{ name: 'Action', value: "WithdrawOrder" }, { name: 'Id', value: id }],
      });
      console.log("messageId:", messageId)
      return messageId;
    } catch (error) {
      console.log("messageToAO -> error:", error)
      return '';
    }
  }

  export async function withDrawAccount(process, coin, amount) {
    try {
      console.log(coin)
      const messageId = await message({
        process: process,
        signer: createDataItemSigner(window.arweaveWallet),
        tags: [{ name: 'Action', value: "WithdrawAccount" }, { name: 'Coin', value: coin }, {name:'Amount', value: amount }],
      });
      console.log("messageId:", messageId)
      return messageId;
    } catch (error) {
      console.log("messageToAO -> error:", error)
      return '';
    }
  }
  
  export async function getTokenBalance(process, address) {
    const result = await dryrun({
      process: process,
      tags: [
        { name: 'Action', value: 'Balance' },
        { name: 'Target', value: address },
        { name: 'Recipient', value: address },
      ],
    });
  
    return result.Messages[0].Data;
  }