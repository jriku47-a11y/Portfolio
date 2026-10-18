-- ============================================================
-- IT Equipment Inventory Analytics
-- ------------------------------------------------------------
-- Database dialect : SQLite
-- Dataset source   : uploaded Case 8 workbook (50 cleaned inventory records)
-- How to run       : SQLite CLI, or DB Browser for SQLite -> "Execute SQL"
-- Note             : Total acquisition value is calculated as quantity * unit_cost
-- ============================================================

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS inventory_assets;
CREATE TABLE inventory_assets (
    asset_id TEXT PRIMARY KEY,
    equipment_type TEXT NOT NULL,
    brand TEXT NOT NULL,
    condition TEXT NOT NULL,
    age_years INTEGER NOT NULL CHECK (age_years >= 0),
    quantity INTEGER NOT NULL CHECK (quantity >= 0),
    unit_cost REAL NOT NULL CHECK (unit_cost >= 0),
    maintenance_cost REAL NOT NULL CHECK (maintenance_cost >= 0),
    warranty TEXT NOT NULL CHECK (warranty IN ('Yes', 'No')),
    department TEXT NOT NULL
);

INSERT INTO inventory_assets
(asset_id, equipment_type, brand, condition, age_years, quantity, unit_cost, maintenance_cost, warranty, department)
VALUES
    ('A8000', 'Desktop', 'Epson', 'Fair', 5, 2, 45000, 1504, 'No', 'Library'),
    ('A8001', 'Projector', 'Dell', 'Fair', 6, 4, 45000, 3418, 'Yes', 'Admin'),
    ('A8002', 'Laptop', 'Dell', 'Fair', 4, 5, 25000, 3162, 'No', 'Faculty'),
    ('A8003', 'Projector', 'Cisco', 'Needs Repair', 5, 8, 25000, 606, 'Yes', 'Admin'),
    ('A8004', 'Router', 'Epson', 'Good', 3, 3, 25000, 551, 'Yes', 'Admin'),
    ('A8005', 'Router', 'HP', 'Fair', 2, 4, 45000, 1341, 'Yes', 'IT'),
    ('A8006', 'Desktop', 'HP', 'Good', 7, 7, 45000, 4574, 'Yes', 'Library'),
    ('A8007', 'Laptop', 'Dell', 'Fair', 7, 6, 25000, 4615, 'Yes', 'Admin'),
    ('A8008', 'Router', 'Epson', 'Good', 0, 9, 60000, 456, 'Yes', 'Admin'),
    ('A8009', 'Router', 'Lenovo', 'Good', 5, 7, 18000, 4612, 'Yes', 'Library'),
    ('A8010', 'Laptop', 'Cisco', 'Good', 6, 4, 60000, 4779, 'Yes', 'IT'),
    ('A8011', 'Router', 'Dell', 'Needs Repair', 1, 1, 60000, 759, 'No', 'IT'),
    ('A8012', 'Desktop', 'Dell', 'Fair', 4, 4, 60000, 3345, 'No', 'Admin'),
    ('A8013', 'Desktop', 'Cisco', 'Needs Repair', 4, 9, 60000, 4560, 'Yes', 'Faculty'),
    ('A8014', 'Desktop', 'Cisco', 'Needs Repair', 0, 6, 35000, 20, 'No', 'Admin'),
    ('A8015', 'Projector', 'HP', 'Fair', 4, 9, 25000, 2594, 'Yes', 'Admin'),
    ('A8016', 'Printer', 'HP', 'Needs Repair', 5, 9, 25000, 4377, 'Yes', 'IT'),
    ('A8017', 'Printer', 'HP', 'Good', 5, 6, 45000, 3218, 'Yes', 'Admin'),
    ('A8018', 'Laptop', 'Lenovo', 'Good', 3, 7, 25000, 519, 'No', 'Library'),
    ('A8019', 'Desktop', 'Cisco', 'Good', 5, 5, 35000, 1273, 'Yes', 'Library'),
    ('A8020', 'Laptop', 'Dell', 'Fair', 0, 10, 18000, 447, 'No', 'Library'),
    ('A8021', 'Projector', 'Cisco', 'Needs Repair', 1, 4, 25000, 24, 'Yes', 'IT'),
    ('A8022', 'Laptop', 'Cisco', 'Good', 7, 6, 25000, 4720, 'Yes', 'Faculty'),
    ('A8023', 'Router', 'Lenovo', 'Fair', 5, 6, 45000, 1453, 'No', 'Admin'),
    ('A8024', 'Laptop', 'Cisco', 'Good', 7, 7, 18000, 3437, 'Yes', 'Faculty'),
    ('A8025', 'Desktop', 'Cisco', 'Fair', 7, 6, 45000, 5283, 'Yes', 'IT'),
    ('A8026', 'Router', 'HP', 'Needs Repair', 6, 7, 18000, 2945, 'Yes', 'Admin'),
    ('A8027', 'Desktop', 'Cisco', 'Good', 4, 10, 18000, 1331, 'Yes', 'IT'),
    ('A8028', 'Laptop', 'HP', 'Fair', 2, 6, 25000, 633, 'Yes', 'Library'),
    ('A8029', 'Printer', 'HP', 'Good', 7, 2, 35000, 3543, 'Yes', 'Admin'),
    ('A8030', 'Router', 'Epson', 'Good', 3, 5, 35000, 485, 'Yes', 'IT'),
    ('A8031', 'Projector', 'Epson', 'Fair', 3, 3, 35000, 1169, 'Yes', 'Faculty'),
    ('A8032', 'Printer', 'HP', 'Needs Repair', 7, 8, 35000, 701, 'Yes', 'IT'),
    ('A8033', 'Projector', 'Dell', 'Needs Repair', 2, 6, 35000, 307, 'Yes', 'Admin'),
    ('A8034', 'Router', 'Epson', 'Fair', 7, 2, 25000, 5003, 'Yes', 'Faculty'),
    ('A8035', 'Router', 'HP', 'Fair', 0, 4, 35000, 677, 'No', 'Admin'),
    ('A8036', 'Projector', 'Epson', 'Good', 4, 8, 45000, 5799, 'Yes', 'IT'),
    ('A8037', 'Printer', 'Dell', 'Fair', 7, 1, 18000, 5789, 'Yes', 'Faculty'),
    ('A8038', 'Projector', 'Dell', 'Needs Repair', 0, 6, 18000, 701, 'Yes', 'Faculty'),
    ('A8039', 'Laptop', 'Lenovo', 'Needs Repair', 4, 1, 18000, 2591, 'Yes', 'Admin'),
    ('A8040', 'Laptop', 'Lenovo', 'Fair', 2, 5, 45000, 1451, 'No', 'Admin'),
    ('A8041', 'Router', 'Lenovo', 'Fair', 6, 3, 25000, 3566, 'Yes', 'Faculty'),
    ('A8042', 'Printer', 'Cisco', 'Fair', 2, 2, 18000, 572, 'Yes', 'Admin'),
    ('A8043', 'Projector', 'Dell', 'Good', 5, 9, 35000, 1899, 'No', 'IT'),
    ('A8044', 'Projector', 'Epson', 'Good', 5, 10, 18000, 5258, 'No', 'Admin'),
    ('A8045', 'Projector', 'Lenovo', 'Fair', 4, 2, 35000, 1713, 'Yes', 'Library'),
    ('A8046', 'Router', 'Lenovo', 'Fair', 2, 10, 18000, 233, 'Yes', 'Faculty'),
    ('A8047', 'Laptop', 'Epson', 'Fair', 4, 3, 25000, 2007, 'No', 'IT'),
    ('A8048', 'Printer', 'HP', 'Good', 0, 3, 60000, 1005, 'Yes', 'IT'),
    ('A8049', 'Router', 'Lenovo', 'Needs Repair', 2, 9, 45000, 157, 'No', 'Faculty');

