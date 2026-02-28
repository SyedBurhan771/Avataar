import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, TrendingUp, FileText, DollarSign, Users,
  Target, Kanban, Zap, Flag, ChevronDown, ChevronUp
} from "lucide-react";

import OverviewTab from "../components/OverviewTab";
import LifecycleTimeline from "../components/LifecycleTimeline";
import GeneralTab from "../components/GeneralTab";
import FinancialTab from "../components/FinancialTab";
import ResourcesTab from "../components/ResourcesTab";
import TasksTab from "../components/TasksTab";
import BoardTab from "../components/BoardTab";        // ← now matches the file above
import SprintsTab from "../components/SprintsTab";
import MilestonesTab from "../components/MilestonesTab";

import { projects } from "../pages/Projects";

const tabList = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "lifecycle", label: "Lifecycle", icon: TrendingUp },
  { id: "general", label: "General Info", icon: FileText },
  { id: "financial", label: "Financial", icon: DollarSign },
  { id: "resources", label: "Resources", icon: Users },
  { id: "tasks", label: "Tasks", icon: Target },
  { id: "board", label: "Board", icon: Kanban },
  { id: "sprints", label: "Sprints", icon: Zap },
  { id: "milestones", label: "Milestones", icon: Flag },
];

function Section({ id, title, icon: Icon, children, isOpen, toggleSection }) {
  return (
    <div id={`section-${id}`} className="mb-8 scroll-mt-24">
      <div
        onClick={() => toggleSection(id)}
        className="bg-blue-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between cursor-pointer hover:bg-blue-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5" />}
          <span className="font-semibold text-lg tracking-wide">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>
      {isOpen && (
        <div className="bg-white border border-gray-200 border-t-0 rounded-b-2xl p-6">
          {children}
        </div>
      )}
    </div>
  );
}

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);
  const scrollRef = useRef(null);

  const [activeSection, setActiveSection] = useState("overview");
  const [collapsedSections, setCollapsedSections] = useState({});

  if (!project) return <div className="p-10 text-red-500">Project not found</div>;

  const toggleSection = (sectionId) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const scrollTo = (sectionId) => {
    setCollapsedSections(prev => ({ ...prev, [sectionId]: true }));
    setActiveSection(sectionId);
    window.history.replaceState(null, "", `#${sectionId}`);

    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let visibleId = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("section-", "");
            if (!visibleId || entry.boundingClientRect.top < visibleId.top) {
              visibleId = { id, top: entry.boundingClientRect.top };
            }
          }
        });
        if (visibleId) {
          setActiveSection(visibleId.id);
          window.history.replaceState(null, "", `#${visibleId.id}`);
        }
      },
      { threshold: [0.2, 0.5, 0.8], rootMargin: "-120px 0px -40% 0px" }
    );

    document.querySelectorAll("div[id^='section-']").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "") || "overview";
      scrollTo(hash);
    };
    window.addEventListener("hashchange", handleHash);
    handleHash();
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-gray-50">
      {/* Sticky Horizontal Tabs */}
      <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="flex px-8 overflow-x-auto">
          {tabList.map(tab => (
            <button
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              className={`px-6 py-5 text-sm font-medium border-b-2 whitespace-nowrap transition-all ${
                activeSection === tab.id
                  ? "border-blue-600 text-blue-600 font-semibold"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8">
        <Section id="overview" title="Overview" icon={LayoutDashboard} isOpen={collapsedSections.overview !== false} toggleSection={toggleSection}>
          <OverviewTab project={project} onViewTasks={() => scrollTo("tasks")} />
        </Section>

        <Section id="lifecycle" title="Lifecycle" icon={TrendingUp} isOpen={collapsedSections.lifecycle !== false} toggleSection={toggleSection}>
          <LifecycleTimeline project={project} />
        </Section>

        <Section id="general" title="General Info" icon={FileText} isOpen={collapsedSections.general !== false} toggleSection={toggleSection}>
          <GeneralTab project={project} />
        </Section>

        <Section id="financial" title="Financial" icon={DollarSign} isOpen={collapsedSections.financial !== false} toggleSection={toggleSection}>
          <FinancialTab project={project} />
        </Section>

        <Section id="resources" title="Resources" icon={Users} isOpen={collapsedSections.resources !== false} toggleSection={toggleSection}>
          <ResourcesTab project={project} />
        </Section>

        <Section id="tasks" title="Tasks" icon={Target} isOpen={collapsedSections.tasks !== false} toggleSection={toggleSection}>
          <TasksTab project={project} />
        </Section>

        <Section id="board" title="Board" icon={Kanban} isOpen={collapsedSections.board !== false} toggleSection={toggleSection}>
          <BoardTab project={project} />
        </Section>

        <Section id="sprints" title="Sprints" icon={Zap} isOpen={collapsedSections.sprints !== false} toggleSection={toggleSection}>
          <SprintsTab project={project} />
        </Section>

        <Section id="milestones" title="Milestones" icon={Flag} isOpen={collapsedSections.milestones !== false} toggleSection={toggleSection}>
          <MilestonesTab project={project} />
        </Section>
      </div>
    </div>
  );
}

export default ProjectDetail;