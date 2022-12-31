require('dotenv').config();
const { app, PORT } = require('./controller/config');

// Carrega a API
require('./controller');


// Serving public files
//app.use(express.static(__dirname));

// Configura o servidor para aguardar por conexões
app.listen(PORT, () => {
  console.log(`[*] Server listening on port \`${PORT}\` (http://localhost:${PORT})`);
});
