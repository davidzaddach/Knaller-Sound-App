const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const metaTags = `
  <meta name="theme-color" content="#ff2d95" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="Knaller" />
  <link rel="apple-touch-icon" sizes="180x180" href="/icon-180.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
  <link rel="manifest" href="/manifest.json" />`;

html = html.replace('</head>', `${metaTags}\n</head>`);

html = html.replace('<html lang="en">', '<html lang="de">');

fs.writeFileSync(indexPath, html);
console.log('Injected PWA meta tags into dist/index.html');
