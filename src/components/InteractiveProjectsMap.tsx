import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GovtProject } from '../types';
import { MapPin, Layers, RotateCcw, CheckCircle2, DollarSign, Users, Image as ImageIcon, Sparkles, Navigation, ChevronRight, X } from 'lucide-react';

interface InteractiveProjectsMapProps {
  projects: GovtProject[];
  selectedCategory?: string;
  onSelectProject?: (project: GovtProject) => void;
  onToggleBeforeAfter?: (projectId: string) => void;
}

// Map Tile Layer Options
const TILE_LAYERS = {
  voyager: {
    name: 'Clean Eco Voyager',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  },
  light: {
    name: 'Soft Light Canvas',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap &copy; CARTO'
  },
  terrain: {
    name: 'Topographic Terrain',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenTopoMap contributors'
  }
};

// Fallback lat/lng generator for Tamil Nadu / South India region if coordinates missing
const getProjectCoords = (prj: GovtProject, index: number): { lat: number; lng: number } => {
  if (prj.coordinates && prj.coordinates.lat && prj.coordinates.lng) {
    return prj.coordinates;
  }
  // Generate deterministic spread across Tamil Nadu region
  const baseLat = 10.8 + (index % 4) * 0.6;
  const baseLng = 78.5 + (index % 3) * 0.7;
  return { lat: baseLat, lng: baseLng };
};

