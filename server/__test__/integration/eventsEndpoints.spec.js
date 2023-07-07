const { setupTables, destroyDbEnv } = require('../../database/setup-test-db')

describe('participate endpoints', () => {
  let api;

  beforeEach(async () => {
    await setupTables()
  
  })

  afterEach(async () => {
    await destroyDbEnv()
  })
  
  beforeAll(async () => {
    api = app.listen(5000, () => console.log('Test server running on port 5000'))
  });
  

  afterAll(async () => {
    console.log('Gracefully stopping test server')
    await api.close()
  })

  it('should retrieve a event based on id', async () => {
    const res = await request(app).get('/events/1')
    expect(res.statusCode).toEqual(200)
    expect(res.body.event_name).toEqual('Community Cleanup Day')
  });

})
