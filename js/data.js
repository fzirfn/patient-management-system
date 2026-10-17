/**
 * Patient Management System - Mock Data Store
 * Contains realistic clinical patient records, demographic data, and appointment histories.
 */

const INITIAL_PATIENTS = [
  {
    id: "PT-10024",
    name: "Eleanor Vance",
    avatar: "assets/img/avatar-user.svg",
    initials: "EV",
    avatarColor: "#0052CC",
    isVip: true,
    contact: "+65 9123 4567",
    email: "eleanor.vance@zenith.sg",
    nationality: "Singapore",
    flagCode: "sg",
    datetime: "18 Oct 2026 09:30 AM",
    birthday: "14 May 1988",
    age: 38,
    gender: "Female",
    nric: "S8812345Z",
    occupation: "Senior Neurological Researcher",
    lastVisitDate: "12 Sep 2026",
    lastVisitDuration: "45 mins",
    medicalRemarks: "Severe penicillin allergy. History of mild seasonal asthma. Requires latex-free gloves during examination.",
    criticalRemark: true,
    status: "In Queue",
    upcomingAppointments: [
      {
        id: "APT-8801",
        datetime: "18 Oct 2026, 10:15 AM",
        treatment: "Cognitive Reflex & EEG Screening",
        doctor: "Dr. Alexander Wright (Neurology)",
        status: "Confirmed",
        symptoms: "Recurring visual aura and tension headaches following screen exposure."
      },
      {
        id: "APT-8842",
        datetime: "05 Nov 2026, 02:30 PM",
        treatment: "Follow-up Neuro Assessment",
        doctor: "Dr. Alexander Wright (Neurology)",
        status: "Scheduled",
        symptoms: "Review efficacy of prescribed neuro-protective regimen."
      }
    ]
  },
  {
    id: "PT-10025",
    name: "Marcus Aurelius Chen",
    avatar: "assets/img/avatar-user.svg",
    initials: "MC",
    avatarColor: "#36B37E",
    isVip: true,
    contact: "+60 12 345 6789",
    email: "m.chen@petraholdings.my",
    nationality: "Malaysia",
    flagCode: "my",
    datetime: "18 Oct 2026 10:15 AM",
    birthday: "22 Aug 1974",
    age: 52,
    gender: "Male",
    nric: "740822-14-5521",
    occupation: "Executive Managing Director",
    lastVisitDate: "04 Aug 2026",
    lastVisitDuration: "30 mins",
    medicalRemarks: "Hypertension under control with ACE inhibitors. No known food allergies.",
    criticalRemark: false,
    status: "Waiting",
    upcomingAppointments: [
      {
        id: "APT-8809",
        datetime: "18 Oct 2026, 11:00 AM",
        treatment: "Cardiovascular Stress Test & Lipid Panel",
        doctor: "Dr. Beatrice Wong (Cardiology)",
        status: "In Preparation",
        symptoms: "Routine executive annual cardiac screening and stress tolerance check."
      }
    ]
  },
  {
    id: "PT-10026",
    name: "Aoi Takahashi",
    avatar: "assets/img/avatar-user.svg",
    initials: "AT",
    avatarColor: "#6554C0",
    isVip: false,
    contact: "+81 90 1234 5678",
    email: "takahashi.aoi@tokyo-biotech.jp",
    nationality: "Japan",
    flagCode: "jp",
    datetime: "18 Oct 2026 11:00 AM",
    birthday: "09 Nov 1995",
    age: 30,
    gender: "Female",
    nric: "TR-8921441",
    occupation: "Clinical Biochemical Analyst",
    lastVisitDate: "28 Jul 2026",
    lastVisitDuration: "25 mins",
    medicalRemarks: "Mild sensitivity to NSAIDs. Prefers acetaminophen for analgesia.",
    criticalRemark: false,
    status: "Scheduled",
    upcomingAppointments: [
      {
        id: "APT-8815",
        datetime: "18 Oct 2026, 11:30 AM",
        treatment: "Routine Phlebotomy & Metabolic Panel",
        doctor: "Dr. Marcus Thorne (Internal Medicine)",
        status: "Confirmed",
        symptoms: "Mild afternoon fatigue, testing thyroid stimulating hormone."
      }
    ]
  },
  {
    id: "PT-10027",
    name: "Sarah Jenkins",
    avatar: "assets/img/avatar-user.svg",
    initials: "SJ",
    avatarColor: "#FF5630",
    isVip: false,
    contact: "+1 415 889 2314",
    email: "sarah.jenkins@pacifichealth.org",
    nationality: "United States",
    flagCode: "us",
    datetime: "18 Oct 2026 11:45 AM",
    birthday: "03 Jan 1991",
    age: 35,
    gender: "Female",
    nric: "US-44910283",
    occupation: "Software Architect",
    lastVisitDate: "15 Jun 2026",
    lastVisitDuration: "60 mins",
    medicalRemarks: "Latex allergy. History of tendonitis in right wrist.",
    criticalRemark: true,
    status: "Waiting",
    upcomingAppointments: [
      {
        id: "APT-8820",
        datetime: "18 Oct 2026, 12:00 PM",
        treatment: "Orthopedic Ultrasound & Ergonomic Assessment",
        doctor: "Dr. Rachel Kim (Orthopedics)",
        status: "Confirmed",
        symptoms: "Bilateral wrist tingling and recurrent repetitive strain discomfort."
      }
    ]
  },
  {
    id: "PT-10028",
    name: "Wei Zhang",
    avatar: "assets/img/avatar-user.svg",
    initials: "WZ",
    avatarColor: "#DE350B",
    isVip: true,
    contact: "+86 138 0013 8000",
    email: "zhang.wei@sinomed.cn",
    nationality: "China",
    flagCode: "cn",
    datetime: "18 Oct 2026 01:15 PM",
    birthday: "17 Oct 1982",
    age: 44,
    gender: "Male",
    nric: "G48291039",
    occupation: "Pharmaceutical Supply Director",
    lastVisitDate: "02 Sep 2026",
    lastVisitDuration: "35 mins",
    medicalRemarks: "Sulfa drug allergy. Normal fasting glucose.",
    criticalRemark: true,
    status: "Confirmed",
    upcomingAppointments: [
      {
        id: "APT-8831",
        datetime: "18 Oct 2026, 01:30 PM",
        treatment: "Gastroenterology Consultation",
        doctor: "Dr. David Liang (Gastroenterology)",
        status: "Confirmed",
        symptoms: "Post-prandial reflux and epigastric discomfort over 3 weeks."
      }
    ]
  },
  {
    id: "PT-10029",
    name: "Oliver James Sterling",
    avatar: "assets/img/avatar-user.svg",
    initials: "OS",
    avatarColor: "#00B8D9",
    isVip: false,
    contact: "+44 20 7946 0912",
    email: "oliver.sterling@harborbridge.co.uk",
    nationality: "United Kingdom",
    flagCode: "gb",
    datetime: "18 Oct 2026 02:00 PM",
    birthday: "29 Mar 1985",
    age: 41,
    gender: "Male",
    nric: "UK-9021482",
    occupation: "Civil Engineering Consultant",
    lastVisitDate: "10 Jan 2026",
    lastVisitDuration: "20 mins",
    medicalRemarks: "No recorded drug or contact allergies. Non-smoker.",
    criticalRemark: false,
    status: "Scheduled",
    upcomingAppointments: [
      {
        id: "APT-8840",
        datetime: "18 Oct 2026, 02:30 PM",
        treatment: "Preventive Ophthalmology & Retinal Scan",
        doctor: "Dr. Fiona Campbell (Ophthalmology)",
        status: "Scheduled",
        symptoms: "Annual vision check and diabetic retinopathy prevention screening."
      }
    ]
  },
  {
    id: "PT-10030",
    name: "Chloe Isabella Clarke",
    avatar: "assets/img/avatar-user.svg",
    initials: "CC",
    avatarColor: "#36B37E",
    isVip: true,
    contact: "+61 412 345 678",
    email: "chloe.clarke@sydneyhealth.com.au",
    nationality: "Australia",
    flagCode: "au",
    datetime: "18 Oct 2026 02:45 PM",
    birthday: "11 Dec 1993",
    age: 32,
    gender: "Female",
    nric: "AU-8831092",
    occupation: "Marine Conservation Biologist",
    lastVisitDate: "19 Aug 2026",
    lastVisitDuration: "40 mins",
    medicalRemarks: "Peanut and tree nut allergy (carries EpiPen auto-injector).",
    criticalRemark: true,
    status: "Confirmed",
    upcomingAppointments: [
      {
        id: "APT-8848",
        datetime: "18 Oct 2026, 03:00 PM",
        treatment: "Dermatological Lesion Examination",
        doctor: "Dr. Rachel Kim (Dermatology)",
        status: "Confirmed",
        symptoms: "Evaluation of pigmented dermal border on upper left shoulder."
      }
    ]
  },
  {
    id: "PT-10031",
    name: "Hafiz Bin Sulaiman",
    avatar: "assets/img/avatar-user.svg",
    initials: "HS",
    avatarColor: "#0052CC",
    isVip: false,
    contact: "+65 8234 5678",
    email: "hafiz.sulaiman@maritime.sg",
    nationality: "Singapore",
    flagCode: "sg",
    datetime: "18 Oct 2026 03:30 PM",
    birthday: "15 Feb 1980",
    age: 46,
    gender: "Male",
    nric: "S8049102C",
    occupation: "Logistics Fleet Operations Manager",
    lastVisitDate: "05 May 2026",
    lastVisitDuration: "30 mins",
    medicalRemarks: "Slightly elevated LDL cholesterol. Advised Mediterranean dietary protocol.",
    criticalRemark: false,
    status: "Scheduled",
    upcomingAppointments: [
      {
        id: "APT-8855",
        datetime: "18 Oct 2026, 04:00 PM",
        treatment: "Comprehensive Health Screening & ECG",
        doctor: "Dr. Beatrice Wong (Cardiology)",
        status: "Scheduled",
        symptoms: "Bi-annual lipid follow-up and resting electrocardiogram."
      }
    ]
  },
  {
    id: "PT-10032",
    name: "Mei-Ling Tan",
    avatar: "assets/img/avatar-user.svg",
    initials: "MT",
    avatarColor: "#6554C0",
    isVip: true,
    contact: "+60 17 889 9012",
    email: "meiling.tan@georgetown.edu.my",
    nationality: "Malaysia",
    flagCode: "my",
    datetime: "19 Oct 2026 09:00 AM",
    birthday: "08 Jun 1978",
    age: 48,
    gender: "Female",
    nric: "780608-07-5122",
    occupation: "Associate Professor of Pathology",
    lastVisitDate: "14 Sep 2026",
    lastVisitDuration: "50 mins",
    medicalRemarks: "Previous thyroidectomy (2021). Maintained on levothyroxine 75mcg daily.",
    criticalRemark: false,
    status: "Confirmed",
    upcomingAppointments: [
      {
        id: "APT-8861",
        datetime: "19 Oct 2026, 09:30 AM",
        treatment: "Endocrinology Evaluation & TSH Titration",
        doctor: "Dr. Marcus Thorne (Endocrinology)",
        status: "Confirmed",
        symptoms: "Routine endocrine assessment and serum calcium review."
      }
    ]
  },
  {
    id: "PT-10033",
    name: "Kenji Sato",
    avatar: "assets/img/avatar-user.svg",
    initials: "KS",
    avatarColor: "#FFAB00",
    isVip: false,
    contact: "+81 80 4321 8765",
    email: "kenji.sato@kyoto-robotics.co.jp",
    nationality: "Japan",
    flagCode: "jp",
    datetime: "19 Oct 2026 10:30 AM",
    birthday: "25 Sep 1989",
    age: 37,
    gender: "Male",
    nric: "TR-7719204",
    occupation: "Autonomous Systems Lead",
    lastVisitDate: "12 Mar 2026",
    lastVisitDuration: "25 mins",
    medicalRemarks: "No known medical drug allergies. Mild hay fever during spring.",
    criticalRemark: false,
    status: "Scheduled",
    upcomingAppointments: [
      {
        id: "APT-8870",
        datetime: "19 Oct 2026, 11:00 AM",
        treatment: "Audiometry & Inner Ear Balance Check",
        doctor: "Dr. Fiona Campbell (ENT)",
        status: "Scheduled",
        symptoms: "Transient bilateral tinnitus after prolonged high-frequency sonic calibration tests."
      }
    ]
  },
  {
    id: "PT-10034",
    name: "Lucas Alexander Bennett",
    avatar: "assets/img/avatar-user.svg",
    initials: "LB",
    avatarColor: "#0052CC",
    isVip: false,
    contact: "+1 617 555 0192",
    email: "lucas.bennett@mit.edu",
    nationality: "United States",
    flagCode: "us",
    datetime: "19 Oct 2026 01:45 PM",
    birthday: "19 Jul 1996",
    age: 30,
    gender: "Male",
    nric: "US-89104721",
    occupation: "Bio-Informatics Graduate Fellow",
    lastVisitDate: "11 Jul 2026",
    lastVisitDuration: "30 mins",
    medicalRemarks: "Seasonal pollen rhinitis. No pharmacological contraindications.",
    criticalRemark: false,
    status: "Confirmed",
    upcomingAppointments: [
      {
        id: "APT-8878",
        datetime: "19 Oct 2026, 02:15 PM",
        treatment: "Sports Physical & Joint Range Assessment",
        doctor: "Dr. Rachel Kim (Sports Medicine)",
        status: "Confirmed",
        symptoms: "Pre-marathon cardiovascular and patellar stability clearance."
      }
    ]
  },
  {
    id: "PT-10035",
    name: "Jia-Hui Lin",
    avatar: "assets/img/avatar-user.svg",
    initials: "JL",
    avatarColor: "#DE350B",
    isVip: true,
    contact: "+86 139 1234 5678",
    email: "lin.jiahui@shanghaicapital.cn",
    nationality: "China",
    flagCode: "cn",
    datetime: "19 Oct 2026 03:00 PM",
    birthday: "04 Apr 1984",
    age: 42,
    gender: "Female",
    nric: "G59102844",
    occupation: "Senior Investment Partner",
    lastVisitDate: "20 Sep 2026",
    lastVisitDuration: "45 mins",
    medicalRemarks: "Iodine contrast dye allergy. Must avoid iodinated radiopaque agents.",
    criticalRemark: true,
    status: "Scheduled",
    upcomingAppointments: [
      {
        id: "APT-8884",
        datetime: "19 Oct 2026, 03:30 PM",
        treatment: "Renal Function Panel & Ultrasound",
        doctor: "Dr. David Liang (Nephrology)",
        status: "Scheduled",
        symptoms: "Follow-up renal micro-crystallization monitoring and non-contrast scan."
      }
    ]
  }
];

// Persistent state wrapper in localStorage if available
const PatientStorage = {
  KEY: "alphacloud_patients_data_v1",

  load() {
    try {
      const stored = localStorage.getItem(this.KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("localStorage unavailable, using initial dataset.", e);
    }
    return [...INITIAL_PATIENTS];
  },

  save(data) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("Failed to persist to localStorage", e);
    }
  },

  reset() {
    try {
      localStorage.removeItem(this.KEY);
    } catch (e) {}
    return [...INITIAL_PATIENTS];
  }
};
