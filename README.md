# UUMV Mahasingh Hasauli - Full Stack School Website & Admin Console

A modern, responsive, full-stack website for a Senior Secondary (+2) School featuring CBSE curriculum streams (Science, Commerce, Arts), public-facing information portals, interactive event showcase, and a dedicated **Admin Dashboard** to control teachers' details and homepage event photos.

Built for **100% Free Hosting** on **Vercel** + **Supabase**.

---

## 🌟 Key Features

### 1. Public School Website
- **Homepage:** Hero banner with admissions CTA, dynamic School Life & Events showcase/carousel, principal's vision, key statistics strip, and latest announcements ticker.
- **Academics (+2 Higher Secondary):**
  - **Science Stream:** Physics, Chemistry, Mathematics, Biology, Computer Science (Python/AI), JEE & NEET foundation.
  - **Commerce Stream:** Accountancy, Business Studies, Economics, Applied Maths, CA Foundation guidance.
  - **Humanities / Arts:** Political Science, History, Psychology, Sociology, Civil Services foundation.
  - Secondary (Classes IX-X) and Primary/Middle sections.
- **Faculty & Teachers Directory (`/faculty`):** Search by teacher name or department and filter by stream.
- **Campus & Facilities (`/facilities`):** Science laboratories, AI & Robotics lab, Olympic-standard sports grounds, digital library, and GPS-tracked school buses.
- **Events & Campus Gallery (`/gallery`):** Category filter tabs (Campus, Sports, Annual Day, Science Exhibition, Events) with interactive modal lightbox viewer.
- **Admissions & Contact (`/contact`):** Interactive online admission inquiry form with dynamic stream selection, contact details, and location map.

### 2. Admin Dashboard (`/admin`)
- **Secure Authentication:** Protected `/admin/login` using JWT session stored in HTTP-Only cookies.
- **Password Management:** Change the password from the admin sidebar or request a one-time password reset link by email from the login screen.
- **Teacher Management (`/admin/teachers`):**
  - View all teachers in a structured, searchable table.
  - Add new teachers with photos (via file upload or URL), department/stream, qualification, and contact info.
  - Edit existing teacher details.
  - Delete teacher with confirmation prompt.
- **Homepage & Event Image Manager (`/admin/gallery`):**
  - Upload school and event images directly.
  - One-click toggle to feature/unfeature any image on the homepage showcase.
  - Edit image titles, event dates, descriptions, and category tags.
  - Delete images with cloud/local cleanup.
- **Admission Inquiries (`/admin/inquiries`):**
  - View prospective student applications.
  - Track status: `New` ➔ `Contacted` ➔ `Enrolled` ➔ `Closed`.

---

## 🚀 Instant Local Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

> [!NOTE]
> The application includes a **Zero-Config Local Fallback Database** (`data/local_db.json`). You can immediately test adding/editing/deleting teachers and uploading images locally even before creating a Supabase account!

---

## 🔑 Admin Login Credentials (Default)

- **Portal URL:** `http://localhost:3000/admin/login`
- **Email:** `admin@school.edu`
- **Password:** `Admin@12345`

*(You can customize these credentials in your `.env.local` file).*

### Admin Password Reset Setup

- Configure `ADMIN_APP_URL` with the public application URL. Use HTTPS in production.
- Configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, and `SMTP_FROM` to enable reset emails.
- For Supabase deployments, apply the updated `supabase_schema.sql` and configure `SUPABASE_SERVICE_ROLE_KEY`; admin credentials and single-use reset tokens are stored in the private `admin_credentials` table.
- Without Supabase, the password hash is stored in the ignored local file `data/admin_credentials.json`. This local-file fallback is intended for development and requires persistent writable storage.
- Reset links expire after 30 minutes and can be requested once per minute. Passwords must be at least 12 characters and no more than 72 UTF-8 bytes.

---

## 🌐 Free Hosting Deployment Guide (100% Free)

You can host this website and database for free using **Vercel** and **Supabase**:

