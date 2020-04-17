# Images Related Endpoints

## View All Images
**URL:** /api/images
**Method:** GET
**Authentication required:** Yes
 
### Success Response
**Code:** 200 OK
**Content:**  If images exist, the user will see all of the entries
**Content Example**
            [{
                "image_name": [string],
                "catalog_id": [integer],
                "image_url": [string]
            }]

**Example Images** 
Some fields completed, others are null.  
        [[
            {
                "image_name": "Image1_min.jpg",
                "catalog_id": 1,
                "image_url": "https://studiokeeper.s3-us-west-1.amazonaws.com/Image1_min.jpg"
            },
            {
                "image_name": "image2.jpg",
                "catalog_id": 2,
                "image_url": "https://studiokeeper.s3-us-west-1.amazonaws.com/image2.jpg"
         }],

---

## Post a New Image   
**URL:** /api/image-upload
**Method:** POST
**Authentication required:** Yes
**Content-Type:** multipart/form-data 

### Request Payload Example
        {
            catalog_id: 3,
            image_name: imageFIVE.jpg,
            image: "[local file path]",
            user_id: 1
        }  

### Success Response
**Code:** 200 OK
**Response Content:**  
    {
        "image_name": "2020-04-17T18-52-28.342Zrachael-gorjestani-X6CZGpJBi8U-unsplash_reduced.jpg",
        "catalog_id": 3,
        "image_url": "https://studiokeeper.s3.us-west-1.amazonaws.com/2020-04-17T18-52-28.342Zrachael-gorjestani-X6CZGpJBi8U-unsplash_reduced.jpg"
    }


---

### Notes:
The images endpoints for PATCH and DELETE have not been implemented yet.  

    
