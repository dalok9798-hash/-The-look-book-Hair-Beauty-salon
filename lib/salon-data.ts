export interface SalonService {
  id: string;
  name: string;
  category: "hair" | "beauty" | "makeup" | "nails";
  price: number;
  duration: string;
  description: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialization: string[];
  experience: string;
  rating: number;
  reviewsCount: number;
  image: string;
  socials: { instagram?: string; linkedin?: string };
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
  verified: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  content: string;
}

export interface PromoOffer {
  id: string;
  title: string;
  discount: string;
  code: string;
  description: string;
  category: string;
  expiry: string;
}

export const SALON_SERVICES: SalonService[] = [
  // Hair Services
  {
    id: "hair-cut",
    name: "Luxury Signature Haircut",
    category: "hair",
    price: 1500,
    duration: "45 mins",
    description: "Personalized styling consultation, luxurious head massage, precision cut, and signature blow-dry finish.",
    image: "https://picsum.photos/seed/haircutter/600/400"
  },
  {
    id: "hair-styling",
    name: "Hollywood Glamour Blowout & Styling",
    category: "hair",
    price: 1200,
    duration: "40 mins",
    description: "Red-carpet worthy waves or glass-smooth finish with high-end thermal protection and shine mist.",
    image: "https://picsum.photos/seed/hairstylist/600/400"
  },
  {
    id: "hair-colouring",
    name: "Signature Full Hair Colouring",
    category: "hair",
    price: 4500,
    duration: "120 mins",
    description: "Rich, multi-dimensional, ammonia-free dynamic hair color customized for skin tone and hair vitality.",
    image: "https://picsum.photos/seed/haircolor/600/400"
  },
  {
    id: "balayage",
    name: "Premium French Balayage",
    category: "hair",
    price: 7500,
    duration: "180 mins",
    description: "Bespoke hand-painted sun-kissed highlighting technique for seamless, natural grow-out gradients.",
    image: "https://picsum.photos/seed/balayage/600/400"
  },
  {
    id: "ombre",
    name: "Chic Sombre & Ombre Highlights",
    category: "hair",
    price: 6800,
    duration: "150 mins",
    description: "Gradual transitional shading from deep dark chocolate roots merging into soft vanilla gold ends.",
    image: "https://picsum.photos/seed/ombre/600/400"
  },
  {
    id: "keratin",
    name: "Advanced Brazilian Keratin Infusion",
    category: "hair",
    price: 8500,
    duration: "150 mins",
    description: "Anti-frizz protein smoothing therapy that reconstructs compromised fibers and elevates diamond-like shine.",
    image: "https://picsum.photos/seed/keratintreat/600/400"
  },
  {
    id: "hair-spa",
    name: "Intense Caviar Hair Spa & Ritual",
    category: "hair",
    price: 3200,
    duration: "60 mins",
    description: "Nourishing luxury botanical mask infused with real seaweed minerals and hot stone neck relaxation massage.",
    image: "https://picsum.photos/seed/hairspa/600/400"
  },
  {
    id: "smoothening",
    name: "Professional Silk Smoothening Treatment",
    category: "hair",
    price: 6500,
    duration: "180 mins",
    description: "Locks in a perfectly straight, glossy, ultra-soft profile that remains effortlessly flawless in Goan humidity.",
    image: "https://picsum.photos/seed/smoothhair/600/400"
  },

  // Beauty Services
  {
    id: "facial-gold",
    name: "24K Luminous Gold Dermal Facial",
    category: "beauty",
    price: 4500,
    duration: "75 mins",
    description: "Pure 24k gold leaf particles blended into ultra-hydrating serums to restore youthful cellular elasticity.",
    image: "https://picsum.photos/seed/facial/600/400"
  },
  {
    id: "cleanup-detox",
    name: "Oceanic Carbon Detox Cleanup",
    category: "beauty",
    price: 2500,
    duration: "45 mins",
    description: "Clarifying deep pores exfoliation with activated organic clay, cooling steam, and hyperbaric oxygen.",
    image: "https://picsum.photos/seed/cleanup/600/400"
  },
  {
    id: "waxing-full",
    name: "Luxury Argan Oil Waxing",
    category: "beauty",
    price: 1800,
    duration: "50 mins",
    description: "Hypoallergenic argan oil wax formulated for ultra-sensitive skin, minimizing redness and pain.",
    image: "https://picsum.photos/seed/waxing/600/400"
  },
  {
    id: "threading-combo",
    name: "Flawless Brow & Lip Sculpting Threading",
    category: "beauty",
    price: 3500,
    duration: "20 mins",
    description: "Organic cotton threading that painlessly shapes brows to frame your eyes beautifully.",
    image: "https://picsum.photos/seed/eyebrow/600/400"
  },

  // Makeup Services
  {
    id: "makeup-party",
    name: "Sun-Kissed Party & Cocktail Glam",
    category: "makeup",
    price: 5000,
    duration: "60 mins",
    description: "Glowy HD base makeup paired with a sparkling smokey eye and custom lashes for any premium party celebration.",
    image: "https://picsum.photos/seed/partymakeup/600/400"
  },
  {
    id: "makeup-bridal",
    name: "The Look Book Signature Bridal Makeover",
    category: "makeup",
    price: 15000,
    duration: "180 mins",
    description: "Pre-session consultation, premium airbrush contouring, water-resistant HD foundation, and absolute long-lasting bridal styling.",
    image: "https://picsum.photos/seed/bridalmaker/600/400"
  },
  {
    id: "makeup-engagement",
    name: "Royal Engagement HD Makeup",
    category: "makeup",
    price: 8500,
    duration: "120 mins",
    description: "An elegant, romantic highlight setup featuring dewy skin textures, rose-gold eyelids, and contoured lips.",
    image: "https://picsum.photos/seed/engagementmake/600/400"
  },

  // Nail Services
  {
    id: "nail-art",
    name: "Masterclass Deluxe Nail Art & Chrome",
    category: "nails",
    price: 2500,
    duration: "60 mins",
    description: "Hand-painted 3D gemstones, luxury holographic chrome gradients, or modern abstract line art design.",
    image: "https://picsum.photos/seed/nailart/600/400"
  },
  {
    id: "manicure-gel",
    name: "Signature French Gel Manicure",
    category: "nails",
    price: 1500,
    duration: "45 mins",
    description: "Dead skin scrub, warm milk cuticle soak, precision nail tailoring, and chip-free luxury LED gel color.",
    image: "https://picsum.photos/seed/manicure/600/400"
  },
  {
    id: "pedicure-spa",
    name: "Soothing Lavender Jelly Pedicure",
    category: "nails",
    price: 1800,
    duration: "60 mins",
    description: "Effervescent jelly formula foot bath scrub, organic volcanic clay masque wrapping, and luxury pressure massage.",
    image: "https://picsum.photos/seed/pedicure/600/400"
  },
  {
    id: "nail-extensions",
    name: "Royal Gel-X & Acrylic Extensions",
    category: "nails",
    price: 3500,
    duration: "90 mins",
    description: "Durable, featherlight acrylic extensions crafted in stiletto, coffin, or natural almond shapes.",
    image: "https://picsum.photos/seed/nailextend/600/400"
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-priya",
    name: "Priya Fernandes",
    role: "Creative Director & Hair Maestro",
    specialization: ["French Balayage", "Master Styling", "Keratin Sculpting"],
    experience: "12 Years",
    rating: 4.9,
    reviewsCount: 384,
    image: "https://picsum.photos/seed/priyahair/300/300",
    socials: { instagram: "https://instagram.com/priya_hairgoa" }
  },
  {
    id: "team-samir",
    name: "Samir Naik",
    role: "Senior Color Alchemist",
    specialization: ["Pastel Highlights", "Creative Shading", "Olaplex Restoration"],
    experience: "9 Years",
    rating: 4.8,
    reviewsCount: 219,
    image: "https://picsum.photos/seed/samirhair/300/300",
    socials: { instagram: "https://instagram.com/samir_colourart" }
  },
  {
    id: "team-ananya",
    name: "Ananya Sharma",
    role: "Principle Bridal Makeup Artist",
    specialization: ["HD Airbrushing", "Destination Bridal Look", "Pre-wedding Skin prep"],
    experience: "8 Years",
    rating: 4.9,
    reviewsCount: 412,
    image: "https://picsum.photos/seed/ananyamakeup/300/300",
    socials: { instagram: "https://instagram.com/ananya_bridalgoa" }
  },
  {
    id: "team-michelle",
    name: "Michelle D'Souza",
    role: "Elite Nail Stylist & Aesthetician",
    specialization: ["3D Gel Extensions", "Holographic Chrome Arts", "Organic Hand Spa"],
    experience: "6 Years",
    rating: 4.7,
    reviewsCount: 165,
    image: "https://picsum.photos/seed/michellenails/300/300",
    socials: { instagram: "https://instagram.com/michelle_nailz" }
  }
];

