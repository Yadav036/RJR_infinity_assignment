const express = require('express');
const rootRouter = require('./routes/index'); 

const app = express();

app.use(express.json());
app.use("/api/v1", rootRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
