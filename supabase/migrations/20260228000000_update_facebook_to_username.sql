-- Update Facebook URL and handle for site settings to use the new username
-- New username: TeamaxManghinao

UPDATE site_settings 
SET value = 'https://www.facebook.com/TeamaxManghinao' 
WHERE id = 'facebook_url';

UPDATE site_settings 
SET value = 'TeamaxManghinao' 
WHERE id = 'facebook_handle';
