import mongoose from 'mongoose';
import users from './schemas/users.model';
import phones from './schemas/phones.model';
import adresses from './schemas/adresses.model';
import sneakers from './schemas/sneakers.model';
import cards from './schemas/cards.model';
import adComplaints from './schemas/adComplaintsModel.model';
import ads from './schemas/ads.model';
import orders from './schemas/orders.model';
import bankAccounts from './schemas/bankAccounts.model';
import multiOrders from './schemas/multiOrders.model';
import offers from './schemas/offers.model';
import configurations from './schemas/configurations.model';
import payments from './schemas/payments.model';
import transactions from './schemas/transactions.model';
import comments from './schemas/comments.model';
import banks from './schemas/bank.model';
import tickets from './schemas/tickets.model';
import countries from './schemas/countries.model';
import newsletterUsers from './schemas/newsletterUsers.model';
import errors from './schemas/errors.model';

mongoose.Promise = global.Promise;

export default async ({ conn, mongoUrl = 'mongodb://localhost/aceOne-local' }) => {
  console.log('mongoUrl: ', mongoUrl);
  try {
    if (!conn) {
      console.log('=> using new database connection');

      const newConnection = await mongoose.createConnection(mongoUrl, {
        bufferCommands: false,
        bufferMaxEntries: 0,
        keepAlive: true,
      });

      newConnection.model('users', users);
      newConnection.model('deleted-users', users);
      newConnection.model('phones', phones);
      newConnection.model('adresses', adresses);
      newConnection.model('sneakers_30-07-2020', sneakers);
      newConnection.model('errors', errors);
      newConnection.model('cards', cards);
      newConnection.model('adComplaints', adComplaints);
      newConnection.model('ads', ads);
      newConnection.model('orders', orders);
      newConnection.model('bankAccounts', bankAccounts);
      newConnection.model('multiOrders', multiOrders);
      newConnection.model('offers', offers);
      newConnection.model('configurations', configurations);
      newConnection.model('payments', payments);
      newConnection.model('transactions', transactions);
      newConnection.model('comments', comments);
      newConnection.model('banks', banks);
      newConnection.model('tickets', tickets);
      newConnection.model('countries', countries);
      newConnection.model('newsletter-users', newsletterUsers);
      return newConnection;
    }
    console.log('=> using existing database connection');
    return conn;
  } catch (err) {
    console.log('error: ', [err]);
    throw err;
  }
};
