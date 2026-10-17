/**
 * Table Component: Rendering, Sorting, Filtering, Bulk Selection, and Pagination
 */

class PatientTableManager {
  constructor(options = {}) {
    this.tableBody = document.getElementById("patientTableBody");
    this.paginationInfo = document.getElementById("paginationInfo");
    this.paginationControls = document.getElementById("paginationControls");
    this.selectAllCheckbox = document.getElementById("selectAllCheckbox");
    this.bulkBar = document.getElementById("bulkBar");
    this.bulkCount = document.getElementById("bulkCount");
    this.searchInput = document.getElementById("searchInput");
    this.vipFilter = document.getElementById("vipFilter");
    this.nationalityFilter = document.getElementById("nationalityFilter");
    this.pageSizeSelect = document.getElementById("pageSizeSelect");

    this.allPatients = [];
    this.filteredPatients = [];
    this.selectedIds = new Set();
    
    this.currentPage = 1;
    this.pageSize = 10;
    this.sortColumn = "datetime";
    this.sortDirection = "desc"; // 'asc' or 'desc'
    this.searchQuery = "";
    this.activeVipFilter = "all";
    this.activeNationalityFilter = "all";

    this.onRowClick = options.onRowClick || (() => {});
    this.onDataChange = options.onDataChange || (() => {});

    this.init();
  }

  init() {
    this.bindEvents();
  }

  setData(patients) {
    this.allPatients = patients;
    this.applyFiltersAndSort();
  }

