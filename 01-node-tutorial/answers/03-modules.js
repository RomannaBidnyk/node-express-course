const names = require("./04-names.js");
const sayHi = require("./05-utils.js");
const data = require("./06-alternative-flavor.js");

sayHi("Susan");
sayHi(names.julia);
sayHi(names.jose);
sayHi(names.victoria);
sayHi(data.multipleNames[0]);
sayHi(data.singlePerson.name);

require("./07-mind-grenade.js");
