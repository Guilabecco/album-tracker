// ============================================================
// FIFA WORLD CUP 2026 — Panini Official Sticker Album
// Versão 5 — banco de dados completo (48 times + especiais)
// ============================================================
// DADOS OFICIAIS: 980 figurinhas | 912 regulares | 68 especiais
// 112 páginas | 48 seleções × 20 figurinhas = 960
// ============================================================

const makeTeam = (code, name, flag, color, group, players = {}) => ({
  id: code.toLowerCase(),
  code, name, flag, color, group,
  hypothesis: false,
  stickers: Array.from({ length: 20 }, (_, i) => {
    const pos = i + 1;
    const player = players[pos];
    const isEmpty = !player || player === "(vazio)";
    return {
      id: `${code}-${pos}`,
      pos,
      type: pos === 13 ? "team_photo" : "player",
      label: pos === 13
        ? `${code} 13 — Foto do Time`
        : isEmpty
          ? `${code} ${pos}`
          : `${code} ${pos} — ${player}`,
      player: (pos === 13 || isEmpty) ? null : player,
      hypothesis: false,
    };
  }),
});

// ── SEÇÕES ESPECIAIS ──────────────────────────────────────

const INTRO_SECTION = {
  id: "intro", name: "Abertura FIFA WC 2026",
  flag: "🏆", color: "#6A0DAD", group: "ESPECIAL",
  hypothesis: false,
  stickers: [
    { id:"FWC-01", pos:1, type:"intro",   label:"FWC 1 — Emblema Oficial",          hypothesis:false },
    { id:"FWC-02", pos:2, type:"intro",   label:"FWC 2 — Mascotes Oficiais",        hypothesis:false },
    { id:"FWC-03", pos:3, type:"intro",   label:"FWC 3 — Treinadores Oficiais",     hypothesis:false },
    { id:"FWC-04", pos:4, type:"intro",   label:"FWC 4 — Slogan Oficial",           hypothesis:false },
    { id:"FWC-05", pos:5, type:"host",    label:"FWC 5 — Canadá (Toronto/Vancouver)",hypothesis:false },
    { id:"FWC-06", pos:6, type:"host",    label:"FWC 6 — We Are CAN",               hypothesis:false },
    { id:"FWC-07", pos:7, type:"host",    label:"FWC 7 — México (GDL/MTY/MEX)",     hypothesis:false },
    { id:"FWC-08", pos:8, type:"host",    label:"FWC 8 — EUA (11 cidades)",         hypothesis:false },
    { id:"FWC-09", pos:9, type:"history", label:"FWC 9 — Italy 1934™",              hypothesis:false },
    { id:"FWC-10", pos:10,type:"history", label:"FWC 10 — France 1938™",            hypothesis:false },
    { id:"FWC-11", pos:11,type:"history", label:"FWC 11 — Switzerland 1954™",       hypothesis:false },
    { id:"FWC-12", pos:12,type:"history", label:"FWC 12 — Chile 1962™",             hypothesis:false },
    { id:"FWC-13", pos:13,type:"history", label:"FWC 13 — England 1966™",           hypothesis:false },
    { id:"FWC-14", pos:14,type:"history", label:"FWC 14 — Argentina 1978™",         hypothesis:false },
    { id:"FWC-15", pos:15,type:"history", label:"FWC 15 — USA 1994™",               hypothesis:false },
    { id:"FWC-16", pos:16,type:"history", label:"FWC 16 — Korea/Japan 2002™",       hypothesis:false },
    { id:"FWC-17", pos:17,type:"history", label:"FWC 17 — Germany 2006™",           hypothesis:false },
    { id:"FWC-18", pos:18,type:"history", label:"FWC 18 — Brazil 2014™",            hypothesis:false },
    { id:"FWC-19", pos:19,type:"history", label:"FWC 19 — Qatar 2022™",             hypothesis:false },
    { id:"FWC-20", pos:20,type:"history", label:"FWC 20 — (hipótese)",              hypothesis:true  },
  ],
};

