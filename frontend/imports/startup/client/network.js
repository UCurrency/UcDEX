import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { BigNumber } from 'meteor/ethereum:web3';
import { Dapple, web3Obj } from 'meteor/makerotc:dapple';
import { _ } from 'meteor/underscore';
import { $ } from 'meteor/jquery';
import Redeemer from '/imports/utils/redeemer';
import CrawlingBand from '/imports/utils/crawlingband';
import Marketplace from '/imports/utils/marketplace';
import Limits from '/imports/api/limits';
import Transactions from '/imports/api/transactions';
import Tokens from '/imports/api/tokens';
import TokenEvents from '/imports/api/tokenEvents';
import Collaterals from '/imports/api/collaterals';
import WGNT from '/imports/api/wgnt';
import { Offers, Status } from '/imports/api/offers';
import { doHashChange, formatNumber } from '/imports/utils/functions';

// Check which accounts are available and if defaultAccount is still available,
// Otherwise set it to localStorage, Session, or first element in accounts
function checkAccounts() {
  return new Promise((resolve, reject) => {
    web3Obj.eth.getAccounts((error, accounts) => { // JON: only bringing currrent account, not all
      if (!error) {
        if (!_.contains(accounts, web3Obj.eth.defaultAccount)) {
          if (_.contains(accounts, localStorage.getItem('address'))) {
            web3Obj.eth.defaultAccount = localStorage.getItem('address');
          } else if (_.contains(accounts, Session.get('address'))) {
            web3Obj.eth.defaultAccount = Session.get('address');
          } else if (accounts.length > 0) {
            web3Obj.eth.defaultAccount = accounts[0];
          } else {
            web3Obj.eth.defaultAccount = undefined;
          }
        }
        localStorage.setItem('address', web3Obj.eth.defaultAccount);
        Session.set('address', web3Obj.eth.defaultAccount);
        Session.set('accounts', accounts);
        resolve(web3Obj.eth.defaultAccount);
      } else {
        reject();
      }
    });
  });
}

function checkIfUserHasBalanceInOldWrapper(userAddress) {
  // Named the old wrapper - OW-ETH
  Dapple.getToken('OW-ETH', (error, token) => {
    if (!error) {
      if (token) {
        token.balanceOf(userAddress, (err, balance) => {
          if (!error) {
            if (balance.valueOf() >= 100000000000000000) {
              $('#wrapperUpdate').modal({
                keyboard: false,
                show: true,
                backdrop: false,
              });
              $('#wrapperUpdate').on('shown.bs.modal', () => {
                $('.amount').text(Blaze._globalHelpers.formatBalance(balance, 3, '', false));
                Session.set('oldWrapperBalance', balance.toString(10));
              });
            }
          } else {
            console.debug(`Couldn't get balance for ${userAddress}.`, error);
          }
        });
      }
    } else {
      console.debug(`Cannot extract information for ${token} `, error);
    }
  });
}

async function checkIfUserHasOldMKR(userAddress) {
  const redeemer = new Redeemer(Dapple.env);
  const oldMKRBalance = await redeemer.balanceOf(userAddress);

  return new Promise ((resolve) => {

    if (oldMKRBalance.valueOf() >= 10000000000000000) {
      $('#redeemer').modal({
        keyboard: false,
        show: true,
        backdrop: false,
      });

      $('#redeemer').on('shown.bs.modal', () => {
        $('.amount').text(Blaze._globalHelpers.formatBalance(oldMKRBalance, 3, '', false));
      });

      $("#redeemer").on("hidden.bs.modal", function () {
        resolve();
      });

      const redeemerModal = document.getElementById('redeemer');
      redeemerModal.addEventListener('hide-modal' , () => {
        resolve();
      })
    }
    else resolve();
  });
}

