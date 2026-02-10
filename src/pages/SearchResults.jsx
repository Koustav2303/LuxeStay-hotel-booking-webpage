import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MapPin, Star, ArrowLeft } from 'lucide-react';

const allHotels = [
  { id: 1, name: "The Royal Atlantis", location: "Dubai, UAE", price: 850, rating: 4.9, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop" },
  { id: 2, name: "Grand Hotel Tremezzo", location: "Lake Como, Italy", price: 1200, rating: 5.0, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop" },
  { id: 3, name: "Four Seasons Bora Bora", location: "Bora Bora, French Polynesia", price: 1500, rating: 4.9, image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2030&auto=format&fit=crop" },
  { id: 4, name: "Amangiri Resort", location: "Utah, USA", price: 2100, rating: 4.8, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop" }
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const locationQuery = searchParams.get('location')?.toLowerCase() || '';
  
  // Filter hotels based on the location search
  const filteredHotels = allHotels.filter(hotel => 
    hotel.location.toLowerCase().includes(locationQuery) || 
    hotel.name.toLowerCase().includes(locationQuery)
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 px-6">
      <div className="container mx-auto">
        
        {/* Header */}
        <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-3xl font-serif font-bold text-slate-900">
                {filteredHotels.length > 0 
                    ? `Stays in "${searchParams.get('location') || 'All'}"` 
                    : `No results found for "${locationQuery}"`}
            </h1>
            <p className="text-gray-500">{filteredHotels.length} properties found</p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredHotels.map(hotel => (
                <Link key={hotel.id} to={`/hotels/${hotel.id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                    <div className="relative h-64 overflow-hidden">
                        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {hotel.rating}
                        </div>
                    </div>
                    <div className="p-5">
                        <h3 className="text-lg font-bold text-slate-900">{hotel.name}</h3>
                        <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" /> {hotel.location}
                        </p>
                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                            <span className="font-bold text-slate-900">${hotel.price} <span className="text-gray-400 font-normal text-xs">/night</span></span>
                            <span className="text-xs font-bold underline text-yellow-600">View Deal</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;