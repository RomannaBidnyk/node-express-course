const { readFile, writeFile } = require("fs");

const filePathToTempFile = "./temporary/fileB.txt";

console.log("at start");

writeFile(filePathToTempFile, "First line \n", (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("done with first line");

  writeFile(
    filePathToTempFile,
    "Second line \n",
    { flag: "a" },
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("done with second line");

      writeFile(
        filePathToTempFile,
        "Third line \n",
        { flag: "a" },
        (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("done with third line");
        }
      );
    }
  );
});

console.log("at end");
