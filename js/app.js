// app.js - main UI logic

// Basic helpers
const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));

// Google Fonts list cache
let googleFontsList = null;

// Fetch popular Google Fonts list
async function fetchGoogleFonts() {
  if (googleFontsList) return googleFontsList;
  
  // Popular Google Fonts - comprehensive list
  googleFontsList = [
    "ABeeZee", "Abel", "Abhaya Libre", "Abril Fatface", "Aclonica", "Acme", "Actor", "Adamina", "Advent Pro",
    "Aguafina Script", "Akronim", "Aladin", "Aldrich", "Alef", "Alegreya", "Alegreya Sans", "Alegreya SC",
    "Alex Brush", "Alfa Slab One", "Alice", "Alike", "Alike Angular", "Allan", "Allerta", "Allerta Stencil",
    "Allura", "Almarai", "Almendra", "Almendra Display", "Almendra SC", "Amarante", "Amaranth", "Amatic SC",
    "Amethysta", "Amiko", "Amiri", "Amita", "Anaheim", "Andada", "Andika", "Angkor", "Annie Use Your Telescope",
    "Anonymous Pro", "Antic", "Antic Didone", "Antic Slab", "Anton", "Arapey", "Arbutus", "Arbutus Slab",
    "Architects Daughter", "Archivo", "Archivo Black", "Archivo Narrow", "Aref Ruqaa", "Arima Madurai", "Arimo",
    "Arizonia", "Armata", "Arsenal", "Artifika", "Arvo", "Arya", "Asap", "Asap Condensed", "Asar", "Asset",
    "Assistant", "Astloch", "Asul", "Athiti", "Atma", "Atomic Age", "Aubrey", "Audiowide", "Autour One",
    "Average", "Average Sans", "Averia Gruesa Libre", "Averia Libre", "Averia Sans Libre", "Averia Serif Libre",
    "B612", "B612 Mono", "Bad Script", "Bahiana", "Bahianita", "Bai Jamjuree", "Baloo 2", "Baloo Bhai 2",
    "Baloo Bhaina 2", "Baloo Chettan 2", "Baloo Da 2", "Baloo Paaji 2", "Baloo Tamma 2", "Baloo Tammudu 2",
    "Baloo Thambi 2", "Balsamiq Sans", "Balthazar", "Bangers", "Barlow", "Barlow Condensed", "Barlow Semi Condensed",
    "Barriecito", "Barrio", "Basic", "Baskervville", "Battambang", "Baumans", "Bayon", "Be Vietnam Pro",
    "Bebas Neue", "Belgrano", "Bellefair", "Belleza", "Bellota", "Bellota Text", "BenchNine", "Bentham",
    "Berkshire Swash", "Besley", "Beth Ellen", "Bevan", "Big Shoulders Display", "Big Shoulders Inline Display",
    "Big Shoulders Inline Text", "Big Shoulders Stencil Display", "Big Shoulders Stencil Text", "Big Shoulders Text",
    "Bigelow Rules", "Bigshot One", "Bilbo", "Bilbo Swash Caps", "BioRhyme", "BioRhyme Expanded", "Birch Standard",
    "Bitter", "Black And White Picture", "Black Han Sans", "Black Ops One", "Blinker", "Bodoni Moda", "Bokor",
    "Bonbon", "Boogaloo", "Bowlby One", "Bowlby One SC", "Brawler", "Bree Serif", "Brygada 1918", "Bubblegum Sans",
    "Bubbler One", "Buda", "Buenard", "Bungee", "Bungee Hairline", "Bungee Inline", "Bungee Outline", "Bungee Shade",
    "Butcherman", "Butterfly Kids", "Cabin", "Cabin Condensed", "Cabin Sketch", "Caesar Dressing", "Cagliostro",
    "Cairo", "Caladea", "Calistoga", "Calligraffitti", "Cambay", "Cambo", "Candal", "Cantarell", "Cantata One",
    "Cantora One", "Capriola", "Cardo", "Carme", "Carrois Gothic", "Carrois Gothic SC", "Carter One", "Castoro",
    "Catamaran", "Caudex", "Caveat", "Caveat Brush", "Cedarville Cursive", "Ceviche One", "Chakra Petch",
    "Changa", "Changa One", "Chango", "Charm", "Charmonman", "Chathura", "Chau Philomene One", "Chela One",
    "Chelsea Market", "Chenla", "Cherry Cream Soda", "Cherry Swash", "Chewy", "Chicle", "Chilanka", "Chivo",
    "Chonburi", "Cinzel", "Cinzel Decorative", "Clicker Script", "Coda", "Coda Caption", "Codystar", "Coiny",
    "Combo", "Comfortaa", "Comic Neue", "Coming Soon", "Commissioner", "Concert One", "Condiment", "Content",
    "Contrail One", "Convergence", "Cookie", "Copse", "Corben", "Cormorant", "Cormorant Garamond", "Cormorant Infant",
    "Cormorant SC", "Cormorant Unicase", "Cormorant Upright", "Courgette", "Courier Prime", "Cousine", "Coustard",
    "Covered By Your Grace", "Crafty Girls", "Creepster", "Crete Round", "Crimson Pro", "Crimson Text", "Croissant One",
    "Crushed", "Cuprum", "Cute Font", "Cutive", "Cutive Mono", "DM Mono", "DM Sans", "DM Serif Display",
    "DM Serif Text", "Damion", "Dancing Script", "Dangrek", "Darker Grotesque", "David Libre", "Dawning of a New Day",
    "Days One", "Dekko", "Delius", "Delius Swash Caps", "Delius Unicase", "Della Respira", "Denk One", "Devonshire",
    "Dhurjati", "Didact Gothic", "Diplomata", "Diplomata SC", "Do Hyeon", "Dokdo", "Domine", "Donegal One",
    "Doppio One", "Dorsa", "Dosis", "Dr Sugiyama", "Duru Sans", "Dynalight", "EB Garamond", "Eagle Lake",
    "East Sea Dokdo", "Eater", "Economica", "Eczar", "El Messiri", "Electrolize", "Elsie", "Elsie Swash Caps",
    "Emblema One", "Emilys Candy", "Encode Sans", "Encode Sans Condensed", "Encode Sans Expanded", "Encode Sans SC",
    "Encode Sans Semi Condensed", "Encode Sans Semi Expanded", "Engagement", "Englebert", "Enriqueta", "Epilogue",
    "Erica One", "Esteban", "Euphoria Script", "Ewert", "Exo", "Exo 2", "Expletus Sans", "Fahkwang", "Fanwood Text",
    "Farro", "Farsan", "Fascinate", "Fascinate Inline", "Faster One", "Fasthand", "Fauna One", "Faustina",
    "Federant", "Federo", "Felipa", "Fenix", "Finger Paint", "Fira Code", "Fira Mono", "Fira Sans", "Fira Sans Condensed",
    "Fira Sans Extra Condensed", "Fjalla One", "Fjord One", "Flamenco", "Flavors", "Fondamento", "Fontdiner Swanky",
    "Forum", "Francois One", "Frank Ruhl Libre", "Fraunces", "Freckle Face", "Fredericka the Great", "Fredoka One",
    "Freehand", "Fresca", "Frijole", "Fruktur", "Fugaz One", "GFS Didot", "GFS Neohellenic", "Gabriela", "Gaegu",
    "Gafata", "Galada", "Galdeano", "Galindo", "Gamja Flower", "Gayathri", "Gelasio", "Gentium Basic", "Gentium Book Basic",
    "Geo", "Geostar", "Geostar Fill", "Germania One", "Gidugu", "Gilda Display", "Girassol", "Give You Glory",
    "Glass Antiqua", "Glegoo", "Gloria Hallelujah", "Goblin One", "Gochi Hand", "Goldman", "Gorditas", "Gothic A1",
    "Gotu", "Goudy Bookletter 1911", "Graduate", "Grand Hotel", "Grandstander", "Gravitas One", "Great Vibes",
    "Grenze", "Grenze Gotisch", "Griffy", "Gruppo", "Gudea", "Gugi", "Gupter", "Gurajada", "Habibi", "Hachi Maru Pop",
    "Halant", "Hammersmith One", "Hanalei", "Hanalei Fill", "Handlee", "Hanuman", "Happy Monkey", "Harmattan",
    "Headland One", "Heebo", "Henny Penny", "Hepta Slab", "Herr Von Muellerhoff", "Hi Melody", "Hind", "Hind Guntur",
    "Hind Madurai", "Hind Siliguri", "Hind Vadodara", "Holtwood One SC", "Homemade Apple", "Homenaje", "IBM Plex Mono",
    "IBM Plex Sans", "IBM Plex Sans Condensed", "IBM Plex Serif", "IM Fell DW Pica", "IM Fell DW Pica SC",
    "IM Fell Double Pica", "IM Fell Double Pica SC", "IM Fell English", "IM Fell English SC", "IM Fell French Canon",
    "IM Fell French Canon SC", "IM Fell Great Primer", "IM Fell Great Primer SC", "Ibarra Real Nova", "Iceberg",
    "Iceland", "Imbue", "Imprima", "Inconsolata", "Inder", "Indie Flower", "Inika", "Inknut Antiqua", "Inria Sans",
    "Inria Serif", "Inter", "Irish Grover", "Istok Web", "Italiana", "Italianno", "Itim", "Jacques Francois",
    "Jacques Francois Shadow", "Jaldi", "JetBrains Mono", "Jim Nightshade", "Jockey One", "Jolly Lodger", "Jomhuria",
    "Jomolhari", "Josefin Sans", "Josefin Slab", "Jost", "Joti One", "Jua", "Judson", "Julee", "Julius Sans One",
    "Junge", "Jura", "Just Another Hand", "Just Me Again Down Here", "K2D", "Kadwa", "Kalam", "Kameron", "Kanit",
    "Kantumruy", "Karla", "Karma", "Katibeh", "Kaushan Script", "Kavivanar", "Kavoon", "Kdam Thmor", "Keania One",
    "Kelly Slab", "Kenia", "Khand", "Khmer", "Khula", "Kirang Haerang", "Kite One", "Knewave", "KoHo", "Kodchasan",
    "Kosugi", "Kosugi Maru", "Kotta One", "Koulen", "Kranky", "Kreon", "Kristi", "Krona One", "Krub", "Kufam",
    "Kulim Park", "Kumar One", "Kumar One Outline", "Kumbh Sans", "Kurale", "La Belle Aurore", "Lacquer", "Laila",
    "Lakki Reddy", "Lalezar", "Lancelot", "Langar", "Lateef", "Lato", "League Script", "Leckerli One", "Ledger",
    "Lekton", "Lemon", "Lemonada", "Lexend", "Lexend Deca", "Lexend Exa", "Lexend Giga", "Lexend Mega", "Lexend Peta",
    "Lexend Tera", "Lexend Zetta", "Libre Barcode 128", "Libre Barcode 128 Text", "Libre Barcode 39", "Libre Barcode 39 Extended",
    "Libre Barcode 39 Extended Text", "Libre Barcode 39 Text", "Libre Barcode EAN13 Text", "Libre Baskerville",
    "Libre Caslon Display", "Libre Caslon Text", "Libre Franklin", "Life Savers", "Lilita One", "Lily Script One",
    "Limelight", "Linden Hill", "Literata", "Liu Jian Mao Cao", "Livvic", "Lobster", "Lobster Two", "Londrina Outline",
    "Londrina Shadow", "Londrina Sketch", "Londrina Solid", "Long Cang", "Lora", "Love Ya Like A Sister", "Loved by the King",
    "Lovers Quarrel", "Luckiest Guy", "Lusitana", "Lustria", "M PLUS 1p", "M PLUS Rounded 1c", "Ma Shan Zheng",
    "Macondo", "Macondo Swash Caps", "Mada", "Magra", "Maiden Orange", "Maitree", "Major Mono Display", "Mako",
    "Mali", "Mallanna", "Mandali", "Manjari", "Manrope", "Mansalva", "Manuale", "Marcellus", "Marcellus SC",
    "Marck Script", "Margarine", "Markazi Text", "Marko One", "Marmelad", "Martel", "Martel Sans", "Marvel",
    "Mate", "Mate SC", "Material Icons", "Maven Pro", "McLaren", "Meddon", "MedievalSharp", "Medula One", "Meera Inimai",
    "Megrim", "Meie Script", "Merienda", "Merienda One", "Merriweather", "Merriweather Sans", "Metal", "Metal Mania",
    "Metamorphous", "Metrophobic", "Michroma", "Milonga", "Miltonian", "Miltonian Tattoo", "Mina", "Miniver",
    "Miriam Libre", "Mirza", "Miss Fajardose", "Mitr", "Modak", "Modern Antiqua", "Mogra", "Molengo", "Molle",
    "Monda", "Monofett", "Monoton", "Monsieur La Doulaise", "Montaga", "Montez", "Montserrat", "Montserrat Alternates",
    "Montserrat Subrayada", "Moul", "Moulpali", "Mountains of Christmas", "Mouse Memoirs", "Mr Bedfort", "Mr Dafoe",
    "Mr De Haviland", "Mrs Saint Delafield", "Mrs Sheppards", "Mukta", "Mukta Mahee", "Mukta Malar", "Mukta Vaani",
    "Mulish", "MuseoModerno", "Mystery Quest", "NTR", "Nanum Brush Script", "Nanum Gothic", "Nanum Gothic Coding",
    "Nanum Myeongjo", "Nanum Pen Script", "Neucha", "Neuton", "New Rocker", "News Cycle", "Niconne", "Niramit",
    "Nixie One", "Nobile", "Nokora", "Norican", "Nosifer", "Notable", "Nothing You Could Do", "Noticia Text",
    "Noto Sans", "Noto Sans HK", "Noto Sans JP", "Noto Sans KR", "Noto Sans SC", "Noto Sans TC", "Noto Serif",
    "Noto Serif JP", "Noto Serif KR", "Noto Serif SC", "Noto Serif TC", "Nova Cut", "Nova Flat", "Nova Mono",
    "Nova Oval", "Nova Round", "Nova Script", "Nova Slim", "Nova Square", "Numans", "Nunito", "Nunito Sans",
    "Odibee Sans", "Odor Mean Chey", "Offside", "Oi", "Old Standard TT", "Oldenburg", "Oleo Script", "Oleo Script Swash Caps",
    "Open Sans", "Open Sans Condensed", "Oranienbaum", "Orbitron", "Oregano", "Orelega One", "Orienta", "Original Surfer",
    "Oswald", "Over the Rainbow", "Overlock", "Overlock SC", "Overpass", "Overpass Mono", "Ovo", "Oxanium", "Oxygen",
    "Oxygen Mono", "PT Mono", "PT Sans", "PT Sans Caption", "PT Sans Narrow", "PT Serif", "PT Serif Caption",
    "Pacifico", "Padauk", "Palanquin", "Palanquin Dark", "Pangolin", "Paprika", "Parisienne", "Passero One",
    "Passion One", "Pathway Gothic One", "Patrick Hand", "Patrick Hand SC", "Pattaya", "Patua One", "Pavanam",
    "Paytone One", "Peddana", "Peralta", "Permanent Marker", "Petit Formal Script", "Petrona", "Philosopher",
    "Piazzolla", "Piedra", "Pinyon Script", "Pirata One", "Plaster", "Play", "Playball", "Playfair Display",
    "Playfair Display SC", "Podkova", "Poiret One", "Poller One", "Poly", "Pompiere", "Pontano Sans", "Poor Story",
    "Poppins", "Port Lligat Sans", "Port Lligat Slab", "Potta One", "Pragati Narrow", "Prata", "Preahvihear",
    "Press Start 2P", "Pridi", "Princess Sofia", "Prociono", "Prompt", "Prosto One", "Proza Libre", "Public Sans",
    "Puritan", "Purple Purse", "Quando", "Quantico", "Quattrocento", "Quattrocento Sans", "Questrial", "Quicksand",
    "Quintessential", "Qwigley", "Racing Sans One", "Radley", "Rajdhani", "Rakkas", "Raleway", "Raleway Dots",
    "Ramabhadra", "Ramaraja", "Rambla", "Rammetto One", "Ranchers", "Rancho", "Ranga", "Rasa", "Rationale",
    "Ravi Prakash", "Recursive", "Red Hat Display", "Red Hat Text", "Red Rose", "Redressed", "Reem Kufi", "Reenie Beanie",
    "Revalia", "Rhodium Libre", "Ribeye", "Ribeye Marrow", "Righteous", "Risque", "Roboto", "Roboto Condensed",
    "Roboto Mono", "Roboto Slab", "Rochester", "Rock Salt", "RocknRoll One", "Rokkitt", "Romanesco", "Ropa Sans",
    "Rosario", "Rosarivo", "Rouge Script", "Rowdies", "Rozha One", "Rubik", "Rubik Mono One", "Ruda", "Rufina",
    "Ruge Boogie", "Ruluko", "Rum Raisin", "Ruslan Display", "Russo One", "Ruthie", "Rye", "Sacramento", "Sahitya",
    "Sail", "Saira", "Saira Condensed", "Saira Extra Condensed", "Saira Semi Condensed", "Saira Stencil One",
    "Salsa", "Sanchez", "Sancreek", "Sansita", "Sansita Swashed", "Sarabun", "Sarala", "Sarina", "Sarpanch",
    "Satisfy", "Sawarabi Gothic", "Sawarabi Mincho", "Scada", "Scheherazade", "Schoolbell", "Scope One", "Seaweed Script",
    "Secular One", "Sedgwick Ave", "Sedgwick Ave Display", "Sen", "Sevillana", "Seymour One", "Shadows Into Light",
    "Shadows Into Light Two", "Shanti", "Share", "Share Tech", "Share Tech Mono", "Shippori Mincho", "Shippori Mincho B1",
    "Shojumaru", "Short Stack", "Shrikhand", "Siemreap", "Sigmar One", "Signika", "Signika Negative", "Simonetta",
    "Single Day", "Sintony", "Sirin Stencil", "Six Caps", "Skranji", "Slabo 13px", "Slabo 27px", "Slackey",
    "Smokum", "Smythe", "Sniglet", "Snippet", "Snowburst One", "Sofadi One", "Sofia", "Solway", "Song Myung",
    "Sonsie One", "Sora", "Sorts Mill Goudy", "Source Code Pro", "Source Sans 3", "Source Sans Pro", "Source Serif 4",
    "Source Serif Pro", "Space Grotesk", "Space Mono", "Spartan", "Special Elite", "Spectral", "Spectral SC",
    "Spicy Rice", "Spinnaker", "Spirax", "Squada One", "Sree Krushnadevaraya", "Sriracha", "Srisakdi", "Staatliches",
    "Stalemate", "Stalinist One", "Stardos Stencil", "Stick", "Stint Ultra Condensed", "Stint Ultra Expanded",
    "Stoke", "Strait", "Style Script", "Stylish", "Sue Ellen Francisco", "Suez One", "Sulphur Point", "Sumana",
    "Sunflower", "Sunshiney", "Supermercado One", "Sura", "Suranna", "Suravaram", "Suwannaphum", "Swanky and Moo Moo",
    "Syncopate", "Syne", "Syne Mono", "Syne Tactile", "Tajawal", "Tangerine", "Taprom", "Tauri", "Taviraj",
    "Teko", "Telex", "Tenali Ramakrishna", "Tenor Sans", "Text Me One", "Texturina", "Thasadith", "The Girl Next Door",
    "Tienne", "Tillana", "Timmana", "Tinos", "Titan One", "Titillium Web", "Tomorrow", "Tourney", "Trade Winds",
    "Trirong", "Trispace", "Trocchi", "Trochut", "Truculenta", "Trykker", "Tulpen One", "Turret Road", "Ubuntu",
    "Ubuntu Condensed", "Ubuntu Mono", "Uchen", "Ultra", "Uncial Antiqua", "Underdog", "Unica One", "UnifrakturCook",
    "UnifrakturMaguntia", "Unkempt", "Unlock", "Unna", "VT323", "Vampiro One", "Varela", "Varela Round", "Varta",
    "Vast Shadow", "Vesper Libre", "Viaoda Libre", "Vibes", "Vibur", "Vidaloka", "Viga", "Voces", "Volkhov",
    "Vollkorn", "Vollkorn SC", "Voltaire", "Waiting for the Sunrise", "Wallpoet", "Walter Turncoat", "Warnes",
    "Wellfleet", "Wendy One", "Wire One", "Work Sans", "Xanh Mono", "Yanone Kaffeesatz", "Yantramanav", "Yatra One",
    "Yellowtail", "Yeon Sung", "Yeseva One", "Yesteryear", "Yrsa", "Yusei Magic", "ZCOOL KuaiLe", "ZCOOL QingKe HuangYou",
    "ZCOOL XiaoWei", "Zen Antique", "Zen Antique Soft", "Zen Dots", "Zen Kaku Gothic Antique", "Zen Kaku Gothic New",
    "Zen Kurenaido", "Zen Loop", "Zen Maru Gothic", "Zen Old Mincho", "Zen Tokyo Zoo", "Zeyada", "Zhi Mang Xing",
    "Zilla Slab", "Zilla Slab Highlight"
  ].sort();
  
  return googleFontsList;
}

