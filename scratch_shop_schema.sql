-- 1. Master Data Tables
CREATE TABLE IF NOT EXISTS shop_vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    address TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: 'locations' table should already exist. We will assume 'shops' is just a reference or we just use 'locations' directly. The prompt said "Shop ID (Foreign Key to Shops)". Let's create shops table.
CREATE TABLE IF NOT EXISTS shops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    location_id UUID,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS shop_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_id UUID REFERENCES shops(id),
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(100),
    barcode VARCHAR(100),
    price NUMERIC(15,2) NOT NULL DEFAULT 0,
    uom VARCHAR(50) NOT NULL,
    procurement_type VARCHAR(50) NOT NULL CHECK (procurement_type IN ('Beli Putus', 'Titip Jual')),
    avg_cost NUMERIC(15,2) NOT NULL DEFAULT 0,
    stock NUMERIC(15,2) NOT NULL DEFAULT 0,
    low_stock_threshold NUMERIC(15,2) NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Transaction Tables
CREATE TABLE IF NOT EXISTS shop_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID REFERENCES shop_vendors(id),
    shop_id UUID REFERENCES shops(id),
    purchase_date DATE NOT NULL,
    total_amount NUMERIC(15,2) NOT NULL DEFAULT 0,
    status VARCHAR(50) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'CANCELLED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS shop_purchase_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    purchase_id UUID REFERENCES shop_purchases(id) ON DELETE CASCADE,
    product_id UUID REFERENCES shop_products(id),
    qty NUMERIC(15,2) NOT NULL,
    purchase_uom VARCHAR(50) NOT NULL,
    conversion NUMERIC(15,2) NOT NULL DEFAULT 1,
    cost_per_uom NUMERIC(15,2) NOT NULL,
    base_qty NUMERIC(15,2) GENERATED ALWAYS AS (qty * conversion) STORED,
    base_cost NUMERIC(15,2) GENERATED ALWAYS AS (cost_per_uom / NULLIF(conversion, 0)) STORED,
    subtotal NUMERIC(15,2) GENERATED ALWAYS AS (qty * cost_per_uom) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS shop_stock_adjustments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_id UUID REFERENCES shops(id),
    product_id UUID REFERENCES shop_products(id),
    adjustment_type VARCHAR(50) NOT NULL CHECK (adjustment_type IN ('Penambahan', 'Pengurangan')),
    qty NUMERIC(15,2) NOT NULL,
    reason VARCHAR(100) NOT NULL CHECK (reason IN ('Expired', 'Rusak', 'Hilang', 'Ditemukan', 'Koreksi Stok', 'Retur Vendor', 'Pemakaian Sendiri')),
    notes TEXT,
    adjusted_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Advanced Postgres Function for Business Logic (Moving Average & Stock)
CREATE OR REPLACE FUNCTION process_purchase_completion()
RETURNS TRIGGER AS $$
DECLARE
    item RECORD;
    current_stock NUMERIC;
    current_avg_cost NUMERIC;
    new_avg_cost NUMERIC;
BEGIN
    -- Only act when status changes to COMPLETED
    IF NEW.status = 'COMPLETED' AND OLD.status != 'COMPLETED' THEN
        
        -- Loop through all items in this purchase
        FOR item IN SELECT * FROM shop_purchase_items WHERE purchase_id = NEW.id
        LOOP
            -- Get current product state
            SELECT stock, avg_cost INTO current_stock, current_avg_cost 
            FROM shop_products WHERE id = item.product_id FOR UPDATE;

            -- Calculate Moving Average Cost
            IF (current_stock + item.base_qty) > 0 THEN
                new_avg_cost := ((current_stock * current_avg_cost) + (item.base_qty * item.base_cost)) / (current_stock + item.base_qty);
            ELSE
                new_avg_cost := item.base_cost;
            END IF;

            -- Update product stock and avg_cost
            UPDATE shop_products 
            SET 
                stock = stock + item.base_qty,
                avg_cost = new_avg_cost
            WHERE id = item.product_id;
        END LOOP;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_purchase_completion ON shop_purchases;
CREATE TRIGGER trigger_purchase_completion
AFTER UPDATE ON shop_purchases
FOR EACH ROW
EXECUTE FUNCTION process_purchase_completion();

-- Stock Adjustment Trigger
CREATE OR REPLACE FUNCTION process_stock_adjustment()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.adjustment_type = 'Penambahan' THEN
        UPDATE shop_products SET stock = stock + NEW.qty WHERE id = NEW.product_id;
    ELSIF NEW.adjustment_type = 'Pengurangan' THEN
        UPDATE shop_products SET stock = stock - NEW.qty WHERE id = NEW.product_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_stock_adjustment ON shop_stock_adjustments;
CREATE TRIGGER trigger_stock_adjustment
AFTER INSERT ON shop_stock_adjustments
FOR EACH ROW
EXECUTE FUNCTION process_stock_adjustment();
