# Contacts Related Endpoints

## View All Contact Entries
**URL:** /api/contacts
**Method:** GET
**Authentication required:** Yes
 
### Success Response
**Code:** 200 OK
**Content:**  If contact entries exist, the user will see all of the entries
**Content Example**
            [{      
                id: [integer]
                contact_type: [string]
                business_name: [string]
                name: [string]
                title: null
                email: [string]
                phone: [string]
                address_street: [string]
                address_line2: [string]
                address_city: [string]
                address_state: [string]
                address_zip: [integer]
                address_country: [string]
                website: [string]
                notes: [string]
            }]

**Example Contacts:**
Some fields completed, others are null.  
         [
            {
            "id": 1,
            "contact_type": "Business",
            "business_name": "Mountain Song Gallery",
            "name": null,
            "title": null,
            "email": "hello@mountainsonggallery.com",
            "phone": "222-877-1234",
            "address_street": "1122 Streety Street",
            "address_line2": null,
            "address_city": "Mountain Town",
            "address_state": "CO",
            "address_zip": 33333,
            "address_country": "USA",
            "website": "MountainSongGallery.com",
            "notes": "Toured the gallery spring 2019, call back in the fall for information on exhibiting"
        },
        {
            "id": 2,
            "contact_type": "Individual",
            "business_name": "A Knife and Beet",
            "name": "Raul Romero",
            "title": "Manager",
            "email": "rromero@knifebeet.com",
            "phone": "555-889-9900",
            "address_street": "3434 Promenade Ave.",
            "address_line2": null,
            "address_city": "Fancy Town",
            "address_state": "PA",
            "address_zip": 44444,
            "address_country": "USA",
            "website": null,
            "notes": "May have space in front dining room for three pieces"
        }
    ]

---

## Post a New Contact Entry      
**URL:** /api/contacts
**Method:** POST
**Authentication required:** Yes
**Content-Type:** application/JSON 

### Request Payload Example
        {
            "contact_type": "Business",
            "business_name": "Haug Gallery",
            "name": null,
            "title": null,
            "email": "hello@haugfamilygallery.com",
            "phone": "101-877-1234",
            "address_street": "1122 Fast Street",
            "address_line2": null,
            "address_city": "City",
            "address_state": "CA",
            "address_zip": 33333,
            "address_country": "USA",
            "website": "HaugGallery.com",
            "notes": "Toured the gallery spring 2018"
        }

### Success Response
**Code:** 200 OK
**Response Content:**  
       {
            "id": 48,
            "contact_type": "Business",
            "business_name": "Haug Gallery",
            "name": null,
            "title": null,
            "email": "hello@haugfamilygallery.com",
            "phone": "101-877-1234",
            "address_street": "1122 Fast Street",
            "address_line2": null,
            "address_city": "City",
            "address_state": "CA",
            "address_zip": 33333,
            "address_country": "USA",
            "website": "HaugGallery.com",
            "notes": "Toured the gallery spring 2018"
        }   

---

## View a Selected Contact
**URL:** /api/contacts/:id
**URL Parameters:** id=[integer] where id is the ID of the selected contact
**Method:** GET
**Auth required:** Yes

### Error Response 
If selected contact id is not in the database, an error will be returned.
**Error:** Contact item does not exist      

### Success Response
**Code:** 200 OK
**Content:**  If the selected contact item exists, the user will see the content
**Contact Example**
            {      
                id: [integer]
                contact_type: [string]
                business_name: [string]
                name: [string]
                title: null
                email: [string]
                phone: [string]
                address_street: [string]
                address_line2: [string]
                address_city: [string]
                address_state: [string]
                address_zip: [integer]
                address_country: [string]
                website: [string]
                notes: [string]
            }

**Contact Example** 
Example response object when the contact ID parameter is 2. Some fields completed, others are null.  

        {
            "id": 2,
            "contact_type": "Individual",
            "business_name": "A Knife and Beet",
            "name": "Raul Romero",
            "title": "Manager",
            "email": "rromero@knifebeet.com",
            "phone": "555-889-9900",
            "address_street": "3434 Promenade Ave.",
            "address_line2": null,
            "address_city": "Fancy Town",
            "address_state": "PA",
            "address_zip": 44444,
            "address_country": "USA",
            "website": null,
            "notes": "May have space in front dining room for three pieces"
        }

---
## Patch a Selected Contact Entry
**URL:** /api/contacts/:id
**URL Parameters:** id=[integer] where id is the ID of the selected contact item
**Method:** PATCH
**Auth required:** Yes

### Request Payload Example
The payload needs to contain the keys and values to update.
        {
            "email": "anotheremail@email.com"
        }

### Error Response 
If contact id to delete is not in the database, an error will be returned.
**Error:** Contact does not exist  

#### Success Response
**Code:** 204 NO CONTENT
**Content:**  If the selected contact was successfully updated, no content will be displayed

---

### Delete a Selected Contact 
**URL:** /api/contacts/:id
**URL Parameters:** id=[integer] where id is the ID of the selected contact
**Method:** DELETE
**Authenticcation Required:** Yes

#### Error Response 
If the contact id to delete is not in the database, an error will be returned.
**Error:** Contact does not exist  

##### Success Response
**Code:** 204 NO CONTENT
**Content:**  If the selected contact was successfully deleted, no content will be displayed


---

### Notes:
These endpoints are being built to access junction tables to retrieve the relationships.  

* /api/catalogcontacts
* /api/contactsevents
    
