import { ImageResponse } from 'next/og';

export const alt = 'Pham Tran Quoc — Software Engineering Student';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          backgroundColor: '#0D1726',
          color: '#F3F6FC',
          fontFamily: 'Arial, sans-serif',
          border: '1px solid #32445D',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '30px', height: '4px', borderRadius: '2px', backgroundColor: '#78B2F5' }} />
          <span style={{ color: '#B0BDCE', fontSize: '20px' }}>Pham Tran Quoc</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '960px' }}>
          <span
            style={{
              color: '#78B2F5',
              fontSize: '20px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
          >
            Software Engineering Student
          </span>
          <span
            style={{
              marginTop: '22px',
              fontSize: '68px',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-3px',
            }}
          >
            Turning complex problems into practical software.
          </span>
          <span style={{ marginTop: '22px', color: '#B0BDCE', fontSize: '24px' }}>
            Full-stack development · Applied AI
          </span>
        </div>
        <div style={{ display: 'flex', borderTop: '1px solid #32445D', paddingTop: '20px', color: '#B0BDCE', fontSize: '18px' }}>
          Ho Chi Minh City, Vietnam
        </div>
      </div>
    ),
    size,
  );
}