export const SALON_REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Aishwarya Shenoy",
    rating: 5,
    comment: "Undoubtedly the absolute best salon in Panjim! Priya Fernandes worked wonders on my hair with a warm caramel Balayage. The layout is incredibly elegant and peaceful.",
    date: "2026-05-18",
    service: "French Balayage",
    verified: true
  },
  {
    id: "rev-2",
    name: "Elena Gonsalves",
    rating: 5,
    comment: "Ananya Sharma did my Bridal Makeup for my destination beach wedding in Goa. I have never felt more radiant! It lasted throughout the humid night without a spot.",
    date: "2026-05-30",
    service: "The Look Book Signature Bridal Makeover",
    verified: true
  },
  {
    id: "rev-3",
    name: "Kabir Mehta",
    rating: 5,
    comment: "Extremely clean and refined luxury ambience. Samir Naik gave me a pristine, modern slick crop fade and an extremely relaxing head massage. Highly recommended!",
    date: "2026-06-02",
    service: "Luxury Signature Haircut",
    verified: true
  },
  {
    id: "rev-4",
    name: "Roshni Sawant",
    rating: 5,
    comment: "Splendid lavender gel manicure and pedal spa! Michelle is an absolute artist with chrome designs and the massage chair is amazing.",
    date: "2026-06-04",
    service: "Signature French Gel Manicure",
    verified: true
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Unlocking Flawless Hair Rules in Goan Coastal Humidities",
    excerpt: "Coastal moisture can leave locks wild and unstable. Read our elite stylist tips to seal cuticles and elevate your glass hair shine.",
    category: "Hair Care",
    readTime: "4 mins read",
    date: "June 03, 2026",
    image: "https://picsum.photos/seed/coastalhair/600/400",
    content: `Living on the stunning beaches of Panaji or Calangute is a beautiful dream, but coastal Goan sea salt breeze and tropical humidity can test any pristine hairstyle. When humidity levels push past 80%, porous hair shafts rapidly drink moisture from the air, swelling and developing unruly frizz. 

In this comprehensive editorial, our Creative Director Priya Fernandes outlines the four core pillars of high-moisture hair protection:

1. **Hydration First, Styling Second**: Counter-intuitively, frizzy hair is actually thirsty hair seeking moisture. By integrating a nutrient-heavy lipid barrier like our Advanced Brazilian Keratin repair products, you saturate the inner cortex, preventing external air-moisture from forcing the fiber to swell.
2. **Seal with Organic Argan or Marula Oils**: Always wrap your blowouts in lightweight protective oils. These act as water-repellant barriers that lock styled geometric patterns in place.
3. **Use Thermal Shield Elixirs**: Thermal styling without premium shields opens the cuticles, leaving them permanently vulnerable to moisture absorption.
4. **Schedule Monthly Volcanic Mineral Spas**: A high-mineral mud scalp wrap resets standard oil balances, supporting smooth silk results from the roots.`
  },
  {
    id: "blog-2",
    title: "Ultimate 2026 Goan Destination Bridal Trend Guide",
    excerpt: "From dewy ocean sunsets to active royal mandaps. Explore our breakdown of dewy Airbrush designs, skin-undertone curation, and long-form locks.",
    category: "Bridal Consultation",
    readTime: "6 mins read",
    date: "May 25, 2026",
    image: "https://picsum.photos/seed/goawedding/600/400",
    content: `Destination weddings are timeless occurrences. However, bridal makeup in beach setups requires custom expertise. Traditional heavy creams easily dissolve under sea mist of Goa's coastal winds. 

Our Principal Bridal Artist Ananya Sharma shares the secrets behind the dewy, everlasting beach-side glowing layouts:

- **HD Airbrush Contouring over Heavy Foundations**: Airbrush cosmetics embed micro-droplets that form a highly durable, featherlight mesh on the dermal cells, offering complete sweat and teardrop waterproof protection.
- **Warm Rose-Gold and Sunset Terracotta Palettes**: Align your bridal shades beautifully with Goa's sunset hues. The reflection of gold pigments coordinates gorgeously with outdoor shore lighting.
- **Pre-Wedding Collagen Dermal Rituals**: We recommend initiating professional oxygen hydrations and botanical purifiers 14 days before your primary event to establish a flawless, naturally radiant base.`
  }
];

