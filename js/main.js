/**
 * Main Application Bootstrap and State Coordinator
 */

// Toast feedback controller
window.AppToast = {
  container: null,

  init() {
    this.container = document.getElementById("toastContainer");
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.id = "toastContainer";
      this.container.className = "toast-container";
      document.body.appendChild(this.container);
    }
  },

  show(message, type = "normal", duration = 3500) {
    this.init();
    const toast = document.createElement("div");
    toast.className = `toast ${type === "success" ? "success" : type === "error" ? "error" : ""}`;
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        ${type === "success" 
          ? '<polyline points="20 6 9 17 4 12"/>' 
          : type === "error" 
            ? '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'
            : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'
        }
      </svg>
      <span>${message}</span>
    `;

    this.container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize data store
  let patients = PatientStorage.load();

  // 2. Initialize Subsystem Managers
  const sidebarManager = new SidebarManager();
  const panelManager = new PatientPanelManager();

  const tableManager = new PatientTableManager({
    onRowClick: (patient) => {
      panelManager.open(patient);
    },
    onDataChange: (event) => {
      if (event.type === "delete") {
        patients = patients.filter(p => p.id !== event.id);
      } else if (event.type === "update") {
        const idx = patients.findIndex(p => p.id === event.patient.id);
        if (idx !== -1) patients[idx] = event.patient;
      }
      PatientStorage.save(patients);
      tableManager.setData(patients);
      updateStatsBar(patients);
    }
  });

  tableManager.setData(patients);
  updateStatsBar(patients);

  // 3. Search Bar Interaction
  const searchInput = document.getElementById("searchInput");
  const searchClearBtn = document.getElementById("searchClearBtn");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.classList.toggle("visible", q.length > 0);
      }
      tableManager.setSearchQuery(q);
    });

    if (searchClearBtn) {
      searchClearBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchClearBtn.classList.remove("visible");
        tableManager.setSearchQuery("");
        searchInput.focus();
      });
    }
  }

  // 4. Filters & Page Size
  const vipFilter = document.getElementById("vipFilter");
  if (vipFilter) {
    vipFilter.addEventListener("change", (e) => {
      tableManager.setVipFilter(e.target.value);
    });
  }

  const nationalityFilter = document.getElementById("nationalityFilter");
  if (nationalityFilter) {
    nationalityFilter.addEventListener("change", (e) => {
      tableManager.setNationalityFilter(e.target.value);
    });
  }

  const pageSizeSelect = document.getElementById("pageSizeSelect");
  if (pageSizeSelect) {
    pageSizeSelect.addEventListener("change", (e) => {
      tableManager.setPageSize(e.target.value);
    });
  }

  // 5. Add Patient Modal
  const addPatientBtn = document.getElementById("addPatientBtn");
  const addPatientModal = document.getElementById("addPatientModal");
  const closePatientModalBtn = document.getElementById("closePatientModalBtn");
  const cancelPatientModalBtn = document.getElementById("cancelPatientModalBtn");
  const addPatientForm = document.getElementById("addPatientForm");

  function openAddModal() {
    if (!addPatientModal) return;
    addPatientModal.classList.add("active");
    addPatientModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      document.getElementById("patientFullName")?.focus();
    }, 100);
  }

  function closeAddModal() {
    if (!addPatientModal) return;
    addPatientModal.classList.remove("active");
    addPatientModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (addPatientForm) addPatientForm.reset();
  }

  if (addPatientBtn) {
    addPatientBtn.addEventListener("click", openAddModal);
  }

  if (closePatientModalBtn) {
    closePatientModalBtn.addEventListener("click", closeAddModal);
  }

  if (cancelPatientModalBtn) {
    cancelPatientModalBtn.addEventListener("click", closeAddModal);
  }

  if (addPatientModal) {
    addPatientModal.addEventListener("click", (e) => {
      if (e.target === addPatientModal) closeAddModal();
    });
  }

  // Handle Form Submission
  if (addPatientForm) {
    addPatientForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fullName = document.getElementById("patientFullName").value.trim();
      const nric = document.getElementById("patientNric").value.trim();
      const contact = document.getElementById("patientContact").value.trim();
      const email = document.getElementById("patientEmail").value.trim();
      const nationality = document.getElementById("patientNationality").value;
      const birthday = document.getElementById("patientBirthday").value;
      const gender = document.getElementById("patientGender").value;
      const occupation = document.getElementById("patientOccupation").value.trim() || "Not specified";
      const isVip = document.getElementById("patientIsVip").checked;
      const remarks = document.getElementById("patientRemarks").value.trim();

      if (!fullName || !contact || !nationality) {
        alert("Please complete the required fields.");
        return;
      }

      // Flag code mapping
      const flagMap = {
        "Singapore": "sg",
        "Malaysia": "my",
        "China": "cn",
        "Japan": "jp",
        "United States": "us",
        "United Kingdom": "gb",
        "Australia": "au"
      };

      // Calculate approximate age from birthday
      let age = 30;
      let formattedBday = "15 Jun 1994";
      if (birthday) {
        const bDate = new Date(birthday);
        if (!isNaN(bDate)) {
          const diffMs = Date.now() - bDate.getTime();
          age = Math.abs(new Date(diffMs).getUTCFullYear() - 1970);
          formattedBday = bDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
        }
      }

      const nextIdNum = 10000 + patients.length + 1;
      const newPatientId = `PT-${nextIdNum}`;

      const avatarColors = ["#0052CC", "#36B37E", "#6554C0", "#FF5630", "#00B8D9", "#FFAB00"];
      const chosenColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

      const now = new Date();
      const formattedDatetime = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) +
        " " + now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

      const newPatient = {
        id: newPatientId,
        name: fullName,
        avatar: "assets/img/avatar-user.svg",
        initials: fullName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
        avatarColor: chosenColor,
        isVip: isVip,
        contact: contact,
        email: email || `${fullName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
        nationality: nationality,
        flagCode: flagMap[nationality] || "sg",
        datetime: formattedDatetime,
        birthday: formattedBday,
        age: age,
        gender: gender,
        nric: nric || `S${Math.floor(1000000 + Math.random() * 9000000)}X`,
        occupation: occupation,
        lastVisitDate: "First Visit (Today)",
        lastVisitDuration: "Initial Registration",
        medicalRemarks: remarks || "New patient registered today. No prior clinical history on file.",
        criticalRemark: remarks.toLowerCase().includes("allergy") || remarks.toLowerCase().includes("allergic"),
        status: "In Queue",
        upcomingAppointments: [
          {
            id: `APT-${Math.floor(8000 + Math.random() * 1000)}`,
            datetime: `${formattedDatetime}`,
            treatment: "Initial General Practitioner Triage",
            doctor: "Dr. Alexander Wright (General Medicine)",
            status: "In Queue",
            symptoms: remarks || "New patient initial intake examination."
          }
        ]
      };

      patients.unshift(newPatient);
      PatientStorage.save(patients);

      tableManager.setData(patients);
      updateStatsBar(patients);
      closeAddModal();

      window.AppToast?.show(`Successfully registered patient ${fullName} (${newPatientId})!`, "success");

      // Auto-open new patient's dossier
      panelManager.open(newPatient);
    });
  }

  // 6. CSV Export Functionality
  function exportPatientsToCsv(patientList, filename = "patients_list.csv") {
    if (!patientList || patientList.length === 0) {
      window.AppToast?.show("No records available to export.", "error");
      return;
    }

    const headers = ["ID", "Full Name", "VIP", "Contact", "Email", "Nationality", "NRIC/Passport", "Age", "Gender", "Occupation", "Registration Datetime", "Medical Remarks"];
    
    const rows = patientList.map(p => [
      `"${p.id}"`,
      `"${p.name.replace(/"/g, '""')}"`,
      p.isVip ? '"VIP"' : '"Regular"',
      `"${p.contact}"`,
      `"${p.email}"`,
      `"${p.nationality}"`,
      `"${p.nric}"`,
      p.age,
      `"${p.gender}"`,
      `"${(p.occupation || "").replace(/"/g, '""')}"`,
      `"${p.datetime}"`,
      `"${(p.medicalRemarks || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    window.AppToast?.show(`Exported ${patientList.length} patient records to ${filename}.`, "success");
  }

  // Bind Export Buttons
  const exportCsvBtn = document.getElementById("exportCsvBtn");
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener("click", () => {
      exportPatientsToCsv(tableManager.filteredPatients, `patients_export_${new Date().toISOString().slice(0, 10)}.csv`);
    });
  }

  // Bulk Actions
  const bulkExportBtn = document.getElementById("bulkExportBtn");
  if (bulkExportBtn) {
    bulkExportBtn.addEventListener("click", () => {
      const selected = tableManager.getSelectedPatients();
      exportPatientsToCsv(selected, `selected_patients_${selected.length}.csv`);
    });
  }

  const bulkVipBtn = document.getElementById("bulkVipBtn");
  if (bulkVipBtn) {
    bulkVipBtn.addEventListener("click", () => {
      const selected = tableManager.getSelectedPatients();
      selected.forEach(p => p.isVip = true);
      PatientStorage.save(patients);
      tableManager.setData(patients);
      updateStatsBar(patients);
      window.AppToast?.show(`Marked ${selected.length} patients as VIP.`, "success");
    });
  }

  const bulkDeleteBtn = document.getElementById("bulkDeleteBtn");
  if (bulkDeleteBtn) {
    bulkDeleteBtn.addEventListener("click", () => {
      const selected = tableManager.getSelectedPatients();
      if (confirm(`Are you sure you want to delete ${selected.length} selected patient records?`)) {
        const selectedIds = new Set(selected.map(p => p.id));
        patients = patients.filter(p => !selectedIds.has(p.id));
        PatientStorage.save(patients);
        tableManager.clearSelection();
        tableManager.setData(patients);
        updateStatsBar(patients);
        window.AppToast?.show(`Deleted ${selected.length} patient records.`, "error");
      }
    });
  }

  // Refresh Data Handler (Demonstrating loading state & live sync)
  const refreshTableBtn = document.getElementById("refreshTableBtn");
  if (refreshTableBtn) {
    refreshTableBtn.addEventListener("click", () => {
      refreshTableBtn.classList.add("spinning");
      tableManager.showLoading(400);
      setTimeout(() => {
        refreshTableBtn.classList.remove("spinning");
        window.AppToast?.show("Patient directory synchronized in real time.", "success");
      }, 400);
    });
  }

  // 7. Global Keyboard Shortcuts
  document.addEventListener("keydown", (e) => {
    // Esc is already handled for panel & modal
    if (e.key === "Escape") {
      if (addPatientModal && addPatientModal.classList.contains("active")) {
        closeAddModal();
      }
    }

    // '/' key focuses the search input (when not already typing inside an input)
    if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
      e.preventDefault();
      searchInput?.focus();
    }

    // 'n' or 'N' opens Add Patient modal (when not inside input/textarea)
    if ((e.key === "n" || e.key === "N") && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA" && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      openAddModal();
    }
  });

  // 8. Stats Bar Synchronization
  function updateStatsBar(patientList) {
    const totalCount = document.getElementById("statTotalPatients");
    const vipCount = document.getElementById("statVipPatients");
    const queueCount = document.getElementById("statQueuePatients");
    const aptCount = document.getElementById("statAppointments");

    if (totalCount) totalCount.textContent = patientList.length;
    if (vipCount) vipCount.textContent = patientList.filter(p => p.isVip).length;
    if (queueCount) queueCount.textContent = "2"; // Queue badge specified as 2 in README
    if (aptCount) aptCount.textContent = "5";   // Appointment badge specified as 5 in README
  }
});