// Custom modal functions to replace alert/confirm/prompt
function showAlert(message, title = 'Notice') {
  return new Promise(resolve => {
    const modal = qs('#customModal');
    const titleEl = qs('#customModalTitle');
    const bodyEl = qs('#customModalBody');
    const inputEl = qs('#customModalInput');
    const buttonsEl = qs('#customModalButtons');
    
    titleEl.textContent = title;
    bodyEl.textContent = message;
    inputEl.classList.add('hidden');
    buttonsEl.innerHTML = '<button class="btn-primary"><i class="bi bi-check-circle"></i> OK</button>';
    
    const okBtn = buttonsEl.querySelector('button');
    okBtn.onclick = () => {
      modal.classList.add('hidden');
      resolve(true);
    };
    
    modal.classList.remove('hidden');
  });
}

function showConfirm(message, title = 'Confirm') {
  return new Promise(resolve => {
    const modal = qs('#customModal');
    const titleEl = qs('#customModalTitle');
    const bodyEl = qs('#customModalBody');
    const inputEl = qs('#customModalInput');
    const buttonsEl = qs('#customModalButtons');
    
    titleEl.textContent = title;
    bodyEl.textContent = message;
    inputEl.classList.add('hidden');
    buttonsEl.innerHTML = `
      <button class="btn-ghost cancel-btn"><i class="bi bi-x-circle"></i> Cancel</button>
      <button class="btn-primary confirm-btn"><i class="bi bi-check-circle"></i> Confirm</button>
    `;
    
    const cancelBtn = buttonsEl.querySelector('.cancel-btn');
    const confirmBtn = buttonsEl.querySelector('.confirm-btn');
    
    cancelBtn.onclick = () => {
      modal.classList.add('hidden');
      resolve(false);
    };
    
    confirmBtn.onclick = () => {
      modal.classList.add('hidden');
      resolve(true);
    };
    
    modal.classList.remove('hidden');
  });
}

