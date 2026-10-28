import { useState, useEffect } from "react";
import { 
  ArrowUpRight, 
  Check, 
  ChevronRight, 
  MessageSquare, 
  Monitor, 
  Share2, 
  FileText, 
  Send, 
  Sparkles, 
  X, 
  Menu, 
  Zap, 
  Smartphone, 
  TrendingUp, 
  Users, 
  ExternalLink,
  ChevronDown,
  Plus,
  Minus,
  Calendar,
  Clock,
  Trash,
  RefreshCw,
  Instagram,
  Phone
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- TYPES ---
interface Project {
  id: string;
  title: string;
  category: "apps" | "media" | "content";
  tag: string;
  client: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  accentText: string;
  link: string;
  mockUI: {
    title: string;
    status: string;
    actionLabel: string;
  };
}

interface Plan {
  id: "start" | "padrao" | "advanced";
  name: string;
  price: number;
  setupPrice?: number;
  description: string;
  features: string[];
  recommended: boolean;
}

export default function App() {
  // --- STATE ---
  const [accent, setAccent] = useState<"purple" | "green" | "yellow">("purple");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInSimulador, setIsInSimulador] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    apps: true,
    media: false,
    content: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentScroll = window.scrollY;
        setScrollProgress((currentScroll / totalScroll) * 100);
      }

      const simuladorEl = document.getElementById("simulador");
      if (simuladorEl) {
        const rect = simuladorEl.getBoundingClientRect();
        // Section is active if top of section is within middle viewport, or we're inside it
        const isIntersecting = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.15;
        setIsInSimulador(isIntersecting);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [activeTab, setActiveTab] = useState<"all" | "apps" | "media" | "content">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [demoOrderCount, setDemoOrderCount] = useState<number>(312);
  const [demoGmv, setDemoGmv] = useState<number>(14980);
  const [demoOrdersList, setDemoOrdersList] = useState<Array<{ id: string; val: string; status: string }>>([
    { id: "ORD #4051", val: "R$ 450,00", status: "Pago" },
    { id: "ORD #4050", val: "R$ 1.200,00", status: "Pago" },
    { id: "ORD #4049", val: "R$ 89,90", status: "Em processamento" },
  ]);
  const [whatsappPhone, setWhatsappPhone] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<"start" | "padrao" | "advanced">("padrao");
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [showCouponPopup, setShowCouponPopup] = useState<boolean>(true);
  const [animateCheckout, setAnimateCheckout] = useState<boolean>(false);

  // State variables for "Personalizado" plan config
  const [customApps, setCustomApps] = useState<{
    appPersonalizado: boolean;
    vendas: boolean;
    mecflow: boolean;
    estoque: boolean;
    quickService: boolean;
    pontoEletronico: boolean;
  }>({
    appPersonalizado: false,
    vendas: true,
    mecflow: false,
    estoque: true,
    quickService: false,
    pontoEletronico: true,
  });

  const [customPostsPerWeek, setCustomPostsPerWeek] = useState<number>(3); // 0 to 5
  const [customVideosPerWeek, setCustomVideosPerWeek] = useState<number>(1); // 0 to 3
  const [customVisualIdentity, setCustomVisualIdentity] = useState<boolean>(true);
  const [contactForm, setContactForm] = useState({
    nome: "",
    email: "",
    servico: "Criação de App",
    mensagem: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({
    0: true,
  });

  // --- PORTFOLIO PREVIEWER STATES ---
  const [activePreviewAppId, setActivePreviewAppId] = useState<string>("pro-1");
  
  // App 1: Vectura Vendas State
  const [vendasCart, setVendasCart] = useState<Array<{ name: string; price: number; icon: string }>>([]);
  
  // App 2: Vectura MecFlow State
  const [mecFlowOS, setMecFlowOS] = useState<Array<{ id: string; car: string; service: string; status: "Pendente" | "Execução" | "Pronto"; progress: number }>>([
    { id: "OS #1024", car: "Honda Civic", service: "Troca de Pastilhas", status: "Execução", progress: 65 },
    { id: "OS #1023", car: "Toyota Corolla", service: "Revisão Geral 50k", status: "Pronto", progress: 100 },
    { id: "OS #1022", car: "Chevrolet Onix", service: "Alinhamento 3D", status: "Pendente", progress: 0 },
  ]);

  // App 3: Vectura Quick Service State
  const [quickServiceType, setQuickServiceType] = useState<"moto" | "carro">("moto");
  const [quickServiceDate, setQuickServiceDate] = useState<string>("Hoje");
  const [quickServiceTime, setQuickServiceTime] = useState<string>("14:00");
  const [quickServiceBookings, setQuickServiceBookings] = useState<Array<{ id: string; type: string; date: string; time: string }>>([
    { id: "OS-Q-890", type: "Moto 🏍️", date: "Hoje", time: "10:30" }
  ]);

  // App 4: Vectura Controle de Estoque State
  const [estoqueItems, setEstoqueItems] = useState<Array<{ name: string; qty: number; minQty: number }>>([
    { name: "Filtro de Óleo", qty: 14, minQty: 5 },
    { name: "Vela de Ignição", qty: 3, minQty: 8 },
    { name: "Pastilha Dianteira", qty: 12, minQty: 4 },
    { name: "Cabo de Embreagem", qty: 2, minQty: 3 },
  ]);

  // App 5: Vectura Ponto Eletrônico State
  const [pontoTime, setPontoTime] = useState<string>("");
  const [pontoLogs, setPontoLogs] = useState<Array<{ time: string; action: string }>>([
    { time: "08:02:15", action: "Entrada Sólida" },
    { time: "12:05:30", action: "Saída Almoço" },
  ]);

  // Live clock for Ponto Eletrônico
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setPontoTime(now.toLocaleTimeString("pt-BR", { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const vendasCatalog = [
    { name: "Licença ERP Pro", price: 299.90, icon: "💻" },
    { name: "Adesão Vectura", price: 199.90, icon: "🛒" },
    { name: "Suporte Premium", price: 99.90, icon: "📞" },
    { name: "Backup de Nuvem", price: 49.90, icon: "💾" },
  ];

  const handleAddVendasCart = (item: { name: string; price: number; icon: string }) => {
    setVendasCart(prev => [...prev, item]);
  };

  const handleFinalizeVendasSale = () => {
    if (vendasCart.length === 0) return;
    const totalAmount = vendasCart.reduce((acc, curr) => acc + curr.price, 0);
    setDemoOrderCount(prev => prev + 1);
    setDemoGmv(prev => prev + totalAmount);
    
    const newOrd = {
      id: `ORD #${Math.floor(Math.random() * 1000) + 4055}`,
      val: `R$ ${totalAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
      status: "Pago"
    };
    setDemoOrdersList(prev => [newOrd, ...prev.slice(0, 2)]);
    setVendasCart([]);
  };

  const handleAdvanceMecFlow = (id: string) => {
    setMecFlowOS(prev => prev.map(os => {
      if (os.id === id) {
        if (os.status === "Pendente") {
          return { ...os, status: "Execução", progress: 50 };
        } else if (os.status === "Execução") {
          return { ...os, status: "Pronto", progress: 100 };
        } else {
          return { ...os, status: "Pendente", progress: 0 };
        }
      }
      return os;
    }));
  };

  const handleCreateMecFlowOS = () => {
    const cars = ["Fiat Uno", "Ford Ka", "VW Gol", "Renault Sandero", "Hyundai HB20"];
    const services = ["Troca de Óleo", "Freios Traseiros", "Geometria", "Farol Queimado", "Injeção Eletrônica"];
    const randomCar = cars[Math.floor(Math.random() * cars.length)];
    const randomService = services[Math.floor(Math.random() * services.length)];
    const randomId = `OS #${Math.floor(Math.random() * 900) + 1050}`;
    const newOS = {
      id: randomId,
      car: randomCar,
      service: randomService,
      status: "Pendente" as const,
      progress: 0
    };
    setMecFlowOS(prev => [newOS, ...prev]);
  };

  const handleBookQuickService = () => {
    const newBooking = {
      id: `OS-Q-${Math.floor(Math.random() * 900) + 100}`,
      type: quickServiceType === "moto" ? "Moto 🏍️" : "Carro 🚗",
      date: quickServiceDate,
      time: quickServiceTime
    };
    setQuickServiceBookings(prev => [newBooking, ...prev]);
  };

  const handleUpdateEstoqueQty = (index: number, delta: number) => {
    setEstoqueItems(prev => prev.map((item, idx) => {
      if (idx === index) {
        return { ...item, qty: Math.max(0, item.qty + delta) };
      }
      return item;
    }));
  };

  const handlePunchPonto = () => {
    const nowStr = pontoTime || new Date().toLocaleTimeString("pt-BR", { hour12: false });
    const lastLog = pontoLogs[0];
    const nextAction = lastLog && lastLog.action.includes("Entrada") ? "Saída Almoço" : "Entrada Sólida";
    const newLog = {
      time: nowStr,
      action: nextAction
    };
    setPontoLogs(prev => [newLog, ...prev]);
  };

  // --- MOCK DATA ---
  const projects: Project[] = [
    {
      id: "pro-1",
      title: "Vectura Vendas 🛒",
      category: "apps",
      tag: "Site com Sistema Integrado",
      client: "Vectura Comercial",
      description: "Site com sistema integrado voltado para lojas que vendem automóveis, acessórios e peças. Contém área de compras com carrinho, cupons e sincronização com a loja, além de painel admin para propostas, recibos/contratos automáticos e WhatsApp integrado.",
      metricLabel: "Média de Clientes Alcançados",
      metricValue: "20 clientes por dia",
      accentText: "Hospedado em Cloud Run estável",
      link: "https://vectura-vendas-ii-177673192884.us-west1.run.app",
      mockUI: {
        title: "Vectura Vendas Portal",
        status: "Ativo: Production",
        actionLabel: "Explorar Vendas"
      }
    },
    {
      id: "pro-2",
      title: "Vectura MecFlow 🧰",
      category: "apps",
      tag: "Gestão Operacional",
      client: "Mecânicas e Oficinas",
      description: "Controle inteligente de ordens de serviço, fluxo de caixa e status de reparo em tempo real para oficinas mecânicas automotivas.",
      metricLabel: "Status do Painel",
      metricValue: "100% Organizado",
      accentText: "Interface responsiva brutalista de alta performance",
      link: "https://vectura-controle-o-s-177673192884.us-west1.run.app",
      mockUI: {
        title: "MecFlow O.S. Dashboard",
        status: "Online: Sincronizado",
        actionLabel: "Ver MecFlow"
      }
    },
    {
      id: "pro-2-b",
      title: "Vectura Quick Service 🏍️",
      category: "apps",
      tag: "Agendamento de Serviços",
      client: "Oficinas de Motos & Carros",
      description: "Agendamento rápido e intuitivo de revisões, trocas de óleo e manutenções preventivas com confirmação direta e automática.",
      metricLabel: "Tempo Médio",
      metricValue: "< 1 Minuto",
      accentText: "Agenda sincronizada em tempo real",
      link: "https://vectura-booking.ai.studio",
      mockUI: {
        title: "Quick Service Booking",
        status: "Ativo: Produção",
        actionLabel: "Ver Quick Service"
      }
    },
    {
      id: "pro-2-c",
      title: "Vectura Controle de Estoque 📦",
      category: "apps",
      tag: "Gestão de Inventário",
      client: "Almoxarifado & Lojas",
      description: "Controle completo e imediato de entradas, saídas, níveis críticos de estoque e emissão inteligente de alertas de reposição de itens.",
      metricLabel: "Precisão de Dados",
      metricValue: "99.9% Exato",
      accentText: "Banco de dados sincronizado e seguro",
      link: "https://vectura-controle-estoque-177673192884.us-west1.run.app",
      mockUI: {
        title: "Controle de Estoque Pro",
        status: "Conectado: Database",
        actionLabel: "Ver Controle de Estoque"
      }
    },
    {
      id: "pro-3",
      title: "Vectura Ponto Eletrônico ⏰",
      category: "apps",
      tag: "Aplicativo de Ponto",
      client: "Controle de Frequência",
      description: "Uma solução prática e segura de ponto digital para equipes externas e internas, com registro ágil de batidas e conformidade total.",
      metricLabel: "Taxa de Segurança",
      metricValue: "Integração Segura",
      accentText: "Banco de dados sincronizado em tempo real",
      link: "https://vectura-ponto-eletronico-177673192884.us-west1.run.app/",
      mockUI: {
        title: "Ponto Eletrônico Mobile",
        status: "Sucesso de Carga",
        actionLabel: "Abrir Ponto Eletrônico"
      }
    },
    {
      id: "pro-4",
      title: "Franklin Motos",
      category: "media",
      tag: "Posicionamento / Instagram",
      client: "Franklin Motos",
      description: "Estratégia completa de mídias sociais no Instagram para fortalecimento do branding de oficina de moto-mecanica e showroom do nicho automobilístico.",
      metricLabel: "Engajamento Instagram",
      metricValue: "Alta Retenção",
      accentText: "Roteiros focados em conversão direta",
      link: "https://www.instagram.com/franklin.motos/",
      mockUI: {
        title: "Instagram Insights Tracker",
        status: "Distribuição ativa",
        actionLabel: "Abrir Perfil Franklin Motos"
      }
    },
    {
      id: "pro-4-b",
      title: "FutCearense",
      category: "media",
      tag: "Posts & Edição de Vídeo",
      client: "FutCearense",
      description: "Criação de posts e edições de vídeo com foco em dinamismo, engajamento esportivo e retenção de audiência no Instagram.",
      metricLabel: "Escopo de Entrega",
      metricValue: "Posts & Vídeos",
      accentText: "Criação de posts e edições de vídeo",
      link: "https://www.instagram.com/futcearense/",
      mockUI: {
        title: "Instagram Media Engine",
        status: "Produção ativa",
        actionLabel: "Abrir Perfil FutCearense"
      }
    },
    {
      id: "pro-4-c",
      title: "Marcão da Ema",
      category: "media",
      tag: "Coordenação de Campanha",
      client: "Marcão da Ema",
      description: "Período eleitoral de 5 de agosto até 04 de outubro, coordenação completa de campanha.",
      metricLabel: "Período Eleitoral",
      metricValue: "05/Ago a 04/Out",
      accentText: "Coordenação completa de campanha",
      link: "https://www.instagram.com/marcaodaema/",
      mockUI: {
        title: "Campaign Media Command",
        status: "Campanha concluída",
        actionLabel: "Abrir Perfil Marcão da Ema"
      }
    },
    {
      id: "pro-4-d",
      title: "Novo Jovem CE",
      category: "media",
      tag: "Posts & Copywriting",
      client: "Novo Jovem CE",
      description: "Criação de posts e organização do copy para fortalecimento da comunicação e engajamento estratégico no Instagram.",
      metricLabel: "Escopo de Entrega",
      metricValue: "Posts & Copy",
      accentText: "Criação de posts e organização do copy",
      link: "https://www.instagram.com/novojovem.ce/",
      mockUI: {
        title: "Social Copy & Design",
        status: "Distribuição ativa",
        actionLabel: "Abrir Perfil Novo Jovem CE"
      }
    },
    {
      id: "pro-5",
      title: "LZ Consult",
      category: "content",
      tag: "Mídias & Conteúdo Estratégico",
      client: "LZ Consult",
      description: "Direcionamento criativo, copywriting persuasivo e esteira de conteúdo qualificado focado em atrair leads de alto nível para serviços de consultoria.",
      metricLabel: "Autoridade Digital",
      metricValue: "Leads Qualificados",
      accentText: "Comunicação assertiva e brutalista",
      link: "https://www.instagram.com/lz.consult/",
      mockUI: {
        title: "Consulting Content Engine",
        status: "98% engajamento qualificado",
        actionLabel: "Ver Perfil LZ Consult"
      }
    },
    {
      id: "pro-6",
      title: "Vozão Cast",
      category: "content",
      tag: "Produção de Podcasts",
      client: "Transmissão Esportiva",
      description: "Cortes cirúrgicos e distribuição brutal de vídeos de entretenimento sobre futebol no Instagram. Audiência apaixonada impulsionando visibilidade.",
      metricLabel: "Alcance Orgânico",
      metricValue: "+ Viral",
      accentText: "Roteirização dinâmica de cortes de podcasts",
      link: "https://www.instagram.com/vozaocast_/",
      mockUI: {
        title: "Video Broadcast Cuts Engine",
        status: "Campanhas de vídeo ativas",
        actionLabel: "Visitar Vozão Cast"
      }
    }
  ];

  const plans: Plan[] = [
    {
      id: "start",
      name: "Start",
      price: 139.70,
      setupPrice: 281.00,
      description: "Solução inicial para novos negócios. Site com sistema de vendas integrado + presença digital.",
      features: [
        "🛒 Vectura Vendas (Site + Sistema)",
        "🌐 Gestão básica de Redes Sociais (1 post/sem)",
        "📁 Organização mensal de mídias inclusa",
        "💬 Suporte em horário comercial via WhatsApp",
        "🔧 Manutenção de software inclusa"
      ],
      recommended: false,
    },
    {
      id: "padrao",
      name: "Padrão",
      price: 319.60,
      setupPrice: 605.00,
      description: "Operação robusta e automatizada com site de vendas, controle de ponto, mídias e painéis de gestão.",
      features: [
        "🛒 Vectura Vendas (Site + Sistema)",
        "⏰ Vectura Ponto Eletrônico (Funcionários)",
        "🌐 Redes: 3 Posts + 1 Vídeo gravado/semana",
        "🎨 Identidade Visual Completa (Setup)",
        "⚡ Suporte prioritário 24/7 com resposta express",
        "🔧 Manutenção de software inclusa"
      ],
      recommended: true,
    },
    {
      id: "advanced",
      name: "Personalizado",
      price: 0,
      description: "Monte o plano ideal para sua empresa. Escolha softwares, mídias e identidade visual.",
      features: [
        "🧱 Criação de Apps de Gestão sob medida",
        "⚙️ Configure posts e vídeos semanais",
        "🎨 Criação de identidade visual & renovação do Insta",
        "📁 Organização mensal de mídias inclusa",
        "🔧 Manutenção e atualizações transparentes"
      ],
      recommended: false,
    }
  ];



  const handleSelectPlan = (planId: "start" | "padrao" | "advanced") => {
    setSelectedPlan(planId);
    if (planId === "start") {
      setCustomApps({
        appPersonalizado: false,
        vendas: true,
        mecflow: false,
        estoque: true,
        quickService: false,
        pontoEletronico: false,
      });
      setCustomPostsPerWeek(1);
      setCustomVideosPerWeek(0);
      setCustomVisualIdentity(false);
    } else if (planId === "padrao") {
      setCustomApps({
        appPersonalizado: false,
        vendas: true,
        mecflow: false,
        estoque: false,
        quickService: false,
        pontoEletronico: true,
      });
      setCustomPostsPerWeek(3);
      setCustomVideosPerWeek(1);
      setCustomVisualIdentity(true);
    }
  };

  const faqs = [
    {
      q: "O APP PERSONALIZADO É FEITO CONFORME MEU GOSTO?",
      a: "Sim, absolutamente! Desenvolvemos o aplicativo sob medida para atender perfeitamente às regras de negócio, fluxos de trabalho e identidade visual da sua empresa. Nosso processo inclui um alinhamento detalhado do design e das funcionalidades para garantir que o resultado final seja exatamente como você deseja e precisa."
    },
    {
      q: "Como funciona a entrega dos aplicativos de gestão?",
      a: "Nós desenvolvemos interfaces funcionais em React, Tailwind e Node de acordo com sua operação atual. Seja para controle de estoque, comissões de vendedores ou pipeline de leads. Entregamos o app rodando sem que você precise entender de código."
    },
    {
      q: "Posso alterar as frentes contratadas em cada plano?",
      a: "Sim! Se em um determinado mês você precisar de mais foco em Desenvolvimento de Software e menos em Mídias Sociais, o plano Padrão permite o remanejamento amigável de horas e recursos. Sem multas administrativas."
    },
    {
      q: "Como é feita a ponte com o WhatsApp no final?",
      a: "Oferecemos total transparência. Ao escolher o plano e selecionar os opcionais no nosso simulador, nosso sistema monta um link dinâmico pronto. Você clica, cai no nosso WhatsApp comercial e já começa o onboarding no mesmo dia."
    }
  ];

  // --- DYNAMIC CALCULATIONS ---
  const getAccentBg = () => {
    if (accent === "purple") return "bg-[#7C3AED] text-white";
    if (accent === "green") return "bg-[#22C55E] text-black border-black";
    return "bg-[#FACC15] text-black border-black";
  };

  const getAccentBorderClass = () => {
    if (accent === "purple") return "border-[#7C3AED]";
    if (accent === "green") return "border-[#22C55E]";
    return "border-[#FACC15]";
  };

  const getAccentTextClass = () => {
    if (accent === "purple") return "text-[#7C3AED]";
    if (accent === "green") return "text-[#16A34A]";
    return "text-[#D97706]";
  };

  const getAccentBadgeBg = () => {
    if (accent === "purple") return "bg-[#F5F3FF] text-[#7C3AED] border-[#7C3AED]";
    if (accent === "green") return "bg-[#F0FDF4] text-[#16A34A] border-[#22C55E]";
    return "bg-[#FEFCE8] text-[#D97706] border-[#FACC15]";
  };

  const getAccentShadowClass = () => {
    if (accent === "purple") return "shadow-[6px_6px_0px_#7C3AED]";
    if (accent === "green") return "shadow-[6px_6px_0px_#22C55E]";
    return "shadow-[6px_6px_0px_#FACC15]";
  };

  const getAccentShadowSmallClass = () => {
    if (accent === "purple") return "shadow-[4px_4px_0px_#7C3AED]";
    if (accent === "green") return "shadow-[4px_4px_0px_#22C55E]";
    return "shadow-[4px_4px_0px_#FACC15]";
  };

  const getSimuladorActiveClasses = () => {
    if (!isInSimulador) return "bg-white border-black text-black";
    if (accent === "purple") return "bg-[#0A080E] border-[#7C3AED] shadow-[0_0_60px_rgba(124,58,237,0.25)] text-white";
    if (accent === "green") return "bg-[#080E09] border-[#22C55E] shadow-[0_0_60px_rgba(34,197,94,0.25)] text-white";
    return "bg-[#0E0D08] border-[#FACC15] shadow-[0_0_60px_rgba(250,204,21,0.25)] text-white";
  };

  // Custom Plan specific calculations
  const getCustomPlanMonthlyPrice = () => {
    let price = 0;

    // Monthly fees for the systems
    if (customApps.vendas) price += 39.90; // Vectura Vendas: R$ 39,90/mês
    if (customApps.mecflow) price += 49.90; // Vectura Mecflow: R$ 49,90/mês
    if (customApps.estoque) price += 49.90; // Vectura Estoque: R$ 49,90/mês
    if (customApps.quickService) price += 49.90; // Vectura Quick Service: R$ 49,90/mês
    if (customApps.pontoEletronico) price += 49.90; // Vectura Ponto Eletrônico: R$ 49,90/mês
    if (customApps.appPersonalizado) price += 49.90; // App Personalizado: R$ 49,90/mês

    // Social media posts
    if (customPostsPerWeek === 1) price += 49.90;
    else if (customPostsPerWeek === 2) price += 89.90;
    else if (customPostsPerWeek === 3) price += 129.90;
    else if (customPostsPerWeek === 4) price += 169.90;
    else if (customPostsPerWeek === 5) price += 199.90;

    // Social media videos
    if (customVideosPerWeek === 1) price += 149.90;
    else if (customVideosPerWeek === 2) price += 269.90;
    else if (customVideosPerWeek === 3) price += 374.90;

    return parseFloat(price.toFixed(2));
  };

  const getCustomPlanOneTimePrice = () => {
    let price = 0;
    
    // One-time Setup/Adesão fees for the systems (increased by 8% rounded)
    if (customApps.appPersonalizado) price += 499.90;
    if (customApps.vendas) price += 216.00;
    
    // Other systems have an Adesão/Setup fee of R$ 65,00 (one-time, increased from R$ 59,90)
    if (customApps.mecflow) price += 65.00;
    if (customApps.estoque) price += 65.00;
    if (customApps.quickService) price += 65.00;
    if (customApps.pontoEletronico) price += 65.00;

    if (customVisualIdentity) price += 399.90;
    return parseFloat(price.toFixed(2));
  };

  // Calculate pricing based on plan + addons
  const getActivePlanOneTimePrice = () => {
    if (selectedPlan === "start") {
      return couponApplied ? 252.90 : 281.00;
    }
    if (selectedPlan === "padrao") {
      return couponApplied ? 544.50 : 605.00;
    }
    // "advanced" (Personalizado)
    const basePrice = getCustomPlanOneTimePrice();
    return couponApplied ? parseFloat((basePrice * 0.9).toFixed(2)) : basePrice;
  };

  const getActivePlanMonthlyPrice = () => {
    if (selectedPlan === "start") {
      return couponApplied ? 125.73 : 139.70;
    }
    if (selectedPlan === "padrao") {
      return couponApplied ? 287.64 : 319.60;
    }
    // "advanced" (Personalizado)
    const basePrice = getCustomPlanMonthlyPrice();
    return couponApplied ? parseFloat((basePrice * 0.9).toFixed(2)) : basePrice;
  };

  const getActivePlanPrice = () => {
    return getActivePlanMonthlyPrice();
  };

  const getWhatsappMessageDraft = () => {
    const basePlan = plans.find(p => p.id === selectedPlan);
    if (!basePlan) return "";

    const planLabel = selectedPlan === "start" ? "Start 🚀" : selectedPlan === "padrao" ? "Padrão ⭐" : "Personalizado / Sob Medida 🛠️";
    let messageText = `Olá Vectura! Visitei o site e escolhi o *PLANO ${planLabel}*.\n\n`;

    if (selectedPlan === "start") {
      messageText += `*Escopo do Plano Start:*\n`;
      messageText += `- Sistema de Vendas PDV (Manutenção inclusa)\n`;
      messageText += `- Controle de Estoque Local integrado\n`;
      messageText += `- 1 Post Semanal Estratégico nas redes sociais\n`;
      messageText += `- Suporte premium em horário comercial\n`;
    } else if (selectedPlan === "padrao") {
      messageText += `*Escopo do Plano Padrão:*\n`;
      messageText += `- Sistema de Vendas PDV & Gestão Integrada\n`;
      messageText += `- Vectura Ponto Eletrônico integrado\n`;
      messageText += `- Gestão de Redes Sociais: 3 Posts + 1 Vídeo por semana\n`;
      messageText += `- Identidade Visual Completa & Renovação de Instagram\n`;
      messageText += `- Suporte Comercial estendido\n`;
    } else {
      // Advanced
      messageText += `*Escopo do Plano Personalizado:*\n`;
      const selectedAppsList = [];
      if (customApps.appPersonalizado) selectedAppsList.push("- Criação de App Personalizado (Adesão + R$ 49,90/mês)");
      if (customApps.vendas) selectedAppsList.push("- Vectura Vendas PDV (Adesão + R$ 39,90/mês)");
      if (customApps.mecflow) selectedAppsList.push("- Vectura MecFlow (Adesão + R$ 49,90/mês)");
      if (customApps.estoque) selectedAppsList.push("- Vectura Controle de Estoque (Adesão + R$ 49,90/mês)");
      if (customApps.quickService) selectedAppsList.push("- Vectura Quick Service (Adesão + R$ 49,90/mês)");
      if (customApps.pontoEletronico) selectedAppsList.push("- Vectura Ponto Eletrônico (Adesão + R$ 49,90/mês)");

      if (selectedAppsList.length > 0) {
        messageText += `*Softwares Selecionados:*\n${selectedAppsList.join("\n")}\n`;
      }

      const selectedMediaList = [];
      if (customPostsPerWeek > 0) selectedMediaList.push(`- Gestão de Redes: ${customPostsPerWeek} posts/semana`);
      if (customVideosPerWeek > 0) selectedMediaList.push(`- Gestão de Redes: ${customVideosPerWeek} vídeos/semana`);
      if (customVisualIdentity) selectedMediaList.push("- Identidade Visual & Renovação de Instagram");

      if (selectedMediaList.length > 0) {
        messageText += `*Mídias & Redes Selecionadas:*\n${selectedMediaList.join("\n")}\n`;
      }
    }

    const oneTimeTotal = getActivePlanOneTimePrice();
    const monthlyTotal = getActivePlanMonthlyPrice();

    messageText += `\n*Investimento Previsto:*`;
    messageText += `\n- Setup / Pagamento Único: R$ ${oneTimeTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
    messageText += `\n- Mensalidade Recorrente: R$ ${monthlyTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/mês`;
    
    if (couponApplied) {
      messageText += `\n_(Cupom VECTURA10 de 10% de desconto aplicado com sucesso!)_`;
    }

    messageText += `\n\nGostaria de iniciar o alinhamento de escopo e liberação do acesso!`;
    return messageText;
  };

  const getCustomWhatsappLink = () => {
    return `https://wa.me/5585986828425?text=${encodeURIComponent(getWhatsappMessageDraft())}`;
  };

  // Handle sales simulator logic
  const handleSimularVenda = () => {
    const saleVal = (Math.random() * 250 + 20).toFixed(2);
    setDemoOrderCount(prev => prev + 1);
    setDemoGmv(prev => prev + parseFloat(saleVal));
    
    const newOrd = { 
      id: `ORD #${Math.floor(Math.random() * 1000) + 4055}`, 
      val: `R$ ${saleVal.replace(".", ",")}`, 
      status: "Pago" 
    };
    setDemoOrdersList(prev => [newOrd, ...prev.slice(0, 2)]);
  };

  // Filter projects
  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="bg-[#FAF9F6] text-[#000000] font-sans min-h-screen selection:bg-black selection:text-white pb-12 transition-colors duration-300">
      
      {/* --- SCROLL PROGRESS BAR --- */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-black/10 z-[100] pointer-events-none">
        <div 
          className={`h-full transition-all duration-75 ${
            accent === "purple" ? "bg-[#7C3AED]" : accent === "green" ? "bg-[#22C55E]" : "bg-[#FACC15]"
          }`}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Discount Coupon Popup */}
      <AnimatePresence>
        {showCouponPopup && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 left-6 z-[100] max-w-sm border-4 border-black bg-[#0E0D12] text-white p-4 shadow-[6px_6px_0px_#22C55E] font-mono text-xs rounded-none"
          >
            <div className="flex justify-between items-start gap-4 mb-2">
              <div className="flex items-center gap-2 text-[#22C55E]">
                <Sparkles className="w-4 h-4 text-[#22C55E]" />
                <span className="font-bold uppercase tracking-wider text-[10px]">CUPOM EXCLUSIVO ATIVO!</span>
              </div>
              <button 
                onClick={() => setShowCouponPopup(false)}
                className="text-neutral-400 hover:text-white font-bold text-sm bg-neutral-800 hover:bg-neutral-700 w-5 h-5 flex items-center justify-center border border-neutral-600 cursor-pointer"
              >
                ×
              </button>
            </div>
            <p className="text-neutral-300 leading-tight text-[11px] font-sans mb-3">
              Garantimos <strong className="text-[#22C55E]">10% DE DESCONTO EM TODOS OS PLANOS</strong> com o cupom <strong className="text-[#22C55E]">VECTURA10</strong>!
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setCouponApplied(true);
                  setShowCouponPopup(false);
                  setAnimateCheckout(true);
                  setTimeout(() => setAnimateCheckout(false), 2200);
                  const targetEl = document.getElementById("whatsapp-checkout-area");
                  if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
                }}
                className={`flex-1 py-1 px-3 font-bold border border-black text-[10px] uppercase text-black font-mono transition-all ${
                  couponApplied ? "bg-[#22C55E] cursor-default" : "bg-[#FACC15] hover:bg-[#E2B90F] cursor-pointer"
                }`}
                disabled={couponApplied}
              >
                {couponApplied ? "✓ Desconto de 10% Aplicado!" : "🎟️ Resgatar Desconto de 10%"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* --- NAVBAR --- */}
      <header className="sticky top-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-md border-b-4 border-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 group">
            <div className={`w-8 h-8 border-2 border-black flex items-center justify-center font-black transition-all ${getAccentBg()} shadow-[2px_2px_0px_#000000]`}>
              V
            </div>
            <span className="font-display font-black text-2xl tracking-tighter hover:skew-x-1 transition-transform">
              VECTURA<span className={getAccentTextClass()}>.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-sm">
            <a href="#pilares" className="px-4 py-2 hover:bg-black hover:text-[#FAF9F6] border border-transparent hover:border-black transition-all duration-155">
              / pilares
            </a>
            <a href="#portfolio" className="px-4 py-2 hover:bg-black hover:text-[#FAF9F6] border border-transparent hover:border-black transition-all duration-155">
              / cases
            </a>
            <a href="#simulador" className="px-4 py-2 hover:bg-black hover:text-[#FAF9F6] border border-transparent hover:border-black transition-all duration-155">
              / simulador-preços
            </a>
            <a href="#faq" className="px-4 py-2 hover:bg-black hover:text-[#FAF9F6] border border-transparent hover:border-black transition-all duration-155">
              / faq
            </a>
          </nav>

          {/* Nav Action */}
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5 bg-neutral-100 border-2 border-black p-1 shadow-[2px_2px_0px_rgba(0,0,0,0.15)] rounded-none">
              <button 
                id="accent-purple"
                onClick={() => setAccent("purple")}
                className={`w-3.5 h-3.5 rounded-full cursor-pointer transition-transform ${accent === "purple" ? "bg-[#7C3AED] scale-125 ring-1 ring-black" : "bg-[#7C3AED]/60 hover:scale-110"}`}
                title="Neon Purple"
              />
              <button 
                id="accent-green"
                onClick={() => setAccent("green")}
                className={`w-3.5 h-3.5 rounded-full cursor-pointer transition-transform ${accent === "green" ? "bg-[#22C55E] scale-125 ring-1 ring-black" : "bg-[#22C55E]/60 hover:scale-110"}`}
                title="High-Volt Green"
              />
              <button 
                id="accent-yellow"
                onClick={() => setAccent("yellow")}
                className={`w-3.5 h-3.5 rounded-full cursor-pointer transition-transform ${accent === "yellow" ? "bg-[#FACC15] scale-125 ring-1 ring-black" : "bg-[#FACC15]/60 hover:scale-110"}`}
                title="Volt Yellow"
              />
            </div>
            <a 
              id="nav-cta"
              href="#simulador" 
              className={`px-4 py-2 font-mono text-xs md:text-sm font-bold border-2 border-black shadow-[3px_3px_0px_#000000] hover:shadow-[1px_1px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-1.5 ${getAccentBg()}`}
            >
              FALE CONOSCO <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-8 md:pt-16 gap-8">
        
        {/* --- HERO SECTION --- */}
        <section className="mb-20 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Side: Headline & Copy */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              <div className="inline-flex">
                <span className="font-mono text-xs font-black uppercase tracking-[0.15em] border-2 border-black bg-black text-white px-3 py-1.5 shadow-[2px_2px_0px_rgba(0,0,0,0.15)] flex items-center gap-1.5 italic">
                  <Zap className="w-3.5 h-3.5 fill-current" /> Sólido. Eficiente. Sem Enrolação.
                </span>
              </div>

              <motion.h1 
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="font-sans font-[900] text-5xl md:text-7xl lg:text-8xl leading-[1.25] md:leading-[1.15] tracking-tighter uppercase"
              >
                VECTURA<span className="text-black font-black">.</span>
                <br />
                <span className="text-black">
                  APPS DE <span className="bg-[#7C3AED] text-white px-4 py-1 inline-block border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-200 leading-none">GESTÃO</span>, <br />
                  <span className="bg-[#7C3AED] text-white px-4 py-1 inline-block border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-200 leading-none">MÍDIAS</span> &amp; <span className="bg-[#7C3AED] text-white px-4 py-1 inline-block border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-200 leading-none">CONTEÚDO</span>.
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                className={`text-base md:text-lg font-bold max-w-2xl border-l-4 ${getAccentBorderClass()} pl-4 uppercase text-neutral-900`}
              >
                Transformamos sua operação e marketing com brutalidade estratégica. Menos enrolação, mais conversão.
              </motion.p>

              {/* Dynamic CTA interaction with accent state */}
              <div className="flex flex-wrap gap-4 mt-4">
                <a 
                  id="hero-cta-main"
                  href="#simulador"
                  className={`px-8 py-4 text-base md:text-lg font-bold border-4 border-black shadow-[6px_6px_0px_#000000] hover:shadow-[2px_2px_0px_#000000] hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center gap-2 ${getAccentBg()}`}
                >
                  SIMULAR MEU PLANO <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </a>
                
                <a 
                  id="hero-cta-secondary"
                  href="#portfolio"
                  className="px-8 py-4 text-base md:text-lg font-bold border-4 border-black bg-white hover:bg-black hover:text-white shadow-[6px_6px_0px_#000000] hover:shadow-[2px_2px_0px_#000000] hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center gap-2"
                >
                  VER CASES <span className="font-mono">/&gt;</span>
                </a>
              </div>



            </div>

            {/* Right Side: Brutalist Interactive Widget (Vectura Live Simulator replaced with Portfolio Apps Previewer, now replaced with Plans Demonstrative Card) */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="border-4 border-black bg-white p-5 md:p-6 shadow-[8px_8px_0px_#000000] relative rounded-sm group min-h-[580px] flex flex-col justify-between">
                <div>
                  <div className="absolute top-0 right-0 -mr-1 -mt-1 bg-rose-500 text-white px-2.5 py-1 text-[10px] font-mono border-l-2 border-b-2 border-black uppercase tracking-wider font-bold animate-pulse">
                    ⚡ 40% OFF ATIVO
                  </div>

                  <div className="flex items-center gap-2 border-b-2 border-black pb-4 mb-4 font-mono text-xs">
                    <span className="inline-block w-3.5 h-3.5 rounded-full bg-red-500 border border-black" />
                    <span className="inline-block w-3.5 h-3.5 rounded-full bg-yellow-400 border border-black" />
                    <span className="inline-block w-3.5 h-3.5 rounded-full bg-green-500 border border-black" />
                    <span className="text-neutral-500 font-bold ml-2">vectura-oferta-especial.sh</span>
                  </div>

                  {/* High-Converting Sales Pitch */}
                  <div className="space-y-4 mb-6">
                    <h3 className="font-display font-black text-xl uppercase tracking-tight text-black leading-tight">
                      🚀 ACELERE SUA EMPRESA AGORA
                    </h3>
                    <p className="text-xs text-neutral-700 leading-relaxed font-semibold">
                      Escolha um dos nossos planos de aceleração digital abaixo. Automatize sua gestão com nossos softwares e impulsione seu faturamento com mídias sociais que de fato geram clientes.
                    </p>

                    {/* Simple high-converting card options */}
                    <div className="space-y-3">
                      {/* Plan Start row card */}
                      <div className="border-2 border-black p-3.5 bg-neutral-50 hover:bg-neutral-100/50 transition-colors flex flex-col justify-between gap-2.5 relative">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[9px] font-mono font-black text-neutral-400 uppercase">[ PLANO START ]</span>
                            <h4 className="font-sans font-black text-sm uppercase text-black">VECTURA START 🚀</h4>
                          </div>
                          <div className="text-right leading-none">
                            {couponApplied ? (
                              <>
                                <span className="text-[9px] line-through text-red-500 block font-bold">R$ 139,70/mês</span>
                                <span className="text-sm font-black text-[#22C55E] font-mono">R$ 125,73/mês</span>
                              </>
                            ) : (
                              <>
                                <span className="text-[9px] line-through text-neutral-400 block font-bold">De R$ 232,80/mês</span>
                                <span className="text-sm font-black text-[#7C3AED] font-mono">R$ 139,70/mês</span>
                              </>
                            )}
                          </div>
                        </div>
                        <p className="text-[10px] text-neutral-600 font-medium leading-tight">
                          Ideal para estruturar e validar processes. Site com Vendas PDV + Estoque Local + 1 Post Semanal Estratégico.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPlan("start");
                            setAnimateCheckout(true);
                            setTimeout(() => setAnimateCheckout(false), 2200);
                            const targetEl = document.getElementById("nossos-planos") || document.getElementById("whatsapp-checkout-area");
                            if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
                          }}
                          className={`w-full py-2 font-mono text-[10px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[1px_1px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer text-center ${getAccentBg()}`}
                        >
                          Selecionar Plano Start &amp; Ir para WhatsApp →
                        </button>
                      </div>

                      {/* Plan Padrão row card */}
                      <div className="border-2 border-black p-3.5 bg-[#FFFDF5] hover:bg-amber-50/50 transition-colors flex flex-col justify-between gap-2.5 relative">
                        <div className="absolute -top-2.5 right-4 bg-black text-white text-[8px] font-mono font-black uppercase px-2 py-0.5 border border-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,0.15)]">
                          ⭐ Mais Vendido
                        </div>
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[9px] font-mono font-black text-amber-600 uppercase">[ PLANO PADRÃO ]</span>
                            <h4 className="font-sans font-black text-sm uppercase text-black">VECTURA PADRÃO ⭐</h4>
                          </div>
                          <div className="text-right leading-none">
                            {couponApplied ? (
                              <>
                                <span className="text-[9px] line-through text-red-500 block font-bold">R$ 319,60/mês</span>
                                <span className="text-sm font-black text-[#22C55E] font-mono">R$ 287,64/mês</span>
                              </>
                            ) : (
                              <>
                                <span className="text-[9px] line-through text-neutral-400 block font-bold">De R$ 532,60/mês</span>
                                <span className="text-sm font-black text-rose-600 font-mono">R$ 319,60/mês</span>
                              </>
                            )}
                          </div>
                        </div>
                        <p className="text-[10px] text-neutral-600 font-medium leading-tight">
                          Operação completa e otimizada. Vendas PDV + Ponto Eletrônico + Redes (3 Posts + 1 Vídeo/Semana) + Identidade Visual completa.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPlan("padrao");
                            setAnimateCheckout(true);
                            setTimeout(() => setAnimateCheckout(false), 2200);
                            const targetEl = document.getElementById("nossos-planos") || document.getElementById("whatsapp-checkout-area");
                            if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="w-full py-2 font-mono text-[10px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[1px_1px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer text-center bg-black text-white hover:bg-neutral-800"
                        >
                          Selecionar Plano Padrão &amp; Ir para WhatsApp →
                        </button>
                      </div>

                      {/* Plan Personalizado row card */}
                      <div className="border-2 border-black p-3.5 bg-neutral-900 text-white hover:bg-neutral-850 transition-all flex flex-col justify-between gap-2.5 relative">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[9px] font-mono font-black text-neutral-400 uppercase">[ PERSONALIZADO ]</span>
                            <h4 className="font-sans font-black text-sm uppercase text-white">SOB MEDIDA 🛠️</h4>
                          </div>
                          <div className="text-right leading-none">
                            <span className="text-xs font-black text-green-400 font-mono">SOB CONSULTA</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-neutral-300 font-medium leading-tight">
                          Monte o setup perfeito para o seu negócio. Customize aplicativos, quantidade de posts semanais e frentes de suporte.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPlan("advanced");
                            const targetEl = document.getElementById("personalizacao-simulador") || document.getElementById("nossos-planos");
                            if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="w-full py-2 font-mono text-[10px] font-black uppercase border-2 border-white text-black bg-white hover:bg-neutral-100 shadow-[2px_2px_0px_rgba(255,255,255,0.2)] hover:shadow-[1px_1px_0px_rgba(255,255,255,0.2)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer text-center"
                        >
                          Configurar Escopo Personalizado →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Trust Badge */}
                <div className="bg-amber-50 border-2 border-black p-3 text-[10px] text-neutral-800 rounded-xs font-mono flex gap-2 items-start mt-2">
                  <span className="text-xs">🔒</span>
                  <p className="leading-tight font-semibold">
                    <strong>Garantia de Onboarding:</strong> Todos os planos incluem implementação guiada, suporte premium no WhatsApp e manutenções contínuas transparentes.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* --- PILARES SERVICES SECTION --- */}
        <section id="pilares" className="mb-24 scroll-mt-24">
          <div className="border-b-4 border-black pb-4 mb-12">
            <div className="text-xs font-black uppercase tracking-[0.2em] mb-3 bg-black text-white inline-block px-2.5 py-1.5 self-start italic shadow-[2px_2px_0px_rgba(0,0,0,0.15)]">
              Nossos Segmentos De Impacto
            </div>
            <h2 className="font-sans font-[900] text-3xl md:text-5xl lg:text-6xl tracking-tight uppercase leading-[0.95] mt-1 text-black">
              SEU NEGÓCIO EM TRÊS PILARES INABALÁVEIS.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pillar 1: Apps */}
            <div className={`border-4 border-black bg-white p-8 shadow-[6px_6px_0px_#050505] hover:translate-y-[-2px] hover:${getAccentShadowClass()} transition-all duration-200 flex flex-col justify-between rounded-none`}>
              <div>
                <div className="w-14 h-14 border-2 border-black bg-black text-white flex items-center justify-center mb-6 shadow-[3px_3px_0px_#7C3AED] rounded-none font-black">
                  <Smartphone className="w-7 h-7" />
                </div>
                <h3 className="font-sans font-[900] text-2xl uppercase mb-3 text-black leading-none tracking-tight">
                  1. APLICATIVOS DE GESTÃO
                </h3>
                <p className="text-neutral-700 text-sm md:text-base leading-relaxed mb-6 font-bold uppercase text-[11px] tracking-wide">
                  Sistemas e painéis administrativos responsivos, desenvolvidos sob medida para organizar o estoque, automatizar processos manuais confusos e acelerar seu faturamento offline ou digital.
                </p>
              </div>
              <ul className="space-y-2 border-t border-dashed border-neutral-300 pt-6 font-mono text-xs text-neutral-600">
                <li className="flex items-center gap-2 font-bold text-[11px] uppercase">
                  <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> Cloud Run & Server Interno Veloz
                </li>
                <li className="flex items-center gap-2 font-bold text-[11px] uppercase">
                  <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> Layouts UX focados na velocidade
                </li>
                <li className="flex items-center gap-2 font-bold text-[11px] uppercase">
                  <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> Integração com APIs externas
                </li>
              </ul>
            </div>

            {/* Pillar 2: Social Media */}
            <div className={`border-4 border-black bg-white p-8 shadow-[6px_6px_0px_#050505] hover:translate-y-[-2px] hover:${getAccentShadowClass()} transition-all duration-200 flex flex-col justify-between rounded-none`}>
              <div>
                <div className="w-14 h-14 border-2 border-black bg-black text-white flex items-center justify-center mb-6 shadow-[3px_3px_0px_#22C55E] rounded-none font-black">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <h3 className="font-sans font-[900] text-2xl uppercase mb-3 text-black leading-none tracking-tight">
                  2. MÍDIAS SOCIAIS
                </h3>
                <p className="text-neutral-700 text-sm md:text-base leading-relaxed mb-6 font-bold uppercase text-[11px] tracking-wide">
                  Gestão estratégica das principais redes com metodologia estruturada. Do roteiro de vídeos rápidos à curadoria minuciosa que consolida sua empresa como referência absoluta do nicho.
                </p>
              </div>
              <ul className="space-y-2 border-t border-dashed border-neutral-300 pt-6 font-mono text-xs text-neutral-600">
                <li className="flex items-center gap-2 font-bold text-[11px] uppercase">
                  <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> Criação ativa de narrativas virais
                </li>
                <li className="flex items-center gap-2 font-bold text-[11px] uppercase">
                  <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> Distribuição otimizada multicanal
                </li>
                <li className="flex items-center gap-2 font-bold text-[11px] uppercase">
                  <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> Monitoramento analítico de leads
                </li>
              </ul>
            </div>

            {/* Pillar 3: Content */}
            <div className={`border-4 border-black bg-white p-8 shadow-[6px_6px_0px_#050505] hover:translate-y-[-2px] hover:${getAccentShadowClass()} transition-all duration-200 flex flex-col justify-between rounded-none`}>
              <div>
                <div className="w-14 h-14 border-2 border-black bg-black text-white flex items-center justify-center mb-6 shadow-[3px_3px_0px_#FACC15] rounded-none font-black">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="font-sans font-[900] text-2xl uppercase mb-3 text-black leading-none tracking-tight">
                  3. CONTEÚDO ESTRATÉGICO
                </h3>
                <p className="text-neutral-700 text-sm md:text-base leading-relaxed mb-6 font-bold uppercase text-[11px] tracking-wide">
                  Produção focada em reter atenção real. Criamos copys magnéticas para páginas, newsletters densas de alta taxa de abertura e campanhas diretas de e-mail voltadas à captação em massa.
                </p>
              </div>
              <ul className="space-y-2 border-t border-dashed border-neutral-300 pt-6 font-mono text-xs text-neutral-600">
                <li className="flex items-center gap-2 font-bold text-[11px] uppercase">
                  <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> Copywriting persuasivo validado
                </li>
                <li className="flex items-center gap-2 font-bold text-[11px] uppercase">
                  <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> Roteirização de vídeos de retenção
                </li>
                <li className="flex items-center gap-2 font-bold text-[11px] uppercase">
                  <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> Automação de réguas de e-mails
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* --- PORTFOLIO & CASES SECTION --- */}
        <section id="portfolio" className="mb-24 scroll-mt-24">
          <div className="border-b-4 border-black pb-4 mb-8">
            <div className="text-xs font-black uppercase tracking-[0.2em] mb-3 bg-black text-white inline-block px-2.5 py-1.5 self-start italic shadow-[2px_2px_0px_rgba(0,0,0,0.15)]">
              Portfolio Selecionado
            </div>
            <h2 className="font-sans font-[900] text-3xl md:text-5xl tracking-tight uppercase">
              EXEMPLOS DE PROJETOS E CASES.
            </h2>
          </div>

          <div className="space-y-4">
            {/* Category 1: Apps */}
            <div className="border-4 border-black bg-white shadow-[4px_4px_0px_#000000] overflow-hidden">
              <button
                onClick={() => setExpandedCategories(prev => ({ ...prev, apps: !prev.apps }))}
                className="w-full bg-black text-white p-5 font-display font-black text-left flex justify-between items-center hover:bg-neutral-900 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">💻</span>
                  <span className="tracking-wider uppercase text-sm md:text-base">Sistemas & Aplicativos de Gestão ({projects.filter(p => p.category === "apps").length})</span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expandedCategories.apps ? "rotate-180 text-[#7C3AED]" : "text-white"}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {expandedCategories.apps && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-neutral-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-t-2 border-black">
                      {projects.filter(p => p.category === "apps").map((project) => (
                        <div
                          key={project.id}
                          className={`border-2 border-black bg-white p-5 shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:${getAccentShadowSmallClass()} transition-all flex flex-col justify-between rounded-none`}
                        >
                          <div>
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-[10px] text-neutral-500 font-mono font-bold uppercase tracking-wider bg-neutral-100 px-2 py-0.5 border border-neutral-300">
                                {project.client}
                              </span>
                              <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase">{project.tag}</span>
                            </div>

                            <h3 className="font-sans font-[900] text-lg uppercase mb-1.5 tracking-tight leading-tight text-black">
                              {project.title}
                            </h3>
                            <p className="text-neutral-600 text-[11px] mb-4 font-semibold uppercase tracking-wide leading-relaxed line-clamp-2">
                              {project.description}
                            </p>

                            <div className="bg-neutral-50 border border-black p-2.5 font-mono mb-4 text-center">
                              <span className="text-[9px] text-neutral-500 block uppercase font-bold leading-none mb-1">{project.metricLabel}</span>
                              <strong className={`text-base font-black ${getAccentTextClass()}`}>{project.metricValue}</strong>
                            </div>
                          </div>

                          <a
                            id={`live-case-link-${project.id}`}
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className={`w-full py-2.5 font-bold border-2 border-black text-[11px] font-mono tracking-wider uppercase transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${getAccentBg()} shadow-[3px_3px_0px_#000000] hover:shadow-[0px_0px_0px_#000000] hover:translate-x-[3px] hover:translate-y-[3px]`}
                          >
                            Acessar Case <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Category 2: Media */}
            <div className="border-4 border-black bg-white shadow-[4px_4px_0px_#000000] overflow-hidden">
              <button
                onClick={() => setExpandedCategories(prev => ({ ...prev, media: !prev.media }))}
                className="w-full bg-black text-white p-5 font-display font-black text-left flex justify-between items-center hover:bg-neutral-900 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">📈</span>
                  <span className="tracking-wider uppercase text-sm md:text-base">Mídias Sociais & Instagram ({projects.filter(p => p.category === "media").length})</span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expandedCategories.media ? "rotate-180 text-[#7C3AED]" : "text-white"}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {expandedCategories.media && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-neutral-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-t-2 border-black">
                      {projects.filter(p => p.category === "media").map((project) => (
                        <div
                          key={project.id}
                          className={`border-2 border-black bg-white p-5 shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:${getAccentShadowSmallClass()} transition-all flex flex-col justify-between rounded-none`}
                        >
                          <div>
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-[10px] text-neutral-500 font-mono font-bold uppercase tracking-wider bg-neutral-100 px-2 py-0.5 border border-neutral-300">
                                {project.client}
                              </span>
                              <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase">{project.tag}</span>
                            </div>

                            <h3 className="font-sans font-[900] text-lg uppercase mb-1.5 tracking-tight leading-tight text-black">
                              {project.title}
                            </h3>
                            <p className="text-neutral-600 text-[11px] mb-4 font-semibold uppercase tracking-wide leading-relaxed line-clamp-2">
                              {project.description}
                            </p>

                            <div className="bg-neutral-50 border border-black p-2.5 font-mono mb-4 text-center">
                              <span className="text-[9px] text-neutral-500 block uppercase font-bold leading-none mb-1">{project.metricLabel}</span>
                              <strong className={`text-base font-black ${getAccentTextClass()}`}>{project.metricValue}</strong>
                            </div>
                          </div>

                          <a
                            id={`live-case-link-${project.id}`}
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className={`w-full py-2.5 font-bold border-2 border-black text-[11px] font-mono tracking-wider uppercase transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${getAccentBg()} shadow-[3px_3px_0px_#000000] hover:shadow-[0px_0px_0px_#000000] hover:translate-x-[3px] hover:translate-y-[3px]`}
                          >
                            Acessar Case <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Category 3: Content */}
            <div className="border-4 border-black bg-white shadow-[4px_4px_0px_#000000] overflow-hidden">
              <button
                onClick={() => setExpandedCategories(prev => ({ ...prev, content: !prev.content }))}
                className="w-full bg-black text-white p-5 font-display font-black text-left flex justify-between items-center hover:bg-neutral-900 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">✍️</span>
                  <span className="tracking-wider uppercase text-sm md:text-base">Conteúdo Estratégico & Copywriting ({projects.filter(p => p.category === "content").length})</span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expandedCategories.content ? "rotate-180 text-[#7C3AED]" : "text-white"}`} />
              </button>
              
              <AnimatePresence initial={false}>
                {expandedCategories.content && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-neutral-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-t-2 border-black">
                      {projects.filter(p => p.category === "content").map((project) => (
                        <div
                          key={project.id}
                          className={`border-2 border-black bg-white p-5 shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:${getAccentShadowSmallClass()} transition-all flex flex-col justify-between rounded-none`}
                        >
                          <div>
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-[10px] text-neutral-500 font-mono font-bold uppercase tracking-wider bg-neutral-100 px-2 py-0.5 border border-neutral-300">
                                {project.client}
                              </span>
                              <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase">{project.tag}</span>
                            </div>

                            <h3 className="font-sans font-[900] text-lg uppercase mb-1.5 tracking-tight leading-tight text-black">
                              {project.title}
                            </h3>
                            <p className="text-neutral-600 text-[11px] mb-4 font-semibold uppercase tracking-wide leading-relaxed line-clamp-2">
                              {project.description}
                            </p>

                            <div className="bg-neutral-50 border border-black p-2.5 font-mono mb-4 text-center">
                              <span className="text-[9px] text-neutral-500 block uppercase font-bold leading-none mb-1">{project.metricLabel}</span>
                              <strong className={`text-base font-black ${getAccentTextClass()}`}>{project.metricValue}</strong>
                            </div>
                          </div>

                          <a
                            id={`live-case-link-${project.id}`}
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className={`w-full py-2.5 font-bold border-2 border-black text-[11px] font-mono tracking-wider uppercase transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${getAccentBg()} shadow-[3px_3px_0px_#000000] hover:shadow-[0px_0px_0px_#000000] hover:translate-x-[3px] hover:translate-y-[3px]`}
                          >
                            Acessar Case <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

          {/* Interactive Modal simulation for Cases */}
          <AnimatePresence>
            {selectedProject && (
              <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 50, scale: 0.95 }}
                  className="bg-[#FAF9F6] border-4 border-black p-6 md:p-8 max-w-2xl w-full shadow-[8px_8px_0px_#000000] relative rounded-xs"
                >
                  <button 
                    id="close-modal-btn"
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 bg-white border-2 border-black w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  <div className="flex gap-2 items-center mb-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#7C3AED] font-black">
                      [ CASO ATIVO ]
                    </span>
                    <span className="text-xs text-neutral-400">•</span>
                    <span className="font-mono text-xs uppercase text-neutral-600 font-bold">
                      {selectedProject.client}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-3xl md:text-4xl uppercase mb-3 text-black">
                    {selectedProject.title}
                  </h3>

                  <p className="text-base text-neutral-800 font-medium mb-6 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="border-2 border-black bg-white p-4">
                      <span className="font-mono text-xs text-neutral-400 uppercase font-black">{selectedProject.metricLabel}</span>
                      <p className="text-2xl font-black text-black">{selectedProject.metricValue}</p>
                    </div>
                    <div className="border-2 border-black bg-white p-4">
                      <span className="font-mono text-xs text-neutral-400 uppercase font-black">Nota Técnica</span>
                      <p className="text-sm font-mono mt-1 font-bold text-neutral-700">{selectedProject.accentText}</p>
                    </div>
                  </div>

                  {/* Mock live panel widget inside modal */}
                  <div className="border-2 border-black bg-black text-[#58A6FF] font-mono p-4 mb-6 rounded-xs text-xs">
                    <div className="flex justify-between items-center text-[10px] text-neutral-400 border-b border-neutral-800 pb-2 mb-3">
                      <span>{selectedProject.mockUI.title}</span>
                      <span className="text-[#66FF66]">{selectedProject.mockUI.status}</span>
                    </div>

                    <div className="space-y-2 mb-4 text-[#F0F6FC]">
                      <p className="text-[11px] text-neutral-400 font-bold uppercase">&gt; CONTROLE OPERACIONAL SIMULADO:</p>
                      <div className="bg-neutral-900 p-2.5 border border-neutral-800 flex justify-between items-center">
                        <span>Fator de Conversão de Cliques</span>
                        <span className="text-green-400 font-black">+14.2%</span>
                      </div>
                      <div className="bg-neutral-900 p-2.5 border border-neutral-800 flex justify-between items-center">
                        <span>Tempo de Carga do Site (FCP)</span>
                        <span className="text-green-400 font-black">350ms</span>
                      </div>
                    </div>

                    {/* Open real portfolio link */}
                    <a
                      id="modal-interactive-action"
                      href={selectedProject.link}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-[#1F6FEB] hover:bg-[#388BFD] text-white py-2.5 font-bold font-sans tracking-wide uppercase transition-colors rounded-xs border border-blue-900 text-center block"
                    >
                      {selectedProject.mockUI.actionLabel}
                    </a>
                  </div>

                  <div className="flex items-center justify-between border-t-2 border-slate-200 pt-5">
                    <span className="text-xs text-neutral-500 font-mono">ID: {selectedProject.id}</span>
                    <a
                      id="modal-wh-redirect"
                      href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(`Olá, gostei do case ${selectedProject.title} e gostaria de desenvolver algo no mesmo formato para a minha empresa.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className={`px-5 py-2.5 font-bold border-2 border-black shadow-[3px_3px_0px_#000000] hover:shadow-[1px_1px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center gap-1.5 ${getAccentBg()}`}
                    >
                      Conversar no WhatsApp <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                </motion.div>
              </div>
            )}
          </AnimatePresence>

        {/* --- DYNAMIC PRICING SIMULATOR (WHATSAPP BUILDER) --- */}
        <section 
          id="simulador" 
          className={`mb-24 scroll-mt-24 p-6 md:p-10 border-4 transition-all duration-700 ease-in-out rounded-none relative overflow-hidden
            ${getSimuladorActiveClasses()}`}
        >
          {/* Subtle animated light beams inside when simulator is active to 'hold' customer focus */}
          {isInSimulador && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.06)_0,transparent_50%)] animate-[spin_40s_linear_infinite]" />
              <div className="absolute -top-10 left-10 w-24 h-24 bg-[#7C3AED]/20 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 right-10 w-32 h-32 bg-purple-900/10 blur-3xl rounded-full" />
            </div>
          )}

          <div className={`border-b-4 pb-4 mb-8 transition-colors duration-500 ${isInSimulador ? "border-neutral-800" : "border-black"}`}>
            <span className={`font-mono text-sm uppercase tracking-widest font-bold block transition-colors duration-500 ${isInSimulador ? "text-neutral-400" : "text-neutral-500"}`}>
              // INVESTIMENTO CONSCIENTE
            </span>
            <h2 className={`font-display font-black text-3xl md:text-5xl tracking-tight uppercase transition-colors duration-500 ${isInSimulador ? "text-white" : "text-black"}`}>
              PLANOS DE ACELERAÇÃO & OFERTAS.
            </h2>
          </div>

          {/* REDESIGNED #builder-area (TOP COMMERCIAL CONVERSION BANNER) */}
          <div 
            id="builder-area" 
            className={`border-4 border-black bg-white text-black shadow-[8px_8px_0px_#000000] hover:${getAccentShadowClass()} transition-all duration-300 relative rounded-none p-6 md:p-8 mb-12 scroll-mt-24 z-10`}
          >
            {/* Top Badge alert */}
            <div className="absolute -top-3.5 left-6 bg-red-600 text-white font-mono text-[10px] font-black uppercase tracking-wider px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000000] animate-pulse">
              🔥 Oferta Comercial Limitada
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Direct Call-to-Action Sales Copy */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <h3 className="font-sans font-[900] text-2xl md:text-3xl uppercase tracking-tight text-black">
                  🚀 ELEVE O NÍVEL DA SUA OPERAÇÃO HOJE
                </h3>
                <p className="text-neutral-700 text-sm md:text-base leading-relaxed font-semibold">
                  A Vectura desenvolve aplicativos de gestão sob medida de altíssima performance para organizar sua empresa, integrados com campanhas de posicionamento e mídias sociais que de fato convertem em vendas.
                </p>

                {/* Elegant commercial list of benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-sans font-bold text-xs text-neutral-800">
                  <div className="flex items-center gap-2">
                    <span className="text-[#22C55E] text-base font-black">✓</span> Onboarding no mesmo dia
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#22C55E] text-base font-black">✓</span> Zero burocracia ou taxas ocultas
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#22C55E] text-base font-black">✓</span> Apps 100% responsivos e seguros
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#22C55E] text-base font-black">✓</span> Suporte humanizado via WhatsApp
                  </div>
                </div>
              </div>

              {/* Right Column: Coupon Box & Commercial Action Buttons */}
              <div className="lg:col-span-5 border-4 border-black bg-neutral-50 p-6 shadow-[4px_4px_0px_#000000] flex flex-col justify-between h-full relative">
                
                {/* Micro coupon box */}
                <div className="border-2 border-dashed border-black p-3.5 bg-amber-50 mb-5 relative overflow-hidden flex flex-col items-center text-center text-black">
                  <span className="font-mono text-[9px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">CUPOM DE DESCONTO</span>
                  <strong 
                    onClick={() => {
                      if (!couponApplied) {
                        setCouponApplied(true);
                        setShowCouponPopup(false);
                      }
                    }}
                    className="font-mono text-lg font-black tracking-widest text-[#7C3AED] uppercase bg-white border border-black px-3 py-1 shadow-[2px_2px_0px_#000000] mb-2 select-all cursor-pointer hover:bg-neutral-50 transition-colors" 
                    title="Clique para aplicar"
                  >
                    VECTURA10
                  </strong>
                  
                  {couponApplied ? (
                    <span className="font-mono text-[10px] text-green-600 font-extrabold flex items-center gap-1">
                      ✅ DESCONTO DE 10% ATIVADO NA TABELA!
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setCouponApplied(true);
                        setShowCouponPopup(false);
                      }}
                      className="px-3 py-1 font-mono text-[10px] font-black uppercase text-black bg-[#22C55E] border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[1px_1px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
                    >
                      🎟️ Ativar Cupom
                    </button>
                  )}
                </div>

                {/* Direct quick action sales buttons */}
                <div className="space-y-3">
                  <span className="font-mono text-[9px] text-neutral-400 font-bold uppercase tracking-wider block text-center">SELECIONE SEU PLANO DE ACELERAÇÃO:</span>
                  
                  <button
                    onClick={() => {
                      handleSelectPlan("start");
                      const targetEl = document.getElementById("nossos-planos");
                      if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-3 px-4 border-2 border-black font-display font-black text-xs uppercase tracking-wider text-left flex justify-between items-center transition-all bg-white text-black hover:bg-neutral-100 shadow-[2px_2px_0px_#000000] hover:shadow-[1px_1px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
                  >
                    <span>🛒 PLANO START</span>
                    <span className="font-mono text-[11px] font-bold bg-[#FAF9F6] border border-black px-1.5 py-0.5 text-neutral-600">
                      R$ {couponApplied ? "125,73" : "139,70"}/mês
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      handleSelectPlan("padrao");
                      const targetEl = document.getElementById("nossos-planos");
                      if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`w-full py-3 px-4 border-2 border-black font-display font-black text-xs uppercase tracking-wider text-left flex justify-between items-center transition-all shadow-[2px_2px_0px_#000000] hover:shadow-[1px_1px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer ${getAccentBg()}`}
                  >
                    <span>⭐ PLANO PADRÃO</span>
                    <span className="font-mono text-[11px] font-bold bg-black text-white px-1.5 py-0.5">
                      R$ {couponApplied ? "287,64" : "319,60"}/mês
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      handleSelectPlan("advanced");
                      const targetEl = document.getElementById("nossos-planos");
                      if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-3 px-4 border-2 border-black font-display font-black text-xs uppercase tracking-wider text-left flex justify-between items-center transition-all bg-neutral-900 text-white hover:bg-neutral-800 shadow-[2px_2px_0px_#000000] hover:shadow-[1px_1px_0px_#000000] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
                  >
                    <span>⚙️ PERSONALIZADO</span>
                    <span className="font-mono text-[10px] font-bold bg-white text-black px-1.5 py-0.5">
                      SOB MEDIDA
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div id="nossos-planos" className="border-t-4 border-dashed border-neutral-700/50 my-16 scroll-mt-24" />

          {/* Heading for pre-configured plans cards (Lá embaixo) */}
          <div className="mb-8 text-center relative z-10">
            <span className="font-mono text-xs text-neutral-400 uppercase font-black">
              // DETALHES DOS PLANOS
            </span>
            <h3 className={`font-display font-black text-2xl md:text-3xl uppercase tracking-tight ${isInSimulador ? "text-white" : "text-black"}`}>
              ESCOLHA SEU PLANO DE ACELERAÇÃO
            </h3>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12 relative z-10">
            {plans.map((p) => {
              const originalPrice = p.price;
              const originalSetup = p.setupPrice;
              const hasDiscount = couponApplied && originalPrice > 0;
              const currentPrice = hasDiscount ? originalPrice * 0.9 : originalPrice;
              const currentSetup = hasDiscount && originalSetup ? originalSetup * 0.9 : originalSetup;

              return (
                <div
                  key={p.id}
                  className={`border-4 p-8 flex flex-col justify-between relative rounded-none transition-all duration-500
                    ${isInSimulador 
                      ? "bg-[#110E16] border-neutral-800 text-white shadow-[6px_6px_0px_rgba(255,255,255,0.04)]" 
                      : "bg-white border-black text-black shadow-[6px_6px_0px_#000000]"
                    }
                    ${p.recommended && isInSimulador 
                      ? `scale-100 lg:scale-[1.03] z-10 !border-[#7C3AED] !shadow-[0_0_30px_rgba(124,58,237,0.4)]` 
                      : p.recommended 
                      ? `scale-100 lg:scale-[1.03] z-10 ${getAccentShadowClass()}` 
                      : ""
                    }
                  `}
                >
                  {p.recommended && (
                    <div className={`absolute top-0 right-6 -translate-y-1/2 px-4 py-1.5 border-2 border-black font-mono text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_#000000] ${getAccentBg()}`}>
                      ★★ Recomendado ★★
                    </div>
                  )}

                  <div className="text-left">
                    <span className={`font-mono text-[10px] uppercase font-black block tracking-widest mb-1 ${isInSimulador ? "text-purple-400" : "text-neutral-400"}`}>
                      [ PLANO {p.name.toUpperCase()} ]
                    </span>
                    <h3 className={`font-sans font-[900] text-3xl mb-1 uppercase leading-none tracking-tight ${isInSimulador ? "text-white" : "text-black"}`}>
                      {p.name}
                    </h3>
                    <p className={`text-sm mb-6 min-h-[40px] font-bold leading-normal uppercase text-[11px] tracking-wide mt-2 ${isInSimulador ? "text-neutral-400" : "text-neutral-600"}`}>
                      {p.description}
                    </p>

                    <div className={`border-t-2 border-b-2 py-4 mb-6 flex items-center justify-between px-2 transition-colors duration-500
                      ${isInSimulador ? "border-neutral-800 bg-[#191522]" : "border-black bg-neutral-50"}`}>
                      <span className="font-mono text-xs text-neutral-400 uppercase font-black">Investimento</span>
                      <div className="text-right">
                        {p.id === "advanced" ? (
                          <p className={`text-xl font-mono font-black uppercase ${isInSimulador ? "text-white" : "text-black"}`}>
                            Sob Medida
                            <span className="text-[9px] uppercase text-neutral-400 block font-bold mt-1 leading-none">Alinhamento de escopo</span>
                          </p>
                        ) : (
                          <>
                            {originalSetup && (
                              <span className="text-[10px] text-neutral-400 font-mono block font-bold">
                                Setup:{" "}
                                {hasDiscount ? (
                                  <>
                                    <span className="line-through mr-1 text-neutral-400">R$ {originalSetup.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                                    <strong className="text-green-500">R$ {currentSetup!.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
                                  </>
                                ) : (
                                  `R$ ${originalSetup.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
                                )}{" "}
                                (Único)
                              </span>
                            )}
                            <div className="flex flex-col items-end">
                              {hasDiscount && (
                                <span className="text-[10px] text-neutral-400 font-mono line-through block font-bold leading-none mb-1">
                                  R$ {originalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/mês
                                </span>
                              )}
                              <p className={`text-2xl font-mono font-black ${getAccentTextClass()}`}>
                                R$ {currentPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                <span className="text-[10px] uppercase text-neutral-400 inline font-bold ml-1">/mês</span>
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {p.features.map((feature, i) => (
                        <li key={i} className={`flex items-start gap-2.5 text-sm font-medium leading-tight ${isInSimulador ? "text-neutral-300" : "text-neutral-800"}`}>
                          <span className={`mt-0.5 w-4 h-4 shrink-0 rounded-full border border-black flex items-center justify-center font-bold text-[10px] ${p.recommended ? getAccentBg() : "bg-neutral-200 text-black"}`}>
                            ✔
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`pt-4 border-t border-dashed ${isInSimulador ? "border-neutral-800" : "border-neutral-200"}`}>
                    <button
                      id={`active-plan-select-${p.id}`}
                      onClick={() => {
                        handleSelectPlan(p.id);
                        const targetEl = document.getElementById("personalizacao-simulador");
                        if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`w-full py-4 font-bold border-2 border-black shadow-[4px_4px_0px_#000000] hover:shadow-[1px_1px_0px_#000000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all uppercase cursor-pointer text-sm
                        ${selectedPlan === p.id 
                          ? getAccentBg() 
                          : isInSimulador 
                          ? "bg-neutral-800 text-white hover:bg-neutral-700"
                          : "bg-white text-black hover:bg-neutral-100"
                        }`}
                    >
                      {selectedPlan === p.id ? "✓ Plano Selecionado" : "Selecionar Plano"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>



          {/* SIMULADOR DE CONTRATO INTELIGENTE */}
          <AnimatePresence>
            {true && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                id="personalizacao-simulador"
                className="overflow-hidden scroll-mt-24 mb-12"
              >
                <div>
            <h3 className="font-sans font-[900] text-3xl uppercase tracking-tight mb-4 flex items-center gap-2">
              🧱 SIMULADOR DE CONTRATO INTELIGENTE
            </h3>
            <p className="text-white text-sm md:text-base max-w-2xl mb-8 font-medium" style={{ color: '#ffffff' }}>
              Ajuste as opções complementares abaixo para obter o link customizado definitivo do WhatsApp. Nenhuma negociação será engessada.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Settings inputs */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                
                {/* 1. Base Plan Selector Row */}
                <div>
                  <label className="font-mono text-xs font-bold uppercase text-neutral-500 block mb-2">
                    ETAPA 1: SELECIONE O PLANO BASE
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {plans.map(p => (
                      <button
                        id={`builder-plan-${p.id}`}
                        key={p.id}
                        type="button"
                        onClick={() => handleSelectPlan(p.id)}
                        className={`py-3 px-2 border-2 border-black font-display font-bold text-sm uppercase transition-all rounded-xs cursor-pointer
                          ${selectedPlan === p.id 
                            ? getAccentBg() 
                            : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700"}`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Custom Configurator (Active Only for Personalized) */}
                <div className={selectedPlan === "advanced" ? "block" : "hidden"}>
                  <div className="bg-[#7C3AED] text-white font-mono text-[11px] font-black uppercase p-3 border-2 border-black mb-6 flex items-center justify-between shadow-[3px_3px_0px_#000000]">
                    <span>⚙️ MODO CUSTOMIZAÇÃO ATIVO</span>
                    <span className="text-[9px] bg-black text-white px-2 py-0.5 border border-white font-sans font-bold">Configure abaixo</span>
                  </div>
                  <div className="space-y-6">
                      {/* Software & Apps Options */}
                      <div>
                        <label className="font-mono text-xs font-bold uppercase text-neutral-500 block mb-3">
                          ETAPA 2: ESCOLHA OS SOFTWARES & APPS (SISTEMAS E ADESÃO)
                        </label>
                        <div className="flex flex-col gap-3">
                          
                          <label className="p-3 border-2 border-black flex items-start justify-between bg-neutral-50 select-none cursor-pointer hover:bg-neutral-100 transition-colors">
                            <div className="flex items-start gap-3">
                              <input
                                id="custom-app-personalizado"
                                type="checkbox"
                                className="w-5 h-5 accent-black cursor-pointer mt-1 shrink-0"
                                checked={customApps.appPersonalizado}
                                onChange={(e) => setCustomApps(prev => ({ ...prev, appPersonalizado: e.target.checked }))}
                              />
                              <div>
                                <strong className="text-sm font-bold text-black uppercase font-display block">Criação de App Personalizado</strong>
                                <span className="text-xs text-neutral-500 block leading-tight">App sob demanda desenvolvido sob medida para as necessidades do seu negócio.</span>
                                <span className="text-[10px] text-[#7C3AED] font-bold block mt-1">+ R$ 49,90/mês para atualizações e manutenção</span>
                              </div>
                            </div>
                            <span className={`font-mono font-bold text-xs md:text-sm border-2 px-2 py-0.5 shrink-0 ml-2 shadow-[2px_2px_0px_#000000] transition-colors ${getAccentBadgeBg()}`}>R$ 499,90 (Único)</span>
                          </label>

                          <label className="p-3 border-2 border-black flex items-start justify-between bg-neutral-50 select-none cursor-pointer hover:bg-neutral-100 transition-colors">
                            <div className="flex items-start gap-3">
                              <input
                                id="custom-app-vendas"
                                type="checkbox"
                                className="w-5 h-5 accent-black cursor-pointer mt-1 shrink-0"
                                checked={customApps.vendas}
                                onChange={(e) => setCustomApps(prev => ({ ...prev, vendas: e.target.checked }))}
                              />
                              <div>
                                <strong className="text-sm font-bold text-black uppercase font-display block">Vectura Vendas (Site + Sistema)</strong>
                                <span className="text-xs text-neutral-500 block leading-tight">Site completo com sistema de gestão de vendas integrado para veículos, acessórios e autopeças. Área de compras com carrinho e cupons para clientes, mais área admin para propostas de veículos, recibos e contratos automáticos.</span>
                                <span className="text-[10px] text-[#7C3AED] font-bold block mt-1">+ R$ 39,90/mês para atualizações e manutenção</span>
                              </div>
                            </div>
                            <span className={`font-mono font-bold text-xs md:text-sm border-2 px-2 py-0.5 shrink-0 ml-2 shadow-[2px_2px_0px_#000000] transition-colors ${getAccentBadgeBg()}`}>R$ 216,00 (Único)</span>
                          </label>

                          <label className="p-3 border-2 border-black flex items-start justify-between bg-neutral-50 select-none cursor-pointer hover:bg-neutral-100 transition-colors">
                            <div className="flex items-start gap-3">
                              <input
                                id="custom-app-mecflow"
                                type="checkbox"
                                className="w-5 h-5 accent-black cursor-pointer mt-1 shrink-0"
                                checked={customApps.mecflow}
                                onChange={(e) => setCustomApps(prev => ({ ...prev, mecflow: e.target.checked }))}
                              />
                              <div>
                                <strong className="text-sm font-bold text-black uppercase font-display block">Vectura Mecflow</strong>
                                <span className="text-xs text-neutral-500 block leading-tight">Controle avançado de ordens de serviço e fluxo operacional de oficinas.</span>
                                <span className="text-[10px] text-[#7C3AED] font-bold block mt-1">+ R$ 49,90/mês para mensalidade e licença</span>
                              </div>
                            </div>
                            <span className={`font-mono font-bold text-xs md:text-sm border-2 px-2 py-0.5 shrink-0 ml-2 shadow-[2px_2px_0px_#000000] transition-colors ${getAccentBadgeBg()}`}>R$ 65,00 (Adesão)</span>
                          </label>

                          <label className="p-3 border-2 border-black flex items-start justify-between bg-neutral-50 select-none cursor-pointer hover:bg-neutral-100 transition-colors">
                            <div className="flex items-start gap-3">
                              <input
                                id="custom-app-estoque"
                                type="checkbox"
                                className="w-5 h-5 accent-black cursor-pointer mt-1 shrink-0"
                                checked={customApps.estoque}
                                onChange={(e) => setCustomApps(prev => ({ ...prev, estoque: e.target.checked }))}
                              />
                              <div>
                                <strong className="text-sm font-bold text-black uppercase font-display block">Vectura Estoque</strong>
                                <span className="text-xs text-neutral-500 block leading-tight">Gestão inteligente de estoque de peças, entradas, saídas e alertas de falta.</span>
                                <span className="text-[10px] text-[#7C3AED] font-bold block mt-1">+ R$ 49,90/mês para mensalidade e licença</span>
                              </div>
                            </div>
                            <span className={`font-mono font-bold text-xs md:text-sm border-2 px-2 py-0.5 shrink-0 ml-2 shadow-[2px_2px_0px_#000000] transition-colors ${getAccentBadgeBg()}`}>R$ 65,00 (Adesão)</span>
                          </label>

                          <label className="p-3 border-2 border-black flex items-start justify-between bg-neutral-50 select-none cursor-pointer hover:bg-neutral-100 transition-colors">
                            <div className="flex items-start gap-3">
                              <input
                                id="custom-app-quickservice"
                                type="checkbox"
                                className="w-5 h-5 accent-black cursor-pointer mt-1 shrink-0"
                                checked={customApps.quickService}
                                onChange={(e) => setCustomApps(prev => ({ ...prev, quickService: e.target.checked }))}
                              />
                              <div>
                                <strong className="text-sm font-bold text-black uppercase font-display block">Vectura Quick Service</strong>
                                <span className="text-xs text-neutral-500 block leading-tight">Agendamento digitalizado de revisões mecânicas e serviços rápidos de rotina.</span>
                                <span className="text-[10px] text-[#7C3AED] font-bold block mt-1">+ R$ 49,90/mês para mensalidade e licença</span>
                              </div>
                            </div>
                            <span className={`font-mono font-bold text-xs md:text-sm border-2 px-2 py-0.5 shrink-0 ml-2 shadow-[2px_2px_0px_#000000] transition-colors ${getAccentBadgeBg()}`}>R$ 65,00 (Adesão)</span>
                          </label>

                          <label className="p-3 border-2 border-black flex items-start justify-between bg-neutral-50 select-none cursor-pointer hover:bg-neutral-100 transition-colors">
                            <div className="flex items-start gap-3">
                              <input
                                id="custom-app-pontoeletronico"
                                type="checkbox"
                                className="w-5 h-5 accent-black cursor-pointer mt-1 shrink-0"
                                checked={customApps.pontoEletronico}
                                onChange={(e) => setCustomApps(prev => ({ ...prev, pontoEletronico: e.target.checked }))}
                              />
                              <div>
                                <strong className="text-sm font-bold text-black uppercase font-display block">Vectura Ponto Eletrônico</strong>
                                <span className="text-xs text-neutral-500 block leading-tight">Registro de ponto seguro para colaboradores com folha de ponto em formato digital.</span>
                                <span className="text-[10px] text-[#7C3AED] font-bold block mt-1">+ R$ 49,90/mês para mensalidade e licença</span>
                              </div>
                            </div>
                            <span className={`font-mono font-bold text-xs md:text-sm border-2 px-2 py-0.5 shrink-0 ml-2 shadow-[2px_2px_0px_#000000] transition-colors ${getAccentBadgeBg()}`}>R$ 65,00 (Adesão)</span>
                          </label>

                        </div>
                      </div>

                      {/* Social Media Selector Options */}
                      <div className="border-t border-black pt-4">
                        <label className="font-mono text-xs font-bold uppercase text-neutral-500 block mb-3">
                          ETAPA 3: GESTÃO DE REDES SOCIAIS (ORGANIZAÇÃO MENSAL INCLUSA)
                        </label>
                        
                        <div className="space-y-4">
                          {/* Posts Slider */}
                          <div className="p-4 border-2 border-black bg-neutral-50">
                            <div className="flex justify-between items-center mb-2">
                              <div>
                                <span className="font-display font-black text-sm uppercase text-black block">Publicações Semanais (Posts)</span>
                                <span className="text-xs text-neutral-500">Imagens estáticas ou carrosséis com artes e roteiros inclusos.</span>
                              </div>
                              <span className="font-mono font-bold text-sm bg-white border-2 border-black px-3 py-1 text-[#7C3AED]">
                                {customPostsPerWeek === 0 
                                  ? "Nenhum" 
                                  : `R$ ${customPostsPerWeek === 1 ? "49,90" : customPostsPerWeek === 2 ? "89,90" : customPostsPerWeek === 3 ? "129,90" : customPostsPerWeek === 4 ? "169,90" : "199,90"}/mês`}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mt-3">
                              <span className="font-mono text-xs font-bold text-neutral-500">0</span>
                              <input
                                id="posts-week-slider"
                                type="range"
                                min="0"
                                max="5"
                                step="1"
                                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
                                value={customPostsPerWeek}
                                onChange={(e) => setCustomPostsPerWeek(parseInt(e.target.value))}
                              />
                              <span className="font-mono text-sm font-black bg-black text-white px-2 py-0.5 shrink-0 w-24 text-center">
                                {customPostsPerWeek === 0 ? "Sem posts" : `${customPostsPerWeek} post${customPostsPerWeek > 1 ? "s" : ""}/sem`}
                              </span>
                            </div>
                          </div>

                          {/* Videos Slider */}
                          <div className="p-4 border-2 border-black bg-neutral-50">
                            <div className="flex justify-between items-center mb-2">
                              <div>
                                <span className="font-display font-black text-sm uppercase text-black block">Vídeos Semanais (Reels / Shorts)</span>
                                <span className="text-xs text-neutral-500">Vídeos curtos gravados, roteirizados, editados e sonorizados.</span>
                              </div>
                              <span className="font-mono font-bold text-sm bg-white border-2 border-black px-3 py-1 text-[#7C3AED]">
                                {customVideosPerWeek === 0 
                                  ? "Nenhum" 
                                  : `R$ ${customVideosPerWeek === 1 ? "149,90" : customVideosPerWeek === 2 ? "269,90" : "374,90"}/mês`}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mt-3">
                              <span className="font-mono text-xs font-bold text-neutral-500">0</span>
                              <input
                                id="videos-week-slider"
                                type="range"
                                min="0"
                                max="3"
                                step="1"
                                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
                                value={customVideosPerWeek}
                                onChange={(e) => setCustomVideosPerWeek(parseInt(e.target.value))}
                              />
                              <span className="font-mono text-sm font-black bg-black text-white px-2 py-0.5 shrink-0 w-24 text-center">
                                {customVideosPerWeek === 0 ? "Sem vídeos" : `${customVideosPerWeek} vídeo${customVideosPerWeek > 1 ? "s" : ""}/sem`}
                              </span>
                            </div>
                          </div>

                          {/* Brand identity Checkbox */}
                          <label className="p-3 border-2 border-black flex items-start justify-between bg-neutral-50 select-none cursor-pointer hover:bg-neutral-100 transition-colors mt-2">
                            <div className="flex items-start gap-3">
                              <input
                                id="custom-brand-identity"
                                type="checkbox"
                                className="w-5 h-5 accent-black cursor-pointer mt-1 shrink-0"
                                checked={customVisualIdentity}
                                onChange={(e) => setCustomVisualIdentity(e.target.checked)}
                              />
                              <div>
                                <strong className="text-sm font-bold text-black uppercase font-display block">Identidade Visual & Renovação de Instagram</strong>
                                <span className="text-xs text-neutral-500 block leading-tight">Design de logotipo completo, manual de paleta de cores e reestruturação estratégica da bio e feed.</span>
                              </div>
                            </div>
                            <span className={`font-mono font-bold text-xs md:text-sm border-2 px-2 py-0.5 shrink-0 ml-2 shadow-[2px_2px_0px_#000000] transition-colors ${getAccentBadgeBg()}`}>R$ 399,90 (Único)</span>
                          </label>

                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Standard Plan Details & Benefits */}
                  {selectedPlan !== "advanced" && (
                    <div className="space-y-6 text-black mt-4">
                      <div className={`p-4 border-2 border-black ${selectedPlan === "start" ? "bg-emerald-50/70" : "bg-purple-50/70"} shadow-[3px_3px_0px_#000000]`}>
                        <span className="font-mono text-[9px] uppercase font-black text-neutral-500 block mb-1">PLANO {selectedPlan === "start" ? "START" : "PADRÃO"} ATIVO</span>
                        <h4 className="font-display font-black text-lg md:text-xl uppercase tracking-tight text-neutral-900 leading-tight">
                          {selectedPlan === "start" ? "🚀 VECTURA START: Perfeito para Validar e Crescer" : "⭐ VECTURA PADRÃO: Máxima Automação e Presença"}
                        </h4>
                        <p className="text-xs text-neutral-700 leading-relaxed font-semibold mt-1.5">
                          {selectedPlan === "start" 
                            ? "Um pacote cirúrgico desenhado para negócios locais estruturarem suas vendas, organizarem estoque e marcarem presença estratégica nas mídias de forma extremamente econômica."
                            : "A solução completa definitiva para empresas que buscam automação robusta de vendas, controle total de equipe e forte presença semanal com mídias e vídeos de alta conversão."}
                        </p>
                      </div>

                      {/* Benefícios detalhados */}
                      <div>
                        <label className="font-mono text-xs font-bold uppercase text-neutral-500 block mb-3 font-black">
                          💡 DETALHES DOS BENEFÍCIOS INCLUSOS NO PACOTE
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedPlan === "start" ? (
                            <>
                              <div className="p-3 border-2 border-black bg-white shadow-[2px_2px_0px_#000000]">
                                <span className="text-xl">💻</span>
                                <h5 className="font-display font-bold text-xs uppercase text-neutral-900 mt-1">Vectura Vendas (Site + Sistema)</h5>
                                <p className="text-[11px] text-neutral-600 font-semibold leading-normal mt-1">
                                  Site completo integrado com gestão de vendas de veículos, acessórios e autopeças. Área de compras com carrinho e cupons para clientes, mais área admin para propostas, recibos e contratos automáticos.
                                </p>
                              </div>
                              <div className="p-3 border-2 border-black bg-white shadow-[2px_2px_0px_#000000]">
                                <span className="text-xl">🎨</span>
                                <h5 className="font-display font-bold text-xs uppercase text-neutral-900 mt-1">1 Post Semanal Estratégico</h5>
                                <p className="text-[11px] text-neutral-600 font-semibold leading-normal mt-1">
                                  Design profissional de artes estáticas ou carrossel de alta qualidade com legenda e roteiro prontos, focados na captação imediata de novos clientes.
                                </p>
                              </div>
                              <div className="p-3 border-2 border-black bg-white shadow-[2px_2px_0px_#000000]">
                                <span className="text-xl">📦</span>
                                <h5 className="font-display font-bold text-xs uppercase text-neutral-900 mt-1">Infraestrutura em Nuvem</h5>
                                <p className="text-[11px] text-neutral-600 font-semibold leading-normal mt-1">
                                  Servidor extremamente rápido, backups periódicos automáticos e atualizações críticas inclusas na mensalidade para manter seus dados seguros.
                                </p>
                              </div>
                              <div className="p-3 border-2 border-black bg-white shadow-[2px_2px_0px_#000000]">
                                <span className="text-xl">⚡</span>
                                <h5 className="font-display font-bold text-xs uppercase text-neutral-900 mt-1">Implantação Rápida</h5>
                                <p className="text-[11px] text-neutral-600 font-semibold leading-normal mt-1">
                                  Configuração do banco de dados e treinamento inicial completo realizado em até 48 horas úteis para você começar a faturar.
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="p-3 border-2 border-black bg-white shadow-[2px_2px_0px_#000000]">
                                <span className="text-xl">🚀</span>
                                <h5 className="font-display font-bold text-xs uppercase text-neutral-900 mt-1">Vectura Vendas (Site) + Ponto Digital</h5>
                                <p className="text-[11px] text-neutral-600 font-semibold leading-normal mt-1">
                                  Site completo com gestão de vendas de veículos e peças integrado, somado ao controle de entrada e saída de funcionários com ponto eletrônico digital.
                                </p>
                              </div>
                              <div className="p-3 border-2 border-black bg-white shadow-[2px_2px_0px_#000000]">
                                <span className="text-xl">🎬</span>
                                <h5 className="font-display font-bold text-xs uppercase text-neutral-900 mt-1">Forte Impacto Social Media</h5>
                                <p className="text-[11px] text-neutral-600 font-semibold leading-normal mt-1">
                                  Postagens regulares (3 posts semanais) combinadas com a gravação/edição profissional de 1 Reels estratégico por semana para engajar e reter público.
                                </p>
                              </div>
                              <div className="p-3 border-2 border-black bg-white shadow-[2px_2px_0px_#000000]">
                                <span className="text-xl">✨</span>
                                <h5 className="font-display font-bold text-xs uppercase text-neutral-900 mt-1">Identidade Visual Completa</h5>
                                <p className="text-[11px] text-neutral-600 font-semibold leading-normal mt-1">
                                  Construção de logotipo exclusivo, paleta comercial e reestruturação de feed do Instagram (biografia, destaques e paleta de cores).
                                </p>
                              </div>
                              <div className="p-3 border-2 border-black bg-white shadow-[2px_2px_0px_#000000]">
                                <span className="text-xl">🛡️</span>
                                <h5 className="font-display font-bold text-xs uppercase text-neutral-900 mt-1">Suporte Executivo Estendido</h5>
                                <p className="text-[11px] text-neutral-600 font-semibold leading-normal mt-1">
                                  Canal direto com nossos especialistas para alterações de escopo, atualizações do feed e suporte técnico prioritário de emergência.
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Comparativo Comercial Direto e Organizado */}
                      <div className="border-t-2 border-dashed border-neutral-300 pt-6">
                        <label className="font-mono text-xs font-bold uppercase text-neutral-500 block mb-3 font-black">
                          📊 TABELA COMPARATIVA DE ENTREGAS
                        </label>
                        <div className="border-2 border-black overflow-hidden font-sans text-xs shadow-[2px_2px_0px_#000000]">
                          {/* Row Header */}
                          <div className="grid grid-cols-12 bg-black text-white font-mono text-[9px] uppercase font-black p-2.5 text-center">
                            <span className="col-span-5 text-left pl-2">REQUISITO / RECURSO</span>
                            <span className="col-span-3">START</span>
                            <span className="col-span-4 bg-purple-900">PADRÃO</span>
                          </div>
                          {/* Row 1 */}
                          <div className="grid grid-cols-12 border-b border-black p-2 bg-neutral-50 text-center font-semibold text-[11px]">
                            <span className="col-span-5 text-left pl-2 font-mono text-[9px] text-neutral-500 uppercase">Sistemas Inclusos</span>
                            <span className="col-span-3 text-neutral-700">Vendas + Estoque</span>
                            <span className="col-span-4 text-[#7C3AED] font-black bg-purple-50/50">Vendas + Ponto + Estoque</span>
                          </div>
                          {/* Row 2 */}
                          <div className="grid grid-cols-12 border-b border-black p-2 bg-white text-center font-semibold text-[11px]">
                            <span className="col-span-5 text-left pl-2 font-mono text-[9px] text-neutral-500 uppercase">Frequência Redes</span>
                            <span className="col-span-3 text-neutral-700">1 Post/sem</span>
                            <span className="col-span-4 text-[#7C3AED] font-black bg-purple-50/50">3 Posts + 1 Reels/sem</span>
                          </div>
                          {/* Row 3 */}
                          <div className="grid grid-cols-12 border-b border-black p-2 bg-neutral-50 text-center font-semibold text-[11px]">
                            <span className="col-span-5 text-left pl-2 font-mono text-[9px] text-neutral-500 uppercase">Identidade Visual</span>
                            <span className="col-span-3 text-neutral-400">Opcional</span>
                            <span className="col-span-4 text-[#7C3AED] font-black bg-purple-50/50">Completa Inclusa</span>
                          </div>
                          {/* Row 4 */}
                          <div className="grid grid-cols-12 p-2 bg-white text-center font-semibold text-[11px]">
                            <span className="col-span-5 text-left pl-2 font-mono text-[9px] text-neutral-500 uppercase">Suporte Comercial</span>
                            <span className="col-span-3 text-neutral-700">Horário Comercial</span>
                            <span className="col-span-4 text-[#7C3AED] font-black bg-purple-50/50">Prioritário Estendido</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

              </div>

              {/* Right Receipt Sidebar */}
              <div className="lg:col-span-5">
                <div className="border-4 border-black bg-neutral-50 p-6 rounded-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-4 font-mono text-xs">
                      <span className="font-extrabold uppercase">EXTRATO DE ESCOPO</span>
                      <span className="text-neutral-500">v1.07</span>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="border-b-2 border-black pb-2">
                        <p className="font-display font-black text-lg uppercase text-black">
                          PLANO {selectedPlan === "start" ? "START" : selectedPlan === "padrao" ? "PADRÃO" : "PERSONALIZADO"}
                        </p>
                        <span className="text-xs text-neutral-500 font-bold uppercase font-mono block">
                          {selectedPlan === "advanced" ? "Setup customizado sob demanda" : "Escopo pré-configurado ativo"}
                        </span>
                      </div>

                      {/* One-time/Adesão fees listing in receipt */}
                      {Object.values(customApps).some(Boolean) && (
                        <div className="space-y-1.5 border-b border-dashed border-neutral-300 pb-3">
                          <span className="font-mono text-[9px] text-neutral-500 block uppercase font-bold tracking-wider">💻 ADESÃO DE SOFTWARES (PAGAMENTO ÚNICO):</span>
                          {customApps.appPersonalizado && (
                            <div className="flex justify-between text-xs text-neutral-700 font-semibold font-mono">
                              <span>+ App Personalizado (Adesão)</span>
                              <span>R$ 499,90</span>
                            </div>
                          )}
                          {customApps.vendas && (
                            <div className="flex justify-between text-xs text-neutral-700 font-semibold font-mono">
                              <span>+ Vectura Vendas (Adesão)</span>
                              <span>R$ 216,00</span>
                            </div>
                          )}
                          {customApps.mecflow && (
                            <div className="flex justify-between text-xs text-neutral-700 font-semibold font-mono">
                              <span>+ Vectura MecFlow (Adesão)</span>
                              <span>R$ 65,00</span>
                            </div>
                          )}
                          {customApps.estoque && (
                            <div className="flex justify-between text-xs text-neutral-700 font-semibold font-mono">
                              <span>+ Vectura Estoque (Adesão)</span>
                              <span>R$ 65,00</span>
                            </div>
                          )}
                          {customApps.quickService && (
                            <div className="flex justify-between text-xs text-neutral-700 font-semibold font-mono">
                              <span>+ Vectura Quick Service (Adesão)</span>
                              <span>R$ 65,00</span>
                            </div>
                          )}
                          {customApps.pontoEletronico && (
                            <div className="flex justify-between text-xs text-neutral-700 font-semibold font-mono">
                              <span>+ Vectura Ponto Eletrônico (Adesão)</span>
                              <span>R$ 65,00</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Monthly licenses listing in receipt */}
                      {Object.values(customApps).some(Boolean) && (
                        <div className="space-y-1.5 border-b border-dashed border-neutral-300 pb-3">
                          <span className="font-mono text-[9px] text-neutral-500 block uppercase font-bold tracking-wider">🔑 MENSALIDADES DOS SISTEMAS (MENSAIS):</span>
                          {customApps.appPersonalizado && (
                            <div className="flex justify-between text-xs text-neutral-700 font-semibold font-mono">
                              <span>+ App Personalizado (Mensal)</span>
                              <span>R$ 49,90/mês</span>
                            </div>
                          )}
                          {customApps.vendas && (
                            <div className="flex justify-between text-xs text-neutral-700 font-semibold font-mono">
                              <span>+ Vectura Vendas (Mensal)</span>
                              <span>R$ 39,90/mês</span>
                            </div>
                          )}
                          {customApps.mecflow && (
                            <div className="flex justify-between text-xs text-neutral-700 font-semibold font-mono">
                              <span>+ Vectura MecFlow (Mensal)</span>
                              <span>R$ 49,90/mês</span>
                            </div>
                          )}
                          {customApps.estoque && (
                            <div className="flex justify-between text-xs text-neutral-700 font-semibold font-mono">
                              <span>+ Vectura Estoque (Mensal)</span>
                              <span>R$ 49,90/mês</span>
                            </div>
                          )}
                          {customApps.quickService && (
                            <div className="flex justify-between text-xs text-neutral-700 font-semibold font-mono">
                              <span>+ Vectura Quick Service (Mensal)</span>
                              <span>R$ 49,90/mês</span>
                            </div>
                          )}
                          {customApps.pontoEletronico && (
                            <div className="flex justify-between text-xs text-neutral-700 font-semibold font-mono">
                              <span>+ Vectura Ponto Eletrônico (Mensal)</span>
                              <span>R$ 49,90/mês</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Social media and Branding listing in receipt */}
                      {(customPostsPerWeek > 0 || customVideosPerWeek > 0 || customVisualIdentity) && (
                        <div className="space-y-1.5 border-b border-dashed border-neutral-300 pb-3">
                          <span className="font-mono text-[9px] text-neutral-500 block uppercase font-bold tracking-wider">🎨 MÍDIAS & BRANDING:</span>
                          {customPostsPerWeek > 0 && (
                            <div className="flex justify-between text-xs text-neutral-700 font-semibold font-mono">
                              <span>+ {customPostsPerWeek} Posts/semana</span>
                              <span>
                                R$ {(customPostsPerWeek === 1 ? 49.90 : customPostsPerWeek === 2 ? 89.90 : customPostsPerWeek === 3 ? 129.90 : customPostsPerWeek === 4 ? 169.90 : 199.90).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                          )}
                          {customVideosPerWeek > 0 && (
                            <div className="flex justify-between text-xs text-neutral-700 font-semibold font-mono">
                              <span>+ {customVideosPerWeek} Vídeos/semana</span>
                              <span>
                                R$ {(customVideosPerWeek === 1 ? 149.90 : customVideosPerWeek === 2 ? 269.90 : 374.90).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                          )}
                          {customVisualIdentity && (
                            <div className="flex justify-between text-xs text-neutral-700 font-semibold font-mono">
                              <span>+ Identidade Visual & Insta (Adesão)</span>
                              <span>R$ 399,90</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Custom Plan final combined price display */}
                      <div className="space-y-2 pt-1">
                        {getActivePlanOneTimePrice() > 0 && (
                          <div className="flex justify-between items-center text-xs text-black border-2 border-black p-2.5 bg-neutral-100 rounded-xs font-semibold">
                            <span className="font-mono text-[10px] uppercase font-black">PAGAMENTO ÚNICO (ADESÃO)</span>
                            <div className="text-right">
                              {couponApplied && (
                                <span className="font-mono text-[9px] text-neutral-500 line-through block leading-none mb-0.5">
                                  R$ {getCustomPlanOneTimePrice().toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                </span>
                              )}
                              <span className="font-mono font-black">
                                R$ {getActivePlanOneTimePrice().toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="border-t-2 border-black pt-3 flex justify-between items-center bg-black text-white p-3 rounded-xs">
                          <span className="font-mono text-xs uppercase font-extrabold tracking-wider">MENSALIDADE RECORRENTE</span>
                          <div className="text-right">
                            {couponApplied && (
                              <span className="font-mono text-[10px] text-red-400 line-through block leading-none mb-0.5">
                                R$ {getCustomPlanMonthlyPrice().toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                              </span>
                            )}
                            <span className="font-mono font-black text-xl text-[#66FF66]">
                              R$ {getActivePlanMonthlyPrice().toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </span>
                            <span className="text-[10px] text-neutral-400 font-mono block leading-[8px]">/mês</span>
                          </div>
                        </div>

                        {couponApplied && (
                          <div className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase p-2 text-center rounded-xs mt-1">
                            🎟️ Cupom VECTURA10 Ativo (-10%)
                          </div>
                        )}
                      </div>
                    </div>

                  </div>

                  <a
                    id="submit-whatsapp-cta"
                    href={getCustomWhatsappLink()}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full py-4 text-center font-display font-black text-base border-4 border-black block shadow-[5px_5px_0px_#000000] hover:shadow-[1px_1px_0px_#000000] hover:translate-x-[4px] hover:translate-y-[4px] transition-all uppercase ${getAccentBg()}`}
                  >
                    🚀 ENVIAR ESCOPO NO WHATSAPP
                  </a>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </section>

        {/* --- INTERACTIVE FREQUENTLY ASKED QUESTIONS (FAQ) --- */}
        <section id="faq" className="mb-24 scroll-mt-24">
          <div className="border-b-4 border-black pb-4 mb-12">
            <span className="font-mono text-sm uppercase tracking-widest text-neutral-500 font-bold block">
              // RESPOSTAS DIRETAS
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight uppercase">
              PERGUNTAS RECORRENTES.
            </h2>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            {faqs.map((f, i) => (
              <div 
                key={i} 
                className="border-3 border-black bg-white rounded-none shadow-[4px_4px_0px_#000000]"
              >
                <button
                  id={`faq-toggle-${i}`}
                  onClick={() => toggleFaq(i)}
                  className="w-full text-left p-5 flex justify-between items-center bg-white hover:bg-neutral-50 transition-colors font-display text-lg font-black uppercase text-black group"
                >
                  <span>{f.q}</span>
                  <ChevronDown className={`w-5 h-5 stroke-[2.5] transition-transform ${faqOpen[i] ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {faqOpen[i] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t-2 border-black"
                    >
                      <div className="p-5 font-sans text-neutral-800 text-sm md:text-base leading-relaxed font-semibold bg-neutral-50">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* --- CUSTOM CONTACT FORM --- */}
        <section className="mb-24">
          <div className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] p-6 md:p-8 rounded-sm">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <span className={`inline-block px-3 py-1 font-mono text-xs font-bold border-2 border-black ${getAccentBadgeBg()} uppercase tracking-widest mb-3`}>
                📬 CONTATO RÁPIDO
              </span>
              <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight mb-2">
                ENTRE EM CONTATO VIA FORMULÁRIO
              </h2>
              <p className="text-neutral-700 text-sm font-semibold leading-relaxed">
                Prefere preencher um formulário direto? Retornaremos com uma auditoria de performance sob medida no seu e-mail corporativo em menos de 12 horas.
              </p>
            </div>

            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto border-4 border-black p-6 bg-emerald-50 text-emerald-900 font-mono text-center shadow-[4px_4px_0px_#000000] rounded-sm"
              >
                <div className="text-3xl mb-2">🎉</div>
                <strong className="text-lg font-black block uppercase mb-2">Mensagem Recebida!</strong>
                <p className="text-xs text-neutral-700 font-semibold mb-4">
                  Sua proposta entrou em nossa esteira ágil de triagem. Falaremos no e-mail fornecido em instantes.
                </p>
                <button
                  id="reset-form"
                  onClick={() => {
                    setFormSubmitted(false);
                    setContactForm({ nome: "", email: "", servico: "Criação de App", mensagem: "" });
                  }}
                  className="bg-black text-white px-4 py-2 border-2 border-black text-xs font-bold hover:bg-[#333] transition-colors"
                >
                  Enviar outra mensagem
                </button>
              </motion.div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (contactForm.nome && contactForm.email) {
                    setFormSubmitted(true);
                  } else {
                    alert("Por favor preencha Nome e E-mail.");
                  }
                }}
                className="max-w-xl mx-auto space-y-4 font-mono text-xs"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-nome" className="font-bold uppercase text-neutral-600 block mb-1">Nome Completo</label>
                    <input
                      id="form-nome"
                      type="text"
                      required
                      value={contactForm.nome}
                      onChange={(e) => setContactForm(prev => ({ ...prev, nome: e.target.value }))}
                      placeholder="Ex: Carlos Albuquerque"
                      className="w-full border-2 border-black p-3 bg-[#FAF9F6] text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="form-email" className="font-bold uppercase text-neutral-600 block mb-1">E-mail Corporativo</label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Ex: carlos@empresa.com"
                      className="w-full border-2 border-black p-3 bg-[#FAF9F6] text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="form-servico" className="font-bold uppercase text-neutral-600 block mb-1">Frente de Maior Interesse</label>
                  <select
                    id="form-servico"
                    value={contactForm.servico}
                    onChange={(e) => setContactForm(prev => ({ ...prev, servico: e.target.value }))}
                    className="w-full border-2 border-black p-3 bg-[#FAF9F6] text-sm focus:outline-none focus:ring-2 focus:ring-black font-semibold text-black"
                  >
                    <option value="Criação de App">1. Criação de Aplicativo (ERP / CRM / Checkout)</option>
                    <option value="Mídias Sociais">2. Gestão de Contas e Redes Sociais</option>
                    <option value="Conteúdo Estratégico">3. Newsletters e Campanhas de Copys</option>
                    <option value="Ecossistema Completo">4. Ecossistema Completo Integrado</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="form-mensagem" className="font-bold uppercase text-neutral-600 block mb-1">Descreva seu Fluxo ou Necessidade</label>
                  <textarea
                    id="form-mensagem"
                    rows={4}
                    value={contactForm.mensagem}
                    onChange={(e) => setContactForm(prev => ({ ...prev, mensagem: e.target.value }))}
                    placeholder="Nos diga o que está travando sua operação atual ou marketing..."
                    className="w-full border-2 border-black p-3 bg-[#FAF9F6] text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="pt-2">
                  <button
                    id="form-submit"
                    type="submit"
                    className={`w-full py-4 font-display font-black text-sm uppercase border-3 border-black shadow-[4px_4px_0px_#000000] hover:shadow-[1px_1px_0px_#000000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all cursor-pointer flex items-center justify-center gap-2 ${getAccentBg()}`}
                  >
                    Submeter Proposta à Triagem <Send className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t-4 border-black bg-white pt-12 pb-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          
          <div className="md:col-span-6 flex flex-col gap-4">
            <a href="#" className="flex items-center gap-2">
              <div className={`w-8 h-8 border-2 border-black flex items-center justify-center font-black transition-all ${getAccentBg()} shadow-[2px_2px_0px_#000000]`}>
                V
              </div>
              <span className="font-display font-black text-xl tracking-tighter uppercase text-black">
                VECTURA<span className={getAccentTextClass()}>.</span>
              </span>
            </a>
            <p className="text-neutral-600 text-xs font-semibold leading-relaxed max-w-sm">
              Inovação no desenvolvimento de software de alta performance, curadoria de posicionamento para mídias emergentes e redação corporativa estratégica.
            </p>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3 font-mono text-xs text-neutral-800">
            <strong className="text-black uppercase tracking-wider font-extrabold">// LINKS DO SITE</strong>
            <a href="#pilares" className="hover:underline">/ pilares-de-entrega</a>
            <a href="#portfolio" className="hover:underline">/ portfolio-exemplos</a>
            <a href="#simulador" className="hover:underline">/ calculo-contrato</a>
            <a href="#faq" className="hover:underline">/ faq-respostas</a>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3 font-mono text-xs text-neutral-800">
            <strong className="text-black uppercase tracking-wider font-extrabold">// PRESENÇA DIGITAL</strong>
            <span className="text-neutral-500">vectura.app@gmail.com</span>
            <div className="flex gap-2.5 mt-2">
              <a 
                id="footer-instagram"
                href="https://instagram.com/vectura.app" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 border-2 border-black text-black bg-white flex items-center justify-center hover:bg-black hover:text-white hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_#000000] transition-all rounded-xs"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                id="footer-whatsapp"
                href="https://wa.me/5585986828425" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 border-2 border-black text-black bg-white flex items-center justify-center hover:bg-black hover:text-white hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_#000000] transition-all rounded-xs"
                title="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t-2 border-black flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-neutral-500 gap-4">
          <span>
            © {new Date().getFullYear()} VECTURA DIGITAL S/A. TODOS OS DIREITOS RESERVADOS.
          </span>
          <div className="flex gap-4">
            <span className="font-bold text-black border-r-2 border-black pr-4 uppercase">Brutalist Grid v1.0.0</span>
            <span>POLÍTICA DE PRIVACIDADE</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
