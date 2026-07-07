
import { useState, useEffect } from "react";

// ── API Configuration ───────────────────────────────────────────────
// Points to the Spring Boot backend. Change this for production deployment.
const API_BASE_URL = "https://clinic-production-0f46.up.railway.app/api";

/**
 * Calls the backend POST /api/appointments endpoint.
 * Maps frontend form field names to the backend's AppointmentRequest shape.
 * Returns { ok: boolean, message: string, fieldErrors?: object }
 */
async function submitAppointment(form) {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: form.name,
        phoneNumber: form.phone,
        emailAddress: form.email || null,
        primaryConcern: form.concern,
        preferredDate: form.date,       // "YYYY-MM-DD"
        preferredTime: form.time,
        additionalNotes: form.msg || null,
      }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return { ok: true, message: result.message };
    }
    // Validation errors come back as a field->message map in result.data
    return {
      ok: false,
      message: result.message || "Something went wrong. Please try again.",
      fieldErrors: typeof result.data === "object" ? result.data : null,
    };
  } catch (err) {
    return {
      ok: false,
      message: "Could not reach the server. Please check your connection and try again.",
    };
  }
}


// ── Brand Palette ─────────────────────────────────────────────────────
// Primary: Deep Purple  #6c3fc4  (rich royal purple)
// Dark:    Dark Purple  #4e2d96
// Light:   Soft Lavender #f0ebff
// Accent:  Warm Gold    #c9963a  (premium feel)
// BG:      Soft White   #fafafa
// Surface: Pure White   #ffffff
// Text:    Charcoal     #1e1e1e
// Muted:   Warm Gray    #6b6070

const R   = "#6c3fc4";   // primary purple
const RD  = "#4e2d96";   // dark purple
const RL  = "#f0ebff";   // light lavender
const GOLD= "#c9963a";   // accent gold
const CREAM="#fafafa";   // page bg
const TEXT = "#1e1e1e";
const MUTED= "#6b6070";
const BORDER="#d8ccf5";
const GREEN= "#25d366";

