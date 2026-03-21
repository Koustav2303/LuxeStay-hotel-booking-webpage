import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('luxeStayUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('luxeStayUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('luxeStayUser');
    }
  }, [user]);

  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem('luxeStayBookings');
    if (savedBookings) {
      return JSON.parse(savedBookings);
    }
    
    return [
      {
        id: "101",
        type: "hotel",
        status: "Confirmed",
        statusColor: "text-yellow-600 bg-yellow-100",
        title: "Royal Ocean Suite",
        location: "Palm Jumeirah, Dubai, UAE",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop", 
        dateStart: "Oct 15, 2026",
        dateEnd: "Oct 18, 2026",
        timeStart: "3:00 PM (Check-in)",
        timeEnd: "11:00 AM (Check-out)",
        guests: "2 Adults, 1 Child",
        description: "1x Royal Ocean Suite (Ocean View)",
        contact: "+91 7501795902",
        pricePerUnit: 850,
        unitName: "Nights",
        quantity: 3,
        taxes: 306,
        total: 2856,
        card: "4242",
        hasReviewed: false // NEW FLAG
      },
      {
        id: "102",
        type: "experience",
        status: "Completed",
        statusColor: "text-gray-600 bg-gray-200",
        title: "Golden Hour Yoga",
        location: "Private Beach Deck, Dubai, UAE",
        image: "https://images.unsplash.com/photo-1544367563-12123d8966cd?q=80&w=2070&auto=format&fit=crop", 
        dateStart: "Jan 10, 2026",
        dateEnd: "Jan 10, 2026",
        timeStart: "6:00 AM (Start)",
        timeEnd: "8:00 AM (End)",
        guests: "1 Person",
        description: "Private Sunrise Yoga & Detox Session",
        contact: "Guide: Sarah (+971 50 123 4567)",
        pricePerUnit: 80,
        unitName: "Ticket",
        quantity: 1,
        taxes: 6.40,
        total: 86.40,
        card: "5555",
        hasReviewed: false // NEW FLAG
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('luxeStayBookings', JSON.stringify(bookings));
  }, [bookings]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  
  const addBooking = (newBooking) => setBookings((prevBookings) => [newBooking, ...prevBookings]);
  const deleteBooking = (bookingId) => setBookings((prevBookings) => prevBookings.filter(b => b.id !== bookingId));
  
  // NEW: Function to update an existing booking (like marking it as reviewed)
  const updateBooking = (bookingId, updatedData) => {
    setBookings((prevBookings) => 
      prevBookings.map(b => b.id === bookingId ? { ...b, ...updatedData } : b)
    );
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, bookings, addBooking, deleteBooking, updateBooking }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);