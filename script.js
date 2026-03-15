import fs from 'fs';

const events = [
  // Gaming
  { name: "BGMI Tournament", category: "gaming", badge: "GAMING", prize: "TBD", desc: "Squad up and battle for the chicken dinner in this epic tournament!", date: "TBD", fee: "TBD", venue: "TBD", image: "/events/BGMI INSTA.png" },
  { name: "Valorant", category: "gaming", badge: "GAMING", prize: "TBD", desc: "5v5 tactical shooter showdown \u2014 prove your aim and strategy!", date: "TBD", fee: "TBD", venue: "TBD", image: "/events/valo-insta.png" },
  { name: "FreeFire", category: "gaming", badge: "GAMING", prize: "TBD", desc: "Battle Royale survival series event.", date: "TBD", fee: "TBD", venue: "TBD", image: "/events/FREEFIRE INSTA.png" },
  { name: "e-Football", category: "gaming", badge: "GAMING", prize: "TBD", desc: "Virtual football battle \u2014 score goals, win glory!", date: "TBD", fee: "TBD", venue: "TBD", image: "/events/E Football insta.png" },
  { name: "King's Gambit (Chess)", category: "gaming", badge: "GAMING", prize: "₹1500/-", desc: "Strategic chess tournament hosted by FOSS.", date: "09:00 to 12:30", fee: "INT+ 50/-", venue: "Audi", image: "/events/CHESS INSTA.png" },
  { name: "Treasure Hunt", category: "gaming", badge: "GAMING", prize: "₹2000/-", desc: "Campus-wide treasure hunt by ISTE.", date: "16:00 to 18:00", fee: "TBD", venue: "EVERYWHERE" },

  // Cultural
  { name: "College Day", category: "cultural", badge: "CULTURAL", prize: "N/A", desc: "College Arts Day kick-off.", date: "09:00 to 15:00", fee: "FREE", venue: "Main Stage" },
  { name: "Bailamo (Group Dance)", category: "cultural", badge: "CULTURAL", prize: "₹45K", desc: "Group dance competition.", date: "TBD", fee: "₹150/head", venue: "TBD" },
  { name: "Beat The Spot (Spot Choreo)", category: "cultural", badge: "CULTURAL", prize: "₹5K", desc: "Spot choreography challenge.", date: "TBD", fee: "₹150", venue: "TBD" },
  { name: "Groove (Solo Dance)", category: "cultural", badge: "CULTURAL", prize: "₹5K", desc: "Solo dance showdown.", date: "TBD", fee: "₹100", venue: "TBD" },
  { name: "El Dueto (Duet)", category: "cultural", badge: "CULTURAL", prize: "₹7K", desc: "Duet dance battle.", date: "TBD", fee: "₹200", venue: "TBD" },
  { name: "La Couture (Fashion Show)", category: "cultural", badge: "CULTURAL", prize: "₹40K", desc: "Spectacular fashion extravaganza.", date: "TBD", fee: "₹150/head", venue: "TBD" },
  { name: "Persona", category: "cultural", badge: "CULTURAL", prize: "₹10K", desc: "The ultimate personality showdown (Finale at 16:30).", date: "16:30 to 18:00", fee: "₹150", venue: "Main Stage" },
  { name: "ProShow", category: "cultural", badge: "CULTURAL", prize: "N/A", desc: "The main stage pro show performances.", date: "18:00 ++", fee: "TBD", venue: "Main Stage" },

  // Workshops
  { name: "Hardware Using AI", category: "workshop", badge: "WORKSHOP", prize: "N/A", desc: "A hands-on TinkerHub workshop on hardware and AI.", date: "13:00 to 16:00", fee: "TBD", venue: "EC Lab in Main Building" },
  { name: "Robotics in Healthcare", category: "workshop", badge: "WORKSHOP", prize: "N/A", desc: "IEEE workshop on revolutionary medical robotics.", date: "13:00 to 16:00", fee: "TBD", venue: "LAB 1" },
  { name: "Cyber Security", category: "workshop", badge: "WORKSHOP", prize: "N/A", desc: "Deep dive into Cyber Security with IEEE.", date: "13:00 to 16:00", fee: "TBD", venue: "FOSS Lab" },
  { name: "Automate & Elevate with N8N", category: "workshop", badge: "WORKSHOP", prize: "N/A", desc: "IEEE workshop on powerful automation with N8N.", date: "09:00 to 12:00", fee: "TBD", venue: "EC Lab in Main Building" },
  { name: "AI Driven Signal Processing", category: "workshop", badge: "WORKSHOP", prize: "N/A", desc: "IEEE signal processing workshop.", date: "09:00 to 12:00", fee: "TBD", venue: "L3" },
  { name: "Blender 3D", category: "workshop", badge: "WORKSHOP", prize: "N/A", desc: "3D modeling and animation workshop by FOSS.", date: "13:00 to 16:00", fee: "TBD", venue: "L3" },
  { name: "Figma Workshop", category: "workshop", badge: "WORKSHOP", prize: "N/A", desc: "UI/UX design bootcamp by ISTE.", date: "09:00 to 12:00", fee: "₹100", venue: "LAB 1" },
  { name: "Myosa", category: "workshop", badge: "WORKSHOP", prize: "N/A", desc: "IEEE Myosa technical workshop.", date: "09:00 to 12:00", fee: "TBD", venue: "SDPK" },

  // Technical
  { name: "CTF", category: "technical", badge: "TECHNICAL", prize: "TBD", desc: "Capture The Flag cybersecurity competition by TinkerHub.", date: "10:00 to 12:00", fee: "TBD", venue: "FOSS Lab" },
  { name: "Typing Competition", category: "technical", badge: "TECHNICAL", prize: "TBD", desc: "Fastest fingers first! ISTE typing challenge.", date: "10:00 to 12:00", fee: "TBD", venue: "FOSS Lab" },
  { name: "Coding Competition", category: "technical", badge: "TECHNICAL", prize: "TBD", desc: "FOSS algorithmic programming challenge.", date: "10:00 to 12:00", fee: "TBD", venue: "FOSS Lab" },
  { name: "MD Session / Ice Breaking", category: "technical", badge: "TECHNICAL", prize: "N/A", desc: "IEEE IRIS networking and ice breaking.", date: "13:00 to 18:00", fee: "FREE", venue: "Audi" },
  { name: "Impressario", category: "technical", badge: "TECHNICAL", prize: "TBD", desc: "IEDC entrepreneurship and pitching competition.", date: "13:00 to 16:00", fee: "TBD", venue: "SDPK" },
  { name: "IRIS inauguration", category: "technical", badge: "TECHNICAL", prize: "N/A", desc: "The grand official inauguration of IRIS by IEEE.", date: "15:00 to 15:45", fee: "FREE", venue: "Main Stage" },
];