const s = {
  // Navbar
  navbar: {
    display:"flex", justifyContent:"space-between", alignItems:"center",
    padding:"0 5%", height:68,
    background:"#fff", boxShadow:"0 2px 16px rgba(108,63,196,.10)",
    position:"sticky", top:0, zIndex:1000,
  },
  logo: { fontSize:20, fontWeight:800, color:R, whiteSpace:"nowrap", letterSpacing:"-0.3px" },
  logoSub: { fontSize:11, fontWeight:500, color:GOLD, letterSpacing:"1.5px", textTransform:"uppercase", display:"block", marginTop:-2 },
  btnBook: {
    background:R, color:"#fff", padding:"9px 20px",
    borderRadius:8, fontSize:14, fontWeight:700,
    textDecoration:"none", cursor:"pointer", letterSpacing:"0.2px",
  },

  // Buttons
  btnPrimary: {
    display:"inline-block", background:R, color:"#fff",
    padding:"13px 30px", borderRadius:8, border:"none",
    fontSize:15, fontWeight:700, cursor:"pointer", textDecoration:"none",
  },
  btnOutline: {
    display:"inline-block", background:"transparent", color:R,
    padding:"13px 30px", borderRadius:8, border:`2px solid ${R}`,
    fontSize:15, fontWeight:700, cursor:"pointer", textDecoration:"none",
  },
  btnSmall: {
    display:"inline-block", background:R, color:"#fff",
    padding:"9px 22px", borderRadius:6, fontSize:14,
    fontWeight:700, textDecoration:"none", cursor:"pointer",
  },

  // Hero
  hero: {
    display:"flex", alignItems:"center", justifyContent:"space-between",
    gap:40, padding:"70px 5%",
    background:`linear-gradient(135deg, #f0ebff 0%, #fafafa 55%, #f8f5ff 100%)`,
    flexWrap:"wrap",
  },
  heroText: { flex:1, minWidth:0 },
  heroEyebrow: {
    display:"inline-block", background:RL, color:R,
    fontSize:12, fontWeight:700, letterSpacing:"2px",
    textTransform:"uppercase", padding:"5px 14px",
    borderRadius:20, marginBottom:16,
  },
  heroH1: { fontSize:"clamp(28px,5vw,50px)", lineHeight:1.15, color:TEXT, marginBottom:18, fontWeight:800 },
  heroSpan: { color:R },
  heroP: { fontSize:"clamp(15px,2vw,17px)", color:MUTED, marginBottom:32, maxWidth:480, lineHeight:1.7 },
  heroBtns: { display:"flex", gap:14, flexWrap:"wrap" },
  heroImage: { flex:1, minWidth:0, textAlign:"center" },
  heroImg: { width:"100%", maxWidth:460, borderRadius:24, margin:"auto", objectFit:"cover" },
  heroBadge: {
    display:"inline-flex", alignItems:"center", gap:8,
    background:"#fff", border:`1px solid ${BORDER}`,
    borderRadius:40, padding:"8px 16px", marginTop:20,
    fontSize:13, color:MUTED, boxShadow:"0 2px 12px rgba(108,63,196,.08)",
  },
  heroBadgeDot: { width:8, height:8, borderRadius:"50%", background:"#4caf50", display:"inline-block" },

  // Stats
  stats: {
    display:"grid", gridTemplateColumns:"repeat(4,1fr)",
    background:R, padding:"36px 5%",
  },
  stat: { textAlign:"center", color:"#fff", padding:10 },
  statH2: { fontSize:"clamp(26px,4vw,40px)", fontWeight:800, margin:0 },
  statP: { fontSize:13, opacity:0.88, marginTop:4, letterSpacing:"0.3px" },

  // Section
  sectionTitle: { textAlign:"center", marginBottom:50 },
  sectionH2: { fontSize:"clamp(22px,4vw,34px)", color:TEXT, marginBottom:10, fontWeight:800 },
  sectionP: { fontSize:16, color:MUTED },
  sectionLine: { width:48, height:3, background:R, borderRadius:2, margin:"12px auto 0" },

  // About
  about: { padding:"80px 5%", background:"#fff" },
  aboutContent: { display:"flex", gap:60, alignItems:"center", flexWrap:"wrap" },
  aboutImage: { flex:1, minWidth:280 },
  aboutImg: { width:"100%", borderRadius:20, objectFit:"cover" },
  aboutText: { flex:1, minWidth:280 },
  aboutTag: {
    display:"inline-block", background:RL, color:R,
    fontSize:12, fontWeight:700, letterSpacing:"1.5px",
    textTransform:"uppercase", padding:"4px 12px", borderRadius:4, marginBottom:14,
  },
  aboutH3: { fontSize:"clamp(20px,3vw,28px)", marginBottom:14, color:TEXT, fontWeight:800 },
  aboutP: { color:MUTED, marginBottom:14, fontSize:15, lineHeight:1.75 },
  aboutList: { marginBottom:26, paddingLeft:0, listStyle:"none" },
  aboutLi: { padding:"7px 0", fontSize:15, color:TEXT, display:"flex", alignItems:"center", gap:10 },
  checkmark: { color:R, fontSize:18, fontWeight:700, flexShrink:0 },

  // Specialists
  specialists: { padding:"80px 5%", background:CREAM },
  specGrid: {
    display:"grid",
    gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
    gap:26,
  },
  specCard: {
    background:"#fff", borderRadius:18, overflow:"hidden",
    boxShadow:"0 4px 20px rgba(108,63,196,.09)",
    textAlign:"center", transition:"transform .3s, box-shadow .3s",
  },
  specImgWrap: { position:"relative", overflow:"hidden" },
  specImg: { width:"100%", height:210, objectFit:"cover", display:"block" },
  specOverlay: {
    position:"absolute", bottom:0, left:0, right:0,
    background:`linear-gradient(to top, ${R}cc, transparent)`,
    height:60,
  },
  specInfo: { padding:"18px 16px 22px" },
  specName: { fontSize:17, marginBottom:4, color:TEXT, fontWeight:800 },
  specRole: { color:R, fontSize:13, fontWeight:700, marginBottom:3, letterSpacing:"0.3px" },
  specExp: { color:MUTED, fontSize:13, marginBottom:14 },

  // Featured single doctor
  featuredDocWrap: {
    display:"flex", gap:48, alignItems:"center",
    background:"#fff", borderRadius:24, padding:"40px",
    boxShadow:"0 8px 36px rgba(108,63,196,.10)",
    maxWidth:920, margin:"0 auto", flexWrap:"wrap",
  },
  featuredDocImgCol: { flex:"0 0 260px" },
  featuredDocImg: {
    width:260, height:260, borderRadius:20, objectFit:"cover",
    boxShadow:"0 10px 30px rgba(108,63,196,.18)", margin:"0 auto",
  },
  featuredDocInfo: { flex:1, minWidth:260 },
  featuredDocName: { fontSize:"clamp(20px,3vw,26px)", color:TEXT, fontWeight:800, marginBottom:6 },

  // Services
  services: { padding:"80px 5%", background:"#fff" },
  servGrid: {
    display:"grid",
    gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",
    gap:22,
  },
  servCard: {
    background:CREAM, borderRadius:14,
    padding:"28px 20px", textAlign:"center",
    border:`2px solid transparent`, transition:"all .3s", cursor:"default",
  },
  servCardHover: {
    background:RL, borderColor:R, transform:"translateY(-5px)",
    boxShadow:`0 10px 28px rgba(108,63,196,.13)`,
  },
  servIcon: { fontSize:40, marginBottom:14 },
  servH3: { fontSize:15, marginBottom:8, color:TEXT, fontWeight:800 },
  servP: { fontSize:13, color:MUTED, lineHeight:1.6 },

  // Treatments / Why Us
  whyUs: { padding:"80px 5%", background:CREAM },
  whyGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:24 },
  whyCard: {
    background:"#fff", borderRadius:16, padding:"28px 22px",
    borderLeft:`4px solid ${R}`, borderRadius:0,
    boxShadow:"0 2px 14px rgba(108,63,196,.07)",
  },
  whyNum: { fontSize:36, fontWeight:800, color:RL, lineHeight:1, marginBottom:8 },
  whyNumInner: { color:R },
  whyH3: { fontSize:16, fontWeight:800, color:TEXT, marginBottom:8 },
  whyP: { fontSize:14, color:MUTED, lineHeight:1.65 },

  // Appointment
  appt: { padding:"80px 5%", background:CREAM },
  apptBox: {
    display:"flex", gap:40,
    background:"#fff", borderRadius:20,
    padding:"48px 44px", boxShadow:"0 8px 36px rgba(108,63,196,.10)",
    flexWrap:"wrap",
  },
  apptInfo: {
    flex:"0 0 280px", background:R, color:"#fff",
    padding:"36px 28px", borderRadius:14,
  },
  apptInfoH3: { fontSize:20, marginBottom:20, fontWeight:800 },
  apptInfoP: { marginBottom:12, fontSize:14, opacity:0.92, lineHeight:1.65 },
  waBtn: {
    display:"inline-block", background:GREEN, color:"#fff",
    padding:"12px 18px", borderRadius:8, fontWeight:700,
    marginTop:12, textDecoration:"none", fontSize:15,
  },
  apptForm: { flex:1, minWidth:0 },
  formRow: { display:"flex", gap:18, marginBottom:16, flexWrap:"wrap" },
  formGroup: { flex:1, display:"flex", flexDirection:"column", gap:6, minWidth:200 },
  formLabel: { fontSize:13, fontWeight:700, color:TEXT, letterSpacing:"0.3px" },
  formInput: {
    padding:"11px 14px", border:`1.5px solid ${BORDER}`,
    borderRadius:8, fontSize:15, fontFamily:"inherit",
    outline:"none", color:TEXT, background:"#fff",
    width:"100%", boxSizing:"border-box",
  },
  successMsg: {
    marginTop:14, padding:14, background:"#f0ebff",
    border:`1px solid ${R}`, color:RD, borderRadius:8, fontSize:15,
  },

  // Map
  contact: { padding:"80px 5%", background:"#fff" },
  mapWrap: { borderRadius:16, overflow:"hidden", boxShadow:"0 4px 20px rgba(108,63,196,.10)" },

  // Footer
  footer: { background:"#1a0d2e", color:"#b8a8b0", padding:"60px 5% 22px" },
  footerGrid: {
    display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",
    gap:40, marginBottom:40,
  },
  footerH3: { color:"#fff", fontSize:16, marginBottom:14, fontWeight:700 },
  footerP: { fontSize:14, marginBottom:8, lineHeight:1.75 },
  footerUl: { listStyle:"none", padding:0, margin:0 },
  footerLi: { marginBottom:8 },
  footerA: { color:"#b8a8b0", fontSize:14, textDecoration:"none" },
  footerBottom: {
    textAlign:"center", paddingTop:20,
    borderTop:"1px solid #1e1040", fontSize:13, color:"#3d2a6e",
  },

  backToTop: {
    position:"fixed", bottom:24, right:24,
    background:R, color:"#fff", border:"none", borderRadius:"50%",
    width:48, height:48, fontSize:20, cursor:"pointer", zIndex:998,
    boxShadow:"0 4px 16px rgba(108,63,196,.4)",
  },
};

