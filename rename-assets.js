import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.join(__dirname, 'public');

try {
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    if (f.endsWith('.jpg') || f.endsWith('.png')) {
      // Ignorar a logo padrão e o background ja padronizados
      if (f === 'kraftwrklogo.png' || f === 'background.png') return;

      const target = f.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove acentos
        .replace(/\s+/g, '_'); // substitui espaços por _

      if (f !== target) {
        fs.renameSync(path.join(dir, f), path.join(dir, target));
        console.log(`Renomeado: "${f}" -> "${target}"`);
      }
    }
  });
  console.log('Renomeação concluída com sucesso!');
} catch (err) {
  console.error('Erro ao renomear arquivos:', err);
}