### Step 1: Create Free Database & Storage on Supabase (Free Tier)
1. Go to [https://supabase.com](https://supabase.com) and create a free account.
2. Create a new project (e.g., `school-website`).
3. In the left navigation, go to **SQL Editor** ➔ click **New Query**.
4. Open the `supabase_schema.sql` file from this project, copy its contents, paste it into the SQL editor, and click **Run**. This is required for teacher creation, gallery entries, and admission enquiries to save in Supabase.
   - Image files upload to Supabase Storage, while their gallery records are saved separately in the `gallery_images` table.
   - If your Supabase project already has the `teachers` table, run the latest schema from `supabase_schema.sql` to match the current teacher structure.
5. In the left navigation, go to **Storage**:
   - Click **New Bucket**.
   - Name the bucket `school-media`.
   - Make sure **Public bucket** is checked ON.
   - Click Save.
6. In **Project Settings** ➔ **API**, copy:
   - **Project URL** (`NEXT_PUBLIC_SUPABASE_URL`)
   - **anon / public key** (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - **service_role key** (`SUPABASE_SERVICE_ROLE_KEY`)

### Step 2: Deploy to Vercel (Free Tier)
1. Push your project code to a GitHub repository.
2. Go to [https://vercel.com](https://vercel.com) and click **Add New...** ➔ **Project**.
3. Import your GitHub repository.
4. Under **Environment Variables**, add the following:
   - `JWT_SECRET`: A long random secret string (e.g. `your_secret_32_characters_long_key`)
   - `ADMIN_DEFAULT_EMAIL`: `admin@school.edu` (or your chosen email)
   - `ADMIN_DEFAULT_PASSWORD`: Your secure password
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
   - `SUPABASE_STORAGE_BUCKET`: `school-media`
5. Click **Deploy**.
6. Your school website and admin dashboard will be live on a free `.vercel.app` domain (with free SSL certificate and CDN)!

---

## 📁 Project Directory Structure

```
School_website/
├── data/
│   └── local_db.json         # Local seed/fallback database
├── public/
│   ├── images/               # Campus default images
│   └── uploads/              # Local file uploads directory
├── src/
│   ├── app/
│   │   ├── (public)/         # Public school website routes
│   │   │   ├── about/        # About Us & History
│   │   │   ├── academics/    # +2 Senior Secondary Streams
│   │   │   ├── contact/      # Admissions Inquiry Form
│   │   │   ├── facilities/   # Laboratories & Campus
│   │   │   ├── faculty/      # Teachers Directory with search
│   │   │   ├── gallery/      # Full Photo Gallery with lightbox
│   │   │   ├── page.tsx      # Homepage with dynamic showcase
│   │   │   └── layout.tsx    # Public layout with Navbar & Footer
│   │   ├── admin/            # Admin Dashboard routes
│   │   │   ├── gallery/      # Image upload & homepage control
│   │   │   ├── inquiries/    # View admission inquiries
│   │   │   ├── login/        # Protected admin authentication
│   │   │   ├── teachers/     # Teachers CRUD control panel
│   │   │   ├── layout.tsx    # Admin layout with sidebar
│   │   │   └── page.tsx      # Dashboard overview & statistics
│   │   └── api/              # Full-stack API endpoints
│   │       ├── auth/         # Login, logout, session check
│   │       ├── gallery/      # GET, POST, PUT, DELETE images
│   │       ├── inquiries/    # GET, POST, PATCH admission forms
│   │       ├── teachers/     # GET, POST, PUT, DELETE faculty
│   │       └── upload/       # Multipart image upload handler
│   ├── components/           # Reusable UI components
│   │   ├── Footer.tsx
│   │   ├── HomeGalleryShowcase.tsx
│   │   └── Navbar.tsx
│   ├── lib/                  # Auth, Database DAL, Supabase client
│   └── types/                # TypeScript interface definitions
├── supabase_schema.sql       # PostgreSQL tables & RLS setup
├── package.json
└── tailwind.config.ts
```
