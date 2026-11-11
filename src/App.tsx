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
  DollarSign,
  Printer,
  Compass,
  FileText,
  AlertCircle,
  ExternalLink,
  Wifi,
  Wind
} from 'lucide-react';

// --- DATA TYPES ---
export interface Destination {
  id: string;
  name: string;
  code: string;
  country: string;
  title: string;
  flightTime: string;
  dailyFlights: number;
  cargoCap: string;
  price: number;
  image: string;
  temp: string;
  weather: string;
}

export interface Flight {
  id: string;
  origin: string;
  originName: string;
  dest: string;
  destName: string;
  departure: string;
  arrival: string;
  duration: string;
  aircraft: string;
  price: number;
  terminal: string;
  gate: string;
  status: 'On Time' | 'Boarding' | 'Scheduled' | 'Departed';
}

export interface CargoTrackingHistory {
  step: string;
  time: string;
  done: boolean;
  location: string;
}

export interface CargoRecord {
  status: string;
  origin: string;
  destination: string;
  flight: string;
  weight: string;
  type: string;
  eta: string;
  pieces: number;
  temperature?: string;
  history: CargoTrackingHistory[];
}

export type FareTierType = 'value' | 'flex' | 'premium';

export interface Ancillaries {
  seatType: 'standard' | 'extraLegroom' | 'premiumFront';
  selectedSeatNumber: string;
  extraBaggage: number;
  mealUpgrade: boolean;
  fastTrack: boolean;
  carbonOffset: boolean;
}

export interface PassengerInfo {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passport: string;
  frequentFlyer: string;
}

// --- STATIC AIRLINE DATA ---
const DESTINATIONS: Destination[] = [
  {
    id: 'JED',
    name: 'Jeddah',
    code: 'JED',
    country: 'Saudi Arabia',
    title: 'Red Sea Commercial & Pilgrimage Gateway',
    flightTime: '1h 35m',
    dailyFlights: 8,
    cargoCap: '4.5 Tons/flight',
    price: 290,
    image: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?auto=format&fit=crop&w=800&q=80',
    temp: '32°C',
    weather: 'Sunny & Coastal Breeze'
  },
  {
    id: 'DMM',
    name: 'Dammam',
    code: 'DMM',
    country: 'Saudi Arabia',
    title: 'Eastern Industrial & Petrochemical Hub',
    flightTime: '1h 05m',
    dailyFlights: 5,
    cargoCap: '4.5 Tons/flight',
    price: 180,
    image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=800&q=80',
    temp: '29°C',
    weather: 'Clear Sky'
  },
  {
    id: 'DXB',
    name: 'Dubai',
    code: 'DXB',
    country: 'UAE',
    title: 'Gulf Commercial & Financial Center',
    flightTime: '1h 50m',
    dailyFlights: 6,
    cargoCap: '5.0 Tons/flight',
    price: 420,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    temp: '30°C',
    weather: 'Sunny'
  },
  {
    id: 'CAI',
    name: 'Cairo',
    code: 'CAI',
    country: 'Egypt',
    title: 'North Africa Megacity & Cultural Heart',
    flightTime: '2h 45m',
    dailyFlights: 4,
    cargoCap: '4.0 Tons/flight',
    price: 510,
    image: 'https://images.unsplash.com/photo-1572252821143-02f5a6c3f683?auto=format&fit=crop&w=800&q=80',
    temp: '26°C',
    weather: 'Pleasant'
  },
  {
    id: 'BOM',
    name: 'Mumbai',
    code: 'BOM',
    country: 'India',
    title: 'South Asia Trade & Financial Capital',
    flightTime: '4h 15m',
    dailyFlights: 3,
    cargoCap: '6.0 Tons/flight',
    price: 790,
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
    temp: '31°C',
    weather: 'Hazy Sun'
  },
  {
    id: 'DOH',
    name: 'Doha',
    code: 'DOH',
    country: 'Qatar',
    title: 'Arabian Gulf Energy & Tourism Hub',
    flightTime: '1h 25m',
    dailyFlights: 4,
    cargoCap: '4.8 Tons/flight',
    price: 380,
    image: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80',
    temp: '28°C',
    weather: 'Clear'
  }
];

const MOCK_FLIGHTS: Flight[] = [
  { id: 'AV-102', origin: 'RUH', originName: 'Riyadh', dest: 'JED', destName: 'Jeddah', departure: '07:30', arrival: '09:05', duration: '1h 35m', aircraft: 'Airbus A320neo', price: 290, terminal: 'Terminal 3', gate: '304', status: 'On Time' },
  { id: 'AV-104', origin: 'RUH', originName: 'Riyadh', dest: 'JED', destName: 'Jeddah', departure: '13:15', arrival: '14:50', duration: '1h 35m', aircraft: 'Airbus A320neo', price: 340, terminal: 'Terminal 3', gate: '307', status: 'Scheduled' },
  { id: 'AV-108', origin: 'RUH', originName: 'Riyadh', dest: 'JED', destName: 'Jeddah', departure: '19:40', arrival: '21:15', duration: '1h 35m', aircraft: 'Airbus A320neo', price: 310, terminal: 'Terminal 3', gate: '302', status: 'Scheduled' },
  { id: 'AV-201', origin: 'RUH', originName: 'Riyadh', dest: 'DXB', destName: 'Dubai', departure: '08:00', arrival: '10:50', duration: '1h 50m', aircraft: 'Airbus A320neo', price: 420, terminal: 'Terminal 3', gate: '312', status: 'Boarding' },
  { id: 'AV-205', origin: 'RUH', originName: 'Riyadh', dest: 'DXB', destName: 'Dubai', departure: '16:30', arrival: '19:20', duration: '1h 50m', aircraft: 'Airbus A320neo', price: 480, terminal: 'Terminal 3', gate: '314', status: 'Scheduled' },
  { id: 'AV-301', origin: 'RUH', originName: 'Riyadh', dest: 'DMM', destName: 'Dammam', departure: '06:15', arrival: '07:20', duration: '1h 05m', aircraft: 'Airbus A320neo', price: 180, terminal: 'Terminal 3', gate: '301', status: 'Departed' },
  { id: 'AV-401', origin: 'RUH', originName: 'Riyadh', dest: 'CAI', destName: 'Cairo', departure: '10:10', arrival: '12:55', duration: '2h 45m', aircraft: 'Airbus A320neo', price: 510, terminal: 'Terminal 3', gate: '318', status: 'On Time' },
  { id: 'AV-501', origin: 'RUH', originName: 'Riyadh', dest: 'BOM', destName: 'Mumbai', departure: '22:30', arrival: '04:45 (+1)', duration: '4h 15m', aircraft: 'Airbus A320neo', price: 790, terminal: 'Terminal 3', gate: '320', status: 'Scheduled' },
  { id: 'AV-601', origin: 'RUH', originName: 'Riyadh', dest: 'DOH', destName: 'Doha', departure: '11:45', arrival: '13:10', duration: '1h 25m', aircraft: 'Airbus A320neo', price: 380, terminal: 'Terminal 3', gate: '308', status: 'On Time' }
];

