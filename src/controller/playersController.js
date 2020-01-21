
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:PlayersControllers')
const chalk = require('chalk')

function PlayersController(){
    function insertPlayers(req, res){
        const url = 'mongodb://localhost:27017';
        const dbName = 'tick-tack-nodeApp';
    
        (async function mongo() {
          let client;
          try {
            client = await MongoClient.connect(url);
            debug('Connected correctly to the server');
    
            const db = client.db(dbName);
            await db.collection('players').deleteMany({});
            const arr = Object.values(req.body);
            
            const response = await db.collection('players').insertOne({ players: arr });
          } catch (err) {
            debug(err.stack);
          }
          client.close();
        }());
        res.render('index')
    }

    function getPlayers(req, res) {
        const url = 'mongodb://localhost:27017';
        const dbName = 'tick-tack-nodeApp';
        (async function returnPlayers(){
          let client;
          try{
            client = await MongoClient.connect(url);
            debug(chalk.green('Connected correctly to the server'));
        
            const db = client.db(dbName);
            const col = db.collection('players');
            res.json(await col.findOne());
          }
          catch(err){
            debug(err.stack);
          }
          client.close();
        }());
    }

    return { insertPlayers, getPlayers };
}

module.exports = PlayersController;