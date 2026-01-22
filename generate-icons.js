const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [192, 512];
const inputLogo = path.join(__dirname, 'public', 'logo.png');

async function generateIcons() {
  console.log('🎨 Generating PWA icons from logo...\n');

  for (const size of sizes) {
    const outputPath = path.join(__dirname, 'public', `icon-${size}.png`);
    
    try {
      await sharp(inputLogo)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✓ Generated ${size}x${size} icon: icon-${size}.png`);
    } catch (error) {
      console.error(`✗ Error generating ${size}x${size} icon:`, error.message);
    }
  }

  console.log('\n✨ PWA icons generation complete!');
}

generateIcons();