function showPrompt(message, defaultValue = '', title = 'Input Required') {
  return new Promise(resolve => {
    const modal = qs('#customModal');
    const titleEl = qs('#customModalTitle');
    const bodyEl = qs('#customModalBody');
    const inputEl = qs('#customModalInput');
    const buttonsEl = qs('#customModalButtons');
    
    titleEl.textContent = title;
    bodyEl.textContent = message;
    inputEl.classList.remove('hidden');
    inputEl.value = defaultValue;
    buttonsEl.innerHTML = `
      <button class="btn-ghost cancel-btn"><i class="bi bi-x-circle"></i> Cancel</button>
      <button class="btn-primary ok-btn"><i class="bi bi-check-circle"></i> OK</button>
    `;
    
    const cancelBtn = buttonsEl.querySelector('.cancel-btn');
    const okBtn = buttonsEl.querySelector('.ok-btn');
    
    cancelBtn.onclick = () => {
      modal.classList.add('hidden');
      resolve(null);
    };
    
    okBtn.onclick = () => {
      const value = inputEl.value;
      modal.classList.add('hidden');
      resolve(value || null);
    };
    
    inputEl.onkeydown = (e) => {
      if (e.key === 'Enter') {
        okBtn.click();
      } else if (e.key === 'Escape') {
        cancelBtn.click();
      }
    };
    
    modal.classList.remove('hidden');
    setTimeout(() => inputEl.focus(), 100);
  });
}

