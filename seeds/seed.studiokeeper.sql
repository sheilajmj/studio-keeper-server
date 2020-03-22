BEGIN;

TRUNCATE
  studiokeeper_users,
  studiokeeper_events,
  studiokeeper_catalog,
  studiokeeper_contacts
  RESTART IDENTITY CASCADE;

INSERT INTO studiokeeper_users (full_name, nickname, user_name, password)
VALUES
('Penelope_Painter', 'Penny', 'painter99', '$2a$12$QJQ9HC/WXPYSlE2ut.miLettFXPYTvYMW87jcxHf3mBZ74gTN1pES'),
('Baruk_Bagmaker', 'Baruk', 'sewit5', '$2a$12$46xlFRVB.nLK7sgX1hN2a.AjZw/SGyJ7whvgVqgACUU6KgxNSzs/q'),
('Jasmine_Jewelrymaker', 'Jazz', 'gem5000', '$2a$12$aEBAcRZH46piEp/ESMqRJ.otkWgjV0iU51.ZvR6S3qB9Vprae1HSa'),
('Radwan_Writer', 'Rad', 'universalwriter', '$2a$12$zfBWrjwGLwYRxQauxW9J0u19pygtFKid9Qtog05n/bNiGefjo9mW2');

INSERT INTO studiokeeper_events (user_id, event_type, name, website, location, event_dates, application_due_date, notes, submission_requirements)
VALUES
('1', 'Street Festival', 'Out on Main', 'cityweb.gov/outonmain', 'main street USA', '06/15/2020', '05/01/2020', 'Attended last year and it was a success! Amy said she could share a booth', 'letter of intent, portfolio link, deposit'),
('1', 'Gallery Showing', 'Art Signal Gallery', 'asg.com', '123 Broadway', '03/14/2020', '12/01/2019', 'The gallerist explained they were looking for abstract pieces with warm colors', 'completed application, interview, portfolio link, volunteer hours');

INSERT INTO studiokeeper_catalog (user_id, type, collection, name, size, medium, price, date_created, concept_statement, notes, images, subject, quantity, location, sold_date, sold_to, history)
VALUES
    ('1', 'Painting', 'Poured Acrylic', 'The Path', '60"x60"', 'Acrylic on Canvas', '535.00', '2019/3/12', 'This is a concept statement for this work', 'I created this in a bus heading to the moon', '3390767231_0984b30393_o.jpg', NULL, '4', 'kept in studio', '2020/01/24', 'event attendee', '1/26/2020 Allstar Show'),
    ('1', 'Note Cards', 'Poured Acrylic Prints', 'Winding', '4"x6"', 'Ink on Paper', '25.00', '2019/04/25', 'This collection was created for fun sent through the mail.', NULL, '13243.jpg', 'abstract', '24', 'studio cabinet B', NULL , NULL , NULL ),
    ('1', 'Painting', 'Poured Acrylic', 'The Path', '60"x60"', 'Acrylic on Canvas', '535.00', '2019/3/12', 'This is a concept statement for this work', 'I created this in a bus heading to the moon', '3390767231_0984b30393_o.jpg', NULL, '4', 'kept in studio', '2020/2/28', 'under contract with Mr. Buckles', '1/26/2020 Allstar Show');

INSERT INTO studiokeeper_contacts (user_id, contact_type, business_name, name, title, email, phone, address_street, address_line2, address_city, address_state, address_zip, address_country, website, notes)
VALUES
    ('1', 'Business', 'Mountain Song Gallery', NULL, NULL, 'hello@mountainsonggallery.com', '222-877-1234', '1122 Streety Street', NULL, 'Mountain Town', 'CO', '33333', 'USA', 'MountainSongGallery.com', 'Toured the gallery spring 2019, call back in the fall for information on exhibiting'),
    ('1', 'Individual', 'A Knife and Beet', 'Raul Romero', 'Manager', 'rromero@knifebeet.com', '555-889-9900', '3434 Promenade Ave.', NULL, 'Fancy Town', 'PA', '44444', 'USA', NULL, 'May have space in front dining room for three pieces'),
    ('1', 'Individual', NULL, 'Alison Falcon', '', 'afalcon@gmix.com', '101-224-9898', '8221 Atlier Pl.', '#99', 'Richmond', 'VA', '55555', 'USA', NULL, 'Best sister ever');


INSERT INTO studiokeeper_catalog_contacts_favorites (catalog_id, contact_id)
VALUES
('3', '1'),
('3', '2'),
('2', '1'),
('2', '2' ),
('2', '3' );

INSERT INTO studiokeeper_catalog_events_connection (catalog_id, event_id)
VALUES
('1', '2'),
('1', '1'),
('2', '2'),
('3', '1'),
('3', '2');

INSERT INTO studiokeeper_contacts_events_relationship (contact_id, event_id)
VALUES
('1', '2'),
('2', '2'),
('3', '1'),
('2', '1' );

INSERT INTO studiokeeper_images (user_id, image_name, catalog_id)   
VALUES
('1', 'image1.jpg', '1'),
('1', 'image2.jpg', '2'),
('1', 'image3.jpg', '3');

COMMIT;
