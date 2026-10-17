/**
 * Sidebar Navigation Controller
 * Manages active states, badge counts, mobile drawer toggle, and responsive collapse.
 */

class SidebarManager {
  constructor() {
    this.sidebar = document.getElementById("appSidebar");
    this.mobileToggle = document.getElementById("mobileNavToggle");
    this.navItems = document.querySelectorAll(".sidebar-nav .nav-item");
    this.sidebarBackdrop = document.getElementById("sidebarBackdrop");
    this.proCardCta = document.getElementById("proCardCta");

    this.init();
  }

  init() {
    // Menu item active state navigation
    this.navItems.forEach(item => {
      item.addEventListener("click", (e) => {
        // Prevent default navigation for demo
        e.preventDefault();
        
        this.navItems.forEach(nav => {
          nav.classList.remove("active");
          nav.removeAttribute("aria-current");
        });

        item.classList.add("active");
        item.setAttribute("aria-current", "page");

        const targetLabel = item.querySelector(".nav-label")?.textContent.trim();
        if (targetLabel && targetLabel !== "Patient") {
          window.AppToast?.show(`Navigated to ${targetLabel} view.`);
        }

        // Close mobile drawer if open
        this.closeMobileDrawer();
      });
    });

    // Mobile Hamburger toggle
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener("click", () => {
        this.toggleMobileDrawer();
      });
    }

    if (this.sidebarBackdrop) {
      this.sidebarBackdrop.addEventListener("click", () => {
        this.closeMobileDrawer();
      });
    }

    // Pro CTA click
    if (this.proCardCta) {
      this.proCardCta.addEventListener("click", () => {
        window.AppToast?.show("AlphaCloud Clinic Pro: Multi-branch sync and AI triage unlocked!", "success");
      });
    }
  }

  toggleMobileDrawer() {
    if (!this.sidebar) return;
    const isOpen = this.sidebar.classList.contains("mobile-open");
    if (isOpen) {
      this.closeMobileDrawer();
    } else {
      this.openMobileDrawer();
    }
  }

  openMobileDrawer() {
    if (!this.sidebar) return;
    this.sidebar.classList.add("mobile-open");
    if (this.sidebarBackdrop) this.sidebarBackdrop.classList.add("active");
    if (this.mobileToggle) this.mobileToggle.setAttribute("aria-expanded", "true");
  }

  closeMobileDrawer() {
    if (!this.sidebar) return;
    this.sidebar.classList.remove("mobile-open");
    if (this.sidebarBackdrop) this.sidebarBackdrop.classList.remove("active");
    if (this.mobileToggle) this.mobileToggle.setAttribute("aria-expanded", "false");
  }
}
