# Kify Hospital Rajahmundry - Website Codebase

A premium, fast, responsive, and WCAG-accessible bilingual hospital website codebase. This repository has been structured for immediate deployment on **GitHub Pages**.

---

## 📂 Codebase Directory Structure

```text
├── index.html            # Homepage (Hero, Specialties, Founder spotlight)
├── our-story.html        # HEART values, hospital origin & history
├── doctors.html          # Interactive physician biographies & timings
├── services.html         # Fully searchable & filterable services catalog (27 items)
├── dental-clinic.html    # Teal-themed Dental procedures portal & FAQ
├── gallery.html          # 12-item filterable campus photo gallery
├── testimonials.html     # Patient reviews feed & outcomes disclaimer
├── contact.html          # Interactive Google Maps embed & consultation schedule
├── blog.html             # Healthcare awareness blog list (Search & Language filters)
│
├── blog/
│   ├── article-template.html                      # Clean nesting structure boilerplate
│   ├── scrub-typhus.html                          # [Bilingual] Larval mite bite fever guide
│   ├── primary-amoebic-meningoencephalitis.html   # [English] Naegleria fowleri safety tips
│   ├── foods-for-glowing-skin.html                # [Telugu] Dietary skin nutrition pointers
│   ├── health-after-storms.html                   # [Bilingual] Flood & Cyclone water sanitization
│   ├── heart-attacks-in-young-adults.html         # [English] Stress & cardiac screening values
│   ├── milk-and-health.html                       # [English] Lactose intolerance & dairy breakdown
│   └── healthy-way-to-eat-nuts.html               # [English] Soaked almonds & portion control
│
├── assets/
│   ├── css/
│   │   └── styles.css    # Central styling framework (HSL variables, layouts, animations)
│   ├── js/
│   │   └── main.js       # Centralized hospital metadata config & UI interaction logics
│   ├── icons/
│   │   ├── favicon.svg   # Custom monographic healthcare vector emblem
│   │   └── apple-touch-icon.png  # Validated high-density touch icon
│   └── images/
│       ├── image-fallback.svg        # General placeholder image SVG
│       ├── doctor-fallback.svg       # Physician avatar SVG placeholder (4:5 aspect)
│       └── hospital-placeholder.svg  # Campus outline SVG placeholder
│
├── site.webmanifest     # Browser progressive web app installation details
├── robots.txt            # Crawling rules for search engine spiders
└── sitemap.xml           # XML sitemap indexing all static HTML paths
```

---

## 🌐 How to Deploy on GitHub Pages

Because all paths in this repository are written as **relative paths** (e.g., `assets/css/styles.css` in root, and `../assets/css/styles.css` inside subfolders), it is fully compatible with GitHub Pages sub-directory path configurations.

### Steps to Deploy:
1. Push this codebase to your GitHub repository (e.g., `https://github.com/suryateja/KIFY`).
2. Navigate to your repository settings in the GitHub Web Dashboard.
3. Click on the **Pages** tab under the "Code and automation" section on the left sidebar.
4. Under **Build and deployment**, set the Source dropdown to **Deploy from a branch**.
5. Choose your target branch (usually `main`) and folder (`/ (root)`).
6. Click **Save**. Within a few minutes, your site will be live at `https://<your-username>.github.io/KIFY/`.

### Custom Domain Configuration:
To bind a custom domain (e.g., `www.kifyhospital.com`):
1. In the same **Pages** settings screen, enter your custom domain under the **Custom domain** field and click **Save**.
2. This will automatically write a `CNAME` file to the root of your repository.
3. Go to your DNS provider (e.g., GoDaddy, Cloudflare, Namecheap) and add the following records:
   - **CNAME Record**: Host: `www` | Target: `<your-username>.github.io`
   - **A Records** pointing to GitHub's server IPs:
     ```text
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
4. Check **Enforce HTTPS** in GitHub settings once the DNS resolves.

---

## ✏️ How to Modify Website Content

### 1. Hospital Contact Metadata (Global Config)
To update the phone numbers, addresses, emails, or Google Map links, you only need to modify them **once** inside [main.js](file:///Users/suryateja/Downloads/KIFY/KIFY/assets/js/main.js). The Javascript config will dynamically populate them across all footer elements, mobile action bars, and call interfaces:

```javascript
// Path: assets/js/main.js
const SITE_CONFIG = {
  phone: "85000 23456",
  dentalPhone: "8500 345 678",
  email: "kify@kifyhospital.com",
  address: "Near Nune Ganuga, Danavaipeta, Rajahmundry - 533103, Andhra Pradesh, India",
  mapsLink: "https://maps.app.goo.gl/wM8Jz1sQ1T3yG9xGA" // Replace with actual maps share URL
};
```

### 2. Appointment Booking Mechanics
The booking forms (both in the contact page and the modal popup) run on a **WhatsApp static API dispatch compiler**:
- When a patient hits **Submit**, the script captures the name, phone number, preferred department, date, time, and custom symptoms text.
- It translates and URL-encodes this data into a formatted message template.
- It then opens a new secure window routing to `https://wa.me/918500023456?text=[MESSAGE]`.
- To modify the recipient WhatsApp number, update the `phone` variable in the `SITE_CONFIG` object inside `main.js`.

### 3. Adding New Blog Articles
To add a new article:
1. Copy the boilerplate file `/blog/article-template.html` and name it (e.g. `/blog/your-new-topic.html`).
2. Update the header details, Breadcrumbs, table of contents, and inner text paragraphs.
3. Link the new page inside `/blog.html` by duplicating one of the `<article class="blog-card">` components in the list grid and inserting the correct title, category, and language meta filters.

### 4. Updating Photos
All images use a **resilient load pipeline** inside `main.js`. 
To load custom images:
- Place the image in your `/assets/images/` directory.
- Update the `src` attribute of the image in your HTML files to point to `assets/images/your-image.jpg`.
- The system automatically handles local, high-speed resolution fallback if external server networks fail.

---

## ♿ Accessibility Compliance (WCAG 2.1 AA)
The site complies with WCAG accessibility guidelines:
* **Outlined Keyboard Navigation Focus**: Every interactive tab, form input, button, and link displays a visible blue outline when navigated via the keyboard Tab key.
* **Focus Traps**: Launching the Mobile Nav Drawer or the Appointment Modal captures focus within that container, preventing tab-focus leak into hidden background page elements. Focus is returned to the triggering button upon closing.
* **Skip Link**: The very first element in every HTML file is a visually hidden skip-link that appears on tab focus, allowing screen readers and keyboard users to skip directly to `#main-content`.
* **Touch Targets**: All mobile action buttons, links, and select menus maintain a minimum target diameter of `44x44px` for comfortable finger tap interactions.
