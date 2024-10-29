const { readFileSync, writeFileSync } = require("fs");

const filePathToTempFile = "./temporary/fileA.txt";
writeFileSync(filePathToTempFile, "First line \n");
writeFileSync(filePathToTempFile, "Second line \n", { flag: "a" });
writeFileSync(filePathToTempFile, "Third line \n", { flag: "a" });

const fileContent = readFileSync(filePathToTempFile, "utf-8");
console.log(fileContent);
