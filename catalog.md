# Catalog Related Endpoints

## View All Catalog Entries
      URL: /api/catalog
      Method: GET
      Authentication required: Yes
 
### Success Response
        Code: 200 OK
        Content:  If catalog entries exist, the user will see all of the entries
        Generic Content Example
            {
            "id": [integer]
            "type": [string],
            "collection": [string],
            "name": [string],
            "size": [string],
            "medium": [string],
            "price": [number - two decimal places],
            "date_created": [date],
            "concept_statement": [string],
            "notes": [string],
            "subject": [string],
            "quantity": [integer],
            "location": [string],
            "sold_date": [date],
            "sold_to": [string],
            "history": [string]
            }

        Example of Catalog Entry with an ID of 2. Some fields completed, others are null.  
        {
            "id": 2,
            "type": "Note Cards",
            "collection": "Poured Acrylic Prints",
            "name": "Winding",
            "size": "4\"x6\"",
            "medium": "Ink on Paper",
            "price": "25.00",
            "date_created": "2019-04-25T00:00:00.000Z",
            "concept_statement": "This collection was created for fun sent through the mail.",
            "notes": null,
            "subject": "abstract",
            "quantity": 24,
            "location": "studio cabinet B",
            "sold_date": null,
            "sold_to": null,
            "history": null
        },

## Post a New Catalog Entry      
    URL: /api/catalog
    Method: POST
    Authentication required: Yes
    Content-Type: application/JSON 

### Request Payload Example
  {"catalogItem":{
      "type":"painting",
      "collection": "Poured Acrylic", 
      "name": "Cinnamon",
      "size": "60in x 60in",
      "medium": "Acrylic on Canvas",
      "price": "355.00",
      "date_created": "2019-03-12",
      "concept_statement": "This is a concept statement for this work",
      "notes": null,
       "subject": "abstract",
       "quantity": 5,
       "location": "studio cabinet B",
       "sold_date": null,
       "sold_to": null,
       "history": null
    }
  }

### Success Response
        Code: 200 OK
        Response Content:  
            {
                "id": 49,
                "type": "painting",
                "collection": "Poured Acrylic",
                "name": "Cinnamon",
                "size": "60in x 60in",
                "medium": "Acrylic on Canvas",
                "price": "355.00",
                "date_created": "2019-03-12T00:00:00.000Z",
                "concept_statement": "This is a concept statement for this work",
                "notes": null,
                "subject": "abstract",
                "quantity": 5,
                "location": "studio cabinet B",
                "sold_date": null,
                "sold_to": null,
                "history": null
            }


### View a Selected Catalog Entry
      URL: /api/catalog/:id
      URL Parameters: id=[integer] where id is the ID of the selected catalog item
      Method: GET
      Auth required: Yes

#### Error Response 
    If selected catalog id is not in the database, an error will be returned.
    Error: Catalog item does not exist      

##### Success Response
        Code: 200 OK
        Content:  If the selected catalog item exists, the user will see the content
        Generic Content Example
            {
            "id": [integer]
            "type": [string],
            "collection": [string],
            "name": [string],
            "size": [string],
            "medium": [string],
            "price": [number - two decimal places],
            "date_created": [date],
            "concept_statement": [string],
            "notes": [string],
            "subject": [string],
            "quantity": [integer],
            "location": [string],
            "sold_date": [date],
            "sold_to": [string],
            "history": [string]
            }

        Content example of response object when the catalog ID parameter is 2. Some fields completed, others are null.  
        {
            "id": 2,
            "type": "Note Cards",
            "collection": "Poured Acrylic Prints",
            "name": "Winding",
            "size": "4\"x6\"",
            "medium": "Ink on Paper",
            "price": "25.00",
            "date_created": "2019-04-25T00:00:00.000Z",
            "concept_statement": "This collection was created for fun sent through the mail.",
            "notes": null,
            "subject": "abstract",
            "quantity": 24,
            "location": "studio cabinet B",
            "sold_date": null,
            "sold_to": null,
            "history": null
        },


### Delete a Selected Catalog Entry
      URL: /api/catalog/:id
      URL Parameters: id=[integer] where id is the ID of the selected catalog item
      Method: DELETE
      Auth required: Yes

#### Error Response 
    If catalog id to delete is not in the database, an error will be returned.
    Error: Catalog item does not exist  

##### Success Response
        Code: 204 NO CONTENT
        Content:  If the selected catalog item was successfully deleted, no content will be displayed


### Notes:

    * /api/catalogcontacts
    * /api/catalogevents
    These endpoints are being built to access junction tables to retrieve the relationships.  

