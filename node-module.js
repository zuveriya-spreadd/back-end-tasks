// function Hello(name){
//     console.log("Hello " + name)
// }
// Hello("Zuveriya")
// var logger = require("./logger")
// console.log(logger)

// logger("Zuveriya")
// console.log(module)

// path module
const path = require("path")
const pathObj = path.parse(__filename)
console.log(pathObj)


// os module
const os = require("os");
const totalMem = os.totalmem();
const FreeMem = os.freemem();
console.log(`Total Memory ${totalMem} and Free Memory ${FreeMem}`);
console.log(os.hostname());
console.log(os.platform());
console.log(os.type());


// events modul
const EventEmitter = require("events")
const emitter = new EventEmitter()

emitter.on("eventLogged", function(){
    console.log("Listener")
})

emitter.emit("eventLogged")
