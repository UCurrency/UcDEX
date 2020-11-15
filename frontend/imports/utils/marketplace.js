import { Dapple, web3Obj } from 'meteor/makerotc:dapple';

const abi = [
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
      "name": "ucCrawlingBand",
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
      "name": "ucToken",
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
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "saleOrders",
      "outputs": [
        {
          "name": "addr",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint256"
        },
        {
          "name": "price",
          "type": "uint256"
        },
        {
          "name": "collateral",
          "type": "address"
        },
        {
          "name": "expiration",
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
      "name": "ucgToken",
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
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "purchaseOrders",
      "outputs": [
        {
          "name": "addr",
          "type": "address"
        },
        {
          "name": "amount",
          "type": "uint256"
        },
        {
          "name": "collateral",
          "type": "address"
        },
        {
          "name": "collAmount",
          "type": "uint256"
        },
        {
          "name": "expiration",
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
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "collaterals",
      "outputs": [
        {
          "name": "tokenAddr",
          "type": "address"
        },
        {
          "name": "price",
          "type": "uint256"
        },
        {
          "name": "orderbookBalance",
          "type": "uint256"
        },
        {
          "name": "paused",
          "type": "bool"
        },
        {
          "name": "token",
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
      "name": "ucgReserveStake",
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
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "cost",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "collateral",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "ucgMinted",
          "type": "bool"
        }
      ],
      "name": "Mint",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "returned",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "collateral",
          "type": "address"
        }
      ],
      "name": "Burn",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "returned",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "collateral",
          "type": "address"
        }
      ],
      "name": "BurnUCG",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "collateral",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Deposit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "collateral",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "Withdraw",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "tokenAddr",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "paused",
          "type": "bool"
        }
      ],
      "name": "NewCollateral",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "tokenAddr",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "paused",
          "type": "bool"
        }
      ],
      "name": "CollateralUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "addr",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "key",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "eventType",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "collateral",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "expirationInMinutes",
          "type": "uint256"
        }
      ],
      "name": "OrderBookChange",
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
      "constant": false,
      "inputs": [
        {
          "name": "_tokenAddr",
          "type": "address"
        },
        {
          "name": "_price",
          "type": "uint256"
        },
        {
          "name": "_paused",
          "type": "bool"
        }
      ],
      "name": "acceptNewCollateral",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_tokenAddr",
          "type": "address"
        },
        {
          "name": "_price",
          "type": "uint256"
        },
        {
          "name": "_paused",
          "type": "bool"
        }
      ],
      "name": "updateCollateral",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getCollateralsCount",
      "outputs": [
        {
          "name": "count",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "getCollateralAddressAtIndex",
      "outputs": [
        {
          "name": "_address",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_tokenAddr",
          "type": "address"
        },
        {
          "name": "includeOrderbook",
          "type": "bool"
        }
      ],
      "name": "getCollateralBalance",
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
      "inputs": [
        {
          "name": "_tokenAddr",
          "type": "address"
        }
      ],
      "name": "getCollateralRate",
      "outputs": [
        {
          "name": "rate",
          "type": "uint256"
        },
        {
          "name": "rateInUC",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_tokenAddr",
          "type": "address"
        }
      ],
      "name": "getCollateralPrice",
      "outputs": [
        {
          "name": "price",
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
          "name": "_amount",
          "type": "uint256"
        },
        {
          "name": "_price",
          "type": "uint256"
        },
        {
          "name": "_collateral",
          "type": "address"
        },
        {
          "name": "_expiration",
          "type": "uint256"
        }
      ],
      "name": "addSaleOrder",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_key",
          "type": "bytes32"
        }
      ],
      "name": "cancelSaleOrder",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getSaleOrdersCount",
      "outputs": [
        {
          "name": "count",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "getSaleOrderKeyAtIndex",
      "outputs": [
        {
          "name": "key",
          "type": "bytes32"
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
          "name": "_key",
          "type": "bytes32"
        },
        {
          "name": "_collateral",
          "type": "address"
        },
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "matchSaleOrder",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_collateral",
          "type": "address"
        },
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "addCollateral",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_collateral",
          "type": "address"
        },
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_collateral",
          "type": "address"
        },
        {
          "name": "_amount",
          "type": "uint256"
        },
        {
          "name": "_minUCAmount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_amount",
          "type": "uint256"
        },
        {
          "name": "_collateral",
          "type": "address"
        }
      ],
      "name": "burn",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "ucgQty",
          "type": "uint256"
        },
        {
          "name": "colPrice",
          "type": "uint256"
        }
      ],
      "name": "ucgBurnValue",
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
          "name": "_amount",
          "type": "uint256"
        },
        {
          "name": "_collateral",
          "type": "address"
        }
      ],
      "name": "burnUCG",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getReservesBalance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];

const envConfig = {
  kovan: 0,
  live: 0,
  default: '0x641f22916257268896544022fee2dd32e00459dc'
};

class Marketplace {
  constructor(env) {
    this.address = envConfig[env];
    this.contract = web3Obj.eth.contract(abi).at(this.address);
  }

  async getCollateralsCount() {
    return new Promise((resolve, reject) => {
      this.contract.getCollateralsCount((error, ccount) => {
        if (!error) {
          resolve(ccount);
        }
        else { reject(error); }
      });
    });
  }

  async getCollateralAddressAtIndex(i) {
    return new Promise((resolve, reject) => {
      this.contract.getCollateralAddressAtIndex(i, (error, address) => {
        if (!error) {
            resolve(address);
        }
        else reject();
      });
    });
  }

  async getCollateralAtAddress(address) {
    return new Promise((resolve, reject) => {
      this.contract.collaterals(address, (error, collateral) => {
        if (!error) {
            resolve(collateral);
        }
        else reject();
      });
    });
  }

  async getCollaterals() {
    let collaterals = [];
    let collateralsCount = await this.getCollateralsCount();
    collateralsCount = collateralsCount.toNumber();
    for(var i = 0; i < collateralsCount; i++) {
        const address = await this.getCollateralAddressAtIndex(i);
        const collateral = await this.getCollateralAtAddress(address);
        const collateralPlus = {
            tokenAddr: collateral[0],
            price: collateral[1],
            orderbookBalance: collateral[2],
            paused: collateral[3],
            token: collateral[4],
            symbol: Dapple.getTokenByAddress(address)
        };
        collaterals.push(collateralPlus);
    }
    return collaterals;
  }

  // async getEstimatedCeilingPrice() {
  //   return new Promise((resolve, reject) => {
  //     console.log('Getting celiling price ...');
  //     this.contract.getEstimatedCeilingPrice(async (e, tx) => {
  //       console.log('getEstimatedCeilingPrice TX number: ', tx);
  //       if (!e) {
  //         /* eslint-disable no-underscore-dangle */
  //         try {
  //           await this._waitForTxReceipt(tx);
  //           resolve();
  //         } catch (rejection) {
  //           reject();
  //         }
  //       } else {
  //         reject();
  //       }
  //     });
  //   });
  // }

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
export default Marketplace;