  bindEvents() {
    // Select all checkbox
    if (this.selectAllCheckbox) {
      this.selectAllCheckbox.addEventListener("change", (e) => {
        const checked = e.target.checked;
        const pagePatients = this.getCurrentPageData();
        pagePatients.forEach(p => {
          if (checked) {
            this.selectedIds.add(p.id);
          } else {
            this.selectedIds.delete(p.id);
          }
        });
        this.updateBulkBar();
        this.renderTableRows();
      });
    }

    // Sortable headers
    const sortHeaders = document.querySelectorAll(".patient-table thead th.sortable");
    sortHeaders.forEach(th => {
      th.addEventListener("click", () => {
        const col = th.getAttribute("data-sort");
        if (this.sortColumn === col) {
          this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
        } else {
          this.sortColumn = col;
          this.sortDirection = "asc";
        }

        // Update header UI
        sortHeaders.forEach(h => {
          h.classList.remove("sorted-asc", "sorted-desc");
          h.setAttribute("aria-sort", "none");
        });
        th.classList.add(this.sortDirection === "asc" ? "sorted-asc" : "sorted-desc");
        th.setAttribute("aria-sort", this.sortDirection === "asc" ? "ascending" : "descending");

        this.applyFiltersAndSort();
      });
    });

    // Close open action menus when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".quick-menu-container")) {
        document.querySelectorAll(".quick-menu-dropdown.open").forEach(dropdown => {
          dropdown.classList.remove("open");
        });
      }
    });
  }

  setSearchQuery(query) {
    this.searchQuery = (query || "").trim().toLowerCase();
    this.currentPage = 1;
    this.applyFiltersAndSort();
  }

  setVipFilter(vip) {
    this.activeVipFilter = vip;
    this.currentPage = 1;
    this.applyFiltersAndSort();
  }

  setNationalityFilter(nat) {
    this.activeNationalityFilter = nat;
    this.currentPage = 1;
    this.applyFiltersAndSort();
  }

  setPageSize(size) {
    this.pageSize = parseInt(size, 10) || 10;
    this.currentPage = 1;
    this.applyFiltersAndSort();
  }

  applyFiltersAndSort() {
    // 1. Filter
    this.filteredPatients = this.allPatients.filter(patient => {
      // Search across name, id, contact, nationality, email, nric
      if (this.searchQuery) {
        const searchPool = `${patient.name} ${patient.id} ${patient.contact} ${patient.nationality} ${patient.email} ${patient.nric}`.toLowerCase();
        if (!searchPool.includes(this.searchQuery)) {
          return false;
        }
      }

      // VIP filter
      if (this.activeVipFilter === "vip" && !patient.isVip) return false;
      if (this.activeVipFilter === "regular" && patient.isVip) return false;

      // Nationality filter
      if (this.activeNationalityFilter !== "all" && patient.nationality !== this.activeNationalityFilter) {
        return false;
      }

      return true;
    });

    // 2. Sort
    this.filteredPatients.sort((a, b) => {
      let valA = a[this.sortColumn];
      let valB = b[this.sortColumn];

      if (this.sortColumn === "datetime") {
        valA = new Date(valA).getTime() || 0;
        valB = new Date(valB).getTime() || 0;
      } else if (typeof valA === "string") {
        valA = valA.toLowerCase();
        valB = (valB || "").toLowerCase();
      }

      if (valA < valB) return this.sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return this.sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    // Ensure current page is in valid range
    const totalPages = Math.ceil(this.filteredPatients.length / this.pageSize) || 1;
    if (this.currentPage > totalPages) {
      this.currentPage = totalPages;
    }

    this.render();
  }

  showLoading(duration = 350) {
    if (!this.tableBody) return;
    this.tableBody.innerHTML = Array(5).fill(0).map(() => `
      <tr class="table-loading-row" aria-hidden="true">
        <td class="col-check">
          <div class="skeleton-shimmer" style="width: 18px; height: 18px; border-radius: 4px;"></div>
        </td>
        <td>
          <div class="patient-profile-cell">
            <div class="skeleton-shimmer skeleton-avatar"></div>
            <div style="display: flex; flex-direction: column; gap: 6px; width: 130px;">
              <div class="skeleton-shimmer" style="width: 120px; height: 14px;"></div>
              <div class="skeleton-shimmer" style="width: 70px; height: 11px;"></div>
            </div>
          </div>
        </td>
        <td>
          <div class="skeleton-shimmer" style="width: 110px; height: 14px;"></div>
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div class="skeleton-shimmer" style="width: 24px; height: 18px;"></div>
            <div class="skeleton-shimmer" style="width: 75px; height: 14px;"></div>
          </div>
        </td>
        <td>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <div class="skeleton-shimmer" style="width: 140px; height: 14px;"></div>
            <div class="skeleton-shimmer" style="width: 60px; height: 11px;"></div>
          </div>
        </td>
        <td class="action-cell">
          <div class="skeleton-shimmer" style="width: 28px; height: 28px; border-radius: 4px;"></div>
        </td>
      </tr>
    `).join("");

    setTimeout(() => {
      this.renderTableRows();
      this.renderPagination();
      this.updateBulkBar();
    }, duration);
  }

  getStatusClass(status) {
    if (!status) return "active";
    const s = status.toLowerCase();
    if (s.includes("queue")) return "waiting";
    if (s.includes("wait")) return "pending";
    if (s.includes("confirm")) return "active";
    if (s.includes("schedule")) return "waiting";
    return "active";
  }

  getCurrentPageData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredPatients.slice(start, end);
  }

  render() {
    this.renderTableRows();
    this.renderPagination();
    this.updateBulkBar();
  }

  renderTableRows() {
    if (!this.tableBody) return;
    this.tableBody.innerHTML = "";

    const pagePatients = this.getCurrentPageData();

    if (pagePatients.length === 0) {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td colspan="6">
          <div class="table-empty-state">
            <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <div class="empty-title">No patients found</div>
            <p>Try refining your search keyword, filter options, or add a new patient record.</p>
          </div>
        </td>
      `;
      this.tableBody.appendChild(tr);
      return;
    }

    pagePatients.forEach(patient => {
      const isSelected = this.selectedIds.has(patient.id);
      const tr = document.createElement("tr");
      tr.id = `row-${patient.id}`;
      if (isSelected) tr.classList.add("selected");

      // Row markup adhering to specifications in README
      tr.innerHTML = `
        <td class="col-check" onclick="event.stopPropagation()">
          <input type="checkbox" 
                 class="custom-checkbox row-select-checkbox" 
                 data-id="${patient.id}" 
                 aria-label="Select patient ${this.escapeHtml(patient.name)}"
                 ${isSelected ? "checked" : ""}>
        </td>
        <td>
          <div class="patient-profile-cell">
            <div class="patient-avatar-wrap" style="background-color: ${patient.avatarColor}20; color: ${patient.avatarColor};" data-tooltip="${this.escapeHtml(patient.name)}">
              <span>${patient.initials || patient.name.slice(0, 2).toUpperCase()}</span>
            </div>
            <div class="patient-name-info">
              <div class="patient-name-row">
                <span class="patient-name truncate" data-tooltip="${this.escapeHtml(patient.name)} (${patient.gender || ''}, ${patient.age || ''}y)">${this.escapeHtml(patient.name)}</span>
                ${patient.isVip ? `
                  <span class="badge badge-vip" data-tooltip="VIP Care Protocol Activated">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    VIP
                  </span>
                ` : ""}
              </div>
              <span class="patient-id">${patient.id}</span>
            </div>
          </div>
        </td>
        <td class="contact-cell">
          <span data-tooltip="Click to call ${patient.contact}">${this.escapeHtml(patient.contact)}</span>
        </td>
        <td>
          <div class="nationality-cell">
            <img src="assets/img/flag-${patient.flagCode}.svg" 
                 alt="${this.escapeHtml(patient.nationality)} flag" 
                 class="flag-icon" 
                 onerror="this.style.display='none'">
            <span data-tooltip="Nationality: ${this.escapeHtml(patient.nationality)}">${this.escapeHtml(patient.nationality)}</span>
          </div>
        </td>
        <td class="datetime-cell">
          <div style="display: flex; flex-direction: column; gap: 3px;">
            <time datetime="${patient.datetime}">${patient.datetime}</time>
            <div class="status-indicator" data-tooltip="Clinical Status: ${patient.status || 'Active'}">
              <span class="status-dot ${this.getStatusClass(patient.status)}"></span>
              <span style="font-size: 11px; color: var(--color-text-muted);">${patient.status || 'Active'}</span>
            </div>
          </div>
        </td>
        <td class="action-cell" onclick="event.stopPropagation()">
          <div class="quick-menu-container">
            <button type="button" 
                    class="btn-icon btn-ghost row-action-btn" 
                    aria-label="Quick actions for ${this.escapeHtml(patient.name)}"
                    aria-haspopup="true"
                    data-tooltip="Quick Actions"
                    data-id="${patient.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
                <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
              </svg>
            </button>
            <div class="quick-menu-dropdown" id="menu-${patient.id}" role="menu">
              <button type="button" class="quick-menu-item" role="menuitem" data-action="view" data-id="${patient.id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                View Dossier
              </button>
              <button type="button" class="quick-menu-item" role="menuitem" data-action="vip" data-id="${patient.id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                ${patient.isVip ? "Remove VIP" : "Promote to VIP"}
              </button>
              <button type="button" class="quick-menu-item" role="menuitem" data-action="appointment" data-id="${patient.id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Book Appointment
              </button>
              <button type="button" class="quick-menu-item danger" role="menuitem" data-action="delete" data-id="${patient.id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Delete Record
              </button>
            </div>
          </div>
        </td>
      `;

      // Row click opens patient detail drawer
      tr.addEventListener("click", () => {
        this.onRowClick(patient);
      });

      // Selection checkbox toggle
      const checkbox = tr.querySelector(".row-select-checkbox");
      checkbox.addEventListener("change", (e) => {
        if (e.target.checked) {
          this.selectedIds.add(patient.id);
          tr.classList.add("selected");
        } else {
          this.selectedIds.delete(patient.id);
          tr.classList.remove("selected");
        }
        this.updateBulkBar();
      });

      // Action menu button toggle
      const actionBtn = tr.querySelector(".row-action-btn");
      const dropdown = tr.querySelector(".quick-menu-dropdown");
      actionBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        // Close other dropdowns
        document.querySelectorAll(".quick-menu-dropdown.open").forEach(d => {
          if (d !== dropdown) d.classList.remove("open");
        });
        dropdown.classList.toggle("open");
      });

      // Quick menu actions
      const menuItems = tr.querySelectorAll(".quick-menu-item");
      menuItems.forEach(item => {
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          dropdown.classList.remove("open");
          const action = item.getAttribute("data-action");
          this.handleQuickAction(action, patient);
        });
      });

      this.tableBody.appendChild(tr);
    });

    // Sync select-all checkbox
    if (this.selectAllCheckbox) {
      const allChecked = pagePatients.length > 0 && pagePatients.every(p => this.selectedIds.has(p.id));
      const someChecked = pagePatients.some(p => this.selectedIds.has(p.id));
      this.selectAllCheckbox.checked = allChecked;
      this.selectAllCheckbox.indeterminate = !allChecked && someChecked;
    }
  }

  handleQuickAction(action, patient) {
    if (action === "view") {
      this.onRowClick(patient);
    } else if (action === "vip") {
      patient.isVip = !patient.isVip;
      this.onDataChange({ type: "update", patient });
      this.applyFiltersAndSort();
      window.AppToast?.show(`Updated ${patient.name} VIP status to ${patient.isVip ? "VIP" : "Standard"}.`);
    } else if (action === "appointment") {
      this.onRowClick(patient);
      window.AppToast?.show(`Ready to book new appointment for ${patient.name}.`);
    } else if (action === "delete") {
      if (confirm(`Are you sure you want to delete patient record ${patient.id} (${patient.name})?`)) {
        this.onDataChange({ type: "delete", id: patient.id });
        window.AppToast?.show(`Deleted patient ${patient.name}.`, "error");
      }
    }
  }

  renderPagination() {
    const total = this.filteredPatients.length;
    const start = total === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(start + this.pageSize - 1, total);
    const totalPages = Math.ceil(total / this.pageSize) || 1;

    // Requirement from README: "Showing X of Y results"
    if (this.paginationInfo) {
      this.paginationInfo.textContent = `Showing ${start} to ${end} of ${total} results`;
    }

    if (!this.paginationControls) return;
    this.paginationControls.innerHTML = "";

    // Prev Button
    const prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "page-btn";
    prevBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
      <span class="sr-only">Previous Page</span>
    `;
    prevBtn.disabled = this.currentPage <= 1;
    prevBtn.addEventListener("click", () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.render();
      }
    });
    this.paginationControls.appendChild(prevBtn);

    // Page Numbers
    for (let p = 1; p <= totalPages; p++) {
      if (totalPages > 6 && Math.abs(p - this.currentPage) > 2 && p !== 1 && p !== totalPages) {
        if (p === 2 || p === totalPages - 1) {
          const ellipsis = document.createElement("span");
          ellipsis.className = "page-btn";
          ellipsis.style.border = "none";
          ellipsis.textContent = "...";
          this.paginationControls.appendChild(ellipsis);
        }
        continue;
      }

      const pageBtn = document.createElement("button");
      pageBtn.type = "button";
      pageBtn.className = `page-btn ${p === this.currentPage ? "active" : ""}`;
      pageBtn.textContent = p;
      pageBtn.setAttribute("aria-label", `Page ${p}`);
      if (p === this.currentPage) {
        pageBtn.setAttribute("aria-current", "page");
      }
      pageBtn.addEventListener("click", () => {
        this.currentPage = p;
        this.render();
      });
      this.paginationControls.appendChild(pageBtn);
    }

    // Next Button
    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "page-btn";
    nextBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
      <span class="sr-only">Next Page</span>
    `;
    nextBtn.disabled = this.currentPage >= totalPages;
    nextBtn.addEventListener("click", () => {
      if (this.currentPage < totalPages) {
        this.currentPage++;
        this.render();
      }
    });
    this.paginationControls.appendChild(nextBtn);
  }

  updateBulkBar() {
    if (!this.bulkBar || !this.bulkCount) return;

    const count = this.selectedIds.size;
    if (count > 0) {
      this.bulkBar.classList.add("active");
      this.bulkCount.textContent = `${count} patient${count > 1 ? "s" : ""} selected`;
    } else {
      this.bulkBar.classList.remove("active");
    }
  }

  getSelectedPatients() {
    return this.allPatients.filter(p => this.selectedIds.has(p.id));
  }

  clearSelection() {
    this.selectedIds.clear();
    this.updateBulkBar();
    this.renderTableRows();
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
