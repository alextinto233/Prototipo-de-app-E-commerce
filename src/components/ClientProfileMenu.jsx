import React, { useState } from 'react';
import {
  UserCircle,
  Store,
  MapPin,
  Award,
  Settings,
  FileText,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Smartphone,
  RefreshCcw,
  Crown,
  CheckCircle2,
} from 'lucide-react';

export const CLIENT_PROFILE = {
  name: 'Samuel Alejandro Hermosilla',
  storeName: 'Casino Mayor Temuco',
  address: 'Av Alemania 281',
  membershipLevel: 'Cliente circular',
  nextLevel: 'Socio Estratégico',
  levelProgress: 50,
  upgradeHint:
    'Para llegar a Socio Estratégico, eleva tu mix retornable a al menos 45% y apunta a más de 40 HL mensuales o sobre $500.000 CLP con productos premium.',
};

const MENU_ITEMS = [
  { id: 'settings', label: 'Ajustes', icon: Settings },
  { id: 'terms', label: 'Términos y condiciones', icon: FileText },
  { id: 'membership', label: 'Nivel de cliente', icon: Award },
];

const CLIENT_TIERS = [
  {
    id: 'digital',
    name: 'Cliente digital',
    icon: Smartphone,
    accent: 'border-blue-200 bg-blue-50/60',
    iconBg: 'bg-blue-100 text-blue-700',
    badge: 'Nivel 1',
    benefits: [
      {
        title: 'Acceso al catálogo masivo (Multicategoría)',
        description:
          'Capacidad de comprar cervezas, licores y bebidas en una sola orden digital.',
      },
      {
        title: 'Precios mayoristas base',
        description: 'Acceso al portafolio estándar sin recargos por canal.',
      },
    ],
  },
  {
    id: 'circular',
    name: 'Cliente circular',
    icon: RefreshCcw,
    accent: 'border-[#006838]/30 bg-[#eaf4ed]/60',
    iconBg: 'bg-[#006838]/15 text-[#006838]',
    badge: 'Nivel 2',
    benefits: [
      {
        title: 'Todos los del Nivel 1',
        description: 'Incluye todos los beneficios del Cliente digital.',
        isSummary: true,
      },
      {
        title: 'Retornables como prioridad',
        description:
          'Tu mix debe incluir al menos 30% en formatos retornables y tu declaración de envases debe coincidir en más del 98% con la revisión física.',
      },
      {
        title: 'Compras constantes',
        description:
          'El nivel 2 se alcanza con compras entre 16 y 40 HL mensuales y comportamiento estable en la app.',
      },
      {
        title: 'Descuentos por consistencia',
        description:
          'Acceso a ofertas extra en productos retornables cuando demuestras hábitos de compra circulares.',
      },
    ],
  },
  {
    id: 'estrategico',
    name: 'Socio estratégico',
    icon: Crown,
    accent: 'border-amber-200 bg-amber-50/70',
    iconBg: 'bg-amber-100 text-amber-800',
    badge: 'Nivel 3',
    benefits: [
      {
        title: 'Todos los de los Niveles 1 y 2',
        description: 'Incluye todos los beneficios del Cliente digital y Cliente circular.',
        isSummary: true,
      },
      {
        title: 'Volumen y premium',
        description:
          'Logras el nivel más alto con más de 40 HL al mes, o compras por encima de $500.000 CLP, y al menos 15% en SKUs premium.',
      },
      {
        title: 'Retornables avanzados',
        description:
          'Tu mix debe superar el 45% en formatos retornables, mostrando un compromiso real con la logística inversa.',
      },
      {
        title: 'Pago confiable',
        description:
          'El historial sin rechazos ni disputas durante 12 meses refuerza tu elegibilidad como socio estratégico.',
      },
    ],
  },
];

function MembershipLevelBadge() {
  return (
    <div className="mt-4 w-full">
      <div className="inline-flex items-center gap-1.5 bg-white/20 border border-white/30 text-white px-3 py-1.5 rounded-full mb-3">
        <RefreshCcw size={14} className="text-green-100" />
        <span className="text-xs font-bold uppercase tracking-wide">
          {CLIENT_PROFILE.membershipLevel}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-semibold text-green-100/90 uppercase tracking-wide">
          <span>{CLIENT_PROFILE.membershipLevel}</span>
          <span>{CLIENT_PROFILE.nextLevel}</span>
        </div>
        <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${CLIENT_PROFILE.levelProgress}%` }}
          />
        </div>
        <p className="text-[11px] text-green-100/95 leading-relaxed">
          {CLIENT_PROFILE.upgradeHint}
        </p>
      </div>
    </div>
  );
}

const getInitials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

const isCurrentTier = (tierName) =>
  CLIENT_PROFILE.membershipLevel.toLowerCase() === tierName.toLowerCase();

export function ProfileButton({ onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors ${className}`}
      aria-label="Abrir perfil"
    >
      <UserCircle size={24} strokeWidth={1.75} />
    </button>
  );
}