// DOM elements - will be initialized after DOM loads
let fields, cvssFields, cvssVector, cvssScore, cvssSeverity, btnResetCVSS, btnCopyCVSS;
let fileInput, dropArea, thumbs, btnSaveDraft, btnLoadDraft, btnPreviewPDF, btnDownloadPDF, btnExportMarkdown;
let settingsModal, draftsModal, templatesModal, btnSettings, btnDrafts, btnCloseSettings, btnCloseDrafts;
let btnTemplates, btnCloseTemplates;
let btnSaveSettings, btnClearData, btnNew, btnLoadSample, btnToggleLayout, btnTheme;
let autosaveIndicator, mainGrid, completenessBar, completenessPercent, completenessDetails;

let screenshots = [];
let autosaveTimer = null;
let layoutReversed = false;

// Wait for DOM to be ready before initializing
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

function initializeApp() {
  // Initialize all DOM element references
  fields = {
    rep_name: qs('#rep_name'),
    rep_email: qs('#rep_email'),
    rep_handle: qs('#rep_handle'),
    rep_pgp: qs('#rep_pgp'),
    rep_disclosure: qs('#rep_disclosure'),
    vuln_title: qs('#vuln_title'),
    vuln_summary: qs('#vuln_summary'),
    vuln_category: qs('#vuln_category'),
    vuln_owasp: qs('#vuln_owasp'),
    vuln_severity: qs('#vuln_severity'),
    vuln_steps: qs('#vuln_steps'),
    vuln_observables: qs('#vuln_observables'),
    vuln_impact: qs('#vuln_impact'),
    vuln_mitigation: qs('#vuln_mitigation'),
    vuln_notes: qs('#vuln_notes')
  };

  cvssFields = {
    av: qs('#cvss_av'),
    ac: qs('#cvss_ac'),
    pr: qs('#cvss_pr'),
    ui: qs('#cvss_ui'),
    s: qs('#cvss_s'),
    c: qs('#cvss_c'),
    i: qs('#cvss_i'),
    a: qs('#cvss_a')
  };
  
  cvssVector = qs('#cvss_vector');
  cvssScore = qs('#cvss_score');
  cvssSeverity = qs('#cvss_severity');
  btnResetCVSS = qs('#btnResetCVSS');
  btnCopyCVSS = qs('#btnCopyCVSS');
  fileInput = qs('#fileInput');
  dropArea = qs('#dropArea');
  thumbs = qs('#thumbs');
  btnSaveDraft = qs('#btnSaveDraft');
  btnLoadDraft = qs('#btnLoadDraft');
  btnPreviewPDF = qs('#btnPreviewPDF');
  btnDownloadPDF = qs('#btnDownloadPDF');
  btnExportMarkdown = qs('#btnExportMarkdown');
  settingsModal = qs('#settingsModal');
  draftsModal = qs('#draftsModal');
  templatesModal = qs('#templatesModal');
  btnSettings = qs('#btnSettings');
  btnDrafts = qs('#btnDrafts');
  btnTemplates = qs('#btnTemplates');
  btnCloseSettings = qs('#btnCloseSettings');
  btnCloseDrafts = qs('#btnCloseDrafts');
  btnCloseTemplates = qs('#btnCloseTemplates');
  btnSaveSettings = qs('#btnSaveSettings');
  btnClearData = qs('#btnClearData');
  btnNew = qs('#btnNew');
  btnLoadSample = qs('#btnLoadSample');
  btnToggleLayout = qs('#btnToggleLayout');
  btnTheme = qs('#btnTheme');
  autosaveIndicator = qs('#autosaveIndicator');
  mainGrid = qs('#mainGrid');
  completenessBar = qs('#completenessBar');
  completenessPercent = qs('#completenessPercent');
  completenessDetails = qs('#completenessDetails');

  screenshots = VRBStorage.loadScreenshots() || [];
  layoutReversed = localStorage.getItem('vrb_layout_reversed') === 'true';

  // Initialize everything
  initTheme();
  initFromStorage();
  initCollapsible();
  setupEventListeners();
  initKeyboardShortcuts();
  initLayout();
  initPDFFont();
  initCharacterCounters();
  updateCompletenessIndicator();
}


// Completeness indicator
function updateCompletenessIndicator() {
  const requiredFields = [
    { name: 'Vulnerability Title', field: fields.vuln_title },
    { name: 'Summary', field: fields.vuln_summary },
    { name: 'Steps to Reproduce', field: fields.vuln_steps },
    { name: 'Impact', field: fields.vuln_impact }
  ];
  
  const optionalFields = [
    { name: 'Category', field: fields.vuln_category },
    { name: 'OWASP', field: fields.vuln_owasp },
    { name: 'Severity', field: fields.vuln_severity },
    { name: 'CVSS Vector', field: cvssVector },
    { name: 'Mitigation', field: fields.vuln_mitigation },
    { name: 'Observables', field: fields.vuln_observables }
  ];
  
  let filledRequired = 0;
  let filledOptional = 0;
  let missingRequired = [];
  
  requiredFields.forEach(({ name, field }) => {
    if (field && field.value.trim()) {
      filledRequired++;
    } else {
      missingRequired.push(name);
    }
  });
  
  optionalFields.forEach(({ field }) => {
    if (field && field.value.trim()) {
      filledOptional++;
    }
  });
  
  // Screenshots count as optional field
  if (screenshots.length > 0) {
    filledOptional++;
  }
  
  const totalFields = requiredFields.length + optionalFields.length + 1; // +1 for screenshots
  const filledFields = filledRequired + filledOptional;
  const percentage = Math.round((filledFields / totalFields) * 100);
  
  completenessBar.style.width = percentage + '%';
  completenessPercent.textContent = percentage + '%';
  
  if (missingRequired.length > 0) {
    completenessDetails.textContent = `Missing required: ${missingRequired.join(', ')}`;
    completenessDetails.style.color = 'var(--text-red)';
  } else {
    completenessDetails.textContent = `All required fields filled! ${filledOptional} optional fields completed.`;
    completenessDetails.style.color = 'var(--text-secondary)';
  }
  
  // Color coding based on completion
  if (percentage < 50) {
    completenessBar.style.backgroundColor = '#da1e28'; // Red
  } else if (percentage < 80) {
    completenessBar.style.backgroundColor = '#f1c21b'; // Yellow
  } else {
    completenessBar.style.backgroundColor = '#24a148'; // Green
  }
}

// Character counters for textareas
function initCharacterCounters() {
  const counters = [
    { field: fields.vuln_summary, counter: qs('#counter_summary') },
    { field: fields.vuln_steps, counter: qs('#counter_steps') },
    { field: fields.vuln_impact, counter: qs('#counter_impact') },
    { field: fields.vuln_mitigation, counter: qs('#counter_mitigation') }
  ];
  
  function updateCounter(field, counter) {
    const text = field.value;
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    counter.textContent = `${chars} characters, ${words} words`;
  }
  
  counters.forEach(({ field, counter }) => {
    if (field && counter) {
      updateCounter(field, counter);
      field.addEventListener('input', () => updateCounter(field, counter));
    }
  });
}

// Theme management
function initTheme(){
  const savedTheme = localStorage.getItem('vrb_theme') || 'light';
  if(savedTheme === 'dark'){
    document.body.classList.add('dark-mode');
    updateThemeIcon(true);
  }
}

function toggleTheme(){
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('vrb_theme', isDark ? 'dark' : 'light');
  updateThemeIcon(isDark);
}

function updateThemeIcon(isDark){
  const icon = btnTheme.querySelector('i');
  if(isDark){
    icon.className = 'bi bi-sun-fill';
    btnTheme.title = 'Toggle Light Mode';
  } else {
    icon.className = 'bi bi-moon-fill';
    btnTheme.title = 'Toggle Dark Mode';
  }
}

