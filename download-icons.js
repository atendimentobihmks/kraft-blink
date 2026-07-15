import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const destDir = path.join(__dirname, 'public');

const icons = {
  'whatsapp.svg': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/whatsapp.svg',
  'instagram.svg': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg',
  'facebook.svg': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg',
  'pinterest.svg': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/pinterest.svg'
};

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Falha na requisição. Status: ${res.statusCode}`));
        return;
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

async function run() {
  for (const [name, url] of Object.entries(icons)) {
    try {
      await download(url, path.join(destDir, name));
      console.log(`Ícone oficial baixado: ${name}`);
    } catch (err) {
      console.error(`Erro ao baixar ${name}:`, err.message);
    }
  }
}

run();
