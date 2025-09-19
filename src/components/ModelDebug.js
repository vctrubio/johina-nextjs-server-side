export default function ModelDebug({ floatersData, bannerData }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderContentTypeSection = (data, title, contentTypeId, imageFieldName) => {
    if (!data) return null;

    const totalImages = data.success ? 
      data.entries.reduce((total, entry) => {
        const imageCount = entry.fields[imageFieldName] ? entry.fields[imageFieldName].length : 0;
        return total + imageCount;
      }, 0) : 0;

    return (
      <div style={{ marginBottom: '3rem' }}>
        <h3>{title}</h3>
        {data.success ? (
          <>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem', 
              marginBottom: '2rem' 
            }}>
              <div style={{ 
                padding: '1rem', 
                backgroundColor: 'var(--primary)', 
                color: 'white', 
                borderRadius: '8px', 
                textAlign: 'center' 
              }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'white' }}>Entries</h4>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{data.count}</div>
              </div>
              
              <div style={{ 
                padding: '1rem', 
                backgroundColor: 'var(--secondary)', 
                color: 'white', 
                borderRadius: '8px', 
                textAlign: 'center' 
              }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'white' }}>Total Images</h4>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{totalImages}</div>
              </div>
              
              <div style={{ 
                padding: '1rem', 
                backgroundColor: 'var(--fourth)', 
                color: 'white', 
                borderRadius: '8px', 
                textAlign: 'center' 
              }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'white' }}>Last Updated</h4>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                  {formatDate(data.latestUpdatedAt)}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4>Content Type: {contentTypeId}</h4>
              <div style={{ 
                backgroundColor: 'rgba(255,255,255,0.8)', 
                padding: '1rem', 
                borderRadius: '8px',
                border: '1px solid var(--fifth)'
              }}>
                <h5>Schema Fields:</h5>
                {contentTypeId === 'backgroundFloaters' && (
                  <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                    <li><strong>image</strong> (Array of Assets) - Required</li>
                    <li><strong>nameForReference</strong> (Symbol) - Required, Unique</li>
                  </ul>
                )}
                {contentTypeId === 'homeBanners' && (
                  <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                    <li><strong>images</strong> (Array of Assets) - Required (min: 3)</li>
                    <li><strong>titleForReference</strong> (Symbol) - Required</li>
                  </ul>
                )}
              </div>
            </div>
          </>
        ) : (
          <div style={{ 
            padding: '2rem', 
            textAlign: 'center', 
            backgroundColor: 'rgba(107, 104, 173, 0.1)', 
            borderRadius: '8px',
            border: '2px dashed var(--error-color)'
          }}>
            <h4 style={{ color: 'var(--error-color)' }}>Error Loading Data</h4>
            <p style={{ color: 'var(--error-color)' }}>{data.error}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="content-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
      <h2>Contentful Model Debug</h2>
      
      {renderContentTypeSection(floatersData, 'Background Floaters', 'backgroundFloaters', 'image')}
      {renderContentTypeSection(bannerData, 'Home Banners', 'homeBanners', 'images')}
    </div>
  );
}