const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("response", () => {
  console.log("Data received");
});

emitter.on("sayHi", (name) => {
  console.log(`Hi, ${name}!`);
});

emitter.on("eventWithTimer", () => {
  console.log("This is delayed event, repeated");
});

emitter.emit("response");
emitter.emit("sayHi", "John");
setInterval(() => {
  emitter.emit("eventWithTimer");
}, 2000);
