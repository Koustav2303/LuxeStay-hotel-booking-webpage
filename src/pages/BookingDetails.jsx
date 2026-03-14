import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Users, CreditCard, Download, QrCode, Building, Phone, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Fetch from global brain

const BookingDetails = () => {
  const { id } = useParams();
  const { bookings, user } = useAuth(); // Pull global bookings
  
  // Find the exact booking based on ID
  const booking = bookings.find(b => b.id === id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Booking Not Found</h2>
        <Link to="/profile" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-yellow-600 transition-colors">Return to Profile</Link>
      </div>
    );
  }

  // --- DOWNLOAD INVOICE FUNCTION ---
  const handleDownloadInvoice = () => {
    // 1. Create a beautifully formatted text receipt
    const invoiceText = `
================================================
           LUXESTAY OFFICIAL INVOICE
================================================
BOOKING REFERENCE : #${booking.id}A79X
STATUS            : ${booking.status.toUpperCase()}
ISSUE DATE        : ${new Date().toLocaleDateString()}

--- CUSTOMER DETAILS ---
Name              : ${user?.name || 'Guest'}
Email             : ${user?.email || 'N/A'}
Contact           : ${booking.contact}

--- RESERVATION DETAILS ---
Item/Property     : ${booking.title}
Location          : ${booking.location}
Dates             : ${booking.dateStart} to ${booking.dateEnd}
Guests            : ${booking.guests}
Details           : ${booking.description}

--- PAYMENT SUMMARY ---
Rate              : $${booking.pricePerUnit.toFixed(2)} x ${booking.quantity} ${booking.unitName}
Subtotal          : $${(booking.pricePerUnit * booking.quantity).toFixed(2)}
Taxes & Fees      : $${booking.taxes.toFixed(2)}
------------------------------------------------
TOTAL AMOUNT PAID : $${booking.total.toFixed(2)}
------------------------------------------------
Payment Method    : Card ending in ${booking.card}

================================================
 Thank you for choosing LuxeStay. Safe travels!
================================================
    `;

    // 2. Turn it into a file (Blob)
    const blob = new Blob([invoiceText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // 3. Create a fake link to trigger the browser download
    const link = document.createElement('a');
    link.href = url;
    link.download = `LuxeStay_Invoice_${booking.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 pt-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link to="/profile" className="inline-flex items-center gap-2 text-gray-500 hover:text-slate-900 font-bold mb-8 transition-colors"><ArrowLeft className="w-5 h-5" /> Back to Profile</Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${booking.statusColor}`}>{booking.status}</span>
              <span className="text-sm font-mono text-gray-500">Booking ID: #{booking.id}A79X</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">Your Itinerary</h1>
          </div>
          
          {/* INVOICE BUTTON */}
          <button onClick={handleDownloadInvoice} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-yellow-600 transition-colors flex items-center gap-2 shadow-lg">
            <Download className="w-5 h-5" /> Download Invoice
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="h-64 md:h-80 w-full relative">
            <img src={booking.image} className={`w-full h-full object-cover ${booking.status === 'Completed' ? 'grayscale opacity-90' : ''}`} alt={booking.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 text-white pr-6"><h2 className="text-3xl font-serif font-bold">{booking.title}</h2><p className="flex items-center gap-2 mt-2 opacity-90"><MapPin className="w-4 h-4" /> {booking.location}</p></div>
          </div>

          <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-8">
              <div className="grid grid-cols-2 gap-6 pb-8 border-b border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold mb-1">{booking.type === 'hotel' ? 'Check-in' : 'Start Date'}</p>
                  <p className="font-bold text-slate-900 text-lg flex items-center gap-2"><Calendar className="w-4 h-4 text-yellow-600" /> {booking.dateStart}</p>
                  <p className="text-sm text-gray-500">{booking.timeStart}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold mb-1">{booking.type === 'hotel' ? 'Check-out' : 'End Date'}</p>
                  <p className="font-bold text-slate-900 text-lg flex items-center gap-2"><Calendar className="w-4 h-4 text-yellow-600" /> {booking.dateEnd}</p>
                  <p className="text-sm text-gray-500">{booking.timeEnd}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Reservation Details</h3>
                <div className="bg-slate-50 p-6 rounded-2xl space-y-4 border border-gray-100">
                  <div className="flex items-center gap-4 text-gray-600"><Users className="w-5 h-5 text-gray-400" /> <span className="font-bold">{booking.guests}</span></div>
                  <div className="flex items-center gap-4 text-gray-600"><Building className="w-5 h-5 text-gray-400" /> <span>{booking.description}</span></div>
                  <div className="flex items-center gap-4 text-gray-600"><Phone className="w-5 h-5 text-gray-400" /> <span>{booking.contact}</span></div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-2xl flex flex-col items-center justify-center border border-gray-100 text-center">
                <QrCode className={`w-32 h-32 mb-4 ${booking.status === 'Completed' ? 'text-gray-300' : 'text-slate-900'}`} />
                <p className="text-sm font-bold text-slate-900">{booking.status === 'Completed' ? 'Code Expired' : 'Scan at Reception'}</p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-4">Payment Summary</h3>
                <div className="space-y-2 text-sm text-gray-600 pb-4 border-b border-gray-100">
                  <div className="flex justify-between"><span>${booking.pricePerUnit} x {booking.quantity} {booking.unitName}</span><span className="font-medium">${(booking.pricePerUnit * booking.quantity).toLocaleString(undefined, {minimumFractionDigits: 2})}</span></div>
                  <div className="flex justify-between"><span>Taxes & Fees</span><span className="font-medium">${booking.taxes.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></div>
                </div>
                <div className="flex justify-between items-center pt-4 mb-4"><span className="font-bold text-slate-900">Total Paid</span><span className="text-2xl font-bold text-slate-900">${booking.total.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></div>
                <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100"><CreditCard className="w-4 h-4" /> Paid via Card ending in {booking.card}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;