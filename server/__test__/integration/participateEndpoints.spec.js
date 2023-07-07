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

  it('should retrieve a participant based on id', async () => {
    const res = await request(app).get('/participate/1')
    expect(res.statusCode).toEqual(200)
    expect(res.body.first_name).toEqual('John')
  });
  
  // it('should retrieve all participant', async () => {
  //   const res = await request(app).get('/participate')
  //   expect(res.statusCode).toEqual(200)
  //   expect(res.body)
  // });

  it('responds to an unkown participate with a 404 ', async () => {
    const res = await request(app).get('/participate/56')
    expect(res.statusCode).toEqual(404)
  });

})

