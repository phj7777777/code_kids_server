ALTER DATABASE booking SET datestyle TO "ISO, DMY";

CREATE TABLE IF NOT EXISTS  companies (
 	id serial UNIQUE PRIMARY KEY,
 	organization_name VARCHAR ( 255 )  NOT NULL,
    description TEXT,
 	email VARCHAR ( 255 ) UNIQUE NOT NULL,
 	booking_policy TEXT,
 	last_update_time TIMESTAMP,
 	created_time TIMESTAMP NOT NULL,
 	address VARCHAR (255),
 	post_code VARCHAR (10),
 	country VARCHAR (255),
 	phone_number VARCHAR (20),
 	country_code VARCHAR (4),
 	industry VARCHAR (255),
 	country VARCHAR (50),
 	timezone VARCHAR (50),
 	profile_image TEXT,
 	url TEXT
 );

CREATE TABLE IF NOT EXISTS  company_notification (
  	company_id INTEGER PRIMARY KEY,
 	customer_book_success VARCHAR(255),
 	customer_book_updated VARCHAR(255),
 	customer_book_cancelled VARCHAR(255),
 	customer_appointment_reminder VARCHAR(50),
 	customer_reminder_time VARCHAR(255),
 	staff_book_success VARCHAR(20),
 	staff_book_updated VARCHAR(4),
 	staff_book_cancelled VARCHAR(255),
 	staff_appointment_reminder VARCHAR(50),
 	staff_reminder_time VARCHAR(255),
 	last_update_time TIMESTAMP
 );


CREATE TABLE IF NOT EXISTS  company_config (
  	company_id INTEGER PRIMARY KEY,
  	cancellation_policy_cancel: integer,
  	appointment_advance_notice_day integer,
  	appointment_advance_notice_hour integer,
  	appointment_advance_notice_min integer,
  	scheduling_window_month integer,
  	cancellation_policy_cancel integer,
  	scheduling_window_day integer,
  	slot_window_hour integer,
  	slot_window_min integer,
  	price_display BOOLEAN,
  	duration_display BOOLEAN,
  	working_hour_display BOOLEAN,
  	staff_option BOOLEAN,
  	notes TEXT,
  	last_update_time TIMESTAMP,
  	term_condition_title VARCHAR(255),
  	term_condition_url VARCHAR(255),
  	callback_title VARCHAR(255),
  	callback_url VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS  services (
  	id serial UNIQUE PRIMARY KEY,
  	name VARCHAR ( 255 )  NOT NULL,
    description TEXT,
  	cover_image TEXT,
  	lowest_price DECIMAL(10,2),
  	currency VARCHAR (10),
  	last_update_time TIMESTAMP,
  	created_time TIMESTAMP NOT NULL,
  	company_id INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS packages (
   	id serial UNIQUE PRIMARY KEY,
   	name VARCHAR ( 255 )  NOT NULL,
    description TEXT,
   	pricing_type VARCHAR (50) NOT NULL,
   	price decimal,
   	cover_image TEXT,
   	images TEXT[],
   	currency VARCHAR (10),
   	last_update_time TIMESTAMP,
   	created_time TIMESTAMP NOT NULL
);


CREATE TABLE IF NOT EXISTS services_packages (
    service_id INTEGER NOT NULL,
    package_id INTEGER NOT NULL

);


CREATE TABLE IF NOT EXISTS customers (
 	id serial UNIQUE PRIMARY KEY,
 	name VARCHAR ( 255 )  NOT NULL,
 	email VARCHAR ( 255 ) UNIQUE NOT NULL,
 	dob DATE,
 	last_update_time TIMESTAMP,
 	last_login TIMESTAMP,
 	created_time TIMESTAMP NOT NULL,
 	address VARCHAR (255),
 	country VARCHAR (255),
 	phone_number VARCHAR (20),
 	country_code VARCHAR(4),
 	post_code VARCHAR(10),
 	profile_image TEXT,
    notes TEXT,
    meta_data TEXT

);

CREATE TABLE IF NOT EXISTS staffs (
    id serial UNIQUE PRIMARY KEY,
 	name VARCHAR ( 255 )  NOT NULL,
 	email VARCHAR ( 255 ) NOT NULL,
 	profile_image TEXT,
 	dob DATE,
 	position VARCHAR ( 255 ),
 	phone_number VARCHAR (20),
 	country_code VARCHAR (4),
    created_time TIMESTAMP NOT NULL,
    last_update_time TIMESTAMP,
    company_id INTEGER
);


CREATE TABLE IF NOT EXISTS bookings (
    id serial UNIQUE PRIMARY KEY,
    staff_id INTEGER,
    last_update_time TIMESTAMP,
    service_id INTEGER,
    package_id INTEGER,
    company_id INTEGER

)
