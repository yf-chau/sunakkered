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
            .expect(200, done)
    })

    test('responds to invalid method with 404', (done) => {
        request(api)
            .post('/')
            .expect(404, done)

    })

    test('responds to posts /users with status 201', (done) =>
    {

    })

    test('responds to delete /users/:id with status 204', (done) => {
        request(api)
            .delete('/users/1')
            .expect(204, done)


    })

    test('responds to an unkown users id with a 404', (done) => {
        request(api)
            .get('/users/86')
            .expect(404, done)


    })
    
})

