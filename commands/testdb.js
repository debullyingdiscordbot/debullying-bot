// const mongoose = require('mongoose');
// const igdb = require('igdb-api-node');
const axios = require('axios').default;
const User = require('../database/models/user');
const { getUser } = require('../database/MongoDB');

module.exports = {
  name: 'testdb',
  description: 'testing db connection',
  async execute(message, args, client) {
    // console.log(message.author);

    // todos: search db if user exist, if not, create
    // console.log(process.env.IGDB_ACCESS_TOKEN);
    try {
      const res = await axios({
        url: 'https://api.igdb.com/v4/games/',
        method: 'POST',
        headers: {
          // Accept: 'application/json',
          Client_ID: process.env.IGDB_CLIENT_ID,
          Authorization: 'Bearer ' + process.env.IGDB_ACCESS_TOKEN,
        },
        data: 'fields *',
      });
      console.log(res);

      // console.log(user);
    } catch (error) {
      console.error(error);
    }
  },
};
