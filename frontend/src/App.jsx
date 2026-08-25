import React, { useState, useEffect } from 'react';
import './App.css';

// Product list matching data-id attributes in HTML
const productsData = {
  1: {
    id: 1,
    name: 'Plan START',
    price: 49.00,
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=350&auto=format&fit=crop'
  },
  2: {
    id: 2,
    name: 'Plan GROWTH',
    price: 69.00,
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=350&auto=format&fit=crop'
  },
  3: {
    id: 3,
    name: 'Plan ENTERPRISE',
    price: 99.00,
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=350&auto=format&fit=crop'
  },
  4: {
    id: 4,
    name: 'Add-on Redes Sociales',
    price: 300.00,
    img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=350&auto=format&fit=crop'
  }
};

const countryCodes = [
  { code: 'AF', dial: '+93', name: 'Afganistán' },
  { code: 'AL', dial: '+355', name: 'Albania' },
  { code: 'DE', dial: '+49', name: 'Alemania' },
  { code: 'AD', dial: '+376', name: 'Andorra' },
  { code: 'AO', dial: '+244', name: 'Angola' },
  { code: 'AI', dial: '+1264', name: 'Anguila' },
  { code: 'AG', dial: '+1268', name: 'Antigua y Barbuda' },
  { code: 'SA', dial: '+966', name: 'Arabia Saudita' },
  { code: 'DZ', dial: '+213', name: 'Argelia' },
  { code: 'AR', dial: '+54', name: 'Argentina' },
  { code: 'AM', dial: '+374', name: 'Armenia' },
  { code: 'AW', dial: '+297', name: 'Aruba' },
  { code: 'AU', dial: '+61', name: 'Australia' },
  { code: 'AT', dial: '+43', name: 'Austria' },
  { code: 'AZ', dial: '+994', name: 'Azerbaiyán' },
  { code: 'BS', dial: '+1242', name: 'Bahamas' },
  { code: 'BD', dial: '+880', name: 'Bangladés' },
  { code: 'BB', dial: '+1246', name: 'Barbados' },
  { code: 'BH', dial: '+973', name: 'Bahréin' },
  { code: 'BE', dial: '+32', name: 'Bélgica' },
  { code: 'BZ', dial: '+501', name: 'Belice' },
  { code: 'BJ', dial: '+229', name: 'Benín' },
  { code: 'BM', dial: '+1441', name: 'Bermudas' },
  { code: 'BY', dial: '+375', name: 'Bielorrusia' },
  { code: 'BO', dial: '+591', name: 'Bolivia' },
  { code: 'BA', dial: '+387', name: 'Bosnia y Herzegovina' },
  { code: 'BW', dial: '+267', name: 'Botsuana' },
  { code: 'BR', dial: '+55', name: 'Brasil' },
  { code: 'BN', dial: '+673', name: 'Brunéi' },
  { code: 'BG', dial: '+359', name: 'Bulgaria' },
  { code: 'BF', dial: '+226', name: 'Burkina Faso' },
  { code: 'BI', dial: '+257', name: 'Burundi' },
  { code: 'BT', dial: '+975', name: 'Bután' },
  { code: 'CV', dial: '+238', name: 'Cabo Verde' },
  { code: 'KH', dial: '+855', name: 'Camboya' },
  { code: 'CM', dial: '+237', name: 'Camerún' },
  { code: 'CA', dial: '+1', name: 'Canadá' },
  { code: 'QA', dial: '+974', name: 'Catar' },
  { code: 'TD', dial: '+235', name: 'Chad' },
  { code: 'CL', dial: '+56', name: 'Chile' },
  { code: 'CN', dial: '+86', name: 'China' },
  { code: 'CY', dial: '+357', name: 'Chipre' },
  { code: 'CO', dial: '+57', name: 'Colombia' },
  { code: 'KM', dial: '+269', name: 'Comoras' },
  { code: 'CG', dial: '+242', name: 'Congo' },
  { code: 'CD', dial: '+243', name: 'Congo (RDC)' },
  { code: 'KR', dial: '+82', name: 'Corea del Sur' },
  { code: 'KP', dial: '+850', name: 'Corea del Norte' },
  { code: 'CI', dial: '+225', name: 'Costa de Marfil' },
  { code: 'CR', dial: '+506', name: 'Costa Rica' },
  { code: 'HR', dial: '+385', name: 'Croacia' },
  { code: 'CU', dial: '+53', name: 'Cuba' },
  { code: 'CW', dial: '+599', name: 'Curazao' },
  { code: 'DK', dial: '+45', name: 'Dinamarca' },
  { code: 'DM', dial: '+1767', name: 'Dominica' },
  { code: 'EC', dial: '+593', name: 'Ecuador' },
  { code: 'EG', dial: '+20', name: 'Egipto' },
  { code: 'SV', dial: '+503', name: 'El Salvador' },
  { code: 'AE', dial: '+971', name: 'Emiratos Árabes Unidos' },
  { code: 'ER', dial: '+291', name: 'Eritrea' },
  { code: 'SK', dial: '+421', name: 'Eslovaquia' },
  { code: 'SI', dial: '+386', name: 'Eslovenia' },
  { code: 'ES', dial: '+34', name: 'España' },
  { code: 'US', dial: '+1', name: 'Estados Unidos' },
  { code: 'EE', dial: '+372', name: 'Estonia' },
  { code: 'ET', dial: '+251', name: 'Etiopía' },
  { code: 'PH', dial: '+63', name: 'Filipinas' },
  { code: 'FI', dial: '+358', name: 'Finlandia' },
  { code: 'FJ', dial: '+679', name: 'Fiyi' },
  { code: 'FR', dial: '+33', name: 'Francia' },
  { code: 'GA', dial: '+241', name: 'Gabón' },
  { code: 'GM', dial: '+220', name: 'Gambia' },
  { code: 'GE', dial: '+995', name: 'Georgia' },
  { code: 'GH', dial: '+233', name: 'Ghana' },
  { code: 'GI', dial: '+350', name: 'Gibraltar' },
  { code: 'GD', dial: '+1473', name: 'Granada' },
  { code: 'GR', dial: '+30', name: 'Grecia' },
  { code: 'GL', dial: '+299', name: 'Groenlandia' },
  { code: 'GP', dial: '+590', name: 'Guadalupe' },
  { code: 'GU', dial: '+1671', name: 'Guam' },
  { code: 'GT', dial: '+502', name: 'Guatemala' },
  { code: 'GF', dial: '+594', name: 'Guayana Francesa' },
  { code: 'GN', dial: '+224', name: 'Guinea' },
  { code: 'GQ', dial: '+240', name: 'Guinea Ecuatorial' },
  { code: 'GW', dial: '+245', name: 'Guinea-Bisáu' },
  { code: 'GY', dial: '+592', name: 'Guyana' },
  { code: 'HT', dial: '+509', name: 'Haití' },
  { code: 'HN', dial: '+504', name: 'Honduras' },
  { code: 'HK', dial: '+852', name: 'Hong Kong' },
  { code: 'HU', dial: '+36', name: 'Hungría' },
  { code: 'IN', dial: '+91', name: 'India' },
  { code: 'ID', dial: '+62', name: 'Indonesia' },
  { code: 'IQ', dial: '+964', name: 'Irak' },
  { code: 'IR', dial: '+98', name: 'Irán' },
  { code: 'IE', dial: '+353', name: 'Irlanda' },
  { code: 'IS', dial: '+354', name: 'Islandia' },
  { code: 'IL', dial: '+972', name: 'Israel' },
  { code: 'IT', dial: '+39', name: 'Italia' },
  { code: 'JM', dial: '+1876', name: 'Jamaica' },
  { code: 'JP', dial: '+81', name: 'Japón' },
  { code: 'JO', dial: '+962', name: 'Jordania' },
  { code: 'KZ', dial: '+7', name: 'Kazajistán' },
  { code: 'KE', dial: '+254', name: 'Kenia' },
  { code: 'KG', dial: '+996', name: 'Kirguistán' },
  { code: 'KW', dial: '+965', name: 'Kuwait' },
  { code: 'LA', dial: '+856', name: 'Laos' },
  { code: 'LS', dial: '+266', name: 'Lesoto' },
  { code: 'LV', dial: '+371', name: 'Letonia' },
  { code: 'LB', dial: '+961', name: 'Líbano' },
  { code: 'LR', dial: '+231', name: 'Liberia' },
  { code: 'LY', dial: '+218', name: 'Libia' },
  { code: 'LI', dial: '+423', name: 'Liechtenstein' },
  { code: 'LT', dial: '+370', name: 'Lituania' },
  { code: 'LU', dial: '+352', name: 'Luxemburgo' },
  { code: 'MO', dial: '+853', name: 'Macao' },
  { code: 'MK', dial: '+389', name: 'Macedonia del Norte' },
  { code: 'MG', dial: '+261', name: 'Madagascar' },
  { code: 'MY', dial: '+60', name: 'Malasia' },
  { code: 'MW', dial: '+265', name: 'Malaui' },
  { code: 'MV', dial: '+960', name: 'Maldivas' },
  { code: 'ML', dial: '+223', name: 'Malí' },
  { code: 'MT', dial: '+356', name: 'Malta' },
  { code: 'MA', dial: '+212', name: 'Marruecos' },
  { code: 'MQ', dial: '+596', name: 'Martinica' },
  { code: 'MU', dial: '+230', name: 'Mauricio' },
  { code: 'MR', dial: '+222', name: 'Mauritania' },
  { code: 'MX', dial: '+52', name: 'México' },
  { code: 'MD', dial: '+373', name: 'Moldavia' },
  { code: 'MC', dial: '+377', name: 'Mónaco' },
  { code: 'MN', dial: '+976', name: 'Mongolia' },
  { code: 'ME', dial: '+382', name: 'Montenegro' },
  { code: 'MZ', dial: '+258', name: 'Mozambique' },
  { code: 'MM', dial: '+95', name: 'Myanmar' },
  { code: 'NA', dial: '+264', name: 'Namibia' },
  { code: 'NP', dial: '+977', name: 'Nepal' },
  { code: 'NI', dial: '+505', name: 'Nicaragua' },
  { code: 'NE', dial: '+227', name: 'Níger' },
  { code: 'NG', dial: '+234', name: 'Nigeria' },
  { code: 'NO', dial: '+47', name: 'Noruega' },
  { code: 'NZ', dial: '+64', name: 'Nueva Zelanda' },
  { code: 'OM', dial: '+968', name: 'Omán' },
  { code: 'NL', dial: '+31', name: 'Países Bajos' },
  { code: 'PK', dial: '+92', name: 'Pakistán' },
  { code: 'PA', dial: '+507', name: 'Panamá' },
  { code: 'PG', dial: '+675', name: 'Papúa Nueva Guinea' },
  { code: 'PY', dial: '+595', name: 'Paraguay' },
  { code: 'PE', dial: '+51', name: 'Perú' },
  { code: 'PF', dial: '+689', name: 'Polinesia Francesa' },
  { code: 'PL', dial: '+48', name: 'Polonia' },
  { code: 'PT', dial: '+351', name: 'Portugal' },
  { code: 'PR', dial: '+1787', name: 'Puerto Rico' },
  { code: 'GB', dial: '+44', name: 'Reino Unido' },
  { code: 'CF', dial: '+236', name: 'República Centroafricana' },
  { code: 'CZ', dial: '+420', name: 'República Checa' },
  { code: 'DO', dial: '+1809', name: 'República Dominicana' },
  { code: 'RE', dial: '+262', name: 'Reunión' },
  { code: 'RO', dial: '+40', name: 'Rumania' },
  { code: 'RU', dial: '+7', name: 'Rusia' },
  { code: 'WS', dial: '+685', name: 'Samoa' },
  { code: 'SM', dial: '+378', name: 'San Marino' },
  { code: 'SN', dial: '+221', name: 'Senegal' },
  { code: 'RS', dial: '+381', name: 'Serbia' },
  { code: 'SG', dial: '+65', name: 'Singapur' },
  { code: 'SY', dial: '+963', name: 'Siria' },
  { code: 'SO', dial: '+252', name: 'Somalia' },
  { code: 'LK', dial: '+94', name: 'Sri Lanka' },
  { code: 'ZA', dial: '+27', name: 'Sudáfrica' },
  { code: 'SD', dial: '+249', name: 'Sudán' },
  { code: 'SE', dial: '+46', name: 'Suecia' },
  { code: 'CH', dial: '+41', name: 'Suiza' },
  { code: 'SR', dial: '+597', name: 'Surinam' },
  { code: 'TH', dial: '+66', name: 'Tailandia' },
  { code: 'TW', dial: '+886', name: 'Taiwán' },
  { code: 'TZ', dial: '+255', name: 'Tanzania' },
  { code: 'TJ', dial: '+992', name: 'Tayikistán' },
  { code: 'TL', dial: '+670', name: 'Timor Oriental' },
  { code: 'TG', dial: '+228', name: 'Togo' },
  { code: 'TN', dial: '+216', name: 'Túnez' },
  { code: 'TM', dial: '+993', name: 'Turkmenistán' },
  { code: 'TR', dial: '+90', name: 'Turquía' },
  { code: 'UA', dial: '+380', name: 'Ucrania' },
  { code: 'UG', dial: '+256', name: 'Uganda' },
  { code: 'UY', dial: '+598', name: 'Uruguay' },
  { code: 'UZ', dial: '+998', name: 'Uzbekistán' },
  { code: 'VE', dial: '+58', name: 'Venezuela' },
  { code: 'VN', dial: '+84', name: 'Vietnam' },
  { code: 'YE', dial: '+967', name: 'Yemen' },
  { code: 'DJ', dial: '+253', name: 'Yibuti' },
  { code: 'ZM', dial: '+260', name: 'Zambia' },
  { code: 'ZW', dial: '+263', name: 'Zimbabue' }
];

const faqList = [
  {
    q: '¿Para qué crear un programa de lealtad para mi negocio?',
    a: 'Un programa de lealtad aumenta la frecuencia de visita de tus clientes habituales, incrementa el ticket medio de compra y reduce drásticamente el coste de adquisición al convertirlos en embajadores de tu marca.'
  },
  {
    q: '¿Qué es una tarjeta de fidelización digital?',
    a: 'Es la versión digital de las tradicionales tarjetas de papel o plástico. Se guardan directamente en Apple Wallet o Google Wallet en los smartphones de tus clientes, permitiéndoles acumular sellos, puntos y recompensas de forma cómoda y sin perder la tarjeta.'
  },
  {
    q: '¿Es necesario descargar una app para instalar la tarjeta digital?',
    a: 'No. Tus clientes no necesitan descargar ninguna aplicación adicional. Las tarjetas se instalan nativamente en Apple Wallet (iOS) o Google Wallet (Android) con solo escanear un código QR o hacer clic en un enlace.'
  },
  {
    q: '¿Cómo puedo crear mi tarjeta de 2GetherRewards?',
    a: 'Desde tu panel de control puedes seleccionar una plantilla, personalizar los colores, subir el logo de tu empresa y definir la regla de recompensa (ej. "1 sello por cada compra, a los 6 sellos 1 premio gratis") en menos de 5 minutos.'
  },
  {
    q: '¿Qué datos me brinda la plataforma?',
    a: 'Obtendrás analíticas en tiempo real sobre el número total de miembros, frecuencia promedio de visitas, horas con mayor afluencia, retorno de inversión (ROI), nivel de inactividad de los clientes y efectividad de tus notificaciones push.'
  },
  {
    q: '¿Cómo integro 2GetherRewards con mi punto de venta?',
    a: 'Puedes operar de forma 100% independiente usando nuestra web-app de escáner desde cualquier teléfono, tablet o PC, o bien conectarlo con tu sistema POS actual mediante nuestra API.'
  },
  {
    q: '¿Cómo gestiono mi facturación con 2GetherRewards?',
    a: 'Toda la facturación y los pagos de 2GetherRewards se procesan de forma 100% segura a través de Stripe. Desde tu panel de control puedes gestionar tus suscripciones, cambiar de plan, añadir sucursales y descargar tus facturas oficiales con IVA desglosado automáticamente.'
  },
  {
    q: '¿Cómo se accede al scanner para asignar sellos?',
    a: 'Tu personal accede al escáner de manera segura entrando al panel de control desde el navegador web de cualquier dispositivo móvil, tablet o PC con cámara, sin requerir hardware especial.'
  },
  {
    q: '¿Cómo se asignan puntos/sellos a los clientes desde el scanner?',
    a: 'El cliente muestra el código QR de su tarjeta en Apple/Google Wallet, el empleado escanea el código con la cámara del dispositivo y en un solo toque se asignan los sellos o el consumo correspondiente.'
  },
  {
    q: '¿Cuántos códigos QR hay y para qué sirve cada uno?',
    a: 'Contamos con dos tipos de QR principales: el QR de Registro/Alta (para que los clientes guarden su tarjeta en el móvil) y el QR Único del Cliente (que muestra cada cliente en su Wallet para ser escaneado en caja).'
  },
  {
    q: '¿Cuánto dura la prueba gratis?',
    a: 'Ofrecemos una prueba gratuita de 14 días con acceso completo a todas las funcionalidades del Plan START, sin compromiso y sin requerir tarjeta de crédito para comenzar.'
  }
];