// CVSS v3.1 Calculator
function calculateCVSS(){
  const av = cvssFields.av.value;
  const ac = cvssFields.ac.value;
  const pr = cvssFields.pr.value;
  const ui = cvssFields.ui.value;
  const s = cvssFields.s.value;
  const c = cvssFields.c.value;
  const i = cvssFields.i.value;
  const a = cvssFields.a.value;

  if(!av || !ac || !pr || !ui || !s || !c || !i || !a){
    cvssVector.value = '';
    cvssScore.textContent = '-';
    cvssSeverity.textContent = '-';
    return;
  }

  // Build vector string
  const vector = `CVSS:3.1/AV:${av}/AC:${ac}/PR:${pr}/UI:${ui}/S:${s}/C:${c}/I:${i}/A:${a}`;
  cvssVector.value = vector;

  // Calculate score using CVSS v3.1 formula
  const avMap = {N: 0.85, A: 0.62, L: 0.55, P: 0.2};
  const acMap = {L: 0.77, H: 0.44};
  const prMapU = {N: 0.85, L: 0.62, H: 0.27};
  const prMapC = {N: 0.85, L: 0.68, H: 0.5};
  const uiMap = {N: 0.85, R: 0.62};
  const ciaMap = {N: 0, L: 0.22, H: 0.56};

  const prMap = s === 'C' ? prMapC : prMapU;

  const exploitability = 8.22 * avMap[av] * acMap[ac] * prMap[pr] * uiMap[ui];
  const impactBase = 1 - ((1 - ciaMap[c]) * (1 - ciaMap[i]) * (1 - ciaMap[a]));
  
  let impact;
  if(s === 'U'){
    impact = 6.42 * impactBase;
  } else {
    impact = 7.52 * (impactBase - 0.029) - 3.25 * Math.pow(impactBase - 0.02, 15);
  }

  let baseScore;
  if(impact <= 0){
    baseScore = 0;
  } else {
    if(s === 'U'){
      baseScore = Math.min(exploitability + impact, 10);
    } else {
      baseScore = Math.min(1.08 * (exploitability + impact), 10);
    }
    baseScore = Math.ceil(baseScore * 10) / 10;
  }

  cvssScore.textContent = baseScore.toFixed(1);

  // Determine severity
  let severity, color;
  if(baseScore === 0) { severity = 'None'; color = '#6b7280'; }
  else if(baseScore < 4.0) { severity = 'Low'; color = '#3b82f6'; }
  else if(baseScore < 7.0) { severity = 'Medium'; color = '#f59e0b'; }
  else if(baseScore < 9.0) { severity = 'High'; color = '#ef4444'; }
  else { severity = 'Critical'; color = '#991b1b'; }

  cvssSeverity.textContent = severity;
  cvssSeverity.style.color = color;
}

function parseCVSSVector(vectorString){
  const match = vectorString.match(/CVSS:3\.[01]\/AV:([NALP])\/AC:([LH])\/PR:([NLH])\/UI:([NR])\/S:([UC])\/C:([NLH])\/I:([NLH])\/A:([NLH])/);
  if(match){
    cvssFields.av.value = match[1];
    cvssFields.ac.value = match[2];
    cvssFields.pr.value = match[3];
    cvssFields.ui.value = match[4];
    cvssFields.s.value = match[5];
    cvssFields.c.value = match[6];
    cvssFields.i.value = match[7];
    cvssFields.a.value = match[8];
    calculateCVSS();
    return true;
  }
  return false;
}

function copyCVSSToClipboard(){
  const vector = cvssVector.value;
  if(!vector){
    showAlert('No CVSS vector to copy');
    return;
  }
  navigator.clipboard.writeText(vector).then(()=>{
    // Success - no need to show anything
  }).catch(()=>{
    showAlert('Failed to copy to clipboard');
  });
}

function resetCVSS(){
  Object.values(cvssFields).forEach(f => f.value = '');
  cvssVector.value = '';
  calculateCVSS();
}

function buildDataModel(){
  return {
    reporter: {
      name: fields.rep_name.value || '',
      email: fields.rep_email.value || '',
      handle: fields.rep_handle.value || '',
      pgp: fields.rep_pgp.value || '',
      disclosure: fields.rep_disclosure.value || ''
    },
    vulnerability: {
      title: fields.vuln_title.value || '',
      summary: fields.vuln_summary.value || '',
      category: fields.vuln_category.value || '',
      owasp: fields.vuln_owasp.value || '',
      severity: fields.vuln_severity.value || '',
      cvss: {
        vector: cvssVector.value || '',
        score: cvssScore.textContent !== '-' ? cvssScore.textContent : '',
        severity: cvssSeverity.textContent !== '-' ? cvssSeverity.textContent : ''
      },
      steps: fields.vuln_steps.value || '',
      observables: (fields.vuln_observables.value||'').split('\n').map(s=>s.trim()).filter(Boolean),
      impact: fields.vuln_impact.value || '',
      mitigation: fields.vuln_mitigation.value || '',
      notes: fields.vuln_notes.value || ''
    },
    screenshots: screenshots,
    exportSettings: VRBStorage.loadSettings()
  };
}

function escapeHtml(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

// autosave
function scheduleAutosave(){
  if(autosaveTimer) clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(()=>{
    const id = 'autosave';
    VRBStorage.saveDraft(id, buildDataModel());
    VRBStorage.saveReporter(buildDataModel().reporter);
    VRBStorage.saveScreenshots(screenshots);
    showAutosaveIndicator();
  }, 1500);
}

function showAutosaveIndicator(){
  autosaveIndicator.classList.remove('hidden');
  setTimeout(()=>autosaveIndicator.classList.add('hidden'), 2000);
}

// Helper functions for file handling
async function handleFiles(files){
  for(const f of files){
    const data = await readFileAsDataURL(f);
    const id = crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-' + Math.random().toString(36).slice(2);
    screenshots.push({id, name: f.name, data});
  }
  VRBStorage.saveScreenshots(screenshots);
  renderThumbs();
  scheduleAutosave();
}

function readFileAsDataURL(file){
  return new Promise((res,rej)=>{
    const r = new FileReader();
    r.onload = ()=>res(r.result);
    r.onerror = rej; r.readAsDataURL(file);
  });
}

function renderThumbs(){
  thumbs.innerHTML = '';
  screenshots.forEach((s, index)=>{
    const div = document.createElement('div');
    div.className = 'border p-1 cursor-move';
    div.draggable = true;
    div.dataset.index = index;
    
    // Drag events
    div.addEventListener('dragstart', (e) => {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', index);
      div.style.opacity = '0.4';
    });
    
    div.addEventListener('dragend', (e) => {
      div.style.opacity = '1';
    });
    
    div.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      div.style.borderColor = 'var(--carbon-blue)';
      div.style.borderWidth = '2px';
    });
    
    div.addEventListener('dragleave', (e) => {
      div.style.borderColor = '';
      div.style.borderWidth = '';
    });
    
    div.addEventListener('drop', (e) => {
      e.preventDefault();
      div.style.borderColor = '';
      div.style.borderWidth = '';
      
      const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
      const toIndex = parseInt(div.dataset.index);
      
      if (fromIndex !== toIndex) {
        const item = screenshots.splice(fromIndex, 1)[0];
        screenshots.splice(toIndex, 0, item);
        VRBStorage.saveScreenshots(screenshots);
        renderThumbs();
        scheduleAutosave();
      }
    });
    
    const img = document.createElement('img'); 
    img.src = s.data; 
    img.alt = s.name; 
    img.style.width='100%';
    img.style.pointerEvents = 'none'; // Prevent img from interfering with drag
    
    const nameLabel = document.createElement('div');
    nameLabel.className = 'text-xs text-gray-600 mt-1';
    nameLabel.textContent = `${index + 1}. ${s.name}`;
    
    const btn = document.createElement('button'); 
    btn.textContent='Remove'; 
    btn.className='btn-ghost mt-1';
    btn.addEventListener('click', ()=>{
      screenshots = screenshots.filter(x=>x.id!==s.id);
      VRBStorage.saveScreenshots(screenshots);
      renderThumbs(); 
      scheduleAutosave();
      updateCompletenessIndicator();
    });
    
    div.appendChild(img); 
    div.appendChild(nameLabel);
    div.appendChild(btn); 
    thumbs.appendChild(div);
  });
  updateCompletenessIndicator();
}

