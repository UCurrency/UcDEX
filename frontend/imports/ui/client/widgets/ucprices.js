import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
//import { BigNumber } from 'meteor/ethereum:web3';

//import { Dapple, web3Obj } from 'meteor/makerotc:dapple';

//import Tokens from '/imports/api/tokens';
import Collaterals from '/imports/api/collaterals';
//import { Offers, Trades } from '/imports/api/offers';
//import { $ } from 'meteor/jquery';

//import Marketplace from '/imports/utils/marketplace';

import './ucprices.html';


Template.ucprices.viewmodel({
    autorun() {

        Session.set('loadingCollaterals', true); // JON - for some unknown reason, this runs at end and keeps loading on page wihout showing data. Now placed on init network

        // const colCount = Session.get('collateralsCount');
        // this.collateralsCount(colCount);
        // console.log('UC collateralsCountX: ' + this.collateralsCount());
        // const cols = Session.get('collaterals');
        // this.collaterals(cols);
        // this.testText(cols.length);
        //this.testText2(this.collaterals()[0].symbol);
    },
    collaterals() {
        const collateralsResult = Collaterals.find({
            //symbol: 'UCCOL'
         }, { sort: { symbol: 1 } }).fetch();
          const colCount = collateralsResult.length;
          Session.set('collateralsCount', colCount);
          console.log('UC collateralsCountX: ' + colCount);
          if(colCount > 0) {
              Session.set('loadingCollaterals', false);
              console.log('UCPrices Collaterals: ' + collateralsResult);
              var xdebug = collateralsResult[0];
              console.log('UCPrices Symbol: ' + xdebug.symbol);
            }
          return collateralsResult;
    },
    collateralsCount() {
        return Session.get('collateralsCount') || this.collaterals().count();
    },
    // testText: '',
    // testText2() {
    //     return this.collaterals()[0].symbol;
    // },

});