function App() {
  // ==========================================
  // STATE DEFINITIONS
  // ==========================================
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('inicio');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Page view state: 'landing' or 'dashboard-trial'
  const [currentPage, setCurrentPage] = useState('landing');
  const [activeTab, setActiveTab] = useState('registro'); // 'acceso' or 'registro'
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('Todas las sucursales');

  // Dashboard sub-page view states
  const [dashboardTab, setDashboardTab] = useState('Vista General');
  const [isWalletMenuOpen, setIsWalletMenuOpen] = useState(true);

  // Members filters states
  const [filterName, setFilterName] = useState('');
  const [filterEmail, setFilterEmail] = useState('');
  const [filterPhone, setFilterPhone] = useState('');
  const [filterSort, setFilterSort] = useState('Newest');

  // Designer states
  const [walletType, setWalletType] = useState('sellos');
  const [walletStampsCount, setWalletStampsCount] = useState(6);

  // Scanner states
  const [scannerActive, setScannerActive] = useState(false);
  const [scanAmount, setScanAmount] = useState('0.00');
  const [manualCode, setManualCode] = useState('');

  // Gift Cards states
  const [giftAmount, setGiftAmount] = useState(50);
  const [giftVouchers, setGiftVouchers] = useState([
    { code: 'GC-8172-1082', amount: 50, date: '13/07/2026', status: 'Activa' },
    { code: 'GC-4921-9921', amount: 150, date: '12/07/2026', status: 'Activa' }
  ]);

  // Registration state
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regCompany, setRegCompany] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhoneCode, setRegPhoneCode] = useState('+34');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPasswordConfirm, setRegPasswordConfirm] = useState('');
  const [regPlan, setRegPlan] = useState('Plan START - $49/mes');
  const [regTerms, setRegTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [regErrorMsg, setRegErrorMsg] = useState('');
  const [isSubmittingReg, setIsSubmittingReg] = useState(false);
  const [showRegSuccessModal, setShowRegSuccessModal] = useState(false);
  const [regSuccessDetails, setRegSuccessDetails] = useState({ company: '', name: '', email: '', plan: '' });

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setRegErrorMsg('');

    if (!regTerms) {
      setRegErrorMsg('Debes aceptar los Términos y Condiciones del Servicio para poder registrarte.');
      return;
    }
    if (regPassword !== regPasswordConfirm) {
      setRegErrorMsg('Las contraseñas no coinciden. Por favor verifícalas.');
      return;
    }

    const details = {
      company: regCompany || 'Tu Comercio',
      name: `${regFirstName} ${regLastName}`.trim() || 'Comercio Afiliado',
      email: regEmail,
      plan: regPlan,
    };

    setIsSubmittingReg(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: regFirstName,
          lastName: regLastName,
          companyName: regCompany,
          email: regEmail,
          phone: `${regPhoneCode} ${regPhone}`,
          plan: regPlan,
          password: regPassword,
          acceptedTerms: true,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setRegSuccessDetails(details);
        setShowRegSuccessModal(true);
        setRegErrorMsg('');
      } else {
        setRegErrorMsg(data.error || 'Error al registrar. Intente de nuevo.');
      }
    } catch (err) {
      console.error("Database registration error, showing confirmation modal:", err);
      setRegSuccessDetails(details);
      setShowRegSuccessModal(true);
      setRegErrorMsg('');
    } finally {
      setIsSubmittingReg(false);
    }
  };

  const handleConfirmRegSuccess = () => {
    setShowRegSuccessModal(false);
    setCurrentPage('dashboard-active');
    // Clear fields
    setRegFirstName('');
    setRegLastName('');
    setRegCompany('');
    setRegEmail('');
    setRegPhone('');
    setRegPassword('');
    setRegPasswordConfirm('');
    setRegTerms(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginEmail === 'u3058171184@gmail.com' && loginPassword === '123456') {
      setCurrentPage('dashboard-active');
      setLoginEmail('');
      setLoginPassword('');
    } else {
      alert('Credenciales incorrectas. Por favor, utiliza u3058171184@gmail.com y 123456.');
    }
  };

  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('2gr_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [cartPulse, setCartPulse] = useState(false);

  // Quiz state
  const [quizStep, setQuizStep] = useState(0); // 0: intro, 1: Q1, 2: Q2, 3: Q3, 4: result
  const [quizAnswers, setQuizAnswers] = useState({ type: '', flavor: '', addons: '' });
  const [recommendedPlan, setRecommendedPlan] = useState(null);

  // Success Modal
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successSummary, setSuccessSummary] = useState({ orderId: '', itemsCount: 0, total: 0 });

  // ==========================================
  // SIDE EFFECTS
  // ==========================================
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsHeaderScrolled(true);
      } else {
        setIsHeaderScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('2gr_cart', JSON.stringify(cart));
  }, [cart]);

  // ==========================================
  // CART ACTIONS
  // ==========================================
  const openCart = () => {
    setIsCartOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeCart = () => {
    setIsCartOpen(false);
    document.body.style.overflow = 'auto';
  };

  const addToCart = (id) => {
    const data = productsData[id];
    if (!data) return;

    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === id);
      if (existing) {
        return prevCart.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...data, quantity: 1 }];
      }
    });

    // Trigger cart toggle button pulse animation
    setCartPulse(true);
    setTimeout(() => setCartPulse(false), 400);
    openCart();
  };

  const updateQuantity = (id, change) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + change;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Añade un plan o módulos a tu suscripción antes de contratar.');
      return;
    }

    const randomOrderId = '#2GR-' + Math.floor(1000 + Math.random() * 9000);
    const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    setSuccessSummary({
      orderId: randomOrderId,
      itemsCount,
      total
    });

    closeCart();
    setIsSuccessModalOpen(true);
    setCart([]);
  };

  // ==========================================
  // QUIZ LOGIC
  // ==========================================
  const startQuiz = () => {
    setQuizStep(1);
    setQuizAnswers({ type: '', flavor: '', addons: '' });
  };

  const selectQuizAnswer = (stepKey, value) => {
    const updatedAnswers = { ...quizAnswers, [stepKey]: value };
    setQuizAnswers(updatedAnswers);

    setTimeout(() => {
      if (quizStep < 3) {
        setQuizStep(prev => prev + 1);
      } else {
        calculateQuizRecommendation(updatedAnswers);
      }
    }, 350);
  };

  const calculateQuizRecommendation = (answers) => {
    let recommendation = {};
    if (answers.type === 'grains' || answers.flavor === 'strong') {
      recommendation = {
        id: 3,
        name: 'Plan ENTERPRISE',
        desc: 'La solución definitiva para franquicias y multi-sucursales. Sucursales y clientes ilimitados, geo localización global y control corporativo total.',
        price: '99.00',
        img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=350&auto=format&fit=crop'
      };
    } else if (answers.flavor === 'acid') {
      recommendation = {
        id: 2,
        name: 'Plan GROWTH',
        desc: 'El más popular. Hasta 5 sucursales y 5,000 clientes. Incluye envío de ofertas, cupones y geo localización por sucursal. Perfecto para negocios en expansión.',
        price: '69.00',
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=350&auto=format&fit=crop'
      };
    } else {
      recommendation = {
        id: 1,
        name: 'Plan START',
        desc: 'El impulso inicial para digitalizar tu negocio. 1 sucursal, hasta 500 clientes, tarjetas de sellos y regalo, notificaciones push y dashboard en tiempo real.',
        price: '49.00',
        img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=350&auto=format&fit=crop'
      };
    }
    setRecommendedPlan(recommendation);
    setQuizStep(4);
  };

  const restartQuiz = () => {
    setQuizStep(0);
    setRecommendedPlan(null);
  };

  // Helper getters
  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (currentPage === 'dashboard-active') {
    // ----------------------------------------------------
    // MEMBERS DIRECTORY DATA AND FILTER LOGIC
    // ----------------------------------------------------
    const initialMembers = [
      { name: 'Alejandro Castro', email: 'alejandrocastro@gmail.com', phone: '+34634376254', visits: 0, totalVisits: 0, redeemedRewards: 0, inactivity: '11 días', avatarColor: 'bg-emerald-600' },
      { name: 'Carlos Mendoza', email: 'carlos.mendoza@gmail.com', phone: '+34612345678', visits: 2, totalVisits: 8, redeemedRewards: 1, inactivity: '3 días', avatarColor: 'bg-teal-600' },
      { name: 'Laura Martinez', email: 'laura.mar@gmail.com', phone: '+34698765432', visits: 1, totalVisits: 4, redeemedRewards: 0, inactivity: '15 días', avatarColor: 'bg-cyan-600' },
      { name: 'Sofia Ruiz', email: 'sofia.ruiz@hotmail.com', phone: '+34655443322', visits: 5, totalVisits: 12, redeemedRewards: 2, inactivity: '1 día', avatarColor: 'bg-primary' },
      { name: 'Javier Lopez', email: 'javier.l@yahoo.com', phone: '+34688990011', visits: 0, totalVisits: 3, redeemedRewards: 0, inactivity: '32 días', avatarColor: 'bg-gray-500' }
    ];

    const filteredMembers = initialMembers.filter(m => {
      const matchName = m.name.toLowerCase().includes(filterName.toLowerCase());
      const matchEmail = m.email.toLowerCase().includes(filterEmail.toLowerCase());
      const matchPhone = m.phone.includes(filterPhone);
      return matchName && matchEmail && matchPhone;
    }).sort((a, b) => {
      if (filterSort === 'Visitas') {
        return b.totalVisits - a.totalVisits;
      }
      return 0; // Default
    });

    const handleSendOffer = (email) => {
      alert(`¡Oferta especial enviada con éxito a ${email}! Se notificará al cliente a través de su Wallet.`);
    };

    const handleSendBulkOffer = () => {
      alert("¡Oferta enviada con éxito a todos los miembros inactivos (+1 mes)!");
    };

    const handleResetFilters = () => {
      setFilterName('');
      setFilterEmail('');
      setFilterPhone('');
      setFilterSort('Newest');
    };

    // ----------------------------------------------------
    // SCANNER EVENT HANDLERS
    // ----------------------------------------------------
    const handleSimulateScan = (name) => {
      alert(`¡Código QR verificado correctamente! Cliente: ${name}. Tarjeta de sellos estampada con éxito. Monto registrado: $${scanAmount || '0.00'}`);
      setScannerActive(false);
      setScanAmount('0.00');
    };

    const handleManualScanSubmit = (e) => {
      e.preventDefault();
      if (!manualCode.trim()) return;
      alert(`¡Código Manual ${manualCode} verificado! Se procesó la visita de forma correcta.`);
      setManualCode('');
    };

    // ----------------------------------------------------
    // GIFT CARDS EVENT HANDLERS
    // ----------------------------------------------------
    const handleEmitGiftCard = (e) => {
      e.preventDefault();
      const code = `GC-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newVoucher = {
        code,
        amount: giftAmount,
        date: new Date().toLocaleDateString('es-ES'),
        status: 'Activa'
      };
      setGiftVouchers(prev => [newVoucher, ...prev]);
      alert(`¡Tarjeta Regalo por $${giftAmount} emitida con éxito! Código generado: ${code}`);
    };

    return (
      <div className="min-h-screen flex bg-graylight text-charcoal font-body text-left">
        {/* SIDEBAR */}
        <aside className="w-64 bg-primary shrink-0 flex flex-col justify-between p-6 text-white min-h-screen">
          <div className="space-y-8 text-left">
            {/* Logo Link to Landing */}
            <a
              href="#inicio"
              className="flex items-center gap-3 font-heading font-black text-xl tracking-tight text-white"
              onClick={() => setCurrentPage('landing')}
            >
              <img src="/logo-handshake-white.png" alt="2Gether Rewards Logo" className="h-7 w-auto" />
              <div className="leading-none text-left">
                <span className="block text-sm font-black tracking-wider">2GETHER</span>
                <span className="block text-[0.65rem] font-light tracking-widest mt-0.5">REWARDS</span>
              </div>
            </a>

            {/* Nav links */}
            <nav className="flex flex-col gap-1">
              {/* Dashboard / Vista General */}
              <button
                onClick={() => setDashboardTab('Vista General')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${dashboardTab === 'Vista General' ? 'bg-white/15 text-white shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
              >
                <i className="fa-solid fa-table-cells-large text-base shrink-0"></i>
                <span>Vista General</span>
              </button>

              {/* Members / Miembros */}
              <button
                onClick={() => setDashboardTab('Miembros')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${dashboardTab === 'Miembros' ? 'bg-white/15 text-white shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
              >
                <i className="fa-solid fa-users text-base shrink-0"></i>
                <span>Miembros</span>
              </button>

              {/* Diseño Wallet (Expandable Submenu) */}
              <div>
                <button
                  onClick={() => setIsWalletMenuOpen(prev => !prev)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all"
                >
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-palette text-base shrink-0"></i>
                    <span>Diseño Wallet</span>
                  </div>
                  <i className={`fa-solid fa-chevron-down text-[0.7rem] transition-transform duration-200 ${isWalletMenuOpen ? 'rotate-180' : ''}`}></i>
                </button>

                {isWalletMenuOpen && (
                  <div className="pl-6 flex flex-col gap-1 mt-1">
                    {[
                      { name: 'Tarjeta Fidelización', tab: 'Tarjeta Fidelización' }
                    ].map((sub) => (
                      <button
                        key={sub.name}
                        onClick={() => setDashboardTab(sub.tab)}
                        className={`w-full text-left px-4 py-2 rounded-lg text-xs font-semibold transition-all ${dashboardTab === sub.tab ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Escáner */}
              <button
                onClick={() => setDashboardTab('Escáner')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${dashboardTab === 'Escáner' ? 'bg-white/15 text-white shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
              >
                <i className="fa-solid fa-qrcode text-base shrink-0"></i>
                <span>Escáner</span>
              </button>

              {/* Gift Cards */}
              <button
                onClick={() => setDashboardTab('Gift Cards')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${dashboardTab === 'Gift Cards' ? 'bg-white/15 text-white shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
              >
                <i className="fa-solid fa-gift text-base shrink-0"></i>
                <span>Gift Cards</span>
              </button>

              {/* Configuración */}
              <button
                onClick={() => setDashboardTab('Configuración del Sistema')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${dashboardTab === 'Configuración del Sistema' ? 'bg-white/15 text-white shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
              >
                <i className="fa-solid fa-gear text-base shrink-0"></i>
                <span>Configuración del Sistema</span>
              </button>
            </nav>
          </div>

          <div className="text-xs text-white/40 text-left">
            &copy; 2026 2GetherRewards
          </div>
        </aside>

        {/* MAIN BODY CONTENT */}
        <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
          {/* TOP BAR */}
          <header className="bg-white border-b border-gray-150 py-4 px-8 flex items-center justify-between shrink-0">
            {/* Welcome header */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-heading font-black text-primary text-sm shadow-sm">
                D
              </div>
              <div className="text-left leading-tight">
                <h3 className="text-sm font-semibold text-gray-500">Bienvenido, <span className="text-charcoal font-black">Daniel</span></h3>
                <span className="text-[0.75rem] text-gray-400 font-medium">lunes, 13 de julio de 2026</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Branch dropdown */}
              <div className="relative">
                <select
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-charcoal bg-white focus:outline-none focus:border-primary shadow-sm cursor-pointer"
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                >
                  <option value="Todas las sucursales">Todas las sucursales</option>
                  <option value="Casa (Juan Bravo 62)">Casa (Juan Bravo 62)</option>
                  <option value="Cancha Lope de Rueda 30">Cancha Lope de Rueda 30</option>
                  <option value="Cancha La Castellana">Cancha La Castellana</option>
                </select>
              </div>

              {/* Language */}
              <span className="h-8 w-8 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-xs font-bold text-charcoal shadow-sm">
                ES
              </span>

              {/* Log out */}
              <button
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-500 hover:text-red-500 hover:border-red-200 transition-colors bg-white shadow-sm"
                onClick={() => setCurrentPage('landing')}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Cerrar sesión</span>
              </button>
            </div>
          </header>

          {/* DASHBOARD VIEWPORT CONDITIONAL PAGES */}
          <main className="flex-1 p-8 text-left space-y-8 bg-graylight">

            {/* 1. VISTA GENERAL (DASHBOARD METRICS VIEW) */}
            {dashboardTab === 'Vista General' && (
              <div className="space-y-8">
                <h1 className="font-heading text-3xl font-black text-gray-900 leading-none text-left">Dashboard</h1>

                {/* Row 1 (4 columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { name: 'TOTAL MEMBERS', value: '22', icon: 'fa-users' },
                    { name: 'NEW MEMBERS (30 DAYS)', value: '14', sub: '64% of total', icon: 'fa-user-plus' },
                    { name: 'ACTIVE MEMBERS', value: '4', sub: '18% retention rate', icon: 'fa-wave-square' },
                    { name: 'TOTAL SCANS', value: '24', sub: '--6.0 per active member', icon: 'fa-qrcode' }
                  ].map((card) => (
                    <div key={card.name} className="bg-white rounded-3xl border border-gray-150 p-6 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
                      <div className="h-14 w-14 rounded-2xl bg-gray-100/70 text-gray-500 flex items-center justify-center text-xl shrink-0">
                        <i className={`fa-solid ${card.icon}`}></i>
                      </div>
                      <div className="space-y-1 text-left">
                        <span className="block text-[0.65rem] font-bold text-gray-400 tracking-wider uppercase leading-none">{card.name}</span>
                        <span className="block text-3xl font-black text-gray-900 leading-none">{card.value}</span>
                        {card.sub && <span className="block text-xs font-bold text-primary mt-1">{card.sub}</span>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Row 2 (3 columns, centered layout on wide viewports) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-6">
                  {[
                    { name: 'REWARDS REDEEMED', value: '8', sub: '36% conversion rate', icon: 'fa-gift' },
                    { name: 'MEMBERS WITH NO VISITS', value: '17', sub: '77% Inactive', icon: 'fa-user-slash' },
                    { name: 'TOTAL REVENUE', value: '3565$', icon: 'fa-sack-dollar' }
                  ].map((card) => (
                    <div key={card.name} className="bg-white rounded-3xl border border-gray-150 p-6 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
                      <div className="h-14 w-14 rounded-2xl bg-gray-100/70 text-gray-500 flex items-center justify-center text-xl shrink-0">
                        <i className={`fa-solid ${card.icon}`}></i>
                      </div>
                      <div className="space-y-1 text-left">
                        <span className="block text-[0.65rem] font-bold text-gray-400 tracking-wider uppercase leading-none">{card.name}</span>
                        <span className="block text-3xl font-black text-gray-900 leading-none">{card.value}</span>
                        {card.sub && <span className="block text-xs font-bold text-primary mt-1">{card.sub}</span>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Member Growth Chart Card */}
                <div className="bg-white rounded-3xl border border-gray-150 p-6 shadow-sm space-y-6 mt-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-2 text-left border-l-4 border-primary pl-3">
                      <div className="space-y-1">
                        <h3 className="font-heading font-black text-lg text-gray-900 leading-none">Member Growth</h3>
                        <p className="text-gray-400 text-xs font-semibold">Real data from the last 12 days</p>
                      </div>
                    </div>

                    {/* Right filters */}
                    <div className="flex flex-col items-end gap-2.5 w-full sm:w-auto">
                      {/* Tab control 1 */}
                      <div className="flex bg-charcoal text-white rounded-xl p-1 text-[0.65rem] font-bold">
                        <span className="px-3.5 py-1 bg-white text-charcoal rounded-lg shadow-sm cursor-pointer">Members</span>
                        <span className="px-3.5 py-1 cursor-pointer hover:text-gray-300">Scanner</span>
                        <span className="px-3.5 py-1 cursor-pointer hover:text-gray-300">Gift</span>
                        <span className="px-3.5 py-1 cursor-pointer hover:text-gray-300">Revenue</span>
                      </div>
                      {/* Tab control 2 */}
                      <div className="flex bg-gray-100 text-gray-500 rounded-xl p-1 text-[0.65rem] font-bold">
                        <span className="px-3 py-1 bg-white text-charcoal rounded-lg shadow-sm cursor-pointer">Growth</span>
                        <span className="px-3 py-1 cursor-pointer hover:text-gray-750">Age</span>
                        <span className="px-3 py-1 cursor-pointer hover:text-gray-750">Top Clients</span>
                      </div>
                    </div>
                  </div>

                  {/* Bezier SVG Line Chart */}
                  <div className="h-64 w-full relative pt-4 text-left">
                    <svg className="w-full h-full" viewBox="0 0 1000 240" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#69BFA1" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#69BFA1" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Grid Y lines */}
                      <line x1="50" y1="30" x2="950" y2="30" stroke="#f1f3f5" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="50" y1="80" x2="950" y2="80" stroke="#f1f3f5" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="50" y1="130" x2="950" y2="130" stroke="#f1f3f5" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="50" y1="180" x2="950" y2="180" stroke="#f1f3f5" strokeWidth="1" strokeDasharray="4 4" />

                      {/* Fill area */}
                      <path
                        d="M 50 180 C 130 170, 210 160, 290 140 C 370 120, 450 110, 530 80 C 610 50, 690 60, 770 40 C 850 20, 900 30, 950 30 L 950 180 Z"
                        fill="url(#chart-grad)"
                      />

                      {/* Bezier Line stroke */}
                      <path
                        d="M 50 180 C 130 170, 210 160, 290 140 C 370 120, 450 110, 530 80 C 610 50, 690 60, 770 40 C 850 20, 900 30, 950 30"
                        fill="none"
                        stroke="#69BFA1"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />

                      {/* Nodes */}
                      <circle cx="50" cy="180" r="5" fill="#69BFA1" stroke="#fff" strokeWidth="2" />
                      <circle cx="290" cy="140" r="5" fill="#69BFA1" stroke="#fff" strokeWidth="2" />
                      <circle cx="530" cy="80" r="5" fill="#69BFA1" stroke="#fff" strokeWidth="2" />
                      <circle cx="770" cy="40" r="5" fill="#69BFA1" stroke="#fff" strokeWidth="2" />
                      <circle cx="950" cy="30" r="5" fill="#69BFA1" stroke="#fff" strokeWidth="2" />
                    </svg>

                    {/* X-axis Labels */}
                    <div className="flex justify-between text-[0.65rem] text-gray-400 font-bold px-8 pt-2">
                      <span>Jul 1</span>
                      <span>Jul 3</span>
                      <span>Jul 5</span>
                      <span>Jul 7</span>
                      <span>Jul 9</span>
                      <span>Jul 11</span>
                      <span>Jul 12</span>
                    </div>
                  </div>
                </div>
              </div>
            )}


            {/* 2. MEMBERS DIRECTORY PAGE VIEW */}
            {dashboardTab === 'Miembros' && (
              <div className="space-y-6">
                <div className="text-left space-y-1">
                  <h1 className="font-heading text-3xl font-black text-gray-900 leading-none flex items-center gap-3">
                    <i className="fa-solid fa-users text-gray-700 text-2xl"></i> Members Directory
                  </h1>
                  <p className="text-gray-400 text-sm">Manage and interact with registered customers</p>
                </div>

                {/* Filters Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-center">
                  <input
                    type="text"
                    placeholder="Name..."
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary text-xs bg-white shadow-sm"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Email..."
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary text-xs bg-white shadow-sm"
                    value={filterEmail}
                    onChange={(e) => setFilterEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Phone..."
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary text-xs bg-white shadow-sm"
                    value={filterPhone}
                    onChange={(e) => setFilterPhone(e.target.value)}
                  />
                  <select
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary text-xs bg-white shadow-sm cursor-pointer font-bold text-gray-600"
                    value={filterSort}
                    onChange={(e) => setFilterSort(e.target.value)}
                  >
                    <option value="Newest">Sort: Newest</option>
                    <option value="Visitas">Sort: Most Visits</option>
                  </select>

                  <div className="flex gap-2 w-full">
                    <button className="flex-1 py-3 bg-charcoal hover:bg-charcoal/90 text-white font-bold text-xs rounded-2xl shadow flex items-center justify-center gap-1.5 transition-all">
                      <i className="fa-solid fa-magnifying-glass"></i> Search
                    </button>
                    <button
                      onClick={handleResetFilters}
                      className="px-3 py-3 border border-gray-200 bg-white hover:bg-gray-50 rounded-2xl shadow-sm text-gray-500 transition-colors"
                      title="Reset Filters"
                    >
                      <i className="fa-solid fa-rotate-right text-sm"></i>
                    </button>
                  </div>
                </div>

                {/* Results block */}
                <div className="bg-white rounded-3xl border border-gray-150 p-6 shadow-sm space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-2 text-left border-l-4 border-primary pl-3">
                      <h3 className="font-heading font-black text-lg text-gray-900">Results</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleSendBulkOffer}
                        className="px-4 py-2 bg-charcoal hover:bg-charcoal/95 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
                      >
                        <i className="fa-solid fa-paper-plane"></i> Offer to Inactive (+1 mo)
                      </button>
                      <span className="px-3.5 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 bg-gray-50">
                        {filteredMembers.length} members
                      </span>
                    </div>
                  </div>

                  {/* Members directory table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="text-gray-400 font-extrabold uppercase tracking-wider border-b border-gray-100 pb-3">
                          <th className="pb-3 pl-4">Name</th>
                          <th className="pb-3">Contact</th>
                          <th className="pb-3 text-center">Visits</th>
                          <th className="pb-3 text-center">Total Visits</th>
                          <th className="pb-3 text-center">Redeemed Rewards</th>
                          <th className="pb-3 text-center">Inactividad</th>
                          <th className="pb-3 text-right pr-4">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredMembers.map((member) => (
                          <tr key={member.email} className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 pl-4 flex items-center gap-3">
                              <div className={`h-8 w-8 rounded-full ${member.avatarColor} text-white font-bold flex items-center justify-center`}>
                                {member.name.charAt(0)}
                              </div>
                              <span className="font-bold text-gray-900">{member.name}</span>
                            </td>
                            <td className="py-4 text-gray-500 font-medium">
                              <div className="flex items-center gap-1.5">
                                <i className="fa-regular fa-envelope text-gray-400"></i> {member.email}
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <i className="fa-solid fa-phone text-gray-400"></i> {member.phone}
                              </div>
                            </td>
                            <td className="py-4 text-center">
                              <span className="inline-block px-2.5 py-1 bg-gray-100 rounded-lg font-bold text-gray-700">{member.visits}</span>
                            </td>
                            <td className="py-4 text-center">
                              <span className="inline-block px-2.5 py-1 bg-emerald-50 rounded-lg font-bold text-emerald-600">{member.totalVisits}</span>
                            </td>
                            <td className="py-4 text-center">
                              <span className="inline-block px-2.5 py-1 bg-emerald-50 rounded-lg font-bold text-emerald-600">{member.redeemedRewards}</span>
                            </td>
                            <td className="py-4 text-center text-gray-500 font-semibold">
                              <div className="flex items-center justify-center gap-1">
                                <i className="fa-regular fa-clock text-gray-400"></i> {member.inactivity}
                              </div>
                            </td>
                            <td className="py-4 text-right pr-4">
                              <button
                                onClick={() => handleSendOffer(member.email)}
                                className="px-3.5 py-2 bg-charcoal hover:bg-charcoal/95 text-white font-bold rounded-xl flex items-center gap-1.5 ml-auto text-[0.7rem]"
                              >
                                <i className="fa-solid fa-paper-plane"></i> Oferta
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 3. WALLET DESIGNER TAB VIEW */}
            {dashboardTab === 'Tarjeta Fidelización' && (
              <div className="space-y-6">
                <div className="text-left space-y-1">
                  <h1 className="font-heading text-3xl font-black text-gray-900 leading-none flex items-center gap-3">
                    <i className="fa-solid fa-wallet text-gray-700 text-2xl"></i> Tarjeta de Fidelización
                  </h1>
                  <p className="text-gray-400 text-sm">Diseña tu tarjeta de sellos y recompensas para 2GetherRewards Club</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                  {/* Left Column (Controls) */}
                  <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-150 p-6 shadow-sm space-y-6">
                    {/* Visual Tabs */}
                    <div className="flex gap-6 border-b border-gray-150 pb-3 text-xs font-bold text-gray-400">
                      <span className="border-b-2 border-primary text-primary pb-3 px-1 cursor-pointer flex items-center gap-1.5">
                        <i className="fa-solid fa-palette"></i> Diseño Visual
                      </span>
                      <span className="pb-3 px-1 cursor-pointer flex items-center gap-1.5 hover:text-gray-600">
                        <i className="fa-solid fa-circle-info"></i> Información General
                      </span>
                      <span className="pb-3 px-1 cursor-pointer flex items-center gap-1.5 hover:text-gray-600">
                        <i className="fa-solid fa-link"></i> Enlaces (Reverso)
                      </span>
                      <span className="pb-3 px-1 cursor-pointer flex items-center gap-1.5 hover:text-gray-600">
                        <i className="fa-solid fa-location-dot"></i> Geolocalización
                      </span>
                    </div>

                    {/* Card type choice */}
                    <div className="space-y-3 text-left">
                      <h4 className="font-heading font-black text-sm text-gray-800 flex items-center gap-2">
                        <i className="fa-regular fa-id-card text-gray-400"></i> Tipo de Tarjeta de Fidelización
                      </h4>
                      <p className="text-[0.7rem] text-gray-400">Elige el tipo de fidelización para tus clientes:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${walletType === 'sellos' ? 'border-primary bg-emerald-50/20' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                          onClick={() => setWalletType('sellos')}
                        >
                          <span className="block text-xs font-bold text-gray-800">Tarjeta de Sellos</span>
                          <span className="block text-[0.65rem] text-gray-400 mt-1 leading-relaxed">
                            Los clientes acumulan sellos con cada visita o compra. El banner cambia progresivamente según el total de sellos.
                          </span>
                        </div>
                        <div
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${walletType === 'membresia' ? 'border-primary bg-emerald-50/20' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                          onClick={() => setWalletType('membresia')}
                        >
                          <span className="block text-xs font-bold text-gray-800">Tarjeta de Membresía / Socio</span>
                          <span className="block text-[0.65rem] text-gray-400 mt-1 leading-relaxed">
                            Tarjeta estática que identifica al cliente (socio VIP) y le otorga beneficios fijos. No acumula puntos ni sellos.
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stamps count */}
                    <div className="space-y-3 text-left">
                      <h4 className="font-heading font-black text-sm text-gray-800 flex items-center gap-2">
                        <i className="fa-solid fa-percent text-gray-400"></i> Número de sellos en la tarjeta
                      </h4>
                      <p className="text-[0.7rem] text-gray-400">Elige cuántos sellos debe tener la tarjeta para completar la recompensa.</p>
                      <select
                        className="w-48 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-xs bg-white font-bold text-gray-700 cursor-pointer shadow-sm"
                        value={walletStampsCount}
                        onChange={(e) => setWalletStampsCount(Number(e.target.value))}
                      >
                        <option value="4">4 sellos</option>
                        <option value="6">6 sellos</option>
                        <option value="8">8 sellos</option>
                        <option value="10">10 sellos</option>
                      </select>
                    </div>

                    {/* Stamps sequence upload placeholder */}
                    <div className="space-y-3 text-left">
                      <h4 className="font-heading font-black text-sm text-gray-800 flex items-center gap-2">
                        Secuencia de Sellos
                      </h4>
                      <p className="text-[0.7rem] text-gray-400">Sube las imágenes de cabecera correspondientes a cada estado de sellos</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                        {Array.from({ length: 4 }).map((_, idx) => (
                          <div key={idx} className="border border-dashed border-gray-200 bg-gray-50 rounded-2xl p-4 text-center space-y-2 flex flex-col justify-center items-center h-24">
                            <i className="fa-regular fa-image text-gray-300 text-lg"></i>
                            <span className="block text-[0.6rem] text-gray-400 font-bold">{idx === 0 ? 'Vacía' : `${idx} Sello(s)`}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Guide and Live Preview) */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Design guide */}
                    <div className="bg-charcoal text-white rounded-3xl p-6 shadow-xl space-y-4 text-left">
                      <h4 className="font-heading font-black text-sm flex items-center gap-2 text-lime">
                        <i className="fa-regular fa-circle-check"></i> Guía de Diseño
                      </h4>
                      <ul className="space-y-3 text-[0.7rem] leading-relaxed text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="h-4.5 w-4.5 rounded-full bg-white/10 flex items-center justify-center font-bold text-lime text-[0.6rem] shrink-0 mt-0.5">1</span>
                          <span>Usa imágenes de 1032 x 336 píxeles para un ajuste perfecto.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-4.5 w-4.5 rounded-full bg-white/10 flex items-center justify-center font-bold text-lime text-[0.6rem] shrink-0 mt-0.5">2</span>
                          <span>Mantén los textos y logos importantes lejos de los bordes.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-4.5 w-4.5 rounded-full bg-white/10 flex items-center justify-center font-bold text-lime text-[0.6rem] shrink-0 mt-0.5">3</span>
                          <span>Optimiza el archivo para que no supere los 2MB.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Previsualization layout */}
                    <div className="bg-white rounded-3xl border border-gray-150 p-6 shadow-sm space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-heading font-black text-sm text-gray-800 flex items-center gap-2">
                          <i className="fa-regular fa-credit-card text-gray-400"></i> Previsualización
                        </h4>
                        <div className="flex rounded-lg bg-gray-100 p-0.5 text-[0.65rem] font-bold text-gray-500">
                          <span className="px-2.5 py-1 bg-white rounded-md text-charcoal shadow-sm">Apple</span>
                          <span className="px-2.5 py-1 cursor-pointer">Google</span>
                        </div>
                      </div>

                      {/* Apple Wallet Mockup Preview */}
                      <div className="border border-gray-200/60 rounded-3xl p-4 bg-gray-50 flex justify-center">
                        <div className="w-[280px] bg-[#69BFA1] text-white rounded-2xl shadow-lg border border-emerald-400/20 overflow-hidden flex flex-col justify-between p-4 h-[440px] text-left">
                          {/* Card header */}
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-1.5">
                              <img src="/logo-handshake-white.png" alt="handshake" className="h-5 w-auto" />
                              <div className="leading-none">
                                <span className="block text-[0.55rem] font-black tracking-wider uppercase">2GETHER</span>
                                <span className="block text-[0.45rem] font-light tracking-widest mt-0.5 uppercase">REWARDS</span>
                              </div>
                            </div>
                            <span className="h-5 w-5 bg-white/10 rounded-full border border-white/10 flex items-center justify-center text-[0.5rem]"><i className="fa-solid fa-ellipsis"></i></span>
                          </div>

                          {/* Banner Slot */}
                          <div className="my-auto py-4 space-y-4">
                            <div className="h-16 w-full rounded-lg bg-emerald-500/30 border border-white/15 flex flex-col justify-center items-center relative overflow-hidden p-2">
                              <span className="text-[0.6rem] font-black tracking-widest">2GETHER REWARDS</span>
                              {/* Render stamp slots dynamic grids based on count */}
                              <div className="flex gap-1.5 justify-center mt-2.5">
                                {Array.from({ length: walletStampsCount }).map((_, idx) => (
                                  <span key={idx} className="h-4.5 w-4.5 rounded-full bg-charcoal/40 border border-white/20 flex items-center justify-center text-[0.45rem]"><i className="fa-solid fa-stamp text-white/10"></i></span>
                                ))}
                              </div>
                              <span className="absolute bottom-1 right-2 text-[0.45rem] font-bold bg-charcoal/50 px-1.5 py-0.5 rounded-md">0 / {walletStampsCount} sellos</span>
                            </div>
                          </div>

                          {/* Footer details */}
                          <div className="space-y-4">
                            <div className="flex justify-between text-[0.55rem]">
                              <div>
                                <span className="block text-white/50 text-[0.45rem] uppercase font-bold tracking-wider">TÍTULAR</span>
                                <span className="font-bold">JON DOE</span>
                              </div>
                              <div className="text-right">
                                <span className="block text-white/50 text-[0.45rem] uppercase font-bold tracking-wider">PREMIO</span>
                                <span className="font-bold">0</span>
                              </div>
                            </div>

                            {/* Barcode / QR */}
                            <div className="bg-white p-2.5 rounded-xl flex flex-col justify-center items-center w-[120px] mx-auto shadow-md">
                              <i className="fa-solid fa-qrcode text-charcoal text-4xl"></i>
                              <span className="block text-[0.45rem] text-gray-400 font-bold mt-1 tracking-widest">LOYALTY-001</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. SMART SCANNER TAB VIEW */}
            {dashboardTab === 'Escáner' && (
              <div className="space-y-6">
                <div className="text-left space-y-1">
                  <h1 className="font-heading text-3xl font-black text-gray-900 leading-none flex items-center gap-3">
                    <i className="fa-solid fa-qrcode text-gray-700 text-2xl"></i> Escáner Inteligente
                  </h1>
                  <p className="text-gray-400 text-sm">Registra visitas o canjea cupones escaneando el código de tu cliente</p>
                </div>

                <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-gray-150 p-8 shadow-sm flex flex-col items-center space-y-6 text-center">

                  {/* Camera view screen box */}
                  <div className="w-full max-w-md aspect-video bg-gray-50 border border-gray-200/80 rounded-3xl flex flex-col justify-center items-center relative overflow-hidden p-6">
                    {scannerActive ? (
                      <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
                        {/* Animated Scanner frame */}
                        <div className="absolute inset-8 border-2 border-dashed border-primary rounded-2xl animate-pulse"></div>
                        <div className="w-full h-0.5 bg-primary/80 absolute top-1/2 left-0 shadow-lg animate-bounce"></div>

                        <i className="fa-solid fa-circle-notch text-primary text-3xl animate-spin z-10"></i>
                        <span className="text-xs font-bold text-charcoal z-10">Buscando código QR de pase Wallet...</span>

                        <div className="flex gap-2 pt-2 z-10">
                          <button
                            onClick={() => handleSimulateScan('Jon Doe')}
                            className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-[0.65rem] font-bold rounded-lg shadow-sm"
                          >
                            Simular Jon Doe
                          </button>
                          <button
                            onClick={() => handleSimulateScan('Daniel')}
                            className="px-3 py-1.5 bg-accent hover:bg-accent-hover text-white text-[0.65rem] font-bold rounded-lg shadow-sm"
                          >
                            Simular Daniel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="h-16 w-16 bg-gray-150 text-gray-500 rounded-full flex items-center justify-center text-2xl shadow-inner mb-4">
                          <i className="fa-solid fa-camera"></i>
                        </div>
                        <h4 className="font-heading font-black text-base text-gray-800">Escáner Inactivo</h4>
                        <p className="text-xs text-gray-400 leading-relaxed max-w-xs mt-1">
                          Activa la cámara de tu dispositivo para leer el código QR y procesar la operación automáticamente.
                        </p>

                        <button
                          onClick={() => setScannerActive(true)}
                          className="mt-6 px-6 py-3 bg-charcoal hover:bg-charcoal/95 text-white font-bold text-xs rounded-2xl shadow flex items-center justify-center gap-2 transition-all"
                        >
                          <i className="fa-solid fa-expand"></i> Iniciar Escáner
                        </button>
                      </>
                    )}
                  </div>

                  {/* Optional purchase amount input */}
                  <div className="w-full max-w-md text-left space-y-2">
                    <label className="block text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider">Monto de la Compra (Opcional)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">$</span>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary text-sm font-bold text-charcoal bg-white shadow-inner"
                        value={scanAmount}
                        onChange={(e) => setScanAmount(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Manual entry block */}
                  <hr className="w-full max-w-md border-gray-100" />
                  <form onSubmit={handleManualScanSubmit} className="w-full max-w-md text-left space-y-2">
                    <label className="block text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider">¿Tienes un código manual?</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Introduce el código de la tarjeta..."
                        className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary text-xs bg-white shadow-sm"
                        value={manualCode}
                        onChange={(e) => setManualCode(e.target.value)}
                      />
                      <button type="submit" className="px-5 py-3 bg-charcoal hover:bg-charcoal/95 text-white font-bold text-xs rounded-2xl shadow">
                        Verificar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* 5. GIFT CARDS TAB VIEW */}
            {dashboardTab === 'Gift Cards' && (
              <div className="space-y-6">
                <div className="text-left space-y-1">
                  <h1 className="font-heading text-3xl font-black text-gray-900 leading-none flex items-center gap-3">
                    <i className="fa-solid fa-gift text-gray-700 text-2xl"></i> Tarjetas Regalo
                  </h1>
                  <p className="text-gray-400 text-sm">Emite nuevas tarjetas de saldo precargado.</p>
                </div>

                <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                  {/* Left: Gift Emitter controls */}
                  <div className="bg-white rounded-3xl border border-gray-150 p-8 shadow-sm flex flex-col items-center space-y-6">
                    {/* Emitter Preview */}
                    <div className="w-full max-w-[280px] bg-gradient-to-br from-primary via-accent to-charcoal text-white rounded-2xl p-5 shadow-lg border border-white/10 text-left flex flex-col justify-between h-[180px] relative overflow-hidden">
                      <div className="absolute top-[-10%] right-[-10%] w-[100px] h-[100px] bg-white/5 rounded-full blur-md"></div>
                      <div className="flex justify-between items-start relative z-10">
                        <div>
                          <span className="block text-[0.45rem] font-bold text-white/50 uppercase">GIFT CARD</span>
                          <span className="block text-sm font-black mt-0.5">2GetherRewards</span>
                        </div>
                        <i className="fa-solid fa-gift text-white/20 text-xl"></i>
                      </div>

                      <div className="relative z-10">
                        <span className="block text-[0.45rem] font-bold text-white/50 uppercase">SALDO DISPONIBLE</span>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-3xl font-black">{giftAmount}</span>
                          <span className="text-sm font-bold">$</span>
                        </div>
                      </div>
                      <div className="flex justify-end relative z-10">
                        <i className="fa-solid fa-credit-card text-white/40 text-lg"></i>
                      </div>
                    </div>

                    {/* Price Slider adjuster */}
                    <div className="w-full space-y-3">
                      <label className="block text-center text-xs font-bold text-gray-500">Selecciona la Cantidad (Máx. 500$)</label>

                      <div className="flex items-center justify-between w-full max-w-[220px] mx-auto gap-4">
                        <button
                          onClick={() => setGiftAmount(prev => Math.max(5, prev - 5))}
                          className="h-8 w-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center font-bold text-gray-600 transition-colors shadow-sm text-sm"
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>

                        <div className="flex-1 text-center border-b-2 border-charcoal pb-1 flex justify-center items-baseline gap-0.5">
                          <input
                            type="number"
                            min="5"
                            max="500"
                            step="5"
                            className="w-16 text-center text-xl font-black text-gray-900 bg-transparent focus:outline-none"
                            value={giftAmount}
                            onChange={(e) => setGiftAmount(Math.max(5, Math.min(500, Number(e.target.value))))}
                          />
                          <span className="text-base font-bold text-gray-400">$</span>
                        </div>

                        <button
                          onClick={() => setGiftAmount(prev => Math.min(500, prev + 5))}
                          className="h-8 w-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center font-bold text-gray-600 transition-colors shadow-sm text-sm"
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>

                      {/* HTML Slider range */}
                      <input
                        type="range"
                        min="5"
                        max="500"
                        step="5"
                        className="w-full accent-primary mt-4 cursor-pointer"
                        value={giftAmount}
                        onChange={(e) => setGiftAmount(Number(e.target.value))}
                      />
                    </div>

                    <button
                      onClick={handleEmitGiftCard}
                      className="w-full py-4 bg-charcoal hover:bg-charcoal/95 text-white font-bold text-xs rounded-2xl shadow flex items-center justify-center gap-2 uppercase tracking-wider mt-2 transition-all active:scale-95"
                    >
                      <i className="fa-solid fa-gift"></i> Emitir Tarjeta por {giftAmount}$
                    </button>
                  </div>

                  {/* Right: Issued gift cards history */}
                  <div className="bg-white rounded-3xl border border-gray-150 p-6 shadow-sm space-y-4 text-left">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                      <h4 className="font-heading font-black text-sm text-gray-800 flex items-center gap-2">
                        <i className="fa-solid fa-receipt text-gray-400"></i> Historial de Emisión
                      </h4>
                      <button className="px-3.5 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-[0.65rem] font-bold text-gray-500 border border-gray-200 flex items-center gap-1">
                        <i className="fa-solid fa-qrcode"></i> Escanear Tarjeta
                      </button>
                    </div>

                    <div className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto pr-1">
                      {giftVouchers.map((voucher) => (
                        <div key={voucher.code} className="py-3 flex justify-between items-center text-xs">
                          <div>
                            <span className="block font-bold text-gray-900 font-mono">{voucher.code}</span>
                            <span className="block text-[0.6rem] text-gray-400 mt-0.5">Emitida el {voucher.date}</span>
                          </div>
                          <div className="text-right">
                            <span className="block font-black text-gray-900">${voucher.amount}</span>
                            <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold text-[0.55rem] uppercase">{voucher.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. SYSTEM CONFIGURATIONS TAB VIEW */}
            {dashboardTab === 'Configuración del Sistema' && (
              <div className="space-y-6 max-w-md mx-auto bg-white rounded-3xl border border-gray-150 p-8 shadow-sm text-left">
                <div className="space-y-1">
                  <h1 className="font-heading text-2xl font-black text-gray-900 flex items-center gap-2 leading-none">
                    <i className="fa-solid fa-gear text-gray-600"></i> Configuración
                  </h1>
                  <p className="text-gray-400 text-xs">Ajusta los parámetros generales de tu programa</p>
                </div>

                <div className="space-y-4 pt-4 text-xs font-medium text-gray-700">
                  <div className="space-y-1.5">
                    <label className="block text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider">Nombre del Club / Comercio</label>
                    <input type="text" defaultValue="2GetherRewards Club" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider">Dirección Principal</label>
                    <input type="text" defaultValue="Calle Juan Bravo 62, Madrid" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider">Moneda Base</label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary bg-white text-xs cursor-pointer">
                      <option>Dólar Estadounidense ($)</option>
                      <option>Euro (€)</option>
                      <option>Peso Mexicano (MXN)</option>
                    </select>
                  </div>

                  <button
                    onClick={() => alert('¡Configuraciones guardadas con éxito!')}
                    className="w-full py-3 bg-charcoal hover:bg-charcoal/95 text-white font-bold text-xs rounded-xl shadow-lg mt-4 transition-all"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }

  if (currentPage === 'dashboard-trial') {
    return (
      <div className="min-h-screen lg:h-screen lg:overflow-hidden flex flex-col lg:flex-row font-body bg-graylight text-charcoal">
        {/* Left Column (Showcase) */}
        <div className="hidden lg:flex lg:w-1/2 lg:h-full bg-black flex-col justify-between p-12 text-white relative text-left overflow-hidden">
          {/* Glowing blur background effects */}
          <div className="absolute top-[-20%] left-[-20%] w-[450px] h-[450px] bg-primary/20 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="absolute bottom-[-15%] right-[-15%] w-[400px] h-[400px] bg-accent/20 rounded-full blur-[120px] pointer-events-none"></div>

          <a href="#inicio" className="flex items-center gap-3 font-heading font-black text-2xl tracking-tight text-white relative z-10" onClick={() => setCurrentPage('landing')}>
            <img src="/logo-handshake-white.png" alt="2Gether Rewards Logo" className="h-8 w-auto" />
            2Gether<span className="text-primary">Rewards</span>
          </a>

          <div className="space-y-6 max-w-lg my-auto relative z-10">
            <h2 className="font-heading text-4xl lg:text-5xl font-black leading-tight text-white">
              Tarjetas digitales<br />
              <span className="text-primary">Para Apple Wallet y Google Wallet</span>
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              Simplifica tu programa de fidelización. Crea y distribuye pases directamente en el móvil de tus clientes, sin descargas obligatorias.
            </p>

            <div className="space-y-6 pt-6">
              {/* Feature 1 */}
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary text-md">
                  <i className="fa-solid fa-stamp"></i>
                </div>
                <div className="space-y-1">
                  <h4 className="font-heading font-black text-sm text-white tracking-wide">Fidelización Directa</h4>
                  <p className="text-gray-400 text-xs leading-relaxed text-left">Crea tarjetas de sellos, cashback y regalo digitales compatibles con Wallet de forma nativa sin que tus clientes tengan que descargar apps.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary text-md">
                  <i className="fa-solid fa-bell"></i>
                </div>
                <div className="space-y-1">
                  <h4 className="font-heading font-black text-sm text-white tracking-wide">Notificaciones Segmentadas</h4>
                  <p className="text-gray-400 text-xs leading-relaxed text-left">Envía ofertas personalizadas, promociones de campaña y alertas automáticas directamente a la pantalla de bloqueo de tus clientes.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary text-md">
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                <div className="space-y-1">
                  <h4 className="font-heading font-black text-sm text-white tracking-wide">Dashboard en Tiempo Real</h4>
                  <p className="text-gray-400 text-xs leading-relaxed text-left">Monitorea la frecuencia de visitas, el ticket promedio y el retorno de inversión detallado de cada campaña en tiempo real.</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 relative z-10">&copy; 2026 2GetherRewards. Todos los derechos reservados.</p>
        </div>

        {/* Right Column (Form) */}
        <div className="w-full lg:w-1/2 lg:h-full lg:overflow-y-auto bg-graylight flex flex-col justify-start items-center p-4 sm:p-12 py-10 sm:py-24 relative min-h-screen lg:min-h-0">
          {/* Back button */}
          <button
            className="absolute top-4 sm:top-6 left-4 sm:left-6 text-xs font-bold text-gray-400 hover:text-charcoal flex items-center gap-1.5 z-10"
            onClick={() => setCurrentPage('landing')}
          >
            <i className="fa-solid fa-arrow-left"></i> Volver a Inicio
          </button>

          {/* Language selector */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10">
            <span className="h-8 w-8 border border-gray-200 bg-white rounded-full flex items-center justify-center text-xs font-bold text-charcoal shadow-sm">
              ES
            </span>
          </div>

          {/* Form Box */}
          <div className="w-full max-w-[440px] bg-white rounded-3xl border border-gray-200/50 shadow-xl p-5 sm:p-8 space-y-4 sm:space-y-6 mt-8 sm:mt-0">
            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              <button
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'acceso' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                onClick={() => setActiveTab('acceso')}
              >
                Acceso
              </button>
              <button
                className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'registro' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                onClick={() => setActiveTab('registro')}
              >
                Registro
              </button>
            </div>

            {/* Subtitle */}
            <p className="text-xs font-bold text-primary tracking-wide text-center">
              {activeTab === 'registro' ? '¡Comience hoy su prueba gratuita de 14 días!' : '¡Bienvenido de vuelta! Ingresa tus credenciales'}
            </p>

            {/* Form */}
            {activeTab === 'registro' ? (
              <form className="space-y-3.5 sm:space-y-4" onSubmit={handleRegistrationSubmit}>
                {regErrorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-semibold flex items-start gap-2 text-left animate-fadeIn">
                    <i className="fa-solid fa-circle-exclamation shrink-0 mt-0.5 text-red-500"></i>
                    <span>{regErrorMsg}</span>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider mb-1 text-left">Primer Nombre</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-xs"
                      placeholder="Ej. Juan"
                      value={regFirstName}
                      onChange={(e) => setRegFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider mb-1 text-left">Apellido</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-xs"
                      placeholder="Ej. Pérez"
                      value={regLastName}
                      onChange={(e) => setRegLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider mb-1 text-left">Nombre de empresa</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-xs"
                    placeholder="Ej. Mi Tienda S.L."
                    value={regCompany}
                    onChange={(e) => setRegCompany(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider mb-1 text-left">Correo electrónico</label>
                  <input
                    type="email"
                    required
                    className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-xs"
                    placeholder="juan@correo.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider mb-1 text-left">Teléfono</label>
                  <div className="flex gap-2">
                    <select
                      className="w-28 sm:w-36 shrink-0 px-2 sm:px-2.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-primary bg-white truncate cursor-pointer"
                      value={regPhoneCode}
                      onChange={(e) => setRegPhoneCode(e.target.value)}
                    >
                      {countryCodes.map((country) => (
                        <option key={`${country.code}-${country.dial}`} value={country.dial}>
                          {country.code} {country.dial} ({country.name})
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      required
                      className="min-w-0 flex-1 px-3.5 sm:px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-xs"
                      placeholder="600 000 000"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider mb-1 text-left">Contraseña</label>
                  <input
                    type="password"
                    required
                    className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-xs"
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider mb-1 text-left">Repita la contraseña</label>
                  <input
                    type="password"
                    required
                    className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-xs"
                    placeholder="••••••••"
                    value={regPasswordConfirm}
                    onChange={(e) => setRegPasswordConfirm(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider mb-1 text-left">Plan</label>
                  <select
                    className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary bg-white text-xs"
                    value={regPlan}
                    onChange={(e) => setRegPlan(e.target.value)}
                  >
                    <option value="Plan START - $49/mes">Plan START - $49/mes</option>
                    <option value="Plan GROWTH - $69/mes">Plan GROWTH - $69/mes</option>
                    <option value="Plan ENTERPRISE - $99/mes">Plan ENTERPRISE - $99/mes</option>
                  </select>
                </div>

                {/* Checkbox Términos y Condiciones */}
                <div className="flex items-start gap-2.5 text-left pt-1">
                  <input
                    type="checkbox"
                    id="app-reg-terms"
                    required
                    checked={regTerms}
                    onChange={(e) => setRegTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-primary accent-primary cursor-pointer shrink-0"
                  />
                  <div className="text-xs text-gray-600 leading-snug">
                    <label htmlFor="app-reg-terms" className="cursor-pointer">
                      He leído y acepto los{' '}
                    </label>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowTermsModal(true);
                      }}
                      className="text-primary font-bold underline hover:text-primary-hover inline p-0 bg-transparent border-none text-xs cursor-pointer focus:outline-none"
                    >
                      Términos y Condiciones del Servicio
                    </button>
                    <label htmlFor="app-reg-terms" className="cursor-pointer">
                      {' '}para Comercios Afiliados.
                    </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmittingReg || !regTerms}
                  className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg mt-2 transition-all duration-200 active:scale-95 text-xs uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmittingReg ? 'Registrando...' : 'Registro'}
                </button>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handleLoginSubmit}>
                <div>
                  <label className="block text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider mb-1 text-left">Correo electrónico</label>
                  <input
                    type="email"
                    required
                    className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-xs"
                    placeholder="juan@correo.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[0.65rem] font-bold text-gray-400 uppercase tracking-wider mb-1 text-left">Contraseña</label>
                  <input
                    type="password"
                    required
                    className="w-full px-3.5 sm:px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-xs"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg mt-4 transition-all duration-200 active:scale-95 text-xs uppercase tracking-wider">
                  Acceso
                </button>
              </form>
            )}
          </div>
        </div>

        {/* MODAL POPUP TÉRMINOS Y CONDICIONES */}
        {showTermsModal && (
          <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm" onClick={() => setShowTermsModal(false)}>
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[90dvh] sm:max-h-[85vh] shadow-2xl border border-gray-100 flex flex-col overflow-hidden text-left animate-scaleUp" onClick={(e) => e.stopPropagation()}>
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-gray-100 flex items-start justify-between gap-3 bg-white sticky top-0 z-10">
                <div>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-gray-900 leading-tight">
                    TÉRMINOS Y CONDICIONES DEL SERVICIO
                  </h3>
                  <p className="text-[11px] sm:text-xs font-semibold text-primary mt-0.5 sm:mt-1">
                    Plataforma 2getherReward para Comercios Afiliados
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTermsModal(false)}
                  className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-colors shrink-0"
                  aria-label="Cerrar ventana"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 text-[11px] sm:text-xs text-gray-600 leading-relaxed">
                <p className="font-medium text-gray-800 bg-emerald-50/60 p-3 sm:p-3.5 rounded-xl border border-emerald-100">
                  Al registrarse y contratar los servicios de 2getherReward, la empresa afiliada acepta los siguientes términos y condiciones:
                </p>

                <section className="space-y-1 pt-1">
                  <h4 className="font-bold text-gray-900 text-sm">1. Aceptación</h4>
                  <p>El registro y utilización de la plataforma implica la aceptación de los presentes términos y condiciones.</p>
                  <p>La empresa declara que la información suministrada durante el proceso de registro es veraz, completa y actualizada.</p>
                  <p>La empresa autoriza a 2getherReward a utilizar la información proporcionada para la administración de la cuenta, facturación, soporte técnico y comunicaciones relacionadas con el servicio.</p>
                </section>

                <section className="space-y-1 pt-1">
                  <h4 className="font-bold text-gray-900 text-sm">2. Objeto del Servicio</h4>
                  <p>2getherReward proporciona una plataforma tecnológica para que la empresa pueda administrar programas digitales de fidelización mediante Apple Wallet y Google Wallet.</p>
                  <p>La contratación del servicio no constituye una relación de franquicia, representación, sociedad o exclusividad entre las partes.</p>
                </section>

                <section className="space-y-1 pt-1">
                  <h4 className="font-bold text-gray-900 text-sm">3. Creación de la Cuenta</h4>
                  <p>La empresa será responsable de:</p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Mantener actualizada su información.</li>
                    <li>Administrar los usuarios autorizados.</li>
                    <li>Custodiar sus credenciales de acceso.</li>
                    <li>Notificar inmediatamente cualquier acceso no autorizado.</li>
                  </ul>
                </section>

                <section className="space-y-1 pt-1">
                  <h4 className="font-bold text-gray-900 text-sm">4. Planes y Facturación</h4>
                  <p>El servicio será prestado conforme al plan contratado.</p>
                  <p>Las tarifas podrán actualizarse notificándolo previamente.</p>
                  <p>La suspensión del pago podrá ocasionar la suspensión temporal del servicio.</p>
                  <p>Los impuestos aplicables serán responsabilidad de la empresa afiliada.</p>
                </section>

                <section className="space-y-1 pt-1">
                  <h4 className="font-bold text-gray-900 text-sm">5. Uso de la Plataforma</h4>
                  <p>La empresa podrá utilizar la plataforma para:</p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Administrar programas de fidelización.</li>
                    <li>Emitir tarjetas digitales.</li>
                    <li>Gestionar tarjetas de regalo.</li>
                    <li>Enviar campañas promocionales.</li>
                    <li>Consultar reportes y estadísticas.</li>
                    <li>Administrar sucursales y usuarios según el plan contratado.</li>
                  </ul>
                  <p>La empresa se compromete a utilizar la plataforma únicamente para fines lícitos.</p>
                </section>

                <section className="space-y-1 pt-1">
                  <h4 className="font-bold text-gray-900 text-sm">6. Administración del Programa de Fidelización</h4>
                  <p>La empresa será la única responsable de definir:</p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Beneficios.</li>
                    <li>Promociones.</li>
                    <li>Sellos.</li>
                    <li>Puntos.</li>
                    <li>Cashback.</li>
                    <li>Cupones.</li>
                    <li>Tarjetas de regalo.</li>
                    <li>Membresías.</li>
                    <li>Políticas de vencimiento.</li>
                    <li>Condiciones de canje.</li>
                  </ul>
                  <p>2getherReward no participa en la definición de dichas reglas comerciales.</p>
                </section>

                <section className="space-y-1 pt-1">
                  <h4 className="font-bold text-gray-900 text-sm">7. Responsabilidad sobre los Clientes</h4>
                  <p>La empresa reconoce que es la responsable exclusiva de:</p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>La atención de sus clientes.</li>
                    <li>La entrega de premios o beneficios.</li>
                    <li>La administración del programa.</li>
                    <li>La resolución de reclamos relacionados con promociones o recompensas.</li>
                  </ul>
                </section>

                <section className="space-y-1 pt-1">
                  <h4 className="font-bold text-gray-900 text-sm">8. Protección de Datos Personales</h4>
                  <p>La empresa declara cumplir con la legislación vigente sobre protección de datos personales.</p>
                  <p>Asimismo, garantiza que:</p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Obtendrá el consentimiento de sus clientes para el tratamiento de sus datos.</li>
                    <li>Informará adecuadamente sobre el uso de la información.</li>
                    <li>Utilizará los datos únicamente para fines comerciales autorizados.</li>
                  </ul>
                  <p>2getherReward actuará como proveedor tecnológico y procesará la información únicamente para prestar el servicio contratado.</p>
                </section>

                <section className="space-y-1 pt-1">
                  <h4 className="font-bold text-gray-900 text-sm">9. Comunicaciones Comerciales</h4>
                  <p>La empresa será responsable de asegurarse de que sus clientes hayan autorizado recibir:</p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Correos electrónicos.</li>
                    <li>Notificaciones Push.</li>
                    <li>Promociones.</li>
                    <li>Campañas publicitarias.</li>
                    <li>Invitaciones.</li>
                    <li>Descuentos.</li>
                    <li>Información comercial.</li>
                  </ul>
                </section>

                <section className="space-y-1 pt-1">
                  <h4 className="font-bold text-gray-900 text-sm">10. Seguridad de la Información</h4>
                  <p>2getherReward implementa medidas razonables de seguridad para proteger la información.</p>
                  <p>No obstante, la empresa reconoce que ningún sistema informático puede garantizar seguridad absoluta frente a:</p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Ataques cibernéticos.</li>
                    <li>Accesos no autorizados.</li>
                    <li>Malware.</li>
                    <li>Interrupciones de Internet.</li>
                    <li>Fallas de terceros.</li>
                  </ul>
                </section>

                <section className="space-y-1 pt-1">
                  <h4 className="font-bold text-gray-900 text-sm">11. Fraude</h4>
                  <p>La empresa será responsable del uso que realicen sus usuarios internos.</p>
                  <p>2getherReward no será responsable por:</p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Creación fraudulenta de clientes.</li>
                    <li>Manipulación indebida de sellos.</li>
                    <li>Canjes autorizados incorrectamente por el personal del comercio.</li>
                    <li>Uso indebido de credenciales.</li>
                    <li>Fraudes internos cometidos por colaboradores de la empresa.</li>
                  </ul>
                </section>

                <section className="space-y-1 pt-1">
                  <h4 className="font-bold text-gray-900 text-sm">12. Disponibilidad del Servicio</h4>
                  <p>2getherReward realizará esfuerzos razonables para mantener la plataforma disponible.</p>
                  <p>Podrán existir interrupciones ocasionadas por:</p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Mantenimiento programado.</li>
                    <li>Actualizaciones.</li>
                    <li>Fallas de Internet.</li>
                    <li>Servicios de terceros.</li>
                    <li>Casos de fuerza mayor.</li>
                  </ul>
                </section>

                <section className="space-y-1 pt-1">
                  <h4 className="font-bold text-gray-900 text-sm">13. Integración con Apple Wallet y Google Wallet</h4>
                  <p>La plataforma es compatible con Apple Wallet y Google Wallet.</p>
                  <p>La disponibilidad dependerá de:</p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Compatibilidad del dispositivo del usuario.</li>
                    <li>Sistemas operativos soportados.</li>
                    <li>Políticas propias de Apple y Google.</li>
                  </ul>
                  <p>2getherReward no controla modificaciones realizadas por dichos proveedores.</p>
                </section>

                <section className="space-y-1 pt-1">
                  <h4 className="font-bold text-gray-900 text-sm">14. Propiedad Intelectual</h4>
                  <p>Todo el software, diseño, logotipos, interfaces, documentación, imágenes, marca y tecnología pertenecen a 2getherReward.</p>
                  <p>La contratación del servicio no concede derechos de propiedad intelectual sobre la plataforma.</p>
                </section>

                <section className="space-y-1 pt-1">
                  <h4 className="font-bold text-gray-900 text-sm">15. Confidencialidad</h4>
                  <p>Ambas partes se comprometen a mantener confidencial toda la información técnica, comercial, financiera y estratégica intercambiada durante la relación comercial.</p>
                </section>

                <section className="space-y-1 pt-1">
                  <h4 className="font-bold text-gray-900 text-sm">16. Limitación de Responsabilidad</h4>
                  <p>2getherReward será responsable únicamente por la prestación de la plataforma tecnológica.</p>
                  <p>En ningún caso será responsable por:</p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Pérdidas de ventas.</li>
                    <li>Lucro cesante.</li>
                    <li>Daños indirectos.</li>
                    <li>Reclamos de consumidores.</li>
                    <li>Incumplimiento de promociones ofrecidas por la empresa.</li>
                    <li>Decisiones comerciales tomadas por la empresa.</li>
                  </ul>
                  <p>La responsabilidad máxima de 2getherReward, cuando legalmente corresponda, se limitará al monto efectivamente pagado por la empresa durante los tres (3) meses anteriores al evento que origine la reclamación.</p>
                </section>

                <section className="space-y-1 pt-1">
                  <h4 className="font-bold text-gray-900 text-sm">17. Suspensión o Terminación</h4>
                  <p>2getherReward podrá suspender o cancelar el servicio cuando:</p>
                  <ul className="list-disc pl-5 space-y-0.5">
                    <li>Exista incumplimiento contractual.</li>
                    <li>Se detecte fraude.</li>
                    <li>Existan actividades ilícitas.</li>
                    <li>Se incumplan estos términos.</li>
                    <li>Existan atrasos reiterados en los pagos.</li>
                  </ul>
                  <p>La empresa podrá cancelar el servicio conforme a las condiciones del plan contratado.</p>
                </section>

                <section className="space-y-1 pt-1">
                  <h4 className="font-bold text-gray-900 text-sm">18. Actualización de la Plataforma</h4>
                  <p>2getherReward podrá incorporar nuevas funcionalidades, mejoras o modificaciones técnicas para mantener la plataforma actualizada, sin afectar la continuidad del servicio.</p>
                </section>

                <section className="space-y-1 pt-1">
                  <h4 className="font-bold text-gray-900 text-sm">19. Modificación de los Términos</h4>
                  <p>Estos términos podrán actualizarse periódicamente.</p>
                  <p>Las modificaciones serán notificadas oportunamente y entrarán en vigor a partir de su publicación.</p>
                </section>

                <section className="space-y-1 pt-1">
                  <h4 className="font-bold text-gray-900 text-sm">20. Legislación Aplicable</h4>
                  <p>Estos términos se regirán por la legislación vigente del país donde 2getherReward tenga establecida la prestación del servicio, salvo que las partes acuerden expresamente otra jurisdicción.</p>
                </section>

                <section className="space-y-1 pt-1 pb-2">
                  <h4 className="font-bold text-gray-900 text-sm">21. Aceptación</h4>
                  <p>Al registrarse en la plataforma, la empresa declara haber leído, comprendido y aceptado íntegramente estos términos y condiciones.</p>
                </section>
              </div>

              {/* Footer */}
              <div className="p-3.5 sm:p-4 px-4 sm:px-6 border-t border-gray-100 flex items-center justify-between gap-2 bg-gray-50/50">
                <button
                  type="button"
                  onClick={() => setShowTermsModal(false)}
                  className="px-3.5 sm:px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800 rounded-xl hover:bg-gray-200/50 transition-colors shrink-0"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRegTerms(true);
                    setShowTermsModal(false);
                  }}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl text-xs shadow-md transition-all active:scale-95 shrink-0"
                >
                  Entendido y Aceptar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL POPUP CONFIRMACIÓN DE REGISTRO */}
        {showRegSuccessModal && (
          <div className="fixed inset-0 bg-black/60 z-[99999] flex items-center justify-center p-4 backdrop-blur-sm" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 text-center space-y-5 animate-scaleUp text-left" onClick={(e) => e.stopPropagation()}>
              <div className="h-16 w-16 bg-emerald-50 text-primary rounded-full flex items-center justify-center text-2xl mx-auto border border-emerald-100 shadow-sm">
                <i className="fa-solid fa-circle-check"></i>
              </div>

              <div className="space-y-1.5 text-center">
                <h3 className="font-heading font-black text-xl text-gray-900">¡Registro Exitoso!</h3>
                <p className="text-xs font-bold text-primary">Acceso de Demostración y Exploración (14 días)</p>
                <p className="text-gray-500 text-xs leading-relaxed pt-1">
                  ¡Bienvenido a 2GetherRewards! Tu acceso está activo para que puedas <strong>conocer y explorar la plataforma por dentro</strong> (diseño de tarjetas para Wallet, escáner y analíticas).
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Empresa:</span>
                  <span className="font-bold text-gray-900">{regSuccessDetails.company}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Titular:</span>
                  <span className="font-bold text-gray-900">{regSuccessDetails.name}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Correo:</span>
                  <span className="font-bold text-gray-900">{regSuccessDetails.email}</span>
                </div>
                <hr className="border-gray-200 my-1" />
                <div className="flex justify-between text-gray-600">
                  <span>Plan Seleccionado:</span>
                  <span className="font-bold text-primary">{regSuccessDetails.plan}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleConfirmRegSuccess}
                className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                Acceder a mi Panel <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-graylight text-charcoal font-body">
      {/* CABECERA (Header) */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isHeaderScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`} id="main-header">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#inicio"
            className="flex items-center gap-3 font-heading font-black text-2xl tracking-tight text-gray-900"
            id="logo-brand"
            onClick={() => { setCurrentPage('landing'); setActiveNav('inicio'); }}
          >
            <img src="/logo-handshake.png" alt="2Gether Rewards Logo" className="brand-handshake-img" />
            2Gether<span>Rewards</span>
          </a>

          <nav className={`lg:flex items-center gap-8 ${isMobileMenuOpen ? 'flex flex-col absolute top-full left-0 w-full bg-white border-b border-gray-100 py-6 px-8 shadow-lg gap-4' : 'hidden'}`} id="main-nav">
            {['inicio', 'beneficios', 'menu', 'tarjetas', 'quiz', 'faq'].map((nav) => (
              <a
                key={nav}
                href={`#${nav}`}
                className={`text-[0.95rem] font-semibold transition-colors duration-200 py-1 hover:text-primary ${activeNav === nav ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
                onClick={() => { setActiveNav(nav); setIsMobileMenuOpen(false); }}
              >
                {nav === 'inicio' ? 'Inicio' :
                  nav === 'beneficios' ? 'Beneficios' :
                    nav === 'menu' ? 'Planes' :
                      nav === 'tarjetas' ? 'Tarjetas' :
                        nav === 'quiz' ? '¿Cuál es mi Plan?' : 'Preguntas Frecuentes'}
              </a>
            ))}
            {isMobileMenuOpen && (
              <div className="w-full flex flex-col gap-2 pt-3 border-t border-gray-100">
                <button
                  className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-full shadow-sm flex items-center justify-center gap-2"
                  onClick={() => { setActiveTab('acceso'); setCurrentPage('dashboard-trial'); setIsMobileMenuOpen(false); }}
                >
                  <i className="fa-solid fa-arrow-right-to-bracket text-primary"></i> Acceso / Iniciar Sesión
                </button>
                <button
                  className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold text-xs rounded-full shadow flex items-center justify-center gap-1.5"
                  onClick={() => { setActiveTab('registro'); setCurrentPage('dashboard-trial'); setIsMobileMenuOpen(false); }}
                >
                  <i className="fa-solid fa-gauge-high"></i> Probar Dashboard
                </button>
              </div>
            )}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-primary transition-colors py-2 px-3.5 rounded-full hover:bg-gray-100/80 cursor-pointer"
              onClick={() => { setActiveTab('acceso'); setCurrentPage('dashboard-trial'); setIsMobileMenuOpen(false); }}
            >
              <i className="fa-solid fa-arrow-right-to-bracket text-primary"></i> Acceso
            </button>
            <button
              className="hidden sm:inline-flex items-center gap-1.5 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs rounded-full shadow transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              onClick={() => { setActiveTab('registro'); setCurrentPage('dashboard-trial'); setIsMobileMenuOpen(false); }}
            >
              <i className="fa-solid fa-gauge-high"></i> Probar Dashboard
            </button>
            <button
              className="lg:hidden p-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50"
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              aria-label="Abrir menú de navegación móvil"
            >
              <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-gray-600 text-lg`}></i>
            </button>
          </div>
        </div>
      </header>

      {/* SECCIÓN HÉROE (Hero) */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-b from-emerald-50/40 via-white to-gray-50" id="inicio">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 text-left space-y-6">
            <span className="inline-block text-[0.8rem] tracking-wider uppercase font-black text-primary bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
              Plataforma de Fidelización Digital
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
              Fideliza. Conecta. <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Haz crecer tu negocio.</span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl leading-relaxed">
              Crea tarjetas de sellos y regalo 100% digitales compatibles con Apple Wallet y Google Wallet. Sin aplicaciones de terceros, sin hardware complejo. Aumenta la recompra y fideliza a tus clientes habituales desde hoy.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => { setActiveTab('registro'); setCurrentPage('dashboard-trial'); }}
                className="px-8 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-full shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-gauge-high"></i> Probar Gratis 14 Días
              </button>
              <a href="#menu" className="px-8 py-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-full shadow-sm transition-all duration-200 hover:-translate-y-0.5" onClick={() => setActiveNav('menu')}>Ver Planes</a>
              <a href="#quiz" className="px-8 py-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-full shadow-sm flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5" onClick={() => { setActiveNav('quiz'); startQuiz(); }}>
                <i className="fa-solid fa-wand-magic-sparkles text-primary"></i> ¿Cuál es mi Plan Ideal?
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div 
              onClick={() => { setActiveTab('registro'); setCurrentPage('dashboard-trial'); }}
              className="w-full max-w-[360px] bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col justify-between min-h-[520px] cursor-pointer hover:shadow-emerald-500/20 hover:scale-[1.02] transition-all duration-300 group relative"
              title="Haz clic para probar la plataforma y registrarte"
            >
              <div className="absolute top-4 right-4 bg-emerald-500/10 text-primary group-hover:bg-primary group-hover:text-white px-2.5 py-1 rounded-full text-[0.65rem] font-black uppercase tracking-wider transition-all duration-200 shadow-sm z-10 flex items-center gap-1">
                <span>Probar Demo</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-[0.6rem]"></i>
              </div>
              <div>
                {/* Card Header matching Padel Pro layout structure */}
                <div className="p-5 flex items-center gap-3">
                  <img src="/logo-handshake.png" alt="2Gether Rewards Logo" className="h-10 w-10 object-contain" />
                  <div className="text-left leading-none">
                    <span className="block font-heading font-black text-sm text-gray-900 tracking-wider">2GETHER</span>
                    <span className="block font-heading font-light text-[0.7rem] text-gray-500 tracking-widest mt-0.5">REWARDS</span>
                  </div>
                </div>

                {/* Card Banner Image (Cloudinary layout with stamps) */}
                <div className="w-full">
                  <img
                    src="https://res.cloudinary.com/dvmrbrrba/image/upload/v1781316175/LOGO_2GETHER_REWARDS-13_rlmvfq.png"
                    alt="2Gether Rewards Banner"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Card Info Body (Jon Doe & Premio 0) */}
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="text-left">
                      <span className="block text-[0.65rem] font-bold text-gray-400 tracking-widest uppercase">TÍTULAR</span>
                      <span className="block text-xl font-normal text-gray-800 tracking-wide mt-1 uppercase">JON DOE</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[0.65rem] font-bold text-gray-400 tracking-widest uppercase">PREMIO</span>
                      <span className="block text-xl font-normal text-gray-800 mt-1">0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code Section (Centered at the bottom with white space spacing) */}
              <div className="flex justify-center pb-8 pt-4">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://2getherrewards.com"
                  alt="2Gether Rewards QR Code"
                  className="h-32 w-32 rounded-lg border border-gray-100 bg-white p-1"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN BENEFICIOS (Features) */}
      <section className="py-24 bg-gradient-to-br from-[#0F1A17] via-[#142620] to-[#0D1614] border-y border-emerald-900/40 relative overflow-hidden text-white" id="beneficios">
        {/* Ambient brand glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl border border-emerald-500/20 bg-[#162520]/80 backdrop-blur-md text-left space-y-4 shadow-xl hover:shadow-2xl hover:shadow-emerald-950/50 hover:border-emerald-400/60 hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="h-14 w-14 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-2xl border border-emerald-500/30 group-hover:scale-110 group-hover:bg-primary group-hover:text-emerald-950 group-hover:border-primary transition-all duration-300 shadow-md">
                <i className="fa-solid fa-wallet"></i>
              </div>
              <h3 className="font-heading font-black text-xl text-white group-hover:text-primary transition-colors">Tarjetas Digitales</h3>
              <p className="text-gray-300 text-[0.95rem] leading-relaxed">Tarjetas de sellos, cashback, regalo, descuento y membresías 100% digitales, sin apps. Compatible con Apple y Google Wallet.</p>
            </div>

            <div className="p-8 rounded-3xl border border-emerald-500/20 bg-[#162520]/80 backdrop-blur-md text-left space-y-4 shadow-xl hover:shadow-2xl hover:shadow-emerald-950/50 hover:border-emerald-400/60 hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="h-14 w-14 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-2xl border border-emerald-500/30 group-hover:scale-110 group-hover:bg-primary group-hover:text-emerald-950 group-hover:border-primary transition-all duration-300 shadow-md">
                <i className="fa-solid fa-bell"></i>
              </div>
              <h3 className="font-heading font-black text-xl text-white group-hover:text-primary transition-colors">Notificaciones Push</h3>
              <p className="text-gray-300 text-[0.95rem] leading-relaxed">Envía alertas, ofertas, cupones y recordatorios directamente al móvil de tus clientes sin que tengan que abrir ninguna aplicación.</p>
            </div>

            <div className="p-8 rounded-3xl border border-emerald-500/20 bg-[#162520]/80 backdrop-blur-md text-left space-y-4 shadow-xl hover:shadow-2xl hover:shadow-emerald-950/50 hover:border-emerald-400/60 hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="h-14 w-14 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-2xl border border-emerald-500/30 group-hover:scale-110 group-hover:bg-primary group-hover:text-emerald-950 group-hover:border-primary transition-all duration-300 shadow-md">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3 className="font-heading font-black text-xl text-white group-hover:text-primary transition-colors">Dashboard en Tiempo Real</h3>
              <p className="text-gray-300 text-[0.95rem] leading-relaxed">Visualiza el comportamiento de compra, frecuencia de visitas y el retorno de cada cliente desde tu panel de control en vivo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN PLANES (Shop) */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-100" id="menu">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-gray-900">Elige tu <span className="text-primary">Plan 2GetherRewards</span></h2>
            <p className="text-gray-600">Selecciona el plan que mejor se adapta al tamaño y objetivos de tu negocio. Sin permanencias, cancela cuando quieras.</p>
          </div>

          {/* Grid de Planes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">

            {/* Plan START */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
              <div className="space-y-6">
                <div className="text-left space-y-2">
                  <h3 className="font-heading font-black text-2xl text-gray-800">START</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-gray-900">$49</span>
                    <span className="text-gray-500 font-semibold">/ mes</span>
                  </div>
                  <p className="text-gray-500 text-sm">El impulso inicial para digitalizar tu negocio</p>
                </div>
                <hr className="border-gray-100" />
                <ul className="space-y-2.5 text-left text-[0.88rem] text-gray-600">
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span><strong>1 SUCURSAL</strong></span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>HASTA <strong>500 CLIENTES</strong></span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>TARJETAS DE SELLOS <em>(Apple/Google Wallet)</em></span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>TARJETAS DE REGALO <em>(Apple/Google Wallet)</em></span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>NOTIFICACIONES PUSH</span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>DASHBOARD EN TIEMPO REAL</span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>GEO UBICACIÓN</span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>USUARIO ADMIN</span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>USUARIO EMPLEADO</span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>SOPORTE POR CORREO</span></li>
                </ul>
              </div>
              <div className="space-y-6 mt-8">
                <div className="bg-gray-50 rounded-2xl p-4 flex gap-3 text-left text-xs text-gray-600">
                  <i className="fa-solid fa-store text-primary text-base"></i>
                  <div>
                    <strong>Ideal para:</strong> Emprendedores, cafeterías, barberías, restaurantes y pequeños comercios.
                  </div>
                </div>
                <button
                  className="w-full py-4 bg-gray-900 hover:bg-gray-850 text-white font-bold rounded-full transition-transform duration-200 active:scale-95 cursor-pointer"
                  onClick={() => { setActiveTab('registro'); setRegPlan('Plan START - $49/mes'); setCurrentPage('dashboard-trial'); }}
                >
                  Contratar Plan START
                </button>
              </div>
            </div>

            {/* Plan GROWTH (Más Popular) */}
            <div className="bg-white rounded-3xl border-2 border-primary shadow-xl p-8 flex flex-col justify-between relative hover:shadow-2xl transition-shadow duration-300">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider">
                ★ MÁS POPULAR
              </span>
              <div className="space-y-6">
                <div className="text-left space-y-2">
                  <h3 className="font-heading font-black text-2xl text-gray-800">GROWTH</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-gray-900">$69</span>
                    <span className="text-gray-500 font-semibold">/ mes</span>
                  </div>
                  <p className="text-gray-500 text-sm">Aumenta la frecuencia de compra y segmenta como los grandes</p>
                </div>
                <hr className="border-gray-100" />
                <ul className="space-y-2.5 text-left text-[0.88rem] text-gray-600">
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>HASTA <strong>5 SUCURSALES</strong></span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>HASTA <strong>5,000 CLIENTES</strong></span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>TARJETAS DE SELLOS <em>(Apple/Google Wallet)</em></span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>TARJETAS DE REGALO <em>(Apple/Google Wallet)</em></span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>NOTIFICACIONES PUSH</span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>ENVÍO DE OFERTAS Y CUPONES</span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>DASHBOARD EN TIEMPO REAL</span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>GEO LOCALIZACIÓN PARA TODAS LAS SUCURSALES</span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>USUARIO ADMIN</span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>USUARIO EMPLEADO</span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>SOPORTE POR CORREO</span></li>
                </ul>
              </div>
              <div className="space-y-6 mt-8">
                <div className="bg-emerald-50/50 rounded-2xl p-4 flex gap-3 text-left text-xs text-gray-600">
                  <i className="fa-solid fa-building text-primary text-base"></i>
                  <div>
                    <strong>Ideal para:</strong> Negocios en expansión, cadenas locales y franquicias pequeñas.
                  </div>
                </div>
                <button
                  className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-full shadow-lg shadow-emerald-500/15 transition-transform duration-200 active:scale-95 cursor-pointer"
                  onClick={() => { setActiveTab('registro'); setRegPlan('Plan GROWTH - $69/mes'); setCurrentPage('dashboard-trial'); }}
                >
                  Contratar Plan GROWTH
                </button>
              </div>
            </div>

            {/* Plan ENTERPRISE */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
              <div className="space-y-6">
                <div className="text-left space-y-2">
                  <h3 className="font-heading font-black text-2xl text-gray-800">ENTERPRISE</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-gray-900">$99</span>
                    <span className="text-gray-500 font-semibold">/ mes</span>
                  </div>
                  <p className="text-gray-500 text-sm">Conectividad total, control corporativo y marketing integral</p>
                </div>
                <hr className="border-gray-100" />
                <ul className="space-y-2.5 text-left text-[0.88rem] text-gray-600">
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span><strong>SUCURSALES ILIMITADAS</strong></span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span><strong>CLIENTES ILIMITADOS</strong></span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>TARJETAS DE SELLOS <em>(Apple/Google Wallet)</em></span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>TARJETAS DE REGALO <em>(Apple/Google Wallet)</em></span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>NOTIFICACIONES PUSH</span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>ENVÍO DE OFERTAS Y CUPONES</span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>DASHBOARD EN TIEMPO REAL</span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>GEO LOCALIZACIÓN ILIMITADA</span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>USUARIO ADMIN</span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>USUARIO EMPLEADO</span></li>
                  <li className="flex items-start gap-2.5"><i className="fa-solid fa-check text-primary mt-1"></i> <span>SOPORTE POR CORREO</span></li>
                </ul>
              </div>
              <div className="space-y-6 mt-8">
                <div className="bg-gray-50 rounded-2xl p-4 flex gap-3 text-left text-xs text-gray-600">
                  <i className="fa-solid fa-city text-primary text-base"></i>
                  <div>
                    <strong>Ideal para:</strong> Franquicias, cadenas comerciales y empresas con múltiples sedes.
                  </div>
                </div>
                <button
                  className="w-full py-4 bg-gray-900 hover:bg-gray-850 text-white font-bold rounded-full transition-transform duration-200 active:scale-95 cursor-pointer"
                  onClick={() => { setActiveTab('registro'); setRegPlan('Plan ENTERPRISE - $99/mes'); setCurrentPage('dashboard-trial'); }}
                >
                  Contratar Plan ENTERPRISE
                </button>
              </div>
            </div>
          </div>

          {/* ADD-ON EXCLUSIVO: Redes Sociales */}
          <div className="rounded-3xl overflow-hidden text-left shadow-2xl border border-emerald-800/10" id="addon-social">
            <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-gradient-to-br from-charcoal via-emerald-950 to-emerald-900 text-white">
              <div className="lg:col-span-8 space-y-6">
                <span className="inline-block text-[0.65rem] uppercase tracking-wider font-extrabold bg-lime/10 text-lime px-3 py-1.5 rounded-md border border-lime/20">
                  ADD-ON EXCLUSIVO
                </span>
                <h3 className="font-heading text-3xl lg:text-4xl font-black text-white leading-tight">
                  Impulsa tus <span className="text-lime">Redes Sociales</span>
                </h3>
                <p className="text-emerald-100/90 max-w-3xl text-sm sm:text-base leading-relaxed">
                  Definimos tu estrategia, editamos y publicamos tu contenido. Solo nos entregas el contenido bruto y nosotros nos encargamos de transformarlo en publicaciones de alto impacto.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex gap-3 bg-white/5 border border-white/10 p-4 rounded-xl items-start">
                    <i className="fa-solid fa-bullseye text-lime text-lg mt-0.5"></i>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-50">Estrategia digital personalizada</span>
                  </div>
                  <div className="flex gap-3 bg-white/5 border border-white/10 p-4 rounded-xl items-start">
                    <i className="fa-solid fa-comments text-lime text-lg mt-0.5"></i>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-50">Sesiones constantes de brainstorming</span>
                  </div>
                  <div className="flex gap-3 bg-white/5 border border-white/10 p-4 rounded-xl items-start">
                    <i className="fa-solid fa-video text-lime text-lg mt-0.5"></i>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-50">Pautas de grabación guiadas</span>
                  </div>
                  <div className="flex gap-3 bg-white/5 border border-white/10 p-4 rounded-xl items-start">
                    <i className="fa-solid fa-rocket text-lime text-lg mt-0.5"></i>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-50">Optimización y publicación profesional</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 text-center space-y-6 bg-white/5 border border-white/10 p-8 rounded-3xl w-full">
                <div>
                  <span className="block text-emerald-300 text-xs font-bold uppercase tracking-widest">PRECIO ADICIONAL</span>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-black text-white">+ $300</span>
                    <span className="text-emerald-300 text-sm">/ mes</span>
                  </div>
                </div>
                <button
                  className="w-full py-4 bg-lime hover:bg-lime/90 text-charcoal font-black rounded-full transition-transform duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-lime-500/10 cursor-pointer"
                  onClick={() => { setActiveTab('registro'); setRegPlan('Add-on Redes Sociales - $300/mes'); setCurrentPage('dashboard-trial'); }}
                >
                  <i className="fa-brands fa-instagram"></i> Añadir Add-on Redes Sociales
                </button>
              </div>
            </div>
          </div>

          {/* Incluye en todos los planes */}
          <div className="mt-12 bg-white rounded-3xl border border-gray-100 p-6 flex flex-col md:flex-row md:items-center gap-6 text-left" id="includes-all">
            <h4 className="flex items-center gap-2 font-heading font-black text-gray-900 text-md shrink-0">
              <i className="fa-solid fa-circle-check text-primary"></i> Incluido en todos los planes:
            </h4>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-600 font-semibold">
              <span className="flex items-center gap-1.5"><i className="fa-solid fa-wallet text-gray-400"></i> Apple/Google Wallet</span>
              <span className="flex items-center gap-1.5"><i className="fa-solid fa-bell text-gray-400"></i> Notificaciones Push</span>
              <span className="flex items-center gap-1.5"><i className="fa-solid fa-users text-gray-400"></i> Registro de clientes</span>
              <span className="flex items-center gap-1.5"><i className="fa-solid fa-arrow-trend-up text-gray-400"></i> Herramientas de recompra</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN TIPOS DE TARJETA */}
      <section className="py-20 bg-white" id="tarjetas">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-gray-900">¡Tu programa, <span className="text-primary">tus reglas!</span></h2>
            <p className="text-gray-600">Nuestra plataforma es compatible con 7 tipos de lógicas comerciales para que utilices la que mejor se adapte a tu tipo de negocio.</p>
          </div>

          {/* Fila 1: 4 tarjetas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 'sellos', icon: 'fa-stamp', title: 'Tarjeta de Sellos', desc: 'El clásico e infalible "Compra 10 cafés" y obtén 1 gratis.' },
              { id: 'afiliacion', icon: 'fa-id-card', title: 'Tarjeta de Afiliación', desc: 'Registra clientes capturando sus datos a cambio de promociones exclusivas.' },
              { id: 'descuento', icon: 'fa-percent', title: 'Tarjeta de Descuento', desc: 'Premia la lealtad otorgando un porcentaje de descuento progresivo.' },
              { id: 'cupon', icon: 'fa-ticket', title: 'Tarjeta de Cupón', desc: 'Regala un cupón digital de un solo uso en el instante de registro.' }
            ].map((type) => (
              <div key={type.id} className="p-6 rounded-3xl border border-gray-100 bg-gray-50/30 text-left flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                <div className="space-y-4">
                  <div className="h-11 w-11 rounded-xl flex items-center justify-center text-lg bg-emerald-50/80 text-primary">
                    <i className={`fa-solid ${type.icon}`}></i>
                  </div>
                  <h4 className="font-heading font-black text-lg text-gray-900 flex items-center gap-2">
                    {type.title}
                  </h4>
                  <p className="text-gray-600 text-[0.88rem] leading-relaxed">{type.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Fila 2: 3 tarjetas centradas */}
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { id: 'regalo', icon: 'fa-gift', title: 'Tarjeta de Regalo', desc: 'Emite y gestiona certificados de regalo 100% digitales y transferibles.' },
              { id: 'membresia', icon: 'fa-crown', title: 'Membresía PREMIUM', desc: 'Crea un club exclusivo para miembros VIP y acepta pagos recurrentes.', premium: true },
              { id: 'multipase', icon: 'fa-layer-group', title: 'Multipase PREMIUM', desc: 'Mejora tu flujo de caja cobrando por adelantado con tarjetas prepagadas.', premium: true }
            ].map((type) => (
              <div key={type.id} className={`w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] p-6 rounded-3xl border text-left flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 ${type.premium ? 'border-amber-200 bg-amber-50/10' : 'border-gray-100 bg-gray-50/30'}`}>
                <div className="space-y-4">
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center text-lg ${type.premium ? 'bg-amber-100 text-amber-600' : 'bg-emerald-50/80 text-primary'}`}>
                    <i className={`fa-solid ${type.icon}`}></i>
                  </div>
                  <h4 className="font-heading font-black text-lg text-gray-900 flex items-center gap-2">
                    {type.title}
                    {type.premium && <span className="text-[0.6rem] bg-amber-100 text-amber-700 font-extrabold px-1.5 py-0.5 rounded">PREMIUM</span>}
                  </h4>
                  <p className="text-gray-600 text-[0.88rem] leading-relaxed">{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN QUIZ */}
      <section className="py-24 bg-gradient-to-br from-[#0F1A17] via-[#142620] to-[#0D1614] border-t border-b border-emerald-900/40 relative overflow-hidden text-white" id="quiz">
        {/* Ambient brand glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 text-center space-y-16 relative z-10">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white">¿Cuál es tu <span className="text-primary">Plan Ideal?</span></h2>
            <p className="text-gray-300">Responde 3 preguntas rápidas y te recomendamos el plan 2GetherRewards perfecto para tu negocio.</p>
          </div>

          <div className="max-w-xl mx-auto bg-[#162520]/90 backdrop-blur-md rounded-3xl border border-emerald-500/20 p-8 shadow-2xl min-h-[300px] flex items-center justify-center">
            {/* Pantalla Inicial */}
            {quizStep === 0 && (
              <div className="space-y-6 w-full text-center">
                <div className="h-16 w-16 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-2xl mx-auto animate-pulse">
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading font-black text-xl text-white">Encontremos tu plan perfecto</h3>
                  <p className="text-gray-300 text-sm max-w-md mx-auto">Analizaremos tu tipo de negocio, volumen de clientes y tus objetivos para recomendarte la combinación idónea.</p>
                </div>
                <button className="px-8 py-3.5 bg-primary hover:bg-primary-hover text-emerald-950 font-extrabold rounded-full shadow-lg shadow-emerald-500/20 transition-all hover:scale-105" onClick={startQuiz}>
                  Comenzar
                </button>
              </div>
            )}

            {/* Pregunta 1 */}
            {quizStep === 1 && (
              <div className="w-full text-left space-y-6">
                <div className="w-full bg-emerald-950/60 border border-emerald-500/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full transition-all duration-300 shadow-[0_0_10px_#69BFA1]" style={{ width: '33%' }}></div>
                </div>
                <h3 className="font-heading font-black text-lg text-white">1. ¿Qué tipo de negocio tienes?</h3>
                <div className="space-y-3">
                  {[
                    { val: 'hot', icon: 'fa-utensils', label: 'Restauración y Hostelería', desc: 'Cafeterías, bares, restaurantes o catering.' },
                    { val: 'cold', icon: 'fa-store', label: 'Comercio Local y Retail', desc: 'Tiendas, estéticas, barberías o salones.' },
                    { val: 'grains', icon: 'fa-building', label: 'Franquicia o Cadena', desc: 'Múltiples sucursales o en expansión.' }
                  ].map((opt) => (
                    <div
                      key={opt.val}
                      className={`p-4 rounded-2xl border cursor-pointer flex gap-4 items-center transition-all duration-200 ${quizAnswers.type === opt.val ? 'border-primary bg-emerald-500/20 shadow-md shadow-emerald-950/50' : 'border-emerald-500/20 hover:border-emerald-400/50 bg-emerald-950/30'}`}
                      onClick={() => selectQuizAnswer('type', opt.val)}
                    >
                      <i className={`fa-solid ${opt.icon} text-lg text-primary`}></i>
                      <div>
                        <span className="block font-bold text-white text-sm">{opt.label}</span>
                        <span className="block text-xs text-gray-300">{opt.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pregunta 2 */}
            {quizStep === 2 && (
              <div className="w-full text-left space-y-6">
                <div className="w-full bg-emerald-950/60 border border-emerald-500/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full transition-all duration-300 shadow-[0_0_10px_#69BFA1]" style={{ width: '66%' }}></div>
                </div>
                <h3 className="font-heading font-black text-lg text-white">2. ¿Cuántos clientes frecuentes tienes al mes?</h3>
                <div className="space-y-3">
                  {[
                    { val: 'sweet', icon: 'fa-users-line', label: 'Menos de 500', desc: 'Comercio de barrio o negocio en inicio.' },
                    { val: 'acid', icon: 'fa-people-group', label: '500 a 5,000', desc: 'Negocio consolidado y en crecimiento.' },
                    { val: 'strong', icon: 'fa-city', label: 'Más de 5,000', desc: 'Gran volumen o múltiples ubicaciones.' }
                  ].map((opt) => (
                    <div
                      key={opt.val}
                      className={`p-4 rounded-2xl border cursor-pointer flex gap-4 items-center transition-all duration-200 ${quizAnswers.flavor === opt.val ? 'border-primary bg-emerald-500/20 shadow-md shadow-emerald-950/50' : 'border-emerald-500/20 hover:border-emerald-400/50 bg-emerald-950/30'}`}
                      onClick={() => selectQuizAnswer('flavor', opt.val)}
                    >
                      <i className={`fa-solid ${opt.icon} text-lg text-primary`}></i>
                      <div>
                        <span className="block font-bold text-white text-sm">{opt.label}</span>
                        <span className="block text-xs text-gray-300">{opt.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pregunta 3 */}
            {quizStep === 3 && (
              <div className="w-full text-left space-y-6">
                <div className="w-full bg-emerald-950/60 border border-emerald-500/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full transition-all duration-300 shadow-[0_0_10px_#69BFA1]" style={{ width: '100%' }}></div>
                </div>
                <h3 className="font-heading font-black text-lg text-white">3. ¿Cuál es tu prioridad principal?</h3>
                <div className="space-y-3">
                  {[
                    { val: 'pastry', icon: 'fa-arrows-spin', label: 'Hacer que vuelvan más seguido', desc: 'Retención y automatización de visitas.' },
                    { val: 'pure', icon: 'fa-chart-pie', label: 'Analizar y crecer a escala', desc: 'Control de múltiples puntos de venta y datos.' }
                  ].map((opt) => (
                    <div
                      key={opt.val}
                      className={`p-4 rounded-2xl border cursor-pointer flex gap-4 items-center transition-all duration-200 ${quizAnswers.addons === opt.val ? 'border-primary bg-emerald-500/20 shadow-md shadow-emerald-950/50' : 'border-emerald-500/20 hover:border-emerald-400/50 bg-emerald-950/30'}`}
                      onClick={() => selectQuizAnswer('addons', opt.val)}
                    >
                      <i className={`fa-solid ${opt.icon} text-lg text-primary`}></i>
                      <div>
                        <span className="block font-bold text-white text-sm">{opt.label}</span>
                        <span className="block text-xs text-gray-300">{opt.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resultados */}
            {quizStep === 4 && recommendedPlan && (
              <div className="w-full text-center space-y-6">
                <h3 className="font-heading font-black text-xl text-white">¡Recomendación Lista!</h3>
                <div className="p-6 rounded-2xl border-2 border-primary/40 bg-emerald-950/50 text-left space-y-4 shadow-xl backdrop-blur-md">
                  <div className="flex justify-between items-start">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-primary">PLAN PERFECTO</span>
                    <span className="text-xl font-black text-white">${recommendedPlan.price}/mes</span>
                  </div>
                  <h4 className="font-heading font-black text-lg text-white">{recommendedPlan.name}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{recommendedPlan.desc}</p>
                  <button
                    className="w-full py-3.5 bg-primary hover:bg-primary-hover text-emerald-950 font-extrabold rounded-full text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-102 cursor-pointer"
                    onClick={() => { setActiveTab('registro'); setRegPlan(recommendedPlan.name); setCurrentPage('dashboard-trial'); }}
                  >
                    Contratar este Plan
                  </button>
                </div>
                <button className="text-sm font-bold text-gray-400 hover:text-white flex items-center gap-1.5 mx-auto transition-colors" onClick={restartQuiz}>
                  <i className="fa-solid fa-rotate-left"></i> Repetir Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECCIÓN NOSOTROS */}
      <section className="py-20 bg-white" id="nosotros">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop" alt="Dashboard 2GetherRewards" className="rounded-3xl border border-gray-100 shadow-xl" />
            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-xl flex flex-col items-center">
              <span className="text-2xl font-black leading-none">+35%</span>
              <span className="text-[0.65rem] font-bold uppercase tracking-wider">Retención</span>
            </div>
          </div>
          <div className="text-left space-y-6">
            <span className="text-xs font-black uppercase tracking-widest text-primary bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100">
              NUESTRA PLATAFORMA
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl font-black text-gray-900 leading-tight">Tecnología de fidelización al <span className="text-primary">alcance de tu negocio</span></h3>
            <p className="text-gray-600 text-[0.95rem] leading-relaxed">
              En 2GetherRewards creemos que todo negocio, sin importar su tamaño, merece acceso a herramientas de fidelización de primer nivel. Sin aplicaciones adicionales, sin hardware costoso, sin complicaciones técnicas.
            </p>
            <p className="text-gray-600 text-[0.95rem] leading-relaxed">
              Nuestras tarjetas digitales funcionan de manera nativa en Apple Wallet y Google Wallet, facilitando que tus clientes las lleven siempre con ellos, sin necesidad de descargas.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-2 border-t border-gray-100">
              <div>
                <span className="block text-3xl font-black text-gray-900">2.5M+</span>
                <span className="text-xs font-bold text-gray-400 uppercase">Tarjetas creadas</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-gray-900">1,200+</span>
                <span className="text-xs font-bold text-gray-400 uppercase">Negocios activos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN PREGUNTAS FRECUENTES (FAQ) */}
      <section className="py-20 bg-gray-50/70 border-t border-b border-gray-150 text-left" id="faq">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
            <span className="inline-block text-[0.7rem] uppercase tracking-widest font-black text-primary bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
              RESOLVEMOS TUS DUDAS
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
              ¿Tienes alguna pregunta? <br />
              <span className="text-primary">Consulta nuestras preguntas frecuentes</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Encuentra todas las respuestas sobre la creación de tarjetas digitales, integración sin apps, asignación de sellos y prueba gratuita.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                className="px-6 py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 text-xs sm:text-sm cursor-pointer"
                onClick={() => { setActiveTab('registro'); setRegPlan('Plan START - $49/mes'); setCurrentPage('dashboard-trial'); }}
              >
                Prueba GRATIS
              </button>
              <button
                className="px-6 py-3.5 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                onClick={() => alert('¡Agendador de reuniones! Nos pondremos en contacto contigo para una demostración personalizada.')}
              >
                <i className="fa-regular fa-calendar-check"></i> Agendar REUNIÓN
              </button>
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {faqList.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen ? 'bg-white border-emerald-200 shadow-md' : 'bg-white/80 border-gray-200 hover:border-gray-300'}`}
                >
                  <button
                    className="w-full p-5 text-left flex justify-between items-center gap-4 font-heading font-bold text-sm sm:text-base text-gray-900 cursor-pointer"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  >
                    <span>{faq.q}</span>
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'bg-emerald-50 text-primary rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                      <i className="fa-solid fa-chevron-down text-xs"></i>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-16 text-left" id="main-footer">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-6 space-y-4">
              <a href="#inicio" className="flex items-center gap-3 font-heading font-black text-xl text-white">
                <img src="/logo-handshake-white.png" alt="2Gether Rewards Logo" className="h-6 w-auto" />
                2Gether<span className="text-primary">Rewards</span>
              </a>
              <p className="text-sm text-gray-400 max-w-md leading-relaxed">
                Fideliza. Conecta. Haz crecer tu negocio. La plataforma de fidelización digital más completa del mercado, sin apps y compatible con Apple y Google Wallet.
              </p>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/people/2Gether-Rewards/61592264844889/#" target="_blank" rel="noopener noreferrer" className="h-9 w-9 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white text-sm" aria-label="Facebook 2Gether Rewards"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="https://www.instagram.com/2getherrewards/" target="_blank" rel="noopener noreferrer" className="h-9 w-9 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white text-sm" aria-label="Instagram 2Gether Rewards"><i className="fa-brands fa-instagram"></i></a>
                <a href="#" className="h-9 w-9 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-white text-sm"><i className="fa-brands fa-linkedin-in"></i></a>
              </div>
            </div>
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-bold text-white text-sm">Plataforma</h4>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li><a href="#tarjetas" className="hover:text-white" onClick={() => setActiveNav('tarjetas')}>Tipos de Tarjeta</a></li>
                <li><a href="#quiz" className="hover:text-white" onClick={() => { setActiveNav('quiz'); startQuiz(); }}>Encuentra tu Plan</a></li>
                <li><a href="#nosotros" className="hover:text-white" onClick={() => setActiveNav('nosotros')}>Sobre Nosotros</a></li>
                <li><a href="#faq" className="hover:text-white" onClick={() => setActiveNav('faq')}>Preguntas Frecuentes</a></li>
                <li>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('acceso'); setCurrentPage('dashboard-trial'); }}
                    className="hover:text-white text-gray-400 bg-transparent border-none p-0 cursor-pointer flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-arrow-right-to-bracket text-xs text-primary"></i> Acceso a Clientes
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => { setActiveTab('registro'); setCurrentPage('dashboard-trial'); }}
                    className="hover:text-white text-gray-400 bg-transparent border-none p-0 cursor-pointer flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-gauge-high text-xs text-primary"></i> Probar Dashboard / Registro
                  </button>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-bold text-white text-sm">Contacto</h4>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li className="flex gap-2"><i className="fa-solid fa-envelope text-gray-500 mt-1"></i> info@2getherrewards.com</li>
                <li className="flex gap-2"><i className="fa-solid fa-globe text-gray-500 mt-1"></i> www.2getherrewards.com</li>
              </ul>
            </div>
          </div>
          <hr className="border-gray-800" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>&copy; 2026 2GetherRewards. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">Privacidad</a>
              <button type="button" onClick={() => setCurrentPage('dashboard-trial')} className="hover:text-white text-gray-500 bg-transparent border-none p-0 cursor-pointer">Términos de Servicio</button>
            </div>
          </div>
        </div>
      </footer>

      {/* DRAWER CONFIGURADOR (CARRITO) */}
      {isCartOpen && <div className="fixed inset-0 bg-black/50 z-[99] backdrop-blur-sm" onClick={closeCart} id="cart-overlay"></div>}
      <div className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[100] shadow-2xl flex flex-col justify-between transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`} id="cart-drawer">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-heading font-black text-lg text-gray-900 flex items-center gap-2">
            <i className="fa-solid fa-sliders text-primary"></i> Tu Suscripción
          </h3>
          <button className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50" onClick={closeCart} aria-label="Cerrar configurador">
            <i className="fa-solid fa-xmark text-gray-500"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400">
              <i className="fa-solid fa-handshake text-4xl text-gray-300"></i>
              <div className="space-y-1">
                <p className="font-bold text-gray-700 text-sm">Configurador Vacío</p>
                <p className="text-xs">Selecciona un plan arriba para comenzar.</p>
              </div>
            </div>
          ) : (
            cart.map(item => (
              <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100" key={item.id}>
                <img src={item.img} alt={item.name} className="h-14 w-14 rounded-xl object-cover border border-gray-200 shrink-0" />
                <div className="flex-1 text-left flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                    <span className="text-xs font-bold text-primary">${item.price.toFixed(2)} <small className="text-gray-400 font-normal">/mes</small></span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <button className="px-2 py-1 hover:bg-gray-50 text-gray-500 text-xs" onClick={() => updateQuantity(item.id, -1)}><i className="fa-solid fa-minus"></i></button>
                      <span className="px-3 font-bold text-gray-700 text-xs">{item.quantity}</span>
                      <button className="px-2 py-1 hover:bg-gray-50 text-gray-500 text-xs" onClick={() => updateQuantity(item.id, 1)}><i className="fa-solid fa-plus"></i></button>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 text-xs" onClick={() => removeFromCart(item.id)}><i className="fa-solid fa-trash-can"></i></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-6">
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-bold text-gray-800">${cartSubtotalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Soporte e Instalación</span>
              <span className="font-bold text-primary text-xs uppercase tracking-wider">Gratis</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between text-base font-black text-gray-900">
              <span>Total Mensual</span>
              <span>${cartSubtotalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-full shadow-lg" onClick={handleCheckout}>
            Contratar Plan
          </button>
        </div>
      </div>

      {/* MODAL ÉXITO */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100 text-center space-y-6 animate-scaleUp">
            <div className="h-14 w-14 bg-emerald-50 text-primary rounded-full flex items-center justify-center text-xl mx-auto border border-emerald-100">
              <i className="fa-solid fa-check"></i>
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-black text-xl text-gray-900">¡Bienvenido a 2GetherRewards!</h3>
              <p className="text-gray-500 text-xs leading-relaxed">Tu suscripción fue procesada correctamente. Recibirás un correo en breve con las credenciales de acceso a tu panel corporativo.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2.5 text-left text-xs">
              <div className="flex justify-between text-gray-600">
                <span>ID Licencia:</span>
                <span className="font-bold text-gray-900">{successSummary.orderId}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Planes:</span>
                <span className="font-bold text-gray-900">{successSummary.itemsCount} plan(es) / módulo(s)</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between font-black text-gray-900 text-sm">
                <span>Total mensual:</span>
                <span>${successSummary.total.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full py-4.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-full text-sm" onClick={() => setIsSuccessModalOpen(false)}>
              Acceder a mi Panel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
