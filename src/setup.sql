-- Organization Table
CREATE TABLE organization (
organization_id SERIAL PRIMARY KEY,
name VARCHAR(150) NOT NULL,
description TEXT NOT NULL,
contact_email VARCHAR(255) NOT NULL,
logo_filename VARCHAR(255) NOT NULL
)

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');


-- Service Projects
CREATE TABLE service_project (
project_id SERIAL PRIMARY KEY,
organization_id INT NOT NULL,
title VARCHAR(150) NOT NULL,
description TEXT NOT NULL,
location VARCHAR(255) NOT NULL,
date DATE NOT NULL,

FOREIGN KEY (organization_id)
	REFERENCES organization(organization_id)
);

INSERT INTO service_project 
(organization_id, title, description, location, date)
VALUES

-- BrightFuture Builders: 5 projects
   (1, 'Community Center Renovation',
     'Help renovate and improve a local community center.',
     'Davao City', '2026-10-05'),

    (1, 'Home Repair Outreach',
     'Assist families with basic home repair and maintenance.',
     'Davao City', '2026-10-12'),

    (1, 'School Facility Improvement',
     'Help improve facilities and learning spaces at a local school.',
     'Davao City', '2026-10-19'),

    (1, 'Community Park Restoration',
     'Help restore and maintain a local community park.',
     'Davao City', '2026-10-26'),

    (1, 'Neighborhood Improvement Project',
     'Work with community members to improve shared public spaces.',
     'Davao City', '2026-11-02'),

    -- GreenHarvest Growers: 5 projects
    (2, 'Community Garden Project',
     'Help establish and maintain a community vegetable garden.',
     'Davao City', '2026-10-06'),

    (2, 'Tree Planting Activity',
     'Plant trees to help improve the local environment.',
     'Davao City', '2026-10-13'),

    (2, 'Urban Gardening Workshop',
     'Teach community members basic urban gardening skills.',
     'Davao City', '2026-10-20'),

    (2, 'River Cleanup',
     'Help remove waste and improve the condition of a local river.',
     'Davao City', '2026-10-27'),

    (2, 'Food Sustainability Campaign',
     'Promote sustainable food production and gardening practices.',
     'Davao City', '2026-11-03'),

    -- UnityServe Volunteers: 5 projects
    (3, 'Youth Mentoring Program',
     'Provide mentoring and guidance to local young people.',
     'Davao City', '2026-10-07'),

    (3, 'Food Distribution Drive',
     'Help prepare and distribute food to families in need.',
     'Davao City', '2026-10-14'),

    (3, 'Senior Community Support',
     'Assist senior citizens with community activities and services.',
     'Davao City', '2026-10-21'),

    (3, 'Volunteer Skills Workshop',
     'Teach volunteers skills that can help them serve effectively.',
     'Davao City', '2026-10-28'),

    (3, 'Community Outreach Event',
     'Support an outreach event designed to serve local families.',
     'Davao City', '2026-11-04');