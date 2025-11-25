import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { 
  Layers, ChevronRight, ChevronDown, 
  Landmark, Church, Flame, Fuel, Stethoscope, Bed, Hospital, 
  ShoppingBag, Shield, GraduationCap, ShoppingCart, Camera,
  AlertTriangle, Waves, Map as MapIcon, TrendingUp
} from 'lucide-react';
import 'leaflet.heat';
import mapData from '../../data/mapData.json';
import barangayData from '../../data/cdo-barangays.json';
import './MapComponent.css';

// Point in Polygon Algorithm
const isPointInPolygon = (point, vs) => {
  // point = [lng, lat], vs = [[lng, lat], ...]
  let x = point[0], y = point[1];
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    let xi = vs[i][0], yi = vs[i][1];
    let xj = vs[j][0], yj = vs[j][1];
    let intersect = ((yi > y) !== (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
};

// Fix for default marker icon in React Leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Icon Mapping
const iconMap = {
  'Banks': Landmark,
  'Churches': Church,
  'Fire Stations': Flame,
  'Gasoline Stations': Fuel,
  'Health Centers': Stethoscope,
  'Hotels': Bed,
  'Hospitals': Hospital,
  'Malls': ShoppingBag,
  'Police Stations': Shield,
  'Schools': GraduationCap,
  'Super Markets': ShoppingCart,
  'Tourist Spots': Camera
};

const categoryColors = {
  'Banks': '#16a34a',
  'Churches': '#8b5cf6',
  'Fire Stations': '#ef4444',
  'Gasoline Stations': '#f97316',
  'Health Centers': '#06b6d4',
  'Hotels': '#3b82f6',
  'Hospitals': '#ef4444',
  'Malls': '#ec4899',
  'Police Stations': '#1e40af',
  'Schools': '#eab308',
  'Super Markets': '#10b981',
  'Tourist Spots': '#8b5cf6',
  'Barangay Boundary': '#ffffff', // White for better contrast in satellite
  'Flood Hazard': '#3b82f6',
  'Landslide Hazard': '#854d0e',
  'Zoning': '#a855f7',
  'Investment Hotspots': '#ef4444' // Base color for heatmap
};

// Mock Hazard Data
const floodRiskData = {
  'Carmen': 'High',
  'Macasandig': 'High',
  'Balulang': 'High',
  'Consolacion': 'High',
  'Puntod': 'Medium',
  'Kauswagan': 'Medium',
  'Bonbon': 'High',
  'Iponan': 'Medium',
  'Lapasan': 'Medium',
  'Barangay 10': 'High',
  'Barangay 13': 'High',
  'Barangay 15': 'High'
};

const landslideRiskData = {
  'Indahag': 'High',
  'Cugman': 'Medium',
  'Tablon': 'High',
  'Balubal': 'High',
  'Agusan': 'Medium',
  'Puerto': 'Low',
  'Gusa': 'Medium'
};

const getCleanBarangayName = (feature) => {
  let name = feature.properties.name;
  if (name && name.includes('cagayan-de-oro-city')) {
    const parts = name.split('.');
    const cityIndex = parts.indexOf('cagayan-de-oro-city');
    if (cityIndex !== -1 && parts[cityIndex + 1]) {
      name = parts[cityIndex + 1].replace(/-/g, ' ').replace('geo', '').replace('json', '');
      name = name.replace(/\b\w/g, l => l.toUpperCase());
    }
  }
  return name || 'Unknown';
};

// Custom Icons using Lucide
const createCustomIcon = (category) => {
  const IconComponent = iconMap[category] || MapIcon;
  const color = categoryColors[category] || '#333';
  
  const iconHtml = renderToStaticMarkup(
    <div style={{
      backgroundColor: color,
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid white',
      boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
    }}>
      <IconComponent size={18} color="white" strokeWidth={2.5} />
    </div>
  );

  return L.divIcon({
    className: 'custom-marker-icon',
    html: iconHtml,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

// Heatmap Layer Component
const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!points || points.length === 0) return;

    // Convert mapData points to [lat, lng, intensity]
    // We can give higher intensity to certain categories if needed, but for now uniform.
    const heatPoints = points.map(p => [p.lat, p.lng, 0.8]);

    const heat = L.heatLayer(heatPoints, {
      radius: 35,
      blur: 20,
      maxZoom: 15,
      minOpacity: 0.4,
      gradient: {
        0.2: '#3b82f6', // Blue (Low)
        0.4: '#10b981', // Green
        0.6: '#eab308', // Yellow
        0.8: '#f97316', // Orange
        1.0: '#ef4444'  // Red (High)
      }
    }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null;
};

const MapComponent = () => {
  const cdoPosition = [8.4542, 124.6319]; // Cagayan de Oro Coordinates
  
  const [baseMap, setBaseMap] = useState('standard');
  const [activeOverlays, setActiveOverlays] = useState({
    'Banks': false,
    'Churches': false,
    'Fire Stations': false,
    'Gasoline Stations': false,
    'Health Centers': false,
    'Hotels': false,
    'Hospitals': false,
    'Malls': false,
    'Police Stations': false,
    'Schools': false,
    'Super Markets': false,
    'Tourist Spots': false,
    'Barangay Boundary': true,
    'Flood Hazard': false,
    'Landslide Hazard': false,
    'Zoning': false,
    'Investment Hotspots': false
  });
  
  const [isOverlayPanelOpen, setIsOverlayPanelOpen] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [barangayStats, setBarangayStats] = useState({});

  // Calculate Investment Stats (Density of POIs per Barangay)
  useEffect(() => {
    const stats = {};
    
    barangayData.features.forEach(feature => {
      const barangayName = getCleanBarangayName(feature);
      let count = 0;
      
      // Geometry can be Polygon or MultiPolygon
      const geometry = feature.geometry;
      const coords = geometry.coordinates;
      const type = geometry.type;

      mapData.forEach(point => {
        const pt = [point.lng, point.lat];
        let isInside = false;

        if (type === 'Polygon') {
          // GeoJSON Polygon: [ [outer], [hole], ... ] - usually we just check outer ring [0]
          isInside = isPointInPolygon(pt, coords[0]);
        } else if (type === 'MultiPolygon') {
          // GeoJSON MultiPolygon: [ [[outer], [hole]], ... ]
          // We iterate through each polygon in the multipolygon
          for (let i = 0; i < coords.length; i++) {
            if (isPointInPolygon(pt, coords[i][0])) {
              isInside = true;
              break;
            }
          }
        }

        if (isInside) count++;
      });

      stats[barangayName] = count;
    });

    setBarangayStats(stats);
  }, []);

  useEffect(() => {
    // Filter data based on enabled overlays
    const filteredMarkers = mapData.filter(item => activeOverlays[item.category]);
    setMarkers(filteredMarkers);
  }, [activeOverlays]);

  const toggleOverlay = (category) => {
    setActiveOverlays(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const getBarangayStyle = (feature) => {
    const name = getCleanBarangayName(feature);
    
    // Flood Hazard
    if (activeOverlays['Flood Hazard']) {
      const risk = floodRiskData[name];
      if (risk) {
        const color = risk === 'High' ? '#1e3a8a' : (risk === 'Medium' ? '#3b82f6' : '#93c5fd');
        return {
          color: '#1e3a8a',
          weight: 1,
          fillColor: color,
          fillOpacity: 0.6
        };
      }
      return { opacity: 0, fillOpacity: 0 }; 
    }

    // Landslide Hazard
    if (activeOverlays['Landslide Hazard']) {
       const risk = landslideRiskData[name];
       if (risk) {
         const color = risk === 'High' ? '#451a03' : (risk === 'Medium' ? '#92400e' : '#d97706');
         return {
           color: '#451a03',
           weight: 1,
           fillColor: color,
           fillOpacity: 0.6
         };
       }
       return { opacity: 0, fillOpacity: 0 };
    }

    // Standard Boundary Style
    if (activeOverlays['Barangay Boundary']) {
      const isSatellite = baseMap === 'satellite';
      return {
        color: isSatellite ? '#38bdf8' : '#374151', // Cyan for satellite, Dark Gray for standard
        weight: isSatellite ? 2 : 2,
        fillColor: 'transparent',
        fillOpacity: 0,
        dashArray: '5, 5' // Dashed line for better visibility
      };
    }

    return { opacity: 0, fillOpacity: 0 }; // Hidden
  };

  const onEachBarangay = (feature, layer) => {
    const name = getCleanBarangayName(feature);
    const count = barangayStats[name] || 0;
    
    let hazardInfo = '';
    if (activeOverlays['Flood Hazard'] && floodRiskData[name]) {
      hazardInfo += `<div class="mt-2 p-2 bg-blue-100 rounded text-blue-800 text-sm font-semibold">🌊 Flood Risk: ${floodRiskData[name]}</div>`;
    }
    if (activeOverlays['Landslide Hazard'] && landslideRiskData[name]) {
      hazardInfo += `<div class="mt-2 p-2 bg-amber-100 rounded text-amber-800 text-sm font-semibold">⛰️ Landslide Risk: ${landslideRiskData[name]}</div>`;
    }

    layer.bindPopup(`
      <div class="p-2">
        <h3 class="font-bold text-lg">Barangay ${name}</h3>
        ${hazardInfo}
        <p class="text-sm text-gray-600 mt-1">Investment Potential Score</p>
        <div class="flex items-center gap-2">
          <span class="text-2xl font-bold ${count > 10 ? 'text-green-600' : 'text-blue-600'}">${count}</span>
          <span class="text-xs text-gray-500">Points of Interest</span>
        </div>
      </div>
    `);
  };

  return (
    <div className="map-wrapper">
      <div className="map-header">
        <h3>GIS Investment Map</h3>
        <p>Explore available zones and economic hubs.</p>
      </div>
      
      <div className="map-container-relative">
        <MapContainer center={cdoPosition} zoom={13} scrollWheelZoom={true} className="leaflet-container">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={baseMap === 'standard' 
              ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
              : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"}
          />
          
          {activeOverlays['Investment Hotspots'] && (
            <HeatmapLayer points={mapData} />
          )}

          {(activeOverlays['Barangay Boundary'] || activeOverlays['Flood Hazard'] || activeOverlays['Landslide Hazard']) && (
            <GeoJSON 
              key={`geo-json-${baseMap}-${activeOverlays['Investment Hotspots']}-${activeOverlays['Flood Hazard']}-${activeOverlays['Landslide Hazard']}`}
              data={barangayData} 
              style={getBarangayStyle}
              onEachFeature={onEachBarangay}
            />
          )}

          {markers.map(marker => (
            <Marker 
              key={marker.id} 
              position={[marker.lat, marker.lng]}
              icon={createCustomIcon(marker.category)}
            >
              <Popup>
                <strong>{marker.name}</strong><br />
                Type: {marker.category}
              </Popup>
            </Marker>
          ))}
        </MapContainer>


        {/* Custom Overlay Control Panel */}
        <div className={`overlay-panel ${isOverlayPanelOpen ? 'open' : 'closed'}`}>
          <div className="overlay-header" onClick={() => setIsOverlayPanelOpen(!isOverlayPanelOpen)}>
            <Layers size={16} />
            <span>Map Layers</span>
            {isOverlayPanelOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          
          {isOverlayPanelOpen && (
            <div className="overlay-content">
              <div className="overlay-section">
                <h4>Base Maps</h4>
                <div className="radio-group">
                  <label>
                    <input 
                      type="radio" 
                      name="basemap" 
                      checked={baseMap === 'standard'} 
                      onChange={() => setBaseMap('standard')} 
                    /> Standard
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="basemap" 
                      checked={baseMap === 'satellite'} 
                      onChange={() => setBaseMap('satellite')} 
                    /> Satellite
                  </label>
                </div>
              </div>

              <div className="overlay-section">
                <h4>Analysis Tools</h4>
                <label className="checkbox-item highlight-item">
                  <input 
                    type="checkbox" 
                    checked={activeOverlays['Investment Hotspots']} 
                    onChange={() => toggleOverlay('Investment Hotspots')} 
                  />
                  <TrendingUp size={16} className="mr-2 text-red-600" />
                  Investment Hotspots
                </label>
              </div>

              <div className="overlay-section">
                <h4>Boundaries & Hazards</h4>
                <div className="checkbox-list">
                  {['Barangay Boundary', 'Flood Hazard', 'Landslide Hazard', 'Zoning'].map(category => (
                    <label key={category} className="checkbox-item">
                      <input 
                        type="checkbox" 
                        checked={activeOverlays[category]} 
                        onChange={() => toggleOverlay(category)} 
                      />
                      <span className="color-indicator" style={{
                        backgroundColor: categoryColors[category],
                        border: category === 'Barangay Boundary' ? '1px solid #333' : 'none'
                      }}></span>
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              <div className="overlay-section">
                <h4>Points of Interest</h4>
                <div className="checkbox-list">
                  {Object.keys(activeOverlays)
                    .filter(k => !['Barangay Boundary', 'Flood Hazard', 'Landslide Hazard', 'Zoning', 'Investment Hotspots'].includes(k))
                    .map(category => (
                    <label key={category} className="checkbox-item">
                      <input 
                        type="checkbox" 
                        checked={activeOverlays[category]} 
                        onChange={() => toggleOverlay(category)} 
                      />
                      <span className="color-indicator" style={{backgroundColor: categoryColors[category]}}></span>
                      {category}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