let html = "";
events.forEach(e => {
  let prizeClass = (e.prize === "N/A" || e.prize === "FREE") ? "ep-prize free" : "ep-prize";
  let displayPrize = e.prize === "N/A" ? "FREE" : e.prize;
  
  // if image exists, place it at the top of the card
  let mediaHtml = '';
  if (e.image) {
    mediaHtml = `\n            <div class="ep-poster-wrapper">
              <img src="${e.image}" alt="${e.name}" class="ep-poster" />
            </div>`;
  }

  html += `
          <!-- ${e.name} -->
          <div class="ep-card" data-category="${e.category}">${mediaHtml}
            <div class="ep-card-head">
              <span class="ep-badge ${e.category}">${e.badge}</span>
              <span class="${prizeClass}">${displayPrize}</span>
            </div>
            <h3>${e.name}</h3>
            <p class="desc">${e.desc}</p>
            <div class="details">
              <span>⏰ ${e.date}</span>
              <span>💰 Reg: ${e.fee}</span>
              <span>📍 ${e.venue}</span>
            </div>
            <a href="#" class="card-btn">PRESS START →</a>
          </div>`;
});

fs.writeFileSync('C:/Users/abhin/Documents/Programs/WEB/DY26/temp_events.html', html);
console.log("Written successfully");