const CARGO_TRACKING_DB: Record<string, CargoRecord> = {
  'AV-CARGO-884920': {
    status: 'In Transit',
    origin: 'Riyadh (RUH)',
    destination: 'Dubai (DXB)',
    flight: 'AV-201',
    weight: '1,240 kg',
    pieces: 42,
    type: 'Pharmaceuticals (Cold Chain)',
    temperature: '+4.2°C Monitored',
    eta: 'Today, 10:50 GST',
    history: [
      { step: 'Acceptance & Weight Validation at RUH Cargo Terminal', time: '04:30 AST', done: true, location: 'RUH Hub' },
      { step: 'Customs Clearance & Security X-Ray Screening', time: '05:45 AST', done: true, location: 'RUH Airside' },
      { step: 'Unit Load Device (ULD) Palletization & Temp Lock', time: '06:30 AST', done: true, location: 'RUH Ramp' },
      { step: 'Loaded into Airbus A320neo Forward Belly Hold', time: '07:15 AST', done: true, location: 'Belly Hold #1' },
      { step: 'Flight AV-201 Departed RUH on Runway 12L', time: '08:00 AST', done: true, location: 'En Route 36,000ft' },
      { step: 'Arriving at DXB Cargo Logistics Freezone Terminal', time: '10:50 GST', done: false, location: 'DXB Hub' }
    ]
  },
  'AV-CARGO-551029': {
    status: 'Customs Cleared',
    origin: 'Riyadh (RUH)',
    destination: 'Jeddah (JED)',
    flight: 'AV-102',
    weight: '850 kg',
    pieces: 110,
    type: 'Express E-Commerce Fulfillment',
    eta: 'Today, 09:05 AST',
    history: [
      { step: 'Acceptance at RUH Sorting Center', time: '03:15 AST', done: true, location: 'RUH Hub' },
      { step: 'Express Waybill Barcode Scan', time: '04:00 AST', done: true, location: 'RUH Hub' },
      { step: 'Ramp Loading to Airbus A320neo', time: '06:45 AST', done: true, location: 'RUH Ramp' },
      { step: 'Airborne En Route to Western Province', time: '07:30 AST', done: true, location: 'Flight AV-102' },
      { step: 'Disembarked at JED Cargo Hub', time: '09:05 AST', done: true, location: 'JED Terminal' }
    ]
  },
  'AV-CARGO-992144': {
    status: 'Scheduled for Loading',
    origin: 'Riyadh (RUH)',
    destination: 'Mumbai (BOM)',
    flight: 'AV-501',
    weight: '2,600 kg',
    pieces: 18,
    type: 'Industrial Automation Spare Parts',
    eta: 'Tomorrow, 04:45 IST',
    history: [
      { step: 'Documentation Verified & Booking Confirmed', time: '14:00 AST', done: true, location: 'RUH Freight Office' },
      { step: 'Heavy Cargo Pallet Strapping & Tie-down', time: '16:30 AST', done: true, location: 'Warehouse Bay 4' },
      { step: 'Scheduled for Runway Transfer to AV-501', time: '21:00 AST', done: false, location: 'RUH Ramp' }
    ]
  }
};