const COCACOLA_SECTION = {
  id: "coca-cola", name: "Coca-Cola — Momentos Especiais",
  flag: "🥤", color: "#E8000B", group: "ESPECIAL",
  hypothesis: false,
  stickers: [
    { id:"CC-01", pos:1,  type:"coca", label:"CC 1 — Santiago Giménez (MEX)",    player:"Santiago Giménez",    hypothesis:false },
    { id:"CC-02", pos:2,  type:"coca", label:"CC 2 — Lamine Yamal (ESP)",        player:"Lamine Yamal",        hypothesis:false },
    { id:"CC-03", pos:3,  type:"coca", label:"CC 3 — Joško Gvardiol (CRO)",      player:"Joško Gvardiol",      hypothesis:false },
    { id:"CC-04", pos:4,  type:"coca", label:"CC 4 — Joshua Kimmich (GER)",      player:"Joshua Kimmich",      hypothesis:false },
    { id:"CC-05", pos:5,  type:"coca", label:"CC 5 — Federico Valverde (URU)",   player:"Federico Valverde",   hypothesis:false },
    { id:"CC-06", pos:6,  type:"coca", label:"CC 6 — Harry Kane (ENG)",          player:"Harry Kane",          hypothesis:false },
    { id:"CC-07", pos:7,  type:"coca", label:"CC 7 — Raúl Jiménez (MEX)",        player:"Raúl Jiménez",        hypothesis:false },
    { id:"CC-08", pos:8,  type:"coca", label:"CC 8 — Virgil van Dijk (NED)",     player:"Virgil van Dijk",     hypothesis:false },
    { id:"CC-09", pos:9,  type:"coca", label:"CC 9 — Jefferson Lerma (COL)",     player:"Jefferson Lerma",     hypothesis:false },
    { id:"CC-10", pos:10, type:"coca", label:"CC 10 — Lautaro Martínez (ARG)",   player:"Lautaro Martínez",    hypothesis:false },
    { id:"CC-11", pos:11, type:"coca", label:"CC 11 — Alphonso Davies (CAN)",    player:"Alphonso Davies",     hypothesis:false },
    { id:"CC-12", pos:12, type:"coca", label:"CC 12 — Enner Valencia (ECU)",     player:"Enner Valencia",      hypothesis:false },
    { id:"CC-13", pos:13, type:"coca", label:"CC 13 — Emiliano Martínez (ARG)",  player:"Emiliano Martínez",   hypothesis:false },
    { id:"CC-14", pos:14, type:"coca", label:"CC 14 — Gabriel Magalhães (BRA)",  player:"Gabriel Magalhães",   hypothesis:false },
  ],
};

const SPECIALS_SECTION = {
  id: "specials", name: "Especiais Metalizadas (68)",
  flag: "⭐", color: "#FFD700", group: "ESPECIAL",
  hypothesis: true,
  stickers: Array.from({ length: 68 }, (_, i) => ({
    id: `ESP-${String(i+1).padStart(2,"0")}`,
    pos: i+1, type: "special", rarity: "metallic",
    label: `Especial ${i+1} — (metalizada)`,
    hypothesis: true,
  })),
};

// ── 48 SELEÇÕES ───────────────────────────────────────────

