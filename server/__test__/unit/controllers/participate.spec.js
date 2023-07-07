const participateController = require('../../../controllers/participate')
const Participate = require('../../../models/Participate');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('participate controller', () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe('index', () => {
    test('it returns participant with a 200  status code', async () => {
        let participate = [{
            participate_id: 1,
            first_name: "John", 
            last_name: "doe", 
            phone_number: null 
        }]
        jest.spyOn(Participate, 'getAll').mockResolvedValue(participate);
        await participateController.index(null, mockRes);
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith(participate);
    });
      
    
    describe('show', () => {
        test('it returns a participant with a 200 status code', async () => {
        let testParticipate = {
            participate_id: 1,
            first_name: "John", 
            last_name: "doe", 
            phone_number: null
        }
            
        jest.spyOn(Participate, 'getOneByParticipantId')
            .mockResolvedValue(new Participate(testParticipate));

        const mockReq = { params: { id: 1 } }
        await participateController.show(mockReq, mockRes);
        expect(mockStatus).toHaveBeenCalledWith(200);
        // expect(mockJson).toHaveBeenCalledWith(new User(testUser));
        })
    });
  });

   describe('create', () => {
    test('it returns a new participant with a 201 status code', async () => {
        let testParticipate = {
            participate_id: 1,
            first_name: "John", 
            last_name: "doe", 
            phone_number: null
        }
           
      jest.spyOn(Participate, 'create')
        .mockResolvedValue(new Participate(testParticipate));

      const mockReq = { body: testParticipate }
      await participateController.create(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(new Participate(testParticipate));
    })
  });

  

  describe('destroy', () => {
    test('it returns a 204 status code on successful deletion', async () => {
      jest.spyOn(Participate.prototype, 'destroy')
        .mockResolvedValue('Deleted');

      const mockReq = { params: { id: 1 } }
      await participateController.destroy(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(204);
    })
  });
})


//showByDate, search, destroy, approveEvent in events

// getAllIsTrue, unvoteComplaint

// controllers


// now models
// destroy getEventsByKeyword event