function formatAsMarkdown(data) {
  let md = `# ${data.vuln_title || 'Vulnerability Report'}\n\n`;
  
  // Reporter Information
  if (data.rep_name || data.rep_email || data.rep_handle) {
    md += `## Reporter Information\n\n`;
    if (data.rep_name) md += `**Name:** ${data.rep_name}\n\n`;
    if (data.rep_email) md += `**Email:** ${data.rep_email}\n\n`;
    if (data.rep_handle) md += `**Handle:** ${data.rep_handle}\n\n`;
    if (data.rep_pgp) md += `**PGP Key:** ${data.rep_pgp}\n\n`;
    if (data.rep_disclosure) md += `**Disclosure Policy:** ${data.rep_disclosure}\n\n`;
  }
  
  // Vulnerability Details
  md += `## Vulnerability Details\n\n`;
  
  if (data.vuln_summary) {
    md += `### Summary\n\n${data.vuln_summary}\n\n`;
  }
  
  if (data.vuln_category) {
    md += `**Category:** ${data.vuln_category}\n\n`;
  }
  
  if (data.vuln_owasp) {
    md += `**OWASP Classification:** ${data.vuln_owasp}\n\n`;
  }
  
  if (data.vuln_severity) {
    md += `**Severity:** ${data.vuln_severity}\n\n`;
  }
  
  // CVSS Scoring
  if (data.cvss_vector || data.cvss_score) {
    md += `### CVSS v3.1 Scoring\n\n`;
    if (data.cvss_vector) md += `**Vector:** \`${data.cvss_vector}\`\n\n`;
    if (data.cvss_score) md += `**Score:** ${data.cvss_score}`;
    if (data.cvss_severity) md += ` (${data.cvss_severity})`;
    md += `\n\n`;
  }
  
  // Steps to Reproduce
  if (data.vuln_steps) {
    md += `### Steps to Reproduce\n\n${data.vuln_steps}\n\n`;
  }
  
  // Observable Evidence
  if (data.vuln_observables) {
    md += `### Observable Evidence\n\n${data.vuln_observables}\n\n`;
  }
  
  // Screenshots
  if (data.screenshots && data.screenshots.length > 0) {
    md += `### Screenshots\n\n`;
    data.screenshots.forEach((screenshot, index) => {
      md += `**Screenshot ${index + 1}:** ${screenshot.name}\n\n`;
    });
  }
  
  // Impact
  if (data.vuln_impact) {
    md += `### Impact\n\n${data.vuln_impact}\n\n`;
  }
  
  // Mitigation
  if (data.vuln_mitigation) {
    md += `### Recommended Mitigation\n\n${data.vuln_mitigation}\n\n`;
  }
  
  // Additional Notes
  if (data.vuln_notes) {
    md += `### Additional Notes\n\n${data.vuln_notes}\n\n`;
  }
  
  md += `---\n\n*Report generated on ${new Date().toLocaleString()}*\n`;
  
  return md;
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function setupEventListeners() {
  // file handling
  fileInput.addEventListener('change', async (e)=>{
    const files = Array.from(e.target.files || []);
    await handleFiles(files);
    fileInput.value = '';
  });

  dropArea.addEventListener('dragover', e=>{e.preventDefault(); dropArea.classList.add('bg-gray-50')});
  dropArea.addEventListener('dragleave', e=>{dropArea.classList.remove('bg-gray-50')});
  dropArea.addEventListener('drop', async e=>{
    e.preventDefault(); dropArea.classList.remove('bg-gray-50');
    const files = Array.from(e.dataTransfer.files || []).filter(f=>f.type.startsWith('image/'));
    await handleFiles(files);
  });

  // wire inputs to preview and autosave
  Object.values(fields).forEach(f=>{
    if(!f) return;
    f.addEventListener('input', ()=>{ 
      scheduleAutosave(); 
      updateCompletenessIndicator();
    });
  });

  // CVSS calculator event listeners
  Object.values(cvssFields).forEach(f=>{
    if(!f) return;
    f.addEventListener('change', ()=>{ 
      calculateCVSS(); 
      scheduleAutosave(); 
      updateCompletenessIndicator();
    });
  });

  // CVSS vector input - parse when pasted or manually entered
  cvssVector.addEventListener('input', ()=>{
    const vector = cvssVector.value.trim();
    if(vector && vector.startsWith('CVSS:')){
      if(parseCVSSVector(vector)){
        scheduleAutosave();
        updateCompletenessIndicator();
      }
    }
  });

  btnResetCVSS.addEventListener('click', (e)=>{
    e.preventDefault();
    resetCVSS();
    scheduleAutosave();
  });

  btnCopyCVSS.addEventListener('click', (e)=>{
    e.preventDefault();
    copyCVSSToClipboard();
  });

  btnSaveDraft.addEventListener('click', async ()=>{
    const missing = validate();
    if(missing.length){
      await showAlert('Please fill required fields: ' + missing.join(', '));
      return;
    }
    const id = await showPrompt('Draft ID or name to save as:', 'draft-' + Date.now(), 'Save Draft');
    if(!id) return;
    VRBStorage.saveDraft(id, buildDataModel());
    await showAlert('Saved draft: ' + id, 'Success');
  });

  if(btnLoadDraft){
    btnLoadDraft.addEventListener('click', async ()=>{
      const drafts = VRBStorage.listDrafts();
      if(!drafts.length){ 
        await showAlert('No drafts found');
        return;
      }
      renderDraftsModal(drafts);
      draftsModal.classList.remove('hidden');
    });
  }

  // PDF actions
  btnPreviewPDF.addEventListener('click', async ()=>{
    const missing = validate();
    if(missing.length){
      const proceed = await showConfirm('Required fields missing: ' + missing.join(', ') + '. Preview anyway?', 'Missing Fields');
      if(!proceed) return;
    }
    const data = buildDataModel();
    VRBPDF.previewPrintable(data);
    const exportDropdown = qs('#exportDropdown');
    if(exportDropdown) exportDropdown.classList.remove('show');
  });
  
  btnDownloadPDF.addEventListener('click', async ()=>{
    const missing = validate();
    if(missing.length){
      const proceed = await showConfirm('Required fields missing: ' + missing.join(', ') + '. Download anyway?', 'Missing Fields');
      if(!proceed) return;
    }
    VRBPDF.downloadPDF(buildDataModel());
    const exportDropdown = qs('#exportDropdown');
    if(exportDropdown) exportDropdown.classList.remove('show');
  });

  // Export to Markdown
  btnExportMarkdown.addEventListener('click', async ()=>{
    const data = buildDataModel();
    const markdown = formatAsMarkdown(data);
    downloadFile(markdown, 'vulnerability-report.md', 'text/markdown');
    await showAlert('Markdown file downloaded successfully!', 'Export Complete');
    const exportDropdown = qs('#exportDropdown');
    if(exportDropdown) exportDropdown.classList.remove('show');
  });

  // Settings modal
  btnSettings.addEventListener('click', ()=>{
    settingsModal.classList.remove('hidden');
    const s = VRBStorage.loadSettings();
    qs('#setting_pdfFont').value = s.pdfFont || 'Inter';
    qs('#currentFont').textContent = `Current: ${s.pdfFont || 'Inter'}`;
    qs('#setting_pageSize').value = s.pageSize || 'a4';
    qs('#setting_headerText').value = s.headerText || '';
    qs('#setting_footerText').value = s.footerText || '';
    qs('#setting_includeReporter').checked = s.includeReporter !== false;
    renderHeaderFooterPreviews(s);
  });
  
  // Font search functionality
  const fontInput = qs('#setting_pdfFont');
  const fontSearchResults = qs('#fontSearchResults');
  
  fontInput.addEventListener('input', async (e) => {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length < 2) {
      fontSearchResults.classList.add('hidden');
      return;
    }
    
    const fonts = await fetchGoogleFonts();
    const matches = fonts.filter(font => font.toLowerCase().includes(query)).slice(0, 20);
    
    if (matches.length === 0) {
      fontSearchResults.classList.add('hidden');
      return;
    }
    
    fontSearchResults.innerHTML = '';
    matches.forEach(font => {
      const div = document.createElement('div');
      div.className = 'p-2 cursor-pointer border-b';
      div.style.borderColor = 'var(--border-color)';
      div.style.background = 'var(--bg-secondary)';
      div.style.color = 'var(--text-primary)';
      div.textContent = font;
      
      div.addEventListener('mouseenter', () => {
        div.style.background = 'var(--bg-tertiary)';
      });
      div.addEventListener('mouseleave', () => {
        div.style.background = 'var(--bg-secondary)';
      });
      div.addEventListener('click', () => {
        fontInput.value = font;
        qs('#currentFont').textContent = `Current: ${font}`;
        fontSearchResults.classList.add('hidden');
        loadGoogleFont(font);
      });
      
      fontSearchResults.appendChild(div);
    });
    
    fontSearchResults.classList.remove('hidden');
  });
  
  // Close font search when clicking outside
  document.addEventListener('click', (e) => {
    if (!fontInput.contains(e.target) && !fontSearchResults.contains(e.target)) {
      fontSearchResults.classList.add('hidden');
    }
  });
  
  btnCloseSettings.addEventListener('click', ()=>settingsModal.classList.add('hidden'));
  btnCloseDrafts.addEventListener('click', ()=>draftsModal.classList.add('hidden'));
  btnCloseTemplates.addEventListener('click', ()=>templatesModal.classList.add('hidden'));

  // Templates modal
  if(btnTemplates){
    btnTemplates.addEventListener('click', ()=>{
      renderTemplatesModal();
      templatesModal.classList.remove('hidden');
      const loadDropdown = qs('#loadDropdown');
      if(loadDropdown) loadDropdown.classList.remove('show');
    });
  }

  qs('#setting_headerImage').addEventListener('change', async (e)=>{
    const f = e.target.files[0]; if(!f) return;
    const data = await readFileAsDataURL(f);
    const s = VRBStorage.loadSettings();
    s.headerImage = data;
    VRBStorage.saveSettings(s);
    renderHeaderFooterPreviews(s);
  });

  qs('#setting_footerImage').addEventListener('change', async (e)=>{
    const f = e.target.files[0]; if(!f) return;
    const data = await readFileAsDataURL(f);
    const s = VRBStorage.loadSettings();
    s.footerImage = data;
    VRBStorage.saveSettings(s);
    renderHeaderFooterPreviews(s);
  });

  btnSaveSettings.addEventListener('click', async ()=>{
    const s = VRBStorage.loadSettings();
    s.pdfFont = qs('#setting_pdfFont').value.trim();
    s.pageSize = qs('#setting_pageSize').value;
    s.headerText = qs('#setting_headerText').value;
    s.footerText = qs('#setting_footerText').value;
    s.includeReporter = qs('#setting_includeReporter').checked;
    VRBStorage.saveSettings(s);
    
    // Load and apply the selected font
    if (s.pdfFont) {
      loadGoogleFont(s.pdfFont);
    }
    
    settingsModal.classList.add('hidden');
    await showAlert('Settings saved successfully', 'Success');
  });
  
  btnClearData.addEventListener('click', async ()=>{
    const confirmed = await showConfirm('Clear all stored data (drafts, screenshots, settings)?', 'Clear All Data');
    if(confirmed){
      VRBStorage.clearAll();
      screenshots = [];
      renderThumbs();
      await showAlert('All data cleared successfully', 'Success');
    }
  });

  // New report
  if(btnNew){
    btnNew.addEventListener('click', async ()=>{
      const confirmed = await showConfirm('Start a new report? Unsaved changes will be lost.', 'New Report');
      if(confirmed){
        Object.values(fields).forEach(f=>{ if(f) f.value=''; });
        screenshots = [];
        VRBStorage.saveScreenshots(screenshots);
        renderThumbs();
      }
    });
  }

  // Dropdown toggles
  const btnLoadOptions = qs('#btnLoadOptions');
  const btnExportOptions = qs('#btnExportOptions');
  const loadDropdown = qs('#loadDropdown');
  const exportDropdown = qs('#exportDropdown');

  if(btnLoadOptions && loadDropdown){
    btnLoadOptions.addEventListener('click', (e)=>{
      e.stopPropagation();
      loadDropdown.classList.toggle('show');
      if(exportDropdown) exportDropdown.classList.remove('show');
    });
  }

  if(btnExportOptions && exportDropdown){
    btnExportOptions.addEventListener('click', (e)=>{
      e.stopPropagation();
      exportDropdown.classList.toggle('show');
      if(loadDropdown) loadDropdown.classList.remove('show');
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', ()=>{
    if(loadDropdown) loadDropdown.classList.remove('show');
    if(exportDropdown) exportDropdown.classList.remove('show');
  });

  // Load sample report
  if(btnLoadSample){
    btnLoadSample.addEventListener('click', async ()=>{
      const confirmed = await showConfirm('Load sample vulnerability report? Current data will be replaced.', 'Load Sample');
      if(confirmed){
        populateFromModel(window.SAMPLE_REPORT);
        await showAlert('Sample report loaded. Feel free to edit and export as PDF.', 'Success');
      }
      if(loadDropdown) loadDropdown.classList.remove('show');
    });
  }

  // Theme toggle
  if(btnTheme){
    btnTheme.addEventListener('click', toggleTheme);
  }

  // Documentation modal
  const btnDocs = qs('#btnDocs');
  const docsModal = qs('#docsModal');
  const btnCloseDocs = qs('#btnCloseDocs');
  const btnDocReadme = qs('#btnDocReadme');
  const btnDocFeatures = qs('#btnDocFeatures');
  const docContent = qs('#docContent');

  if(btnDocs && docsModal){
    btnDocs.addEventListener('click', async ()=>{
      docsModal.classList.remove('hidden');
      await loadDocumentation('doc/README.md');
    });
  }

  if(btnCloseDocs){
    btnCloseDocs.addEventListener('click', ()=>{
      docsModal.classList.add('hidden');
    });
  }

  if(btnDocReadme){
    btnDocReadme.addEventListener('click', async ()=>{
      setActiveDocTab('readme');
      await loadDocumentation('doc/README.md');
    });
  }

  if(btnDocFeatures){
    btnDocFeatures.addEventListener('click', async ()=>{
      setActiveDocTab('features');
      await loadDocumentation('doc/FEATURES.md');
    });
  }

  // Toggle layout (left/right switch)
  if(btnToggleLayout){
    btnToggleLayout.addEventListener('click', ()=>{
      layoutReversed = !layoutReversed;
      localStorage.setItem('vrb_layout_reversed', layoutReversed);
      if(layoutReversed){
        mainGrid.classList.add('layout-reversed');
      } else {
        mainGrid.classList.remove('layout-reversed');
      }
    });
  }
}

// Documentation helper functions
async function loadDocumentation(filePath) {
  const docContent = qs('#docContent');
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error('Failed to load documentation');
    const markdown = await response.text();
    const html = DOMPurify.sanitize(marked.parse(markdown));
    docContent.innerHTML = html;
  } catch (error) {
    docContent.innerHTML = `<p style="color: var(--text-secondary); text-align: center;">Failed to load documentation. Please check the console for details.</p>`;
    console.error('Documentation load error:', error);
  }
}

