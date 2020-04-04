ALTER TABLE public.studiokeeper_images  ADD catalog_id INTEGER REFERENCES studiokeeper_catalog (id) NOT NULL;
