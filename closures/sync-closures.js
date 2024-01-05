#!/usr/bin/env node
import { login, logout, authorization } from './sumup.js'
import {
  date,
  yesterday,
  tomorrow,
  lastOctoberUK,
  ordinalDate,
  ukDateFormat,
} from './dates.js'
import { info, error, log } from 'node:console'
import { writeFileSync } from 'node:fs'
import memoize from 'lodash.memoize'
import { registers, registerClosures } from './register-closures.js'

const startDate = async () => {
  // check the date of the latest closure in the database.
  // if there are no entries in the database, use the start of the financial year
  // which for WWSC is 1st October

  // return lastOctoberUK
  return yesterday
}

const saveClosures = async (closures) => {
  for (const closure of closures) {
    const saveDate = date(closure.time_to).format('YYYY-MM-DD')
    const register = closure.register_name.toLowerCase().replace(' ', '-')
    const filename = `./model/json/${saveDate}-${register}-${closure.id}.json`
    console.log(`saving closure ${saveDate}`)
    writeFileSync(filename, JSON.stringify(closure, null, 2))
  }
}

const saveFormattedClosures = async (closures) => {
  for (const closure of closures) {
    const saveDate = date(closure.to).format('YYYY-MM-DD')
    const register = closure.register.toLowerCase().replace(' ', '-')
    const filename = `./model/json/${saveDate}-${register}-${closure.id}.formatted.json`
    console.log(`saving formatted closure ${saveDate}`)
    writeFileSync(filename, JSON.stringify(closure, null, 2))
  }
}

const sync = async () => {
  try {
    await login()
    const start = await startDate()
    let syncDate = start
    while (syncDate.isBefore(tomorrow)) {
      let closures = await registers(syncDate)
      closures && (await saveClosures(closures.data))
      closures = closures
        ? await registerClosures(syncDate.format(ukDateFormat))
        : closures
      closures && (await saveFormattedClosures(closures))
      syncDate = syncDate.add(1, 'day')
    }
    await logout()
  } catch (e) {
    error(`sync closures failed ${e.message}`)
    await logout()
  }
}

await sync()
