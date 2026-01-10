# Supacoat E-commerce Website

A modern, responsive e-commerce website for Supacoat - wholesale hardware supplier in Kenya.

Built with Next.js 15.5.9, TypeScript, Tailwind CSS, and Neon PostgreSQL.

## Features

- 🎨 **Modern Design** - Clean, professional interface with smooth animations
- 📱 **Fully Responsive** - Perfect experience on all devices
- 💬 **WhatsApp Integration** - Direct ordering through WhatsApp
- 🛍️ **Product Showcase** - Beautiful product grid with detailed information
- 🔐 **Admin Panel** - Complete product management system
- ⚡ **Fast Performance** - Built with Next.js 15 and optimized for speed
- 🎯 **SEO Optimized** - Better visibility in search engines
- 🖼️ **Custom Logo Integration** - Professional branding throughout

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment Ready**: Vercel/Netlify compatible

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or download this project

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

### Admin Panel Access

**URL**: `http://localhost:3000/admin`  
**Default Password**: `supacoat2026`

⚠️ **IMPORTANT**: Change the password in production!
- Edit password in `src/app/admin/page.tsx` (line 23)
- For production, implement proper backend authentication

### Admin Panel Features

- ✅ Add new products
- ✅ Edit existing products
- ✅ Delete products
- ✅ Manage product images, prices, categories
- ✅ Real-time updates on the main website
- ✅ Product statistics dashboard

### WhatsApp Number

Update the WhatsApp number in the following files:
- `src/components/Hero.tsx` (line 8)
- `src/components/ProductGrid.tsx` (line 47)
- `src/components/Contact.tsx` (line 7)
- `src/components/Footer.tsx` (line 4)

Replace `"1234567890"` with your actual WhatsApp number (include country code without + or spaces).

### Business Information

Update business details in:
- `src/components/Contact.tsx` - phone, email, location
- `src/app/layout.tsx` - site metadata

### Products

Edit the products array in `src/components/ProductGrid.tsx` to add/modify products:
- Product names, descriptions, prices
- Product images (currently using Unsplash placeholders)
- Categories and ratings

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Home page
├── components/
│   ├── Hero.tsx          # Hero section with navigation
│   ├── ProductGrid.tsx   # Products showcase
│   ├── About.tsx         # About/features section
│   ├── Contact.tsx       # Contact section with form
│   └── Footer.tsx        # Footer component
```

## Customization

### Colors

The site uses a blue theme. To change colors, edit `tailwind.config.ts` and component classes.

### Images

Replace placeholder images in `ProductGrid.tsx` with your actual product images. Store images in the `public` folder and reference them like `/images/product1.jpg`.

### Content

Update text content throughout the components to match your business messaging and brand voice.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Deploy automatically

### Other Platforms

Build for production:
```bash
npm run build
npm start
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for Supacoat.

## Support

For support or questions, contact via WhatsApp using the number configured in the site.
