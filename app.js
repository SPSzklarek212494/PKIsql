
const { google } = require('googleapis');
const express = require('express');
const OAuth2Data = require('./google_key.json');

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
	connectionString: process.env.DATABASE_URL
})
pool.connect();
var tab2;

pool.query("SELECT id,name,joined,counter,lastvisit from public.users",(err,res)=>{
	tab2 = res.rows;
	pool.end()
})

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



			res.send('<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>'
			+'<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />'
			+'Logged in: '+loggedUser+' <img src="'+result.data.picture+'"height="23" width="23">'
			+'<h3 style="color: red">TABELA DANYCH Z PosgreSQL</h3>'
			+'<table class="table table-bordered table-striped" style="color: green" id="my_table" >'
			+ '<tr>'
			+    '<th>ID</th>'
			+    '<th>Name</th>'
			+    '<th>Joined</th>'
			+	'<th>Counter</th>'
			+	'<th>Last visit</th>'
			+  '</tr>'
			+ '</table>'
			+ '<script>'
			+	'var dane1 = '
			+JSON.stringify(tab2)
			+';'
			+	'for(let row of dane1) {$("#my_table").append("<tr>'
			+	  '<td>"+row.id+"</td>'
			+	  '<td>"+row.name+"</td>'
			+	  '<td>"+row.joined+"</td>'
			+	  '<td>"+row.counter+"</td>'
			+	  '<td>"+row.lastvisit+"</td>'
			+	  '</tr>");}'
			+'</script>');
			});
    }

});

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

app.listen(process.env.PORT || 5000, function(){ console.log('Server running at ${port}')});