async function checkUCPricefromCrawlingBand() {
  if(Dapple.env === 'default') { // only published on local network so far
    const crawlingband = new CrawlingBand(Dapple.env);
    //// 2 options to get floorPrice, both work, one call method on class contract on class and method on page.
    const ceilingPrice = crawlingband.contract.getEstimatedCeilingPrice(function(error, result){
      if (!error) {
      console.log('UC CeilingPrice: ' + result/1000000);
      console.log('UC CeilingPriceX: ' + formatNumber(result/1000000, 6));
      Session.set('ceilingPrice', result/1000000);
      } else {
        console.log('JON Error: ' + error);
      }
    });
    const floorPrice = await crawlingband.getEstimatedFloorPrice();
    console.log('UC Floorprice: ' + floorPrice/1000000);
    console.log('UC FloorpriceX: ' + formatNumber(floorPrice/1000000, 6));
    Session.set('floorPrice', floorPrice/1000000);

    // // test marketplace
    // const marketplace = new Marketplace(Dapple.env);
    // const collateralsCount = await marketplace.getCollateralsCount();
    // Session.set('collateralsCount', collateralsCount.toNumber());
    // console.log('UC collateralsCount: ' + collateralsCount);
    // const collaterals = await marketplace.getCollaterals();
    // //console.log('UC collateralAddress: ' + collaterals);
    // if(collateralsCount > 0) {
    //   Session.set('collaterals', collaterals);
    //   console.log('UC collaterals: ' + collaterals[0].symbol);
    // }
  }
}

function checkIfOrderMatchingEnabled(marketType) {
  return new Promise((resolve, reject) => {
    if (marketType !== 'MatchingMarket') {
      Session.set('isMatchingEnabled', false);
      resolve();
    } else {
      Dapple['maker-otc'].objects.otc.matchingEnabled((error, status) => {
        if (!error) {
          Session.set('isMatchingEnabled', status);
          resolve();
        } else {
          console.debug('Cannot identify order matching status. ', error);
          reject(error);
        }
      });

      Dapple['maker-otc'].objects.otc.LogMatchingEnabled({}, { fromBlock: 'latest' }, (err, status) => {
        if (!err) {
          Session.set('isMatchingEnabled', status.args.isEnabled);
        }
      });
    }
  });
}

function checkIfBuyEnabled(marketType) {
  return new Promise((resolve, reject) => {
    if (marketType !== 'MatchingMarket') {
      Session.set('isBuyEnabled', true);
      resolve();
    } else {
      const abi = Dapple['maker-otc'].objects.otc.abi;
      const addr = Dapple['maker-otc'].environments[Dapple.env].otc.value;

      const contract = web3Obj.eth.contract(abi).at(addr);
      contract.buyEnabled((error, result) => {
        if (!error) {
          Session.set('isBuyEnabled', result);
          resolve();
        } else {
          reject();
        }
      });

      Dapple['maker-otc'].objects.otc.LogBuyEnabled({}, { fromBlock: 'latest' }, (err, status) => {
        if (!err) {
          Session.set('isBuyEnabled', status.args.isEnabled);
        }
      });
    }
  });
}

function denotePrecision() {
  const basePrecision = Dapple.getTokenSpecs(Session.get('baseCurrency')).precision;
  const quotePrecision = Dapple.getTokenSpecs(Session.get('quoteCurrency')).precision;
  const precision = basePrecision < quotePrecision ? basePrecision : quotePrecision;
  Session.set('precision', precision);
  // TODO: find away to place ROUNDING_MODE in here.
  // Right now no matter where It is put , it's overridden with ROUNDING_MODE: 1 from web3 package config.
  BigNumber.config({ DECIMAL_PLACES: precision });
}

// Initialize everything on new network
async function initNetwork(newNetwork) {
  Dapple.init(newNetwork);
  const market = Dapple['maker-otc'].environments.kovan.otc;
  checkAccounts().then(async (account) => {
    await checkIfUserHasOldMKR(account);
    checkIfUserHasBalanceInOldWrapper(account);
  });
  await checkUCPricefromCrawlingBand();
  const isMatchingEnabled = checkIfOrderMatchingEnabled(market.type);
  const isBuyEnabled = checkIfBuyEnabled(market.type);
  Promise.all([isMatchingEnabled, isBuyEnabled]).then(() => {
    Session.set('network', newNetwork);
    Session.set('isConnected', true);
    Session.set('latestBlock', 0);
    Session.set('startBlock', 0);
    doHashChange();
    denotePrecision();
    Tokens.sync();
    Limits.sync();
    Offers.sync();
    Collaterals.sync();
  });
}

