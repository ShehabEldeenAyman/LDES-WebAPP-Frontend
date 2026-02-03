import { color } from 'echarts';
import React, { useState } from 'react';
  // 2. Styles for the inner layout
  const innerStyles = {
    container: {
      height: '100%',
      //backgroundColor: '#1523e0',
      borderRadius: '1em',
      display: 'flex',
      flexDirection: 'column',
      color: 'white',
      padding: '1rem',
      boxSizing: 'border-box'
    },
    subNavbar: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '1rem',
      fontSize: '0.9rem'
    },
    divider: {
      width: '1px',
      height: '15px',
     // backgroundColor: 'rgba(255, 255, 255, 0.4)'
    },
    navItem: (isActive) => ({
      cursor: 'pointer',
      fontWeight: isActive ? 'bold' : 'normal',
      opacity: isActive ? 1 : 0.7,
      transition: 'opacity 0.2s',
      color: isActive ? '#000000' : '#000000',
    }),
    contentArea: {
      flexGrow: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '0.5em',
      padding: '1rem',
      color: 'black',
    }
  };


export const MapCardHead = () => {
  const headStyles = {
    title: {
      textAlign: 'center',        // Centers the H2
      fontSize: '1.4rem',         // Slightly larger for the header
      fontWeight: '700',
      marginBottom: '0',
      marginTop: '0',
    },
    description: {
      textAlign: 'justify',       // Justifies the body text
      fontSize: '0.85rem',        // Smaller text size as requested
      lineHeight: '1.5',          // Increases readability
      margin: '0',
      opacity: '0.95',            // Softens the white text slightly
    }
  };

  return (
    <div >
      <h2 style={headStyles.title}>
        Mol Sluis / Kl Dessel–Kwaadmechelen
      </h2>
      <p style={headStyles.description}>
        At the Mol Sluis station on the Dessel–Kwaadmechelen Canal, two key 
        hydrological parameters — river stage and river discharge 
        — are continuously monitored by the Flemish Hydrological 
        Information Centre. These two datasets describe complementary 
        aspects of the canal’s behavior: the water level (stage) in meters and the 
        flow rate (discharge) in cubic meters per second. Integrating these 
        parameters provides a richer, multidimensional view of the canal’s condition, 
        essential for both operational management and scientific analysis. Each 
        record contains timestamps in UTC, the measured value, station coordinates, 
        and metadata identifying the provider and measurement type. 
      </p>
    </div>
  );
};

export const MapCardBody = () => {
  // 1. Local state for the sub-menu
  const [activeSubTab, setActiveSubTab] = useState('Use Case');
  const menuItems = ['Usecase', 'Parameters', 'Attributes', 'Map'];
const renderSubContent = () => {
    switch (activeSubTab) {
      case 'Use Case':
        return <div><h3>Overview Content Placeholder</h3></div>;
      case 'Parameters':
        return <div><h3>Overview Content Placeholder</h3></div>;
      case 'Data Attributes':
        return <div><h3>Overview Content Placeholder</h3></div>;
      case 'Map':
        return <div><h3>Overview Content Placeholder</h3></div>;
      default:
        return <div><h3>Overview Content Placeholder</h3></div>;
    }
  };


  return (
    <div style={innerStyles.container}>
      {/* 3. Horizontal Sub-Navbar */}
      <div style={innerStyles.subNavbar}>
        {menuItems.map((item, index) => (
          <React.Fragment key={item}>
            <span 
              style={innerStyles.navItem(activeSubTab === item)}
              onClick={() => setActiveSubTab(item)}
            >
              {item}
            </span>
            {/* 4. Add vertical line between items, but not after the last one */}
            {index < menuItems.length - 1 && <div style={innerStyles.divider} />}
          </React.Fragment>
        ))}
      </div>

<div style={innerStyles.contentArea}>
        {renderSubContent()}
      </div>
    </div>
  );
};


