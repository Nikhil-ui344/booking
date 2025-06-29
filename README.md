# TravelBooking - Modern React Landing Page

A beautiful, modern booking website landing page built with React, featuring smooth animations, responsive design, and an elegant user interface.

## 🌟 Features

- **Sticky Navigation Bar** with glassmorphism effects
- **Full-Screen Hero Section** with animated CTAs
- **Interactive Destination Cards** with hover zoom effects
- **About Section** with side-by-side layout and scroll animations
- **Photo Gallery** with lightbox modal functionality
- **Dark Footer** with social links and newsletter signup
- **Fully Responsive** mobile-first design
- **Smooth Animations** using Framer Motion
- **Modern Typography** with Poppins font
- **Glassmorphism Effects** and gradient backgrounds

## 🚀 Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast development build tool
- **Framer Motion** - Smooth animations and transitions
- **React Intersection Observer** - Scroll-triggered animations
- **Modern CSS** - Custom properties, flexbox, grid
- **Responsive Design** - Mobile-first approach

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and visit `http://localhost:5173`

## 🛠️ Build for Production

```bash
npm run build
```

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎨 Design Features

### Color Palette
- Primary gradient: Blue to purple (#667eea to #764ba2)
- Secondary gradient: Pink to red (#f093fb to #f5576c)
- Neutral colors: Professional grays and whites

### Typography
- **Primary Font**: Poppins (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700

### Animations
- Smooth page transitions
- Hover effects on interactive elements
- Scroll-triggered fade-in animations
- Parallax-style hero section

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx & Navbar.css
│   ├── Hero.jsx & Hero.css
│   ├── Destinations.jsx & Destinations.css
│   ├── About.jsx & About.css
│   ├── Gallery.jsx & Gallery.css
│   └── Footer.jsx & Footer.css
├── styles.css (Global styles)
├── App.jsx
└── main.jsx
```

## 🔧 Customization

### Adding Real Images
Replace the CSS gradient backgrounds in component CSS files with actual images:

```css
/* Replace this */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* With this */
background-image: url('path-to-your-image.jpg');
background-size: cover;
background-position: center;
```

### Modifying Colors
Update the CSS custom properties in `styles.css`:

```css
:root {
  --primary-gradient: your-gradient-here;
  --accent-color: your-color-here;
  /* ... other variables */
}
```

## 📝 Components Overview

1. **Navbar** - Sticky navigation with mobile menu
2. **Hero** - Full-screen banner with animated call-to-action
3. **Destinations** - Three featured destination cards
4. **About** - Company information with statistics
5. **Gallery** - Photo grid with lightbox functionality
6. **Footer** - Dark theme with social links and newsletter

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Built with ❤️ using React and modern web technologies.
