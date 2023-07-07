const Complaint = require('../../../models/Complaint');

const db = require('../../../database/connect');

describe('Complaint', () => {
  beforeEach(() => jest.clearAllMocks())

  afterAll(() => jest.resetAllMocks())

  describe('getAll', () => {
    test('it resolves with complaint on successful db query', async () => {

        jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
            rows: [
                { id: 1, complainant_id: 1, title: "Broken Streetlight", description: "here is a broken streetlight on Elm Street near the intersection with Maple Avenue. It has been out of order for over a week, causing darkness and safety concerns in the area.", location: "Elm Street, near Maple Avenue", category: "Public Infrastructure", isfixed: false,image_url: "https://example.com/streetlight.jpg" },
                { id: 2, complainant_id: 2, title: "Broken Streetlight", description: "here is a broken streetlight on Elm Street near the intersection with Maple Avenue. It has been out of order for over a week, causing darkness and safety concerns in the area.", location: "Elm Stet, near Maple Avenue", category: "Public Infrastructure", isfixed: false,image_url: "https://example.com/strelight.jpg" },
                { id: 3, complainant_id: 3, title: "Broken Streetlight", description: "here is a broken streetlight on Elm Street near the intersection with Maple Avenue. It has been out of order for over a week, causing darkness and safety concerns in the area.", location: "Elm Stree, near Maple Avenue", category: "Public Infrastructure", isfixed: false,image_url: "https://example.com/streetight.jpg" }
            ]
        });

      const all = await Complaint.getAll();
      expect(all).toHaveLength(3)
    })
  });

  describe('getOneById', () => {
    test('it resolves with complaint on successful db query', async () => {
      let complaintData = { id: 1, complainant_id: 1, title: "Broken Streetlight", description: "here is a broken streetlight on Elm Street near the intersection with Maple Avenue. It has been out of order for over a week, causing darkness and safety concerns in the area.", location: "Elm Street, near Maple Avenue", category: "Public Infrastructure", isfixed: false,image_url: "https://example.com/streetlight.jpg" }
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [complaintData] });

      const result = await Complaint.getOneById(1);
    //   console.log("b", result)

      expect(result).toBeInstanceOf(Complaint)
      expect(result.id).toBe(1);
    })
  });

  describe('create', () => {
    test('it resolves with user on successful db query', async () => {
      let complaintData = { id: 1, complainant_id: 1, title: "Broken Streetlight", description: "here is a broken streetlight on Elm Street near the intersection with Maple Avenue. It has been out of order for over a week, causing darkness and safety concerns in the area.", location: "Elm Street, near Maple Avenue", category: "Public Infrastructure", isfixed: false,image_url: "https://example.com/streetlight.jpg" }

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [{ ...complaintData}] });
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [complaintData] });

      const result = await Complaint.create(complaintData);
      expect(result).toHaveProperty('title')
    })
  });

})
