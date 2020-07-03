
const { google } = require('googleapis');
const express = require('express');
const OAuth2Data = require('./google_key.json');

//const {Pool,Client} = require('pg');
const { Client } = require('pg');

const app = express();
app.use(express.static('public'));

const DATABASE_URL = 'postgres://ezaugnndofozrk:24532f65a8309ce140e316c55dff161933806223af7edb1df30629bda5c85b58@ec2-54-247-103-43.eu-west-1.compute.amazonaws.com:5432/dbmr5h1lajh04j';


const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
var authed = false;
/*
const client = new Pool({
		connectionString: process.env.DATABASE_URL,
	});
	
	const getUsers = (request, response) => {
		console.log('Pobieram dane ...');
		client.query('SELECT * FROM public."Users"', (error, res) => {
		if (error) {
			throw error
		}
		console.log('Dostałem ...');
		for (let row of res.rows) {
			console.log(JSON.stringify(row));
		}
	});}
	*/
	
	
app.get('/', (req, res) => {

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT * FROM public."users"', (err, res) => {
console.log('666666666666666');
  //if (err) {throw err}
  
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});	
		

res.send('Hello!!!!!!!');});

app.listen(process.env.PORT || 5000, function(){ console.log('Server running at ${port}')});




//app.listen(process.env.PORT || 5000, function(){ console.log('Server running at ${port}')});

/*
app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
*/

/*
const { google } = require('googleapis');
const express = require('express');
const OAuth2Data = require('./google_key.json');
//const { Client } = require('pg');
const Client = require('pg').Pool;

const app = express();
//app.use(express.static('public'));


const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
var authed = false;


app.get('/', (req, res) => {
    if (!authed) {
        // Generate an OAuth URL and redirect there
        const url = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile'
        });
        console.log(url);
        res.redirect(url);
    } else {
        var oauth2 = google.oauth2({auth: oAuth2Client, version: 'v2'});
		oauth2.userinfo.v2.me.get(function(err, result){
			if(err){
				console.log('Niestety BLAD!!');
				console.log(err);
			}else{
				loggedUser = result.data.name;
				console.log(loggedUser);
			}
			res.send('Logged in: '.concat(loggedUser, ' <img src="', result.data.picture,
			'"height="23" width="23">'));
			
			
			const client = new Pool({
				connectionString: process.env.DATABASE_URL,
			});
			
			client.connect();
			
		const getUsers = (request, response) => {
		console.log('Pobieram dane ...');
		client.query('SELECT * FROM public."Users"', (error, res) => {
				if (error) {
					throw error
				}
				console.log('Dostałem ...');
				for (let row of res.rows) {
					console.log(JSON.stringify(row));
				}
			})
		}
						
		});
    }
})

app.get('/auth/google/callback', function (req, res) {
    const code = req.query.code;
    if (code) {
        // Get an access token based on our OAuth code
        oAuth2Client.getToken(code, function (err, tokens) {
            if (err) {
                console.log('Error authenticating');
                console.log(err);
            } else {
                console.log('Successfully authenticated');
                oAuth2Client.setCredentials(tokens);
                authed = true;
                res.redirect('/');
				
            }
        });
    }
});


//const port = process.env.port || 5000;
app.listen(process.env.PORT || 5000, function(){ console.log('Server running at ${port}')});
*/