export const ALBUMS = {
  "road-to-2026": {
    id: "road-to-2026",
    name: "FIFA World Cup 2026 — Panini",
    year: 2026,
    totalStickers: 980,
    regularStickers: 912,
    specialStickers: 68,
    pages: 112,
    stickersPerPack: 7,
    groups: [
      {
        id: "especiais", name: "Abertura & Especiais",
        teams: [INTRO_SECTION, COCACOLA_SECTION, SPECIALS_SECTION],
      },
      {
        id: "group-a", name: "Grupo A",
        teams: [
          makeTeam("MEX","México","🇲🇽","#006847","A",{
            2:"Luis Malagón",3:"Juan Vásquez",4:"Jorge Sánchez",
            6:"Jesús Gallardo",7:"Israel Reyes",8:"Diego Lainez",
            12:"Marcos Ruiz",16:"Santiago Giménez",17:"Raúl Jiménez",
            18:"Alexis Vega",19:"Roberto Alvarado",20:"César Huerta",
          }),
          makeTeam("KOR","Coreia do Sul","🇰🇷","#CD2E3A","A",{
            3:"Seungyu Kim",5:"Yumin Cho",6:"Youngwoo Seol",
            7:"Haneeom Lee",8:"Taebeok Lee",9:"Myungjae Lee",
            11:"Heechan Hwang",12:"Kangin Lee",14:"Seungho Paik",
            15:"Jens Castrop",16:"Donggyeong Lee",18:"Heungmin Son",
            19:"Heeshan Hwang",20:"Hyeonggyu Oh",
          }),
          makeTeam("CZE","República Checa","🇨🇿","#D7141A","A",{
            2:"Matěj Kovář",3:"Jindřich Staněk",4:"Ladislav Krejčí",
            5:"Vladimír Coufal",6:"Jaroslav Zelený",7:"Tomáš Holes",
            8:"David Zima",9:"Michal Sadílek",10:"Lukáš Provod",
            11:"Lukáš Červ",12:"Tomáš Souček",14:"Pavel Šulc",
            15:"Matěj Vydra",16:"Yusuf Kusej",17:"Tomáš Chorý",
            18:"Václav Černý",19:"Adam Hložek",20:"Patrik Schick",
          }),
          makeTeam("RSA","África do Sul","🇿🇦","#007A4D","A",{
            3:"Spho Chaine",5:"Samkele Kabini",6:"Mbekozeli Mbokazi",
            10:"Nkosinathi Sibisi",11:"Teboho Mokoena",
            15:"Viva Sithole",16:"Spho Mbule",
          }),
        ],
      },
      {
        id: "group-b", name: "Grupo B",
        teams: [
          makeTeam("CAN","Canadá","🇨🇦","#FF0000","B",{
            2:"Davie St. Clair",4:"Alistair Johnston",5:"Samuel Adekugbe",
            6:"Richie Laryea",7:"Derek Cornelius",8:"Moise Bombito",
            9:"Kamal Miller",10:"Stephen Eustaquio",11:"Ismaël Koné",
            12:"Jonathan Osorio",14:"Jacob Shaffelburg",15:"Mathieu Choinière",
            18:"Liam Millar",19:"Cyle Larin",
          }),
          makeTeam("QAT","Catar","🇶🇦","#8D1B3D","B",{
            2:"Meshaal Barsham",3:"Bilal Alriane",4:"Lucas Mendes",
            5:"Homam Ahmed",6:"Boualem Khoukhi",7:"Pedro Miguel",
            8:"Yunus Salman",9:"Mohammed Maminai",11:"Assim Madibo",
            12:"Hamed Fatehi",15:"Abdulaziz Hatem",16:"Hassan Al-Haydos",
            18:"Assim Hassan Afif",20:"Almoez Ali",
          }),
          makeTeam("SUI","Suíça","🇨🇭","#E8192C","B",{
            2:"Gregor Kobel",3:"Yon Mvogo",4:"Manuel Akanji",
            5:"Ricardo Rodriguez",6:"Nico Elvedi",7:"Aurèle Amenda",
            8:"Fabian Widmer",9:"Granit Xhaka",10:"Denis Zakaria",
            11:"Remo Freuler",12:"Fabian Rieder",14:"Ardon Jashari",
            16:"Michel Aebischer",17:"Breel Embolo",18:"Ruben Vargas",
            19:"Dan Ndoye",20:"Zeki Amdouni",
          }),
          makeTeam("BIH","Bósnia-Herzegovina","🇧🇦","#002395","B",{
            2:"Nikola Vasil",3:"Amar Dedic",4:"Sead Kolasinac",
            5:"Jasmin Muharemovic",6:"Nihad Mujaric",7:"Nikola Katic",
            8:"Amir Hadziahmetovic",9:"Benjamin Tahirovic",10:"Admir Gigovic",
            11:"Ivan Sunjic",12:"Ivan Basic",14:"Dzenis Burnic",
            15:"Esmir Bajraktarevic",16:"Amar Memic",17:"Ermedin Demirovic",
            18:"Edin Dzeko",19:"Samed Bazdar",20:"Haris Tabakovic",
          }),
        ],
      },
      {
        id: "group-c", name: "Grupo C",
        teams: [
          makeTeam("BRA","Brasil","🇧🇷","#009C3B","C",{
            2:"Alisson",3:"Bento",4:"Marquinhos",5:"Éder Militão",
            6:"Gabriel Magalhães",7:"Danilo",8:"Wesley",10:"Casemiro",
            11:"Bruno Guimarães",12:"Luiz Henrique",14:"Vinícius Júnior",
            17:"Matheus Cunha",18:"Gabriel Martinelli",19:"Raphinha",
          }),
          makeTeam("SCO","Escócia","🏴󠁧󠁢󠁳󠁣󠁴󠁿","#003F87","C",{
            4:"Kieran Tierney",6:"Andrew Robertson",8:"John Souttar",
            10:"Grant Hanley",12:"Billy Gilmour",15:"Ryan Christie",
            16:"Kenny McLean",17:"Jon McGinn",
          }),
          makeTeam("HAI","Haiti","🇭🇹","#00209F","C",{
            3:"Carlens Arcus",5:"Jean-Kevin Duvernê",9:"Hanes Delcroix",
            14:"Christopher Attys",15:"Derrick Etienne Jr.",
            17:"Ruben Providence",18:"Dickens Nazon",
          }),
          makeTeam("MAR","Marrocos","🇲🇦","#C1272D","C",{
            2:"Yassine Bounou",4:"Achraf Hakimi",6:"Nayef Aguerd",
            12:"Elesse Ben Seghir",15:"Ismael Saibari",17:"Ezzalzouli",
            19:"Brahim Diaz",20:"Ayoub El Kaabi",
          }),
        ],
      },
      {
        id: "group-d", name: "Grupo D",
        teams: [
          makeTeam("AUS","Austrália","🇦🇺","#FFD700","D",{
            2:"Mathew Ryan",3:"Joe Gauci",4:"Harry Souttar",
            6:"Jordan Bos",7:"Aziz Behich",9:"Lewis Miller",
            11:"Jackson Irvine",16:"Patrick Vaz",18:"Kusini Yengi",
            19:"Nestory Irankunda",20:"Mohamed Toure",
          }),
          makeTeam("USA","EUA","🇺🇸","#002868","D",{
            2:"Matt Freese",3:"Chris Richards",4:"Tim Ream",
            5:"Mark McKenzie",6:"Alex Freeman",7:"Antonee Robinson",
            8:"Tyler Adams",9:"Tanner Tessmann",10:"Weston McKennie",
            11:"Cristian Roldan",12:"Timothy Weah",14:"Diego Luna",
            15:"Malik Tillman",16:"Christian Pulisic",17:"Brendan Aaronson",
            18:"Ricardo Pepi",19:"Haji Wright",20:"Folarin Balogun",
          }),
          makeTeam("TUR","Türkiye","🇹🇷","#E30A17","D",{
            2:"Uğurcan Çakır",3:"Mert İnolur",4:"Zeki Çelik",
            5:"Abdülkerim Bardakcı",6:"Çağlar Söyüncü",7:"Meçhi Demiyal",
            8:"Ferdi Kadıoğlu",9:"Kaan Ayhan",10:"İsmail Yüksek",
            11:"Hakan Çalhanoğlu",12:"Logun Konçu",14:"Arda Güler",
            15:"İlhsan Can Kahveci",16:"Yunus Akgün",17:"Can Uzun",
            18:"Barış Alper Yılmaz",19:"Kerem Aktürkoğlu",20:"Kenan Yıldız",
          }),
          makeTeam("PAR","Paraguai","🇵🇾","#D52B1E","D",{
            4:"Gustavo Gómez",6:"Juan José Cáceres",8:"Júnior Alonso",
            9:"Matías Villasanti",10:"Diego Gómez",12:"Andrés Cubas",
            14:"Matías Galarza Fonda",15:"Julio Enciso",
            17:"Miguel Almirón",19:"Ángel Romero",
          }),
        ],
      },
      {
        id: "group-e", name: "Grupo E",
        teams: [
          makeTeam("GER","Alemanha","🇩🇪","#000000","E",{
            4:"David Raum",6:"Antonio Rüdiger",7:"Waldemar Anton",
            8:"Joule Baku",10:"Joshua Kimmich",15:"Jamal Musiala",
            18:"Leroy Sané",19:"Karim Adeyemi",
          }),
          makeTeam("ECU","Equador","🇪🇨","#FFD100","E",{
            4:"Piero Hincapié",6:"Willian Pacho",7:"Angelo Preciado",
            8:"Joel Ordóñez",10:"Alan Franco",11:"Kendry Páez",
            12:"Pedro Vite",15:"Leonardo Campana",16:"Gonzalo Plata",
            17:"Jhojan Angulo",19:"Kevin Rodríguez",20:"Enner Valencia",
          }),
          makeTeam("CIV","Costa do Marfim","🇨🇮","#FF6600","E",{
            3:"Ghislain Konan",5:"Odilon Kossounou",8:"Emmanuel Agbadou",
            11:"Seko Fofana",12:"Ibrahim Sangaré",16:"Sébastien Haller",
            17:"Simon Adingra",19:"Oumar Diakité",20:"Oumar Diallo",
          }),
          makeTeam("CUW","Curaçao","🇨🇼","#002B7F","E",{
            2:"Eloy Room",4:"Siebel Floranus",
            17:"Jürgen Locadia",19:"Germane Kastaneer",
          }),
        ],
      },
      {
        id: "group-f", name: "Grupo F",
        teams: [
          makeTeam("SWE","Suécia","🇸🇪","#006AA7","F",{
            2:"Viktor Johansson",3:"Isak Hien",4:"Gabriel Gudmundsson",
            5:"Emil Holm",6:"Victor Nilsson Lindelöf",7:"Gustav Lagerbielke",
            8:"Lucas Bergvall",9:"Hugo Larsson",10:"Jesper Karlström",
            11:"Nsin Ayari",12:"Mattias Svanberg",14:"Daniel Svensson",
            15:"Ken Sema",16:"Robin Baroğlu",17:"Dejan Kulusevski",
            18:"Anthony Elanga",19:"Alexander Isak",20:"Viktor Gyökeres",
          }),
          makeTeam("TUN","Tunísia","🇹🇳","#E70013","F",{
            2:"Bechir Ben Said",3:"Aymen Dahmen",4:"Van Valery",
            5:"Montassar Talbi",6:"Wassine Merah",7:"Ali Abdi",
            8:"Dylan Bronn",9:"Elyès Skhiri",10:"Aissa Laïdouni",
            11:"Ferjani Sassi",15:"Elias Achouri",16:"Elias Saad",
            17:"Hazem Mastouri",18:"Ismaël Gharbi",19:"Sinfailahi Ltaief",
            20:"Naim Sliti",
          }),
          makeTeam("JPN","Japão","🇯🇵","#BC002D","F",{
            2:"Zion Suzuki",3:"Henry Herogi Mochizuki",4:"Ayumu Seno",
            8:"Kaishu Sano",16:"Tomoki Minamino",20:"Ayase Ueda",
          }),
          makeTeam("NED","Holanda","🇳🇱","#FF6600","F",{
            2:"Bart Verbruggen",3:"Virgil van Dijk",4:"Micky van de Ven",
            5:"Jurrien Timber",6:"Denzel Dumfries",7:"Nathan Aké",
            8:"Jerémie Frimpong",9:"Jan Paul van Hecke",10:"Tijani Reijnders",
            11:"Ryan Gravenberch",14:"Frenkie de Jong",15:"Xavi Simons",
            16:"Justin Kluivert",17:"Noa Lang",18:"Donyell Malen",
            19:"Wout Weghorst",20:"Cody Gakpo",
          }),
        ],
      },
      {
        id: "group-g", name: "Grupo G",
        teams: [
          makeTeam("IRN","Irã","🇮🇷","#239F40","G",{
            2:"Alireza Beiranvand",4:"Ehsan Hajsafi",5:"Milad Mohammadi",
            6:"Shojae Khalilzadeh",7:"Ramin Rezaeian",9:"Sadegh Moharrami",
            10:"Saleh Hardani",12:"Saman Ghoddos",16:"Mohammad Mohebi",
            18:"Mehdi Taremi",19:"Alireza Jahanbakhsh",
          }),
          makeTeam("BEL","Bélgica","🇧🇪","#FFD700","G",{
            2:"Thibaut Courtois",3:"Arthur Theate",4:"Timothy Castagne",
            7:"Maxim de Cuyper",10:"Amadou Onana",11:"Nicolas Raskin",
            15:"Kevin de Bruyne",16:"Jérémy Doku",17:"Charles de Ketelaere",
          }),
          makeTeam("NZL","Nova Zelândia","🇳🇿","#000000","G",{
            4:"Michael Boxall",5:"Liberato Cacace",8:"Francis de Vries",
            9:"Finn Surman",10:"Joe Bell",12:"Ryan Thomas",
            14:"Matthew Garbett",15:"Marco Stamenic",17:"Chris Wood",
            18:"Elijah Just",19:"Callum McCowatt",
          }),
          makeTeam("EGY","Egito","🇪🇬","#CE1126","G",{
            2:"Mohamed Elshenawi",3:"Mohamed Hany",4:"Mohamed Hamdy",
            5:"Nasser Ibrahim",6:"Khaled Sobhi",7:"Ramzy Rabia",
            9:"Ahmed Fatouh",10:"Marwan Attia",12:"Marvy Fathy",
            14:"Mohamed Lasheen",18:"Mostafa Mohamed",
          }),
        ],
      },
      {
        id: "group-h", name: "Grupo H",
        teams: [
          makeTeam("URU","Uruguai","🇺🇾","#5EB6E4","H",{
            2:"Sergio Rochet",3:"Santiago Mele",4:"Ronald Araújo",
            5:"José María Giménez",6:"Sebastián Cáceres",7:"Mathías Olivera",
            8:"Guillermo Varela",9:"Nahitan Nández",10:"Federico Valverde",
            11:"Giorgian de Arrascaeta",12:"Rodrigo Bentancur",14:"Manuel Ugarte",
            15:"Nicolás de la Cruz",16:"Maxi Araújo",17:"Joaquín Núñez",
            18:"Federico Viñas",19:"Rodrigo Aguirre",20:"Facundo Pellistri",
          }),
          makeTeam("KSA","Arábia Saudita","🇸🇦","#006C35","H",{
            2:"Nawaf Alaqidi",3:"Abdulelah Alsanbi",4:"Saud Abdulhamid",
            6:"Jerad Thikri",7:"Moteb Alharbi",9:"Naser Aljuwayr",
            10:"Ziyad Aljohani",11:"Abdullah Alkhaibari",15:"Salem Aldawsari",
          }),
          makeTeam("ESP","Espanha","🇪🇸","#AA151B","H",{
            1:"Unai Simón",4:"Aymeric Laporte",5:"Dean Huijsen",
            10:"Rodri",11:"Pedri",12:"Fabián Ruiz",
            17:"Nico Williams",18:"Ferran Torres",
          }),
          makeTeam("CPV","Cabo Verde","🇨🇻","#003893","H",{
            2:"Vozinha",3:"Logan Costa",4:"Pico",5:"Diney",
            6:"Steven Moreira",7:"Wagner Pina",8:"João Paulo",
            9:"Wanick Semedo",11:"Patrick Andrade",12:"Jamiro Monteiro",
            14:"Deroy Duarte",16:"Jovane Cabral",17:"Ryan Mendes",
            18:"Dailon Livramento",20:"Bebé",
          }),
        ],
      },
      {
        id: "group-i", name: "Grupo I",
        teams: [
          makeTeam("IRQ","Iraque","🇮🇶","#CF7A30","I",{
            2:"Jalal Hassam",3:"Redin Sulaka",4:"Hussein Ali",
            5:"Avana Hashem",6:"Merkhas Doski",7:"Ziad Tahseen",
            8:"Mmane Youns",9:"Ziane Iqbal",10:"Amir Al-Ammari",
            11:"Ibrahim Bayesh",12:"Ali Jasim",14:"Yousef Awjn",
            15:"Ammar Sher",16:"Ahmed Farja",17:"Husham Rashna",
            18:"Ali Al-Hamadi",19:"Anwar Hassan",20:"Mohammad Ali",
          }),
          makeTeam("FRA","França","🇫🇷","#002395","I",{
            2:"Mike Maignan",3:"Théo Hernández",6:"Ibrahima Konaté",
            11:"Manu Koné",15:"Ousmane Dembélé",16:"Bradley Barcola",
            17:"Désiré Doué",19:"Khéo Enitiné",
          }),
          makeTeam("NOR","Noruega","🇳🇴","#EF2B2D","I",{
            3:"Julian Ryerson",4:"Leo Østigard",5:"Kristoffer Vassbakk Ajer",
            7:"David Møller Wolfe",8:"Tobjoern Heggen",9:"Morten Thorsby",
            11:"Sander Berge",12:"Andreas Schjelderup",17:"Jørn Dønnum",
            18:"Jørgen Strand Larsen",19:"Antonio Nusa",20:"Oscar Bobb",
          }),
          makeTeam("SEN","Senegal","🇸🇳","#00853F","I",{
            2:"Edouard Mendy",3:"Yernann Diouf",6:"Ismail Jakobs",
            7:"El Hadji Malick Diouf",11:"Idrissa Gueye",
            15:"Sadio Mané",17:"Boulaye Dia",
          }),
        ],
      },
      {
        id: "group-j", name: "Grupo J",
        teams: [
          makeTeam("AUT","Áustria","🇦🇹","#ED2939","J",{
            2:"Alexander Schlager",3:"Patrick Pentz",4:"David Alaba",
            5:"Kevin Danso",6:"Philipp Lienhart",7:"Stefan Posch",
            8:"Phillipp Mwene",9:"Alexander Prass",14:"Florian Grillitsch",
            15:"Nicolas Seiwald",17:"Patrick Wimmer",18:"Christoph Baumgartner",
          }),
          makeTeam("ARG","Argentina","🇦🇷","#74ACDF","J",{
            2:"Emiliano Martínez",3:"Nahuel Molina",4:"Cristian Romero",
            5:"Nicolás Otamendi",7:"Leonardo Balerdi",8:"Enzo Fernández",
            11:"Ezequiel Palacios",12:"Leandro Paredes",16:"Nico González",
            17:"Lionel Messi",19:"Julián Álvarez",20:"Giuliano Simeone",
          }),
          makeTeam("JOR","Jordânia","🇯🇴","#007A3D","J",{
            2:"Yazeed Abulaila",3:"Abdallah Al Fakhouri",4:"Yazan Al Arab",
            5:"Mohammad Abu Al Nadi",6:"Abdallah Nasib",7:"Yousef Abu Al Jazar",
            8:"Husam Abu Al Dahab",9:"Saleem Obaid",10:"Amer Jamous",
            11:"Mahmoud Al Mardi",12:"Nizar Al Rashdan",14:"Ahmad Assaf",
            15:"Yousef Qashi",16:"Noor Al Rawabdeh",17:"Mohammad Abu Hasheesh",
            18:"Mohannad Abu Taha",19:"Yazan Al Naimat",20:"Musa Al Taamari",
          }),
          makeTeam("ALG","Argélia","🇩🇿","#006233","J",{
            2:"Alexis Guendouz",3:"Ramy Bensebaini",7:"Aissa Mandi",
            8:"Ismail Bennacer",9:"Houssem Aouar",10:"Hicham Boudaoui",
            11:"Ramiz Zerrouki",15:"Riad Mahrez",16:"Said Benrahma",
            17:"Anis Hadj Moussa",18:"Jang Gouiri",19:"Ryad Boudedjan",
            20:"Mohammed Amoura",
          }),
        ],
      },
      {
        id: "group-k", name: "Grupo K",
        teams: [
          makeTeam("UZB","Uzbequistão","🇺🇿","#1EB53A","K",{
            2:"Jitmir Yusupov",3:"Farkhur Sayfiev",4:"Sherzod Nasrullaev",
            5:"Umair Eshmurodov",6:"Husnidin Aliqulov",7:"Rustam Ashurmatov",
            8:"Khudoiberdi Aliqulov",9:"Abduqodir Khusanov",10:"Odiljon Hamrobekov",
            11:"Otabek Shukurov",12:"Jamshid Iskanderov",14:"Azizbek Turgunboev",
            16:"Eldor Shomurodov",17:"Setion Urunov",18:"Jaloliddin Masharipov",
            19:"Robson Sergeev",20:"Abrorbe Fayzullayev",
          }),
          makeTeam("POR","Portugal","🇵🇹","#006600","K",{
            2:"Diogo Costa",4:"Rúben Dias",6:"Diogo Dalot",7:"Nuno Mendes",
            8:"Gonçalo Inácio",9:"Bernardo Silva",10:"Bruno Fernandes",
            11:"Rúben Neves",12:"Vitinha",14:"João Neves",
            15:"Cristiano Ronaldo",16:"Francisco Trincão",17:"João Félix",
            18:"Gonçalo Ramos",20:"Rafael Leão",
          }),
          makeTeam("COL","Colômbia","🇨🇴","#FCD116","K",{
            2:"Camilo Vargas",4:"Dávinson Sánchez",5:"Yerry Mina",
            6:"Daniel Muñoz",8:"John Lucumí",9:"Santiago Arias",
            10:"Jefferson Lerma",12:"Ricardo Ríos",14:"James Rodríguez",
            15:"Jhon Janer Quintero",16:"Jhon Córdoba",18:"Juan Córdoba",
            19:"Luis Suárez",20:"Luis Díaz",
          }),
          makeTeam("COD","Congo DR","🇨🇩","#007FFF","K",{
            2:"Lionel Mpasi",3:"Aaron Wan-Bissaka",4:"Axel Tuanzebe",
            5:"Arthur Masuaku",6:"Chancel Mbemba",7:"Joris Kayembe",
            8:"Charles Pickel",9:"Neajvel Mukau",10:"Edo Kayembe",
            11:"Sammel Moutoussamy",12:"Noah Sadini",14:"Théo Bongonda",
            15:"Neschick Ela",16:"Yoane Wissa",17:"Brian Ciprenda",
            18:"Fiston Mayele",19:"Cedric Bakabenu",20:"Nathanael Mbiku",
          }),
        ],
      },
      {
        id: "group-l", name: "Grupo L",
        teams: [
          makeTeam("GHA","Gana","🇬🇭","#006B3F","L",{
            2:"Lawrence Ati Zigi",3:"Tariq Lamptey",4:"Mohammed Salisu",
            5:"Alidu Seidu",6:"Alexander Djiku",7:"Osman Mensah",
            10:"Thomas Partey",11:"Salis Abdul Samed",12:"Kamaldeen Sulemana",
            15:"Kua Williams",16:"Jordan Ayew",17:"Junie Ayew",
            18:"Joseph Paintsil",20:"Antoine Sarpong",
          }),
          makeTeam("ENG","Inglaterra","🏴󠁧󠁢󠁥󠁮󠁧󠁿","#003090","L",{
            3:"John Stones",7:"Reece James",10:"Declan Rice",
            11:"Jude Bellingham",14:"Morgan Rogers",15:"Anthony Gordon",
            16:"Phil Foden",17:"Bukayo Saka",20:"Kyle Walker",
          }),
          makeTeam("PAN","Panamá","🇵🇦","#C8102E","L",{
            2:"Orlando Mosquera",3:"Luis Mejía",5:"Andrés Andrade",
            6:"Michael Amir Murillo",8:"José Córdoba",10:"Cristian Martínez",
            20:"Alberto Quintero",
          }),
          makeTeam("CRO","Croácia","🇭🇷","#FF0000","L",{
            2:"Domagoj Lovren",3:"Duje Ćaleta-Car",6:"Luka Vušković",
            9:"Luka Modrić",12:"Livio Majer",15:"Petar Sučić",
            17:"Andrej Pašalić",19:"Andrej Kramarić",
          }),
        ],
      },
    ],
  },
};

export const DEFAULT_ALBUM_ID = "road-to-2026";