// Check the closing time of the market and if it's open now
function checkMarketOpen() {
  Offers.checkMarketOpen();
}

// CHECK FOR NETWORK
function checkNetwork() {
  if (Session.get('web3ObjReady') && typeof web3Obj !== 'undefined') {
    web3Obj.version.getNode((error) => {
      const isConnected = !error;

      // Check if we are synced
      if (isConnected) {
        web3Obj.eth.getBlock('latest', (e, res) => {
          if (!e) {
            const sessionLatestBlock = Session.get('latestBlock');
            if (res && res.number >= Session.get('latestBlock')) {
              Session.set('outOfSync', e != null || (new Date().getTime() / 1000) - res.timestamp > 60000000); // JON notes: changed from 600 to 6000 because on test we don't create blocks offen
              Session.set('latestBlock', res.number);
              const sessionStartBlock = Session.get('startBlock'); // JON debug
              if (sessionStartBlock === 0 && res.number > 6000) { // JON added res.number > 600 to avoid negative starting block
                console.log(`Setting startblock to ${res.number - 6000}`);
                Session.set('startBlock', (res.number - 6000));
              }
            } else {
              // XXX MetaMask frequently returns old blocks
              // https://github.com/MetaMask/metamask-plugin/issues/504
              console.debug('Skipping old block');
            }
          } else {
            console.debug('There is error while getting the latest block! ', e);
          }
        });
      }

      // Check which network are we connected to
      // https://github.com/ethereum/meteor-dapp-wallet/blob/90ad8148d042ef7c28610115e97acfa6449442e3/app/client/lib/ethereum/walletInterface.js#L32-L46
      if (!Session.equals('isConnected', isConnected)) {
        if (isConnected === true) {
          web3Obj.version.getNetwork((e, res) => {
            let network = false;
            console.log('(JON) Network e param: ' + e + ' res: ' + res);
            if (!e) {
              switch (res) {
                case '1':
                  network = 'main';
                  Session.set('AVGBlocksPerDay', 5760);
                  break;
                case '42':
                  network = 'kovan';
                  Session.set('AVGBlocksPerDay', 21600);
                  break;
                default:
                  network = 'private';
                  Session.set('AVGBlocksPerDay', 3); // (JON) Added to test bug on history
              }
            }
            if (!Session.equals('network', network)) {
              console.log('(JON) Network : ' + network);
              initNetwork(network, isConnected);
            }
          });
        } else {
          console.log('(JON) Network NOT CONNECTED');
          Session.set('isConnected', isConnected);
          Session.set('network', false);
          Session.set('latestBlock', 0);
        }
      }
    });
  }
}

$(window).on('hashchange', () => {
  const baseBeforeChange = Session.get('baseCurrency');
  const quoteBeforeChange = Session.get('quoteCurrency');
  doHashChange();
  const baseAfterChange = Session.get('baseCurrency');
  const quoteAfterChange = Session.get('quoteCurrency');

  if (Session.get('isMatchingEnabled')) {
    if (baseAfterChange !== baseBeforeChange || quoteAfterChange !== quoteBeforeChange) {
      Offers.sync();
    }
  }

  denotePrecision();
});

