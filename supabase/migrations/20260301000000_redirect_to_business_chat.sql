-- Update Facebook URL and handle for site settings to use the business page ID
-- Business Page ID: 61577909563825

UPDATE site_settings 
SET value = 'https://www.facebook.com/profile.php?id=61577909563825' 
WHERE id = 'facebook_url';

UPDATE site_settings 
SET value = '61577909563825' 
WHERE id = 'facebook_handle';
