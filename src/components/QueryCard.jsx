import React, { useState } from 'react';

const innerStyles = {
  container: {
    height: '100%',
    borderRadius: '1em',
    display: 'flex',
    flexDirection: 'column',
    color: '#333',
    padding: '1.5rem',
    boxSizing: 'border-box',
    backgroundColor: '#fff'
  },
  controls: {
    display: 'flex',
    gap: '10px',
    marginBottom: '1rem',
    alignItems: 'center'
  },
  select: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  executeBtn: {
    padding: '8px 20px',
    backgroundColor: '#002353',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  textarea: {
    width: '100%',
    height: '150px',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontFamily: 'monospace',
    marginBottom: '1rem',
    resize: 'vertical'
  },
  tableWrapper: {
    flexGrow: 1,
    overflowY: 'auto',
    border: '1px solid #eee',
    borderRadius: '8px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.9rem'
  },
  th: {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
    textTransform: 'capitalize' // Makes variable names look cleaner
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #eee',
    wordBreak: 'break-all'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginTop: '1rem'
  },
  pageBtn: {
    padding: '5px 15px',
    cursor: 'pointer'
  }
};

export const QueryCard = () => {
  const [dbType, setDbType] = useState('LDES'); 
  const [query, setQuery] = useState('SELECT * WHERE { ?s ?p ?o } LIMIT 100');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 100; 

  const handleExecute = async (targetPage = 1) => {
    setLoading(true);
    setPage(targetPage);
    
    let baseUrl = '';
    switch (dbType) {
      case 'LDES':
        baseUrl = 'http://localhost:3000/virtuoso/ldes';
        break;
      case 'LDESTSS':
        baseUrl = 'http://localhost:3000/virtuoso/ldestss';
        break;
      case 'TTL':
        baseUrl = 'http://localhost:3000/virtuoso/ttl';
        break;
      default:
        baseUrl = 'http://localhost:3000/virtuoso/ttl';
    }

    const encodedQuery = encodeURIComponent(query);
    const finalUrl = `${baseUrl}/query?query=${encodedQuery}&page=${targetPage}`;
    
    try {
      const response = await fetch(finalUrl);
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Query failed:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // HIGHLIGHTED CHANGE: Determine columns dynamically from the result keys
  const columns = results.length > 0 ? Object.keys(results[0]) : [];

  return (
    <div style={innerStyles.container}>
      <div style={innerStyles.controls}>
        <label><strong>Database Type: </strong></label>
        <select 
          style={innerStyles.select} 
          value={dbType} 
          onChange={(e) => setDbType(e.target.value)}
        >
          <option value="LDES">LDES</option>
          <option value="LDESTSS">LDESTSS</option>
          <option value="TTL">TTL</option>
        </select>
        
        <button 
          style={innerStyles.executeBtn} 
          onClick={() => handleExecute(1)} 
          disabled={loading}
        >
          {loading ? 'Running...' : 'EXECUTE'}
        </button>
      </div>

      <textarea 
        style={innerStyles.textarea}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your SPARQL query here..."
      />

      <div style={innerStyles.tableWrapper}>
        <table style={innerStyles.table}>
          <thead>
            <tr>
              {/* Generate headers dynamically */}
              {columns.map((col) => (
                <th key={col} style={innerStyles.th}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.length > 0 ? (
              results.map((row, index) => (
                <tr key={index}>
                  {/* Generate cells dynamically based on detected keys */}
                  {columns.map((col) => (
                    <td key={`${index}-${col}`} style={innerStyles.td}>
                      {typeof row[col] === 'object' && row[col] !== null 
                        ? JSON.stringify(row[col]) 
                        : (row[col]?.toString() || '-')}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length || 1} style={{ textAlign: 'center', padding: '20px' }}>
                  {loading ? 'Loading...' : 'No results found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={innerStyles.pagination}>
        <button 
          disabled={page <= 1 || loading} 
          onClick={() => handleExecute(page - 1)}
          style={{...innerStyles.pageBtn, opacity: (page <= 1 || loading) ? 0.5 : 1}}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button 
          disabled={results.length < limit || loading} 
          onClick={() => handleExecute(page + 1)}
          style={{...innerStyles.pageBtn, opacity: (results.length < limit || loading) ? 0.5 : 1}}
        >
          Next
        </button>
      </div>
    </div>
  );
};