const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')

describe('Application launch', function () {

  this.timeout(10000)

  beforeEach(function () {
      
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..')]
    })
    return this.app.start()
  })

  afterEach(function () {
    if (this.app && this.app.running) {
      return this.app.stop()
    }
  })

  it('shows an initial window', function () {
      return this.app.client.getText('#h').then(function (hText) {
          assert.equal("Privatix dapp", hText)
      })

  })

})
