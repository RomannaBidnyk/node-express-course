const os = require("os");

console.log(`User info:`, os.userInfo());

const currentOS = {
  name: os.type(),
  release: os.release(),
  platform: os.platform(),
  machine: os.machine(),
  version: os.version(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
};

console.log(`Current OS:`, currentOS);
