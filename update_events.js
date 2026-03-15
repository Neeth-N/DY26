import fs from 'fs';

let content = fs.readFileSync('C:/Users/abhin/Documents/Programs/WEB/DY26/events.html', 'utf8').replace(/\r\n/g, '\n');
let newEvents = fs.readFileSync('C:/Users/abhin/Documents/Programs/WEB/DY26/temp_events.html', 'utf8');

const gridStartStr = '<div class="ep-grid" id="epGrid">';
const gridStartIdx = content.indexOf(gridStartStr);
const gridEndStr = '        </div>\n      </div>\n    </section>';
const gridEndIdx = content.indexOf(gridEndStr, gridStartIdx);

let success = true;

if (gridStartIdx !== -1 && gridEndIdx !== -1) {
  content = content.substring(0, gridStartIdx + gridStartStr.length) + '\n' + newEvents + '\n' + content.substring(gridEndIdx);
} else {
  console.log("Could not find grid bounds");
  success = false;
}

const cssTarget = `      .events-page-body {
        padding: 60px 0 100px;
        min-height: 60vh;
      }

      /* Filters on events page */`;

const cssReplacement = `      .events-page-body {
        padding: 60px 0 100px;
        min-height: 60vh;
      }

      .ep-poster-wrapper {
        width: 100%;
        aspect-ratio: 1;
        overflow: hidden;
        border-radius: 6px;
        margin-bottom: 16px;
        border: 1px solid var(--arcade-border);
      }

      .ep-poster {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
      }

      .ep-card:hover .ep-poster {
        transform: scale(1.05);
      }

      /* Filters on events page */`;

if (content.includes(cssTarget)) {
  content = content.replace(cssTarget, cssReplacement);
} else {
  console.log("Could not find CSS target. Might be already replaced?");
}

if (success) {
  fs.writeFileSync('C:/Users/abhin/Documents/Programs/WEB/DY26/events.html', content);
  console.log("Updated events.html");
}
