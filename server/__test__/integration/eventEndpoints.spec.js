const { setupTables, destroyDbEnv } = require('../../database/setup-test-db')

describe('event endpoints', () => {
  let api;

  beforeEach(async () => {
    await setupTables()
  })

  afterEach(async () => {
    await destroyDbEnv()
  })
  
  beforeAll(async () => {
    api = app.listen(5002, () => console.log('Test server running on port 5000'))
  });
  

  afterAll(async () => {
    console.log('Gracefully stopping test server')
    await app.close
  })

  it('Retrieve an event based on id', async () => {
    const res = await request(app).get('/events/1')
    expect(res.statusCode).toEqual(200)
    expect(res.body.event_name).toEqual('Community Cleanup Day')
  });

})
