const eventController = require('../../../controllers/events')
const Event = require('../../../models/Event');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('event controller', () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe('index', () => {
    test('it returns event with a 200  status code', async () => {
        let event = [{
            event_id: 1,
            event_name: 'Community Cleanup Day',
            event_start_date: '2023-07-15',
            event_start_time: '09:00:00',
            event_end_date: '2023-07-15',
            event_end_time: '12:00:00',
            event_description: 'Join us in cleaning up our neighborhood!',
            location: 'City Park',
            category: 'Community Service',
            organiser_id: 1,
            participant_id: 1,
            approval: false,
            needVolunteer: true,
            volunteer_num: 10
        }]
        jest.spyOn(Event, 'getAll').mockResolvedValue(event);
        await eventController.index(null, mockRes);
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith(event);
    });
      
    
    describe('show', () => {
        test('it returns a event with a 200 status code', async () => {
        let testEvent = {
            event_id: 1,
            event_name: 'Community Cleanup Day',
            event_start_date: '2023-07-15',
            event_start_time: '09:00:00',
            event_end_date: '2023-07-15',
            event_end_time: '12:00:00',
            event_description: 'Join us in cleaning up our neighborhood!',
            location: 'City Park',
            category: 'Community Service',
            organiser_id: 1,
            participant_id: 1,
            approval: false,
            needVolunteer: true,
            volunteer_num: 10
        }
            
        jest.spyOn(Event, 'getOneByEventId')
            .mockResolvedValue(new Event(testEvent));

        const mockReq = { params: { id: 1 } }
        await eventController.show(mockReq, mockRes);
        expect(mockStatus).toHaveBeenCalledWith(200);
        // expect(mockJson).toHaveBeenCalledWith(new User(testUser));
        })
    });
  });

   describe('create', () => {
    test('it returns a new event with a 201 status code', async () => {
        let testEvent = {
            event_id: 1,
            event_name: 'Community Cleanup Day',
            event_start_date: '2023-07-15',
            event_start_time: '09:00:00',
            event_end_date: '2023-07-15',
            event_end_time: '12:00:00',
            event_description: 'Join us in cleaning up our neighborhood!',
            location: 'City Park',
            category: 'Community Service',
            organiser_id: 1,
            participant_id: 1,
            approval: false,
            needVolunteer: true,
            volunteer_num: 10
        }
           
      jest.spyOn(Event, 'create')
        .mockResolvedValue(new Event(testEvent));

      const mockReq = { body: testEvent }
      await eventController.create(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(new Event(testEvent));
    })
  });

  

  describe('destroy', () => {
    test('it returns a 204 status code on successful deletion', async () => {
      jest.spyOn(Event.prototype, 'destroy')
        .mockResolvedValue('Deleted');

      const mockReq = { params: { id: 1 } }
      await eventController.destroy(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(204);
    })
  });
})

