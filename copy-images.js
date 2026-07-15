import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = 'C:/Users/bmkld/.gemini/antigravity-ide/brain/cd8a4624-5c03-4cac-b7c1-f04d5ebaef3b';
const destDir = path.join(__dirname, 'public');

const files = {
  'kraft_bg_1784132955535.png': 'background.png',
  'kraft_port1_1784132965387.png': 'portfolio1.png',
  'kraft_port2_1784132973627.png': 'portfolio2.png',
  'kraft_port3_1784132982517.png': 'portfolio3.png'
};

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log('Pasta public/ criada com sucesso!');
  }

  for (const [srcName, destName] of Object.entries(files)) {
    const srcPath = path.join(srcDir, srcName);
    const destPath = path.join(destDir, destName);
    
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copiado: ${destName}`);
    } else {
      console.warn(`Aviso: Arquivo de origem não encontrado: ${srcName}`);
    }
  }
  
  console.log('Todas as imagens foram copiadas para a pasta public!');
} catch (err) {
  console.error('Erro ao copiar arquivos:', err);
}
