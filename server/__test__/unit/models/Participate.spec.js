const Participate = require('../../../models/Participate');

const db = require('../../../database/connect');

describe('Participate', () => {
  beforeEach(() => jest.clearAllMocks())

  afterAll(() => jest.resetAllMocks())

  describe('getAll', () => {
    test('it resolves with participate on successful db query', async () => {

        jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
            rows: [
                {participate_id: 1, first_name: "first name", last_name: "second name", phone_number: null  },
                {participate_id: 2, first_name: "first name", last_name: "second name", phone_number: null  },
                {participate_id: 3, first_name: "first name", last_name: "second name", phone_number: null  }
            ]
        });

      const all = await Participate.getAll();
      expect(all).toHaveLength(3)
    })
  });

  describe('findById', () => {
    test('it resolves with participant on successful db query', async () => {
      let participantData =  {participate_id: 1, first_name: "first name", last_name: "second name", phone_number: null }
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [participantData] });

      const result = await Participate.getOneByParticipantId(1);
    //   console.log("b", result)

      expect(result).toBeInstanceOf(Participate)
      expect(result.id).toBe(1);
    })
  });

  describe('create', () => {
    test('it resolves with participant on successful db query', async () => {
      let participantData = {participate_id: 1, first_name: "first name", last_name: "second name", phone_number: null }

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [{ ...participantData}] });
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [participantData] });

      const result = await Participate.create(participantData);
      expect(result).toHaveProperty('first_name')
    })
  });

})
