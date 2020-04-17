# Catalog Related Endpoints
    ## View All Catalog Entries
      URL: /api/catalog
      Method: GET
      Auth required: Yes
 
    ##### Success Response
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

    #### View a Selected Catalog Entry
      URL: /api/catalog/:id
      URL Parameters: id=[integer] where id is the ID of the selected catalog item
      Method: GET
      Auth required: Yes

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















## Running the tests

To run the tests use the script "npm tests"


## Built With

* [Node](https://nodejs.org/en/)
* [Express](http://expressjs.com/) - Framework
* [Knex](http://knexjs.org/) - SQL Query Builder 
* [Postgres](https://www.postgresql.org/) - Relational Database 
* [Mocha](https://mochajs.org/) - Test Framework
* [AWS S3](https://aws.amazon.com/s3/) - Storage Service
* [Multer](https://www.npmjs.com/package/multer) - Middleware for Handling Multipart/Form-Data 

### Notes:

    * Note the authentication piece is not fully developed.  Any user/password, once created will access all data.

    * Endpoints currently in development include: 
        ** /api/catalogcontacts
        ** /api/catalogevents
        ** /api/contactsevents
        These endpoints are being built to access junction tables to retrieve the relationships.  