function initSession() {
  Session.set('network', false);
  Session.set('loading', false);
  Session.set('loadingBuyOrders', true);
  Session.set('loadingSellOrders', true);
  Session.set('loadingProgress', 0);
  Session.set('loadingCounter', 0);
  Session.set('outOfSync', false);
  Session.set('syncing', false);
  Session.set('isConnected', false);
  Session.set('latestBlock', 0);

  Session.set('balanceLoaded', false);
  Session.set('allowanceLoaded', false);
  Session.set('limitsLoaded', false);

  Session.set('ETHDepositProgress', 0);
  Session.set('ETHDepositProgressMessage', '');
  Session.set('ETHDepositErrorMessage', '');
  Session.set('ETHWithdrawProgress', 0);
  Session.set('ETHWithdrawProgressMessage', '');
  Session.set('ETHWithdrawErrorMessage', '');
  Session.set('GNTDepositProgress', 0);
  Session.set('GNTDepositProgressMessage', '');
  Session.set('GNTDepositErrorMessage', '');
  Session.set('GNTWithdrawProgress', 0);
  Session.set('GNTWithdrawProgressMessage', '');
  Session.set('GNTWithdrawErrorMessage', '');
  Session.set('loadingTradeHistory', true);
  Session.set('loadingIndividualTradeHistory', false); // this will be loading only if the user filter by closed status of orders
  Session.set('AVGBlocksPerDay', null);
  Session.set('watchedEvents', false);
  Session.set('redeemInProgress', false);
  if (!Session.get('volumeSelector')) {
    Session.set('volumeSelector', 'quote');
  }
  Session.set('loadingCollaterals', true);
}

/**
 * Startup code
 */
Meteor.startup(() => {
  initSession();

  const syncingInterval = setInterval(
    () => {
      if (Session.get('web3ObjReady')) {
        checkNetwork();

        web3Obj.eth.filter('latest', () => { // (JON) tryed web3Obj.eth.filter({ fromBlock: 20, toBlock: 'latest' }, () => {  // changed from 'web3Obj.eth.filter('latest', () => {'
          Tokens.sync();
          Limits.sync();
          Transactions.sync();
          TokenEvents.syncTimestamps();
          Collaterals.sync();
        });

        web3Obj.eth.isSyncing((error, sync) => {
          if (!error) {
            Session.set('syncing', sync !== false);

            // Stop all app activity
            if (sync === true) {
              // We use `true`, so it stops all filters, but not the web3Obj.eth.syncing polling
              web3Obj.reset(true);
              checkNetwork();
              // show sync info
            } else if (sync) {
              Session.set('startingBlock', sync.startingBlock);
              Session.set('currentBlock', sync.currentBlock);
              Session.set('highestBlock', sync.highestBlock);
            } else {
              Session.set('outOfSync', false);
              Offers.sync();
              web3Obj.eth.filter('latest', () => {
                Tokens.sync();
                Limits.sync();
                Transactions.sync();
              });
            }
          }
        });
        clearInterval(syncingInterval);
      }
    }, 350,
  );

  // Session.set('web3Interval', web3Interval);

  function syncAndSetMessageOnError(document) {
    Offers.syncOffer(document.object.id);
    if (document.receipt.logs.length === 0) {
      const helperMsg = `${document.object.status.toUpperCase()}: Error during Contract Execution`;
      Offers.update(document.object.id, { $set: { helper: helperMsg } });
    }
  }

  function setMessageAndScheduleRemovalOnError(document) {
    // The ItemUpdate event will be triggered on successful generation, otherwise set helper
    if (document.receipt.logs.length === 0) {
      Offers.update(document.object.id, { $set: { helper: 'Error during Contract Execution' } });
      Meteor.setTimeout(() => {
        Offers.remove(document.object.id);
      }, 5000);
    }
  }

  Transactions.observeRemoved('offer', (document) => {
    switch (document.object.status) {
      case Status.CANCELLED:
        syncAndSetMessageOnError(document);
        break;
      case Status.BOUGHT:
        syncAndSetMessageOnError(document);
        break;
      case Status.PENDING:
        setMessageAndScheduleRemovalOnError(document);
        break;
      default:
        break;
    }
  });

  Meteor.setInterval(checkNetwork, 2503);
  Meteor.setInterval(checkAccounts, 10657);
  Meteor.setInterval(checkMarketOpen, 11027);
});

Meteor.autorun(() => {
  TokenEvents.watchEvents();
  Collaterals.sync();
  WGNT.watchBrokerCreation();
  WGNT.watchBrokerTransfer();
  WGNT.watchBrokerClear();
  WGNT.watchWithdraw();
});
