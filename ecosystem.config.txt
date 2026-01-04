// use this file with the MP2 to automatically start application when it 
// shuts down or server restarts


module.exports = {
  apps : [{
    name   : "feedcalculator",
    script : "node_modules/next/dist/bin/next",
    args : "start -p 8000"
  }]
}
