import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { BigNumber } from 'meteor/ethereum:web3';

import { web3Obj } from 'meteor/makerotc:dapple';

import Tokens from '/imports/api/tokens';
import { Offers, Trades } from '/imports/api/offers';
import { $ } from 'meteor/jquery';

import './ucprices.html';


Template.ucprices.viewmodel({
    autorun() {
    },

});