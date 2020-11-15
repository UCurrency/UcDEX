import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';
//import { web3Obj } from 'meteor/makerotc:dapple';
import Marketplace from '/imports/utils/marketplace';
import { formatNumber } from '/imports/utils/functions';

class CollateralsCollection extends Mongo.Collection {

    prepareRow(collateral, balance) {
        const cPrice = Session.get('ceilingPrice');
        const fPrice = Session.get('floorPrice');
        const colPrice = formatNumber(collateral.price/1000000, 6);
        const row = {
            tokenAddr: collateral.tokenAddr,
            price: colPrice,
            orderbookBalance: collateral.orderbookBalance, // event doesn't bring block timestamp info
            paused: collateral.paused,
            token: collateral.token,
            symbol: collateral.symbol,
            mintRate: formatNumber(cPrice/colPrice, 6),
            burnRate: formatNumber(fPrice/colPrice, 6),
            balance: formatNumber(balance, 1)
            //type: event.toLowerCase(),
        };
        // // Handle different kinds of contract events
        // switch (row.type) {
        //     case 'transfer':
        //     row.from = event.args.from;
        //     row.to = event.args.to;
        //     row.amount = convertTo18Precision(event.args.value, Dapple.getTokenByAddress(event.address));
        //     break;
        //     case 'deposit':
        //     row.from = event.args.who;
        //     row.to = event.address;
        //     row.amount = convertTo18Precision(event.args.amount, Dapple.getTokenByAddress(event.address));
        //     break;
        //     case 'withdrawal':
        //     row.from = event.address;
        //     row.to = event.args.who;
        //     row.amount = convertTo18Precision(event.args.amount, Dapple.getTokenByAddress(event.address));
        //     break;
        //     default:
        //     break;
        // }
        // // Convert amount to string for storage
        // if (typeof (row.amount) !== 'undefined') {
        //     row.amount = row.amount.toString(10);
        // }

        return row;
    }

    /**
   * Syncs the quote and base currencies' balances and allowances of selected account,
   * usually called for each new block
   */
  sync() {
    if(Dapple.env === 'default') { // only published on local network so far
        const marketplace = new Marketplace(Dapple.env);
        marketplace.getCollateralsCount().then((count) => {
            if(count > 0) {
                marketplace.getCollaterals().then((collaterals) => {
                    collaterals.forEach((collateral) => {
                        marketplace.getCollateralBalance(collateral.tokenAddr, false).then((balance) => {
                            const row = this.prepareRow(collateral, balance);
                            //super.insert(row);
                            super.upsert(collateral.tokenAddr, row);
                        });
                    });
                    Session.set('loadingCollaterals', false);
                });
            }
        });


        // await marketplace.getCollateralsCount((error, count) => {
        //     if(!error && count > 0) {
        //         marketplace.getCollaterals((error, collaterals) => {
        //             if(!error) {
        //                 collaterals.forEach((collateral) => {
        //                     //const row = this.prepareRow(collateral);
        //                     super.insert(collateral);
        //                 });
        //                 Session.set('loadingCollaterals', false);
        //             }
        //         });
        //     }
        // });
    }
  }
}

export default new CollateralsCollection(null);