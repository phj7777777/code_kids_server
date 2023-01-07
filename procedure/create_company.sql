-- 1. Create company in companies table using staff_id
-- 2. Create first staff
-- 3. Create company notification with default value
-- 4. Create company working hour (set default value if working hour is null)
-- 5. Create company config with default value


CREATE PROCEDURE InitialCompany @staff_id nvarchar(30)
AS
    INSERT INTO companies (organization_name, description, email, booking_policy, address, country, phone_number, country_code, profile_image, url, last_update_time, created_time, industry) VALUES ($1, $2, $3, $4,$5, $6, $7, $8,$9, $10, $11, $11,$12) RETURNING id
GO;

