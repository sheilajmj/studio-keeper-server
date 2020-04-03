ALTER TABLE studiokeeper_images
DROP CONSTRAINT catalog_id;


ALTER TABLE studiokeeper_images
    ADD CONSTRAINT catalog_id
    FOREIGN KEY catalog_id
    REFERENCES studiokeeper_catalog(id)
    ON DELETE CASCADE;