export const InteractiveProjectsMap: React.FC<InteractiveProjectsMapProps> = ({
  projects,
  selectedCategory = 'All',
  onSelectProject,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [activeTileStyle, setActiveTileStyle] = useState<keyof typeof TILE_LAYERS>('voyager');
  const [selectedProject, setSelectedProject] = useState<GovtProject | null>(null);
  const [cardImageToggle, setCardImageToggle] = useState<'before' | 'after'>('after');
  const [filterCategory, setFilterCategory] = useState<string>(selectedCategory);

  // Sync category filter when prop changes
  useEffect(() => {
    setFilterCategory(selectedCategory);
  }, [selectedCategory]);

  const filteredProjects = projects.filter(
    (p) => filterCategory === 'All' || p.category === filterCategory
  );

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      if ((mapContainerRef.current as any)._leaflet_id) {
        delete (mapContainerRef.current as any)._leaflet_id;
      }
      try {
        // Default center: South India / Tamil Nadu center
        const map = L.map(mapContainerRef.current, {
          center: [11.1271, 78.6569],
          zoom: 7,
          zoomControl: false,
        });

        // Add Zoom Control on top right
        L.control.zoom({ position: 'topright' }).addTo(map);

        const tileConfig = TILE_LAYERS[activeTileStyle];
        const layer = L.tileLayer(tileConfig.url, {
          maxZoom: 18,
          attribution: tileConfig.attribution,
        }).addTo(map);

        tileLayerRef.current = layer;
        mapInstanceRef.current = map;
      } catch (mapErr) {
        console.warn('Leaflet map initialization warning:', mapErr);
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (cleanupErr) {
          console.warn('Leaflet cleanup notice:', cleanupErr);
        }
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer when style changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }
    const tileConfig = TILE_LAYERS[activeTileStyle];
    tileLayerRef.current = L.tileLayer(tileConfig.url, {
      maxZoom: 18,
      attribution: tileConfig.attribution,
    }).addTo(mapInstanceRef.current);
  }, [activeTileStyle]);

  // Update Map Markers on projects / filter change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const bounds = L.latLngBounds([]);

    filteredProjects.forEach((prj, idx) => {
      const coords = getProjectCoords(prj, idx);
      bounds.extend([coords.lat, coords.lng]);

      const isSelected = selectedProject?.id === prj.id;
      const statusColor =
        prj.status === 'Completed'
          ? '#1F3814'
          : prj.status === 'Near Completion'
          ? '#2D4F1E'
          : '#C08261';

      // Custom HTML Marker Element
      const customDivHtml = `
        <div class="relative group cursor-pointer transform transition-all duration-300 ${isSelected ? 'scale-125 z-50' : 'hover:scale-110'}">
          ${
            prj.status === 'Ongoing'
              ? `<div class="absolute -inset-1.5 rounded-full bg-[#C08261] opacity-75 animate-ping"></div>`
              : ''
          }
          <div class="relative flex items-center bg-[#FAF8F5] text-[#2D4F1E] rounded-full shadow-2xl border-2 px-2.5 py-1 space-x-1.5 font-bold text-xs" style="border-color: ${statusColor};">
            <span class="w-2.5 h-2.5 rounded-full shrink-0" style="background-color: ${statusColor};"></span>
            <span class="font-mono text-[11px] font-extrabold">${prj.completionPercentage}%</span>
            ${
              isSelected
                ? `<span class="text-[9px] bg-[#2D4F1E] text-[#F4F1EA] px-1 rounded uppercase font-bold">Active</span>`
                : ''
            }
          </div>
          <div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] mx-auto -mt-[1px]" style="border-t-color: ${statusColor};"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: customDivHtml,
        className: 'custom-map-marker-pin',
        iconSize: [80, 42],
        iconAnchor: [40, 42],
      });

      const marker = L.marker([coords.lat, coords.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setSelectedProject(prj);
        setCardImageToggle('after');
        map.flyTo([coords.lat, coords.lng], 9, { duration: 1.2 });
        if (onSelectProject) onSelectProject(prj);
      });

      markersRef.current.push(marker);
    });

    // Fit bounds if markers exist
    if (filteredProjects.length > 0 && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
    }
  }, [filteredProjects, selectedProject]);

  const handleResetView = () => {
    const map = mapInstanceRef.current;
    if (!map || filteredProjects.length === 0) return;
    const bounds = L.latLngBounds([]);
    filteredProjects.forEach((prj, idx) => {
      const coords = getProjectCoords(prj, idx);
      bounds.extend([coords.lat, coords.lng]);
    });
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 9 });
    }
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#C08261]/30 bg-[#EFECE6] font-sans">
      
      {/* Leaflet Map DOM Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Left Bar: Category Pills overlay on Map */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-1.5 bg-[#FAF8F5]/95 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-[#C08261]/20 max-w-[calc(100%-110px)] sm:max-w-none">
        {['All', 'Waterbodies', 'Agricultural', 'Watershed', 'Afforestation'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setFilterCategory(cat);
              setSelectedProject(null);
            }}
            className={`h-8 px-3 text-xs font-bold rounded-xl transition-all inline-flex items-center justify-center ${
              filterCategory === cat
                ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-sm'
                : 'bg-[#EFECE6] hover:bg-[#E2DDD5] text-[#2D4F1E]/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Top Right Control Buttons (Reset View & Tile Style Selector) */}
      <div className="absolute top-4 right-14 z-10 flex items-center space-x-2">
        <button
          onClick={handleResetView}
          title="Reset Map View & Fit All Sites"
          className="h-8 sm:h-9 px-3 bg-[#FAF8F5]/95 hover:bg-[#FAF8F5] text-[#2D4F1E] rounded-xl shadow-lg border border-[#C08261]/20 backdrop-blur-md transition-transform active:scale-95 inline-flex items-center justify-center space-x-1.5 font-bold text-xs"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#C08261] shrink-0" />
          <span className="hidden sm:inline">Fit Sites</span>
        </button>

        {/* Map Tile Style Switcher */}
        <div className="relative group">
          <button
            title="Change Map Style"
            className="h-8 sm:h-9 px-3 bg-[#2D4F1E] text-[#F4F1EA] rounded-xl shadow-lg border border-[#C08261]/30 backdrop-blur-md transition-transform active:scale-95 inline-flex items-center justify-center space-x-1.5 font-bold text-xs"
          >
            <Layers className="w-3.5 h-3.5 text-[#D89F80] shrink-0" />
            <span className="hidden md:inline">Style</span>
          </button>
          
          <div className="absolute right-0 top-full mt-2 hidden group-hover:flex flex-col bg-[#FAF8F5] p-2 rounded-2xl shadow-2xl border border-[#C08261]/30 w-44 space-y-1 z-20">
            {(Object.keys(TILE_LAYERS) as Array<keyof typeof TILE_LAYERS>).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTileStyle(key)}
                className={`text-left px-3 py-2 text-xs font-bold rounded-xl transition-colors ${
                  activeTileStyle === key
                    ? 'bg-[#2D4F1E] text-[#F4F1EA]'
                    : 'text-[#2D4F1E] hover:bg-[#EFECE6]'
                }`}
              >
                {TILE_LAYERS[key].name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Right Map Status Legend */}
      <div className="absolute bottom-4 right-4 z-10 bg-[#FAF8F5]/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-[#C08261]/20 text-[11px] font-bold text-[#2D4F1E] space-y-1.5 hidden sm:block">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#1F3814] inline-block shadow-sm"></span>
          <span>100% Completed</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#2D4F1E] inline-block shadow-sm"></span>
          <span>90%+ Near Completion</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#C08261] inline-block shadow-sm animate-pulse"></span>
          <span>Active Restoration Site</span>
        </div>
      </div>

      {/* Floating Active Selected Project Card Overlay on Map */}
      {selectedProject && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-20 bg-[#FAF8F5] p-5 rounded-3xl shadow-2xl border-2 border-[#C08261]/40 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start justify-between">
            <div>
              <span className="px-2.5 py-0.5 bg-[#2D4F1E] text-[#F4F1EA] text-[10px] font-bold uppercase rounded-full tracking-wider">
                {selectedProject.category}
              </span>
              <h4 className="text-base font-serif font-bold text-[#2D4F1E] mt-1 leading-tight">
                {selectedProject.title}
              </h4>
            </div>
            <button
              onClick={() => setSelectedProject(null)}
              className="p-1 text-[#2D4F1E]/60 hover:text-[#2D4F1E] hover:bg-[#EFECE6] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image Before/After Preview inside Map Drawer */}
          <div className="relative h-36 rounded-2xl overflow-hidden bg-[#1F3814]">
            <img
              src={cardImageToggle === 'after' ? selectedProject.afterImageUrl : selectedProject.beforeImageUrl}
              alt={selectedProject.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            
            <button
              onClick={() => setCardImageToggle((prev) => (prev === 'after' ? 'before' : 'after'))}
              className="absolute bottom-2 right-2 px-2.5 py-1 bg-[#2D4F1E]/90 hover:bg-[#1F3814] text-[#F4F1EA] text-[10px] font-bold rounded-xl border border-[#C08261]/40 flex items-center space-x-1 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <ImageIcon className="w-3 h-3 text-[#D89F80]" />
              <span>{cardImageToggle === 'after' ? 'Restored (After)' : 'Degraded (Before)'}</span>
            </button>

            <span className="absolute top-2 left-2 px-2.5 py-0.5 bg-black/70 text-[#D89F80] text-[10px] font-mono font-bold rounded">
              {selectedProject.completionPercentage}% Done
            </span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-[#2D4F1E]">
              <span>Site Completion Rate</span>
              <span className="font-mono">{selectedProject.completionPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-[#EFECE6] rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#C08261] to-[#2D4F1E] rounded-full"
                style={{ width: `${selectedProject.completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Location & Key Stats */}
          <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#EFECE6] p-2.5 rounded-xl border border-[#2D4F1E]/10">
            <div className="flex items-center space-x-1 text-[#2D4F1E]">
              <MapPin className="w-3.5 h-3.5 text-[#C08261] shrink-0" />
              <span className="font-bold truncate">{selectedProject.location}</span>
            </div>
            <div className="flex items-center space-x-1 text-[#2D4F1E]">
              <DollarSign className="w-3.5 h-3.5 text-[#C08261] shrink-0" />
              <span className="font-bold">{selectedProject.allocatedBudget}</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
