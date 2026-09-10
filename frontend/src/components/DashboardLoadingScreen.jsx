import React from 'react';

const DashboardLoadingScreen = ({ progress, status, isFadeOut }) => {
  return (
    <div
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#080C14] select-none overflow-hidden transition-all duration-300 ${
        isFadeOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{ willChange: 'opacity, transform' }}
    >
      {/* Ambient background glow effects in brand green (#69BFA1) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[#69BFA1]/15 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#A6D65B]/10 rounded-full blur-[90px] pointer-events-none"></div>

      {/* Subtle fine grid texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#69BFA1 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-sm sm:max-w-md w-full animate-fadeIn">
        {/* Animated Brand Logo Icon with Orbital Rings */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Outer rotating dashed ring */}
          <div className="absolute -inset-4 sm:-inset-5 rounded-full border-2 border-dashed border-[#69BFA1]/35 animate-spin [animation-duration:8s] pointer-events-none"></div>
          {/* Counter-rotating accent ring */}
          <div className="absolute -inset-2.5 sm:-inset-3 rounded-full border border-dotted border-[#A6D65B]/40 animate-spin [animation-duration:12s] [animation-direction:reverse] pointer-events-none"></div>

          {/* Central Glassmorphic Badge */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-[#121B2A]/95 to-[#0A101C]/95 border border-[#69BFA1]/40 shadow-[0_0_50px_rgba(105,191,161,0.28)] flex items-center justify-center backdrop-blur-xl relative group">
            {/* Handshake Logo rendered in 2GetherRewards Brand Green (#69BFA1) */}
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 bg-[#69BFA1] animate-pulse"
              style={{
                maskImage: 'url(/logo-handshake-white.png)',
                WebkitMaskImage: 'url(/logo-handshake-white.png)',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                filter: 'drop-shadow(0 0 16px rgba(105, 191, 161, 0.75))',
              }}
            />
          </div>
        </div>

        {/* Brand Typography in Signature Green */}
        <div className="space-y-1.5 mb-8">
          <div className="flex items-center justify-center gap-1 font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
            <span>2Gether</span>
            <span className="text-[#69BFA1] drop-shadow-[0_0_14px_rgba(105,191,161,0.55)]">Rewards</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#69BFA1]/10 border border-[#69BFA1]/25 text-[#69BFA1] text-[11px] font-bold tracking-widest uppercase shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#69BFA1] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#69BFA1]"></span>
            </span>
            <span>Dashboard & Plataforma</span>
          </div>
        </div>

        {/* Progress Bar & Status Text */}
        <div className="w-full space-y-2.5">
          <div className="flex justify-between items-center text-[11.5px] font-medium text-gray-400 px-1">
            <span className="text-gray-300 font-semibold truncate pr-2 flex items-center gap-2">
              <i className="fa-solid fa-circle-notch fa-spin text-[#69BFA1] text-[10px]"></i>
              {status}
            </span>
            <span className="font-mono font-bold text-[#69BFA1] text-xs shrink-0 tracking-wider">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10 backdrop-blur-sm relative">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#69BFA1] via-[#7ae0be] to-[#A6D65B] shadow-[0_0_14px_rgba(105,191,161,0.85)] transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Security / System Footer */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-gray-500 font-medium">
          <i className="fa-solid fa-shield-halved text-[#69BFA1] text-xs"></i>
          <span>Entorno seguro y sincronización en tiempo real</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoadingScreen;
