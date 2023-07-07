const complaintsController = require('../../../controllers/complaints')
const Complaint = require('../../../models/Complaint');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('complaint controller', () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe('index', () => {
    test('it returns complaint with a 200  status code', async () => {
        let complaint = [{
            id: 1,
            complainant_id: 1,
            title: "Broken Streetlight",
            description: "here is a broken streetlight on Elm Street near the intersection with Maple Avenue. It has been out of order for over a week, causing darkness and safety concerns in the area.",
            location: "Elm Street, near Maple Avenue",
            category: "Public Infrastructure",
            isfixed: false,
            image_url: "https://example.com/streetlight.jpg"
        }]
        jest.spyOn(Complaint, 'getAll').mockResolvedValue(complaint);
        await complaintsController.index(null, mockRes);
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith(complaint);
    });
      
    
    describe('show', () => {
        test('it returns a complaint with a 200 status code', async () => {
        let testComplaint = {
            id: 1,
            complainant_id: 1,
            title: "Broken Streetlight",
            description: "here is a broken streetlight on Elm Street near the intersection with Maple Avenue. It has been out of order for over a week, causing darkness and safety concerns in the area.",
            location: "Elm Street, near Maple Avenue",
            category: "Public Infrastructure",
            isfixed: false,
            image_url: "https://example.com/streetlight.jpg"
        }
            
        jest.spyOn(Complaint, 'getOneById')
            .mockResolvedValue(new Complaint(testComplaint));

        const mockReq = { params: { id: 1 } }
        await complaintsController.show(mockReq, mockRes);
        expect(mockStatus).toHaveBeenCalledWith(200);
        // expect(mockJson).toHaveBeenCalledWith(new User(testUser));
        })
    });
  });

   describe('create', () => {
    test('it returns a new complaint with a 201 status code', async () => {
        let testComplaint = {
            id: 1,
            complainant_id: 1,
            title: "Broken Streetlight",
            description: "here is a broken streetlight on Elm Street near the intersection with Maple Avenue. It has been out of order for over a week, causing darkness and safety concerns in the area.",
            location: "Elm Street, near Maple Avenue",
            category: "Public Infrastructure",
            isfixed: false,
            image_url: "https://example.com/streetlight.jpg"
        }
           
      jest.spyOn(Complaint, 'create')
        .mockResolvedValue(new Complaint(testComplaint));

      const mockReq = { body: testComplaint }
      await complaintsController.create(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(new Complaint(testComplaint));
    })
  });



  // describe('isFlase', () => {
  //   test('checks if the complaints is false with a status code of 200', async () => {
  //     jest.spyOn(Complaint, 'isFalse')
  //       .mockResolvedValue()
  //   })
  // })

  // test('responds to an unknown complaint id with a 404', (done) => {
  //   await compla
  // })

  

  describe('destroy', () => {
    test('it returns a 204 status code on successful deletion', async () => {
      jest.spyOn(Complaint.prototype, 'destroy')
        .mockResolvedValue('Deleted');

      const mockReq = { params: { id: 1 } }
      await complaintsController.destroy(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(204);
    })
  });





})

