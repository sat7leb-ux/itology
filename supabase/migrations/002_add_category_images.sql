-- Add image_url column to categories
ALTER TABLE categories ADD COLUMN IF NOT EXISTS image_url text;

-- Clear existing restaurant categories and insert IT categories with images
DELETE FROM categories;

-- Insert IT categories with high-quality images that match the website design
INSERT INTO categories (name, slug, description, image_url, sort_order, is_active) VALUES
('Computers', 'computers', 'Laptops, desktops, and workstations for every need', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80', 1, true),
('Components', 'components', 'CPUs, GPUs, RAM, motherboards, and storage', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80', 2, true),
('Networking', 'networking', 'Routers, switches, and wireless equipment', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80', 3, true),
('Cybersecurity', 'cybersecurity', 'Firewalls, VPNs, and security solutions', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80', 4, true),
('Servers & Storage', 'servers-storage', 'Enterprise servers, NAS, and data storage', 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80', 5, true),
('Displays', 'displays', 'Monitors, projectors, and display accessories', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80', 6, true),
('Accessories', 'accessories', 'Keyboards, mice, docks, and peripherals', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80', 7, true),
('Gadgets', 'gadgets', 'Smart devices, wearables, and tech gadgets', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', 8, true);
