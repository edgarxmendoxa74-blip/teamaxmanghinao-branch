-- Update Facebook URL and handle for site settings
-- Using the numerical ID provided by the user

UPDATE site_settings 
SET value = 'https://www.facebook.com/profile.php?id=61577909563825' 
WHERE id = 'facebook_url';

UPDATE site_settings 
SET value = '61577909563825' 
WHERE id = 'facebook_handle';
