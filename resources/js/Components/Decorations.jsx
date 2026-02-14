/**
 * Decorative SVG components for the El Jem Festival theme
 * Roman amphitheatre motifs, columns, mosaic patterns, and music elements
 */

export function AmphitheatreArch({ className = '', color = 'currentColor', width = 120, height = 80 }) {
  return (
    <svg className={className} width={width} height={height} viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main arch */}
      <path d="M10 80V30C10 13.4315 23.4315 0 40 0H80C96.5685 0 110 13.4315 110 30V80" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      {/* Inner arch */}
      <path d="M25 80V38C25 24.1929 36.1929 13 50 13H70C83.8071 13 95 24.1929 95 38V80" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      {/* Keystone */}
      <rect x="55" y="0" width="10" height="8" rx="1" fill={color} opacity="0.3"/>
      {/* Left column base */}
      <rect x="5" y="72" width="14" height="8" rx="1" fill={color} opacity="0.2"/>
      {/* Right column base */}
      <rect x="101" y="72" width="14" height="8" rx="1" fill={color} opacity="0.2"/>
    </svg>
  );
}

export function RomanColumn({ className = '', color = 'currentColor', height = 200 }) {
  return (
    <svg className={className} width="40" height={height} viewBox="0 0 40 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Capital (top) */}
      <path d="M0 15H40V10C40 10 35 0 20 0C5 0 0 10 0 10V15Z" fill={color} opacity="0.3"/>
      <rect x="2" y="15" width="36" height="4" rx="1" fill={color} opacity="0.2"/>
      {/* Shaft with fluting */}
      <rect x="5" y="19" width="30" height="165" fill={color} opacity="0.08"/>
      {/* Fluting lines */}
      <line x1="10" y1="19" x2="10" y2="184" stroke={color} strokeWidth="0.5" opacity="0.15"/>
      <line x1="15" y1="19" x2="15" y2="184" stroke={color} strokeWidth="0.5" opacity="0.15"/>
      <line x1="20" y1="19" x2="20" y2="184" stroke={color} strokeWidth="0.5" opacity="0.15"/>
      <line x1="25" y1="19" x2="25" y2="184" stroke={color} strokeWidth="0.5" opacity="0.15"/>
      <line x1="30" y1="19" x2="30" y2="184" stroke={color} strokeWidth="0.5" opacity="0.15"/>
      {/* Base */}
      <rect x="2" y="184" width="36" height="4" rx="1" fill={color} opacity="0.2"/>
      <rect x="0" y="188" width="40" height="6" rx="1" fill={color} opacity="0.15"/>
      <rect x="-2" y="194" width="44" height="6" rx="1" fill={color} opacity="0.1"/>
    </svg>
  );
}

export function MosaicPattern({ className = '', color = 'currentColor', size = 60 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Geometric Roman mosaic pattern tile */}
      <rect width="60" height="60" fill="none"/>
      <rect x="0" y="0" width="15" height="15" fill={color} opacity="0.05"/>
      <rect x="15" y="15" width="15" height="15" fill={color} opacity="0.05"/>
      <rect x="30" y="0" width="15" height="15" fill={color} opacity="0.05"/>
      <rect x="45" y="15" width="15" height="15" fill={color} opacity="0.05"/>
      <rect x="0" y="30" width="15" height="15" fill={color} opacity="0.05"/>
      <rect x="15" y="45" width="15" height="15" fill={color} opacity="0.05"/>
      <rect x="30" y="30" width="15" height="15" fill={color} opacity="0.05"/>
      <rect x="45" y="45" width="15" height="15" fill={color} opacity="0.05"/>
      {/* Diamond overlay */}
      <path d="M30 5L55 30L30 55L5 30Z" stroke={color} strokeWidth="0.5" opacity="0.08"/>
      <path d="M30 15L45 30L30 45L15 30Z" stroke={color} strokeWidth="0.5" opacity="0.06"/>
      {/* Center circle */}
      <circle cx="30" cy="30" r="4" stroke={color} strokeWidth="0.5" opacity="0.1"/>
    </svg>
  );
}

