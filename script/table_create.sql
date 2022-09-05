CREATE TABLE IF NOT EXISTS  companies (
 	id serial UNIQUE PRIMARY KEY,
 	name VARCHAR ( 255 )  NOT NULL,
    description TEXT,
 	email VARCHAR ( 255 ) UNIQUE NOT NULL,
 	booking_policy TEXT,
 	last_update_time TIMESTAMP,
 	last_login TIMESTAMP,
 	created_time TIMESTAMP NOT NULL,
 	address VARCHAR (255),
 	country VARCHAR (255),
 	phone_number VARCHAR (20),
 	country_code VARCHAR(4),
 	profile_image TEXT,
 	url TEXT
 );


CREATE TABLE IF NOT EXISTS  services (
  	id serial UNIQUE PRIMARY KEY,
  	name VARCHAR ( 255 )  NOT NULL,
    description TEXT,
  	cover_image TEXT,
  	images TEXT[],
  	lowest_price decimal,
  	currency VARCHAR (10),
  	last_update_time TIMESTAMP,
  	created_time TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS packages (
   	id serial UNIQUE PRIMARY KEY,
   	name VARCHAR ( 255 )  NOT NULL,
    description TEXT,
   	pricing_type VARCHAR (50) NOT NULL,
   	price decimal,
   	currency VARCHAR (10),
   	last_update_time TIMESTAMP,
   	created_time TIMESTAMP NOT NULL
);


CREATE TABLE IF NOT EXISTS service_package (
    service_id VARCHAR (255) NOT NULL,
    package_id VARCHAR (255) NOT NULL

);


CREATE TABLE IF NOT EXISTS customer (
 	id serial UNIQUE PRIMARY KEY,
 	name VARCHAR ( 255 )  NOT NULL,
 	email VARCHAR ( 255 ) UNIQUE NOT NULL,
 	dob DATE,
 	booking_policy TEXT,
 	last_update_time TIMESTAMP,
 	last_login TIMESTAMP,
 	created_time TIMESTAMP NOT NULL,
 	address VARCHAR (255),
 	country VARCHAR (255),
 	phone_number VARCHAR (20),
 	country_code VARCHAR(4),
 	profile_image TEXT,
    description TEXT,
 	url TEXT
);


CREATE TABLE IF NOT EXISTS employee (
    id serial UNIQUE PRIMARY KEY,
 	name VARCHAR ( 255 )  NOT NULL,
 	profile_image TEXT,
 	position VARCHAR ( 255 ),
    created_time TIMESTAMP NOT NULL,
    last_update_time TIMESTAMP
);


CREATE TABLE IF NOT EXISTS booking (
    id serial UNIQUE PRIMARY KEY,
    employee_id VARCHAR ( 100 ),
    last_update_time TIMESTAMP,
    service_id VARCHAR ( 100 ),
    package_id VARCHAR ( 100 )

)
