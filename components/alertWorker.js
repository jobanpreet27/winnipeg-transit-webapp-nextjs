const { resolve } = require("path");
const { workerData } = require("worker_threads");
const { num, message } = workerData;

const timer = () => new Promise((res) => setTimeout(res, 10000));
async function load() {
  for (let i = 0; i < num; i++) {
    console.log(message, i);
    await timer();
  }
}
load();
