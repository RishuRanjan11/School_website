export interface Teacher {
  id: string;
  name: string;
  subject: string;
  department: string; // e.g. "Higher Secondary (Science)", "Higher Secondary (Commerce)", "Higher Secondary (Arts)", "Secondary (IX-X)", "Middle & Primary"
  designation: string; // e.g. "PGT Physics", "Head of Department", "TGT English"
  qualification?: string;
  classes_taught?: string;
  experience: string; // e.g. "12 Years"
  email: string;
  phone: string;
  photo_url: string;
  bio?: string;
  order_index?: number;
  created_at?: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  category: string; // "Campus" | "Sports" | "Annual Day" | "Science Exhibition" | "Events" | "Academic"
  image_url: string;
  is_featured: boolean; // showcase on homepage
  event_date: string | null;
  created_at?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  is_important: boolean;
  pdf_url?: string;
}

export interface AdmissionInquiry {
  id: string;
  student_name: string;
  parent_name: string;
  email: string;
  phone: string;
  class_applying: string;
  stream?: string;
  message?: string;
  status: 'New' | 'Contacted' | 'Enrolled' | 'Closed';
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}