export default function App() {
  // Navigation & Drawer State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currency, setCurrency] = useState<'SAR' | 'USD' | 'EUR'>('SAR');

  // Booking Flow State
  const [tripType, setTripType] = useState<'roundTrip' | 'oneWay'>('roundTrip');
  const [selectedDest, setSelectedDest] = useState<string>('JED');
  const [departDate, setDepartDate] = useState<string>('2026-12-01');
  const [returnDate, setReturnDate] = useState<string>('2026-12-08');
  const [passengers, setPassengers] = useState<number>(1);
  const [activeBookingStep, setActiveBookingStep] = useState<number>(0); 
  // 0: Closed, 1: Select Flight/Fare, 2: Ancillaries, 3: Passenger & Checkout, 4: Confirmed E-Ticket Modal

  // Flight Selection State
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [fareTier, setFareTier] = useState<FareTierType>('flex');

  // Ancillaries State
  const [ancillaries, setAncillaries] = useState<Ancillaries>({
    seatType: 'standard',
    selectedSeatNumber: '14A',
    extraBaggage: 0,
    mealUpgrade: false,
    fastTrack: false,
    carbonOffset: true
  });

  // Seat Selector Modal State
  const [seatModalOpen, setSeatModalOpen] = useState<boolean>(false);

  // Flight Status Modal State
  const [statusModalOpen, setStatusModalOpen] = useState<boolean>(false);
  const [statusSearchQuery, setStatusSearchQuery] = useState<string>('');

  // Check-In / Retrieve Booking Modal State
  const [checkInModalOpen, setCheckInModalOpen] = useState<boolean>(false);
  const [checkInPnr, setCheckInPnr] = useState<string>('AV-7982K');
  const [checkInLastName, setCheckInLastName] = useState<string>('Al-Mansoor');

  // Fleet Explorer Modal
  const [fleetModalOpen, setFleetModalOpen] = useState<boolean>(false);

  // Passenger Info State
  const [passengerInfo, setPassengerInfo] = useState<PassengerInfo>({
    title: 'Mr',
    firstName: 'Mohammed',
    lastName: 'Al-Mansoor',
    email: 'm.almansoor@example.com',
    phone: '+966 50 123 4567',
    passport: 'S9841204',
    frequentFlyer: 'AV-VISION-88241'
  });

  // Cargo Tracker State
  const [trackingId, setTrackingId] = useState<string>('AV-CARGO-884920');
  const [trackingResult, setTrackingResult] = useState<CargoRecord | null>(CARGO_TRACKING_DB['AV-CARGO-884920']);
  const [cargoSearchError, setCargoSearchError] = useState<string>('');

  // Cargo Calculator State
  const [cargoCalc, setCargoCalc] = useState<{ weight: number; type: string; origin: string; dest: string }>({
    weight: 250,
    type: 'general',
    origin: 'RUH',
    dest: 'DXB'
  });
  const [calculatedQuote, setCalculatedQuote] = useState<number | null>(null);

  // Sustainability View Toggle
  const [sustainabilityTab, setSustainabilityTab] = useState<'fleet' | 'green'>('fleet');

  // Newsletter & Feedback Toast
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string>('');

  // Scroll listener for glassmorphism header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Price conversion helper
  const formatPrice = (amountInSAR: number): string => {
    if (currency === 'USD') return `$${Math.round(amountInSAR / 3.75)}`;
    if (currency === 'EUR') return `€${Math.round(amountInSAR / 4.05)}`;
    return `${amountInSAR.toLocaleString()} SAR`;
  };

  // Base flight search starter
  const handleStartBooking = (destCodeOverride?: string) => {
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
  const computeTotalPrice = (): number => {
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
    if (ancillaries.carbonOffset) ancillariesTotal += 20;

    const multiplier = tripType === 'roundTrip' ? 1.85 : 1.0;
    return Math.round((base * passengers * multiplier) + ancillariesTotal);
  };

  // Handle Cargo Search
  const handleCargoSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = trackingId.trim().toUpperCase();
    if (CARGO_TRACKING_DB[cleaned]) {
      setTrackingResult(CARGO_TRACKING_DB[cleaned]);
      setCargoSearchError('');
      showToast(`Waybill ${cleaned} retrieved successfully.`);
    } else {
      setCargoSearchError('Air Waybill not found. Try sample AWBs: AV-CARGO-884920, AV-CARGO-551029, AV-CARGO-992144');
    }
  };

  // Cargo Calculator
  const handleCalculateCargo = (e: React.FormEvent) => {
    e.preventDefault();
    const ratePerKg = cargoCalc.type === 'pharma' ? 14.5 : cargoCalc.type === 'express' ? 18.0 : 8.5;
    const est = cargoCalc.weight * ratePerKg + 150; // base handling & airport security fee
    setCalculatedQuote(Math.round(est));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  const currentDestinationObj = DESTINATIONS.find(d => d.code === selectedDest) || DESTINATIONS[0];

  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 font-sans selection:bg-sky-500 selection:text-white">

      {/* --- TOAST NOTIFICATION --- */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-sky-500/95 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center space-x-3 border border-sky-400 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
          <span className="font-semibold text-xs sm:text-sm">{toastMessage}</span>
        </div>
      )}

      {/* --- HEADER & NAVIGATION --- */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#0B132B]/95 backdrop-blur-md shadow-2xl border-b border-slate-800/80 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-blue-500 to-amber-400 p-0.5 shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
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
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-sky-400 transition-colors">Book Flights</a>
            <a href="#routes" className="hover:text-sky-400 transition-colors">Route Network</a>
            <a href="#hybrid" className="hover:text-sky-400 transition-colors">Hybrid Model</a>
            <a href="#cargo" className="hover:text-sky-400 transition-colors">Cargo & Logistics</a>
            <a href="#sustainability" className="hover:text-sky-400 transition-colors">Fleet & ESG</a>
            <button 
              onClick={() => setStatusModalOpen(true)}
              className="text-xs text-slate-300 hover:text-amber-400 flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Flight Status</span>
            </button>
            <button 
              onClick={() => setCheckInModalOpen(true)}
              className="text-xs text-slate-300 hover:text-emerald-400 flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Check-in</span>
            </button>
          </nav>

          {/* Right Controls */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Currency Selector */}
            <div className="relative">
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value as 'SAR' | 'USD' | 'EUR')}
                className="bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-semibold focus:outline-none focus:border-sky-400 cursor-pointer hover:border-slate-600 transition-colors"
                title="Select currency"
              >
                <option value="SAR">SAR (﷼)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>

            <button 
              onClick={() => handleStartBooking('JED')}
              className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center space-x-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Book Flight</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden text-slate-300 hover:text-white p-2"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0B132B]/98 backdrop-blur-2xl lg:hidden pt-24 px-6 flex flex-col justify-between pb-8">
          <div className="space-y-5 text-base font-semibold">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-sky-400 py-2 border-b border-slate-800">Book Flights</a>
            <a href="#routes" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-sky-400 py-2 border-b border-slate-800">Route Network</a>
            <a href="#hybrid" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-sky-400 py-2 border-b border-slate-800">Hybrid Operating Model</a>
            <a href="#cargo" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-sky-400 py-2 border-b border-slate-800">Cargo & Logistics Portal</a>
            <a href="#sustainability" onClick={() => setMobileMenuOpen(false)} className="block text-slate-200 hover:text-sky-400 py-2 border-b border-slate-800">Fleet & ESG Commitments</a>
            <button 
              onClick={() => { setMobileMenuOpen(false); setStatusModalOpen(true); }}
              className="flex items-center space-x-2 text-slate-200 hover:text-amber-400 py-2 text-left w-full border-b border-slate-800"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Live Flight Status</span>
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); setCheckInModalOpen(true); }}
              className="flex items-center space-x-2 text-slate-200 hover:text-emerald-400 py-2 text-left w-full"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Online Check-in & Boarding Pass</span>
            </button>
          </div>
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <div className="flex justify-between items-center text-sm text-slate-400">
              <span>Display Currency</span>
              <div className="flex space-x-2">
                {(['SAR', 'USD', 'EUR'] as const).map(c => (
                  <button 
                    key={c} 
                    onClick={() => setCurrency(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${currency === c ? 'bg-sky-500 text-white shadow' : 'bg-slate-800 text-slate-400'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <button 
              onClick={() => { setMobileMenuOpen(false); handleStartBooking('JED'); }}
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg"
            >
              Search & Book Now
            </button>
          </div>
        </div>
      )}

      {/* --- 1. HERO & BRAND INTRODUCTION --- */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Aviation Accents */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[650px] h-[650px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
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
          <div className="max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60 relative">
            
            {/* Trip Type Tabs */}
            <div className="flex items-center space-x-6 mb-6 border-b border-slate-800 pb-4">
              <button 
                onClick={() => setTripType('roundTrip')}
                className={`flex items-center space-x-2 text-sm font-semibold pb-1 transition-colors relative cursor-pointer ${tripType === 'roundTrip' ? 'text-sky-400' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <span>Round Trip</span>
                {tripType === 'roundTrip' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400 rounded-full" />}
              </button>
              <button 
                onClick={() => setTripType('oneWay')}
                className={`flex items-center space-x-2 text-sm font-semibold pb-1 transition-colors relative cursor-pointer ${tripType === 'oneWay' ? 'text-sky-400' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <span>One Way</span>
                {tripType === 'oneWay' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400 rounded-full" />}
              </button>
              
              <div className="ml-auto hidden sm:flex items-center space-x-4 text-xs text-slate-400">
                <span className="flex items-center space-x-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>GACA Licensed #849-KSA</span>
                </span>
                <span className="text-slate-600">|</span>
                <span className="flex items-center space-x-1 text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Gahwa & Dates Included</span>
                </span>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Origin (Fixed Hub) */}
              <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-3.5 hover:border-slate-600 transition-colors">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-sky-400" />
                  <span>From (Hub)</span>
                </label>
                <div className="mt-1 font-semibold text-white text-sm flex items-center justify-between">
                  <span>Riyadh (RUH)</span>
                  <span className="text-[10px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded font-mono font-bold">Terminal 3</span>
                </div>
              </div>

              {/* Destination Dropdown */}
              <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-3.5 focus-within:border-sky-400 transition-colors">
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
              <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-3.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-sky-400" />
                  <span>{tripType === 'roundTrip' ? 'Depart — Return' : 'Departure Date'}</span>
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <input 
                    type="date" 
                    value={departDate} 
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="bg-transparent text-white text-xs font-semibold focus:outline-none w-full cursor-pointer"
                  />
                  {tripType === 'roundTrip' && (
                    <input 
                      type="date" 
                      value={returnDate} 
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="bg-transparent text-white text-xs font-semibold focus:outline-none w-full cursor-pointer border-l border-slate-700 pl-2"
                    />
                  )}
                </div>
              </div>

              {/* Passengers & Class */}
              <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-3.5">
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
                    {[1, 2, 3, 4, 5, 6, 8].map(n => (
                      <option key={n} value={n} className="bg-slate-900 text-white">{n} Guest{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                  <span className="text-slate-500">•</span>
                  <select 
                    value={fareTier} 
                    onChange={(e) => setFareTier(e.target.value as FareTierType)}
                    className="bg-transparent text-sky-400 focus:outline-none cursor-pointer font-bold"
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
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <Coffee className="w-3.5 h-3.5 text-amber-400" />
                  <span>Complimentary Saudi Coffee & Dates</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Wifi className="w-3.5 h-3.5 text-sky-400" />
                  <span>Ka-Band Satellite Inflight Wi-Fi</span>
                </span>
              </div>

              <button 
                onClick={() => handleStartBooking()}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-8 py-3.5 rounded-2xl shadow-xl shadow-amber-500/20 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-sm"
              >
                <Search className="w-4 h-4" />
                <span>Find Avalon Flights</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

          </div>

          {/* Quick Metrics Bar Under Hero */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center">
              <span className="text-2xl font-black text-sky-400 block">Airbus A320neo</span>
              <span className="text-[11px] text-slate-400">Eco-Modern Single Fleet</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center">
              <span className="text-2xl font-black text-amber-400 block">330M Target</span>
              <span className="text-[11px] text-slate-400">Saudi Vision 2030 Catalyst</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center">
              <span className="text-2xl font-black text-emerald-400 block">15% Less CO2</span>
              <span className="text-[11px] text-slate-400">LEAP-1A Next-Gen Engines</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 text-center">
              <span className="text-2xl font-black text-purple-400 block">4.5–6.0 Tons</span>
              <span className="text-[11px] text-slate-400">Agile Belly Cargo Per Leg</span>
            </div>
          </div>

        </div>
      </section>

      {/* --- 2. INTERACTIVE FLIGHT SEARCH & MULTI-STEP BOOKING ENGINE --- */}
      {activeBookingStep > 0 && (
        <section id="booking-engine" className="py-16 bg-slate-900/70 border-y border-slate-800 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Step Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center space-x-2 text-xs text-sky-400 uppercase tracking-wider font-bold mb-1">
                  <Plane className="w-3.5 h-3.5" />
                  <span>Step {activeBookingStep} of 4</span>
                </div>
                <h2 className="text-2xl font-extrabold text-white flex items-center space-x-2">
                  <span>Avalon Reservation Portal</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Route: Riyadh (RUH) ➔ {currentDestinationObj.name} ({currentDestinationObj.code}) • {departDate} {tripType === 'roundTrip' ? `to ${returnDate}` : '(One-Way)'}
                </p>
              </div>

              {/* Multi-step indicator */}
              <div className="flex items-center space-x-2 text-xs overflow-x-auto pb-1 sm:pb-0">
                <span className={`px-3 py-1.5 rounded-full font-bold transition-colors ${activeBookingStep === 1 ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25' : 'bg-slate-800 text-slate-400'}`}>1. Flight & Fare</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <span className={`px-3 py-1.5 rounded-full font-bold transition-colors ${activeBookingStep === 2 ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25' : 'bg-slate-800 text-slate-400'}`}>2. Customization</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <span className={`px-3 py-1.5 rounded-full font-bold transition-colors ${activeBookingStep === 3 ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25' : 'bg-slate-800 text-slate-400'}`}>3. Checkout</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <span className={`px-3 py-1.5 rounded-full font-bold transition-colors ${activeBookingStep === 4 ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'}`}>4. E-Ticket</span>
              </div>
            </div>

            {/* STEP 1: SELECT FLIGHT & FARE CATEGORY */}
            {activeBookingStep === 1 && (
              <div className="space-y-8 animate-in fade-in duration-300">
                
                {/* Available Flights List */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-sky-400" />
                      <span>Select Departure Flight from RUH (Terminal 3)</span>
                    </h3>
                    <span className="text-xs text-slate-400">All flights operated by Avalon A320neo</span>
                  </div>

                  <div className="space-y-4">
                    {MOCK_FLIGHTS.filter(f => f.dest === selectedDest).length > 0 ? (
                      MOCK_FLIGHTS.filter(f => f.dest === selectedDest).map((flight) => (
                        <div 
                          key={flight.id}
                          onClick={() => setSelectedFlight(flight)}
                          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${selectedFlight?.id === flight.id ? 'bg-slate-800/90 border-sky-400 shadow-xl shadow-sky-500/10 ring-1 ring-sky-400/30' : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'}`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center text-sky-400 font-mono font-extrabold text-xs">
                              <span>{flight.id}</span>
                              <span className="text-[9px] text-amber-400 mt-0.5">DIRECT</span>
                            </div>
                            <div>
                              <div className="flex items-center space-x-3 text-xl font-black text-white">
                                <span>{flight.departure}</span>
                                <div className="flex items-center space-x-1 text-slate-400 text-xs px-2.5 py-0.5 bg-slate-800/90 rounded-full border border-slate-700">
                                  <span>{flight.duration}</span>
                                  <ArrowRight className="w-3 h-3 text-sky-400" />
                                </div>
                                <span>{flight.arrival}</span>
                              </div>
                              <div className="text-xs text-slate-400 mt-1 flex items-center space-x-2">
                                <span>RUH (T3) ➔ {flight.dest}</span>
                                <span>•</span>
                                <span>{flight.aircraft}</span>
                                <span>•</span>
                                <span className="text-emerald-400 font-medium">Belly Cargo Available</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between md:justify-end space-x-6 border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
                            <div className="text-right">
                              <span className="text-[11px] text-slate-400 block">From</span>
                              <span className="text-2xl font-black text-amber-400">{formatPrice(flight.price)}</span>
                              <span className="text-[10px] text-slate-500 block">per adult</span>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedFlight?.id === flight.id ? 'border-sky-400 bg-sky-400' : 'border-slate-600'}`}>
                              {selectedFlight?.id === flight.id && <Check className="w-4 h-4 text-slate-950 font-black" />}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center bg-slate-800/40 rounded-2xl border border-slate-800 text-slate-400 text-sm">
                        No direct flight currently scheduled for this route today. Selecting partner connection.
                      </div>
                    )}
                  </div>
                </div>

                {/* Fare Tiers Cards */}
                <div>
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center space-x-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Choose Your Hybrid Fare Tier</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Value Light */}
                    <div 
                      onClick={() => setFareTier('value')}
                      className={`p-6 rounded-3xl border transition-all cursor-pointer relative flex flex-col justify-between ${fareTier === 'value' ? 'bg-slate-800/90 border-sky-400 ring-2 ring-sky-400/20 shadow-xl' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}`}
                    >
                      <div>
                        <div className="text-xs font-bold uppercase text-slate-400 tracking-wider">Value Light</div>
                        <div className="text-2xl font-black text-white mt-1">Lean Economy</div>
                        <p className="text-xs text-slate-400 mt-2">Essential pricing for agile day travelers and smart budget flyers.</p>
                        <ul className="mt-5 space-y-2.5 text-xs text-slate-300">
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /><span>Standard Ergonomic Recaro Seat</span></li>
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /><span>7kg Cabin Bag + Laptop Case</span></li>
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /><span>Authentic Saudi Coffee & Water</span></li>
                          <li className="flex items-center space-x-2 text-slate-500"><X className="w-4 h-4" /><span>No Checked Luggage</span></li>
                          <li className="flex items-center space-x-2 text-slate-500"><X className="w-4 h-4" /><span>Fee on Date Modification</span></li>
                        </ul>
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between">
                        <span className="text-xs text-slate-400">Base Fare</span>
                        <span className="text-sm font-bold text-white">Included</span>
                      </div>
                    </div>

                    {/* Flex Corporate */}
                    <div 
                      onClick={() => setFareTier('flex')}
                      className={`p-6 rounded-3xl border transition-all cursor-pointer relative flex flex-col justify-between ${fareTier === 'flex' ? 'bg-slate-800/90 border-sky-400 ring-2 ring-sky-400/20 shadow-xl' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}`}
                    >
                      <div className="absolute -top-3 right-6 bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-full shadow-md">
                        Best Hybrid Value
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase text-sky-400 tracking-wider">Flex Corporate</div>
                        <div className="text-2xl font-black text-white mt-1">Smart Business</div>
                        <p className="text-xs text-slate-400 mt-2">Maximum flexibility and convenience designed for Gulf corporate travel.</p>
                        <ul className="mt-5 space-y-2.5 text-xs text-slate-300">
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /><span>1x 23kg Checked Baggage</span></li>
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /><span>Complimentary Standard Seat Pick</span></li>
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /><span>Free Same-Day Date Change</span></li>
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /><span>High-Speed Wi-Fi Chat Pack</span></li>
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-400" /><span>Vision Miles 100% Accrual</span></li>
                        </ul>
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between">
                        <span className="text-xs text-slate-400">Upgrade</span>
                        <span className="text-base font-black text-sky-400">+{formatPrice(110)}</span>
                      </div>
                    </div>

                    {/* Premium Suite */}
                    <div 
                      onClick={() => setFareTier('premium')}
                      className={`p-6 rounded-3xl border transition-all cursor-pointer relative flex flex-col justify-between ${fareTier === 'premium' ? 'bg-slate-800/90 border-amber-400 ring-2 ring-amber-400/20 shadow-xl' : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'}`}
                    >
                      <div className="absolute -top-3 right-6 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-full shadow-md">
                        Executive Suite
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase text-amber-400 tracking-wider">Premium Suite</div>
                        <div className="text-2xl font-black text-white mt-1">Full Service Luxury</div>
                        <p className="text-xs text-slate-400 mt-2">First row comfort, airport lounge sanctuaries, and VIP priority handling.</p>
                        <ul className="mt-5 space-y-2.5 text-xs text-slate-300">
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-amber-400" /><span>2x 32kg Heavy Checked Luggage</span></li>
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-amber-400" /><span>Front Row Recline Suite (Rows 1-3)</span></li>
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-amber-400" /><span>RUH Terminal 3 Alfursan Lounge Pass</span></li>
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-amber-400" /><span>Hot Arabian Gourmet Dining</span></li>
                          <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-amber-400" /><span>Priority Security Fast-Track</span></li>
                        </ul>
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center justify-between">
                        <span className="text-xs text-slate-400">Executive Upgrade</span>
                        <span className="text-base font-black text-amber-400">+{formatPrice(450)}</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Continue button */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                  <div className="text-xs text-slate-400">
                    Selected: <strong className="text-white">{selectedFlight?.id}</strong> ({selectedFlight?.departure} - {selectedFlight?.arrival}) • Tier: <strong className="text-sky-400 uppercase">{fareTier}</strong>
                  </div>
                  <button 
                    onClick={() => setActiveBookingStep(2)}
                    className="bg-sky-500 hover:bg-sky-400 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-sky-500/25 flex items-center space-x-2 cursor-pointer transition-all"
                  >
                    <span>Proceed to Customization</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* STEP 2: ANCILLARIES */}
            {activeBookingStep === 2 && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-white">Customize Your Inflight Experience</h3>
                    <p className="text-xs text-slate-400">Tailor comfort, meals, and baggage for your flight to {currentDestinationObj.name}</p>
                  </div>
                  <button 
                    onClick={() => setSeatModalOpen(true)}
                    className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 rounded-xl px-4 py-2 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Open Airbus A320neo Cabin Seat Map</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Seat Selection */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2.5 bg-sky-500/10 rounded-xl text-sky-400">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">Seat Allocation & Pitch</h4>
                        <p className="text-xs text-slate-400">Currently Selected: <span className="font-mono font-bold text-amber-400">{ancillaries.selectedSeatNumber}</span></p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        { id: 'standard', label: 'Standard Ergonomic Seat', extra: 0, desc: '30-inch pitch, 18-inch seat width' },
                        { id: 'extraLegroom', label: 'Emergency Exit Extra Legroom (+10cm)', extra: 100, desc: '34-inch pitch with rapid egress row' },
                        { id: 'premiumFront', label: 'Front Cabin Priority Recline', extra: 180, desc: 'Rows 1-3, headrest cushion & priority debarkation' }
                      ].map(s => (
                        <label 
                          key={s.id} 
                          className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${ancillaries.seatType === s.id ? 'bg-slate-800/90 border-sky-400 shadow-md' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}
                        >
                          <div className="flex items-start space-x-3">
                            <input 
                              type="radio" 
                              name="seat" 
                              checked={ancillaries.seatType === s.id} 
                              onChange={() => setAncillaries({...ancillaries, seatType: s.id as Ancillaries['seatType']})}
                              className="accent-sky-400 mt-1 cursor-pointer"
                            />
                            <div>
                              <span className="text-xs font-bold text-white block">{s.label}</span>
                              <span className="text-[11px] text-slate-400">{s.desc}</span>
                            </div>
                          </div>
                          <span className="text-xs font-black text-sky-400">{s.extra === 0 ? 'Included' : `+${formatPrice(s.extra)}`}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Extra Baggage & Services */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-400">
                          <Luggage className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">Checked Baggage & Priority Add-ons</h4>
                          <p className="text-xs text-slate-400">Add prepaid baggage with 30% savings vs airport desk</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-800 rounded-2xl mb-4">
                        <div>
                          <span className="text-xs font-bold text-white block">Extra Checked Bag (23 kg)</span>
                          <span className="text-[11px] text-slate-400">{formatPrice(120)} / bag each way</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => setAncillaries(a => ({...a, extraBaggage: Math.max(0, a.extraBaggage - 1)}))}
                            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-sm cursor-pointer border border-slate-700"
                            aria-label="Decrease baggage count"
                          >
                            -
                          </button>
                          <span className="font-mono font-bold text-white text-sm w-4 text-center">{ancillaries.extraBaggage}</span>
                          <button 
                            onClick={() => setAncillaries(a => ({...a, extraBaggage: a.extraBaggage + 1}))}
                            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-sm cursor-pointer border border-slate-700"
                            aria-label="Increase baggage count"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Meal Upgrade & Fast Track Checkboxes */}
                      <div className="space-y-3">
                        <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${ancillaries.mealUpgrade ? 'bg-slate-800/90 border-sky-400' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}>
                          <div className="flex items-center space-x-3">
                            <input 
                              type="checkbox" 
                              checked={ancillaries.mealUpgrade} 
                              onChange={(e) => setAncillaries({...ancillaries, mealUpgrade: e.target.checked})}
                              className="accent-sky-400 rounded cursor-pointer"
                            />
                            <div className="flex items-center space-x-2">
                              <Coffee className="w-4 h-4 text-amber-400" />
                              <span className="text-xs font-semibold text-white">Hot Kabsa & Lamb Cutlet Gourmet Meal</span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-sky-400">+{formatPrice(65)}</span>
                        </label>

                        <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${ancillaries.fastTrack ? 'bg-slate-800/90 border-sky-400' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}>
                          <div className="flex items-center space-x-3">
                            <input 
                              type="checkbox" 
                              checked={ancillaries.fastTrack} 
                              onChange={(e) => setAncillaries({...ancillaries, fastTrack: e.target.checked})}
                              className="accent-sky-400 rounded cursor-pointer"
                            />
                            <div className="flex items-center space-x-2">
                              <Zap className="w-4 h-4 text-sky-400" />
                              <span className="text-xs font-semibold text-white">VIP Fast-Track Security & Boarding</span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-sky-400">+{formatPrice(130)}</span>
                        </label>

                        <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${ancillaries.carbonOffset ? 'bg-slate-800/90 border-emerald-500' : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'}`}>
                          <div className="flex items-center space-x-3">
                            <input 
                              type="checkbox" 
                              checked={ancillaries.carbonOffset} 
                              onChange={(e) => setAncillaries({...ancillaries, carbonOffset: e.target.checked})}
                              className="accent-emerald-500 rounded cursor-pointer"
                            />
                            <div className="flex items-center space-x-2">
                              <Leaf className="w-4 h-4 text-emerald-400" />
                              <span className="text-xs font-semibold text-white">Saudi Green Initiative 100% Carbon Offset</span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-emerald-400">+{formatPrice(20)}</span>
                        </label>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Back / Continue Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                  <button 
                    onClick={() => setActiveBookingStep(1)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-6 py-3 rounded-xl text-xs cursor-pointer transition-colors"
                  >
                    Back to Flights
                  </button>
                  <button 
                    onClick={() => setActiveBookingStep(3)}
                    className="bg-sky-500 hover:bg-sky-400 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-sky-500/20 flex items-center space-x-2 cursor-pointer transition-all"
                  >
                    <span>Proceed to Passenger & Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* STEP 3: PASSENGER & CHECKOUT */}
            {activeBookingStep === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
                
                {/* Passenger Form */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center space-x-2">
                      <Users className="w-4 h-4 text-sky-400" />
                      <span>Primary Passenger Details (Adult 1)</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Title</label>
                        <select 
                          value={passengerInfo.title}
                          onChange={(e) => setPassengerInfo({...passengerInfo, title: e.target.value})}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400"
                        >
                          <option value="Mr">Mr.</option>
                          <option value="Ms">Ms.</option>
                          <option value="Mrs">Mrs.</option>
                          <option value="Dr">Dr.</option>
                          <option value="HE">His Excellency</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Frequent Flyer / Vision Miles #</label>
                        <input 
                          type="text" 
                          value={passengerInfo.frequentFlyer}
                          onChange={(e) => setPassengerInfo({...passengerInfo, frequentFlyer: e.target.value})}
                          placeholder="AV-VISION-XXXXX"
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400 font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 block mb-1">First Name (as on Passport)</label>
                        <input 
                          type="text" 
                          value={passengerInfo.firstName}
                          onChange={(e) => setPassengerInfo({...passengerInfo, firstName: e.target.value})}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Last Name (as on Passport)</label>
                        <input 
                          type="text" 
                          value={passengerInfo.lastName}
                          onChange={(e) => setPassengerInfo({...passengerInfo, lastName: e.target.value})}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Email Address (for E-Ticket PDF)</label>
                        <input 
                          type="email" 
                          value={passengerInfo.email}
                          onChange={(e) => setPassengerInfo({...passengerInfo, email: e.target.value})}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Mobile Number (SMS Flight Alerts)</label>
                        <input 
                          type="text" 
                          value={passengerInfo.phone}
                          onChange={(e) => setPassengerInfo({...passengerInfo, phone: e.target.value})}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs text-slate-400 block mb-1">Passport / National ID Number</label>
                        <input 
                          type="text" 
                          value={passengerInfo.passport}
                          onChange={(e) => setPassengerInfo({...passengerInfo, passport: e.target.value})}
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-emerald-400" />
                      <span>Select Payment Gateway</span>
                    </h3>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[
                        { id: 'mada', label: 'mada Debit (KSA)', icon: '🇸🇦' },
                        { id: 'applepay', label: 'Apple Pay', icon: '' },
                        { id: 'card', label: 'Visa / Mastercard', icon: '💳' }
                      ].map((method) => (
                        <div 
                          key={method.id} 
                          className="p-3.5 bg-slate-800/80 border border-slate-700 hover:border-sky-400 rounded-2xl text-center text-xs font-bold text-slate-200 cursor-pointer flex flex-col items-center justify-center space-y-1 transition-all"
                        >
                          <span className="text-lg">{method.icon}</span>
                          <span>{method.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700/80 text-xs text-slate-300 flex items-start space-x-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white block">SAMA Regulated 256-Bit SSL Payment Engine</span>
                        <p className="text-slate-400 text-[11px] mt-0.5">
                          PCI-DSS Level 1 compliant gateway. Instant e-ticket delivery upon confirmation with zero currency conversion surcharge for Saudi cards.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Summary Sidebar */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-2xl">
                  <div>
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Booking Breakdown</h3>
                    
                    <div className="space-y-3 border-b border-slate-800 pb-4 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>Flight ({selectedFlight?.id})</span>
                        <span className="font-semibold text-white">{formatPrice(selectedFlight?.price || 0)}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Fare Category ({fareTier.toUpperCase()})</span>
                        <span className="font-semibold text-sky-400">{fareTier === 'flex' ? formatPrice(110) : fareTier === 'premium' ? formatPrice(450) : 'Included'}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Trip Type</span>
                        <span className="text-slate-400 capitalize">{tripType === 'roundTrip' ? 'Round Trip (1.85x)' : 'One Way (1.0x)'}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Passengers</span>
                        <span className="font-semibold text-white">{passengers} Guest{passengers > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Seat: {ancillaries.selectedSeatNumber}</span>
                        <span>{ancillaries.seatType === 'extraLegroom' ? formatPrice(100) : ancillaries.seatType === 'premiumFront' ? formatPrice(180) : 'Included'}</span>
                      </div>
                      {ancillaries.extraBaggage > 0 && (
                        <div className="flex justify-between text-slate-300">
                          <span>Extra Bags ({ancillaries.extraBaggage}x 23kg)</span>
                          <span>{formatPrice(ancillaries.extraBaggage * 120)}</span>
                        </div>
                      )}
                      {ancillaries.mealUpgrade && (
                        <div className="flex justify-between text-slate-300">
                          <span>Gourmet Arabian Dining</span>
                          <span>{formatPrice(65)}</span>
                        </div>
                      )}
                      {ancillaries.fastTrack && (
                        <div className="flex justify-between text-slate-300">
                          <span>VIP Fast-Track Pass</span>
                          <span>{formatPrice(130)}</span>
                        </div>
                      )}
                      {ancillaries.carbonOffset && (
                        <div className="flex justify-between text-slate-300">
                          <span>Green Carbon Offset</span>
                          <span className="text-emerald-400">{formatPrice(20)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-slate-300">
                        <span>GACA Airport Taxes & VAT</span>
                        <span className="text-emerald-400 font-semibold">Included</span>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-slate-400 block">Total Due ({currency})</span>
                        <span className="text-xs font-semibold text-slate-300">All Taxes & Fees Included</span>
                      </div>
                      <span className="text-3xl font-black text-amber-400">{formatPrice(computeTotalPrice())}</span>
                    </div>
                  </div>

                  <div className="pt-6 space-y-3">
                    <button 
                      onClick={() => setActiveBookingStep(4)}
                      className="w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black py-4 rounded-2xl shadow-xl shadow-amber-500/20 text-center flex items-center justify-center space-x-2 cursor-pointer transition-all text-sm"
                    >
                      <Sparkles className="w-5 h-5 text-slate-950" />
                      <span>Confirm & Issue E-Ticket</span>
                    </button>
                    <button 
                      onClick={() => setActiveBookingStep(2)}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-slate-400 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Back to Customization
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* STEP 4: INSTANT DIGITAL E-TICKET CONFIRMATION MODAL */}
            {activeBookingStep === 4 && (
              <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto shadow-2xl relative animate-in zoom-in-95 duration-300">
                
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-500/40 shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Booking Confirmed & Issued!</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Your confirmed electronic ticket and digital boarding pass have been registered with Avalon Airlines.
                  </p>
                </div>

                {/* E-Ticket Card Styled Box */}
                <div className="printable-ticket bg-slate-800/90 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
                  {/* Ticket Header */}
                  <div className="bg-gradient-to-r from-sky-600 via-blue-700 to-sky-800 p-5 px-6 flex items-center justify-between text-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                        <Plane className="w-4 h-4 transform -rotate-45" />
                      </div>
                      <div>
                        <span className="font-black tracking-widest text-sm block">AVALON AIRLINES</span>
                        <span className="text-[10px] text-sky-200">ELECTRONIC BOARDING PASS</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-sky-200 block uppercase">Booking Reference (PNR)</span>
                      <span className="font-mono text-lg font-black text-amber-300 tracking-wider">AV-7982K</span>
                    </div>
                  </div>

                  {/* Ticket Body */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-slate-700/80 pb-5">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Lead Passenger</span>
                        <span className="font-bold text-white text-sm">{passengerInfo.title} {passengerInfo.firstName} {passengerInfo.lastName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Flight Number</span>
                        <span className="font-bold text-sky-400 text-sm font-mono">{selectedFlight?.id}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Assigned Seat</span>
                        <span className="font-bold text-amber-400 text-sm font-mono">{ancillaries.selectedSeatNumber}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Fare Tier</span>
                        <span className="font-bold text-emerald-400 text-sm uppercase">{fareTier}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 items-center text-center py-2">
                      <div className="text-left">
                        <span className="text-3xl font-black text-white">RUH</span>
                        <span className="block text-xs text-slate-400">Riyadh Terminal 3</span>
                        <span className="block text-sm font-extrabold text-sky-400 mt-1">{selectedFlight?.departure}</span>
                        <span className="text-[10px] text-slate-500 font-mono">Gate {selectedFlight?.gate || '304'}</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-[11px] text-slate-400 font-mono">{selectedFlight?.duration}</span>
                        <div className="w-full flex items-center space-x-2 my-1">
                          <div className="h-0.5 bg-slate-600 flex-1" />
                          <Plane className="w-5 h-5 text-sky-400 transform rotate-90" />
                          <div className="h-0.5 bg-slate-600 flex-1" />
                        </div>
                        <span className="text-[10px] text-emerald-400 font-semibold uppercase">Non-Stop Direct</span>
                      </div>

                      <div className="text-right">
                        <span className="text-3xl font-black text-white">{selectedDest}</span>
                        <span className="block text-xs text-slate-400">{currentDestinationObj.name} Airport</span>
                        <span className="block text-sm font-extrabold text-sky-400 mt-1">{selectedFlight?.arrival}</span>
                        <span className="text-[10px] text-slate-500">Airbus A320neo</span>
                      </div>
                    </div>

                    {/* QR Code & Flight Details */}
                    <div className="pt-5 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-2.5 bg-white rounded-2xl shadow">
                          <QrCode className="w-20 h-20 text-slate-950" />
                        </div>
                        <div className="text-xs text-slate-400 space-y-1">
                          <span className="block text-white font-bold text-sm">Boarding Pass Ready for Scan</span>
                          <span>Baggage: {ancillaries.extraBaggage + (fareTier === 'value' ? 0 : 1)}x 23kg Checked</span>
                          <span className="block text-amber-300">Gahwa & Deglet Nour Dates Served Inflight</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Total Amount Paid</span>
                        <span className="text-2xl font-black text-amber-400">{formatPrice(computeTotalPrice())}</span>
                        <span className="text-[10px] text-emerald-400 block font-mono">PAID • AUTH #AV9948</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={() => {
                      window.print();
                      showToast('Print command initiated for your boarding pass.');
                    }}
                    className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer transition-colors shadow-lg shadow-sky-500/20"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print / Save PDF Boarding Pass</span>
                  </button>
                  <button 
                    onClick={() => {
                      navigator.clipboard?.writeText(`Avalon Airlines Booking: PNR AV-7982K, Flight ${selectedFlight?.id} RUH -> ${selectedDest}`);
                      showToast('Booking PNR copied to clipboard!');
                    }}
                    className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-6 py-3 rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer transition-colors border border-slate-700"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Trip Details</span>
                  </button>
                  <button 
                    onClick={() => setActiveBookingStep(0)}
                    className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-400 font-semibold px-6 py-3 rounded-xl text-xs cursor-pointer transition-colors"
                  >
                    Close Engine
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
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-amber-400 border border-slate-700">
                      {dest.code}
                    </div>
                    <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-slate-300 border border-slate-700 flex items-center space-x-1">
                      <Wind className="w-3 h-3 text-sky-400" />
                      <span>{dest.temp}</span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-xs font-semibold text-sky-300 block">{dest.country}</span>
                      <h3 className="text-2xl font-black text-white">{dest.name}</h3>
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
                    className="w-full bg-slate-800 hover:bg-sky-500 hover:text-white text-slate-200 font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer"
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
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <span>Turnaround times under 35 minutes at RUH Terminal 3</span>
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
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>High-speed satellite connectivity with free messaging for all</span>
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

            <div className="flex items-center space-x-3 flex-shrink-0">
              <button 
                onClick={() => setFleetModalOpen(true)}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Inspect A320neo Fleet
              </button>
              <div className="px-4 py-2 bg-slate-800/80 rounded-xl border border-slate-700 text-xs font-mono text-sky-300">
                HUB: RUH • T3
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
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Box className="w-6 h-6 text-sky-400" />
                  <h3 className="text-lg font-bold text-white">Track Air Waybill (AWB)</h3>
                </div>
                <div className="flex space-x-2 text-[10px]">
                  <button 
                    type="button" 
                    onClick={() => { setTrackingId('AV-CARGO-884920'); setTrackingResult(CARGO_TRACKING_DB['AV-CARGO-884920']); }}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 font-mono"
                  >
                    Pharma #884920
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { setTrackingId('AV-CARGO-551029'); setTrackingResult(CARGO_TRACKING_DB['AV-CARGO-551029']); }}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 font-mono"
                  >
                    Express #551029
                  </button>
                </div>
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
                  className="bg-sky-500 hover:bg-sky-400 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors cursor-pointer"
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
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-slate-700 pb-4">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Shipment Status</span>
                      <span className="text-sm font-bold text-emerald-400 flex items-center space-x-1.5 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{trackingResult.status}</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Payload Details</span>
                      <span className="text-xs font-semibold text-white block mt-0.5">{trackingResult.type}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{trackingResult.weight} • {trackingResult.pieces} Pcs</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Flight & Route</span>
                      <span className="text-xs font-semibold text-sky-400 block mt-0.5">{trackingResult.flight}</span>
                      <span className="text-[10px] text-slate-400">{trackingResult.origin} ➔ {trackingResult.destination}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Estimated Arrival</span>
                      <span className="text-xs font-semibold text-amber-400 block mt-0.5">{trackingResult.eta}</span>
                      {trackingResult.temperature && (
                        <span className="text-[10px] text-emerald-400 block">{trackingResult.temperature}</span>
                      )}
                    </div>
                  </div>

                  {/* Tracking Timeline */}
                  <div className="space-y-4">
                    {trackingResult.history.map((step, idx) => (
                      <div key={idx} className="flex items-start space-x-3.5">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 ${step.done ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20' : 'bg-slate-700 text-slate-400'}`}>
                          {step.done ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Clock className="w-3.5 h-3.5" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className={`text-xs font-semibold ${step.done ? 'text-white' : 'text-slate-400'}`}>{step.step}</p>
                            <span className="text-[10px] font-mono text-slate-400 ml-2">{step.time}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 block">{step.location}</span>
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
                    <label className="text-xs text-slate-400 block mb-1">Route & Hubs</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 text-white font-mono text-center">
                        Origin: RUH
                      </div>
                      <select 
                        value={cargoCalc.dest}
                        onChange={(e) => setCargoCalc({...cargoCalc, dest: e.target.value})}
                        className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 text-white font-mono text-center focus:outline-none"
                      >
                        <option value="DXB">DXB (Dubai)</option>
                        <option value="JED">JED (Jeddah)</option>
                        <option value="CAI">CAI (Cairo)</option>
                        <option value="BOM">BOM (Mumbai)</option>
                        <option value="DMM">DMM (Dammam)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Gross Weight (kg)</label>
                    <input 
                      type="number" 
                      min="10"
                      max="4500"
                      value={cargoCalc.weight}
                      onChange={(e) => setCargoCalc({...cargoCalc, weight: Number(e.target.value)})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Cargo Commodity Type</label>
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
                    className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3 rounded-xl text-xs shadow-lg transition-colors cursor-pointer"
                  >
                    Calculate Belly-Hold Freight
                  </button>
                </form>

                {calculatedQuote && (
                  <div className="mt-6 p-4 bg-slate-800/80 border border-amber-400/30 rounded-2xl text-center animate-in zoom-in-95 duration-200">
                    <span className="text-[10px] text-slate-400 uppercase block">Estimated Freight Cost ({currency})</span>
                    <span className="text-2xl font-black text-amber-400">{formatPrice(calculatedQuote)}</span>
                    <span className="text-[10px] text-slate-400 block mt-1">Includes terminal screening & fuel surcharge</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-center">
                <span className="text-[11px] text-slate-400">Dedicated B2B Freight Operations Desk:</span>
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
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              Audited operational metrics, fleet delivery timelines, and emissions stewardship aligned with the Saudi Green Initiative.
            </p>
          </div>

          {/* Interactive View Toggle */}
          <div className="flex justify-center mb-10">
            <div className="bg-slate-800 p-1.5 rounded-2xl border border-slate-700 flex space-x-2">
              <button 
                onClick={() => setSustainabilityTab('fleet')}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${sustainabilityTab === 'fleet' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Fleet Expansion Metrics
              </button>
              <button 
                onClick={() => setSustainabilityTab('green')}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${sustainabilityTab === 'green' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                ESG & SAF Commitments
              </button>
            </div>
          </div>

          {/* TAB 1: FLEET SCALING METRICS */}
          {sustainabilityTab === 'fleet' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
              
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 text-center hover:border-slate-700 transition-colors">
                <span className="text-xs text-slate-400 block mb-1">Initial Fleet Scale</span>
                <span className="text-4xl font-black text-sky-400">3 ➔ 8</span>
                <span className="text-[11px] text-slate-400 block mt-2">Airbus A320neo deliveries by Q4 2027</span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 text-center hover:border-slate-700 transition-colors">
                <span className="text-xs text-slate-400 block mb-1">Projected Seat Load Factor</span>
                <span className="text-4xl font-black text-amber-400">88.4%</span>
                <span className="text-[11px] text-slate-400 block mt-2">Optimized 180-seat hybrid layout</span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 text-center hover:border-slate-700 transition-colors">
                <span className="text-xs text-slate-400 block mb-1">Fuel Efficiency Gain</span>
                <span className="text-4xl font-black text-emerald-400">-15%</span>
                <span className="text-[11px] text-slate-400 block mt-2">Lower CO2 per available seat-km</span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 text-center hover:border-slate-700 transition-colors">
                <span className="text-xs text-slate-400 block mb-1">Target Route Network</span>
                <span className="text-4xl font-black text-purple-400">14+</span>
                <span className="text-[11px] text-slate-400 block mt-2">Direct destinations across MENA & Asia</span>
              </div>

            </div>
          )}

          {/* TAB 2: GREEN COMMITMENTS */}
          {sustainabilityTab === 'green' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
              
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Leaf className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-base">Sustainable Aviation Fuel (SAF)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Targeting a 10% SAF blend by 2028 in partnership with Saudi energy suppliers and local refineries to support net-zero aviation targets.
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-base">Zero Single-Use Plastics</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  100% biodegradable cabin catering cutlery and paper products utilized across all flight routes, reducing non-recyclable airport waste.
                </p>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-base">AI Trajectory Optimization</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Continuous descent operations (CDO) minimizing holding patterns and reducing fuel burn during approach into King Khalid Intl.
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
                Avalon Airlines Company LLC. Headquartered in Riyadh, King Khalid International Airport, Kingdom of Saudi Arabia.
              </p>
              {/* GACA Compliance Badge */}
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl inline-flex items-center space-x-2 text-[10px] text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>GACA Air Operator Certificate #849-KSA</span>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h5 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Passenger Services</h5>
              <ul className="space-y-2">
                <li><a href="#hero" className="hover:text-sky-400">Flight Schedules & Booking</a></li>
                <li><button onClick={() => setCheckInModalOpen(true)} className="hover:text-sky-400 text-left">Online Check-in & Boarding Pass</button></li>
                <li><button onClick={() => setStatusModalOpen(true)} className="hover:text-sky-400 text-left">Live Flight Radar Status</button></li>
                <li><button onClick={() => setSeatModalOpen(true)} className="hover:text-sky-400 text-left">Airbus Cabin Seat Map</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Corporate & Cargo</h5>
              <ul className="space-y-2">
                <li><a href="#cargo" className="hover:text-sky-400">B2B Air Freight Tracking</a></li>
                <li><a href="#cargo" className="hover:text-sky-400">Pharma Cold-Chain Logistics</a></li>
                <li><a href="#hybrid" className="hover:text-sky-400">Saudi Vision 2030 Partnership</a></li>
                <li><a href="#sustainability" className="hover:text-sky-400">Investor Relations & Fleet Metrics</a></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="space-y-3">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Avalon Fare Alerts</h5>
              <p className="text-slate-400">Subscribe for exclusive launch offers out of Riyadh Terminal 3.</p>
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
                      showToast('Thank you for subscribing to Avalon fare alerts.');
                      setNewsletterEmail('');
                    }
                  }}
                  className="bg-sky-500 hover:bg-sky-400 text-white font-bold px-4 py-2 rounded-r-xl text-xs cursor-pointer"
                >
                  Join
                </button>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <p>© {new Date().getFullYear()} Avalon Airlines LLC. All rights reserved. Kingdom of Saudi Arabia.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-slate-400">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400">Conditions of Carriage</a>
              <a href="#" className="hover:text-slate-400">GACA Passenger Rights Charter</a>
            </div>
          </div>

        </div>
      </footer>

      {/* --- SEAT MAP SELECTION MODAL --- */}
      {seatModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-black text-white flex items-center space-x-2">
                  <Users className="w-5 h-5 text-sky-400" />
                  <span>Airbus A320neo Cabin Seat Map</span>
                </h3>
                <p className="text-xs text-slate-400">Click any seat to update your selection</p>
              </div>
              <button 
                onClick={() => setSeatModalOpen(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Seat Legend */}
            <div className="flex flex-wrap gap-4 py-4 text-xs border-b border-slate-800 text-slate-300">
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded bg-amber-400 text-slate-950 font-bold text-[9px] flex items-center justify-center">1A</span>
                <span>Premium Suite</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded bg-sky-500 text-white font-bold text-[9px] flex items-center justify-center">12A</span>
                <span>Extra Legroom Exit</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded bg-slate-700 text-slate-200 text-[9px] flex items-center justify-center">14A</span>
                <span>Standard</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded bg-slate-800 text-slate-600 text-[9px] flex items-center justify-center">X</span>
                <span>Occupied</span>
              </div>
            </div>

            {/* Simulated Airplane Body */}
            <div className="py-6 flex flex-col items-center">
              <div className="w-32 py-2 bg-slate-800/80 rounded-t-full text-center text-[10px] font-mono text-slate-400 border border-slate-700 mb-4">
                Cockpit ✈ RUH
              </div>

              {/* Rows 1 to 16 */}
              <div className="space-y-2 w-full max-w-sm">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16].map((row) => {
                  const isPremium = row <= 3;
                  const isExit = row === 11 || row === 12;
                  return (
                    <div key={row} className="flex items-center justify-between text-xs font-mono">
                      {/* Left seats A, B, C */}
                      <div className="flex space-x-1.5">
                        {['A', 'B', 'C'].map((col) => {
                          const seatCode = `${row}${col}`;
                          const isSelected = ancillaries.selectedSeatNumber === seatCode;
                          const isOccupied = (row === 2 && col === 'B') || (row === 5 && col === 'C') || (row === 14 && col === 'B');
                          return (
                            <button
                              key={seatCode}
                              disabled={isOccupied}
                              onClick={() => {
                                setAncillaries({
                                  ...ancillaries,
                                  selectedSeatNumber: seatCode,
                                  seatType: isPremium ? 'premiumFront' : isExit ? 'extraLegroom' : 'standard'
                                });
                                showToast(`Seat ${seatCode} selected!`);
                              }}
                              className={`w-8 h-8 rounded-lg font-bold text-[10px] flex items-center justify-center transition-all ${
                                isOccupied
                                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-800'
                                  : isSelected
                                  ? 'bg-emerald-400 text-slate-950 ring-2 ring-emerald-300 scale-105'
                                  : isPremium
                                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50 hover:bg-amber-400 hover:text-slate-950'
                                  : isExit
                                  ? 'bg-sky-500/20 text-sky-300 border border-sky-400/50 hover:bg-sky-500 hover:text-white'
                                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-500'
                              }`}
                            >
                              {col}
                            </button>
                          );
                        })}
                      </div>

                      {/* Aisle Row Number */}
                      <span className="text-[10px] text-slate-500 px-2">{row}</span>

                      {/* Right seats D, E, F */}
                      <div className="flex space-x-1.5">
                        {['D', 'E', 'F'].map((col) => {
                          const seatCode = `${row}${col}`;
                          const isSelected = ancillaries.selectedSeatNumber === seatCode;
                          const isOccupied = (row === 3 && col === 'D') || (row === 8 && col === 'F') || (row === 12 && col === 'E');
                          return (
                            <button
                              key={seatCode}
                              disabled={isOccupied}
                              onClick={() => {
                                setAncillaries({
                                  ...ancillaries,
                                  selectedSeatNumber: seatCode,
                                  seatType: isPremium ? 'premiumFront' : isExit ? 'extraLegroom' : 'standard'
                                });
                                showToast(`Seat ${seatCode} selected!`);
                              }}
                              className={`w-8 h-8 rounded-lg font-bold text-[10px] flex items-center justify-center transition-all ${
                                isOccupied
                                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-800'
                                  : isSelected
                                  ? 'bg-emerald-400 text-slate-950 ring-2 ring-emerald-300 scale-105'
                                  : isPremium
                                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50 hover:bg-amber-400 hover:text-slate-950'
                                  : isExit
                                  ? 'bg-sky-500/20 text-sky-300 border border-sky-400/50 hover:bg-sky-500 hover:text-white'
                                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-500'
                              }`}
                            >
                              {col}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-300">
                Selected: <strong className="text-amber-400">{ancillaries.selectedSeatNumber}</strong> ({ancillaries.seatType})
              </span>
              <button 
                onClick={() => setSeatModalOpen(false)}
                className="bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- FLIGHT STATUS LOOKUP MODAL --- */}
      {statusModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-black text-white flex items-center space-x-2">
                  <Compass className="w-5 h-5 text-amber-400" />
                  <span>Avalon Flight Status & Radar</span>
                </h3>
                <p className="text-xs text-slate-400">Live operational timetable for King Khalid International Airport (RUH)</p>
              </div>
              <button 
                onClick={() => setStatusModalOpen(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4">
              <input 
                type="text" 
                value={statusSearchQuery}
                onChange={(e) => setStatusSearchQuery(e.target.value)}
                placeholder="Search by flight number (e.g. AV-102, AV-201) or city (Dubai, Jeddah)..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="space-y-3">
              {MOCK_FLIGHTS.filter(f => 
                !statusSearchQuery || 
                f.id.toLowerCase().includes(statusSearchQuery.toLowerCase()) ||
                f.destName.toLowerCase().includes(statusSearchQuery.toLowerCase())
              ).map((f) => (
                <div key={f.id} className="p-4 bg-slate-800/70 border border-slate-700/80 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-sky-400 text-sm">{f.id}</span>
                      <span className="text-xs text-white font-semibold">RUH ➔ {f.dest} ({f.destName})</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Dep: {f.departure} • Arr: {f.arrival} • Gate: {f.gate} ({f.terminal})
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    f.status === 'On Time' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    f.status === 'Boarding' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse' :
                    f.status === 'Departed' ? 'bg-slate-700 text-slate-400' :
                    'bg-sky-500/20 text-sky-300'
                  }`}>
                    {f.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-800 flex justify-end">
              <button 
                onClick={() => setStatusModalOpen(false)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- CHECK-IN / RETRIEVE BOOKING MODAL --- */}
      {checkInModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-black text-white flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <span>Retrieve Booking & Online Check-In</span>
                </h3>
                <p className="text-xs text-slate-400">Available from 48h to 90 min before flight departure</p>
              </div>
              <button 
                onClick={() => setCheckInModalOpen(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Booking Reference (PNR)</label>
                <input 
                  type="text" 
                  value={checkInPnr}
                  onChange={(e) => setCheckInPnr(e.target.value)}
                  placeholder="e.g. AV-7982K"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-sky-400 uppercase"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Passenger Last Name</label>
                <input 
                  type="text" 
                  value={checkInLastName}
                  onChange={(e) => setCheckInLastName(e.target.value)}
                  placeholder="e.g. Al-Mansoor"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700 text-xs text-slate-300">
                <span className="font-semibold text-white block mb-0.5">Sample Demonstration Record:</span>
                PNR: <strong className="text-amber-400">AV-7982K</strong> • Last Name: <strong className="text-sky-400">Al-Mansoor</strong>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button 
                onClick={() => setCheckInModalOpen(false)}
                className="bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setCheckInModalOpen(false);
                  setActiveBookingStep(4);
                  showToast('Boarding pass retrieved for PNR AV-7982K!');
                }}
                className="bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                Retrieve Boarding Pass
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- FLEET EXPLORER MODAL --- */}
      {fleetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-black text-white flex items-center space-x-2">
                  <Plane className="w-5 h-5 text-sky-400" />
                  <span>Avalon Airbus A320neo Family Specifications</span>
                </h3>
                <p className="text-xs text-slate-400">Single-type, fuel-efficient single-aisle fleet optimized for Riyadh hub operations</p>
              </div>
              <button 
                onClick={() => setFleetModalOpen(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase block">Engine Option</span>
                  <span className="text-xs font-bold text-white">CFM LEAP-1A</span>
                </div>
                <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase block">Flight Range</span>
                  <span className="text-xs font-bold text-sky-400">6,500 km (3,500 nm)</span>
                </div>
                <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase block">Passenger Seating</span>
                  <span className="text-xs font-bold text-amber-400">180 Hybrid Layout</span>
                </div>
                <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase block">Noise Footprint</span>
                  <span className="text-xs font-bold text-emerald-400">-50% Reduction</span>
                </div>
                <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase block">Belly Cargo Capacity</span>
                  <span className="text-xs font-bold text-white">Up to 6.0 Tons</span>
                </div>
                <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700">
                  <span className="text-[10px] text-slate-400 uppercase block">Cabin Wi-Fi</span>
                  <span className="text-xs font-bold text-purple-400">Ka-Band Satellite</span>
                </div>
              </div>

              <div className="p-4 bg-slate-800/40 border border-slate-800 rounded-2xl text-xs text-slate-300 space-y-2">
                <span className="font-bold text-white block">Key Operational Advantages for Avalon:</span>
                <p>• Single-type fleet delivers interchangeable flight crews and unified line maintenance across all routes.</p>
                <p>• Sharklet wingtip devices and advanced aerodynamic pylons maximize fuel burn efficiency by 15%.</p>
                <p>• Space-Flex lavatory and galley reconfiguration creates room for generous extra legroom seating while maintaining high freight payload capacity.</p>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button 
                onClick={() => setFleetModalOpen(false)}
                className="bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer"
              >
                Close Fleet Explorer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