export const PROMO_OFFERS: PromoOffer[] = [
  {
    id: "promo-monsoon",
    title: "Tropical Goa Monsoon Wellness Package",
    discount: "20% OFF",
    code: "MONSOON20",
    description: "Indulge in a premium Luxury Hair Spa paired with any 24K Gold Facial to combat weather stressors.",
    category: "Combos",
    expiry: "July 31, 2026"
  },
  {
    id: "promo-bridal",
    title: "Royal Beach Destination Bridal Special",
    discount: "SAVE ₹5,000",
    code: "ROYALBRIDAL",
    description: "Book our absolute Signature Bridal Styling package and receive 2 complimentary bridesmaid blowout vouchers.",
    category: "Bridal",
    expiry: "Dec 31, 2026"
  },
  {
    id: "promo-nails",
    title: "Dynamic Nail Chrome Festival Flash Deal",
    discount: "FREE Gel Art Upgrade",
    code: "GELCHROME",
    description: "Purchase any Custom Polygel or Acrylic extensions and get futuristic holographic chrome artwork styled free.",
    category: "Nails",
    expiry: "June 25, 2026"
  }
];

export const SALON_TIMELINE = [
  {
    year: "2018",
    title: "Opening the Sanctuary",
    description: "Inaugurated our boutique salon in Panjim's historic heart nearby Altinho, introducing European-standard styling."
  },
  {
    year: "2020",
    title: "Best Luxury Salon Award",
    description: "Lauded by Goan Lifestyle Circle with the 'Signature Luxury Ambience and Styling Craftsmanship of the Year'."
  },
  {
    year: "2023",
    title: "The Ultimate Bridal Wing",
    description: "Expanded our premises to house a dedicated state-of-the-art Royal Bridal Suite for intimate private bookings."
  },
  {
    year: "2026",
    title: "AI & Smart Salon Pioneers",
    description: "Integrated real-time AI computer vision Hair Style Simulations to preview personalized luxury matches ahead of booking."
  }
];

