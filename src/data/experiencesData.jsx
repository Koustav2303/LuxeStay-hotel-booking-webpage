import React from 'react';
import { Compass, Palmtree, MapPin, Music, Utensils } from 'lucide-react';

export const categories = [
  { id: 'all', label: 'All Experiences', icon: <Compass /> },
  { id: 'dining', label: 'Fine Dining', icon: <Utensils /> },
  { id: 'wellness', label: 'Wellness & Spa', icon: <Palmtree /> },
  { id: 'adventure', label: 'Adventure', icon: <MapPin /> },
  { id: 'events', label: 'Events & Nightlife', icon: <Music /> },
];

export const allExperiences = [
  {
    id: 1,
    title: "Sunset Yacht Cruise",
    category: "adventure",
    price: 350,
    duration: "4 Hours",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    description: "Sail across the Arabian Gulf on a private 50ft yacht. Enjoy champagne, canapés, and a front-row seat to the most spectacular sunset in Dubai.",
    itinerary: ["5:00 PM - Boarding & Welcome Drinks", "6:00 PM - Sunset Views", "7:00 PM - Gourmet Dinner on Deck", "9:00 PM - Return to Harbor"]
  },
  {
    id: 2,
    title: "Michelin Star Chef's Table",
    category: "dining",
    price: 280,
    duration: "3 Hours",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop",
    description: "An exclusive 7-course tasting menu prepared right in front of you by our celebrity chef. Each course is paired with rare vintage wines.",
    itinerary: ["Welcome Aperitif", "Kitchen Tour", "7-Course Tasting", "Meet the Chef"]
  },
  {
    id: 3,
    title: "Golden Hour Yoga",
    category: "wellness",
    price: 80,
    duration: "90 Mins",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544367563-12123d8966cd?q=80&w=2070&auto=format&fit=crop",
    description: "Restore your balance with a guided yoga session on our private beach deck as the sun rises. Includes a healthy detox breakfast post-session.",
    itinerary: ["6:00 AM - Session Start", "7:30 AM - Meditation", "8:00 AM - Detox Breakfast"]
  },
  {
    id: 4,
    title: "Desert Safari & Stargazing",
    category: "adventure",
    price: 150,
    duration: "6 Hours",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=2070&auto=format&fit=crop",
    description: "Venture into the dunes in a vintage Land Rover. Enjoy a traditional Bedouin dinner under the stars with a professional astronomer guide.",
    itinerary: ["3:00 PM - Pickup", "4:30 PM - Dune Bashing", "6:00 PM - Camel Ride", "8:00 PM - Dinner & Astronomy"]
  },
  {
    id: 5,
    title: "Jazz Night at The Vault",
    category: "events",
    price: 120,
    duration: "Late Night",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1887&auto=format&fit=crop",
    description: "Experience the city's best live jazz in our speakeasy bar. Entry includes two signature cocktails and a selection of gourmet tapas.",
    itinerary: ["9:00 PM - Doors Open", "10:00 PM - Live Band Starts", "12:00 AM - DJ Set"]
  },
  {
    id: 6,
    title: "Helicopter City Tour",
    category: "adventure",
    price: 450,
    duration: "25 Mins",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2070&auto=format&fit=crop",
    description: "See the skyline from a new perspective. A thrilling helicopter ride over the Palm Jumeirah, Burj Khalifa, and the World Islands.",
    itinerary: ["Pre-flight Briefing", "25 Min Flight", "Photo Opportunity", "Return Transfer"]
  }
];