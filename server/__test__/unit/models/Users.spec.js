const User = require('../../../models/User');

const db = require('../../../database/connect');

describe('User', () => {
  beforeEach(() => jest.clearAllMocks())

  afterAll(() => jest.resetAllMocks())

  describe('getAll', () => {
    test('it resolves with users on successful db query', async () => {

        jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
            rows: [
                { users_id: 1, username: "user1", first_name: "first name", last_name: "last name", phone_number: 34254454, email: "email@example.com", above18: true, borough: "Bigfoot", password: "password 1", image_url:"https://example.com/example.jpg" },
                { users_id: 2, username: "user2", first_name: "first name", last_name: "last name", phone_number: 97878787, email: "email@example.com", above18: true, borough: "Bigfoot", password: "password 2", image_url:"https://example.com/example.jpg" },
                { users_id: 3, username: "user3", first_name: "first name", last_name: "last name", phone_number: 12313131, email: "email@example.com", above18: true, borough: "Bigfoot", password: "password 3", image_url:"https://example.com/example.jpg" }
            ]
        });

      const all = await User.getAll();
      expect(all).toHaveLength(3)
    })
  });

  describe('findById', () => {
    test('it resolves with user on successful db query', async () => {
      let userData = { users_id: 1, username: "user1", first_name: "first name", last_name: "last name", phone_number: 34254454, email: "email@example.com", above18: true, borough: "Bigfoot", password: "password 1", image_url:"https://example.com/example.jpg" }
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [userData] });

      const result = await User.getOneByUsername(1);
    //   console.log("b", result)

      expect(result).toBeInstanceOf(User)
      expect(result.id).toBe(1);
    })
  });

  describe('create', () => {
    test('it resolves with user on successful db query', async () => {
      let userData = { users_id: 1, username: "user1", first_name: "first name", last_name: "last name", phone_number: 34254454, email: "email@example.com", above18: true, borough: "Bigfoot", password: "password 1", image_url:"https://example.com/example.jpg" }

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [{ ...userData}] });
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [userData] });

      const result = await User.create(userData);
      expect(result).toHaveProperty('name')
    })
  });

})
