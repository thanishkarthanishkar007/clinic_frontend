
import { useState, useEffect } from "react";

const BLUE = "#1a73e8";
const DARK_BLUE = "#0d5abf";
const LIGHT_BLUE = "#e8f0fe";
const GREEN = "#25d366";
const GRAY_BG = "#f5f7fa";
const BORDER = "#e0e0e0";
const TEXT = "#222";
const MUTED = "#666";

const styles = {
  // Reset & base
  body: {
    fontFamily: "'Segoe UI', Arial, sans-serif",
    color: TEXT,
    lineHeight: 1.6,
    overflowX: "hidden",
    margin: 0,
    padding: 0,
  },

  // Navbar
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 5%",
    height: 68,
    background: "#fff",
    boxShadow: "0 2px 14px rgba(0,0,0,.09)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: 21,
    fontWeight: 800,
    color: BLUE,
    whiteSpace: "nowrap",
  },

  // Hero
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 40,
    padding: "70px 5%",
    background: "linear-gradient(135deg,#ddeeff 0%,#f0f6ff 50%,#fff 100%)",
    flexWrap: "wrap",
  },
  heroText: { flex: 1, minWidth: 0 },
  heroH1: { fontSize: "clamp(28px,5vw,52px)", lineHeight: 1.18, color: TEXT, marginBottom: 18, fontWeight: 800 },
  heroSpan: { color: BLUE },
  heroP: { fontSize: "clamp(15px,2vw,18px)", color: MUTED, marginBottom: 32, maxWidth: 480 },
  heroBtns: { display: "flex", gap: 14, flexWrap: "wrap" },
  heroImage: { flex: 1, minWidth: 0, textAlign: "center" },
  heroImg: { width: "100%", maxWidth: 460, borderRadius: 20, margin: "auto" },

  // Buttons
  btnPrimary: {
    display: "inline-block",
    background: BLUE,
    color: "#fff",
    padding: "13px 30px",
    borderRadius: 8,
    border: "none",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    transition: "background .3s",
  },
  btnOutline: {
    display: "inline-block",
    background: "transparent",
    color: BLUE,
    padding: "13px 30px",
    borderRadius: 8,
    border: `2px solid ${BLUE}`,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "none",
    transition: "all .3s",
  },
  btnSmall: {
    display: "inline-block",
    background: BLUE,
    color: "#fff",
    padding: "9px 22px",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
    cursor: "pointer",
  },
  btnBook: {
    background: BLUE,
    color: "#fff",
    padding: "9px 18px",
    borderRadius: 7,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
    cursor: "pointer",
  },

  // Stats
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    background: BLUE,
    padding: "36px 5%",
  },
  stat: { textAlign: "center", color: "#fff", padding: 10 },
  statH2: { fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, margin: 0 },
  statP: { fontSize: 14, opacity: 0.9, marginTop: 4 },

  // Section title
  sectionTitle: { textAlign: "center", marginBottom: 50 },
  sectionTitleH2: { fontSize: "clamp(24px,4vw,36px)", color: TEXT, marginBottom: 10, fontWeight: 700 },
  sectionTitleP: { fontSize: 16, color: MUTED },

  // About
  about: { padding: "80px 5%", background: "#fff" },
  aboutContent: { display: "flex", gap: 60, alignItems: "center", flexWrap: "wrap" },
  aboutImage: { flex: 1, minWidth: 280 },
  aboutImg: { width: "100%", borderRadius: 16 },
  aboutText: { flex: 1, minWidth: 280 },
  aboutH3: { fontSize: "clamp(20px,3vw,28px)", marginBottom: 14, color: TEXT, fontWeight: 700 },
  aboutP: { color: MUTED, marginBottom: 14, fontSize: 15 },
  aboutList: { marginBottom: 26, paddingLeft: 0, listStyle: "none" },
  aboutLi: { padding: "7px 0", fontSize: 15, color: TEXT },

  // Doctors
  doctors: { padding: "80px 5%", background: GRAY_BG },
  doctorsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 26,
  },
  doctorCard: {
    background: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "0 4px 18px rgba(0,0,0,.08)",
    textAlign: "center",
    transition: "transform .3s, box-shadow .3s",
    cursor: "default",
  },
  doctorImg: { width: "100%", height: 200, objectFit: "cover" },
  doctorInfo: { padding: "20px 16px" },
  doctorH3: { fontSize: 17, marginBottom: 5, color: TEXT, fontWeight: 700 },
  spec: { color: BLUE, fontSize: 13, fontWeight: 700, marginBottom: 4 },
  exp: { color: "#888", fontSize: 13, marginBottom: 14 },

  // Services
  services: { padding: "80px 5%", background: "#fff" },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: 22,
  },
  serviceCard: {
    background: GRAY_BG,
    borderRadius: 12,
    padding: "28px 18px",
    textAlign: "center",
    border: "2px solid transparent",
    transition: "all .3s",
    cursor: "default",
  },
  serviceCardHover: {
    background: LIGHT_BLUE,
    borderColor: BLUE,
    transform: "translateY(-5px)",
  },
  serviceIcon: { fontSize: 42, marginBottom: 14 },
  serviceH3: { fontSize: 16, marginBottom: 8, color: TEXT, fontWeight: 700 },
  serviceP: { fontSize: 14, color: MUTED },

  // Appointment
  appointment: { padding: "80px 5%", background: GRAY_BG },
  apptBox: {
    display: "flex",
    gap: 40,
    background: "#fff",
    borderRadius: 18,
    padding: "48px 44px",
    boxShadow: "0 6px 32px rgba(0,0,0,.08)",
    flexWrap: "wrap",
  },
  apptInfo: {
    flex: "0 0 290px",
    background: BLUE,
    color: "#fff",
    padding: "36px 28px",
    borderRadius: 12,
  },
  apptInfoH3: { fontSize: 20, marginBottom: 20, fontWeight: 700 },
  apptInfoP: { marginBottom: 12, fontSize: 15, opacity: 0.95 },
  waBtn: {
    display: "inline-block",
    background: GREEN,
    color: "#fff",
    padding: "12px 18px",
    borderRadius: 8,
    fontWeight: 700,
    marginTop: 12,
    textDecoration: "none",
    fontSize: 15,
    cursor: "pointer",
  },
  apptForm: { flex: 1, minWidth: 0 },
  formRow: { display: "flex", gap: 18, marginBottom: 16, flexWrap: "wrap" },
  formGroup: { flex: 1, display: "flex", flexDirection: "column", gap: 6, minWidth: 200 },
  formLabel: { fontSize: 14, fontWeight: 700, color: TEXT },
  formInput: {
    padding: "11px 14px",
    border: `1.5px solid ${BORDER}`,
    borderRadius: 8,
    fontSize: 15,
    fontFamily: "inherit",
    outline: "none",
    color: TEXT,
    background: "#fff",
    width: "100%",
    boxSizing: "border-box",
  },
  successMsg: {
    marginTop: 14,
    padding: 14,
    background: "#d4edda",
    border: "1px solid #b8dfc2",
    color: "#155724",
    borderRadius: 8,
    fontSize: 15,
  },

  // Contact / Map
  contact: { padding: "80px 5%", background: "#fff" },
  mapWrap: { borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 18px rgba(0,0,0,.1)" },

  // Footer
  footer: { background: "#0f0f24", color: "#b0b0c0", padding: "60px 5% 22px" },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
    gap: 40,
    marginBottom: 40,
  },
  footerColH3: { color: "#fff", fontSize: 17, marginBottom: 14, fontWeight: 700 },
  footerColP: { fontSize: 14, marginBottom: 8, lineHeight: 1.7 },
  footerLinkUl: { listStyle: "none", padding: 0, margin: 0 },
  footerLinkLi: { marginBottom: 8 },
  footerLinkA: { color: "#b0b0c0", fontSize: 14, textDecoration: "none" },
  footerBottom: {
    textAlign: "center",
    paddingTop: 20,
    borderTop: "1px solid #1e1e38",
    fontSize: 13,
    color: "#555",
  },

  // Back to top
  backToTop: {
    position: "fixed",
    bottom: 24,
    right: 24,
    background: BLUE,
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: 48,
    height: 48,
    fontSize: 20,
    cursor: "pointer",
    zIndex: 998,
    boxShadow: "0 4px 14px rgba(26,115,232,.4)",
    transition: "background .3s, transform .2s",
  },
};