function setActiveDocTab(tab) {
  const btnDocReadme = qs('#btnDocReadme');
  const btnDocFeatures = qs('#btnDocFeatures');
  
  btnDocReadme.classList.remove('active');
  btnDocFeatures.classList.remove('active');
  
  if (tab === 'readme') {
    btnDocReadme.classList.add('active');
  } else if (tab === 'features') {
    btnDocFeatures.classList.add('active');
  }
}


function renderTemplatesModal() {
  const list = qs('#templatesList');
  list.innerHTML = '';
  
  Object.entries(VRB_TEMPLATES).forEach(([key, template]) => {
    const card = document.createElement('div');
    card.className = 'template-card';
    
    card.innerHTML = `
      <div class="flex items-center gap-2 mb-2">
        <i class="${template.icon} text-xl" style="color: var(--carbon-blue);"></i>
        <div class="font-medium">${escapeHtml(template.name)}</div>
      </div>
      <div class="text-xs" style="color: var(--text-secondary);">
        ${escapeHtml(template.data.vuln_title)}
      </div>
    `;
    
    card.addEventListener('click', async () => {
      const confirmed = await showConfirm(
        `Load the ${template.name} template? This will replace current form data.`,
        'Load Template'
      );
      if (confirmed) {
        populateFromTemplate(template.data);
        templatesModal.classList.add('hidden');
        await showAlert(`${template.name} template loaded successfully!`, 'Template Loaded');
      }
    });
    
    list.appendChild(card);
  });
}

