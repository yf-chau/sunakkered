const request = require ('supertest')
const app = require('../app')

describe('api server', () => {
    let api;

    beforeAll(() => {
        api = app.listen(5000, () => {
            console.log('Test server running on port 5000')
        })
    })

    afterAll((done) => {
        console.log('Stopping test server')
        api.close(done)
    })

    test ('it responds to get/ with status 200', (done) => {
        request(api)
            .get('/')
            .expect(200,done)
    })

    test('responds to invalid method with 404', (done) => {
        request(api)
            .post('/')
            .expect(404, done)

    })
    
})