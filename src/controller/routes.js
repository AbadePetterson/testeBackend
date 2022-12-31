const { app, loginRequired } = require('./config');
const { accounts } = require('./accounts');
const { business } = require('./business');
const home = require('./home');


// login required on all endpoints
//app.use(loginRequired);

app.get('/', home);
app.use('/accounts', accounts);
app.use('/business', business);
