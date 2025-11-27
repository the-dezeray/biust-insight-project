import fs from 'fs';
import path from 'path';
import { parseCourseData } from '../lib/parsers/courseParser.js';

// Read the raw data
const dataPath = path.join(process.cwd(), 'app', 'browse', 'data.txt');
const rawData = fs.readFileSync(dataPath, 'utf-8');

// Parse the data
const subjectGroups = parseCourseData(rawData);

// Create the data directory if it doesn't exist
const outputDir = path.join(process.cwd(), 'app', 'data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write the organized data
const outputPath = path.join(outputDir, 'organized-courses.json');
fs.writeFileSync(outputPath, JSON.stringify(subjectGroups, null, 2));

console.log(`Processed ${subjectGroups.length} subject groups:`);
subjectGroups.forEach(group => {
  console.log(`- ${group.name}: ${group.courses.length} courses, ${group.totalEntries} total entries`);
});

console.log(`\nData written to: ${outputPath}`);