// ── Navbar ──────────────────────────────────────────────────────────
function Navbar({ onNav }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Doctors", id: "doctors" },
    { label: "Services", id: "services" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <nav style={styles.navbar}>
        <div style={styles.logo}>🏥 MediCare Clinic</div>

        {/* Desktop links */}
        <ul style={{ display: "flex", alignItems: "center", gap: 26, listStyle: "none", margin: 0, padding: 0 }}
          className="nav-desktop">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={(e) => { e.preventDefault(); onNav(l.id); }}
                style={{ color: "#444", fontSize: 15, fontWeight: 500, textDecoration: "none" }}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#appointment"
              onClick={(e) => { e.preventDefault(); onNav("appointment"); }}
              style={styles.btnBook}
            >
              Book Appointment
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", fontSize: 28, color: BLUE, cursor: "pointer", padding: 4 }}
          className="nav-hamburger"
          aria-label="Open menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{
          display: "flex", flexDirection: "column",
          position: "fixed", top: 68, left: 0, right: 0,
          background: "#fff", boxShadow: "0 8px 24px rgba(0,0,0,.12)",
          zIndex: 999, padding: "8px 0 20px",
        }}>
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => { e.preventDefault(); setMenuOpen(false); onNav(l.id); }}
              style={{ padding: "14px 5%", fontSize: 16, fontWeight: 500, color: "#333", borderBottom: "1px solid #f0f0f0", textDecoration: "none" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#appointment"
            onClick={(e) => { e.preventDefault(); setMenuOpen(false); onNav("appointment"); }}
            style={{ margin: "14px 5% 0", background: BLUE, color: "#fff", padding: 13, borderRadius: 8, textAlign: "center", fontWeight: 600, textDecoration: "none" }}
          >
            📅 Book Appointment
          </a>
        </div>
      )}
    </>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────
