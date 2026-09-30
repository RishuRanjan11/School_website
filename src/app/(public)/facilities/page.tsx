import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Building, 
  FlaskConical, 
  Laptop, 
  BookOpen, 
  Trophy, 
  Bus, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

export default function FacilitiesPage() {
  const facilities = [
    {
      title: 'Physics, Chemistry & Biology Laboratories',
      category: 'Scientific Infrastructure',
      description: 'Dedicated senior secondary laboratories equipped with modern digital meters, compound microscopes, spectroscopic apparatus, and certified safety fume hoods.',
      icon: FlaskConical,
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'AI, Robotics & Computer Science Lab',
      category: 'Technological Literacy',
      description: 'High-speed gigabit workstations, Python / AI development environments, Arduino robotics kits, and IoT sensors to nurture algorithmic thinking.',
      icon: Laptop,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Central Digital & Physical Library',
      category: 'Knowledge Hub',
      description: 'Over 25,000 reference books, NCERT guides, national and international journals, study cubicles, and an e-library subscription to global academic databases.',
      icon: BookOpen,
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Olympic-Standard Sports Complex',
      category: 'Athletics & Fitness',
      description: 'Full-size football turf, 400m synthetic running track, international-standard wooden badminton courts, basketball courts, and professional cricket nets.',
      icon: Trophy,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'Smart Interactive Classrooms',
      category: 'Modern Pedagogy',
      description: 'Ergonomically designed classrooms fitted with interactive 75-inch smart touch displays, acoustic sound systems, and climate control.',
      icon: Building,
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800',
    },
    {
      title: 'GPS-Tracked Safe Transport Fleet',
      category: 'Commute & Safety',
      description: 'A fleet of air-conditioned school buses equipped with live GPS tracking, RFID student attendance, speed governors, and female bus attendants.',
      icon: Bus,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-school-100 text-school-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Building className="w-4 h-4" />
            <span>Campus Infrastructure</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-school-900 tracking-tight">
            World-Class Learning Infrastructure
          </h1>
          <p className="text-slate-600 mt-4 text-base sm:text-lg">
            Our campus is purposefully engineered to stimulate intellectual curiosity, physical fitness, scientific inquiry, and artistic expression.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-md bg-slate-900/80 backdrop-blur-sm text-gold-400 text-xs font-semibold">
                      {facility.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 text-school-800 mb-2">
                      <Icon className="w-5 h-5 text-school-700" />
                      <h3 className="font-bold text-lg text-slate-900">{facility.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {facility.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety & Medical Info */}
        <div className="bg-school-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Safety & Care First</span>
            <h3 className="text-2xl sm:text-3xl font-bold">24x7 CCTV Surveillance & Infirmary Care</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              The entire 8-acre campus is secured with high-definition CCTV monitoring, trained security guards at all perimeter gates, and a fully equipped medical infirmary staffed by certified nursing personnel.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-gold-400 hover:bg-gold-300 transition text-sm flex items-center gap-2 shadow-lg"
          >
            <span>Visit Campus</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
