const translations: any = {
  en: {
    // ===== COMMON =====
    loading: "Loading...",
    total: "Total",
    select: "Select",
    save: "Save",
    edit: "Edit",
    continue: "Continue",
    processing: "Processing...",
    searching: "Searching...",
    error: "Error",
    success: "Success",

  // ===== NAVBAR =====
    services: "Travel Services",
    overview: "Overview",
    help: "Help & Support",
    signIn: "Sign in",
    logout: "Log out",
    rides: "Rides",
    account: "My Account",
    user: "User",

    // ===== HOME =====
    heroTitle: "Premium Chauffeur Service",
    heroSubtitle: "Travel in comfort across Spain",
    pickup: "Pickup location",
    drop: "Drop location",
    date: "Date",
    pickupTime: "Pickup Time",
    searchRide: "Search Ride",
    contact: "Contact Us",
    selectDateTime: "Select date & time",
    enterLocation: "Enter locations",
    pickupSpain: "Pickup must be in Spain",
    futureDate: "Select future date & time",
    sameLocation: "Pickup and Drop cannot be same",
    dropSpain: "Drop must be in Spain",

    // ===== CARS =====
    chooseRide: "Choose your ride",
    trip: "Your trip",
    distance: "Distance",

    // ===== DETAILS =====
    passengerDetails: "Passenger Details",
    bookingFor: "Select who you are booking for",
    myself: "Book for myself",
    other: "Book for someone else",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    notes: "Notes",
    reference: "Reference code",
    requiredFields: "Name, phone and email are required",

    // ===== PAYMENT =====
    selectPayment: "Select Payment Method",
    card: "Pay with Card (Credit / Debit)",
    cash: "Pay to driver (Cash)",
    upi: "Pay to driver (UPI)",
    bookRide: "Book Ride",
    paymentFailed: "Payment failed",

    // ===== SUCCESS =====
    bookingConfirmed: "Booking Confirmed",
    bookingSent: "Booking Request Sent",
    waitingDriver: "Waiting for driver confirmation",
    driverOnWay: "Driver is on the way",
    cancelled: "Ride cancelled",
    goHome: "Go Home",
    contactDriver: "Contact Driver",

    // ===== RIDES =====
    myRides: "My Rides",
    noRides: "No rides found",
    status: "Status",
    payment: "Payment",
    unpaid: "Unpaid",

    // ===== ACCOUNT =====
    myAccount: "My Account",
    manageInfo: "Manage your personal information",
    name: "Name",
    phoneLabel: "Mobile phone",
    emailAddress: "Email address",
    password: "Password",
    addCard: "Add new card",

    // ===== LOGIN =====
    welcome: "Welcome",
    continueBtn: "Continue",
    passwordRequired: "Password required",
    emailRequired: "Email required",
    wrongPassword: "Wrong password",
    loginError: "Cannot connect to server",

    // ===== SIGNUP =====
    createAccount: "Create Account",
    verifyEmail: "Verify your email",
    enterOtp: "Enter OTP",
    setPassword: "Set your password",
    sending: "Sending...",
    verifying: "Verifying...",
    creating: "Creating...",

    // ===== FORGOT =====
    forgotPassword: "Forgot Password",
    sendOtp: "Send OTP",
    resetPassword: "Reset Password",
    otpSent: "OTP sent to your email",
    serverError: "Server error",

    // ===== DRIVER =====
    driverDashboard: "Driver Dashboard",
    acceptRide: "Accept Ride",

    // ===== SERVICES =====
    servicesTitle: "Travel Services",
    servicesDesc:
      "Experience seamless and comfortable travel across Europe with professional chauffeur solutions tailored for every journey.",
    service1:
      "Smooth and reliable long-distance travel between major destinations across Europe.",
    service2:
      "Instantly book a professional driver for convenient and flexible travel.",
    service3:
      "Timely pickups and drop-offs designed for stress-free airport travel.",
    service4:
      "Flexible hourly bookings that let you travel at your own pace.",
    service5:
      "Professional drivers delivering a comfortable and premium experience.",
    service6:
      "Luxury vehicles for special occasions and high-end travel experiences.",

    // ===== HELP =====
    helpTitle: "Help & Support",
    helpDesc: "We're here 24/7 to assist you across Europe",
    contactUs: "Contact Us",
    faqTitle: "Frequently Asked Questions",
    faq1q: "How do I book a ride?",
    faq1a: "Enter pickup & drop locations, choose vehicle, and confirm.",
    faq2q: "Can I cancel my booking?",
    faq2a: "Yes, free cancellation before pickup time.",
    faq3q: "Do you operate across Europe?",
    faq3a: "Yes, BarcaLux operates in major European cities.",
    faq4q: "How do I contact my driver?",
    faq4a: "Driver details are shared after booking.",

    // ===== OVERVIEW =====
    overviewTitle: "Overview",
    overviewSub: "BarcaLux Chauffeur Service",
    overviewDesc:
      "Premium private rides across Europe with comfort, safety, and luxury.",

    feature1Title: "Luxury Vehicles",
    feature1Desc:
      "Travel in premium cars like Mercedes V-Class and executive sedans.",

    feature2Title: "Europe Coverage",
    feature2Desc:
      "Available in major cities across Spain and Europe.",

    feature3Title: "On-Time Service",
    feature3Desc:
      "Professional drivers ensuring punctual and safe journeys.",

    howItWorks: "How It Works",

    step1Title: "1. Book Ride",
    step1Desc:
      "Enter your pickup and drop-off location, select date and time.",

    step2Title: "2. Choose Car",
    step2Desc:
      "Select from available vehicles like sedan or van with pricing.",

    step3Title: "3. Enter Details",
    step3Desc:
      "Provide your name, phone number, and email.",

    step4Title: "4. Login / Continue",
    step4Desc:
      "If you are not logged in, you will be asked to log in.",

    step5Title: "5. Payment Options",
    step5Desc:
      "Choose to pay online or pay directly to the driver.",

    step6Title: "6. Booking Confirmation",
    step6Desc:
      "After booking, you receive full details and booking ID.",

    step7Title: "7. Driver Details",
    step7Desc:
      "Driver name, phone number, and vehicle details are shared.",

    step8Title: "8. Support & Help",
    step8Desc: "Contact our support team anytime.",

    bookNow: "Book Your Ride",

    languages: {
      en: "English",
      es: "Español",
      fr: "Français",
      de: "Deutsch",
      ja: "日本語",
      zh: "简体中文",
    },
  },
  

  // ✅ SAFE (NO BREAK)
  es: {},
  fr: {},
  de: {},
  hi: {},
  zh: {},
  ja: {}
};

// ✅ AUTO COPY (VERY IMPORTANT)
translations.es = { ...translations.en };
translations.fr = { ...translations.en };
translations.de = { ...translations.en };
translations.hi = { ...translations.en };
translations.zh = { ...translations.en };
translations.ja = { ...translations.en };

export default translations;