function Hero({ onNav }) {
  return (
    <section id="home" style={styles.hero}>
      <div style={styles.heroText}>
        <h1 style={styles.heroH1}>
          Your Health,<br />
          <span style={styles.heroSpan}>Our Priority</span>
        </h1>
        <p style={styles.heroP}>
          Trusted medical care for you and your family. Book an appointment with our expert doctors today.
        </p>
        <div style={styles.heroBtns}>
          <a href="#appointment" onClick={(e) => { e.preventDefault(); onNav("appointment"); }} style={styles.btnPrimary}>
            Book Appointment
          </a>
          <a href="#services" onClick={(e) => { e.preventDefault(); onNav("services"); }} style={styles.btnOutline}>
            Our Services
          </a>
        </div>
      </div>
      <div style={styles.heroImage}>
        <img
          src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
          alt="Doctor"
          style={styles.heroImg}
        />
      </div>
    </section>
  );
}

// ── Stats ─────────────────────────────────────────────────────────────
function Stats() {
  const data = [
    { num: "5000+", label: "Happy Patients" },
    { num: "15+", label: "Expert Doctors" },
    { num: "10+", label: "Years Experience" },
    { num: "20+", label: "Services" },
  ];
  return (
    <div style={styles.stats}>
      {data.map((s) => (
        <div key={s.label} style={styles.stat}>
          <h2 style={styles.statH2}>{s.num}</h2>
          <p style={styles.statP}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

// ── About ─────────────────────────────────────────────────────────────
function About({ onNav }) {
  return (
    <section id="about" style={styles.about}>
      <div style={styles.sectionTitle}>
        <h2 style={styles.sectionTitleH2}>About Our Clinic</h2>
        <p style={styles.sectionTitleP}>We are committed to delivering quality healthcare</p>
      </div>
      <div style={styles.aboutContent}>
        <div style={styles.aboutImage}>
          <img
            src="https://img.freepik.com/free-vector/hospital-building-concept-illustration_114360-8440.jpg"
            alt="Clinic"
            style={styles.aboutImg}
          />
        </div>
        <div style={styles.aboutText}>
          <h3 style={styles.aboutH3}>A Clinic You Can Trust</h3>
          <p style={styles.aboutP}>
            MediCare Clinic has been serving the community for over 10 years with highly qualified doctors and friendly staff.
          </p>
          <p style={styles.aboutP}>
            Our modern facilities and patient-first approach ensure you always receive the best care in a comfortable environment.
          </p>
          <ul style={styles.aboutList}>
            {["✅ Qualified & Experienced Doctors", "✅ Modern Medical Equipment", "✅ 24/7 Emergency Support", "✅ Affordable Treatment Plans", "✅ Friendly & Caring Staff"].map((item) => (
              <li key={item} style={styles.aboutLi}>{item}</li>
            ))}
          </ul>
          <a href="#appointment" onClick={(e) => { e.preventDefault(); onNav("appointment"); }} style={styles.btnPrimary}>
            Get Consultation
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Doctors ───────────────────────────────────────────────────────────
function Doctors({ onNav }) {
  const doctors = [
    { name: "Dr. Rajesh Kumar", spec: "General Physician", exp: "15 Years Experience", img: "https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg" },
    { name: "Dr. Priya Sharma", spec: "Pediatrician", exp: "12 Years Experience", img: "https://img.freepik.com/free-vector/female-doctor-with-stethoscope_1270-64.jpg" },
    { name: "Dr. Suresh Nair", spec: "Cardiologist", exp: "18 Years Experience", img: "https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg" },
    { name: "Dr. Meena Patel", spec: "Dermatologist", exp: "10 Years Experience", img: "https://img.freepik.com/free-vector/female-doctor-with-stethoscope_1270-64.jpg" },
  ];

  return (
    <section id="doctors" style={styles.doctors}>
      <div style={styles.sectionTitle}>
        <h2 style={styles.sectionTitleH2}>Our Doctors</h2>
        <p style={styles.sectionTitleP}>Meet our team of expert medical professionals</p>
      </div>
      <div style={styles.doctorsGrid}>
        {doctors.map((d) => (
          <DoctorCard key={d.name} doctor={d} onNav={onNav} />
        ))}
      </div>
    </section>
  );
}

function DoctorCard({ doctor, onNav }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ ...styles.doctorCard, transform: hovered ? "translateY(-7px)" : "none", boxShadow: hovered ? "0 10px 30px rgba(0,0,0,.13)" : "0 4px 18px rgba(0,0,0,.08)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={doctor.img} alt={doctor.name} style={styles.doctorImg} />
      <div style={styles.doctorInfo}>
        <h3 style={styles.doctorH3}>{doctor.name}</h3>
        <p style={styles.spec}>{doctor.spec}</p>
        <p style={styles.exp}>{doctor.exp}</p>
        <a href="#appointment" onClick={(e) => { e.preventDefault(); onNav("appointment"); }} style={styles.btnSmall}>
          Book Now
        </a>
      </div>
    </div>
  );
}

// ── Services ──────────────────────────────────────────────────────────
function Services() {
  const services = [
    { icon: "🫀", title: "Cardiology", desc: "ECG, Echo and complete heart care by expert cardiologists." },
    { icon: "👶", title: "Pediatrics", desc: "Specialized care for children from newborn to teenage years." },
    { icon: "🦷", title: "Dental Care", desc: "General dentistry, orthodontics and cosmetic procedures." },
    { icon: "👁️", title: "Eye Care", desc: "Eye exams, vision correction and eye disease treatment." },
    { icon: "🧠", title: "Neurology", desc: "Brain, spine and nervous system diagnosis and treatment." },
    { icon: "🩻", title: "Radiology", desc: "X-Ray, MRI, CT Scan and Ultrasound imaging on-site." },
    { icon: "💊", title: "General Medicine", desc: "Common illness treatment, preventive care and checkups." },
    { icon: "🧪", title: "Lab Tests", desc: "Blood work, urine analysis and diagnostic tests on-site." },
  ];

  return (
    <section id="services" style={styles.services}>
      <div style={styles.sectionTitle}>
        <h2 style={styles.sectionTitleH2}>Our Services</h2>
        <p style={styles.sectionTitleP}>We offer a wide range of medical services</p>
      </div>
      <div style={styles.servicesGrid}>
        {services.map((s) => (
          <ServiceCard key={s.title} service={s} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ ...styles.serviceCard, ...(hovered ? styles.serviceCardHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.serviceIcon}>{service.icon}</div>
      <h3 style={styles.serviceH3}>{service.title}</h3>
      <p style={styles.serviceP}>{service.desc}</p>
    </div>
  );
}

// ── Appointment Form ──────────────────────────────────────────────────
function Appointment() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", dept: "", date: "", time: "", msg: "" });
  const [success, setSuccess] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.dept || !form.date || !form.time) {
      alert("Please fill in all required fields marked with *");
      return;
    }
    setSuccess(true);
    setForm({ name: "", phone: "", email: "", dept: "", date: "", time: "", msg: "" });
    setTimeout(() => setSuccess(false), 6000);
  };

  const timeSlots = ["9:00 AM – 10:00 AM", "10:00 AM – 11:00 AM", "11:00 AM – 12:00 PM", "2:00 PM – 3:00 PM", "3:00 PM – 4:00 PM", "4:00 PM – 5:00 PM", "5:00 PM – 6:00 PM"];
  const depts = ["General Medicine", "Cardiology", "Pediatrics", "Dental Care", "Eye Care", "Neurology", "Radiology", "Lab Tests"];

  return (
    <section id="appointment" style={styles.appointment}>
      <div style={styles.sectionTitle}>
        <h2 style={styles.sectionTitleH2}>Book an Appointment</h2>
        <p style={styles.sectionTitleP}>Fill in the form and we will contact you shortly</p>
      </div>
      <div style={styles.apptBox}>

        {/* Info Panel */}
        <div style={styles.apptInfo}>
          <h3 style={styles.apptInfoH3}>Contact Information</h3>
          <p style={styles.apptInfoP}>📍 123, Main Road<br />Chennai – 600001</p>
          <p style={styles.apptInfoP}>📞 +91 98765 43210</p>
          <p style={styles.apptInfoP}>✉️ info@medicareclinic.com</p>
          <p style={styles.apptInfoP}>🕐 Mon–Sat: 9 AM – 8 PM</p>
          <p style={styles.apptInfoP}>🕐 Sunday: 10 AM – 2 PM</p>
          <br />
          <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={styles.waBtn}>
            💬 Chat on WhatsApp
          </a>
        </div>

        {/* Form */}
        <div style={styles.apptForm}>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required style={styles.formInput} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Phone Number *</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required style={styles.formInput} />
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" style={styles.formInput} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Department *</label>
              <select name="dept" value={form.dept} onChange={handleChange} required style={styles.formInput}>
                <option value="">Select Department</option>
                {depts.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Preferred Date *</label>
              <input name="date" type="date" value={form.date} min={today} onChange={handleChange} required style={styles.formInput} />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Preferred Time *</label>
              <select name="time" value={form.time} onChange={handleChange} required style={styles.formInput}>
                <option value="">Select Time Slot</option>
                {timeSlots.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div style={{ ...styles.formGroup, marginBottom: 18 }}>
            <label style={styles.formLabel}>Message / Symptoms</label>
            <textarea name="msg" value={form.msg} onChange={handleChange} rows={4} placeholder="Describe your symptoms or any special requirements..." style={{ ...styles.formInput, resize: "vertical" }} />
          </div>

          <button onClick={handleSubmit} style={{ ...styles.btnPrimary, width: "100%", fontSize: 16, padding: 14 }}>
            Submit Appointment Request
          </button>

          {success && (
            <div style={styles.successMsg}>
              ✅ Thank you! Your request has been submitted. We will contact you shortly.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Map ───────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" style={styles.contact}>
      <div style={styles.sectionTitle}>
        <h2 style={styles.sectionTitleH2}>Find Us</h2>
        <p style={styles.sectionTitleP}>Conveniently located in the heart of Chennai</p>
      </div>
      <div style={styles.mapWrap}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8!2d80.2707!3d13.0478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAyJzUyIk4!5e0!3m2!1sen!2sin!4v1"
          width="100%"
          height="420"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          title="MediCare Clinic Location"
        />
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────
function Footer({ onNav }) {
  const quickLinks = ["home", "about", "doctors", "services", "appointment"];
  const serviceLinks = ["General Medicine", "Cardiology", "Pediatrics", "Dental Care", "Lab Tests"];

  return (
    <footer style={styles.footer}>
      <div style={styles.footerGrid}>
        <div>
          <h3 style={styles.footerColH3}>🏥 MediCare Clinic</h3>
          <p style={styles.footerColP}>Providing quality healthcare to the community since 2014. Your health is our top priority.</p>
        </div>
        <div>
          <h3 style={styles.footerColH3}>Quick Links</h3>
          <ul style={styles.footerLinkUl}>
            {quickLinks.map((l) => (
              <li key={l} style={styles.footerLinkLi}>
                <a href={`#${l}`} onClick={(e) => { e.preventDefault(); onNav(l); }} style={styles.footerLinkA}>
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 style={styles.footerColH3}>Our Services</h3>
          <ul style={styles.footerLinkUl}>
            {serviceLinks.map((s) => (
              <li key={s} style={styles.footerLinkLi}>
                <a href="#services" onClick={(e) => { e.preventDefault(); onNav("services"); }} style={styles.footerLinkA}>{s}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 style={styles.footerColH3}>Contact Us</h3>
          <p style={styles.footerColP}>📍 123, Main Road, Chennai – 600001</p>
          <p style={styles.footerColP}>📞 +91 98765 43210</p>
          <p style={styles.footerColP}>✉️ info@medicareclinic.com</p>
          <br />
          <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={styles.waBtn}>
            💬 WhatsApp Us
          </a>
        </div>
      </div>
      <div style={styles.footerBottom}>
        <p>© 2025 MediCare Clinic. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

// ── Main App ──────────────────────────────────────────────────────────
export default function App() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
  };

  return (
    <div style={styles.body}>
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        body { overflow-x:hidden; }
        a { text-decoration:none; }
        ul { list-style:none; }
        img { max-width:100%; display:block; }

        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
        @media (min-width: 901px) {
          .nav-hamburger { display: none !important; }
          .nav-desktop { display: flex !important; }
        }
        @media (max-width: 600px) {
          #home { flex-direction: column !important; padding: 40px 4% 50px !important; text-align: center; }
          .hero-btns { justify-content: center !important; }
        }
      `}</style>

      <Navbar onNav={scrollToSection} />
      <Hero onNav={scrollToSection} />
      <Stats />
      <About onNav={scrollToSection} />
      <Doctors onNav={scrollToSection} />
      <Services />
      <Appointment />
      <Contact />
      <Footer onNav={scrollToSection} />

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={styles.backToTop}
          title="Back to top"
        >
          ⬆
        </button>
      )}
    </div>
  );
}