export const GALLERY_ITEMS = [
  {
    id: "gal-1",
    category: "Hair Transformations",
    title: "Vibrant Blonde Melt",
    image: "https://picsum.photos/seed/hairtrans1/800/1000",
    beforeImage: "https://picsum.photos/seed/hairbefore1/800/1000"
  },
  {
    id: "gal-2",
    category: "Hair Colour",
    title: "Midnight Plum Highlights",
    image: "https://picsum.photos/seed/haircolourplum/800/1000",
    beforeImage: "https://picsum.photos/seed/hairbeforeplum/800/1000"
  },
  {
    id: "gal-3",
    category: "Bridal Makeup",
    title: "Royal Goan Bridal Glow",
    image: "https://picsum.photos/seed/makeupbridalout/800/1000",
    beforeImage: "https://picsum.photos/seed/makeupbridalbefore/800/1000"
  },
  {
    id: "gal-4",
    category: "Salon Interior",
    title: "The VIP Golden Styling Lounge",
    image: "https://picsum.photos/seed/saloninterior/800/1000"
  },
  {
    id: "gal-5",
    category: "Client Results",
    title: "Glossy Advanced Keratin Smooth",
    image: "https://picsum.photos/seed/keratinsmoothy/800/1000",
    beforeImage: "https://picsum.photos/seed/keratinbefore/800/1000"
  },
  {
    id: "gal-6",
    category: "Beauty Treatments",
    title: "Dewy 24K Gold Cellular Refresh",
    image: "https://picsum.photos/seed/goldrefresh/800/1000"
  }
];

export const GIFT_CARDS_PRESETS = [
  {
    id: "card-luxe",
    name: "Luxury Rose Elegance",
    bgClass: "bg-gradient-to-br from-[#FFF0F2] via-[#FFC0CB] to-[#F3E8FF] text-pink-900 border-pink-200",
    desc: "Perfect for intimate beauty and premium body sessions"
  },
  {
    id: "card-royal",
    name: "Royal Navy & Sapphire",
    bgClass: "bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#60A5FA] text-white border-blue-400",
    desc: "The ultimate signature package gifting for VIPs"
  },
  {
    id: "card-glam",
    name: "Minimalist Opal Dream",
    bgClass: "bg-gradient-to-br from-white via-slate-50 to-[#E9D5FF] text-slate-800 border-purple-200",
    desc: "A soft, beautiful surprise layout for birthdays and holidays"
  }
];
