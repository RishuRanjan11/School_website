-- ==============================================================================
-- SUPABASE SCHEMA FOR SCHOOL WEBSITE & ADMIN MANAGEMENT
-- 100% Free-tier compatible (PostgreSQL + Supabase Storage)
-- ==============================================================================

-- 1. Create Teachers Table
CREATE TABLE IF NOT EXISTS teachers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    qualification VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    photo_url TEXT,
    bio TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create School Event & Gallery Images Table
CREATE TABLE IF NOT EXISTS gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL DEFAULT 'Campus',
    image_url TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT true,
    event_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Notices & Announcements Table
CREATE TABLE IF NOT EXISTS notices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    category VARCHAR(100) DEFAULT 'General',
    is_important BOOLEAN DEFAULT false,
    pdf_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Admission Inquiries Table
CREATE TABLE IF NOT EXISTS admission_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name VARCHAR(255) NOT NULL,
    parent_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    class_applying VARCHAR(100) NOT NULL,
    stream VARCHAR(100),
    message TEXT,
    status VARCHAR(50) DEFAULT 'New',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Admin password overrides
CREATE TABLE IF NOT EXISTS admin_credentials (
    id TEXT PRIMARY KEY CHECK (id = 'admin-1'),
    password_hash TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Enable Row Level Security (RLS)
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_credentials ENABLE ROW LEVEL SECURITY;

-- 7. Public Read Policies for website visitors
CREATE POLICY "Public can view teachers" ON teachers FOR SELECT USING (true);
CREATE POLICY "Public can view gallery" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Public can view notices" ON notices FOR SELECT USING (true);
CREATE POLICY "Public can submit admission inquiry" ON admission_inquiries FOR INSERT WITH CHECK (true);

-- 8. Service Role / Admin full access (Bypasses RLS with service_role key)
-- Note: Our Next.js Admin API routes use SUPABASE_SERVICE_ROLE_KEY to perform Add, Edit, Delete securely!

-- 9. Storage bucket instructions:
-- In Supabase Dashboard -> Storage:
-- Create a new Public bucket named: "school-media"
-- Toggle "Public bucket" ON so visitors can view uploaded school and teacher photos.