-- ------------------------------------------------------------
-- QUERY 1: Overall inventory KPIs
-- ------------------------------------------------------------
SELECT
    COUNT(*) AS asset_records,
    SUM(quantity) AS total_units,
    SUM(quantity * unit_cost) AS total_acquisition_value,
    SUM(maintenance_cost) AS total_maintenance_cost,
    SUM(CASE WHEN condition = 'Needs Repair' THEN 1 ELSE 0 END) AS repair_records,
    SUM(CASE WHEN warranty = 'No' THEN 1 ELSE 0 END) AS no_warranty_records
FROM inventory_assets;

-- ------------------------------------------------------------
-- QUERY 2: Equipment-type summary
-- ------------------------------------------------------------
SELECT
    equipment_type,
    COUNT(*) AS asset_records,
    SUM(quantity) AS total_units,
    ROUND(AVG(age_years), 2) AS average_age_years,
    SUM(quantity * unit_cost) AS acquisition_value,
    SUM(maintenance_cost) AS maintenance_total
FROM inventory_assets
GROUP BY equipment_type
ORDER BY acquisition_value DESC;

-- ------------------------------------------------------------
-- QUERY 3: Maintenance risk
-- Cross-references condition, warranty and age to find the records
-- that are both broken and uncovered, and the ageing asset base.
-- ------------------------------------------------------------
SELECT
    asset_id,
    equipment_type,
    brand,
    age_years,
    quantity,
    quantity * unit_cost AS acquisition_value,
    maintenance_cost,
    department
FROM inventory_assets
WHERE condition = 'Needs Repair' AND warranty = 'No'
ORDER BY acquisition_value DESC;

-- Ageing asset base: units at 6 years or older
SELECT
    COUNT(*) AS ageing_records,
    SUM(quantity) AS ageing_units,
    SUM(quantity * unit_cost) AS ageing_value
FROM inventory_assets
WHERE age_years >= 6;