/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Cineon — Movie Booking Web by Pham Tran Quoc';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const screenshot = await readFile(join(process.cwd(), 'public/cineon/screenshots/04-seat-selection.png'));
  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#0d1726', color: '#f3f6fc', padding: 48, alignItems: 'center', gap: 32, fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: 390 }}>
        <span style={{ fontSize: 18, color: '#78b2f5' }}>PHAM TRAN QUOC / CASE STUDY</span>
        <span style={{ fontSize: 76, marginTop: 24, fontWeight: 700 }}>Cineon</span>
        <span style={{ fontSize: 32, marginTop: 12 }}>Movie Booking Web</span>
        <span style={{ fontSize: 24, marginTop: 28, color: '#b0bdce', lineHeight: 1.5 }}>React · Laravel · MySQL</span>
        <span style={{ fontSize: 22, marginTop: 28, color: '#b0bdce' }}>From seat selection to an e-ticket.</span>
      </div>
      <img src={`data:image/png;base64,${screenshot.toString('base64')}`} alt="Cineon seat selection" width={650} height={420} style={{ objectFit: 'contain', borderRadius: 20, border: '1px solid #32445d' }} />
    </div>, size,
  );
}
