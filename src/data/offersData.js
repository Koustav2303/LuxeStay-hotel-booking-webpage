// src/data/offersData.js

export const offersData = [
  {
    id: "honeymoon-escape", // Changed to string for cleaner URLs
    title: "The Ultimate Honeymoon Escape",
    category: "Romance",
    image: "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/168/2025/05/28061910/Honeymoon-Escapade_shutterstock_1881529978.jpg",
    description: "Celebrate your love with a complimentary room upgrade, a romantic 5-course beachfront dinner, and a couples' spa retreat.",
    originalPrice: 3500,
    offerPrice: 2800,
    validUntil: "Dec 31, 2026",
    badge: "Most Popular",
    // --- NEW DETAILED FIELDS ---
    minimumStay: "3 Nights",
    fullDescription: "Begin your forever in absolute paradise. The Ultimate Honeymoon Escape is meticulously crafted to offer unparalleled privacy and romance. Wake up to the sound of gentle waves, enjoy breakfast on your private terrace, and let our dedicated concierge arrange every detail of your stay—from scattered rose petals to private sunset cruises.",
    inclusions: [
      "Complimentary upgrade to a Premium Ocean View Suite",
      "5-course candlelight beachfront dinner with private butler",
      "90-minute signature couples' massage at the Luxe Spa",
      "Chilled bottle of vintage Champagne upon arrival",
      "Private airport transfers in a luxury SUV"
    ],
    terms: "Subject to availability. Marriage certificate required upon check-in (valid within 6 months of wedding). Non-refundable deposit required."
  },
  {
    id: "wellness-retreat",
    title: "Weekend Wellness Retreat",
    category: "Spa & Wellness",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop",
    description: "Rejuvenate your mind and body. Includes a 2-night stay, daily detox breakfast, and unlimited access to our thermal baths and yoga sessions.",
    originalPrice: 1800,
    offerPrice: 1250,
    validUntil: "Nov 15, 2026",
    badge: "Limited Time",
    // --- NEW DETAILED FIELDS ---
    minimumStay: "2 Nights",
    fullDescription: "Escape the relentless pace of modern life and step into a sanctuary of holistic healing. Our Weekend Wellness Retreat is designed to restore your natural balance. Work with our expert wellness practitioners to reset your body through guided meditation, thermal hydrotherapy, and nourishing, chef-prepared organic cuisine.",
    inclusions: [
      "2-night stay in a serene Garden View Room",
      "Daily personalized detox breakfast and wellness shots",
      "Unlimited access to the Thermal Hydrotherapy Circuit",
      "Two guided sunrise yoga and meditation sessions",
      "One 60-minute personalized wellness consultation"
    ],
    terms: "Bookings must be made 7 days in advance. Spa appointments are subject to scheduling availability."
  },
  {
    id: "advance-purchase",
    title: "Advance Purchase Special",
    category: "Rooms & Suites",
    image: "https://idobridalcouture.com/cdn/shop/articles/maxresdefault-930387.jpg?v=1684433550",
    description: "Plan ahead and enjoy up to 25% off our Best Available Rate when you book your luxury suite at least 60 days in advance.",
    originalPrice: 1000,
    offerPrice: 750,
    validUntil: "Ongoing",
    badge: "Save 25%",
    // --- NEW DETAILED FIELDS ---
    minimumStay: "1 Night",
    fullDescription: "Foresight has its privileges. Secure your place at LuxeStay ahead of time and unlock our most competitive rates. Whether you're planning a critical business trip or a well-deserved family vacation, booking early ensures you get the exact suite you desire while enjoying significant savings.",
    inclusions: [
      "Up to 25% discount on the Best Available Rate",
      "Priority room assignment and early check-in (subject to availability)",
      "Complimentary high-speed Wi-Fi and valet parking",
      "Access to the exclusive Member's Lounge"
    ],
    terms: "Full prepayment required at the time of booking. Entirely non-refundable and dates cannot be modified. Must book at least 60 days prior to arrival."
  },
  {
    id: "culinary-journey",
    title: "The Culinary Journey",
    category: "Fine Dining",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
    description: "A feast for the senses. Enjoy a 3-night stay combined with an exclusive tasting menu curated by our Michelin-starred Executive Chef.",
    originalPrice: 4200,
    offerPrice: 3600,
    validUntil: "Oct 30, 2026",
    badge: "Exclusive",
    // --- NEW DETAILED FIELDS ---
    minimumStay: "3 Nights",
    fullDescription: "Embark on an epicurean adventure that will redefine your palate. The Culinary Journey marries luxury accommodation with world-class gastronomy. Gain exclusive access to our Chef's Table, where seasonal, locally sourced ingredients are transformed into edible masterpieces, perfectly paired with rare vintages from our award-winning cellar.",
    inclusions: [
      "3-night stay in a Signature Suite",
      "7-course Chef's Tasting Menu at 'L’Horizon' for two",
      "Premium wine pairing guided by our Head Sommelier",
      "Private kitchen tour and meet-and-greet with the Executive Chef",
      "Daily artisanal breakfast in bed"
    ],
    terms: "Dietary restrictions must be communicated at least 14 days prior to arrival. Dinner reservations must be confirmed at the time of booking."
  }
];