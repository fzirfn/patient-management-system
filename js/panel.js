/**
 * Patient Detail Slide-in Panel Manager
 * Handles drawer presentation, demographics rendering, upcoming appointments, and accessibility.
 */

class PatientPanelManager {
  constructor() {
    this.drawer = document.getElementById("patientDrawer");
    this.backdrop = document.getElementById("drawerBackdrop");
    this.closeBtn = document.getElementById("closeDrawerBtn");
    
    // Header elements
    this.drawerAvatar = document.getElementById("drawerAvatar");
    this.drawerName = document.getElementById("drawerName");
    this.drawerVipBadge = document.getElementById("drawerVipBadge");
    this.drawerId = document.getElementById("drawerId");

    // Detail fields
    this.drawerContact = document.getElementById("drawerContact");
    this.drawerEmail = document.getElementById("drawerEmail");
    this.drawerNationality = document.getElementById("drawerNationality");
    this.drawerBirthdayAge = document.getElementById("drawerBirthdayAge");
    this.drawerNric = document.getElementById("drawerNric");
    this.drawerOccupation = document.getElementById("drawerOccupation");
    this.drawerLastVisit = document.getElementById("drawerLastVisit");
    this.drawerRemarksCard = document.getElementById("drawerRemarksCard");
    this.drawerAppointmentsList = document.getElementById("drawerAppointmentsList");

    // Action buttons in drawer
    this.drawerBookBtn = document.getElementById("drawerBookBtn");
    this.drawerPrintBtn = document.getElementById("drawerPrintBtn");

    this.currentPatient = null;
    this.lastFocusedElement = null;

    this.init();
  }

  init() {
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.close());
    }

    if (this.backdrop) {
      this.backdrop.addEventListener("click", () => this.close());
    }

    // Keyboard accessibility: Escape key closes the panel
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen()) {
        this.close();
      }
    });

    if (this.drawerBookBtn) {
      this.drawerBookBtn.addEventListener("click", () => {
        if (this.currentPatient) {
          window.AppToast?.show(`Booking wizard launched for ${this.currentPatient.name}.`);
        }
      });
    }

    if (this.drawerPrintBtn) {
      this.drawerPrintBtn.addEventListener("click", () => {
        window.print();
      });
    }
  }

  isOpen() {
    return this.drawer && this.drawer.classList.contains("active");
  }

  open(patient) {
    if (!this.drawer || !patient) return;
    this.currentPatient = patient;
    this.lastFocusedElement = document.activeElement;

    this.populate(patient);

    this.drawer.classList.add("active");
    if (this.backdrop) this.backdrop.classList.add("active");
    
    this.drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Focus close button for keyboard accessibility
    setTimeout(() => {
      this.closeBtn?.focus();
    }, 100);
  }

  close() {
    if (!this.drawer) return;

    this.drawer.classList.remove("active");
    if (this.backdrop) this.backdrop.classList.remove("active");
    
    this.drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // Restore previous focus
    if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === "function") {
      this.lastFocusedElement.focus();
    }
  }

  populate(patient) {
    // 1. Header & Profile Card
    if (this.drawerAvatar) {
      this.drawerAvatar.style.backgroundColor = `${patient.avatarColor}20`;
      this.drawerAvatar.style.color = patient.avatarColor;
      this.drawerAvatar.textContent = patient.initials || patient.name.slice(0, 2).toUpperCase();
    }

    if (this.drawerName) {
      this.drawerName.textContent = patient.name;
    }

    if (this.drawerVipBadge) {
      this.drawerVipBadge.style.display = patient.isVip ? "inline-flex" : "none";
    }

    if (this.drawerId) {
      this.drawerId.textContent = `Patient ID: ${patient.id}`;
    }

    // 2. Contact info
    if (this.drawerContact) {
      this.drawerContact.innerHTML = `
        <a href="tel:${patient.contact.replace(/\s+/g, '')}">${this.escapeHtml(patient.contact)}</a>
      `;
    }

    if (this.drawerEmail) {
      this.drawerEmail.innerHTML = `
        <a href="mailto:${patient.email}">${this.escapeHtml(patient.email)}</a>
      `;
    }

    // 3. Nationality with flag
    if (this.drawerNationality) {
      this.drawerNationality.innerHTML = `
        <img src="assets/img/flag-${patient.flagCode}.svg" alt="" class="flag-icon" onerror="this.style.display='none'">
        <span>${this.escapeHtml(patient.nationality)}</span>
      `;
    }

    // 4. Birthday + Age
    if (this.drawerBirthdayAge) {
      this.drawerBirthdayAge.textContent = `${patient.birthday} (${patient.age} years, ${patient.gender || 'Not specified'})`;
    }

    // 5. NRIC / Passport
    if (this.drawerNric) {
      this.drawerNric.textContent = patient.nric || "N/A";
    }

    // 6. Occupation
    if (this.drawerOccupation) {
      this.drawerOccupation.textContent = patient.occupation || "N/A";
    }

    // 7. Last visit date + duration
    if (this.drawerLastVisit) {
      this.drawerLastVisit.textContent = `${patient.lastVisitDate} · Duration: ${patient.lastVisitDuration}`;
    }

    // 8. Medical remarks & allergies
    if (this.drawerRemarksCard) {
      this.drawerRemarksCard.className = `remarks-card ${patient.criticalRemark ? 'critical' : ''}`;
      this.drawerRemarksCard.innerHTML = `
        <strong>${patient.criticalRemark ? '⚠️ Critical Medical Alert / Allergies:' : 'Clinical Remarks:'}</strong>
        <p style="margin-top: 4px;">${this.escapeHtml(patient.medicalRemarks || "No adverse clinical remarks recorded.")}</p>
      `;
    }

    // 9. Upcoming Appointments
    if (this.drawerAppointmentsList) {
      this.drawerAppointmentsList.innerHTML = "";
      const appointments = patient.upcomingAppointments || [];

      if (appointments.length === 0) {
        this.drawerAppointmentsList.innerHTML = `
          <div class="empty-appointment-state" style="padding: 16px; background: var(--color-bg-muted); border-radius: var(--radius-md); text-align: center; color: var(--color-text-muted); font-size: 13px;">
            No upcoming appointments currently scheduled for this patient.
          </div>
        `;
      } else {
        appointments.forEach(apt => {
          const card = document.createElement("div");
          card.className = "appointment-card";
          card.innerHTML = `
            <div class="appointment-card-header">
              <span class="appointment-datetime">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                ${apt.datetime}
              </span>
              <span class="badge ${apt.status === 'Confirmed' ? 'badge-success' : 'badge-subtle'}">
                ${apt.status}
              </span>
            </div>
            <div class="appointment-treatment">${this.escapeHtml(apt.treatment)}</div>
            <div class="appointment-doctor">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              ${this.escapeHtml(apt.doctor)}
            </div>
            ${apt.symptoms ? `
              <div class="appointment-symptoms">
                <strong>Notes:</strong> ${this.escapeHtml(apt.symptoms)}
              </div>
            ` : ""}
          `;
          this.drawerAppointmentsList.appendChild(card);
        });
      }
    }
  }

  escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}
