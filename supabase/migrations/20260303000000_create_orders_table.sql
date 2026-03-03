
-- Create orders table for iOS users
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  contact_number text NOT NULL,
  service_type text NOT NULL,
  address text,
  landmark text,
  pickup_time text,
  payment_method text NOT NULL,
  total_price decimal(10,2) NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  items jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can create orders"
  ON orders
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can see and manage orders"
  ON orders
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);
