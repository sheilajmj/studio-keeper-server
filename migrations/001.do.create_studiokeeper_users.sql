CREATE TABLE studiokeeper_users (
        id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
        full_name VARCHAR(100) NOT NULL ,
        nickname VARCHAR(50) NOT NULL,
        user_name VARCHAR(50) UNIQUE NOT NULL, 
        password VARCHAR(150) NOT NULL
);