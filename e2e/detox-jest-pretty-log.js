class MyCustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }
  onRunComplete(contexts, results) {
    const trimregex = /[\s\S]+?(?=Hierarchy)/
    let tally = {passes: 0, failures: 0}
    const tests = []

    results.testResults.forEach(TestResult => {
      TestResult.testResults.forEach(AssertionResult => {
        logAssertionResult(AssertionResult, tally, tests, trimregex)
      })
    })
    logSummary(tally.passes, tally.failures, tests)
  }
}

const logAssertionResult = (AssertionResult, tally, tests, trimregex) => {
  const { ancestorTitles, title, duration, status, failureMessages } = AssertionResult
  let trimmedMessage = null
  const test = `${ancestorTitles[0]} \n ${title} -- ${status} in ${duration} ms \n`

  if (status == 'passed') {
    tally.passes++
    tests.push({ pass: true, test })
    console.log(greenString(test))
  } else if (status == 'failed') {
    tally.failures++
    tests.push({ pass: false, test })
    trimmedMessage = trimregex.exec(failureMessages[0])
    console.log(`${redString(test)} \n ${trimmedMessage} `)
  }
}
const logSummary = (passes, failures, tests) => {
  console.log(`\nTests passed ${greenString(passes)} out of ${passes + failures}\n`)
  tests.forEach(r => {
    r.pass
      ? console.log(greenString(r.test))
      : console.log(redString(r.test))
  })
}

const greenString = (msg) => {
  return `\x1b[32m${msg}\x1b[0m`
}
const redString = (msg) => {
  return `\x1b[31m${msg}\x1b[0m`
}

module.exports = MyCustomReporter;