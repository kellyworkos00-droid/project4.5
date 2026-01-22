const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
const splashSizes = [
  { width: 640, height: 1136, name: 'iphone5' },
  { width: 750, height: 1334, name: 'iphone6' },
  { width: 1242, height: 2208, name: 'iphoneplus' },
  { width: 1125, height: 2436, name: 'iphonex' },
  { width: 1242, height: 2688, name: 'iphonexsmax' },
  { width: 828, height: 1792, name: 'iphonexr' },
  { width: 1536, height: 2048, name: 'ipad' },
  { width: 2048, height: 2732, name: 'ipadpro' }
];
const inputLogo = path.join(__dirname, 'public', 'logo.png');

async function generateIcons() {
  console.log('🎨 Generating PWA icons and splash screens...\n');

  // Generate icons with proper padding and background
  for (const size of iconSizes) {
    const outputPath = path.join(__dirname, 'public', `icon-${size}.png`);
    const padding = Math.floor(size * 0.15); // 15% padding for safe zone
    const logoSize = size - (padding * 2);
    
    try {
      // Create icon with blue gradient background
      await sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: { r: 37, g: 99, b: 235, alpha: 1 } // Blue gradient base
        }
      })
      .composite([
        {
          input: await sharp(inputLogo)
            .resize(logoSize, logoSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .toBuffer(),
          gravity: 'center'
        }
      ])
      .png()
      .toFile(outputPath);
      
      console.log(`✓ Generated ${size}x${size} icon: icon-${size}.png`);
    } catch (error) {
      console.error(`✗ Error generating ${size}x${size} icon:`, error.message);
    }
  }

  // Generate maskable icons with extra padding
  for (const size of [192, 512]) {
    const outputPath = path.join(__dirname, 'public', `icon-${size}-maskable.png`);
    const padding = Math.floor(size * 0.25); // 25% padding for maskable icons
    const logoSize = size - (padding * 2);
    
    try {
      await sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: { r: 37, g: 99, b: 235, alpha: 1 }
        }
      })
      .composite([
        {
          input: await sharp(inputLogo)
            .resize(logoSize, logoSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
            .toBuffer(),
          gravity: 'center'
        }
      ])
      .png()
      .toFile(outputPath);
      
      console.log(`✓ Generated ${size}x${size} maskable icon: icon-${size}-maskable.png`);
    } catch (error) {
      console.error(`✗ Error generating ${size}x${size} maskable icon:`, error.message);
    }
  }

  // Generate splash screens
  console.log('\n🌊 Generating splash screens...');
  for (const splash of splashSizes) {
    const outputPath = path.join(__dirname, 'public', `splash-${splash.name}.png`);
    const logoWidth = Math.floor(splash.width * 0.4); // Logo takes 40% of screen width
    const logoHeight = Math.floor(logoWidth * 0.8); // Maintain aspect ratio
    
    try {
      // Create gradient background
      const gradientSvg = `
        <svg width="${splash.width}" height="${splash.height}">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#1e3a8a;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#2563eb;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="${splash.width}" height="${splash.height}" fill="url(#grad)"/>
        </svg>
      `;
      
      await sharp(Buffer.from(gradientSvg))
        .composite([
          {
            input: await sharp(inputLogo)
              .resize(logoWidth, logoHeight, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
              .toBuffer(),
            gravity: 'center'
          }
        ])
        .png()
        .toFile(outputPath);
      
      console.log(`✓ Generated ${splash.width}x${splash.height} splash: splash-${splash.name}.png`);
    } catch (error) {
      console.error(`✗ Error generating splash for ${splash.name}:`, error.message);
    }
  }

  console.log('\n✨ All assets generated successfully!');
}

generateIcons();
