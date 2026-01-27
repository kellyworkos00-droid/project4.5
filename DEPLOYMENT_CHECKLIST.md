# Deployment Checklist for Supacoat E-commerce

Use this checklist before deploying to production to ensure everything is configured correctly.

## Pre-Deployment

### Security
- [ ] Change admin password from default (`supacoat2026`)
- [ ] Set all environment variables in production hosting platform
- [ ] Review and update security headers if needed
- [ ] Ensure `.env.local` is in `.gitignore` and not committed
- [ ] Remove any test/debug console.log statements
- [ ] Verify no API keys or secrets are hardcoded

### Environment Variables
Ensure these are set in your hosting platform (Vercel, Netlify, etc.):

```bash
# Required
DATABASE_URL=your_production_database_url
NEXT_PUBLIC_WHATSAPP_NUMBER=254703771771
NEXT_PUBLIC_PHONE_NUMBER=0703771771
NEXT_PUBLIC_EMAIL=supacoatinvestmentltd@gmail.com
NEXT_PUBLIC_LOCATION=Kenya
```

### Content
- [ ] Update business contact information
- [ ] Replace placeholder product images with actual product photos
- [ ] Update product information and prices
- [ ] Verify all links work correctly
- [ ] Update company description and about text
- [ ] Add actual testimonials
- [ ] Update social media links if applicable

### SEO & Metadata
- [ ] Update `metadataBase` URL in `src/app/layout.tsx` to production URL
- [ ] Create and add Open Graph image (`/og-image.jpg`, 1200x630px)
- [ ] Update structured data URLs to production domain
- [ ] Verify sitemap is generated correctly
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics (if needed)

### Performance
- [ ] Run production build locally: `npm run build`
- [ ] Test production build: `npm start`
- [ ] Check Lighthouse scores
- [ ] Optimize images (already using Next.js Image)
- [ ] Verify PWA manifest and icons are correct

### Testing
- [ ] Test on multiple devices (mobile, tablet, desktop)
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test WhatsApp integration links
- [ ] Test product search and filtering
- [ ] Test admin panel functionality
- [ ] Verify error pages (404, 500) display correctly
- [ ] Test form submissions

### Database
- [ ] Database is properly set up (Neon PostgreSQL)
- [ ] Database connection string is secure
- [ ] Run database initialization if needed
- [ ] Backup database before deployment

## Deployment

### Vercel (Recommended)
1. [ ] Connect GitHub repository to Vercel
2. [ ] Set environment variables in Vercel dashboard
3. [ ] Configure production domain
4. [ ] Deploy and verify

### Alternative Platforms
1. [ ] Set up build command: `npm run build`
2. [ ] Set up start command: `npm start`
3. [ ] Configure environment variables
4. [ ] Set Node.js version to 18 or higher
5. [ ] Deploy and verify

## Post-Deployment

### Verification
- [ ] Visit production URL and verify site loads
- [ ] Test all main features work
- [ ] Check admin panel access
- [ ] Verify WhatsApp links work
- [ ] Test product pages and navigation
- [ ] Check mobile responsiveness
- [ ] Verify PWA install prompt works
- [ ] Test error handling

### Monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Monitor site performance
- [ ] Check for broken links
- [ ] Monitor database connections
- [ ] Set up uptime monitoring

### SEO
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Verify structured data with Google Rich Results Test
- [ ] Check page speed with PageSpeed Insights
- [ ] Set up Google My Business listing

## Maintenance

### Regular Tasks
- [ ] Review and update products regularly
- [ ] Monitor site analytics
- [ ] Check for dependency updates
- [ ] Backup database regularly
- [ ] Review and respond to customer inquiries
- [ ] Update content as needed

### Security Updates
- [ ] Keep dependencies up to date: `npm audit`
- [ ] Monitor for security vulnerabilities
- [ ] Review access logs periodically
- [ ] Update admin passwords regularly

## Emergency Contacts

- **Hosting Support**: [Your hosting provider support]
- **Database Support**: [Neon support for database issues]
- **Developer Contact**: [Your contact information]

## Rollback Plan

In case of issues:
1. Revert to previous deployment in Vercel dashboard
2. Check error logs to identify issue
3. Fix issue in development
4. Re-deploy after testing

---

**Last Updated**: January 2026
**Version**: 1.0
