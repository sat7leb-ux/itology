-- ITOLOGY Seed Data - Popular IT Electronics Products
-- 50+ products across all categories

-- Insert Categories
INSERT INTO categories (name, slug, description, sort_order, is_active) VALUES
  ('Computers', 'computers', 'Laptops, desktops, and workstations', 1, true),
  ('Components', 'components', 'CPUs, GPUs, RAM, motherboards', 2, true),
  ('Networking', 'networking', 'Routers, switches, access points', 3, true),
  ('Cybersecurity', 'cybersecurity', 'Firewalls, antivirus, security tools', 4, true),
  ('Servers & Storage', 'servers-storage', 'Server hardware, NAS, SAN', 5, true),
  ('Displays', 'displays', 'Monitors, projectors, accessories', 6, true),
  ('Accessories', 'accessories', 'Keyboards, mice, cables, adapters', 7, true),
  ('Gadgets', 'gadgets', 'Smart devices, wearables, IoT', 8, true);

-- Insert Brands
INSERT INTO brands (name, slug) VALUES
  ('Apple', 'apple'),
  ('Dell', 'dell'),
  ('HP', 'hp'),
  ('Lenovo', 'lenovo'),
  ('ASUS', 'asus'),
  ('Logitech', 'logitech'),
  ('Samsung', 'samsung'),
  ('Cisco', 'cisco'),
  ('Fortinet', 'fortinet'),
  ('Sony', 'sony'),
  ('Keychron', 'keychron'),
  ('Razer', 'razer'),
  ('Microsoft', 'microsoft'),
  ('Intel', 'intel'),
  ('AMD', 'amd'),
  ('NVIDIA', 'nvidia'),
  ('TP-Link', 'tp-link'),
  ('Ubiquiti', 'ubiquiti'),
  ('Synology', 'synology'),
  ('Western Digital', 'western-digital');

-- Insert Products (sample - full list in seed script)
INSERT INTO products (name, slug, sku, brand_id, category_id, description, price, sale_price, stock_qty, is_published, is_featured, is_bestseller, is_new, warranty_text) VALUES
  ('MacBook Pro 16" M3 Max', 'macbook-pro-16-m3-max', 'MBP16-M3', 1, 1, 'Apple MacBook Pro 16-inch with M3 Max chip, 36GB RAM, 1TB SSD', 349900, NULL, 12, true, true, true, true, '1-year Apple warranty'),
  ('Dell XPS 15 OLED', 'dell-xps-15-oled', 'DELL-XPS15', 2, 1, 'Dell XPS 15 with 3.5K OLED display, Intel i9, 32GB RAM', 219900, 189900, 8, true, true, false, false, '2-year Dell warranty'),
  ('Logitech MX Master 3S', 'logitech-mx-master-3s', 'LOG-MX3S', 6, 7, 'Wireless performance mouse with quiet clicks and 8K DPI', 9900, NULL, 45, true, false, true, false, '1-year warranty'),
  ('Samsung 32" Odyssey Neo G8', 'samsung-odyssey-neo-g8', 'SAM-ONEO8', 7, 6, '32-inch 4K Mini LED gaming monitor with 240Hz refresh rate', 129900, 99900, 3, true, true, false, true, '3-year Samsung warranty'),
  ('Cisco Catalyst 9200L', 'cisco-catalyst-9200l', 'CIS-C9200L', 8, 3, '48-port Gigabit Ethernet switch with PoE+ support', 450000, NULL, 5, true, false, false, false, 'Limited lifetime warranty'),
  ('Fortinet FortiGate 60F', 'fortinet-fortigate-60f', 'FG-60F', 9, 4, 'Next-generation firewall with SD-WAN and threat protection', 85000, 72000, 15, true, true, true, false, '1-year Fortinet warranty'),
  ('HP ProLiant DL380 Gen10', 'hp-proliant-dl380', 'HP-DL380', 3, 5, 'Rack server with dual Xeon Scalable processors', 890000, NULL, 2, true, false, false, false, '3-year HP warranty'),
  ('Sony WH-1000XM5', 'sony-wh1000xm5', 'SONY-XM5', 10, 7, 'Wireless noise-canceling headphones with 30-hour battery', 34900, 27900, 30, true, true, true, false, '1-year Sony warranty'),
  ('Keychron Q1 Pro', 'keychron-q1-pro', 'KEY-Q1PRO', 11, 7, 'Wireless mechanical keyboard with QMK/VIA support', 19900, NULL, 25, true, false, true, true, '2-year Keychron warranty'),
  ('ASUS ROG Swift PG32UQX', 'asus-rog-swift-pg32uqx', 'ASU-PG32UQX', 5, 6, '32-inch 4K Mini LED gaming monitor with 144Hz', 249900, 219900, 4, true, true, false, false, '3-year ASUS warranty');
