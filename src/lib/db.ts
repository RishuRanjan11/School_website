import fs from 'fs';
import path from 'path';
import { Teacher, GalleryImage, Notice, AdmissionInquiry } from '@/types';
import { isSupabaseConfigured, supabaseAdmin } from './supabase';

const LOCAL_DB_PATH = path.join(process.cwd(), 'data', 'local_db.json');

interface LocalDatabase {
  teachers: Teacher[];
  gallery_images: GalleryImage[];
  notices: Notice[];
  inquiries: AdmissionInquiry[];
}

function readLocalDb(): LocalDatabase {
  try {
    if (!fs.existsSync(LOCAL_DB_PATH)) {
      return { teachers: [], gallery_images: [], notices: [], inquiries: [] };
    }
    const data = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading local db:', error);
    return { teachers: [], gallery_images: [], notices: [], inquiries: [] };
  }
}

function writeLocalDb(db: LocalDatabase) {
  try {
    const dir = path.dirname(LOCAL_DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing local db:', error);
  }
}

// -------------------------------------------------------------
// TEACHERS
// -------------------------------------------------------------
export async function getTeachers(): Promise<Teacher[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('teachers')
      .select('*')
      .order('order_index', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.error('Supabase getTeachers error:', error);
      return readLocalDb().teachers;
    }
    return data as Teacher[];
  }
  return readLocalDb().teachers;
}

export async function addTeacher(teacher: Omit<Teacher, 'id' | 'created_at'>): Promise<Teacher> {
  const newTeacher: Teacher = {
    ...teacher,
    id: isSupabaseConfigured ? undefined as unknown as string : `t-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('teachers')
      .insert([teacher])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Teacher;
  }

  const db = readLocalDb();
  db.teachers.push(newTeacher);
  writeLocalDb(db);
  return newTeacher;
}

export async function updateTeacher(id: string, updates: Partial<Teacher>): Promise<Teacher | null> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('teachers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Teacher;
  }

  const db = readLocalDb();
  const index = db.teachers.findIndex((t) => t.id === id);
  if (index === -1) return null;

  db.teachers[index] = { ...db.teachers[index], ...updates };
  writeLocalDb(db);
  return db.teachers[index];
}

export async function deleteTeacher(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { error } = await supabaseAdmin
      .from('teachers')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  }

  const db = readLocalDb();
  const initialLength = db.teachers.length;
  db.teachers = db.teachers.filter((t) => t.id !== id);
  if (db.teachers.length !== initialLength) {
    writeLocalDb(db);
    return true;
  }
  return false;
}

// -------------------------------------------------------------
// GALLERY IMAGES
// -------------------------------------------------------------
export async function getGalleryImages(category?: string, featuredOnly?: boolean): Promise<GalleryImage[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    let query = supabaseAdmin.from('gallery_images').select('*').order('created_at', { ascending: false });
    if (featuredOnly) {
      query = query.eq('is_featured', true);
    }
    if (category && category !== 'All') {
      query = query.eq('category', category);
    }
    const { data, error } = await query;
    if (error) {
      console.error('Supabase getGalleryImages error:', error);
      return readLocalDb().gallery_images;
    }
    return data as GalleryImage[];
  }

  let images = readLocalDb().gallery_images;
  if (featuredOnly) {
    images = images.filter((img) => img.is_featured);
  }
  if (category && category !== 'All') {
    images = images.filter((img) => img.category.toLowerCase() === category.toLowerCase());
  }
  return images;
}

export async function addGalleryImage(image: Omit<GalleryImage, 'id' | 'created_at'>): Promise<GalleryImage> {
  const newImage: GalleryImage = {
    ...image,
    id: isSupabaseConfigured ? undefined as unknown as string : `g-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('gallery_images')
      .insert([image])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as GalleryImage;
  }

  const db = readLocalDb();
  db.gallery_images.unshift(newImage);
  writeLocalDb(db);
  return newImage;
}

export async function updateGalleryImage(id: string, updates: Partial<GalleryImage>): Promise<GalleryImage | null> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('gallery_images')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as GalleryImage;
  }

  const db = readLocalDb();
  const index = db.gallery_images.findIndex((img) => img.id === id);
  if (index === -1) return null;

  db.gallery_images[index] = { ...db.gallery_images[index], ...updates };
  writeLocalDb(db);
  return db.gallery_images[index];
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { error } = await supabaseAdmin
      .from('gallery_images')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  }

  const db = readLocalDb();
  const initialLength = db.gallery_images.length;
  db.gallery_images = db.gallery_images.filter((img) => img.id !== id);
  if (db.gallery_images.length !== initialLength) {
    writeLocalDb(db);
    return true;
  }
  return false;
}

// -------------------------------------------------------------
// NOTICES & ANNOUNCEMENTS
// -------------------------------------------------------------
export async function getNotices(): Promise<Notice[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('notices')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Supabase getNotices error:', error);
      return readLocalDb().notices;
    }
    return data as Notice[];
  }
  return readLocalDb().notices;
}

export async function addNotice(notice: Omit<Notice, 'id'>): Promise<Notice> {
  const newNotice: Notice = {
    ...notice,
    id: `n-${Date.now()}`,
  };

  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('notices')
      .insert([notice])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data as Notice;
  }

  const db = readLocalDb();
  db.notices.unshift(newNotice);
  writeLocalDb(db);
  return newNotice;
}

export async function deleteNotice(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { error } = await supabaseAdmin.from('notices').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return true;
  }

  const db = readLocalDb();
  db.notices = db.notices.filter((n) => n.id !== id);
  writeLocalDb(db);
  return true;
}

// -------------------------------------------------------------
// ADMISSION INQUIRIES
// -------------------------------------------------------------
export async function getInquiries(): Promise<AdmissionInquiry[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('admission_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase getInquiries error:', error);
      return readLocalDb().inquiries;
    }
    return data as AdmissionInquiry[];
  }
  return readLocalDb().inquiries;
}

export async function addInquiry(inquiry: Omit<AdmissionInquiry, 'id' | 'status' | 'created_at'>): Promise<AdmissionInquiry> {
  const newInquiry: AdmissionInquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    status: 'New',
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabaseAdmin) {
    const { data, error } = await supabaseAdmin
      .from('admission_inquiries')
      .insert([{ ...inquiry, status: 'New' }])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data as AdmissionInquiry;
  }

  const db = readLocalDb();
  db.inquiries.unshift(newInquiry);
  writeLocalDb(db);
  return newInquiry;
}

export async function updateInquiryStatus(id: string, status: AdmissionInquiry['status']): Promise<boolean> {
  if (isSupabaseConfigured && supabaseAdmin) {
    const { error } = await supabaseAdmin
      .from('admission_inquiries')
      .update({ status })
      .eq('id', id);
    if (error) throw new Error(error.message);
    return true;
  }

  const db = readLocalDb();
  const item = db.inquiries.find((i) => i.id === id);
  if (item) {
    item.status = status;
    writeLocalDb(db);
    return true;
  }
  return false;
}
