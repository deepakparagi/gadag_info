export interface InstagramPost {
  readonly id: string;
  readonly type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  readonly mediaUrl: string;
  readonly permalink: string;
  readonly caption: string;
  readonly likes: number;
  readonly comments: number;
  readonly timestamp: string;
}

export const mockInstagramPosts: readonly InstagramPost[] = [
  {
    id: "1",
    type: "IMAGE",
    mediaUrl: "/trikuteshwara_temple_detail.png", // Verified asset
    permalink: "https://instagram.com/gadag_info",
    caption: "The majestic Trikuteshwara Temple captured at golden hour. A true testament to Chalukyan brilliance. ✨🏛️ #Gadag #Heritage #KarnatakaTourism",
    likes: 4205,
    comments: 128,
    timestamp: "2026-03-24T18:30:00Z"
  },
  {
    id: "2",
    type: "IMAGE",
    mediaUrl: "/magadi_bird_sanctuary_sunset.png",
    permalink: "https://instagram.com/gadag_info",
    caption: "Peaceful evenings by the Malaprabha River. Nature's canvas. 🌅 #Sunset #GadagDiaries #Peace",
    likes: 3102,
    comments: 84,
    timestamp: "2026-03-22T17:45:00Z"
  },
  {
    id: "3",
    type: "CAROUSEL_ALBUM",
    mediaUrl: "/gadag_station.png",
    permalink: "https://instagram.com/gadag_info",
    caption: "Station Road Market buzz. This is where the heartbeat of the city lives. Swipe to see the colors! 🌶️🌸 #CityLife #StreetPhotography #Gadag",
    likes: 5890,
    comments: 215,
    timestamp: "2026-03-18T09:15:00Z"
  },
  {
    id: "4",
    type: "IMAGE",
    mediaUrl: "/lakkundi_stepwell_wide.png",
    permalink: "https://instagram.com/gadag_info",
    caption: "Lakkundi Step Well dates back over a millennia. Have you visited this hidden gem yet? 💧 #Lakkundi #IncredibleIndia",
    likes: 4760,
    comments: 142,
    timestamp: "2026-03-15T11:20:00Z"
  },
  {
    id: "5",
    type: "VIDEO",
    mediaUrl: "/events_dollu.png",
    permalink: "https://instagram.com/gadag_info",
    caption: "Rhythms of Dollu Kunitha! The energy at the Veereshwara Jatra was unmatched this year! 🥁💃 #FolkArt #Culture",
    likes: 8345,
    comments: 310,
    timestamp: "2026-03-10T20:00:00Z"
  },
  {
    id: "6",
    type: "IMAGE",
    mediaUrl: "/gadag_heritage_hero.png",
    permalink: "https://instagram.com/gadag_info",
    caption: "Morning mist over the Gadag Fort ruins. There's so much history sleeping under these stones. 🏰🌫️ #History #GadagFort",
    likes: 2950,
    comments: 65,
    timestamp: "2026-03-05T06:30:00Z"
  },
];
