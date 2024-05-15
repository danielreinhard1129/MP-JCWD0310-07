// Define the TagItem type
type TagItem = {
  title: string;
  sub?: string[]; // Make sub property optional with the "?" symbol
};

// Define the NAVLink type
type NAVLink = {
  href: string;
  key: string;
  label: string;
  tag: TagItem[];
};

//NAVIGATION
export const NAV_LINKS = [
  { href: "/", key: "home", label: "Create" },
  { href: "/about_us", key: "about_us", label: "Support" },
];

//EVENT_NAV
export const NAV_EVENT_LINKS: NAVLink[] = [
  {
    href: "/",
    key: "home",
    label: "Sports",
    tag: [
      {
        title: "Basketball",
        sub: [
          "Boston Celtics",
          "Miami Heat",
          "Dallas Maverick",
          "Milwaukee Bucks",
          "Minnesota Timberwolves",
          "Golden State Warriors",
          "Los Angeles Lakers",
          "Oklahoma City Thunder",
          "Denver Nuggets",
        ],
      },
      {
        title: "Football",
        sub: [
          "FC Barcelona",
          "Inter Miami",
          "Al Nassr FC",
          "Real Madrid",
          "Manchester United",
          "Chelsea FC",
          "Liverpool FC",
          "Paris Saint German",
        ],
      },
      {
        title: "Fighting",
        sub: [
          "Jose Aldo",
          "Islam Makhachev",
          "Dustin Poirier",
          "Conor McGregor",
          "Alexander Volkov",
          "Khamzat Chimaev",
          "Sergei Pavlovich",
          "Johnny Walker",
        ],
      },
      {
        title: "Futsal",
        sub: [
          "Barca",
          "Sporting CP",
          "Palma",
          "Benfica",
          "Haladas",
          "Sporting Anderlecht",
          "Loznica-Grad 2018",
        ],
      },
      {
        title: "Running",
        sub: [
          "Lake Wobegon Marathon",
          "IronHorse Marathon",
          "Wisconsin Marathon",
          "Colorado Marathon",
          "OC Marathon",
          "Pittsburgh Marathon",
          "Montana Marathon",
          "Cleveland Marathon",
        ],
      },
      {
        title: "Billiard",
        sub: [
          "Men's Open New Zaeland",
          "Masse WPA Women's World-9 Ball Championship ",
          "Predator WPA Junior World Championships",
        ],
      },
    ],
  },
  {
    href: "/",
    key: "home",
    label: "Music",
    tag: [
      {
        title: "Trending",
        sub: [
          "Taylor Swift",
          "Linkin Park",
          "The Strokes",
          "Blink 182",
          "My Chemical Romance",
          "Avenged Sevenfold",
          "Westlife",
          "Dream Theater",
          "BTS",
          "Olivia Rodrigo",
          "Justin Bieber",
        ],
      },
      {
        title: "Genres",
        sub: [
          "Rock",
          "Classic Rock",
          "Hard Rock",
          "Pop",
          "Hip-Hop",
          "Latin",
          "Soul",
          "Classical",
          "Other",
        ],
      },
      {
        title: "Festivals",
        sub: [
          "SXSW",
          "Big Ears",
          "Ultra Music Festival",
          "Coachella",
          "Jazz & Heritage Festival",
          "Levitation",
          "Stagecoach Festival",
          "Shaky Knees",
          "Electric Daisy Carnival",
          "Hangout Music Festival",
          "BottleRock",
        ],
      },
    ],
  },
  {
    href: "/",
    key: "home",
    label: "Shows",
    tag: [
      {
        title: "Comedy",
        sub: [
          "Dave Chappele",
          "Kevin Hart",
          "Bill Burr",
          "Nate Bargatze",
          "Ricky Gervais",
          "Mack Normand",
          "Theo Von",
          "Tom Segura",
          "John Mulaney",
        ],
      },
    ],
  },
  {
    href: "/about_us",
    key: "about_us",
    label: "Cities",
    tag: [
      { title: "New York" },
      { title: "Los Angeles" },
      { title: "California" },
      { title: "Chicago" },
      { title: "Houston" },
      { title: "Phoenix" },
      { title: "Philadelphia" },
      { title: "San Antonio" },
      { title: "San Diego" },
      { title: "Dallas" },
    ],
  },
];

//EVENT_CATEGORIES
export const EVENT_CATEGORIES = [
  { href: "/", title: "Concert", links: "/concert.jpg" },
  { href: "/", title: "BasketBall", links: "/basketball.jpg" },
  { href: "/", title: "Comedy", links: "/comedy-1.jpg" },
  { href: "/", title: "Football", links: "/football.jpg" },
  { href: "/", title: "Fighting", links: "/fighting.jpg" },
  { href: "/", title: "Futsal", links: "/futsal-1.jpg" },
  { href: "/", title: "Running", links: "/running.jpg" },
  { href: "/", title: "Billiard", links: "/billiard.jpg" },
];

//How render category if title have space?

export const CATEGORY_BACKGROUND = [
  { title: "Concert", url: "/category-img/concert.jpg" },
  { title: "BasketBall", url: "/category-img/basketball.jpg" },
  { title: "Comedy", url: "/category-img/comedy.jpg" },
  { title: "Football", url: "/category-img/football.jpg" },
  { title: "Fighting", url: "/category-img/fighting.jpg" },
  { title: "Futsal", url: "/category-img/futsal.jpg" },
  { title: "Running", url: "/category-img/running.jpg" },
  { title: "Billiard", url: "/category-img/billiard.jpg" },
];

//TOP_CONCERTS
export const TOP_CONCERTS = [
  { href: "/", title: "Taylor Swift", links: "/top-concert/taylor-swift.jpg" },
  {
    href: "/",
    title: "Elvis Costello",
    links: "/top-concert/elvis-costello.jpg",
  },
  {
    href: "/",
    title: "Missy Elliott",
    links: "/top-concert/missy-elliott.jpg",
  },
  { href: "/", title: "Neil Young", links: "/top-concert/neil-young.jpg" },
  { href: "/", title: "SZA", links: "/top-concert/sza.jpg" },
  { href: "/", title: "The Strokes", links: "/top-concert/the-strokes.jpg" },
];

// FOOTER SECTION
export const FOOTER_LINKS = [
  {
    title: "Learn More",
    links: [
      "About Us",
      "Press Releases",
      "Environment",
      "Jobs",
      "Privacy Policy",
      "Contact Us",
    ],
  },
  {
    title: "Developers",
    links: ["Platform", "Developers Team"],
  },
];

export const FOOTER_CONTACT_INFO = {
  title: "Contact Us",
  links: [
    { label: "Admin Officer", value: "0274-123456" },
    { label: "Email Officer", value: "kingaldo@gmail.com" },
  ],
};
