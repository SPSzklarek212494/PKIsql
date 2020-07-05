
const { google } = require('googleapis');
const express = require('express');
const OAuth2Data = require('./google_key.json');

//const {Pool,Client} = require('pg');


const app = express();
app.use(express.static('public'));




const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
var authed = false;
	



const {Pool,Client} = require('pg')
const DATABASE_URL = 'postgres://ezaugnndofozrk:24532f65a8309ce140e316c55dff161933806223af7edb1df30629bda5c85b58@ec2-54-247-103-43.eu-west-1.compute.amazonaws.com:5432/dbmr5h1lajh04j';


const pool = new Pool({
	/*user:"ezaugnndofozrk",
	host:"ec2-54-247-103-43.eu-west-1.compute.amazonaws.com",
	database:"dbmr5h1lajh04j",
	password:"24532f65a8309ce140e316c55dff161933806223af7edb1df30629bda5c85b58",
	port:5432*/
	connectionString: process.env.DATABASE_URL
})
pool.connect();

var ilosc = 0;

pool.query("SELECT id,name,joined,counter,lastvisit from public.users",(err,res)=>{
		//console.log(err,res)
	console.log("ILOSC");
	//ilosc = res.rows.length;
	for (let row of res.rows) {
		console.log(JSON.stringify(row));
	}
		
	pool.end()
})


app.get('/', (req, res) => {


res.send(ilosc.toString());
});

app.listen(process.env.PORT || 5000, function(){ console.log('Server running at ${port}')});