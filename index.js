const express = require("express");
const app = express();

//

app.get("/api/test", (request, response) => {
    const data = ["apple", "banana", "orange"];
    response.json(data);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
