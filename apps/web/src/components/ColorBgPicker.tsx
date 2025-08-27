'use client';

import { useState, useRef, useEffect } from 'react';
import { isHexColor } from '@/lib/color-bg';

type Props = {
  value?: string;
  onChange: (hex: string) => void;
  onGradientChange?: (gradientUrl: string) => void;
};

type TabType = 'solid' | 'gradient' | 'pattern';

const GRADIENT_PRESETS = [
  { 
    name: 'Sunset', 
    colors: ['#FF6B6B', '#4ECDC4'], 
    direction: 'to right',
    cloudinaryId: 'portreva/backgrounds/gradients/sunset_rtxtbh',
    cloudinaryUrl: 'https://res.cloudinary.com/portreva/image/upload/v1756243642/sunset_rtxtbh.png'
  },
  { 
    name: 'Ocean', 
    colors: ['#667eea', '#764ba2'], 
    direction: 'to right',
    cloudinaryId: 'portreva/backgrounds/gradients/ocean',
    cloudinaryUrl: 'https://res.cloudinary.com/portreva/image/upload/v1/portreva/backgrounds/gradients/ocean.png'
  },
  { 
    name: 'Forest', 
    colors: ['#11998e', '#38ef7d'], 
    direction: 'to right',
    cloudinaryId: 'portreva/backgrounds/gradients/forest',
    cloudinaryUrl: 'https://res.cloudinary.com/portreva/image/upload/v1/portreva/backgrounds/gradients/forest.png'
  },
  { 
    name: 'Fire', 
    colors: ['#f093fb', '#f5576c'], 
    direction: 'to right',
    cloudinaryId: 'portreva/backgrounds/gradients/fire',
    cloudinaryUrl: 'https://res.cloudinary.com/portreva/image/upload/v1/portreva/backgrounds/gradients/fire.png'
  },
  { 
    name: 'Sky', 
    colors: ['#4facfe', '#00f2fe'], 
    direction: 'to bottom',
    cloudinaryId: 'portreva/backgrounds/gradients/sky',
    cloudinaryUrl: 'https://res.cloudinary.com/portreva/image/upload/v1/portreva/backgrounds/gradients/sky.png'
  },
  { 
    name: 'Purple', 
    colors: ['#a8edea', '#fed6e3'], 
    direction: 'to bottom',
    cloudinaryId: 'portreva/backgrounds/gradients/purple',
    cloudinaryUrl: 'https://res.cloudinary.com/portreva/image/upload/v1/portreva/backgrounds/gradients/purple.png'
  },
  { 
    name: 'Warm', 
    colors: ['#ffecd2', '#fcb69f'], 
    direction: '45deg',
    cloudinaryId: 'portreva/backgrounds/gradients/warm',
    cloudinaryUrl: 'https://res.cloudinary.com/portreva/image/upload/v1/portreva/backgrounds/gradients/warm.png'
  },
  { 
    name: 'Cool', 
    colors: ['#a8caba', '#5d4e75'], 
    direction: '45deg',
    cloudinaryId: 'portreva/backgrounds/gradients/cool',
    cloudinaryUrl: 'https://res.cloudinary.com/portreva/image/portreva/backgrounds/gradients/cool.png'
  },
  { 
    name: 'Neon', 
    colors: ['#ff9a9e', '#fecfef'], 
    direction: 'to right',
    cloudinaryId: 'portreva/backgrounds/gradients/neon',
    cloudinaryUrl: 'https://res.cloudinary.com/portreva/image/upload/v1/portreva/backgrounds/gradients/neon.png'
  },
];