export function LyreSvg({ className = '', color = 'currentColor', size = 48 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Lyre base */}
      <path d="M18 40H30V38C30 38 28 36 24 36C20 36 18 38 18 38V40Z" fill={color} opacity="0.3"/>
      {/* Left arm */}
      <path d="M14 38C12 32 10 20 14 10C16 6 19 4 22 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Right arm */}
      <path d="M34 38C36 32 38 20 34 10C32 6 29 4 26 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Crossbar */}
      <path d="M16 14H32" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Strings */}
      <line x1="20" y1="14" x2="20" y2="36" stroke={color} strokeWidth="0.5" opacity="0.4"/>
      <line x1="24" y1="14" x2="24" y2="36" stroke={color} strokeWidth="0.5" opacity="0.4"/>
      <line x1="28" y1="14" x2="28" y2="36" stroke={color} strokeWidth="0.5" opacity="0.4"/>
      {/* Top ornament */}
      <circle cx="24" cy="4" r="2" fill={color} opacity="0.3"/>
    </svg>
  );
}

export function SectionDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sandstone/30 to-transparent" />
      <AmphitheatreArch className="text-gold/30" width={60} height={40} color="currentColor" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sandstone/30 to-transparent" />
    </div>
  );
}

export function FloatingParticles({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gold/20 animate-float"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${Math.random() * 10 + 10}s`,
          }}
        />
      ))}
    </div>
  );
}

export function AmphitheatreSeating({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stage */}
      <ellipse cx="200" cy="240" rx="80" ry="30" fill="#D6B25E" opacity="0.3" stroke="#D6B25E" strokeWidth="1"/>
      <text x="200" y="244" textAnchor="middle" fill="#D6B25E" fontSize="10" fontWeight="600">SCÈNE</text>
      
      {/* Fosse Orchestre */}
      <path d="M100 200 Q200 160 300 200" stroke="#D6B25E" strokeWidth="2" fill="#D6B25E" fillOpacity="0.1"/>
      <text x="200" y="192" textAnchor="middle" fill="#D6B25E" fontSize="8" opacity="0.8">Fosse Orchestre</text>
      
      {/* Arène / Tribune */}
      <path d="M70 170 Q200 120 330 170" stroke="#C9A77D" strokeWidth="2" fill="#C9A77D" fillOpacity="0.08"/>
      <text x="200" y="155" textAnchor="middle" fill="#C9A77D" fontSize="8" opacity="0.8">Arène</text>
      
      {/* Gradins */}
      <path d="M40 130 Q200 70 360 130" stroke="#C9A77D" strokeWidth="1.5" fill="#C9A77D" fillOpacity="0.05"/>
      <path d="M30 100 Q200 40 370 100" stroke="#C9A77D" strokeWidth="1.5" fill="#C9A77D" fillOpacity="0.05"/>
      <path d="M20 70 Q200 10 380 70" stroke="#C9A77D" strokeWidth="1.5" fill="#C9A77D" fillOpacity="0.05"/>
      <text x="200" y="85" textAnchor="middle" fill="#C9A77D" fontSize="8" opacity="0.6">Gradins</text>

      {/* VIP markers */}
      <rect x="50" y="135" width="50" height="20" rx="4" fill="#D6B25E" fillOpacity="0.15" stroke="#D6B25E" strokeWidth="0.5"/>
      <text x="75" y="149" textAnchor="middle" fill="#D6B25E" fontSize="7" fontWeight="500">VIP</text>
      <rect x="300" y="135" width="50" height="20" rx="4" fill="#D6B25E" fillOpacity="0.15" stroke="#D6B25E" strokeWidth="0.5"/>
      <text x="325" y="149" textAnchor="middle" fill="#D6B25E" fontSize="7" fontWeight="500">VIP</text>
    </svg>
  );
}