function MembershipTiersContent({ expandedTier, onToggleTier }) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500 leading-relaxed px-1">
        Toca cada nivel para ver los beneficios exclusivos de ese tipo de cliente.
      </p>

      {CLIENT_TIERS.map((tier) => {
        const isExpanded = expandedTier === tier.id;
        const isCurrent = isCurrentTier(tier.name);
        const TierIcon = tier.icon;

        return (
          <div key={tier.id} className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white">
            <button
              onClick={() => onToggleTier(tier.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-3.5 text-left transition-colors ${
                isExpanded ? tier.accent : 'bg-white hover:bg-gray-50'
              } ${isCurrent ? 'ring-2 ring-[#006838]/40 ring-offset-1' : ''}`}
              aria-expanded={isExpanded}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tier.iconBg}`}>
                <TierIcon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-gray-900">{tier.name}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {tier.badge}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] font-bold uppercase tracking-wide text-[#006838] bg-[#eaf4ed] px-2 py-0.5 rounded-full">
                      Tu nivel
                    </span>
                  )}
                </div>
              </div>
              <ChevronDown
                size={20}
                className={`text-gray-400 shrink-0 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isExpanded && (
              <div className={`px-3.5 pb-4 pt-1 border-t border-gray-100 ${tier.accent}`}>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">
                  Beneficios exclusivos de este nivel
                </p>
                <ul className="space-y-3">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit.title} className="flex gap-2.5">
                      <CheckCircle2
                        size={16}
                        className={`shrink-0 mt-0.5 ${
                          benefit.isSummary ? 'text-gray-400' : 'text-[#006838]'
                        }`}
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 leading-snug">
                          {benefit.title}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ProfileScreen({ onBack }) {
  const [section, setSection] = useState('main');
  const [expandedTier, setExpandedTier] = useState('circular');

  const handleBack = () => {
    if (section === 'membership') {
      setSection('main');
      return;
    }
    onBack();
  };

  const handleMenuClick = (itemId) => {
    if (itemId === 'membership') {
      setSection('membership');
    }
  };

  const handleToggleTier = (tierId) => {
    setExpandedTier((prev) => (prev === tierId ? null : tierId));
  };

  const title = section === 'membership' ? 'Nivel de cliente' : 'Mi perfil';

  return (
    <div className="flex flex-col h-full bg-[#F3F4F6]">
      <header className="flex items-center px-4 py-4 border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm shrink-0">
        <button
          onClick={handleBack}
          className="text-gray-800 hover:bg-gray-100 p-2 rounded-full transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold ml-2 text-gray-900">{title}</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
        {section === 'membership' ? (
          <>
            <p className="text-sm text-gray-600 mb-5">
              Tu nivel actual:{' '}
              <span className="font-bold text-[#006838]">{CLIENT_PROFILE.membershipLevel}</span>
            </p>
            <MembershipTiersContent
              expandedTier={expandedTier}
              onToggleTier={handleToggleTier}
            />
          </>
        ) : (
          <>
            <div className="bg-gradient-to-br from-[#006838] to-[#004224] rounded-2xl p-4 text-white shadow-[0_8px_20px_-6px_rgba(0,104,56,0.45)] mb-6">
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center shrink-0">
                  <span className="text-lg font-black">{getInitials(CLIENT_PROFILE.name)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-base leading-tight">{CLIENT_PROFILE.name}</p>
                  <p className="text-green-100 text-sm mt-1 flex items-center gap-1.5">
                    <Store size={14} className="shrink-0 opacity-90" />
                    <span className="truncate">{CLIENT_PROFILE.storeName}</span>
                  </p>
                  <p className="text-green-100/90 text-xs mt-1 flex items-start gap-1.5">
                    <MapPin size={13} className="shrink-0 mt-0.5 opacity-90" />
                    <span>{CLIENT_PROFILE.address}</span>
                  </p>
                </div>
              </div>

              <MembershipLevelBadge />
            </div>

            <div className="space-y-1">
              {MENU_ITEMS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleMenuClick(id)}
                  className="w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors group border border-gray-100 shadow-sm"
                >
                  <div className="w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-[#eaf4ed] flex items-center justify-center transition-colors">
                    <Icon size={18} className="text-gray-600 group-hover:text-[#006838]" />
                  </div>
                  <span className="flex-1 text-sm font-semibold text-gray-800">{label}</span>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
