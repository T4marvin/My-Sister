/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  CheckCircle2, 
  Users, 
  Clock, 
  ShieldCheck, 
  Zap,
  Server,
  Wifi,
  Link,
  Layers,
  Shield,
  LifeBuoy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type ServiceId = 
  | 'switches-routers' 
  | 'wireless-ap' 
  | 'structured-cabling' 
  | 'lan-wan' 
  | 'network-security' 
  | 'maintenance-support';

interface Service {
  id: ServiceId;
  title: string;
  description: string;
  shortDescription: string;
  icon: React.ReactNode;
  tags: string[];
  features: { title: string; desc: string }[];
  process: string[];
}

// --- Data ---
const SERVICES: Service[] = [
  {
    id: 'switches-routers',
    title: "Network Switches & Routers",
    shortDescription: "Managed and enterprise-grade switching solutions.",
    description: "Our core networking service focuses on the backbone of your business communication. We provide high-performance switches and routers designed for reliability and scalability.",
    icon: <Server className="w-12 h-12" />,
    tags: ["Managed Switches", "Unmanaged Switches", "Enterprise Routers", "PoE Switches", "Layer 2/3"],
    features: [
      { title: "Managed Switch Configuration", desc: "Expert setup of VLANs, QoS, and STP on Cisco, MikroTik, and HP hardware." },
      { title: "PoE Switch Deployment", desc: "Powering your IP cameras, Access Points, and VoIP phones with smart power management." },
      { title: "Router Setup & NAT", desc: "Implementation of load balancing, failover, and secure VPN connections." },
      { title: "Hardware Procurement", desc: "Genuine hardware sourced directly from authorised distributors." },
      { title: "Network Documentation", desc: "Complete as-built diagrams, IP plans, and configuration backups." }
    ],
    process: [
      "Site survey & traffic analysis",
      "Hardware specification & quotation",
      "Procurement & delivery",
      "Rack mounting & cabling",
      "Configuration & testing",
      "Documentation handover"
    ]
  },
  {
    id: 'wireless-ap',
    title: "Wireless Access Points",
    shortDescription: "Seamless WiFi coverage for high-density environments.",
    description: "We design and install enterprise-grade wireless networks that ensure high-speed connectivity across your entire facility, indoors and outdoors.",
    icon: <Wifi className="w-12 h-12" />,
    tags: ["WiFi 6", "Indoor APs", "Outdoor APs", "Mesh Networks", "Controller Management"],
    features: [
      { title: "RF Site Survey", desc: "Heatmap-based analysis for optimal AP placement and signal strength." },
      { title: "Indoor & Outdoor APs", desc: "Installation of ceiling-mount, wall-plate, and rugged weatherproof units." },
      { title: "WiFi 6/6E Deployment", desc: "Future-proofing your network for high-density modern environments." },
      { title: "Centralised Controller Setup", desc: "Unified management using UniFi, Meraki, or CAPsMAN." },
      { title: "Guest & VLAN Segmentation", desc: "Strict isolation between staff, guests, and IoT devices." }
    ],
    process: [
      "RF site survey & heatmap",
      "AP placement planning",
      "Structured cabling to AP points",
      "AP mounting & PoE",
      "SSID, VLAN & security config",
      "Signal testing & optimisation"
    ]
  },
  {
    id: 'structured-cabling',
    title: "Structured Cabling",
    shortDescription: "Neat, certified cabling for long-term reliability.",
    description: "A solid network starts with solid cabling. We provide industry-standard structured cabling solutions tested for maximum performance.",
    icon: <Layers className="w-12 h-12" />,
    tags: ["Cat5e", "Cat6", "Cat6A", "Fibre Optic", "Patch Panels", "Trunking"],
    features: [
      { title: "Horizontal Cabling", desc: "Professional Cat6/Cat6A runs to workstations, APs, and security cameras." },
      { title: "Fibre Backbone", desc: "High-speed single-mode and multi-mode fibre links, OTDR tested." },
      { title: "Patch Panel Termination", desc: "Clean rack-mount termination with professional port labelling." },
      { title: "Cable Trunking & Conduit", desc: "Aesthetic and protected cable paths using surface or concealed conduits." },
      { title: "Certification Testing", desc: "Rigorous Fluke testing with detailed results in every handover report." }
    ],
    process: [
      "Floor plan review & routing",
      "Conduit & trunking installation",
      "Cable pulling & routing",
      "Termination & patch panel build",
      "Fluke certification testing",
      "Labelling & documentation"
    ]
  },
  {
    id: 'lan-wan',
    title: "LAN / WAN Setup",
    shortDescription: "End-to-end local and wide area network design.",
    description: "Connecting offices and branches with high-speed, secure, and reliable LAN and WAN infrastructure tailored to your business needs.",
    icon: <Globe className="w-12 h-12" />,
    tags: ["LAN Design", "WAN Links", "MPLS", "SD-WAN", "Branch Connectivity", "ISP Integration"],
    features: [
      { title: "Network Architecture Design", desc: "Custom logical and physical diagrams, IP plans, and VLAN structure." },
      { title: "LAN Deployment", desc: "Complete installation of switches, routers, cabling, and server room racks." },
      { title: "WAN & ISP Integration", desc: "Seamless fibre, wireless, or MPLS integration with full ISP liaison." },
      { title: "Multi-Branch Connectivity", desc: "Secure site-to-site VPN and SD-WAN for regional and upcountry offices." },
      { title: "Bandwidth Management", desc: "QoS and traffic shaping for VoIP, ERP systems, and video conferencing." }
    ],
    process: [
      "Requirement gathering & design",
      "IP addressing & VLAN planning",
      "Hardware procurement",
      "LAN infrastructure build",
      "WAN & ISP configuration",
      "End-to-end testing & sign-off"
    ]
  },
  {
    id: 'network-security',
    title: "Network Security",
    shortDescription: "Protecting your data from internal and external threats.",
    description: "Security is built into every layer of our network solutions. We protect your business assets with advanced firewall and access control policies.",
    icon: <Shield className="w-12 h-12" />,
    tags: ["Firewall", "VLAN Segmentation", "IDS/IPS", "VPN", "Access Control"],
    features: [
      { title: "Firewall Deployment", desc: "Implementation of pfSense, FortiGate, or MikroTik with content filtering." },
      { title: "VLAN Segmentation", desc: "Logical isolation between departments, guests, and IoT networks." },
      { title: "VPN Setup", desc: "Secure OpenVPN, WireGuard, or IPSec solutions for remote workforce access." },
      { title: "Network Access Control", desc: "802.1X port authentication to prevent unauthorised device access." },
      { title: "Security Audit & Hardening", desc: "Vulnerability assessments followed by remediation and hardening plans." }
    ],
    process: [
      "Security assessment",
      "Firewall & topology design",
      "Hardware/software procurement",
      "Firewall deployment & rules",
      "VLAN & access control config",
      "Penetration testing & sign-off"
    ]
  },
  {
    id: 'maintenance-support',
    title: "Maintenance & Support",
    shortDescription: "Proactive monitoring and mission-critical support.",
    description: "We don't just build networks; we keep them running. Our maintenance plans ensure maximum uptime and immediate expert assistance.",
    icon: <LifeBuoy className="w-12 h-12" />,
    tags: ["SLA Contracts", "Remote Support", "On-site Response", "Monitoring", "Annual Contracts"],
    features: [
      { title: "Annual Maintenance Contracts", desc: "Scheduled visits, firmware updates, and unlimited remote technical support." },
      { title: "24/7 Remote Monitoring", desc: "Real-time alerts that allow us to fix issues before they cause downtime." },
      { title: "On-site Response", desc: "4-hour response time in Kampala and next business day upcountry." },
      { title: "Hardware Replacement", desc: "Availability of critical spares to minimize recovery time from hardware failure." },
      { title: "Quarterly Health Reports", desc: "Detailed records of uptime, incident logs, and network improvement advice." }
    ],
    process: [
      "Network audit & asset register",
      "SLA & contract agreement",
      "Monitoring agent deployment",
      "Scheduled maintenance visits",
      "Incident response & resolution",
      "Quarterly reporting & review"
    ]
  }
];

