# Minimalisticart.co

A modern, minimalist artisan product management platform featuring an intuitive admin dashboard and responsive product showcase.

## Overview

Minimalisticart.co is a web-based system designed for independent artisans to showcase and manage their handcrafted products (keychains, mufflers, bouquets, etc.). The platform combines a clean, Apple-inspired aesthetic with powerful admin tools for inventory management, image uploads, and category organization.

**Key Purpose:** Provide artisans with a simple yet sophisticated way to display their collections and manage products with a modern, responsive interface.

## Features

- ✨ **Admin Dashboard** — Manage products and categories with an intuitive interface
- 📱 **Responsive Design** — Seamless experience across desktop, tablet, and mobile devices
- 🎨 **Modern Sidebar Navigation** — Clean, collapsible left-aligned navigation (desktop) and animated drawer menu (mobile)
- 🖼️ **Image Management** — Upload and manage product images via Supabase Storage
- 🌓 **Dark Mode Support** — Built-in light/dark theme toggle
- ⚡ **Smooth Animations** — GPU-accelerated transitions with Framer Motion
- 📊 **Product Organization** — Categorize, edit, and delete products effortlessly
- 🔐 **Authentication** — Secure admin login system with Supabase
- 📡 **Real-time Database** — Powered by Supabase for reliable data management
- ♿ **Accessible** — WCAG 2.1 Level AA compliant with keyboard navigation support

## Tech Stack

- **Frontend:** React 19.2.4, Vite 6.2.0
- **Styling:** Tailwind CSS 4.2.1, Framer Motion 12.38.0
- **Icons:** Lucide React 0.577.0
- **Backend/Database:** Supabase (PostgreSQL)
- **File Storage:** Supabase Storage
- **Development Tool:** Vite with HMR

## Project Structure

```
src/
├── components/
│   ├── Admin/
│   │   ├── AdminDashboard.jsx       (Main admin interface)
│   │   ├── AdminSidebar.jsx         (Responsive sidebar navigation)
│   │   ├── AdminLogin.jsx           (Authentication)
│   │   └── AdminSidebar.css         (Sidebar styles)
│   ├── Categories.jsx               (Category display)
│   ├── Crafter.jsx                  (Artisan profile section)
│   ├── CTA.jsx                      (Call-to-action)
│   ├── FeaturedBenefits.jsx        (Benefits showcase)
│   ├── Footer.jsx                   (Footer)
│   ├── Gallery.jsx                  (Product gallery)
│   ├── Hero.jsx                     (Landing hero section)
│   ├── HowItWorks.jsx              (Instructions/tutorial)
│   └── Navbar.jsx                   (Top navigation)
├── context/
│   └── StoreContext.jsx             (Global state management)
├── lib/
│   └── supabase.js                  (Supabase configuration)
├── App.jsx                          (Main component)
├── main.jsx                         (Entry point)
├── App.css                          (Global styles)
└── index.css                        (Base styles)

public/
└── [Product images and assets]
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account (for database and storage)

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/isthatpratham/Minimalisticart.co.git
   cd Minimalisticart.co
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Supabase:**
   - Create a project at [Supabase](https://supabase.com)
   - Copy your API URL and anon key
   - Create a `.env` file in the project root:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Set up database schema:**
   - Create `products` table (id, name, description, price, category_id, image_url, created_at)
   - Create `categories` table (id, name, description, image_url)
   - Create `admins` table for authentication

5. **Run development server:**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173`

6. **Build for production:**
   ```bash
   npm run build
   npm run preview
   ```

### Hosting (Hostinger / Alternative)

1. Build the project: `npm run build`
2. Upload `dist/` folder to your hosting provider
3. Ensure `.env` variables are set in your hosting environment
4. Configure database connection strings for production

## Screenshots

See the `screenshots/` folder for visual examples of:
- Admin dashboard interface
- Product management system
- Mobile responsive design
- Dark mode interface
- Sidebar navigation (desktop and mobile)

## Future Improvements

- [ ] User reviews and ratings system
- [ ] Shopping cart and checkout functionality
- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Email notifications for orders
- [ ] Analytics dashboard
- [ ] Multi-language support (i18n)
- [ ] Advanced product filtering and search
- [ ] Inventory management alerts
- [ ] Customer account system
- [ ] Social media integration
- [ ] SEO optimization
- [ ] Performance metrics dashboard

## License

This project is open source. Feel free to use and modify as needed.
