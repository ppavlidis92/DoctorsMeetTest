git commit -am "make it better"# ConcertApp
# concertApp

for heroku
- enc variables at settings -->Config Vars
const JWT_KEY = 'JWT_KEY_AUTH';

const mongoURI = process.env.MONGODB_URI ||'mongodb+srv://admin:admin@chatbot-test-shared.48emm.mongodb.net/Concert?retryWrites=true&w=majority'
