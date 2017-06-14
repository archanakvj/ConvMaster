
/* caldama: simple heroku connect createCase sample */

require('dotenv').config({
  silent: true
});

module.exports = {
  caseCreate: function (data) {
	  pg = require("pg");
		/*
		* PG Client connection
		*/
		pg.defaults.ssl = true;

		var dbString = process.env.DATABASE_URL || 'postgres://localhost:5432/salesforce';

		console.log ("DBSTRING is" + dbString);
		var sharedPgClient = new pg.Client(dbString);
    	sharedPgClient.on('error', function(error) {
      			console.log(error);
    	}); 
		
		// sharedPgClient.connect();
		// , function(err,client){
		//     if(err){
		//         console.error("PG Connection Error:" + err)
		//         return;
		//     }
		//     console.log("Got  Postgres connection");
		//     sharedPgClient = client;
		//     /* Error handling*/
		//     sharedPgClient.on('error', function(error) {
  //     			console.log(error);
  //   		});    
		// });

		if (sharedPgClient) {
			const dataToInsert = {subject: process.env.SFORCE_CASE_SUBJECT, 
							createdDate: process.env.SFORCE_CASE_DATE || Date.now(),
							AccountID: process.env.SFORCE_CASE_ACCOUNTID};
		  	console.log(dataToInsert);
			sharedPgClient.query('INSERT INTO Salesforce.case(Subject, createdDate, AccountID) values($1, $2, $3)',
		    [dataToInsert.subject, dataToInsert.createdDate, dataToInsert.accountID]);

		    

		    console.log("Releasing Postgres connection");
		    done();
		}
		else {
			console.log("No connection available, check your db url");
		}

	}
}

