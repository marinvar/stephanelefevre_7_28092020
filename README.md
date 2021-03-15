# stephanelefevre_7_28092020  

## frontend and backend for social network  

Once this repository cloned:  

1. For backend  
- go to backend directory in your console
- add .env file received separately in main directory  
Or you can use the .env_backup file as model  
- Change information in .env file to match your installation  
DB_NAME is your MySQL database name  
DB_USER is your MySQL user name to connect with  
DB_PASSWORD is your MySQL password to connect with  
DB_HOST is your host name (i.e. localhost)  
TOKEN_PASS is a strong passphrase  
(i.e. 65g45h4j7o8ll31sz14nd1kuj69j45lqg14g36qd7g9ds3sd8gh1fd2) to encode unidirectionnaly the password  
EMAIL_PASS is a strong passphrase different than above one to encode bidirectionnaly the email  
PSEUDO_PASS is a strong passphrase different than above ones to encode bidirectionnaly the pseudo  
PERSIST_TIME is the time of the token validity for authentication, expressed in seconds or a string describing a time span (i.e. 60 or '24h'or '7d' or '7 days')  
- run `npm install`
- run `npm start`  
> server is watching on localhost:3000 if available

2. For frontend,  
- go to frontend directory in your console
- run `npm install`
- run `npm run serve`  
> app is served on localhost:8080  

3. A complete check of html5 and WCAG rules can be done easily, as HTML-validate is installed as a dependency (https://html-validate.org/)
- to make checkup, on command line in frontend directory, use vue/cli by typing :  
`npm run html-validate`

Enjoy playing with your social network !!!