function populateFromTemplate(data) {
  // Clear current data first
  Object.values(fields).forEach(f => { if (f) f.value = ''; });
  resetCVSS();
  screenshots = [];
  VRBStorage.saveScreenshots(screenshots);
  renderThumbs();
  
  // Populate with template data
  if (data.vuln_title) fields.vuln_title.value = data.vuln_title;
  if (data.vuln_category) fields.vuln_category.value = data.vuln_category;
  if (data.vuln_owasp) fields.vuln_owasp.value = data.vuln_owasp;
  if (data.vuln_severity) fields.vuln_severity.value = data.vuln_severity;
  if (data.vuln_summary) fields.vuln_summary.value = data.vuln_summary;
  if (data.vuln_steps) fields.vuln_steps.value = data.vuln_steps;
  if (data.vuln_observables) fields.vuln_observables.value = data.vuln_observables;
  if (data.vuln_impact) fields.vuln_impact.value = data.vuln_impact;
  if (data.vuln_mitigation) fields.vuln_mitigation.value = data.vuln_mitigation;
  if (data.vuln_notes) fields.vuln_notes.value = data.vuln_notes;
  
  // Parse CVSS vector if present
  if (data.cvss_vector) {
    cvssVector.value = data.cvss_vector;
    parseCVSSVector(data.cvss_vector);
  }
  
  scheduleAutosave();
  updateCompletenessIndicator();
}

function renderDraftsModal(drafts){
  const list = qs('#draftsList');
  list.innerHTML = '';
  drafts.forEach(d=>{
    const div = document.createElement('div');
    div.className = 'draft-item';
    const title = d.data?.vulnerability?.title || 'Untitled';
    const date = new Date(d.updated).toLocaleString();
    div.innerHTML = `<div class="font-medium">${escapeHtml(d.id)}</div><div class="text-xs text-gray-600">${escapeHtml(title)} – ${date}</div>`;
    div.addEventListener('click', ()=>{
      populateFromModel(d.data);
      draftsModal.classList.add('hidden');
    });
    list.appendChild(div);
  });
}

function populateFromModel(obj){
  if(!obj) return;
  if(obj.reporter){
    fields.rep_name.value = obj.reporter.name||'';
    fields.rep_email.value = obj.reporter.email||'';
    fields.rep_handle.value = obj.reporter.handle||'';
    fields.rep_pgp.value = obj.reporter.pgp||'';
    fields.rep_disclosure.value = obj.reporter.disclosure||'';
    VRBStorage.saveReporter(obj.reporter);
  }
  if(obj.vulnerability){
    fields.vuln_title.value = obj.vulnerability.title||'';
    fields.vuln_summary.value = obj.vulnerability.summary||'';
    fields.vuln_category.value = obj.vulnerability.category||'';
    fields.vuln_owasp.value = obj.vulnerability.owasp||'';
    fields.vuln_severity.value = obj.vulnerability.severity||'';
    
    // Restore CVSS from vector string if available
    if(obj.vulnerability.cvss && obj.vulnerability.cvss.vector){
      const vector = obj.vulnerability.cvss.vector;
      const match = vector.match(/AV:([NALP])\/AC:([LH])\/PR:([NLH])\/UI:([NR])\/S:([UC])\/C:([NLH])\/I:([NLH])\/A:([NLH])/);
      if(match){
        cvssFields.av.value = match[1];
        cvssFields.ac.value = match[2];
        cvssFields.pr.value = match[3];
        cvssFields.ui.value = match[4];
        cvssFields.s.value = match[5];
        cvssFields.c.value = match[6];
        cvssFields.i.value = match[7];
        cvssFields.a.value = match[8];
        calculateCVSS();
      }
    }
    
    fields.vuln_steps.value = obj.vulnerability.steps||'';
    fields.vuln_observables.value = (obj.vulnerability.observables||[]).join('\n');
    fields.vuln_impact.value = obj.vulnerability.impact||'';
    fields.vuln_mitigation.value = obj.vulnerability.mitigation||'';
    fields.vuln_notes.value = obj.vulnerability.notes||'';
  }
  if(obj.screenshots){ screenshots = obj.screenshots; VRBStorage.saveScreenshots(screenshots); }
  renderThumbs();
}

// load saved reporter and screenshots on start
function initFromStorage(){
  const r = VRBStorage.loadReporter(); if(r){ fields.rep_name.value=r.name||''; fields.rep_email.value=r.email||''; fields.rep_handle.value=r.handle||''; fields.rep_pgp.value=r.pgp||''; fields.rep_disclosure.value=r.disclosure||''; }
  screenshots = VRBStorage.loadScreenshots() || [];
  renderThumbs();
}

async function renderHeaderFooterPreviews(s){
  const hPrev = qs('#headerImagePreview');
  const fPrev = qs('#footerImagePreview');
  hPrev.innerHTML = s.headerImage ? `<img src="${s.headerImage}" style="max-width:200px;border:1px solid #e5e7eb" />` : '';
  fPrev.innerHTML = s.footerImage ? `<img src="${s.footerImage}" style="max-width:200px;border:1px solid #e5e7eb" />` : '';
}

// simple validation on required fields
function validate(){
  const missing = [];
  const validationFields = [
    { field: fields.vuln_title, label: 'Title' },
    { field: fields.vuln_summary, label: 'Summary' },
    { field: fields.vuln_steps, label: 'Steps to Reproduce' },
    { field: fields.vuln_impact, label: 'Impact' }
  ];
  
  validationFields.forEach(v=>{
    const msg = v.field.parentElement.querySelector('.validation-message');
    if(!v.field.value.trim()){
      missing.push(v.label);
      if(msg){
        msg.textContent = v.label + ' is required';
        msg.classList.remove('hidden');
      }
    } else {
      if(msg) msg.classList.add('hidden');
    }
  });
  
  return missing;
}

// Collapsible sections
function initCollapsible(){
  const headers = qsa('.collapsible-section h2');
  headers.forEach(h=>{
    h.addEventListener('click', (e)=>{
      e.preventDefault();
      const section = h.parentElement;
      section.classList.toggle('collapsed');
    });
  });
}

// Save on manual Save Draft press handled earlier; autosave already used.

// Load a Google Font dynamically
function loadGoogleFont(fontName) {
  // Check if font is already loaded
  const existingLink = qs(`link[href*="${fontName.replace(/ /g, '+')}"]`);
  if (existingLink) return;
  
  // Create and append font link
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@400;700&display=swap`;
  document.head.appendChild(link);
  
  // Update CSS variable
  document.documentElement.style.setProperty('--pdf-font-family', `'${fontName}', serif`);
}

// Initialize PDF font from settings
function initPDFFont(){
  const s = VRBStorage.loadSettings();
  if(s.pdfFont){
    loadGoogleFont(s.pdfFont);
  }
}

// Initialize layout state
function initLayout(){
  if(layoutReversed){
    mainGrid.classList.add('layout-reversed');
  }
}

// Keyboard shortcuts
function initKeyboardShortcuts(){
  document.addEventListener('keydown', (e)=>{
    // Escape to close modals
    if(e.key === 'Escape'){
      if(!settingsModal.classList.contains('hidden')) settingsModal.classList.add('hidden');
      if(!draftsModal.classList.contains('hidden')) draftsModal.classList.add('hidden');
    }
    // Ctrl/Cmd+S to save draft
    if((e.ctrlKey || e.metaKey) && e.key === 's'){
      e.preventDefault();
      btnSaveDraft.click();
    }
    // Ctrl/Cmd+P to preview PDF
    if((e.ctrlKey || e.metaKey) && e.key === 'p'){
      e.preventDefault();
      btnPreviewPDF.click();
    }
  });
}

// expose for debugging
window.VRB = { buildDataModel };
