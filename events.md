# Events Related Endpoints

## View All Events  
**URL:** /api/events  
**Method:** GET  
**Authentication required:** Yes  
 
### Success Response  
**Code:** 200 OK  
**Content:**  If events exist, the user will see all of the entries  
**Content Example**  
```
            {
               "id": [integer],
                "name": [string],
                "website": [string],
                "location": [string],
                "event_dates": [date],
                "application_due_date": [date],
                "notes": [string],
                "submission_requirements": [string]
            }
```

**Example Events**  
Some fields completed, others are null.  
```json
        [
            {
                "id": 1,
                "name": "Out on Main",
                "website": "cityweb.gov/outonmain",
                "location": "Main Street USA",
                "event_dates": "2020-06-15T00:00:00.000Z",
                "application_due_date": "2020-05-01T00:00:00.000Z",
                "notes": "Attended last year and it was a success! Amy said she could share a booth",
                "submission_requirements": "letter of intent, portfolio link, deposit"
            },
            {
                "id": 4,
                "name": "Event Name",
                "website": "website",
                "location": "Location",
                "event_dates": "2019-11-27T00:00:00.000Z",
                "application_due_date": null,
                "notes": "Notes",
                "submission_requirements": "some requirements"
            }
        ]
```
---

## Post a New Event  
**URL:** /api/events  
**Method:** POST  
**Authentication required:** Yes  
**Content-Type:** application/JSON   

### Request Payload Example  
```json
            {
                "id": 1,
                "name": "Battle of the Bands",
                "website": "bands-music.com",
                "location": "Main Street USA",
                "event_dates": "2020-06-15T00:00:00.000Z",
                "application_due_date": "2020-05-01T00:00:00.000Z",
                "notes": "Attended last year.  Hit sales record!",
                "submission_requirements": "application, deposit"
            }
```

### Success Response  
**Code:** 200 OK  
**Response Content:**  
```json
            {
                "id": 38,
                "name": "Battle of the Bands",
                "website": "bands-music.com",
                "location": "Main Street USA",
                "event_dates": "2020-06-15T00:00:00.000Z",
                "application_due_date": "2020-05-01T00:00:00.000Z",
                "notes": "Attended last year.  Hit sales record!",
                "submission_requirements": "application, deposit"
            }
```
---

## View a Selected Event  
**URL:** /api/events/:id  
**URL Parameters:** id=[integer] where id is the ID of the selected event  
**Method:** GET  
**Auth required:** Yes  

### Error Response  
If selected event id is not in the database, an error will be returned.  
**Error:** Event does not exist  

### Success Response  
**Code:** 200 OK  
**Content:**  If the selected event exists, the user will see the content  
**Content Example**  
```
            {
               "id": [integer],
                "name": [string],
                "website": [string],
                "location": [string],
                "event_dates": [date],
                "application_due_date": [date],
                "notes": [string],
                "submission_requirements": [string]
            }
```

**Example Events**  
Example response object when the event ID parameter is 2. Fields with no value will be null.  
```json
            {
                "id": 2,
                "name": "Art Signal Gallery",
                "website": "asg.com",
                "location": "123 Broadway",
                "event_dates": "2020-03-14T00:00:00.000Z",
                "application_due_date": "2019-12-01T00:00:00.000Z",
                "notes": "The gallerist explained they were looking for abstract pieces with warm colors",
                "submission_requirements": "completed application, interview, portfolio link, volunteer hours"
            }
```
---
## Patch a Selected Event  
**URL:** /api/events/:id  
**URL Parameters:** id=[integer] where id is the ID of the selected event  
**Method:** PATCH  
**Auth required:** Yes  

### Request Payload Example  
The payload needs to contain the keys and values to update.  
```json
        {
            "location": "East Block"
        }
```

### Error Response  
If event id to delete is not in the database, an error will be returned.  
**Error:** Event does not exist  

### Success Response  
**Code:** 204 NO CONTENT  
**Content:**  If the selected event item was successfully updated, no content will be displayed  

---

### Delete a Selected Event  
**URL:** /api/events/:id  
**URL Parameters:** id=[integer] where id is the ID of the selected event  
**Method:** DELETE  
**Authenticcation Required:** Yes  

### Error Response  
If Event id to delete is not in the database, an error will be returned.  
**Error:** Event does not exist  

#### Success Response  
**Code:** 204 NO CONTENT  
**Content:**  If the selected Event item was successfully deleted, no content will be displayed  

---

### Notes:  
These endpoints are being built to access junction tables to retrieve the relationships.  

* /api/contactsevents  
* /api/catalogevents  
    
