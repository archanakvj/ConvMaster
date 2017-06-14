
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
							createdDate: new Date(),
							AccountID: process.env.SFORCE_CASE_ACCOUNTID};
		  	console.log(dataToInsert);
			sharedPgClient.query('INSERT INTO Salesforce.case(Subject, createdDate, AccountID) values($1, $2, $3)',
		    [dataToInsert.subject, dataToInsert.createdDate.getMonth() + "/" + dataToInsert.createdDate.getDay() + "/" + dataToInsert.createdDate.getFullYear() + " " 
		    + dataToInsert.createdDate.getHours() + ":" + dataToInsert.createdDate.getMinutes() + ":" + dataToInsert.createdDate.getSeconds(), dataToInsert.accountID], (err, res) => {
		    	if (err) {
    				console.log(err.stack)
  				} else {
    				console.log(res.rows[0])
  				}
		    });

		    

		    console.log("Releasing Postgres connection");
		    sharedPgClient.end();
		}
		else {
			console.log("No connection available, check your db url");
		}

	}
}

