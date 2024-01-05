import { registerClosures } from './register-closures.js'

// this is the process controller for register-closures

// 2 jobs will run continuously.markdown-section
// Job 1: Sync
// -  look at the current time (if it is betweem 02:30-04:30) then do nothing as this
//    is the scheduled time for the Daily Job to run and we do not want them to overlap.
// -  if still running,
//    look at the last closure entry made in the database, mark its close time
//    and gather all closures from that time till the end of the following day.
// -  write the closures to the database
// -  run every 10 minutes
//
// Job 2: Nightly
// -  gather all the closures from the start of the previous day up till the present time.
// -  write the closures to the database

import { CronJob } from 'cron'

const everyHour = '0 * * * *'
const every10Minutes = '*/10 * * * *'
const everyMinute = '* * * * *' // for debug

const hourly = CronJob.from({
  cronTime: everyHour,
  onTick: async function () {
    const now = new Date()
    console.log(`hourly job at ${now.toISOString()}, ${now.getTime()}`)
  },
  timeZone: 'Europe/London',
})

hourly.start()

const every10 = CronJob.from({
  cronTime: every10Minutes,
  onTick: async function () {
    const now = new Date()
    console.log(`every 10 job at ${now.toISOString()}, ${now.getTime()}`)
  },
  timeZone: 'Europe/London',
})

every10.start()

const sync = CronJob.from({
  cronTime: everyMinute,
  onTick: async function () {
    const now = new Date()
    console.log(`syncing job at ${now.toISOString()}, ${now.getTime()}`)
  },
  timeZone: 'Europe/London',
})

sync.start()

const syncTimes = sync.nextDates(10)
console.log({ syncTimes })
