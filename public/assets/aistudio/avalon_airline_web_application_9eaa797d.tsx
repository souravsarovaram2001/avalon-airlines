import React, { useState, useEffect } from 'react';
import {
  Plane,
  Luggage,
  ShieldCheck,
  Globe,
  Box,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Calendar,
  MapPin,
  TrendingUp,
  Leaf,
  Briefcase,
  Search,
  Menu,
  X,
  ChevronRight,
  CreditCard,
  Sparkles,
  Clock,
  ChevronDown,
  Building,
  Coffee,
  Check,
  Zap,
  Phone,
  Mail,
  QrCode,
  Download,
  Share2,
  RefreshCw,
  Package,
  Truck,
  Layers,
  Percent,
  Sliders,
  DollarSign
} from 'lucide-react';

// --- MOCK DATA ---
const DESTINATIONS = [
  { id: 'JED', name: 'Jeddah', code: 'JED', country: 'Saudi Arabia', title: 'Red Sea Gateway', flightTime: '1h 35m', dailyFlights: 8, cargoCap: '4.5 Tons/flight', price: 290, image: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=800&q=80' },
  { id: 'DMM', name: 'Dammam', code: 'DMM', country: 'Saudi Arabia', title: 'Eastern Industrial Hub', flightTime: '1h 05m', dailyFlights: 5, cargoCap: '4.5 Tons/flight', price: 180, image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=800&q=80' },
  { id: 'DXB', name: 'Dubai', code: 'DXB', country: 'UAE', title: 'Gulf Commercial Center', flightTime: '1h 50m', dailyFlights: 6, cargoCap: '5.0 Tons/flight', price: 420, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80' },
  { id: 'CAI', name: 'Cairo', code: 'CAI', country: 'Egypt', title: 'North Africa Megacity', flightTime: '2h 45m', dailyFlights: 4, cargoCap: '4.0 Tons/flight', price: 510, image: 'https://images.unsplash.com/photo-1572252821143-02f5a6c3f683?auto=format&fit=crop&w=800&q=80' },
  { id: 'BOM', name: 'Mumbai', code: 'BOM', country: 'India', title: 'South Asia Financial Capital', flightTime: '4h 15m', dailyFlights: 3, cargoCap: '6.0 Tons/flight', price: 790, image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80' }
];

const MOCK_FLIGHTS = [
  { id: 'AV-102', origin: 'RUH', dest: 'JED', departure: '07:30', arrival: '09:05', duration: '1h 35m', aircraft: 'Airbus A320neo', price: 290 },
  { id: 'AV-104', origin: 'RUH', dest: 'JED', departure: '13:15', arrival: '14:50', duration: '1h 35m', aircraft: 'Airbus A320neo', price: 340 },
  { id: 'AV-108', origin: 'RUH', dest: 'JED', departure: '19:40', arrival: '21:15', duration: '1h 35m', aircraft: 'Airbus A320neo', price: 310 },
  { id: 'AV-201', origin: 'RUH', dest: 'DXB', departure: '08:00', arrival: '10:50', duration: '1h 50m', aircraft: 'Airbus A320neo', price: 420 },
  { id: 'AV-205', origin: 'RUH', dest: 'DXB', departure: '16:30', arrival: '19:20', duration: '1h 50m', aircraft: 'Airbus A320neo', price: 480 },
  { id: 'AV-301', origin: 'RUH', dest: 'DMM', departure: '06:15', arrival: '07:20', duration: '1h 05m', aircraft: 'Airbus A320neo', price: 180 },
  { id: 'AV-401', origin: 'RUH', dest: 'CAI', departure: '10:10', arrival: '12:55', duration: '2h 45m', aircraft: 'Airbus A320neo', price: 510 },
  { id: 'AV-501', origin: 'RUH', dest: 'BOM', departure: '22:30', arrival: '04:45 (+1)', duration: '4h 15m', aircraft: 'Airbus A320neo', price: 790 }
];

const CARGO_TRACKING_DB = {
  'AV-CARGO-884920': {
    status: 'In Transit',
    origin: 'Riyadh (RUH)',
    destination: 'Dubai (DXB)',
    flight: 'AV-201',
    weight: '1,240 kg',
    type: 'Pharmaceuticals (Cold Chain)',
    eta: 'Today, 10:50 GST',
    history: [
      { step: 'Acceptance at RUH Terminal', time: '04:30 AST', done: true },
      { step: 'Customs Clearance & Screening', time: '05:45 AST', done: true },
      { step: 'Loaded onto Airbus A320neo', time: '07:15 AST', done: true },
      { step: 'Flight Departed RUH', time: '08:00 AST', done: true },
      { step: 'Arriving at DXB Cargo Hub', time: '10:50 GST', done: false }
    ]
  }
};

export default function App() {
  // Navigation & Drawer State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currency, setCurrency] = useState('SAR');

  // Booking Flow State
  const [tripType, setTripType] = useState('roundTrip');
  const [origin] = useState({ code: 'RUH', name: 'Riyadh (RUH)' });
  const [selectedDest, setSelectedDest] = useState('JED');
  const [departDate, setDepartDate] = useState('2026-12-01');
  const [returnDate, setReturnDate] = useState('2026-12-08');
  const [passengers, setPassengers] = useState(1);
  const [activeBookingStep, setActiveBookingStep] = useState(0); // 0: Hidden/Closed, 1: Select Flight/Fare, 2: Ancillaries, 3: Passenger & Checkout, 4: Confirmed E-Ticket Modal

  // Flight Selection State
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [fareTier, setFareTier] = useState('flex'); // 'value', 'flex', 'premium'

  // Ancillaries State
  const [ancillaries, setAncillaries] = useState({
    seatType: 'standard', // 'standard', 'extraLegroom' (+100 SAR), 'premiumFront' (+180 SAR)
    extraBaggage: 0, // count of 23kg bags (+120 SAR each)
    mealUpgrade: false, // +65 SAR
    fastTrack: false // +130 SAR
  });

  // Passenger Info State
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: 'Mohammed',
    lastName: 'Al-Mansoor',
    email: 'm.almansoor@example.com',
    phone: '+966 50 123 4567',
    passport: 'S9841204'
  });

  // Cargo Tracker State
  const [trackingId, setTrackingId] = useState('AV-CARGO-884920');
  const [trackingResult, setTrackingResult] = useState(CARGO_TRACKING_DB['AV-CARGO-884920']);
  const [cargoSearchError, setCargoSearchError] = useState('');

  // Cargo Calculator State
  const [cargoCalc, setCargoCalc] = useState({ weight: 250, type: 'general', origin: 'RUH', dest: 'DXB' });
  const [calculatedQuote, setCalculatedQuote] = useState(null);

  // Sustainability View Toggle
  const [sustainabilityTab, setSustainabilityTab] = useState('fleet');

  // Newsletter Toast
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Scroll listener for glassmorphism header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Price conversion helper
  const formatPrice = (amountInSAR) => {
    if (currency === 'USD') return `$${Math.round(amountInSAR / 3.75)}`;
    if (currency === 'EUR') return `€${Math.round(amountInSAR / 4.05)}`;
    return `${amountInSAR.toLocaleString()} SAR`;
  };

  // Base flight search starter
  const handleStartBooking = (destCodeOverride) => {
    const destToUse = destCodeOverride || selectedDest;
    if (destCodeOverride) setSelectedDest(destCodeOverride);
    
    // Pick default flight for route
    const available = MOCK_FLIGHTS.filter(f => f.dest === destToUse);
    setSelectedFlight(available[0] || MOCK_FLIGHTS[0]);
    setActiveBookingStep(1);
    
    const element = document.getElementById('booking-engine');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate Total Booking Price
  const computeTotalPrice = () => {
    if (!selectedFlight) return 0;
    let base = selectedFlight.price;
    if (fareTier === 'flex') base += 110;
    if (fareTier === 'premium') base += 450;

    let ancillariesTotal = 0;
    if (ancillaries.seatType === 'extraLegroom') ancillariesTotal += 100;
    if (ancillaries.seatType === 'premiumFront') ancillariesTotal += 180;
    ancillariesTotal += ancillaries.extraBaggage * 120;
    if (ancillaries.mealUpgrade) ancillariesTotal += 65;
    if (ancillaries.fastTrack) ancillariesTotal += 130;

    const multiplier = tripType === 'roundTrip' ? 1.85 : 1.0;
    return Math.round((base * passengers * multiplier) + ancillariesTotal);
  };

  // Handle Cargo Search
  const handleCargoSearch = (e) => {
    e.preventDefault();
    if (CARGO_TRACKING_DB[trackingId.trim()]) {
      setTrackingResult(CARGO_TRACKING_DB[trackingId.trim()]);
      setCargoSearchError('');
    } else {
      setCargoSearchError('Air Waybill not found. Try sample AWBN: AV-CARGO-884920');
    }
  };

  // Cargo Calculator
  const handleCalculateCargo = (e) => {
    e.preventDefault();
    const ratePerKg = cargoCalc.type === 'pharma' ? 14.5 : cargoCalc.type === 'express' ? 18.0 : 8.5;
    const est = cargoCalc.weight * ratePerKg + 150; // base handling
    setCalculatedQuote(Math.round(est));
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 font-sans selection:bg-sky-500 selection:text-white">

      {/* --- TOAST NOTIFICATION --- */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-sky-500 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-sky-400 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* --- HEADER & NAVIGATION --- */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#0B132B]/90 backdrop-blur-md shadow-xl border-b border-slate-800/80 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-amber-400 p-0.5 shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0B132B] rounded-[10px] flex items-center justify-center">
                <Plane className="w-5 h-5 text-sky-400 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black tracking-widest text-white uppercase font-sans">
                AVALON
              </span>
              <span className="block text-[9px] tracking-widest text-amber-400 font-semibold uppercase -mt-1">
                AIRLINES • RIYADH
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-sky-400 transition-colors">Book Flights</a>
            <a href="#routes" className="hover:text-sky-400 transition-colors">Route Network</a>
            <a href="#hybrid" className="hover:text-sky-400 transition-colors">Hybrid Model</a>
            <a href="#cargo" className="hover:text-sky-400 transition-colors">Cargo & Logistics</a>
            <a href="#sustainability" className="hover:text-sky-400 transition-colors">Sustainability & Fleet</a>
          </nav>

          {/* Right Controls */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Currency Selector */}
            <div className="relative">
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-slate-900/80 border border-slate-700/70 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-medium focus:outline-none focus:border-sky-400 cursor-pointer"
              >
                <option value="SAR">SAR (﷼)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>

            <button 
              onClick={() => handleStartBooking('JED')}
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Manage / Book Flight
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden text-slate-300 hover:text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0B132B]/95 backdrop-blur-xl lg:hidden pt-24 px-6 flex flex-col justify-between pb-8">
          <div className="space-y-6 text-lg font-medium">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-sky-400">Book Flights</a>
            <a href="#routes" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-sky-400">Route Network</a>
            <a href="#hybrid" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-sky-400">Hybrid Operating Model</a>
            <a href="#cargo" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-sky-400">Cargo & Logistics Portal</a>
            <a href="#sustainability" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-sky-400">Sustainability & Investors</a>
          </div>
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <div className="flex justify-between items-center text-sm text-slate-400">
              <span>Currency</span>
              <div className="flex space-x-2">
                {['SAR', 'USD', 'EUR'].map(c => (
                  <button 
                    key={c} 
                    onClick={() => setCurrency(c)}
                    className={`px-3 py-1 rounded-md text-xs font-bold ${currency === c ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <button 
              onClick={() => { setMobileMenuOpen(false); handleStartBooking('JED'); }}
              className="w-full bg-sky-500 text-white font-semibold py-3 rounded-xl shadow-lg"
            >
              Book Now
            </button>
          </div>
        </div>
      )}

      {/* --- 1. HERO & BRAND INTRODUCTION --- */}
      <section id="hero" className="relative pt-32 pb-24 lg:pt-40 lg:pb-36 overflow-hidden">
        {/* Background Aviation Accents */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center space-x-2 bg-slate-800/80 border border-slate-700/80 rounded-full px-4 py-1.5 text-xs text-sky-300 mb-6 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Riyadh's Premier Hybrid Carrier • Saudi Vision 2030 Aligned</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Avalon — <span className="bg-gradient-to-r from-sky-400 via-sky-200 to-amber-300 bg-clip-text text-transparent">Beyond Every Horizon</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Experience ultra-efficient, digitally integrated international air travel radiating from King Khalid International Airport (RUH). High-value passenger comfort combined with agile belly-cargo logistics.
            </p>
          </div>

          {/* Quick Booking Widget Card */}
          <div className="max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-xl border border-slate-700/70 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60 relative">
            
            {/* Trip Type Tabs */}
            <div className="flex items-center space-x-6 mb-6 border-b border-slate-800 pb-4">
              <button 
                onClick={() => setTripType('roundTrip')}
                className={`flex items-center space-x-2 text-sm font-semibold pb-1 transition-colors relative ${tripType === 'roundTrip' ? 'text-sky-400' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <span>Round Trip</span>
                {tripType === 'roundTrip' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400 rounded-full" />}
              </button>
              <button 
                onClick={() => setTripType('oneWay')}
                className={`flex items-center space-x-2 text-sm font-semibold pb-1 transition-colors relative ${tripType === 'oneWay' ? 'text-sky-400' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <span>One Way</span>
                {tripType === 'oneWay' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400 rounded-full" />}
              </button>
              
              <div className="ml-auto hidden sm:flex items-center space-x-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Best Price Guarantee</span>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Origin (Fixed Hub) */}
              <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-3">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-sky-400" />
                  <span>From (Hub)</span>
                </label>
                <div className="mt-1 font-semibold text-white text-sm flex items-center justify-between">
                  <span>Riyadh (RUH)</span>
                  <span className="text-[10px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded font-mono">KSA</span>
                </div>
              </div>

              {/* Destination Dropdown */}
              <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-3 focus-within:border-sky-400 transition-colors">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center space-x-1">
                  <Globe className="w-3 h-3 text-amber-400" />
                  <span>To Destination</span>
                </label>
                <select 
                  value={selectedDest} 
                  onChange={(e) => setSelectedDest(e.target.value)}
                  className="w-full bg-transparent text-white font-semibold text-sm mt-1 focus:outline-none cursor-pointer"
                >
                  {DESTINATIONS.map(d => (
                    <option key={d.code} value={d.code} className="bg-slate-900 text-white">
                      {d.name} ({d.code}) - {d.country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Departure & Return Dates */}
              <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-3">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-sky-400" />
                  <span>Dates</span>
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <input 
                    type="date" 
                    value={departDate} 
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="bg-transparent text-white text-xs font-medium focus:outline-none w-full cursor-pointer"
                  />
                  {tripType === 'roundTrip' && (
                    <input 
                      type="date" 
                      value={returnDate} 
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="bg-transparent text-white text-xs font-medium focus:outline-none w-full cursor-pointer border-l border-slate-700 pl-1"
                    />
                  )}
                </div>
              </div>

              {/* Passengers & Class */}
              <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-3">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center space-x-1">
                  <Users className="w-3 h-3 text-sky-400" />
                  <span>Passengers & Class</span>
                </label>
                <div className="mt-1 flex items-center justify-between text-xs font-semibold text-white">
                  <select 
                    value={passengers} 
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="bg-transparent text-white focus:outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <option key={n} value={n} className="bg-slate-900">{n} Passenger{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                  <span className="text-slate-500">•</span>
                  <select 
                    value={fareTier} 
                    onChange={(e) => setFareTier(e.target.value)}
                    className="bg-transparent text-sky-400 focus:outline-none cursor-pointer"
                  >
                    <option value="value" className="bg-slate-900 text-white">Value Light</option>
                    <option value="flex" className="bg-slate-900 text-white">Flex Corporate</option>
                    <option value="premium" className="bg-slate-900 text-white">Premium Suite</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Action Bar */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4 text-xs text-slate-400">
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Saudi Coffee Included</span>
                </span>
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>High-Speed Wi-Fi</span>
                </span>
              </div>

              <button 
                onClick={() => handleStartBooking()}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold px-8 py-3.5 rounded-2xl shadow-xl shadow-amber-500/20 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Search className="w-4 h-4" />
                <span>Search Flights</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* --- 2. INTERACTIVE FLIGHT SEARCH & MULTI-STEP BOOKING ENGINE --- */}
      {activeBookingStep > 0 && (
        <section id="booking-engine" className="py-16 bg-slate-900/60 border-y border-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Step Header */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Plane className="w-6 h-6 text-sky-400" />
                  <span>Avalon Flight Booking Engine</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Route: Riyadh (RUH) ➔ {DESTINATIONS.find(d => d.code === selectedDest)?.name} ({selectedDest})
                </p>
              </div>

              {/* Multi-step indicator */}
              <div className="flex items-center space-x-2 text-xs">
                <span className={`px-3 py-1 rounded-full font-semibold ${activeBookingStep === 1 ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'}`}>1. Flight & Fare</span>
                <ChevronRight className="w-4 h-4 text-slate-600" />
                <span className={`px-3 py-1 rounded-full font-semibold ${activeBookingStep === 2 ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'}`}>2. Ancillaries</span>
                <ChevronRight className="w-4 h-4 text-slate-600" />
                <span className={`px-3 py-1 rounded-full font-semibold ${activeBookingStep === 3 ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'}`}>3. Checkout</span>
              </div>
            </div>

            {/* STEP 1: SELECT FLIGHT & FARE CATEGORY */}
            {activeBookingStep === 1 && (
              <div className="space-y-8">
                
                {/* Available Flights List */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Select Departure Flight</h3>
                  <div className="space-y-4">
                    {MOCK_FLIGHTS.filter(f => f.dest === selectedDest).map((flight) => (
                      <div 
                        key={flight.id}
                        onClick={() => setSelectedFlight(flight)}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${selectedFlight?.id === flight.id ? 'bg-slate-800 border-sky-400 shadow-lg shadow-sky-500/10' : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'}`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 font-bold text-xs">
                            {flight.id}
                          </div>
                          <div>
                            <div className="flex items-center space-x-3 text-lg font-bold text-white">
                              <span>{flight.departure}</span>
                              <div className="flex items-center space-x-1 text-slate-500 text-xs px-2 py-0.5 bg-slate-800/80 rounded-full">
                                <span>{flight.duration}</span>
                                <ArrowRight className="w-3 h-3 text-sky-400" />
                              </div>
                              <span>{flight.arrival}</span>
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">
                              RUH ➔ {flight.dest} • Direct • {flight.aircraft}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between md:justify-end space-x-4 border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
                          <div className="text-right">
                            <span className="text-xs text-slate-400 block">Starting from</span>
                            <span className="text-xl font-extrabold text-amber-400">{formatPrice(flight.price)}</span>
                          </div>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedFlight?.id === flight.id ? 'border-sky-400 bg-sky-400' : 'border-slate-600'}`}>
                            {selectedFlight?.id === flight.id && <Check className="w-3.5 h-3.5 text-slate-950 font-bold" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fare Tiers Cards */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Choose Your Fare Class</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Value Light */}
                    <div 
                      onClick={() => setFareTier('value')}
                      className={`p-6 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${fareTier === 'value' ? 'bg-slate-800 border-sky-400 ring-2 ring-sky-400/20' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}`}
                    >
                      <div>
                        <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">Value Light</div>
                        <div className="text-2xl font-black text-white mt-1">Baseline</div>
                        <p className="text-xs text-slate-400 mt-2">Essential LCC pricing for light travelers.</p>
                        <ul className="mt-4 space-y-2 text-xs text-slate-300">
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /><span>Standard Ergonomic Seat</span></li>
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /><span>7kg Hand Luggage Only</span></li>
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /><span>Saudi Coffee & Water</span></li>
                          <li className="flex items-center space-x-2 text-slate-500"><X className="w-4 h-4" /><span>No Checked Bag</span></li>
                        </ul>
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between">
                        <span className="text-xs text-slate-400">Included in Base</span>
                        <span className="text-sm font-bold text-white">+ 0 SAR</span>
                      </div>
                    </div>

                    {/* Flex Corporate */}
                    <div 
                      onClick={() => setFareTier('flex')}
                      className={`p-6 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${fareTier === 'flex' ? 'bg-slate-800 border-sky-400 ring-2 ring-sky-400/20' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}`}
                    >
                      <div className="absolute -top-3 right-4 bg-sky-500 text-slate-950 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full">Most Popular</div>
                      <div>
                        <div className="text-xs font-bold uppercase text-sky-400 tracking-wider">Flex Corporate</div>
                        <div className="text-2xl font-black text-white mt-1">Smart Hybrid</div>
                        <p className="text-xs text-slate-400 mt-2">Ideal for business travelers needing flexibility.</p>
                        <ul className="mt-4 space-y-2 text-xs text-slate-300">
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /><span>1x 23kg Checked Bag</span></li>
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /><span>Free Standard Seat Selection</span></li>
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /><span>Free Date Changes (up to 24h)</span></li>
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /><span>High-Speed Wi-Fi Pack</span></li>
                        </ul>
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between">
                        <span className="text-xs text-slate-400">Upgrade</span>
                        <span className="text-sm font-bold text-sky-400">+{formatPrice(110)}</span>
                      </div>
                    </div>

                    {/* Premium Suite */}
                    <div 
                      onClick={() => setFareTier('premium')}
                      className={`p-6 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${fareTier === 'premium' ? 'bg-slate-800 border-amber-400 ring-2 ring-amber-400/20' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}`}
                    >
                      <div>
                        <div className="text-xs font-bold uppercase text-amber-400 tracking-wider">Premium Suite</div>
                        <div className="text-2xl font-black text-white mt-1">Luxury FSNC</div>
                        <p className="text-xs text-slate-400 mt-2">First-class recline comfort with priority service.</p>
                        <ul className="mt-4 space-y-2 text-xs text-slate-300">
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-amber-400" /><span>2x 32kg Checked Baggage</span></li>
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-amber-400" /><span>Front Row Extra Recline Seat</span></li>
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-amber-400" /><span>RUH Lounge Access & Fast Track</span></li>
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-amber-400" /><span>Hot Gourmet Culinary Menu</span></li>
                        </ul>
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between">
                        <span className="text-xs text-slate-400">Premium Upgrade</span>
                        <span className="text-sm font-bold text-amber-400">+{formatPrice(450)}</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Continue button */}
                <div className="flex justify-end pt-4">
                  <button 
                    onClick={() => setActiveBookingStep(2)}
                    className="bg-sky-500 hover:bg-sky-400 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-sky-500/20 flex items-center space-x-2"
                  >
                    <span>Continue to Ancillaries</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* STEP 2: ANCILLARIES */}
            {activeBookingStep === 2 && (
              <div className="space-y-8">
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Customize Your Inflight Experience</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Seat Selection */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2.5 bg-sky-500/10 rounded-xl text-sky-400">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">Seat Preference</h4>
                        <p className="text-xs text-slate-400">Select comfort level for your flight</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        { id: 'standard', label: 'Standard Seat', extra: 0 },
                        { id: 'extraLegroom', label: 'Extra Legroom Row (+10cm)', extra: 100 },
                        { id: 'premiumFront', label: 'Front Cabin Priority Seat', extra: 180 }
                      ].map(s => (
                        <label key={s.id} className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer ${ancillaries.seatType === s.id ? 'bg-slate-800 border-sky-400' : 'bg-slate-900/50 border-slate-800'}`}>
                          <div className="flex items-center space-x-3">
                            <input 
                              type="radio" 
                              name="seat" 
                              checked={ancillaries.seatType === s.id} 
                              onChange={() => setAncillaries({...ancillaries, seatType: s.id})}
                              className="accent-sky-400"
                            />
                            <span className="text-xs font-semibold text-white">{s.label}</span>
                          </div>
                          <span className="text-xs font-bold text-sky-400">+{formatPrice(s.extra)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Extra Baggage Counter */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-400">
                        <Luggage className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">Additional Baggage</h4>
                        <p className="text-xs text-slate-400">Add extra 23kg checked bags</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                      <div>
                        <span className="text-xs font-bold text-white block">Extra Bag (23 kg)</span>
                        <span className="text-[11px] text-slate-400">{formatPrice(120)} / bag</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => setAncillaries(a => ({...a, extraBaggage: Math.max(0, a.extraBaggage - 1)}))}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="font-bold text-white text-sm">{ancillaries.extraBaggage}</span>
                        <button 
                          onClick={() => setAncillaries(a => ({...a, extraBaggage: a.extraBaggage + 1}))}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Meal Upgrade & Fast Track Checkboxes */}
                    <div className="mt-4 space-y-3">
                      <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer ${ancillaries.mealUpgrade ? 'bg-slate-800 border-sky-400' : 'bg-slate-900/50 border-slate-800'}`}>
                        <div className="flex items-center space-x-3">
                          <input 
                            type="checkbox" 
                            checked={ancillaries.mealUpgrade} 
                            onChange={(e) => setAncillaries({...ancillaries, mealUpgrade: e.target.checked})}
                            className="accent-sky-400 rounded"
                          />
                          <div className="flex items-center space-x-2">
                            <Coffee className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-semibold text-white">Hot Gourmet Meal & Dates Pack</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-sky-400">+{formatPrice(65)}</span>
                      </label>

                      <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer ${ancillaries.fastTrack ? 'bg-slate-800 border-sky-400' : 'bg-slate-900/50 border-slate-800'}`}>
                        <div className="flex items-center space-x-3">
                          <input 
                            type="checkbox" 
                            checked={ancillaries.fastTrack} 
                            onChange={(e) => setAncillaries({...ancillaries, fastTrack: e.target.checked})}
                            className="accent-sky-400 rounded"
                          />
                          <div className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-sky-400" />
                            <span className="text-xs font-semibold text-white">Priority Fast-Track & Boarding</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-sky-400">+{formatPrice(130)}</span>
                      </label>
                    </div>

                  </div>

                </div>

                {/* Back / Continue Buttons */}
                <div className="flex justify-between pt-4">
                  <button 
                    onClick={() => setActiveBookingStep(1)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-6 py-3 rounded-xl text-xs"
                  >
                    Back to Flights
                  </button>
                  <button 
                    onClick={() => setActiveBookingStep(3)}
                    className="bg-sky-500 hover:bg-sky-400 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-sky-500/20 flex items-center space-x-2"
                  >
                    <span>Proceed to Passenger Info</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* STEP 3: PASSENGER & CHECKOUT */}
            {activeBookingStep === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Passenger Form */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Lead Passenger Details</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">First Name</label>
                        <input 
                          type="text" 
                          value={passengerInfo.firstName}
                          onChange={(e) => setPassengerInfo({...passengerInfo, firstName: e.target.value})}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Last Name</label>
                        <input 
                          type="text" 
                          value={passengerInfo.lastName}
                          onChange={(e) => setPassengerInfo({...passengerInfo, lastName: e.target.value})}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Email Address</label>
                        <input 
                          type="email" 
                          value={passengerInfo.email}
                          onChange={(e) => setPassengerInfo({...passengerInfo, email: e.target.value})}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Mobile Number</label>
                        <input 
                          type="text" 
                          value={passengerInfo.phone}
                          onChange={(e) => setPassengerInfo({...passengerInfo, phone: e.target.value})}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Payment Method</h3>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {['mada', 'applepay', 'card'].map((method) => (
                        <div key={method} className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-center text-xs font-bold text-slate-200 uppercase cursor-pointer hover:border-sky-400 flex items-center justify-center space-x-1">
                          <CreditCard className="w-4 h-4 text-sky-400" />
                          <span>{method}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center space-x-3">
                      <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                      <span>Transactions are encrypted with 256-bit SSL and compliant with Saudi Arabian Monetary Authority (SAMA) standard security.</span>
                    </div>
                  </div>
                </div>

                {/* Price Summary Sidebar */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Booking Summary</h3>
                    
                    <div className="space-y-3 border-b border-slate-800 pb-4 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>Flight ({selectedFlight?.id})</span>
                        <span>{formatPrice(selectedFlight?.price || 0)}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Fare Category ({fareTier})</span>
                        <span>{fareTier === 'flex' ? formatPrice(110) : fareTier === 'premium' ? formatPrice(450) : 'Included'}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Passengers ({passengers}x)</span>
                        <span>x {passengers}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Ancillaries & Add-ons</span>
                        <span>
                          {formatPrice(
                            (ancillaries.seatType === 'extraLegroom' ? 100 : ancillaries.seatType === 'premiumFront' ? 180 : 0) +
                            (ancillaries.extraBaggage * 120) +
                            (ancillaries.mealUpgrade ? 65 : 0) +
                            (ancillaries.fastTrack ? 130 : 0)
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Airport Taxes & Fees</span>
                        <span>Included</span>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <span className="text-sm font-bold text-white">Total Amount</span>
                      <span className="text-2xl font-black text-amber-400">{formatPrice(computeTotalPrice())}</span>
                    </div>
                  </div>

                  <div className="pt-6 space-y-3">
                    <button 
                      onClick={() => setActiveBookingStep(4)}
                      className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black py-4 rounded-xl shadow-xl shadow-amber-500/20 text-center flex items-center justify-center space-x-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      <span>Confirm & Issue E-Ticket</span>
                    </button>
                    <button 
                      onClick={() => setActiveBookingStep(2)}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-slate-400 py-2 rounded-xl text-xs font-semibold"
                    >
                      Back to Ancillaries
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* STEP 4: INSTANT DIGITAL E-TICKET CONFIRMATION MODAL */}
            {activeBookingStep === 4 && (
              <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto shadow-2xl relative">
                
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-500/40">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Booking Confirmed!</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Your digital boarding passes & electronic ticket have been generated.
                  </p>
                </div>

                {/* E-Ticket Card Styled Box */}
                <div className="bg-slate-800/90 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
                  {/* Ticket Header */}
                  <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-4 px-6 flex items-center justify-between text-white">
                    <div className="flex items-center space-x-2">
                      <Plane className="w-5 h-5 text-amber-300" />
                      <span className="font-extrabold tracking-widest text-sm">AVALON AIRLINES</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-sky-200 block uppercase">Booking Reference (PNR)</span>
                      <span className="font-mono text-base font-black text-amber-300">AV-7982K</span>
                    </div>
                  </div>

                  {/* Ticket Body */}
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Passenger</span>
                        <span className="font-bold text-white text-sm">{passengerInfo.firstName} {passengerInfo.lastName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Flight No</span>
                        <span className="font-bold text-sky-400 text-sm">{selectedFlight?.id}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Class</span>
                        <span className="font-bold text-amber-400 text-sm uppercase">{fareTier}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 items-center text-center">
                      <div className="text-left">
                        <span className="text-2xl font-black text-white">RUH</span>
                        <span className="block text-xs text-slate-400">Riyadh Terminal 3</span>
                        <span className="block text-xs font-semibold text-sky-400 mt-1">{selectedFlight?.departure}</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-[10px] text-slate-400 font-mono">{selectedFlight?.duration}</span>
                        <div className="w-full flex items-center space-x-1 my-1">
                          <div className="h-0.5 bg-slate-600 flex-1" />
                          <Plane className="w-4 h-4 text-sky-400 transform rotate-90" />
                          <div className="h-0.5 bg-slate-600 flex-1" />
                        </div>
                        <span className="text-[10px] text-emerald-400">Direct</span>
                      </div>

                      <div className="text-right">
                        <span className="text-2xl font-black text-white">{selectedDest}</span>
                        <span className="block text-xs text-slate-400">{DESTINATIONS.find(d => d.code === selectedDest)?.name}</span>
                        <span className="block text-xs font-semibold text-sky-400 mt-1">{selectedFlight?.arrival}</span>
                      </div>
                    </div>

                    {/* QR Code Mockup & Total Paid */}
                    <div className="pt-4 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white rounded-xl">
                          <QrCode className="w-16 h-16 text-slate-950" />
                        </div>
                        <div className="text-xs text-slate-400">
                          <span className="block text-white font-semibold">Gate & Seat assigned at Check-in</span>
                          <span>Airbus A320neo • Saudi Hospitality Included</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Total Amount Paid</span>
                        <span className="text-xl font-black text-amber-400">{formatPrice(computeTotalPrice())}</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={() => showToast('E-Ticket PDF downloaded to your device.')}
                    className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF Boarding Pass</span>
                  </button>
                  <button 
                    onClick={() => setActiveBookingStep(0)}
                    className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-6 py-3 rounded-xl text-xs"
                  >
                    Close Booking Engine
                  </button>
                </div>

              </div>
            )}

          </div>
        </section>
      )}

      {/* --- 4. NETWORK & DESTINATIONS HUB SHOWCASE --- */}
      <section id="routes" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-1">Radiating from Riyadh Hub (RUH)</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Avalon Route Network</h2>
            </div>
            <p className="mt-3 md:mt-0 text-sm text-slate-400 max-w-md">
              Connecting Saudi Arabia’s capital to key commercial centers across the Gulf, North Africa, and South Asia with modern Airbus A320neo aircraft.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESTINATIONS.map((dest) => (
              <div 
                key={dest.code}
                className="group bg-slate-900/80 border border-slate-800 hover:border-sky-500/50 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Card Image */}
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={dest.image} 
                      alt={dest.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-amber-400 border border-slate-700">
                      {dest.code}
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-xs font-medium text-sky-300 block">{dest.country}</span>
                      <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs text-slate-300 font-medium">{dest.title}</p>
                    
                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-800">
                      <div>
                        <span className="text-slate-500 block">Flight Duration</span>
                        <span className="font-bold text-slate-200">{dest.flightTime}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Daily Frequency</span>
                        <span className="font-bold text-slate-200">{dest.dailyFlights} Direct Flights</span>
                      </div>
                      <div className="col-span-2 pt-1">
                        <span className="text-slate-500 block">Cargo Payload Capacity</span>
                        <span className="font-bold text-sky-400">{dest.cargoCap}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="p-6 pt-0">
                  <button 
                    onClick={() => handleStartBooking(dest.code)}
                    className="w-full bg-slate-800 hover:bg-sky-500 hover:text-white text-slate-200 font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Book Flight to {dest.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- 5. ABOUT & HYBRID BUSINESS MODEL SECTION --- */}
      <section id="hybrid" className="py-24 bg-slate-900/40 border-y border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">The Avalon Advantage</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Hybrid Operating Model</h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300">
              Avalon bridges low-cost structural efficiency with premium full-service amenities. We deliver accessible pricing without compromising hospitality.
            </p>
          </div>

          {/* Model Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            
            {/* LCC Efficiency Pillar */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 hover:border-sky-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">LCC Cost & Fleet Efficiency</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Single-type Airbus A320neo family fleet minimizes maintenance overhead, maximizes crew interchangeability, and streamlines ground operations.
              </p>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <span>High aircraft daily utilization rates (&gt;13 hours/day)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <span>Digital-first direct sales channels reducing GDS distribution fees</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <span>15% reduced fuel burn and lower carbon footprint</span>
                </li>
              </ul>
            </div>

            {/* FSNC Hospitality Pillar */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 hover:border-amber-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Full-Service Passenger Perks</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Selective high-value inclusions that matter to travelers: warm Saudi hospitality, ergonomic seating, and loyalty integration.
              </p>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Complimentary authentic Saudi coffee & organic date service</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Flex Corporate & Premium seating with generous pitch and recline</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>Seamless digital baggage check & flight tracking via mobile</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Vision 2030 Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-sky-500/30 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 rounded-2xl bg-amber-400/10 text-amber-400 flex items-center justify-center border border-amber-400/20 flex-shrink-0">
                <Building className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-400 tracking-wider uppercase block">Strategic Alignment</span>
                <h4 className="text-xl font-bold text-white">Saudi National Aviation Strategy & Vision 2030</h4>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  Supporting the Kingdom's goal to connect Riyadh to over 250 global destinations and scale annual passenger traffic to 330 million by 2030.
                </p>
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="px-4 py-2 bg-slate-800/80 rounded-xl border border-slate-700 text-xs font-mono text-sky-300">
                HUB: RUH • KING KHALID INTL
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- 6. CARGO & B2B LOGISTICS PORTAL --- */}
      <section id="cargo" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-1">Avalon Cargo Solutions</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">B2B Air Freight & Logistics</h2>
            </div>
            <p className="mt-3 lg:mt-0 text-sm text-slate-400 max-w-md">
              Monetizing belly-hold capacity on initial core routes with express courier, temperature-controlled pharma, and e-commerce fulfillment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Live Shipment Tracker Widget */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <Box className="w-6 h-6 text-sky-400" />
                <h3 className="text-lg font-bold text-white">Track Air Waybill (AWB)</h3>
              </div>

              <form onSubmit={handleCargoSearch} className="flex gap-3 mb-6">
                <input 
                  type="text" 
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter AWB (e.g. AV-CARGO-884920)"
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-400 font-mono"
                />
                <button 
                  type="submit"
                  className="bg-sky-500 hover:bg-sky-400 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors"
                >
                  Track Cargo
                </button>
              </form>

              {cargoSearchError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs mb-4">
                  {cargoSearchError}
                </div>
              )}

              {trackingResult && (
                <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 pb-4">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Shipment Status</span>
                      <span className="text-sm font-bold text-emerald-400 flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{trackingResult.status}</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Payload Type</span>
                      <span className="text-xs font-semibold text-white">{trackingResult.type} ({trackingResult.weight})</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Estimated Arrival</span>
                      <span className="text-xs font-semibold text-sky-400">{trackingResult.eta}</span>
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  <div className="space-y-4">
                    {trackingResult.history.map((step, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${step.done ? 'bg-sky-500 text-slate-950' : 'bg-slate-700 text-slate-400'}`}>
                          {step.done ? <Check className="w-3 h-3 stroke-[3]" /> : <Clock className="w-3 h-3" />}
                        </div>
                        <div>
                          <p className={`text-xs font-semibold ${step.done ? 'text-white' : 'text-slate-400'}`}>{step.step}</p>
                          <span className="text-[10px] text-slate-500">{step.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Instant Freight Rate Estimator */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Truck className="w-6 h-6 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">Instant Cargo Quote</h3>
                </div>

                <form onSubmit={handleCalculateCargo} className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Weight (kg)</label>
                    <input 
                      type="number" 
                      value={cargoCalc.weight}
                      onChange={(e) => setCargoCalc({...cargoCalc, weight: Number(e.target.value)})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Cargo Category</label>
                    <select 
                      value={cargoCalc.type}
                      onChange={(e) => setCargoCalc({...cargoCalc, type: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="general">General Commercial Freight</option>
                      <option value="pharma">Pharmaceutical (Cold Chain +2°C to +8°C)</option>
                      <option value="express">Express E-Commerce Packaging</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3 rounded-xl text-xs shadow-lg transition-colors"
                  >
                    Calculate Rate
                  </button>
                </form>

                {calculatedQuote && (
                  <div className="mt-6 p-4 bg-slate-800/80 border border-amber-400/30 rounded-2xl text-center">
                    <span className="text-[10px] text-slate-400 uppercase block">Estimated Freight Cost</span>
                    <span className="text-2xl font-black text-amber-400">{formatPrice(calculatedQuote)}</span>
                    <span className="text-[10px] text-slate-400 block mt-1">Includes fuel surcharge & airport handling</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-center">
                <span className="text-[11px] text-slate-400">Dedicated B2B Freight Desk:</span>
                <span className="text-xs font-bold text-sky-400 block mt-0.5">cargo@avalon-airlines.sa</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- 7. INVESTOR & SUSTAINABILITY SNAPSHOT (WITH INTERACTIVE TOGGLE) --- */}
      <section id="sustainability" className="py-24 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-2">Corporate Growth & Responsibility</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Investor Relations & Sustainability</h2>
          </div>

          {/* Interactive View Toggle */}
          <div className="flex justify-center mb-10">
            <div className="bg-slate-800 p-1.5 rounded-2xl border border-slate-700 flex space-x-2">
              <button 
                onClick={() => setSustainabilityTab('fleet')}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${sustainabilityTab === 'fleet' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Fleet Expansion Metrics
              </button>
              <button 
                onClick={() => setSustainabilityTab('green')}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${sustainabilityTab === 'green' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                ESG & SAF Commitments
              </button>
            </div>
          </div>

          {/* TAB 1: FLEET SCALING METRICS */}
          {sustainabilityTab === 'fleet' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 text-center">
                <span className="text-xs text-slate-400 block mb-1">Initial Fleet Scale</span>
                <span className="text-4xl font-black text-sky-400">3 ➔ 8</span>
                <span className="text-[11px] text-slate-400 block mt-2">Airbus A320neo scaling by Q4 2027</span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 text-center">
                <span className="text-xs text-slate-400 block mb-1">Projected Load Factor</span>
                <span className="text-4xl font-black text-amber-400">88.4%</span>
                <span className="text-[11px] text-slate-400 block mt-2">High density hybrid seat layout</span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 text-center">
                <span className="text-xs text-slate-400 block mb-1">Fuel Efficiency Gain</span>
                <span className="text-4xl font-black text-emerald-400">-15%</span>
                <span className="text-[11px] text-slate-400 block mt-2">CO2 reduction per seat-kilometer</span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 text-center">
                <span className="text-xs text-slate-400 block mb-1">Route Network Expansion</span>
                <span className="text-4xl font-black text-purple-400">12+</span>
                <span className="text-[11px] text-slate-400 block mt-2">Regional destinations targeted</span>
              </div>

            </div>
          )}

          {/* TAB 2: GREEN COMMITMENTS */}
          {sustainabilityTab === 'green' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3">
                <Leaf className="w-8 h-8 text-emerald-400" />
                <h4 className="font-bold text-white text-base">Sustainable Aviation Fuel (SAF)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Targeting a 10% SAF blend by 2028 in partnership with Saudi energy suppliers to support net-zero aviation targets.
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3">
                <RefreshCw className="w-8 h-8 text-sky-400" />
                <h4 className="font-bold text-white text-base">Zero Single-Use Plastics</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  100% biodegradable cabin catering cutlery and paper products utilized across all flight routes.
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3">
                <Zap className="w-8 h-8 text-amber-400" />
                <h4 className="font-bold text-white text-base">Optimized Flight Planning</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  AI-driven trajectory optimization minimizing holding patterns and reducing fuel burn during approach into Riyadh.
                </p>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* --- 8. FOOTER & CUSTOMER SUPPORT --- */}
      <footer className="bg-[#070D1E] border-t border-slate-800 pt-16 pb-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Brand Column */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-slate-950 font-bold">
                  <Plane className="w-4 h-4 transform -rotate-45" />
                </div>
                <span className="text-lg font-black tracking-widest text-white uppercase">AVALON</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Avalon Airlines Company LLC. Headquartered in Riyadh, Kingdom of Saudi Arabia.
              </p>
              {/* GACA Compliance Badge */}
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl inline-flex items-center space-x-2 text-[10px] text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>GACA Air Operator License #849-KSA</span>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h5 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Passenger Services</h5>
              <ul className="space-y-2">
                <li><a href="#hero" className="hover:text-sky-400">Flight Schedules</a></li>
                <li><a href="#booking-engine" className="hover:text-sky-400">Manage Booking</a></li>
                <li><a href="#" className="hover:text-sky-400">Online Check-in</a></li>
                <li><a href="#" className="hover:text-sky-400">Baggage Allowance Guide</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Corporate & Cargo</h5>
              <ul className="space-y-2">
                <li><a href="#cargo" className="hover:text-sky-400">B2B Air Freight</a></li>
                <li><a href="#cargo" className="hover:text-sky-400">Pharma Cold-Chain</a></li>
                <li><a href="#hybrid" className="hover:text-sky-400">Vision 2030 Partner</a></li>
                <li><a href="#sustainability" className="hover:text-sky-400">Investor Relations</a></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="space-y-3">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Avalon Fare Alerts</h5>
              <p className="text-slate-400">Subscribe for exclusive launch offers out of Riyadh Hub.</p>
              <div className="flex">
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-slate-900 border border-slate-800 rounded-l-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-400 flex-1"
                />
                <button 
                  onClick={() => {
                    if (newsletterEmail) {
                      showToast('Thank you for subscribing to Avalon alerts.');
                      setNewsletterEmail('');
                    }
                  }}
                  className="bg-sky-500 hover:bg-sky-400 text-white font-bold px-4 py-2 rounded-r-xl text-xs"
                >
                  Join
                </button>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <p>© {new Date().getFullYear()} Avalon Airlines. All rights reserved. Kingdom of Saudi Arabia.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-slate-400">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400">Conditions of Carriage</a>
              <a href="#" className="hover:text-slate-400">GACA Passenger Rights</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}