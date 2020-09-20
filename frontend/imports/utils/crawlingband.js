import { web3Obj } from 'meteor/makerotc:dapple';

const abi = [
    {
      "constant": true,
      "inputs": [],
      "name": "band",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "crawlingRate",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "setOwner",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "latestFloorPrice",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "detachRate",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "pathName",
          "type": "string"
        },
        {
          "name": "pathAddress",
          "type": "address"
        }
      ],
      "name": "updatePath",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_path",
          "type": "address"
        }
      ],
      "name": "setUCPath",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "latestCeilingTime",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "latestCeilingPrice",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "ucPath",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "latestFloorTime",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_band",
          "type": "uint256"
        },
        {
          "name": "_crawlingRate",
          "type": "uint256"
        },
        {
          "name": "pathAddress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "previousBand",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "newBand",
          "type": "uint256"
        }
      ],
      "name": "BandChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "previousRate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "newRate",
          "type": "uint256"
        }
      ],
      "name": "CrawlingRateChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "previousRate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "newRate",
          "type": "uint256"
        }
      ],
      "name": "DetachRateChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "NewOwner",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "pathAddress",
          "type": "address"
        }
      ],
      "name": "NewPath",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "pathName",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "pathAddress",
          "type": "address"
        }
      ],
      "name": "PathUpdated",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getTimeStamp",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getUCMarketplaceAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "init",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getEstimatedCeilingPrice",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getEstimatedFloorPrice",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "getCurrentCeilingPrice",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "getCurrentFloorPrice",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

const envConfig = {
  kovan: 0,
  live: 0,
  default: '0x69aef67155bb9fc31fd92703a4a8e0faa9b4a915'
};

//let contract;

class CrawlingBand {
  constructor(env) {
    this.crawlingbandAddress = envConfig[env];
    this.contract = web3Obj.eth.contract(abi).at(this.crawlingbandAddress);
    //this.crawlingbandAddress = crawlingbandAddress;

    //this.getEstimatedCeilingPrice = this.getEstimatedCeilingPrice.bind(this);
    //this.getEstimatedFloorPrice = this.getEstimatedFloorPrice.bind(this);
  }

  //// no need because we already have "this.contract" set on constructor
  // contract() {
  //   // return this.crawlingband;
  //   return this.contract;
  // }

  async getEstimatedFloorPrice() {
    return new Promise((resolve, reject) => {
      this.contract.getEstimatedFloorPrice((error, price) => {
        if (!error) resolve(price);
        else reject();
      });
    });
  }

  async getEstimatedCeilingPrice() {
    return new Promise((resolve, reject) => {
      console.log('Getting celiling price ...');
      this.contract.getEstimatedCeilingPrice(async (e, tx) => {
        console.log('getEstimatedCeilingPrice TX number: ', tx);
        if (!e) {
          /* eslint-disable no-underscore-dangle */
          try {
            await this._waitForTxReceipt(tx);
            resolve();
          } catch (rejection) {
            reject();
          }
        } else {
          reject();
        }
      });
    });
  }

  async _waitForTxReceipt(tx) {
    return new Promise((resolve, reject) => {
      const txChecking = setInterval(() => {
        web3Obj.eth.getTransactionReceipt(tx, (err, result) => {
          if (!err) {
            if (result) {
              console.log('Receipt status :', result.status);
              console.log('Receipt resullt :', result);
              // On mainnet after the Byzantium update status property was included to reflect
              // if the top-level call actually was successful or not.

              // On kovan we don't have this update so result.status will be null.
              // In this case we consider that transaction failed only if the value is 0
              if (result.status === '0x0') {
                reject();
              } else {
                resolve();
              }

              clearInterval(txChecking);
            }
          } else {
            reject();
          }
        });
      }, 1000);
    });
  }
}

// TODO: what happens if Dapple.env is not initialized.
export default CrawlingBand;
