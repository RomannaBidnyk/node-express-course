const { writeFile, readFile } = require("fs").promises;

const fileName = "temp.txt";

async function writer() {
  try {
    await writeFile(fileName, "First line \n");
    await writeFile(fileName, "Second line \n", { flag: "a" });
    await writeFile(fileName, "Third line \n", { flag: "a" });
  } catch (error) {
    console.log("Error occurred: ", error);
  }
}

async function reader() {
  try {
    const fileContent = await readFile(fileName, "utf-8");
    console.log(fileContent);
  } catch (error) {
    console.log("Error occurred: ", error);
  }
}

async function readWrite() {
  await writer();
  await reader();
}

readWrite();
