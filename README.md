# Patient Management System UI

A responsive, accessible Patient Management System interface built as a static webpage with plain HTML, CSS and JavaScript.

## Live Preview

- Repository: `https://github.com/fzirfn/patient-management-system.git`
- Live preview (optional): `https://fzirfn.github.io/patient-management-system/`

## Tech Stack

- HTML5, CSS3, vanilla JavaScript (no build step required)
- Font: Inter, falling back to the system sans-serif stack
- Optional: Tailwind, Bootstrap or SCSS if preferred

## Getting Started

```bash
git clone https://github.com/fzirfn/patient-management-system.git
cd patient-management-system

# Option 1: open directly
open index.html

# Option 2: serve locally
npx serve .
# or
python3 -m http.server 8000
```

## Project Structure

```
patient-management-ui/
├── index.html
├── README.md
├── assets/
│   ├── img/            # avatars, flags, logo
│   └── icons/          # SVG icons (with alt text / aria-labels)
├── css/
│   ├── tokens.css      # colors, spacing, typography variables
│   ├── base.css        # reset, typography, utilities
│   ├── layout.css      # sidebar, header, main grid
│   ├── components.css  # buttons, search, badges, table, pagination, cards
│   └── responsive.css  # breakpoints
├── js/
│   ├── data.js         # mock patient and appointment data
│   ├── table.js        # render, sort, filter, pagination
│   ├── panel.js        # patient detail slide-in panel
│   ├── sidebar.js      # collapse / icon-only behavior
│   └── main.js         # app bootstrap and state handling
└── components/         # optional HTML partials
```

## Layout

### 1. Navigation Sidebar

- Fixed left, ~240px wide, background `#0052CC`
- Menu items (icon + text):

| Item | Notes |
| --- | --- |
| Dashboard | |
| Patient | Active state highlighted |
| Queue | Counter badge **2** |
| Consultation | |
| Warehouse | |
| Reports | |
| Appointment | Counter badge **5** |
| Settings | |

- Bottom card: **"Update to Pro"** with white background and a blue CTA button

### 2. Top Header

- White background
- Title `患者管理` with a subtitle
- Search bar with magnifying glass icon
- "+" button to add a new patient
- User profile section with avatar

## Patient List View

### Table

| Column | Content |
| --- | --- |
| Patient Name | Avatar + full name, ID number below (12px muted) |
| Contact | Phone number with country code |
| Nationality | Country name + flag |
| Datetime | `DD MMM YYYY HH:MM AM/PM` |
| Action | Three-dots quick actions menu |

Row behavior:

- **VIP badge** (`#FFD700`) on important patients
- Alternating row colors (`#FFFFFF` / `#F8F9FA`)
- Hover state on rows
- Pagination at the bottom

### Patient Detail Panel (slide-in, right)

- Contact, email
- Nationality (with flag)
- Birthday + age
- NRIC / Passport
- Occupation
- Last visit date + duration
- Medical remarks (e.g. allergies)

### Upcoming Appointments

Appointment cards showing:

- Date + time
- Treatment type
- Assigned doctor
- Status or symptoms summary

## Design Tokens

### Typography

| Element | Style |
| --- | --- |
| Font | Inter / system sans-serif |
| Page title | 24px bold |
| Subtitle | 14px regular |
| Table headers | 14px medium |
| Table content | 14px regular |
| ID numbers | 12px, muted color |

### Colors

| Purpose | Token | Value |
| --- | --- | --- |
| Primary Blue | `--color-primary` | `#0052CC` |
| Secondary Blue | `--color-primary-light` | `#E8F0FE` |
| Text (Primary) | `--color-text` | `#333333` |
| Text (Secondary) | `--color-text-muted` | `#666666` |
| Borders | `--color-border` | `#E5E5E5` |
| Background (Main) | `--color-bg` | `#FFFFFF` |
| Background (Alt Row) | `--color-bg-alt` | `#F8F9FA` |
| Success | `--color-success` | `#36B37E` |
| VIP Badge | `--color-vip` | `#FFD700` |

## Interactive Elements

### Buttons

- **Primary:** blue background, white text
- **Secondary:** white background, blue border
- **Icon buttons:** grey, with hover state

### Search Bar

- Light grey background, prefixed search icon
- Placeholder: `"Search"`
- Min width: `240px`

### Pagination

- Prev / Next buttons
- Current page indicator
- Total result counter: `"Showing X of Y results"`

## Responsive Behavior

| Breakpoint | Behavior |
| --- | --- |
| Desktop (1200px+) | Full layout |
| Tablet (768–1199px) | Collapsible sidebar, horizontally scrollable table |
| Mobile (<768px) | Icons-only sidebar, responsive table |

## UI States & Interactions

- [x] Row hover states
- [x] Active state for navigation items
- [x] Loading state for data fetching
- [x] Empty state for no results
- [x] Error state for failed operations
- [x] Tooltips for truncated content

## Bonus Features

- [x] Sort on table headers
- [x] Filter options for the patient list
- [x] Export (e.g. CSV)
- [x] Bulk actions menu
- [x] Quick actions menu (three dots)
- [x] Real-time status indicators

## Accessibility

- Sufficient color contrast (WCAG AA)
- Full keyboard navigation (tab order, Esc closes panel/menus)
- ARIA labels and roles for interactive elements (`aria-current`, `aria-expanded`, `role="dialog"` for the panel)
- Visible focus states on all interactive elements
- Alt text for all images and icons

## Submission Checklist

- [x] Public GitHub repository
- [x] Live preview URL (optional)
- [x] README with setup instructions
- [x] Component-based structure
- [x] Clean commit history
