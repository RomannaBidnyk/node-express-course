const { createReadStream } = require("fs");

const filePath = "../content/big.txt";

const stream = createReadStream(filePath, {
  encoding: "utf8",
  highWaterMark: 200,
});

let counter = 0;

stream.on("data", (result) => {
  counter++;
  console.log(result);
});

stream.on("end", () => {
  console.log(`Chunks received: ${counter}`);
});

stream.on("error", (err) => console.log(err));
