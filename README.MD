

### API routes for Events model

| Route | Method | Response | Usage
| --- | --- | --- | --- | 
| `/events` | `GET` | Returns a JSON object containing all events. | Access http://https://florincountycouncil.onrender.com/events
| `/events/:id` | `GET` | Returns a JSON object containing the event selected by `:id`. . |  Send a GET request to http://https://florincountycouncil.onrender.com/events/:id
| `/events/date` | `GET` | Returns a JSON object containing all events *within a date range* defined in the reqiest body. |  Send a GET request to http://https://florincountycouncil.onrender.com/events/date with a JSON object in the body of the request. <br /><br /> Example:<br /> {<br />  "start_date": "2023-6-23",<br />  "end_date": "2023-6-27"}
| `/events/search/:keyword` | `GET` | Returns a JSON object containing all events that *contains the keyword*. |  Send a GET request to https://florincountycouncil.onrender.com/search/:keyword
| `/events` | `POST` | Accepts a JSON object and uses it to create and store a new event. | Send a POST request to http://florincountycouncil.onrender.com/events with a JSON object in the body of the request. <br /><br /> Example:<br /> {<br />  "snack_name": "Almonds",<br />  "snack_description": "Roasted almonds",<br />  "healthy": true,<br />  "vegetarian": true<br />}


| `/snacks/top` | `GET` | Returns a JSON object representing the snack with the most votes. | Access http://localhost:3000/snack/top
| `/snacks/:id` | `GET` | Returns a JSON object representing a single snack from the collection, selected by `:id`. | Access http://localhost:3000/snack/:id
| `/snacks/:id` | `PATCH` | Updates a specific snack, incrementing or decrementing its vote count. | Send a PATCH request to http://localhost:3000/snack/:id with a JSON object in the body of the request. <br /><br /> Example:<br /> { "votes": 5 }
| `/snacks/:id` | `DELETE` | Deletes a specific snack, selected by `:id`. | Send a DELETE request to http://localhost:3000/snack/:id
