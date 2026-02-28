import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Plus, Filter, Users, Clock, Award, Briefcase, FolderOpen, 
  TrendingUp, Mail, Phone, MapPin, Star, CheckCircle2, AlertCircle, Circle 
} from 'lucide-react';

export default function ResourcesScreen() {

  // ✅ FIX 1: No default selection
  const [selectedResource, setSelectedResource] = useState(null);
  const [showAIAllocator, setShowAIAllocator] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterAvailability, setFilterAvailability] = useState('all');

  // =======================
  // 🔵 YOUR FULL ORIGINAL RESOURCES ARRAY
  // =======================

  const resources = [
  {
    id: 'res-1',
    name: 'Burhan Ahmed',
    role: 'UI/UX Designer & Developer',
    department: 'Development',
    avatar: 'BA',
    email: 'burhan@company.com',
    phone: '+92 300 1234567',
    location: 'Karachi, Pakistan',
    
    // Skills & Expertise
    skills: [
      { name: 'Figma', level: 'Expert', category: 'Design' },
      { name: 'React', level: 'Advanced', category: 'Development' },
      { name: 'Java', level: 'Intermediate', category: 'Development' },
      { name: 'AI Products', level: 'Advanced', category: 'Technology' },
      { name: 'UI/UX Design', level: 'Expert', category: 'Design' },
      { name: 'Tailwind CSS', level: 'Advanced', category: 'Development' }
    ],
    
    // Qualifications
    qualifications: [
      { degree: 'BS Computer Science', institution: 'University of Karachi', year: '2024' },
      { degree: 'UI/UX Design Certificate', institution: 'Google', year: '2023' }
    ],
    
    // Current Status
    availability: 'partial', // available, partial, busy
    capacity: 75, // percentage utilized
    hoursPerWeek: 40,
    hoursAllocated: 30,
    hoursAvailable: 10,
    
    // Project Assignments
    currentProjects: [
      {
        projectId: 'proj-1',
        projectName: 'Social Media Campaign',
        projectCode: 'MKT-789',
        projectColor: 'bg-pink-500',
        role: 'UI Designer',
        allocation: 50, // percentage
        hoursPerWeek: 20,
        startDate: '2026-01-15',
        endDate: '2026-03-05'
      },
      {
        projectId: 'proj-3',
        projectName: 'Mobile App Development',
        projectCode: 'DEV-445',
        projectColor: 'bg-blue-500',
        role: 'Frontend Developer',
        allocation: 25,
        hoursPerWeek: 10,
        startDate: '2026-02-01',
        endDate: '2026-02-25'
      }
    ],
    
    // Performance Metrics
    tasksCompleted: 45,
    tasksInProgress: 8,
    avgCompletionTime: 2.5, // days
    rating: 4.8,
    
    // Availability Calendar (next 7 days)
    weeklyAvailability: [
      { day: 'Mon', available: true, hours: 8 },
      { day: 'Tue', available: true, hours: 8 },
      { day: 'Wed', available: true, hours: 6 },
      { day: 'Thu', available: true, hours: 8 },
      { day: 'Fri', available: false, hours: 0 },
      { day: 'Sat', available: false, hours: 0 },
      { day: 'Sun', available: false, hours: 0 }
    ]
  },
  {
    id: 'res-2',
    name: 'Sarah Mitchell',
    role: 'Marketing Manager',
    department: 'Marketing',
    avatar: 'SM',
    email: 'sarah.mitchell@company.com',
    phone: '+1 555 123 4567',
    location: 'New York, USA',
    
    skills: [
      { name: 'Digital Marketing', level: 'Expert', category: 'Marketing' },
      { name: 'Content Strategy', level: 'Expert', category: 'Marketing' },
      { name: 'SEO/SEM', level: 'Advanced', category: 'Marketing' },
      { name: 'Analytics', level: 'Advanced', category: 'Technology' },
      { name: 'Social Media', level: 'Expert', category: 'Marketing' }
    ],
    
    qualifications: [
      { degree: 'MBA Marketing', institution: 'Stanford University', year: '2019' },
      { degree: 'Google Analytics Certificate', institution: 'Google', year: '2020' }
    ],
    
    availability: 'busy',
    capacity: 95,
    hoursPerWeek: 40,
    hoursAllocated: 38,
    hoursAvailable: 2,
    
    currentProjects: [
      {
        projectId: 'proj-1',
        projectName: 'Social Media Campaign',
        projectCode: 'MKT-789',
        projectColor: 'bg-pink-500',
        role: 'Project Lead',
        allocation: 70,
        hoursPerWeek: 28,
        startDate: '2026-01-10',
        endDate: '2026-03-05'
      },
      {
        projectId: 'proj-4',
        projectName: 'Brand Redesign',
        projectCode: 'MKT-332',
        projectColor: 'bg-purple-500',
        role: 'Marketing Lead',
        allocation: 25,
        hoursPerWeek: 10,
        startDate: '2026-02-01',
        endDate: '2026-02-28'
      }
    ],
    
    tasksCompleted: 67,
    tasksInProgress: 12,
    avgCompletionTime: 1.8,
    rating: 4.9,
    
    weeklyAvailability: [
      { day: 'Mon', available: false, hours: 0 },
      { day: 'Tue', available: true, hours: 2 },
      { day: 'Wed', available: false, hours: 0 },
      { day: 'Thu', available: true, hours: 2 },
      { day: 'Fri', available: false, hours: 0 },
      { day: 'Sat', available: false, hours: 0 },
      { day: 'Sun', available: false, hours: 0 }
    ]
  },
  {
    id: 'res-3',
    name: 'Michael Chen',
    role: 'Full Stack Developer',
    department: 'Development',
    avatar: 'MC',
    email: 'michael.chen@company.com',
    phone: '+1 555 987 6543',
    location: 'San Francisco, USA',
    
    skills: [
      { name: 'JavaScript', level: 'Expert', category: 'Development' },
      { name: 'Python', level: 'Advanced', category: 'Development' },
      { name: 'React', level: 'Expert', category: 'Development' },
      { name: 'Node.js', level: 'Advanced', category: 'Development' },
      { name: 'Database Design', level: 'Advanced', category: 'Technology' },
      { name: 'AI/ML', level: 'Intermediate', category: 'Technology' }
    ],
    
    qualifications: [
      { degree: 'BS Software Engineering', institution: 'MIT', year: '2018' },
      { degree: 'AWS Certified Developer', institution: 'Amazon', year: '2021' }
    ],
    
    availability: 'partial',
    capacity: 60,
    hoursPerWeek: 40,
    hoursAllocated: 24,
    hoursAvailable: 16,
    
    currentProjects: [
      {
        projectId: 'proj-2',
        projectName: 'Budget Planning System',
        projectCode: 'FIN-654',
        projectColor: 'bg-green-500',
        role: 'Lead Developer',
        allocation: 60,
        hoursPerWeek: 24,
        startDate: '2026-01-20',
        endDate: '2026-04-25'
      }
    ],
    
    tasksCompleted: 89,
    tasksInProgress: 6,
    avgCompletionTime: 3.2,
    rating: 4.7,
    
    weeklyAvailability: [
      { day: 'Mon', available: true, hours: 8 },
      { day: 'Tue', available: true, hours: 6 },
      { day: 'Wed', available: true, hours: 8 },
      { day: 'Thu', available: true, hours: 8 },
      { day: 'Fri', available: true, hours: 6 },
      { day: 'Sat', available: false, hours: 0 },
      { day: 'Sun', available: false, hours: 0 }
    ]
  },
  {
    id: 'res-4',
    name: 'Emma Rodriguez',
    role: 'Data Analyst',
    department: 'Finance',
    avatar: 'ER',
    email: 'emma.rodriguez@company.com',
    phone: '+1 555 456 7890',
    location: 'Chicago, USA',
    
    skills: [
      { name: 'SQL', level: 'Expert', category: 'Technology' },
      { name: 'Excel', level: 'Expert', category: 'Technology' },
      { name: 'Power BI', level: 'Advanced', category: 'Technology' },
      { name: 'Python', level: 'Advanced', category: 'Development' },
      { name: 'Financial Analysis', level: 'Expert', category: 'Finance' }
    ],
    
    qualifications: [
      { degree: 'MS Data Science', institution: 'University of Chicago', year: '2020' },
      { degree: 'CFA Level 2', institution: 'CFA Institute', year: '2022' }
    ],
    
    availability: 'available',
    capacity: 40,
    hoursPerWeek: 40,
    hoursAllocated: 16,
    hoursAvailable: 24,
    
    currentProjects: [
      {
        projectId: 'proj-2',
        projectName: 'Budget Planning System',
        projectCode: 'FIN-654',
        projectColor: 'bg-green-500',
        role: 'Data Analyst',
        allocation: 40,
        hoursPerWeek: 16,
        startDate: '2026-01-25',
        endDate: '2026-04-25'
      }
    ],
    
    tasksCompleted: 52,
    tasksInProgress: 4,
    avgCompletionTime: 2.1,
    rating: 4.8,
    
    weeklyAvailability: [
      { day: 'Mon', available: true, hours: 8 },
      { day: 'Tue', available: true, hours: 8 },
      { day: 'Wed', available: true, hours: 8 },
      { day: 'Thu', available: true, hours: 8 },
      { day: 'Fri', available: true, hours: 8 },
      { day: 'Sat', available: false, hours: 0 },
      { day: 'Sun', available: false, hours: 0 }
    ]
  }
];
 	

  const availableProjects = [
    { id: 'proj-5', name: 'E-commerce Platform', code: 'DEV-556', requiredSkills: ['React', 'Node.js', 'Database Design'] },
    { id: 'proj-6', name: 'Financial Dashboard', code: 'FIN-778', requiredSkills: ['SQL', 'Python', 'Financial Analysis'] },
    { id: 'proj-7', name: 'Marketing Analytics', code: 'MKT-990', requiredSkills: ['Analytics', 'Digital Marketing', 'Power BI'] }
  ];

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'Development', name: 'Development' },
    { id: 'Marketing', name: 'Marketing' },
    { id: 'Finance', name: 'Finance' },
    { id: 'IT', name: 'IT Infrastructure' }
  ];

  // =======================
  // FILTER LOGIC
  // =======================

  const filteredResources = resources.filter(r => {
    const deptMatch = filterDepartment === 'all' || r.department === filterDepartment;
    const availMatch = filterAvailability === 'all' || r.availability === filterAvailability;
    return deptMatch && availMatch;
  });

  // ✅ FIX 2: Reset selection if filtered out
  useEffect(() => {
    if (!filteredResources.find(r => r.id === selectedResource)) {
      setSelectedResource(null);
    }
  }, [filterDepartment, filterAvailability]);

  const selectedResourceData = resources.find(r => r.id === selectedResource);

  // =======================
  // HELPERS
  // =======================

  const getAvailabilityBadge = (status) => {
    const badges = {
      'available': { color: 'bg-green-500', text: 'Available', icon: CheckCircle2 },
      'partial':   { color: 'bg-yellow-500', text: 'Partially Available', icon: AlertCircle },
      'busy':      { color: 'bg-red-500', text: 'Fully Allocated', icon: Circle }
    };
    return badges[status] || { color: 'bg-gray-500', text: 'Unknown', icon: Circle };
  };

  const getSkillLevelColor = (level) => {
    const colors = {
      'Expert': 'bg-green-100 text-green-700 border-green-300',
      'Advanced': 'bg-blue-100 text-blue-700 border-blue-300',
      'Intermediate': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'Beginner': 'bg-gray-100 text-gray-700 border-gray-300'
    };
    return colors[level] || colors['Beginner'];
  };

  const calculateSkillMatch = (resource, projectSkills) => {
    if (!projectSkills || projectSkills.length === 0) return 0;
    const resourceSkills = resource.skills.map(s => s.name.toLowerCase());
    const matches = projectSkills.filter(ps =>
      resourceSkills.some(rs => rs.includes(ps.toLowerCase()) || ps.toLowerCase().includes(rs))
    );
    return Math.round((matches.length / projectSkills.length) * 100);
  };

  // =======================
  // RETURN (UNCHANGED UI)
  // =======================

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
          <p className="text-gray-600 mt-1">
            Manage team members, skills & availability
          </p>
        </div>

        <button
          onClick={() => setShowAIAllocator(prev => !prev)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-medium hover:from-blue-700 hover:to-purple-700 shadow-lg"
        >
          <Sparkles className="w-4 h-4" />
          AI Allocate Resource
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Filter className="w-4 h-4" /> Filters:
        </div>

        <select
          value={filterDepartment}
          onChange={e => setFilterDepartment(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm"
        >
          {departments.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        <select
          value={filterAvailability}
          onChange={e => setFilterAvailability(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm"
        >
          <option value="all">All Availability</option>
          <option value="available">Available</option>
          <option value="partial">Partially Available</option>
          <option value="busy">Fully Allocated</option>
        </select>

        <div className="ml-auto text-sm text-gray-500">
          {filteredResources.length} resources
        </div>
      </div>

      {/* Main Grid: List + Detail */}
      <div className="grid grid-cols-12 gap-6">
        {/* Resource List (Left) - Matches your screenshot */}
        <div className="col-span-5 space-y-3">
          {filteredResources.map(resource => {
            const badge = getAvailabilityBadge(resource.availability);
            const Icon = badge.icon;

            return (
              <div
                key={resource.id}
                onClick={() => setSelectedResource(resource.id)}
                className={`bg-white rounded-2xl border-2 p-5 cursor-pointer transition-all hover:shadow-md ${
                  selectedResource === resource.id ? 'border-blue-600 shadow-lg' : 'border-transparent hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                    {resource.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                    <p className="text-sm text-gray-600">{resource.role}</p>
                    <span className={`${badge.color} text-white text-xs px-3 py-1 rounded-full inline-flex items-center gap-1 mt-2`}>
                      <Icon className="w-3 h-3" />
                      {badge.text}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
<div className="col-span-7">
  {selectedResourceData && (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {selectedResourceData.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedResourceData.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{selectedResourceData.role}</p>
              <div className="flex items-center gap-3 text-xs text-gray-600 flex-wrap">
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3" /> {selectedResourceData.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {selectedResourceData.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {selectedResourceData.location}
                </span>
              </div>
            </div>
          </div>

          {(() => {
            const availBadge = getAvailabilityBadge(selectedResourceData.availability);
            const AvailIcon = availBadge.icon;
            return (
              <span className={`${availBadge.color} text-white px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2`}>
                <AvailIcon className="w-4 h-4" />
                {availBadge.text}
              </span>
            );
          })()}
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Skills & Expertise */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Award className="w-4 h-4" /> Skills & Expertise
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedResourceData.skills.map((skill, idx) => (
              <div key={idx} className={`px-3 py-1.5 rounded-lg border ${getSkillLevelColor(skill.level)}`}>
                <span className="text-sm font-semibold">{skill.name}</span>
                <span className="text-xs ml-2">• {skill.level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Qualifications */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Qualifications
          </h3>
          <div className="space-y-3">
            {selectedResourceData.qualifications.map((qual, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{qual.degree}</p>
                  <p className="text-xs text-gray-600">{qual.institution} • {qual.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workload & Availability */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" /> Workload & Availability
          </h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
              <p className="text-xs text-gray-600 mb-1">Total Hours/Week</p>
              <p className="text-2xl font-bold text-blue-700">{selectedResourceData.hoursPerWeek}</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-200">
              <p className="text-xs text-gray-600 mb-1">Hours Allocated</p>
              <p className="text-2xl font-bold text-orange-700">{selectedResourceData.hoursAllocated}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
              <p className="text-xs text-gray-600 mb-1">Hours Available</p>
              <p className="text-2xl font-bold text-green-700">{selectedResourceData.hoursAvailable}</p>
            </div>
          </div>

          {/* Weekly Calendar */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-xs font-semibold text-gray-700 mb-3">This Week Availability</p>
            <div className="grid grid-cols-7 gap-2">
              {selectedResourceData.weeklyAvailability.map((day, idx) => (
                <div key={idx} className="text-center">
                  <div className={`rounded-lg p-3 ${
                    day.available ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
                  }`}>
                    <p className="text-xs font-bold text-gray-900">{day.day}</p>
                    <p className="text-xs text-gray-600 mt-1">{day.hours}h</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current Projects */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <FolderOpen className="w-4 h-4" /> Current Projects ({selectedResourceData.currentProjects.length})
          </h3>
          <div className="space-y-4">
            {selectedResourceData.currentProjects.map((proj, idx) => (
              <div key={idx} className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${proj.projectColor}`}></div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{proj.projectName}</h4>
                      <p className="text-xs text-gray-600">{proj.projectCode} • {proj.role}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold">
                    {proj.allocation}% allocated
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Hours/Week: </span>
                    <span className="font-semibold">{proj.hoursPerWeek}h</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Duration: </span>
                    <span className="font-semibold">
                      {new Date(proj.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – 
                      {new Date(proj.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        {/* <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Performance Metrics
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200">
              <p className="text-xs text-gray-600 mb-1">Tasks Completed</p>
              <p className="text-3xl font-bold text-green-700">{selectedResourceData.tasksCompleted}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-5 text-center border border-blue-200">
              <p className="text-xs text-gray-600 mb-1">In Progress</p>
              <p className="text-3xl font-bold text-blue-700">{selectedResourceData.tasksInProgress}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-5 text-center border border-purple-200">
              <p className="text-xs text-gray-600 mb-1">Avg Completion</p>
              <p className="text-3xl font-bold text-purple-700">{selectedResourceData.avgCompletionTime}d</p>
            </div>
          </div>
        </div> */}

        {/* AI Skill Matching
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" /> AI Skill Match for Available Projects
          </h3>
          <div className="space-y-4">
            {availableProjects.map((proj, idx) => {
              const matchScore = calculateSkillMatch(selectedResourceData, proj.requiredSkills);
              return (
                <div key={idx} className="p-5 bg-purple-50 rounded-2xl border border-purple-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-base font-semibold text-gray-900">{proj.name}</p>
                      <p className="text-sm text-gray-600">{proj.code}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${
                        matchScore >= 80 ? 'text-green-700' :
                        matchScore >= 60 ? 'text-yellow-700' :
                        'text-red-700'
                      }`}>{matchScore}%</p>
                      <p className="text-xs text-gray-600">match</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {proj.requiredSkills.map((skill, sidx) => {
                      const hasSkill = selectedResourceData.skills.some(s =>
                        s.name.toLowerCase().includes(skill.toLowerCase()) ||
                        skill.toLowerCase().includes(s.name.toLowerCase())
                      );
                      return (
                        <span key={sidx} className={`px-3 py-1 rounded-full text-xs font-medium ${
                          hasSkill ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {skill} {hasSkill ? '✓' : '✗'}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div> */}
      </div>
    </div>
  )}
</div>
      </div>
    </div>
  );
}