const { writeFile, readFile } = require("fs").promises;

const fileName = "temp.txt";

writeFile(fileName, "1 First line \n")
  .then(() => {
    return writeFile(fileName, "2 Second line \n", { flag: "a" });
  })
  .then(() => {
    return writeFile(fileName, "3 Third line \n", { flag: "a" });
  })
  .then(() => {
    return readFile(fileName, "utf-8");
  })
  .then((fileContent) => {
    console.log(fileContent);
  })
  .catch((error) => console.log("Error occurred: ", error));
