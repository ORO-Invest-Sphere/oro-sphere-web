const fs = require('fs');
const path = require('path');

const barangayDir = path.join(__dirname, 'geoph-master/geoph-master/geojson/barangay');
const outputFile = path.join(__dirname, 'src/data/cdo-barangays.json');

// Ensure output directory exists
const outputDir = path.dirname(outputFile);
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Find all CDO barangay files
const files = fs.readdirSync(barangayDir).filter(file => 
    file.includes('cagayan-de-oro-city') && file.endsWith('.json')
);

console.log(`Found ${files.length} barangay files for Cagayan de Oro.`);

const features = [];

files.forEach(file => {
    const content = fs.readFileSync(path.join(barangayDir, file), 'utf8');
    try {
        const json = JSON.parse(content);
        // The files seem to be individual GeoJSON objects (Feature or FeatureCollection)
        // If it's a FeatureCollection, extract features. If Feature, add it.
        if (json.type === 'FeatureCollection') {
            features.push(...json.features);
        } else if (json.type === 'Feature') {
            features.push(json);
        } else {
            // Sometimes it might be just geometry, wrap in Feature
            features.push({
                type: 'Feature',
                properties: { name: file }, // Add filename as property if none
                geometry: json
            });
        }
    } catch (err) {
        console.error(`Error parsing ${file}:`, err);
    }
});

const featureCollection = {
    type: 'FeatureCollection',
    features: features
};

fs.writeFileSync(outputFile, JSON.stringify(featureCollection));
console.log(`Successfully wrote merged GeoJSON to ${outputFile}`);
