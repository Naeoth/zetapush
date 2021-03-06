describe('WeakClient', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000

  const platformUrl = 'http://api.zpush.io/'
  const appName = 'bcu1JtRb'

  beforeEach(() => {
    this.client = new ZetaPushClient.WeakClient({
      platformUrl: platformUrl,
      appName: appName
    })
  })

  describe('Initial state', () => {
    it('Should correctly create a WeakClient object', () => {
      expect(typeof this.client).toBe('object')
      expect(this.client instanceof ZetaPushClient.WeakClient).toBeTruthy()
    })

    it('Should not be connected', () => {
      expect(this.client.isConnected()).toBeFalsy()
    })

    it('Should have a nul userId', () => {
      expect(this.client.getUserId()).toBeNull()
    })

    it('Should have a correct appName', () => {
      expect(this.client.getAppName()).toBe(appName)
    })
  })

  describe('Connection', () => {
    it('Should connect', (done) => {
      const client = this.client
      client.connect()
        .then(() => expect(client.isConnected()).toBeTruthy())
        .then(() => done())
    })
  })

  describe('WeakClient deconnection', () => {
    it('Should connect and disconnect', (done) => {
      const client = this.client
      client.connect()
        .then(() => expect(client.isConnected()).toBeTruthy())
        .then(() => client.disconnect())
        .then(() => expect(client.isConnected()).toBeFalsy())
        .then(() => done())
    })
  })

  describe('Session persistence', () => {
    it('Should keep user session between connections', (done) => {
      const client = this.client
      const sessions = []
      client.addConnectionStatusListener({
        onConnectionEstablished() {
          expect(client.isConnected()).toBeTruthy()
          if (sessions.length < 2) {
            client.disconnect()
          } else {
            const first = sessions[0]
            const second = sessions[1]
            expect(first.userId).toBeDefined()
            expect(second.userId).toBeDefined()
            expect(first.userId).toBe(second.userId)
            done()
          }
        },
        onConnectionClosed() {
          expect(client.isConnected()).toBeFalsy()
          if (sessions.length < 2) {
            client.connect()
          }
        },
        onSuccessfulHandshake(session) {
          sessions.push(session)
        }
      })
      client.connect()
    })
  })
})
