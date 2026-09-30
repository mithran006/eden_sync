import React, { useState } from 'react';
import { Landmark, CheckCircle2, Sliders, Sparkles, Plus, Image as ImageIcon, MapPin, DollarSign, Users, Eye, Trash2, Eraser, RotateCcw, Map as MapIcon, LayoutGrid, Columns } from 'lucide-react';
import { GovtProject, UserRole } from '../types';
import { InteractiveProjectsMap } from './InteractiveProjectsMap';

interface GovtProjectsPageProps {
  projects: GovtProject[];
  userRole: UserRole;
  onUpdateProject: (updatedPrj: GovtProject) => void;
  onAddProject: (newPrj: Partial<GovtProject>) => void;
  onDeleteProject?: (id: string) => void;
  onClearAllProjects?: () => void;
  onRestoreSampleProjects?: () => void;
}

export const GovtProjectsPage: React.FC<GovtProjectsPageProps> = ({
  projects,
  userRole,
  onUpdateProject,
  onAddProject,
  onDeleteProject,
  onClearAllProjects,
  onRestoreSampleProjects,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewDisplayMode, setViewDisplayMode] = useState<'both' | 'map' | 'grid'>('both');
  const [activeBeforeAfterToggle, setActiveBeforeAfterToggle] = useState<Record<string, 'before' | 'after'>>({});

  // Modal State for Admin adding project
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDept, setNewDept] = useState<string>('State Watershed Development Board');
  const [newLocation, setNewLocation] = useState<string>('');
  const [newTargetArea, setNewTargetArea] = useState<string>('100 Acres / 2 Lakes');
  const [newBudget, setNewBudget] = useState<string>('₹5.0 Crore');
  const [newBeneficiaries, setNewBeneficiaries] = useState<string>('5000');
  const [newCompletion, setNewCompletion] = useState<number>(25);
  const [newDescription, setNewDescription] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'Waterbodies' | 'Agricultural' | 'Watershed' | 'Afforestation'>('Waterbodies');

  const categories = ['All', 'Waterbodies', 'Agricultural', 'Watershed', 'Afforestation'];

  const filteredProjects = projects.filter((p) => {
    return selectedCategory === 'All' || p.category === selectedCategory;
  });

  const toggleImage = (id: string) => {
    setActiveBeforeAfterToggle((prev) => ({
      ...prev,
      [id]: prev[id] === 'after' ? 'before' : 'after',
    }));
  };

  const handleSliderChange = (prj: GovtProject, newPct: number) => {
    let newStatus: GovtProject['status'] = 'Ongoing';
    if (newPct === 0) newStatus = 'Planning';
    else if (newPct >= 90 && newPct < 100) newStatus = 'Near Completion';
    else if (newPct === 100) newStatus = 'Completed';

    onUpdateProject({
      ...prj,
      completionPercentage: newPct,
      status: newStatus,
    });
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProject({
      title: newTitle || 'Government Land & Water Initiative',
      department: newDept,
      location: newLocation || 'District Boundary',
      targetArea: newTargetArea,
      allocatedBudget: newBudget,
      beneficiaries: Number(newBeneficiaries) || 1000,
      completionPercentage: newCompletion,
      status: newCompletion === 100 ? 'Completed' : 'Ongoing',
      description: newDescription || 'Restoration of land and water resources.',
      beforeImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
      afterImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      category: newCategory,
    });
    setShowAddModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#2D4F1E] text-[#F4F1EA] p-8 sm:p-12 rounded-3xl border border-[#C08261]/40 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#1F3814] rounded-full text-xs font-bold text-[#D89F80] border border-[#C08261]/30">
            <Landmark className="w-3.5 h-3.5" />
            <span>Public Sector & Community Rejuvenation Tracker</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight leading-tight">
            Government Restoration Projects <br className="hidden sm:inline" />
            <span className="text-[#D89F80] italic">Live Progress Dashboard</span>
          </h1>
          <p className="text-sm sm:text-base text-[#F4F1EA]/90 leading-relaxed">
            Track transparent progress on state and national land revival schemes, lake de-silting initiatives, and watershed development projects.
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
        
        {/* Categories Bar */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full xl:w-auto pb-1.5 xl:pb-0 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`h-9 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 inline-flex items-center justify-center space-x-1.5 shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-sm ring-1 ring-[#C08261]/60'
                  : 'bg-[#FAF8F5] hover:bg-[#EFECE6] text-[#2D4F1E] border border-[#2D4F1E]/15'
              }`}
            >
              <span>{cat}</span>
              {cat === 'All' && (
                <span className={`px-1.5 py-0.2 text-[10px] font-bold rounded-full ${selectedCategory === cat ? 'bg-[#1F3814] text-[#D89F80]' : 'bg-[#EFECE6] text-[#2D4F1E]/70'}`}>
                  {projects.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Action Buttons: View Mode, Avoid Sample Data, Restore, Add Project */}
        <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto justify-start xl:justify-end">
          
          {/* View Mode Switcher Pill */}
          <div className="inline-flex items-center bg-[#EFECE6] p-0.5 rounded-xl border border-[#2D4F1E]/20 h-9 box-border">
            <button
              onClick={() => setViewDisplayMode('map')}
              className={`h-7.5 px-2.5 text-xs font-bold rounded-lg inline-flex items-center justify-center space-x-1 transition-all cursor-pointer ${
                viewDisplayMode === 'map'
                  ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-xs'
                  : 'text-[#2D4F1E]/80 hover:text-[#2D4F1E]'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5 shrink-0" />
              <span>Map</span>
            </button>

            <button
              onClick={() => setViewDisplayMode('grid')}
              className={`h-7.5 px-2.5 text-xs font-bold rounded-lg inline-flex items-center justify-center space-x-1 transition-all cursor-pointer ${
                viewDisplayMode === 'grid'
                  ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-xs'
                  : 'text-[#2D4F1E]/80 hover:text-[#2D4F1E]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
              <span>Grid</span>
            </button>

            <button
              onClick={() => setViewDisplayMode('both')}
              className={`h-7.5 px-2.5 text-xs font-bold rounded-lg inline-flex items-center justify-center space-x-1 transition-all cursor-pointer ${
                viewDisplayMode === 'both'
                  ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-xs'
                  : 'text-[#2D4F1E]/80 hover:text-[#2D4F1E]'
              }`}
            >
              <Columns className="w-3.5 h-3.5 shrink-0" />
              <span>Split</span>
            </button>
          </div>

          {projects.length > 0 && onClearAllProjects && (
            <button
              onClick={() => {
                if (window.confirm('Clear all Govt project entries to manage clean data?')) {
                  onClearAllProjects();
                }
              }}
              title="Avoid pre-filled sample data and clear all government project entries"
              className="h-9 px-3 bg-[#FAF8F5] hover:bg-red-50 text-red-700 font-bold text-xs rounded-xl border border-red-300 transition-all inline-flex items-center justify-center space-x-1.5 active:scale-95 shadow-xs cursor-pointer"
            >
              <Eraser className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span className="whitespace-nowrap">Clear Data</span>
            </button>
          )}

          {projects.length < 3 && onRestoreSampleProjects && (
            <button
              onClick={onRestoreSampleProjects}
              title="Load initial sample government projects"
              className="h-9 px-3 bg-[#EFECE6] hover:bg-[#FAF8F5] text-[#2D4F1E] font-bold text-xs rounded-xl border border-[#2D4F1E]/20 transition-all inline-flex items-center justify-center space-x-1.5 active:scale-95 shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#C08261] shrink-0" />
              <span className="whitespace-nowrap">Restore</span>
            </button>
          )}

          {userRole === 'admin' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="h-9 px-3.5 bg-[#C08261] hover:bg-[#A86E4F] text-[#F4F1EA] font-bold text-xs rounded-xl shadow-sm transition-all inline-flex items-center justify-center space-x-1.5 active:scale-95 shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">+ Add Project</span>
            </button>
          )}
        </div>

      </div>

      {/* Interactive Map View Section */}
      {(viewDisplayMode === 'map' || viewDisplayMode === 'both') && projects.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-2">
              <MapIcon className="w-5 h-5 text-[#C08261]" />
              <h2 className="text-xl font-serif font-bold text-[#2D4F1E]">Interactive Geographical Map</h2>
            </div>
            <span className="text-xs text-[#2D4F1E]/70 font-medium hidden sm:inline">
              Click site pins on the custom styled map to view live restoration metrics & images
            </span>
          </div>

          <InteractiveProjectsMap
            projects={projects}
            selectedCategory={selectedCategory}
          />
        </div>
      )}

      {/* Empty State when no projects exist */}
      {filteredProjects.length === 0 ? (
        <div className="bg-[#FAF8F5] p-12 rounded-3xl border border-dashed border-[#C08261]/40 text-center space-y-4 max-w-2xl mx-auto my-8 shadow-sm">
          <div className="w-16 h-16 bg-[#EFECE6] text-[#C08261] rounded-full flex items-center justify-center mx-auto border border-[#C08261]/30">
            <Landmark className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-serif font-bold text-[#2D4F1E]">No Govt Projects to Display</h3>
            <p className="text-xs text-[#2D4F1E]/70 max-w-md mx-auto">
              Sample data has been avoided or cleared. You can start with a clean slate by adding a custom project, or restore sample data anytime.
            </p>
          </div>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            {onRestoreSampleProjects && (
              <button
                onClick={onRestoreSampleProjects}
                className="px-5 py-2.5 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] text-xs font-bold rounded-xl transition-all shadow flex items-center space-x-2 active:scale-95"
              >
                <RotateCcw className="w-4 h-4 text-[#D89F80]" />
                <span>Restore Default Projects</span>
              </button>
            )}
            {userRole === 'admin' && (
              <button
                onClick={() => setShowAddModal(true)}
                className="px-5 py-2.5 bg-[#C08261] hover:bg-[#A86E4F] text-[#F4F1EA] text-xs font-bold rounded-xl transition-all shadow flex items-center space-x-2 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add First Custom Project</span>
              </button>
            )}
          </div>
        </div>
      ) : (viewDisplayMode === 'grid' || viewDisplayMode === 'both') && (
        /* Projects Grid */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProjects.map((prj) => {
            const currentImageToggle = activeBeforeAfterToggle[prj.id] || 'after';
            const isAfter = currentImageToggle === 'after';

            return (
              <div
                key={prj.id}
                className="bg-[#FAF8F5] rounded-3xl overflow-hidden shadow-xl border border-[#C08261]/20 flex flex-col justify-between hover:shadow-2xl transition-all group"
              >
                <div>
                  
                  {/* Before / After Image Box with Toggle */}
                  <div className="relative h-56 bg-[#1F3814] overflow-hidden">
                    <img
                      src={isAfter ? prj.afterImageUrl : prj.beforeImageUrl}
                      alt={prj.title}
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                    
                    {/* Status Pill */}
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      prj.status === 'Completed'
                        ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow'
                        : prj.status === 'Near Completion'
                        ? 'bg-[#2D4F1E]/80 text-[#F4F1EA]'
                        : 'bg-[#C08261] text-[#F4F1EA]'
                    }`}>
                      {prj.status} ({prj.completionPercentage}%)
                    </span>

                    {/* Delete Project Button on top right */}
                    {onDeleteProject && (
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete project "${prj.title}"?`)) {
                            onDeleteProject(prj.id);
                          }
                        }}
                        title="Delete project entry"
                        className="absolute top-3 right-3 w-8 h-8 inline-flex items-center justify-center bg-red-900/85 hover:bg-red-700 text-white rounded-xl backdrop-blur-sm transition-all shadow hover:scale-105 active:scale-95"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    {/* Category Pill */}
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/75 backdrop-blur-sm text-[#D89F80] text-[10px] font-bold rounded-lg border border-white/10">
                      {prj.category}
                    </span>

                    {/* Before / After Image Switcher Button */}
                    <button
                      onClick={() => toggleImage(prj.id)}
                      className="absolute bottom-3 right-3 h-8 px-3 bg-[#2D4F1E]/95 hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-[11px] rounded-xl shadow-lg border border-[#C08261]/50 inline-flex items-center justify-center space-x-1.5 transition-transform active:scale-95 backdrop-blur-sm"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-[#D89F80] shrink-0" />
                      <span>{isAfter ? 'Restored (After)' : 'Degraded (Before)'}</span>
                    </button>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[#C08261] tracking-wider">
                        {prj.department}
                      </p>
                      <h3 className="text-lg font-serif font-bold text-[#2D4F1E] mt-0.5 leading-snug">
                        {prj.title}
                      </h3>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-[#2D4F1E]/70">Restoration Progress</span>
                        <span className="text-[#2D4F1E] font-mono font-bold">{prj.completionPercentage}%</span>
                      </div>
                      <div className="w-full h-3 bg-[#EFECE6] rounded-full overflow-hidden p-0.5 border border-[#2D4F1E]/20">
                        <div
                          className="h-full bg-gradient-to-r from-[#C08261] to-[#2D4F1E] rounded-full transition-all duration-500"
                          style={{ width: `${prj.completionPercentage}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-[#2D4F1E]/80 leading-relaxed line-clamp-3">
                      {prj.description}
                    </p>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-3 gap-2 bg-[#EFECE6] p-3 rounded-2xl text-center border border-[#2D4F1E]/10 text-[11px]">
                      <div>
                        <MapPin className="w-3.5 h-3.5 text-[#2D4F1E]/40 mx-auto mb-0.5" />
                        <p className="font-bold text-[#2D4F1E] truncate">{prj.location}</p>
                        <p className="text-[9px] text-[#2D4F1E]/60">Location</p>
                      </div>
                      <div>
                        <DollarSign className="w-3.5 h-3.5 text-[#2D4F1E]/40 mx-auto mb-0.5" />
                        <p className="font-bold text-[#2D4F1E]">{prj.allocatedBudget}</p>
                        <p className="text-[9px] text-[#2D4F1E]/60">Budget</p>
                      </div>
                      <div>
                        <Users className="w-3.5 h-3.5 text-[#2D4F1E]/40 mx-auto mb-0.5" />
                        <p className="font-bold text-[#2D4F1E]">{prj.beneficiaries.toLocaleString()}</p>
                        <p className="text-[9px] text-[#2D4F1E]/60">Beneficiaries</p>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Admin Completion Control & Quick Preset Buttons */}
                {userRole === 'admin' && (
                  <div className="p-4 bg-[#EFECE6] border-t border-[#2D4F1E]/20 rounded-b-3xl space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-[#2D4F1E]">
                      <span className="inline-flex items-center space-x-1.5">
                        <Sliders className="w-3.5 h-3.5 text-[#C08261] shrink-0" />
                        <span>Admin: Adjust Progress %</span>
                      </span>
                      <span className="font-mono bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#2D4F1E]/20">{prj.completionPercentage}%</span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={prj.completionPercentage}
                      onChange={(e) => handleSliderChange(prj, Number(e.target.value))}
                      className="w-full accent-[#2D4F1E] cursor-pointer"
                    />

                    {/* Quick Preset Buttons */}
                    <div className="flex items-center justify-between gap-1 pt-1">
                      <span className="text-[10px] font-bold text-[#2D4F1E]/60 uppercase">Quick Set:</span>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[25, 50, 75, 100].map((pct) => (
                          <button
                            key={pct}
                            onClick={() => handleSliderChange(prj, pct)}
                            className={`h-7 px-2 text-[10px] font-bold rounded-lg transition-all inline-flex items-center justify-center ${
                              prj.completionPercentage === pct
                                ? 'bg-[#2D4F1E] text-[#F4F1EA] shadow-sm'
                                : 'bg-[#FAF8F5] hover:bg-[#EFECE6] text-[#2D4F1E] border border-[#2D4F1E]/20'
                            }`}
                          >
                            {pct}%
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

      {/* Admin Add Govt Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#1F3814]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateProject} className="bg-[#FAF8F5] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-4 border border-[#C08261]/30">
            <h3 className="text-xl font-serif font-bold text-[#2D4F1E] border-b border-[#2D4F1E]/20 pb-3">Add New Government Restoration Project</h3>

            <div>
              <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">Project Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Wetland Protection Drive Phase 1"
                className="w-full p-2.5 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-medium text-[#2D4F1E]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">Department</label>
                <input
                  type="text"
                  required
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="w-full p-2.5 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-medium text-[#2D4F1E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Trichy District"
                  className="w-full p-2.5 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-medium text-[#2D4F1E]"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">Target Area</label>
                <input
                  type="text"
                  value={newTargetArea}
                  onChange={(e) => setNewTargetArea(e.target.value)}
                  className="w-full p-2.5 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-medium text-[#2D4F1E]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">Budget</label>
                <input
                  type="text"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-full p-2.5 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-medium text-[#2D4F1E]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-medium text-[#2D4F1E]"
                >
                  <option value="Waterbodies">Waterbodies</option>
                  <option value="Agricultural">Agricultural</option>
                  <option value="Watershed">Watershed</option>
                  <option value="Afforestation">Afforestation</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">Initial Completion % ({newCompletion}%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={newCompletion}
                onChange={(e) => setNewCompletion(Number(e.target.value))}
                className="w-full accent-[#2D4F1E]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D4F1E] uppercase mb-1">Description</label>
              <textarea
                rows={3}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full p-2.5 bg-[#EFECE6] border border-[#2D4F1E]/20 rounded-xl text-xs font-medium text-[#2D4F1E]"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="h-10 px-5 bg-[#EFECE6] hover:bg-[#E2DDD5] text-[#2D4F1E] font-bold text-xs rounded-xl inline-flex items-center justify-center transition-all active:scale-95 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-10 px-6 bg-[#2D4F1E] hover:bg-[#1F3814] text-[#F4F1EA] font-bold text-xs rounded-xl shadow-md inline-flex items-center justify-center transition-all active:scale-95 cursor-pointer"
              >
                Create Govt Project
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
