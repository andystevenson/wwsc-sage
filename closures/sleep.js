// sleep
// usage: await sleep(milliseconds)
const sleep = (delay = 1000) =>
  new Promise((resolve) => setTimeout(resolve, delay))
