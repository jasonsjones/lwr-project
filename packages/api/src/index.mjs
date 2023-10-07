import 'dotenv/config';
import { app } from './server.mjs';

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`LWR api listening on port ${port}`);
});