const PATTERN_PRESETS = [
  { name: 'Dots', pattern: 'radial-gradient(circle, #fff 2px, transparent 2px)', size: '20px' },
  { name: 'Grid', pattern: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', size: '20px' },
  { name: 'Stripes', pattern: 'repeating-linear-gradient(45deg, #fff, #fff 2px, transparent 2px, transparent 8px)', size: '20px' },
  { name: 'Checkered', pattern: 'conic-gradient(#fff 0deg 90deg, transparent 90deg 180deg, #fff 180deg 270deg, transparent 270deg)', size: '40px' },
];

export default function ColorBgPicker({ value, onChange, onGradientChange }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('solid');
  const [currentColor, setCurrentColor] = useState(value ?? '#FFFFFF');
  const [saturation, setSaturation] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [customHex, setCustomHex] = useState(value ?? '#FFFFFF');
  
  const colorWheelRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Color wheel logic
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      updateColorFromWheel(e);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        updateColorFromWheel(e);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const colorWheel = colorWheelRef.current;
    if (colorWheel) {
      colorWheel.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (colorWheel) {
        colorWheel.removeEventListener('mousedown', handleMouseDown);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const updateColorFromWheel = (e: MouseEvent) => {
    const colorWheel = colorWheelRef.current;
    if (!colorWheel) return;

    const rect = colorWheel.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    const angle = Math.atan2(y, x) * (180 / Math.PI) + 180;
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = centerX;

    if (distance <= maxDistance) {
      const hue = angle;
      const saturation = Math.min((distance / maxDistance) * 100, 100);
      const hex = hslToHex(hue, saturation, 50);
      setCurrentColor(hex);
      onChange(hex);
    }
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 1/6) {
      r = c; g = x; b = 0;
    } else if (1/6 <= h && h < 2/6) {
      r = x; g = c; b = 0;
    } else if (2/6 <= h && h < 3/6) {
      r = 0; g = c; b = x;
    } else if (3/6 <= h && h < 4/6) {
      r = 0; g = x; b = c;
    } else if (4/6 <= h && h < 5/6) {
      r = x; g = 0; b = c;
    } else if (5/6 <= h && h < 1) {
      r = c; g = 0; b = x;
    }

    const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`;
  };

  const handleHexChange = (hex: string) => {
    setCustomHex(hex);
    if (isHexColor(hex)) {
      setCurrentColor(hex);
      onChange(hex);
    }
  };

  const handleGradientSelect = (gradient: typeof GRADIENT_PRESETS[0]) => {
    // Gradient seçildiğinde hem hex hem de Cloudinary URL'i gönder
    const hex = gradient.colors[0];
    setCurrentColor(hex);
    onChange(hex);
    
    // Gradient URL'ini parent'a bildir
    if (onGradientChange && gradient.cloudinaryUrl) {
      onGradientChange(gradient.cloudinaryUrl);
      // Kullanıcıya bilgi ver
      console.log(`🎨 ${gradient.name} gradient seçildi: ${gradient.cloudinaryUrl}`);
    }
  };

  const handlePatternSelect = (pattern: typeof PATTERN_PRESETS[0]) => {
    // For now, use white color for patterns
    const hex = '#FFFFFF';
    setCurrentColor(hex);
    onChange(hex);
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-black/20 rounded-xl p-1">
        {[
          { id: 'solid' as TabType, label: 'Düz Renk', icon: '🎨' },
          { id: 'gradient' as TabType, label: 'Gradient', icon: '🌈' },
          { id: 'pattern' as TabType, label: 'Desen', icon: '🔲' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'solid' && (
        <div className="space-y-6">
          {/* Color Wheel */}
          <div className="flex flex-col items-center space-y-4">
            <div className="text-sm font-medium text-white/80">Renk Tekerleği</div>
            <div
              ref={colorWheelRef}
              className="relative w-48 h-48 rounded-full cursor-pointer select-none"
              style={{
                background: 'conic-gradient(from 0deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)',
                boxShadow: '0 0 30px rgba(0,0,0,0.3), inset 0 0 30px rgba(255,255,255,0.1)'
              }}
            >
              <div className="absolute inset-4 rounded-full bg-white/20 backdrop-blur-sm"></div>
              <div 
                className="absolute w-4 h-4 bg-white rounded-full border-2 border-gray-800 shadow-lg transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  left: '50%',
                  top: '50%',
                  background: currentColor,
                  boxShadow: `0 0 10px ${currentColor}`
                }}
              />
            </div>
          </div>

          {/* Color Controls */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg border-2 border-white/20 overflow-hidden">
                <div 
                  className="w-full h-full"
                  style={{ background: currentColor }}
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={customHex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  placeholder="#RRGGBB"
                  className="w-full bg-black/20 rounded-md border border-white/10 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <input
                type="color"
                value={currentColor}
                onChange={(e) => {
                  setCurrentColor(e.target.value);
                  setCustomHex(e.target.value);
                  onChange(e.target.value);
                }}
                className="w-12 h-12 rounded-lg border border-white/20 cursor-pointer"
              />
            </div>

            {/* Saturation & Brightness Sliders */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-white/70 mb-2">Doygunluk</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={saturation}
                  onChange={(e) => setSaturation(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Parlaklık</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'gradient' && (
        <div className="space-y-4">
          <div className="text-sm font-medium text-white/80 mb-4">Gradient Presets</div>
          <div className="grid grid-cols-3 gap-3">
            {GRADIENT_PRESETS.map((gradient, index) => (
              <button
                key={index}
                onClick={() => handleGradientSelect(gradient)}
                className="group relative h-20 rounded-xl overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-purple-400"
                style={{
                  background: `linear-gradient(${gradient.direction}, ${gradient.colors.join(', ')})`
                }}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                <div className="absolute bottom-2 left-2 text-xs font-medium text-white drop-shadow-lg">
                  {gradient.name}
                </div>
                {gradient.cloudinaryId && (
                  <div className="absolute top-2 right-2 text-xs text-white/70 bg-black/30 px-2 py-1 rounded">
                    Cloudinary
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'pattern' && (
        <div className="space-y-4">
          <div className="text-sm font-medium text-white/80 mb-4">Desen Seçenekleri</div>
          <div className="grid grid-cols-2 gap-3">
            {PATTERN_PRESETS.map((pattern, index) => (
              <button
                key={index}
                onClick={() => handlePatternSelect(pattern)}
                className="group relative h-16 rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg border border-white/10"
                style={{
                  background: pattern.pattern,
                  backgroundSize: pattern.size
                }}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                <div className="absolute bottom-1 left-2 text-xs font-medium text-white drop-shadow-lg">
                  {pattern.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Apply Button */}
      <div className="pt-4 border-t border-white/10">
        <button
          onClick={() => onChange(currentColor)}
          className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
        >
          Renk Uygula
        </button>
      </div>
    </div>
  );
}
