ALTER TABLE studiokeeper_images
ADD CONSTRAINT catalog_id;


ALTER TABLE studiokeeper_images
    ADD CONSTRAINT catalog_id
    FOREIGN KEY id
    REFERENCES studiokeeper_catalog(id);

