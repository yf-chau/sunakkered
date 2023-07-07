const Event = require('../../../models/Event');

const db = require('../../../database/connect');

describe('Event', () => {
  beforeEach(() => jest.clearAllMocks())

  afterAll(() => jest.resetAllMocks())

  describe('getAll', () => {
    test('it resolves with event on successful db query', async () => {

        jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
            rows: [
                { event_id: 1, event_name: 'Community Cleanup Day', event_start_date: '2023-07-15', event_start_time: '09:00:00', event_end_date: '2023-07-15', event_end_time: '12:00:00', event_description: 'Join us in cleaning up our neighborhood!', location: 'City Park', category: 'Community Service', organiser_id: 1, participant_id: 1, approval: false, needVolunteer: true, volunteer_num: 10 },
                { event_id: 2, event_name: 'Community Cleanup Day', event_start_date: '2023-08-15', event_start_time: '09:00:00', event_end_date: '2023-08-15', event_end_time: '11:00:00', event_description: 'Join us in cleaning up our neighborhood!', location: 'City Park', category: 'Community Service', organiser_id: 2, participant_id: 2, approval: false, needVolunteer: true, volunteer_num: 11 },
                { event_id: 3, event_name: 'Community Cleanup Day', event_start_date: '2023-09-15', event_start_time: '09:00:00', event_end_date: '2023-09-15', event_end_time: '10:00:00', event_description: 'Join us in cleaning up our neighborhood!', location: 'City Park', category: 'Community Service', organiser_id: 3, participant_id: 3, approval: false, needVolunteer: true, volunteer_num: 12 }
            ]
        });

      const all = await Event.getAll();
      expect(all).toHaveLength(3)
    })
  });

  describe('getOneByEventId', () => {
    test('it resolves with event on successful db query', async () => {
      let eventData = { event_id: 1, event_name: 'Community Cleanup Day', event_start_date: '2023-07-15', event_start_time: '09:00:00', event_end_date: '2023-07-15', event_end_time: '12:00:00', event_description: 'Join us in cleaning up our neighborhood!', location: 'City Park', category: 'Community Service', organiser_id: 1, participant_id: 1, approval: false, needVolunteer: true, volunteer_num: 10 }
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [eventData] });

      const result = await Event.getOneByEventId(1);
    //   console.log("b", result)

      expect(result).toBeInstanceOf(Event)
      expect(result.id).toBe(1);
    })
  });

  describe('create', () => {
    test('it resolves with event on successful db query', async () => {
      let eventData = { event_id: 1, event_name: 'Community Cleanup Day', event_start_date: '2023-07-15', event_start_time: '09:00:00', event_end_date: '2023-07-15', event_end_time: '12:00:00', event_description: 'Join us in cleaning up our neighborhood!', location: 'City Park', category: 'Community Service', organiser_id: 1, participant_id: 1, approval: false, needVolunteer: true, volunteer_num: 10 }

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [{ ...eventData}] });
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [eventData] });

      const result = await Event.create(eventData);
      expect(result).toHaveProperty('name')
    })
  });

})