// ── Navbar ────────────────────────────────────────────────────────────
function Navbar({ onNav }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label:"Home", id:"home" }, { label:"About", id:"about" },
    { label:"Specialists", id:"specialists" }, { label:"Services", id:"services" },
    { label:"Contact", id:"contact" },
  ];
  return (
    <>
      <nav style={s.navbar}>
        <div>
          <span style={s.logo}>✦ Devs Hair &amp; Skin Clinic</span>
          <span style={s.logoSub}>Dermatology &amp; Trichology</span>
        </div>
        <ul style={{ display:"flex", alignItems:"center", gap:24, listStyle:"none", margin:0, padding:0 }} className="nav-desktop">
          {links.map(l => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={e => { e.preventDefault(); onNav(l.id); }}
                style={{ color:"#444", fontSize:15, fontWeight:500, textDecoration:"none" }}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#appointment" onClick={e => { e.preventDefault(); onNav("appointment"); }} style={s.btnBook}>
              Book Consultation
            </a>
          </li>
        </ul>
        <button onClick={() => setOpen(!open)}
          style={{ background:"none", border:"none", fontSize:28, color:R, cursor:"pointer", padding:4 }}
          className="nav-hamburger" aria-label="Open menu">
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div style={{ display:"flex", flexDirection:"column", position:"fixed", top:68, left:0, right:0,
          background:"#fff", boxShadow:"0 8px 24px rgba(108,63,196,.12)", zIndex:999, padding:"8px 0 20px" }}>
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`}
              onClick={e => { e.preventDefault(); setOpen(false); onNav(l.id); }}
              style={{ padding:"14px 5%", fontSize:16, fontWeight:500, color:"#333",
                borderBottom:"1px solid #e8e0f5", textDecoration:"none" }}>
              {l.label}
            </a>
          ))}
          <a href="#appointment" onClick={e => { e.preventDefault(); setOpen(false); onNav("appointment"); }}
            style={{ margin:"14px 5% 0", background:R, color:"#fff", padding:13,
              borderRadius:8, textAlign:"center", fontWeight:700, textDecoration:"none" }}>
            📅 Book Consultation
          </a>
        </div>
      )}
    </>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────
function Hero({ onNav }) {
  return (
    <section id="home" style={s.hero}>
      <div style={s.heroText}>
        <span style={s.heroEyebrow}>Chennai's Trusted Skin &amp; Hair Experts</span>
        <h1 style={s.heroH1}>
          Glow from Within,<br />
          <span style={s.heroSpan}>Look Your Best</span>
        </h1>
        <p style={s.heroP}>
          Advanced dermatology, trichology, and cosmetic treatments tailored to your skin and hair.
          Expert care in a luxurious, clinical environment.
        </p>
        <div style={s.heroBtns}>
          <a href="#appointment" onClick={e => { e.preventDefault(); onNav("appointment"); }} style={s.btnPrimary}>
            Book Consultation
          </a>
          <a href="#services" onClick={e => { e.preventDefault(); onNav("services"); }} style={s.btnOutline}>
            Explore Services
          </a>
        </div>
        <div style={s.heroBadge}>
          <span style={s.heroBadgeDot}></span>
          <span>Accepting new patients today</span>
        </div>
      </div>
      <div style={s.heroImage}>
        <img
          src="https://img.freepik.com/free-vector/dermatologist-concept-illustration_114360-7712.jpg"
          alt="Dermatologist consultation"
          style={s.heroImg}
        />
      </div>
    </section>
  );
}

// ── Stats ─────────────────────────────────────────────────────────────
function Stats() {
  const data = [
    { num:"8000+", label:"Happy Patients" },
    { num:"14+", label:"Years Experience" },
    { num:"30+", label:"Advanced Treatments" },
    { num:"4.9★", label:"Patient Rating" },
  ];
  return (
    <div style={s.stats}>
      {data.map(d => (
        <div key={d.label} style={s.stat}>
          <h2 style={s.statH2}>{d.num}</h2>
          <p style={s.statP}>{d.label}</p>
        </div>
      ))}
    </div>
  );
}

// ── About ─────────────────────────────────────────────────────────────
function About({ onNav }) {
  const points = [
    "IADVL-certified Dermatologists & Trichologists",
    "US-FDA approved treatment technologies",
    "Personalised skincare & haircare regimens",
    "Sterile, clinical-grade treatment rooms",
    "Post-treatment care & follow-up support",
  ];
  return (
    <section id="about" style={s.about}>
      <div style={s.sectionTitle}>
        <h2 style={s.sectionH2}>About Our Clinic</h2>
        <p style={s.sectionP}>Where clinical expertise meets aesthetic excellence</p>
        <div style={s.sectionLine}></div>
      </div>
      <div style={s.aboutContent}>
        <div style={s.aboutImage}>
          <img
            src="https://img.freepik.com/free-vector/skin-care-clinic-concept-illustration_114360-7713.jpg"
            alt="Devs Hair and Skin Clinic"
            style={{ ...s.aboutImg, minHeight:280 }}
          />
        </div>
        <div style={s.aboutText}>
          <span style={s.aboutTag}>Est. 2016 · Chennai</span>
          <h3 style={s.aboutH3}>A Clinic Built on Science &amp; Care</h3>
          <p style={s.aboutP}>
            Devs Hair &amp; Skin Clinic has been transforming lives in Chennai since 2016.
            Our team of board-certified dermatologists and trichologists combine the latest
            medical science with a patient-first philosophy.
          </p>
          <p style={s.aboutP}>
            Whether you need acne treatment, hair restoration, cosmetic procedures, or a full
            skin analysis — we deliver results with transparency and precision.
          </p>
          <ul style={s.aboutList}>
            {points.map(p => (
              <li key={p} style={s.aboutLi}>
                <span style={s.checkmark}>✦</span> {p}
              </li>
            ))}
          </ul>
          <a href="#appointment" onClick={e => { e.preventDefault(); onNav("appointment"); }} style={s.btnPrimary}>
            Get a Free Skin Analysis
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Specialist (single, featured) ───────────────────────────────────
function Specialists({ onNav }) {
  const doc = {
    name:"Dr. Anand",
    role:"Founder & Chief Dermatologist",
    exp:"14 Years Experience",
    qual:"MD Dermatology, AIIMS · IADVL Member · Fellowship in Aesthetic Medicine",
    bio:"Dr. Devika Anand has helped over 8,000 patients achieve healthier skin and hair through evidence-based dermatology and cosmetic treatments. She specialises in acne management, hair restoration, anti-ageing procedures, and laser therapies.",
    img:"https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg",
  };
  return (
    <section id="specialists" style={s.specialists}>
      <div style={s.sectionTitle}>
        <h2 style={s.sectionH2}>Meet Your Specialist</h2>
        <p style={s.sectionP}>Board-certified expertise dedicated to your skin &amp; hair health</p>
        <div style={s.sectionLine}></div>
      </div>
      <div style={s.featuredDocWrap}>
        <div style={s.featuredDocImgCol}>
          <img src={doc.img} alt={doc.name} style={s.featuredDocImg} />
        </div>
        <div style={s.featuredDocInfo}>
          <h3 style={s.featuredDocName}>{doc.name}</h3>
          <p style={s.specRole}>{doc.role}</p>
          <p style={{ ...s.specExp, marginBottom:16 }}>{doc.exp} · {doc.qual}</p>
          <p style={s.aboutP}>{doc.bio}</p>
          <a href="#appointment" onClick={e => { e.preventDefault(); onNav("appointment"); }} style={s.btnPrimary}>
            Book a Session
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Services ──────────────────────────────────────────────────────────
function Services() {
  const list = [
    { icon:"✨", title:"Acne & Scar Treatments", desc:"Medical-grade peels, lasers, and therapies to clear acne and fade scars effectively." },
    { icon:"💆", title:"Hair Loss & PRP Therapy", desc:"Platelet-rich plasma, mesotherapy and scalp treatments for hair regrowth." },
    { icon:"🌟", title:"Anti-Ageing & Botox", desc:"Botox, fillers, and skin-tightening procedures for a youthful, refreshed look." },
    { icon:"🔬", title:"Laser Hair Removal", desc:"Permanent hair reduction with advanced diode and Nd:YAG laser technology." },
    { icon:"🧴", title:"Skin Brightening", desc:"Chemical peels, glutathione treatments, and pigmentation correction therapies." },
    { icon:"💊", title:"Dermatitis & Psoriasis", desc:"Evidence-based medical management for chronic skin conditions and flare-ups." },
    { icon:"🩺", title:"Dermoscopy & Diagnosis", desc:"Advanced skin lesion analysis, mole mapping, and early cancer screening." },
    { icon:"💅", title:"Nail & Scalp Disorders", desc:"Specialist care for fungal infections, alopecia, dandruff, and nail diseases." },
  ];
  return (
    <section id="services" style={s.services}>
      <div style={s.sectionTitle}>
        <h2 style={s.sectionH2}>Our Treatments</h2>
        <p style={s.sectionP}>Comprehensive skin &amp; hair care under one roof</p>
        <div style={s.sectionLine}></div>
      </div>
      <div style={s.servGrid}>
        {list.map(sv => <ServCard key={sv.title} sv={sv} />)}
      </div>
    </section>
  );
}

function ServCard({ sv }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ ...s.servCard, ...(hov ? s.servCardHover : {}) }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={s.servIcon}>{sv.icon}</div>
      <h3 style={s.servH3}>{sv.title}</h3>
      <p style={s.servP}>{sv.desc}</p>
    </div>
  );
}

// ── Why Choose Us ─────────────────────────────────────────────────────
function WhyUs() {
  const items = [
    { n:"01", title:"Science-Backed Protocols", desc:"Every treatment is evidence-based and follows internationally accepted dermatological guidelines." },
    { n:"02", title:"Personalised Treatment Plans", desc:"We assess your unique skin type, concerns, and goals before recommending any procedure." },
    { n:"03", title:"State-of-the-Art Technology", desc:"Our clinic is equipped with the latest lasers, RF devices, and diagnostic tools available in India." },
    { n:"04", title:"Transparent & Ethical Care", desc:"No unnecessary upselling. We recommend only what your skin genuinely needs, explained clearly." },
  ];
  return (
    <section style={s.whyUs}>
      <div style={s.sectionTitle}>
        <h2 style={s.sectionH2}>Why Choose Devs?</h2>
        <p style={s.sectionP}>The Devs difference — felt in every visit</p>
        <div style={s.sectionLine}></div>
      </div>
      <div style={s.whyGrid}>
        {items.map(it => (
          <div key={it.n} style={s.whyCard}>
            <div style={s.whyNum}><span style={s.whyNumInner}>{it.n}</span></div>
            <h3 style={s.whyH3}>{it.title}</h3>
            <p style={s.whyP}>{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Appointment ───────────────────────────────────────────────────────
function Appointment() {
  const [form, setForm] = useState({ name:"", phone:"", email:"", concern:"", date:"", time:"", msg:"" });
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const now = new Date();
  const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split("T")[0];
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMsg("");
    if (!form.name || !form.phone || !form.concern || !form.date || !form.time) {
      alert("Please fill in all required fields marked with *");
      return;
    }
    if (form.date < today) {
      setErrorMsg("Preferred date cannot be in the past. Please select today or a future date.");
      return;
    }
    setSubmitting(true);
    const result = await submitAppointment(form);
    setSubmitting(false);

    if (result.ok) {
      setSuccess(true);
      setForm({ name:"", phone:"", email:"", concern:"", date:"", time:"", msg:"" });
      setTimeout(() => setSuccess(false), 7000);
    } else {
      const detail = result.fieldErrors
        ? Object.values(result.fieldErrors).join(" ")
        : "";
      setErrorMsg(`${result.message} ${detail}`.trim());
    }
  };


  const concerns = [
    "Acne & Pimples", "Hair Loss & Thinning", "Skin Pigmentation",
    "Anti-Ageing & Botox", "Laser Hair Removal", "Skin Brightening",
    "Psoriasis / Dermatitis", "Scalp Treatment", "Mole / Lesion Check",
    "General Skin Consultation",
  ];
  const slots = [
    "9:00 AM – 10:00 AM", "10:00 AM – 11:00 AM", "11:00 AM – 12:00 PM",
    "2:00 PM – 3:00 PM", "3:00 PM – 4:00 PM", "4:00 PM – 5:00 PM", "5:00 PM – 7:00 PM",
  ];

  return (
    <section id="appointment" style={s.appt}>
      <div style={s.sectionTitle}>
        <h2 style={s.sectionH2}>Book a Consultation</h2>
        <p style={s.sectionP}>Fill in the form — our team will confirm your slot within 2 hours</p>
        <div style={s.sectionLine}></div>
      </div>
      <div style={s.apptBox}>
        {/* Info */}
        <div style={s.apptInfo}>
          <h3 style={s.apptInfoH3}>Clinic Details</h3>
          <p style={s.apptInfoP}>📍 45, Anna Nagar 2nd Avenue<br />Chennai – 600 040</p>
          <p style={s.apptInfoP}>📞 +91 98400 55678</p>
          <p style={s.apptInfoP}>✉️ vipluved@gmail.com</p>
          <p style={s.apptInfoP}>🕐 Mon–Sat: 9 AM – 7 PM</p>
          <p style={s.apptInfoP}>🕐 Sunday: 10 AM – 2 PM</p>
          <p style={{ ...s.apptInfoP, marginTop:16, fontSize:13, opacity:0.8 }}>
            💡 Bring any previous prescriptions or patch-test results to your first visit.
          </p>
          <a href="https://wa.me/919840055678" target="_blank" rel="noreferrer" style={s.waBtn}>
            💬 WhatsApp Us
          </a>
        </div>

        {/* Form */}
        <div style={s.apptForm}>
          <div style={s.formRow}>
            <div style={s.formGroup}>
              <label style={s.formLabel}>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange}
                placeholder="Your full name" required style={s.formInput} />
            </div>
            <div style={s.formGroup}>
              <label style={s.formLabel}>Phone Number *</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                placeholder="+91 XXXXX XXXXX" required style={s.formInput} />
            </div>
          </div>
          <div style={s.formRow}>
            <div style={s.formGroup}>
              <label style={s.formLabel}>Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange}
                placeholder="your@email.com" style={s.formInput} />
            </div>
            <div style={s.formGroup}>
              <label style={s.formLabel}>Primary Concern *</label>
              <select name="concern" value={form.concern} onChange={handleChange}
                required style={s.formInput}>
                <option value="">Select Your Concern</option>
                {concerns.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div style={s.formRow}>
            <div style={s.formGroup}>
              <label style={s.formLabel}>Preferred Date *</label>
              <input name="date" type="date" value={form.date} min={today}
                onChange={handleChange} required style={s.formInput} />
            </div>
            <div style={s.formGroup}>
              <label style={s.formLabel}>Preferred Time *</label>
              <select name="time" value={form.time} onChange={handleChange}
                required style={s.formInput}>
                <option value="">Select Time Slot</option>
                {slots.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div style={{ ...s.formGroup, marginBottom:18 }}>
            <label style={s.formLabel}>Tell Us More (optional)</label>
            <textarea name="msg" value={form.msg} onChange={handleChange}
              rows={4} placeholder="Describe your concern, skin type, or any allergies..."
              style={{ ...s.formInput, resize:"vertical" }} />
          </div>
          <button onClick={handleSubmit} disabled={submitting}
            style={{ ...s.btnPrimary, width:"100%", fontSize:16, padding:14, border:"none",
              opacity: submitting ? 0.7 : 1, cursor: submitting ? "wait" : "pointer" }}>
            {submitting ? "Submitting..." : "Request Appointment"}
          </button>
          {success && (
            <div style={s.successMsg}>
              ✦ Thank you! Your consultation request is confirmed. We'll reach out within 2 hours.
            </div>
          )}
          {errorMsg && (
            <div style={{ ...s.successMsg, background:"#ede8ff", border:"1px solid #a98df5", color:"#4e2d96" }}>
              ⚠ {errorMsg}
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
    <section id="contact" style={s.contact}>
      <div style={s.sectionTitle}>
        <h2 style={s.sectionH2}>Find Us</h2>
        <p style={s.sectionP}>Conveniently located in Anna Nagar, Chennai</p>
        <div style={s.sectionLine}></div>
      </div>
      <div style={s.mapWrap}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.3!2d80.2107!3d13.0878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA1JzE2Ik4!5e0!3m2!1sen!2sin!4v1"
          width="100%" height="420"
          style={{ border:0, display:"block" }}
          allowFullScreen loading="lazy"
          title="Devs Hair and Skin Clinic Location"
        />
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────
function Footer({ onNav }) {
  const quickLinks = [
    { label:"Home", id:"home" }, { label:"About Us", id:"about" },
    { label:"Our Specialists", id:"specialists" }, { label:"Services", id:"services" },
    { label:"Book Consultation", id:"appointment" },
  ];
  const treatments = [
    "Acne & Scar Treatment", "Hair Loss & PRP", "Laser Hair Removal",
    "Anti-Ageing & Botox", "Skin Brightening",
  ];
  return (
    <footer style={s.footer}>
      <div style={s.footerGrid}>
        <div>
          <h3 style={s.footerH3}>✦ Devs Hair &amp; Skin Clinic</h3>
          <p style={s.footerP}>Chennai's trusted destination for dermatology, trichology, and aesthetic medicine since 2016.</p>
          <p style={{ ...s.footerP, color:GOLD }}>IADVL Member · ISO Certified Clinic</p>
        </div>
        <div>
          <h3 style={s.footerH3}>Quick Links</h3>
          <ul style={s.footerUl}>
            {quickLinks.map(l => (
              <li key={l.id} style={s.footerLi}>
                <a href={`#${l.id}`} onClick={e => { e.preventDefault(); onNav(l.id); }} style={s.footerA}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 style={s.footerH3}>Treatments</h3>
          <ul style={s.footerUl}>
            {treatments.map(t => (
              <li key={t} style={s.footerLi}>
                <a href="#services" onClick={e => { e.preventDefault(); onNav("services"); }} style={s.footerA}>{t}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 style={s.footerH3}>Contact</h3>
          <p style={s.footerP}>📍 45, Anna Nagar 2nd Avenue<br />Chennai – 600 040</p>
          <p style={s.footerP}>📞 +91 98400 55678</p>
          <p style={s.footerP}>✉️ vipluved@gmail.com</p>
          <br />
          <a href="https://wa.me/919840055678" target="_blank" rel="noreferrer" style={s.waBtn}>
            💬 WhatsApp Us
          </a>
        </div>
      </div>
      <div style={s.footerBottom}>
        <p>© 2025 Devs Hair &amp; Skin Clinic. All Rights Reserved. · Chennai, Tamil Nadu</p>
      </div>
    </footer>
  );
}

// ── Consultation Splash Modal ─────────────────────────────────────────
function ConsultationSplash({ onClose }) {
  const [form, setForm] = useState({ name:"", phone:"", email:"", concern:"", date:"", time:"", msg:"" });
  const [success, setSuccess] = useState(false);
  const [closing, setClosing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const now = new Date();
  const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split("T")[0];

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMsg("");
    if (!form.name || !form.phone || !form.concern || !form.date || !form.time) {
      alert("Please fill in all required fields marked with *");
      return;
    }
    setSubmitting(true);
    if (form.date < today) {
      setSubmitting(false);
      setErrorMsg("Preferred date cannot be in the past. Please select today or a future date.");
      return;
    }
    const result = await submitAppointment(form);
    setSubmitting(false);

    if (result.ok) {
      setSuccess(true);
      setForm({ name:"", phone:"", email:"", concern:"", date:"", time:"", msg:"" });
      setTimeout(() => { triggerClose(); }, 4000);
    } else {
      const detail = result.fieldErrors
        ? Object.values(result.fieldErrors).join(" ")
        : "";
      setErrorMsg(`${result.message} ${detail}`.trim());
    }
  };

  const triggerClose = () => {
    setClosing(true);
    setTimeout(onClose, 400);
  };

  const concerns = [
    "Acne & Pimples", "Hair Loss & Thinning", "Skin Pigmentation",
    "Anti-Ageing & Botox", "Laser Hair Removal", "Skin Brightening",
    "Psoriasis / Dermatitis", "Scalp Treatment", "Mole / Lesion Check",
    "General Skin Consultation",
  ];
  const slots = [
    "9:00 AM – 10:00 AM", "10:00 AM – 11:00 AM", "11:00 AM – 12:00 PM",
    "2:00 PM – 3:00 PM", "3:00 PM – 4:00 PM", "4:00 PM – 5:00 PM", "5:00 PM – 7:00 PM",
  ];

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:2000,
      background:"rgba(15,10,46,0.72)",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:"16px",
      backdropFilter:"blur(4px)",
      opacity: closing ? 0 : 1,
      transition:"opacity 0.4s ease",
    }}>
      <div style={{
        background:"#fff", borderRadius:22,
        width:"100%", maxWidth:820,
        maxHeight:"92vh", overflowY:"auto",
        boxShadow:"0 24px 80px rgba(108,63,196,.28)",
        position:"relative",
        transform: closing ? "scale(0.96)" : "scale(1)",
        transition:"transform 0.4s ease, opacity 0.4s ease",
        animation:"splashIn 0.4s cubic-bezier(.34,1.56,.64,1)",
      }}>
        {/* Header strip */}
        <div style={{
          background:`linear-gradient(135deg, ${R} 0%, ${RD} 100%)`,
          padding:"28px 36px 24px",
          borderRadius:"22px 22px 0 0",
          display:"flex", alignItems:"flex-start", justifyContent:"space-between",
          gap:16,
        }}>
          <div>
            <p style={{ color:"rgba(255,255,255,0.8)", fontSize:12, letterSpacing:"2px",
              textTransform:"uppercase", fontWeight:700, marginBottom:6 }}>
              ✦ Welcome to Devs Hair &amp; Skin Clinic
            </p>
            <h2 style={{ color:"#fff", fontSize:"clamp(20px,4vw,28px)", fontWeight:800,
              lineHeight:1.2, margin:0 }}>
              Book Your Free Consultation
            </h2>
            <p style={{ color:"rgba(255,255,255,0.82)", fontSize:14, marginTop:8, lineHeight:1.5 }}>
              Tell us your concern — we'll confirm your slot within 2 hours.
            </p>
          </div>
          <button onClick={triggerClose} style={{
            background:"rgba(255,255,255,0.18)", border:"none", color:"#fff",
            width:36, height:36, borderRadius:"50%", fontSize:18,
            cursor:"pointer", flexShrink:0, display:"flex",
            alignItems:"center", justifyContent:"center",
            fontWeight:700, marginTop:2,
          }} title="Skip & go to website">✕</button>
        </div>

        {/* Body */}
        <div style={{ padding:"28px 36px 36px" }}>
          {success ? (
            <div style={{ textAlign:"center", padding:"40px 20px" }}>
              <div style={{ fontSize:56, marginBottom:16 }}>✦</div>
              <h3 style={{ fontSize:24, color:R, fontWeight:800, marginBottom:10 }}>
                Consultation Requested!
              </h3>
              <p style={{ color:MUTED, fontSize:16, lineHeight:1.7 }}>
                Thank you! Our team will call you within 2 hours to confirm your appointment.<br />
                Taking you to our website now…
              </p>
              <div style={{ marginTop:24, height:4, background:RL, borderRadius:4, overflow:"hidden" }}>
                <div style={{
                  height:"100%", background:R, borderRadius:4,
                  animation:"progressBar 3.8s linear forwards",
                }}/>
              </div>
            </div>
          ) : (
            <>
              <div style={s.formRow}>
                <div style={s.formGroup}>
                  <label style={s.formLabel}>Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange}
                    placeholder="Your full name" required style={s.formInput} />
                </div>
                <div style={s.formGroup}>
                  <label style={s.formLabel}>Phone Number *</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX" required style={s.formInput} />
                </div>
              </div>
              <div style={s.formRow}>
                <div style={s.formGroup}>
                  <label style={s.formLabel}>Email Address</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="your@email.com" style={s.formInput} />
                </div>
                <div style={s.formGroup}>
                  <label style={s.formLabel}>Primary Concern *</label>
                  <select name="concern" value={form.concern} onChange={handleChange}
                    required style={s.formInput}>
                    <option value="">Select Your Concern</option>
                    {concerns.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div style={s.formRow}>
                <div style={s.formGroup}>
                  <label style={s.formLabel}>Preferred Date *</label>
                  <input name="date" type="date" value={form.date} min={today}
                    onChange={handleChange} required style={s.formInput} />
                </div>
                <div style={s.formGroup}>
                  <label style={s.formLabel}>Preferred Time *</label>
                  <select name="time" value={form.time} onChange={handleChange}
                    required style={s.formInput}>
                    <option value="">Select Time Slot</option>
                    {slots.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ ...s.formGroup, marginBottom:20 }}>
                <label style={s.formLabel}>Tell Us More (optional)</label>
                <textarea name="msg" value={form.msg} onChange={handleChange}
                  rows={3} placeholder="Describe your skin/hair concern, any allergies..."
                  style={{ ...s.formInput, resize:"vertical" }} />
              </div>

              {errorMsg && (
                <div style={{ marginBottom:16, padding:12, background:"#ede8ff",
                  border:"1px solid #a98df5", color:"#4e2d96", borderRadius:8, fontSize:14 }}>
                  ⚠ {errorMsg}
                </div>
              )}

              <div style={{ display:"flex", gap:14, flexWrap:"wrap", alignItems:"center" }}>
                <button onClick={handleSubmit} disabled={submitting}
                  style={{ ...s.btnPrimary, fontSize:16, padding:"14px 32px", border:"none", flex:1, minWidth:180,
                    opacity: submitting ? 0.7 : 1, cursor: submitting ? "wait" : "pointer" }}>
                  {submitting ? "Submitting..." : "Request Consultation"}
                </button>
                <button onClick={triggerClose}
                  style={{ ...s.btnOutline, fontSize:14, padding:"13px 20px", flex:"0 0 auto" }}>
                  Skip, explore website →
                </button>
              </div>

              <p style={{ marginTop:14, fontSize:12, color:MUTED, textAlign:"center" }}>
                🔒 Your information is confidential and never shared with third parties.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lock body scroll while splash is open
  useEffect(() => {
    document.body.style.overflow = showSplash ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showSplash]);

  const scrollTo = id => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior:"smooth" });
  };

  return (
    <div style={{ fontFamily:"'Segoe UI', Arial, sans-serif", color:TEXT, lineHeight:1.6, overflowX:"hidden", margin:0, padding:0 }}>
      <style>{`
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        body { overflow-x:hidden; }
        a { text-decoration:none; }
        ul { list-style:none; }
        img { max-width:100%; display:block; }

        @keyframes splashIn {
          from { opacity:0; transform:scale(0.92) translateY(24px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes progressBar {
          from { width:0%; }
          to   { width:100%; }
        }

        @media (max-width:900px) {
          .nav-desktop { display:none !important; }
          .nav-hamburger { display:block !important; }
        }
        @media (min-width:901px) {
          .nav-hamburger { display:none !important; }
          .nav-desktop { display:flex !important; }
        }
        @media (max-width:600px) {
          #home { flex-direction:column !important; padding:40px 4% 50px !important; text-align:center; }
          #home .hero-btns { justify-content:center !important; }
          #about .about-content { flex-direction:column !important; gap:24px !important; }
        }
        input:focus, select:focus, textarea:focus {
          border-color: #6c3fc4 !important;
          box-shadow: 0 0 0 3px rgba(108,63,196,0.12);
        }
      `}</style>

      {/* Splash consultation modal — shown on first visit */}
      {showSplash && <ConsultationSplash onClose={() => setShowSplash(false)} />}

      {/* Main website (always rendered behind, visible after splash closes) */}
      <Navbar onNav={scrollTo} />
      <Hero onNav={scrollTo} />
      <Stats />
      <About onNav={scrollTo} />
      <Specialists onNav={scrollTo} />
      <Services />
      <WhyUs />
      <Appointment />
      <Contact />
      <Footer onNav={scrollTo} />

      {showTop && (
        <button onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
          style={s.backToTop} title="Back to top">
          ⬆
        </button>
      )}
    </div>
  );
}
