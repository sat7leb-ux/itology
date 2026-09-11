-- Placeholder demo data — safe to run against a fresh dev/staging project.
-- Replace with real catalog data before launch.

insert into categories (name, slug, description, sort_order) values
  ('Computers', 'computers', 'Laptops, desktops, workstations, and mini PCs.', 1),
  ('Components', 'components', 'CPUs, GPUs, memory, storage, and power supplies.', 2),
  ('Networking', 'networking', 'Routers, switches, access points, and firewalls.', 3),
  ('Cybersecurity', 'cybersecurity', 'Endpoint security, backup, and firewall solutions.', 4),
  ('Servers & Storage', 'servers-storage', 'Servers, NAS, and backup systems.', 5),
  ('Displays', 'displays', 'Monitors and projectors.', 6),
  ('Accessories', 'accessories', 'Keyboards, mice, headsets, and cables.', 7),
  ('Gadgets', 'gadgets', 'Smart devices and USB accessories.', 8)
on conflict (slug) do nothing;

insert into brands (name, slug) values
  ('Dell', 'dell'),
  ('Lenovo', 'lenovo'),
  ('HP', 'hp'),
  ('Ubiquiti', 'ubiquiti'),
  ('Synology', 'synology')
on conflict (slug) do nothing;

insert into services (name, slug, description, sort_order) values
  ('IT Consulting', 'it-consulting', 'Architecture and roadmap planning for growing infrastructure.', 1),
  ('Managed IT', 'managed-it', 'Ongoing monitoring, maintenance, and support for your environment.', 2),
  ('Cybersecurity', 'cybersecurity-service', 'Endpoint, network, and backup security built around your risk profile.', 3),
  ('Network Installation', 'network-installation', 'Structured cabling, wireless, and network hardware deployment.', 4),
  ('Cloud', 'cloud', 'Migration, backup, and cloud infrastructure management.', 5),
  ('Support', 'support', 'Direct line to engineers when something breaks.', 6)
on conflict (slug) do nothing;

-- Sample products (attach to Computers/Dell for a working demo listing).
insert into products (name, slug, brand_id, category_id, sku, description, price, sale_price, stock_qty, is_published, is_featured, is_new)
select
  'Latitude 5440 Business Laptop',
  'latitude-5440-business-laptop',
  (select id from brands where slug = 'dell'),
  (select id from categories where slug = 'computers'),
  'DELL-LAT5440',
  '14" business laptop with Intel Core i5, 16GB RAM, 512GB SSD.',
  109900, 99900, 12, true, true, true
where not exists (select 1 from products where slug = 'latitude-5440-business-laptop');

insert into products (name, slug, brand_id, category_id, sku, description, price, stock_qty, is_published, is_featured)
select
  'UniFi Dream Machine Pro',
  'unifi-dream-machine-pro',
  (select id from brands where slug = 'ubiquiti'),
  (select id from categories where slug = 'networking'),
  'UBNT-UDM-PRO',
  'All-in-one enterprise network appliance with integrated security gateway.',
  37900, 8, true, true
where not exists (select 1 from products where slug = 'unifi-dream-machine-pro');
