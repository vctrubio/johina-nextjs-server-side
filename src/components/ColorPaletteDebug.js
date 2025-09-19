export default function ColorPaletteDebug() {
  const colors = [
    { name: 'Primary', var: '--primary', hex: '#8CB150', description: 'Fresh green for main elements' },
    { name: 'Secondary', var: '--secondary', hex: '#5E488D', description: 'Purple for headers and accents' },
    { name: 'Tertiary', var: '--tertiary', hex: '#FDBE9A', description: 'Warm peach for backgrounds' },
    { name: 'Fourth', var: '--fourth', hex: '#6B68AD', description: 'Muted purple for subheadings' },
    { name: 'Fifth', var: '--fifth', hex: '#97AAD3', description: 'Light blue for borders and details' },
  ];

  return (
    <div className="content-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
      <h2>Color Palette Debug</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
        {colors.map((color, index) => (
          <div key={index} style={{ 
            border: '1px solid var(--fifth)', 
            borderRadius: '8px', 
            overflow: 'hidden',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            {/* Color swatch */}
            <div style={{ 
              backgroundColor: `var(${color.var})`, 
              height: '80px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}>
              {color.name}
            </div>
            
            {/* Color info */}
            <div style={{ padding: '1rem', backgroundColor: 'white' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: `var(${color.var})` }}>{color.name}</h4>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                <strong>CSS Variable:</strong> {color.var}
              </p>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                <strong>Hex:</strong> {color.hex}
              </p>
              <p style={{ margin: '0', fontSize: '0.85rem', color: 'var(--fourth)' }}>
                {color.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Typography examples */}
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '8px' }}>
        <h3>Typography Examples</h3>
        <h1 style={{ margin: '0.5rem 0' }}>H1 Heading (Secondary Color)</h1>
        <h2 style={{ margin: '0.5rem 0' }}>H2 Heading (Secondary Color)</h2>
        <h3 style={{ margin: '0.5rem 0' }}>H3 Heading (Fourth Color)</h3>
        <h4 style={{ margin: '0.5rem 0' }}>H4 Heading (Fifth Color)</h4>
        <p style={{ margin: '0.5rem 0' }}>Body text (Primary Color)</p>
        <p style={{ color: 'var(--error-color)', margin: '0.5rem 0' }}>Error text (Fourth Color)</p>
      </div>
    </div>
  );
}