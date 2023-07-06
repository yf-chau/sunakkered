const { setupTables, destroyDbEnv } = require('../../database/setup-test-db')

describe('users endpoints', () => {
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

  it('should retrieve a users based on id', async () => {
    const res = await request(app).get('/users/1')
    expect(res.statusCode).toEqual(200)
    expect(res.body.name).toEqual('john_doe')
  });

})