// --- Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '',
  id
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline'; 
  onClick?: () => void;
  className?: string;
  id?: string;
}) => {
  const baseClasses = "px-8 py-3 rounded-full font-bold uppercase tracking-widest transition-all duration-300 inline-flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-cyan text-navy hover:shadow-lg hover:shadow-cyan/20 active:scale-95 hover:brightness-110",
    secondary: "bg-white text-navy hover:bg-white/90 active:scale-95",
    outline: "border border-cyan text-cyan hover:bg-cyan/10 active:scale-95"
  };

  return (
    <button id={id} onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | ServiceId>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<null | 'submitting' | 'success'>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: 'home' | ServiceId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const currentService = SERVICES.find(s => s.id === currentPage);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen selection:bg-cyan selection:text-navy">
      {/* Navigation */}
      <nav 
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-navy/80 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div 
            onClick={() => navigateTo('home')}
            className="text-2xl font-display font-black tracking-tighter cursor-pointer flex items-center"
          >
            <span className="uppercase">SHILO</span><span className="uppercase text-cyan">COM</span>
            <span className="ml-2 text-[10px] tracking-widest text-muted font-bold border border-muted/30 px-2 py-0.5 rounded uppercase">SNS</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {['Services', 'Why Us', 'Process', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => {
                  if (currentPage !== 'home') navigateTo('home');
                  const element = document.getElementById(item.toLowerCase().replace(' ', ''));
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm font-bold text-muted hover:text-cyan transition-colors uppercase tracking-widest"
                id={`nav-link-${item.toLowerCase()}`}
              >
                {item}
              </button>
            ))}
            <Button onClick={() => {
              if (currentPage !== 'home') navigateTo('home');
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            id="mobile-menu-toggle"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-navy border-b border-white/10 p-6 flex flex-col gap-6 md:hidden"
              id="mobile-menu"
            >
              {['Services', 'Why Us', 'Process', 'Contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => {
                    if (currentPage !== 'home') navigateTo('home');
                    const element = document.getElementById(item.toLowerCase().replace(' ', ''));
                    element?.scrollIntoView({ behavior: 'smooth' });
                    setIsMenuOpen(false);
                  }}
                  className="text-lg font-medium text-left"
                >
                  {item}
                </button>
              ))}
              <Button className="w-full" onClick={() => {
                if (currentPage !== 'home') navigateTo('home');
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}>
                Get a Quote
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        <AnimatePresence mode="wait">
          {currentPage === 'home' ? (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Section */}
              <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden">
                <div className="absolute inset-0 dot-grid opacity-40" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] glow-bg blur-3xl opacity-30 pointer-events-none" />
                
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left grid lg:grid-cols-2 gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-xs font-bold uppercase tracking-widest mb-8">
                      <Zap className="w-3 h-3" />
                      Uganda's Trusted Network Partner
                    </div>
                    <h1 className="text-6xl md:text-[84px] font-display font-black leading-[0.85] uppercase tracking-tighter mb-8">
                      Connecting Uganda, <br />
                      <span className="text-cyan">One Network</span> <br /> At a Time
                    </h1>
                    <p className="text-xl text-muted max-w-xl mb-12 leading-relaxed">
                      Enterprise-grade networking infrastructure supply, installation, and mission-critical support services. Build a future-proof foundation for your business.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <Button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                        Explore Our Services
                      </Button>
                      <Button variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                        Get a Free Quote
                      </Button>
                    </div>
                  </motion.div>

                  {/* Hero Visual */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="hidden lg:block relative"
                  >
                    <div className="w-full aspect-square border border-white/5 rounded-3xl p-12 bg-white/5 backdrop-blur-sm relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Network Topology Illustration */}
                      <svg viewBox="0 0 400 400" className="w-full h-full text-cyan">
                        <motion.circle cx="200" cy="200" r="40" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2"
                          animate={{ r: [40, 45, 40] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        />
                        <text x="200" y="200" textAnchor="middle" dy=".3em" fontSize="12" fontWeight="bold" fill="white">SNS HUB</text>
                        
                        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                          const rad = (angle * Math.PI) / 180;
                          const x = 200 + Math.cos(rad) * 120;
                          const y = 200 + Math.sin(rad) * 120;
                          return (
                            <g key={i}>
                              <motion.line 
                                x1="200" y1="200" x2={x} y2={y} 
                                stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" 
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, delay: i * 0.2 }}
                              />
                              <circle cx={x} cy={y} r="15" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
                              <circle cx={x} cy={y} r="4" fill="white" />
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Stats Strip */}
              <div className="bg-white/5 border-y border-white/5 relative overflow-hidden backdrop-blur-md">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
                  {[
                    { val: "200+", label: "Projects completed" },
                    { val: "100+", label: "Happy clients" },
                    { val: "10+", label: "Years experience" },
                    { val: "24/7", label: "Priority support" }
                  ].map((stat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`px-10 py-12 text-center md:text-left ${i < 3 ? 'md:border-r border-white/10' : ''} ${i % 2 === 0 ? 'border-r md:border-r-0' : ''} ${i < 2 ? 'border-b md:border-b-0' : ''}`}
                    >
                      <div className="text-4xl md:text-5xl font-display font-black text-cyan mb-2 tracking-tighter uppercase">{stat.val}</div>
                      <div className="text-[10px] uppercase tracking-[2px] font-bold text-muted">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Services Section */}
              <section id="services" className="py-32 bg-navy relative">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center mb-20 max-w-3xl mx-auto">
                    <span className="text-cyan font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Our Expertise</span>
                    <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter mb-6">Designed for Performance</h2>
                    <p className="text-muted text-lg leading-relaxed italic">
                      "We combine technical precision with reliability to deliver network infrastructure that scales with your growth."
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SERVICES.map((service, i) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => navigateTo(service.id)}
                        id={`service-card-${service.id}`}
                        className="group relative cursor-pointer"
                      >
                        <div className="h-full bg-white/[0.03] border border-white/5 rounded-2xl p-8 transition-all duration-500 group-hover:-translate-y-2 group-hover:border-cyan/50 group-hover:bg-cyan/5">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left shadow-[0_0_15px_rgba(0,212,255,0.5)]" />
                          
                          <div className="text-cyan mb-8 bg-cyan/10 w-20 h-20 rounded-2xl flex items-center justify-center p-4">
                            {service.icon}
                          </div>
                          
                          <h3 className="text-2xl font-display font-black uppercase tracking-tighter mb-4 group-hover:text-cyan transition-colors">{service.title}</h3>
                          <p className="text-muted mb-8 line-clamp-2 leading-relaxed text-sm font-medium">{service.shortDescription}</p>
                          
                          <div className="flex items-center text-cyan text-[10px] uppercase font-black tracking-widest gap-2">
                            Learn more <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Why Us Section */}
              <section id="whyus" className="py-32 relative overflow-hidden border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-cyan font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Difference that matters</span>
                    <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter mb-12">Why Choose Shilocom</h2>
                    
                    <div className="space-y-10">
                      {[
                        { title: "End-to-End Service", desc: "From physical site surveying to final software configuration and logic-path testing." },
                        { title: "Certified Engineers", desc: "Our team carries industry-recognised certifications across Top-Tier networking brands." },
                        { title: "Competitive Pricing", desc: "Transparent, itemised quotations with no hidden costs, tailored to your budget constraints." },
                        { title: "Fast Turnaround", desc: "Agile deployment methodologies to ensure your network is live within the shortest time possible." }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-6">
                          <div className="flex-shrink-0 w-12 h-12 rounded-2xl border border-cyan/30 flex items-center justify-center text-cyan uppercase text-xs font-black">
                            {i + 1}
                          </div>
                          <div>
                            <h4 className="text-lg font-display font-black uppercase tracking-tighter mb-1">{item.title}</h4>
                            <p className="text-muted leading-relaxed text-sm font-medium">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative bg-white/5 p-12 rounded-[2rem] border border-white/10"
                  >
                    <div className="absolute top-0 right-0 p-8 text-cyan opacity-20">
                      <Layers className="w-24 h-24" />
                    </div>
                    {/* SVG Diagram as specified */}
                    <svg viewBox="0 0 400 400" className="w-full h-full text-cyan">
                      <defs>
                        <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#00d4ff" />
                          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <circle cx="200" cy="200" r="50" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
                      <text x="200" y="200" textAnchor="middle" dy=".3em" fontSize="11" fill="white" fontWeight="bold">SHILOCOM</text>
                      
                      {[
                        { name: 'LAN', angle: 0 },
                        { name: 'WiFi', angle: 60 },
                        { name: 'WAN', angle: 120 },
                        { name: 'VPN', angle: 180 },
                        { name: 'CAT6', angle: 240 },
                        { name: 'Security', angle: 300 }
                      ].map((node, i) => {
                        const rad = (node.angle * Math.PI) / 180;
                        const x = 200 + Math.cos(rad) * 130;
                        const y = 200 + Math.sin(rad) * 130;
                        return (
                          <g key={i}>
                            <line x1="200" y1="200" x2={x} y2={y} stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" className="opacity-50" />
                            <circle cx={x} cy={y} r="25" fill="navy" stroke="currentColor" strokeWidth="1" />
                            <text x={x} y={y} textAnchor="middle" dy=".3em" fontSize="9" fill="white">{node.name}</text>
                          </g>
                        );
                      })}
                    </svg>
                  </motion.div>
                </div>
              </section>

              {/* Process Section */}
              <section id="process" className="py-32 bg-white/[0.02] border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="text-center mb-20">
                    <span className="text-cyan font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Proven Approach</span>
                    <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter">Our Implementation</h2>
                  </div>

                  <div className="relative">
                    {/* Connection Line */}
                    <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[1px] border-t border-dashed border-white/20 z-0" />
                    
                    <div className="grid md:grid-cols-5 gap-8 relative z-10">
                      {[
                        { step: "01", title: "Consultation", icon: <Users className="w-6 h-6" /> },
                        { step: "02", title: "Site Survey", icon: <MapPin className="w-6 h-6" /> },
                        { step: "03", title: "Quotation", icon: <ShieldCheck className="w-6 h-6" /> },
                        { step: "04", title: "Installation", icon: <Layers className="w-6 h-6" /> },
                        { step: "05", title: "Handover", icon: <CheckCircle2 className="w-6 h-6" /> }
                      ].map((s, i) => (
                        <motion.div 
                          key={i} 
                          className="text-center"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className="w-30 h-30 mx-auto rounded-3xl bg-navy border border-white/10 flex items-center justify-center p-6 mb-8 shadow-2xl group transition-all hover:border-cyan/50">
                            <div className="text-cyan flex flex-col items-center">
                              <span className="text-xs font-black tracking-widest mb-2 opacity-50 uppercase">{s.step}</span>
                              {s.icon}
                            </div>
                          </div>
                          <h4 className="text-lg font-display font-black uppercase tracking-tighter">{s.title}</h4>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="py-32">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter mb-8 italic">Ready to secure your network?</h2>
                    <p className="text-muted text-lg mb-12 max-w-md font-medium">Our experts are ready to assist you with any networking challenge. Reach out today for a consultation.</p>
                    
                    <div className="space-y-8">
                      <a href="https://wa.me/256769417242" target="_blank" rel="noopener" className="flex items-center gap-6 group cursor-pointer w-fit">
                        <div className="w-14 h-14 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan transition-colors group-hover:bg-cyan group-hover:text-navy group-hover:scale-110">
                          <Phone className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-1">Call / WhatsApp</div>
                          <div className="text-xl font-display font-black uppercase tracking-tighter">+256 769 417 242</div>
                        </div>
                      </a>

                      <a href="mailto:info@shilocom.org" className="flex items-center gap-6 group cursor-pointer w-fit">
                        <div className="w-14 h-14 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan transition-colors group-hover:bg-cyan group-hover:text-navy group-hover:scale-110">
                          <Mail className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-1">Email Support</div>
                          <div className="text-xl font-display font-black uppercase tracking-tighter">info@shilocom.org</div>
                        </div>
                      </a>

                      <div className="flex items-center gap-6 group w-fit">
                        <div className="w-14 h-14 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan group-hover:scale-110 transition-transform">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-1">Location</div>
                          <div className="text-xl font-display font-black uppercase tracking-tighter">Kampala, Uganda</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 group w-fit">
                        <div className="w-14 h-14 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan">
                          <Globe className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-1">Website</div>
                          <div className="text-xl font-display font-black uppercase tracking-tighter">shilocom.org</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12"
                  >
                    <h3 className="text-2xl font-bold mb-8">Request a Free Quote</h3>
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-muted pl-1">Full Name</label>
                          <input required type="text" placeholder="John Doe" className="w-full bg-navy border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-muted pl-1">Email Address</label>
                          <input required type="email" placeholder="john@example.com" className="w-full bg-navy border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all" />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-muted pl-1">Phone Number</label>
                          <input required type="tel" placeholder="+256..." className="w-full bg-navy border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-muted pl-1">Required Service</label>
                          <select required className="w-full bg-navy border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all appearance-none cursor-pointer">
                            <option value="">Select a service</option>
                            {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                            <option value="full-infrastructure">Full Network Infrastructure</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted pl-1">Your Message</label>
                        <textarea required placeholder="Tell us more about your project..." rows={4} className="w-full bg-navy border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all resize-none" />
                      </div>

                      <Button id="form-submit" className="w-full py-5 text-lg" variant="primary">
                        {formStatus === 'submitting' ? 'Processing...' : 'Submit Request'}
                      </Button>

                      {formStatus === 'success' && (
                        <motion.p 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-cyan text-center font-bold"
                        >
                          Thank you! We'll be in touch within 24 hours.
                        </motion.p>
                      )}
                    </form>
                  </motion.div>
                </div>
              </section>
            </motion.div>
          ) : (
            currentService && (
              <motion.div 
                key={currentService.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="pt-40 pb-32"
              >
                <div className="max-w-7xl mx-auto px-6">
                  {/* Service Hero */}
                  <button 
                    onClick={() => navigateTo('home')}
                    className="inline-flex items-center gap-2 text-cyan font-black uppercase tracking-widest text-xs hover:gap-4 transition-all mb-12 group"
                    id="back-to-services"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to all services
                  </button>

                  <div className="grid lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                      <div className="text-cyan mb-8">
                        {currentService.icon}
                      </div>
                      <h1 className="text-5xl md:text-7xl font-display font-black mb-10 leading-none uppercase tracking-tighter italic">
                        {currentService.title}
                      </h1>
                      <div className="flex flex-wrap gap-2 mb-12">
                        {currentService.tags.map(tag => (
                          <span key={tag} className="px-4 py-1.5 rounded-xl bg-cyan/5 border border-cyan/10 text-cyan text-[10px] font-black uppercase tracking-widest">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="space-y-6 text-muted text-lg leading-relaxed mb-16 font-medium">
                        <p>{currentService.description}</p>
                      </div>

                      {/* Features */}
                      <h3 className="text-3xl font-display font-black mb-10 uppercase tracking-tighter italic">What's Included</h3>
                      <div className="grid sm:grid-cols-2 gap-6 mb-20">
                        {currentService.features.map((f, i) => (
                          <div key={i} className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:border-cyan/30 transition-colors">
                            <CheckCircle2 className="text-cyan w-6 h-6 mb-6" />
                            <h4 className="text-xl font-display font-black uppercase tracking-tighter mb-3">{f.title}</h4>
                            <p className="text-muted leading-relaxed text-sm font-medium">{f.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-12">
                      {/* Sub-Process */}
                      <div className="bg-white/[0.03] rounded-[2rem] p-8 border border-white/5">
                        <h4 className="text-xl font-display font-black uppercase tracking-tighter mb-8 flex items-center gap-3 italic">
                          <div className="w-2 h-8 bg-cyan rounded-full" />
                          The Process
                        </h4>
                        <div className="space-y-8">
                          {currentService.process.map((step, i) => (
                            <div key={i} className="flex gap-4 items-start">
                              <span className="text-cyan font-black tabular-nums tracking-tighter">0{i + 1}</span>
                              <span className="text-muted leading-tight font-medium uppercase text-[11px] tracking-widest">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Box */}
                      <div className="bg-cyan p-10 rounded-[2.5rem] text-navy relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                          <Zap className="w-32 h-32" />
                        </div>
                        <h4 className="text-3xl font-display font-black mb-4 uppercase tracking-tighter leading-none italic">Need this solution?</h4>
                        <p className="font-bold text-sm mb-8 opacity-80 leading-relaxed uppercase tracking-wide">Let's build a secure and scalable network tailored to your needs.</p>
                        <Button variant="secondary" className="w-full mb-4" onClick={() => navigateTo('home')}>Get a Quote</Button>
                        <a href="tel:+256769417242" className="block text-center font-black text-xs uppercase tracking-[0.2em] underline">+256 769 417 242</a>
                      </div>

                      {/* Related Services */}
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-muted">Related Services</h4>
                        <div className="space-y-4">
                          {SERVICES.filter(s => s.id !== currentService.id).slice(0, 3).map(s => (
                            <button 
                              key={s.id} 
                              onClick={() => navigateTo(s.id)}
                              className="w-full text-left p-6 rounded-2xl border border-white/5 hover:border-cyan/50 hover:bg-white/5 transition-all text-muted hover:text-white font-display font-black uppercase tracking-tighter"
                            >
                              {s.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-20 bg-[#060b13] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16 items-center border-b border-white/5 pb-16">
            <div>
              <div 
                onClick={() => navigateTo('home')}
                className="text-2xl font-display font-black tracking-tighter cursor-pointer flex items-center mb-6"
              >
                <span className="uppercase">SHILO</span><span className="uppercase text-cyan">COM</span>
                <span className="ml-2 text-[10px] tracking-widest text-muted font-bold border border-muted/30 px-2 py-0.5 rounded uppercase">SNS</span>
              </div>
              <p className="text-muted leading-relaxed text-xs font-bold uppercase tracking-widest opacity-60">"Connecting Uganda, One Network at a Time." Reliable, enterprise-grade networking solutions for Kampala and beyond.</p>
            </div>

            <div className="text-center text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
              © {new Date().getFullYear()} SHILOCOM NETWORKING SERVICES. ALL RIGHTS RESERVED.
            </div>

            <div className="flex justify-end gap-10">
              <button onClick={() => navigateTo('home')} className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-cyan transition-colors">Services</button>
              <button onClick={() => {
                if (currentPage !== 'home') navigateTo('home');
                setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }} className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-cyan transition-colors">Contact</button>
              <a href="mailto:info@shilocom.org" className="text-[10px] font-black uppercase tracking-widest text-muted hover:text-cyan transition-colors">Email Us</a>
            </div>
          </div>
          
          <div className="pt-10 flex flex-wrap gap-4 items-center justify-center text-[9px] uppercase font-black tracking-[0.4em] text-cyan opacity-30">
            <span>Switches</span>
            <div className="w-1 h-1 bg-cyan/40 rounded-full" />
            <span>Routers</span>
            <div className="w-1 h-1 bg-cyan/40 rounded-full" />
            <span>WiFi 6</span>
            <div className="w-1 h-1 bg-cyan/40 rounded-full" />
            <span>Cat6A</span>
            <div className="w-1 h-1 bg-cyan/40 rounded-full" />
            <span>Fibre Optics</span>
            <div className="w-1 h-1 bg-cyan/40 rounded-full" />
            <span>Firewalls</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
