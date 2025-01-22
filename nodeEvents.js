const EventEmitter = require("events")
class MyEmmiter extends EventEmitter{}
const myEmmiter = new MyEmmiter();

myEmmiter.on("WaterFull", ()=>{
    console.log("Turn OFF the motor")

    setTimeout(()=>{
        console.log("Please Turn OFF the motor! it's gentle remainder")
    },3000)
})
console.log("Script Running")
myEmmiter.emit("WaterFull")
console.log("Script is STILL Running")
