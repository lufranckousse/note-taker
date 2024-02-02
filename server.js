const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');
const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
apiRoutes(app)
// Mount the HTML routes
app.use('/', htmlRoutes);

// Mount the API routes
app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
