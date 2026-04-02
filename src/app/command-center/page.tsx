"use client";

import { useEffect, useState, useCallback } from "react";
import {
  fetchProjects,
  fetchSprintData,
  fetchMilestones,
  cycleTaskStatus,
  toggleMilestonePaid,
  type Project,
  type WeekWithDays,
  type Milestone,
  type Task,
} from "@/lib/supabase-sprint";

const OWNER_COLORS: Record<string, { bg: string; text: string }> = {
  Karina: { bg: "#DC2626", text: "#fff" },
  Chris: { bg: "#111111", text: "#fff" },
  Yurie: { bg: "#7C3AED", text: "#fff" },
  Dev: { bg: "#2563EB", text: "#fff" },
  QA: { bg: "#059669", text: "#fff" },
};
const DEFAULT_OWNER = { bg: "#6B7280", text: "#fff" };
function ownerColor(owner: string) { return OWNER_COLORS[owner] ?? DEFAULT_OWNER; }

const STATUS_STYLES: Record<string, { dot: string; label: string }> = {
  pending: { dot: "#9CA3AF", label: "Pending" },
  "in-progress": { dot: "#F59E0B", label: "In Progress" },
  complete: { dot: "#10B981", label: "Complete" },
};

function calcProgress(tasks: Task[]): number {
  if (tasks.length === 0) return 0;
  return Math.round((tasks.filter((t) => t.status === "complete").length / tasks.length) * 100);
}
function allTasks(weeks: WeekWithDays[]): Task[] {
  return weeks.flatMap((w) => w.days.flatMap((d) => d.tasks));
}
type Filter = "all" | "pending" | "in-progress" | "complete";

export default function CommandCenterPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [weeks, setWeeks] = useState<WeekWithDays[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [sprintLoading, setSprintLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [showMilestones, setShowMilestones] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const activeProject = projects.find((p) => p.id === activeId) ?? null;

  useEffect(() => {
    fetchProjects()
      .then((p) => { setProjects(p); if (p.length > 0) setActiveId(p[0].id); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const loadSprint = useCallback(async (projectId: string) => {
    setSprintLoading(true);
    try {
      const [w, m] = await Promise.all([fetchSprintData(projectId), fetchMilestones(projectId)]);
      setWeeks(w); setMilestones(m);
    } catch (e) { console.error("Sprint load error:", e); }
    finally { setSprintLoading(false); }
  }, []);

  useEffect(() => { if (activeId) loadSprint(activeId); }, [activeId, loadSprint]);

  const handleCycleStatus = async (task: Task) => {
    try {
      const next = await cycleTaskStatus(task.id, task.status);
      setWeeks((prev) => prev.map((w) => ({ ...w, days: w.days.map((d) => ({ ...d, tasks: d.tasks.map((t) => t.id === task.id ? { ...t, status: next as Task["status"] } : t) })) })));
    } catch (e) { console.error("Status cycle error:", e); }
  };

  const handleToggleMilestone = async (ms: Milestone) => {
    try {
      const next = await toggleMilestonePaid(ms.id, ms.is_paid);
      setMilestones((prev) => prev.map((m) => (m.id === ms.id ? { ...m, is_paid: next } : m)));
    } catch (e) { console.error("Milestone toggle error:", e); }
  };

  const totalTasks = allTasks(weeks);
  const progress = calcProgress(totalTasks);
  const totalHours = totalTasks.reduce((s, t) => s + (t.hours || 0), 0);
  const completedHours = totalTasks.filter((t) => t.status === "complete").reduce((s, t) => s + (t.hours || 0), 0);

  if (loading) {
    return (<div className="h-screen flex items-center justify-center bg-[#0d090e]"><div className="text-white text-lg">Loading Command Center...</div></div>);
  }

  return (
    <div className="h-screen flex bg-[#0d090e] text-white overflow-hidden">
      <aside className={`${sidebarOpen ? "w-72" : "w-0"} transition-all duration-200 bg-[#161118] border-r border-[#2a2230] flex flex-col overflow-hidden`}>
        <div className="p-4 border-b border-[#2a2230]">
          <div className="flex items-center gap-2 mb-4">
            <svg width="28" height="28" viewBox="0 0 100 100"><polygon points="30,85 50,20 70,85" fill="none" stroke="#DC2626" strokeWidth="7" strokeLinejoin="round" /><polygon points="50,55 42,75 58,75" fill="#DC2626" /></svg>
            <div><div className="font-bold text-sm tracking-wider uppercase text-[#f74437]">Spark Strategies</div><div className="text-xs text-[#8a8a8a]">Sprint Manager</div></div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {projects.map((p) => {
            const isActive = p.id === activeId;
            const pProg = isActive ? progress : 0;
            return (
              <button key={p.id} onClick={() => { setActiveId(p.id); setFilter("all"); }}
                className={`w-full text-left p-3 rounded-lg mb-1 transition-colors ${isActive ? "bg-[#2a2230] border border-[#3a3040]" : "hover:bg-[#1e1822] border border-transparent"}`}>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: p.accent_color || "#DC2626" }} />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm truncate">{p.client_name}</div>
                    <div className="text-xs text-[#8a8a8a] truncate">{p.project_name}</div>
                  </div>
                  <span className="text-xs text-[#8a8a8a] shrink-0">{isActive ? `${pProg}%` : ""}</span>
                </div>
              </button>
            );
          })}
        </div>
        <div className="p-3 border-t border-[#2a2230] text-xs text-[#8a8a8a] text-center">{projects.length} project{projects.length !== 1 ? "s" : ""}</div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-[#161118] border-b border-[#2a2230] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-[#8a8a8a] hover:text-white p-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
              </button>
              {activeProject && (
                <div>
                  <h1 className="text-xl font-bold">{activeProject.client_name} &mdash; {activeProject.project_name}</h1>
                  <p className="text-sm text-[#8a8a8a]">{activeProject.sprint_label} &middot; {activeProject.start_date} &rarr; {activeProject.end_date}</p>
                </div>
              )}
            </div>
            <button onClick={() => setShowMilestones(true)} className="px-3 py-1.5 text-sm rounded-md border border-[#3a3040] hover:bg-[#2a2230] transition-colors">Milestones</button>
          </div>
          {activeProject && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-[#8a8a8a] mb-1"><span>Sprint Progress</span><span className="text-lg font-bold text-white">{progress}%</span></div>
              <div className="h-2 bg-[#2a2230] rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, backgroundColor: activeProject.accent_color || "#DC2626" }} /></div>
              <div className="flex gap-4 mt-2 text-xs text-[#8a8a8a]">
                <span>{totalTasks.filter((t) => t.status === "complete").length}/{totalTasks.length} tasks</span>
                <span>{completedHours}/{totalHours}h logged</span>
                {activeProject.budget && <span>Budget: {activeProject.budget}</span>}
                {activeProject.team?.length > 0 && <span>Team: {activeProject.team.join(", ")}</span>}
              </div>
            </div>
          )}
        </header>

        <div className="bg-[#161118] border-b border-[#2a2230] px-6 py-2 flex items-center gap-2">
          {(["all", "pending", "in-progress", "complete"] as Filter[]).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 text-xs rounded-full transition-colors ${filter === f ? "bg-[#f74437] text-white" : "bg-[#2a2230] text-[#8a8a8a] hover:text-white"}`}>
              {f === "all" ? "All" : f === "in-progress" ? "In Progress" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {sprintLoading ? (
            <div className="flex items-center justify-center h-64 text-[#8a8a8a]">Loading sprint data...</div>
          ) : weeks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-[#8a8a8a]">
              <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="mb-3 opacity-50"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              <p className="text-lg font-medium">No Sprint Days Yet</p>
              <p className="text-sm mt-1">Sprint data will appear here once added.</p>
            </div>
          ) : (
            weeks.map((week) => (
              <div key={week.id} className="mb-8">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: activeProject?.accent_color || "#DC2626" }} />
                  {week.week_label}
                </h2>
                <div className="grid gap-4">
                  {week.days.map((day) => {
                    const filteredTasks = filter === "all" ? day.tasks : day.tasks.filter((t) => t.status === filter);
                    const dayProgress = calcProgress(day.tasks);
                    const dayDone = day.tasks.filter((t) => t.status === "complete").length;
                    if (filter !== "all" && filteredTasks.length === 0) return null;
                    return (
                      <div key={day.id} className="bg-[#161118] rounded-xl border border-[#2a2230] overflow-hidden">
                        <div className="px-4 py-3 border-b border-[#2a2230] flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-sm">{day.day_name}</span>
                            <span className="text-xs text-[#8a8a8a] ml-2">{day.day_date}</span>
                            <span className="text-xs text-[#555] ml-3 italic">{day.phase}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-[#8a8a8a]">{dayDone}/{day.tasks.length}</span>
                            <div className="w-16 h-1.5 bg-[#2a2230] rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-300" style={{ width: `${dayProgress}%`, backgroundColor: dayProgress === 100 ? "#10B981" : activeProject?.accent_color || "#DC2626" }} />
                            </div>
                          </div>
                        </div>
                        <div className="divide-y divide-[#1e1822]">
                          {filteredTasks.map((task) => {
                            const ss = STATUS_STYLES[task.status] ?? STATUS_STYLES.pending;
                            const oc = ownerColor(task.owner);
                            return (
                              <div key={task.id} className={`px-4 py-2.5 flex items-center gap-3 hover:bg-[#1e1822] transition-colors cursor-pointer ${task.status === "complete" ? "opacity-60" : ""}`} onClick={() => handleCycleStatus(task)}>
                                <div className="w-3 h-3 rounded-full shrink-0 border-2" style={{ borderColor: ss.dot, backgroundColor: task.status === "complete" ? ss.dot : "transparent" }} />
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded shrink-0 uppercase tracking-wider" style={{ backgroundColor: oc.bg, color: oc.text }}>{task.owner}</span>
                                <span className={`flex-1 text-sm ${task.status === "complete" ? "line-through text-[#555]" : ""}`}>{task.description}</span>
                                {task.hours > 0 && <span className="text-xs text-[#8a8a8a] shrink-0">{task.hours}h</span>}
                                <span className="text-[10px] px-2 py-0.5 rounded-full shrink-0" style={{ backgroundColor: ss.dot + "20", color: ss.dot }}>{ss.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {showMilestones && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowMilestones(false)}>
          <div className="bg-[#161118] rounded-xl border border-[#2a2230] w-full max-w-md mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="px-5 py-4 border-b border-[#2a2230] flex items-center justify-between">
              <h3 className="font-bold text-lg">Milestones</h3>
              <button onClick={() => setShowMilestones(false)} className="text-[#8a8a8a] hover:text-white">&times;</button>
            </div>
            <div className="p-5">
              {milestones.length === 0 ? (
                <p className="text-[#8a8a8a] text-center py-4">No milestones set.</p>
              ) : (
                <div className="space-y-3">
                  {milestones.map((ms) => (
                    <div key={ms.id} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${ms.is_paid ? "bg-[#10B981]/10 border-[#10B981]/30" : "bg-[#1e1822] border-[#2a2230] hover:border-[#3a3040]"}`} onClick={() => handleToggleMilestone(ms)}>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${ms.is_paid ? "border-[#10B981] bg-[#10B981]" : "border-[#555]"}`}>
                        {ms.is_paid && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium text-sm ${ms.is_paid ? "line-through text-[#555]" : ""}`}>{ms.label}</div>
                        {ms.due_date && <div className="text-xs text-[#8a8a8a]">{ms.due_date}</div>}
                      </div>
                      <div className={`font-bold text-sm shrink-0 ${ms.is_paid ? "text-[#10B981]" : "text-white"}`}>${ms.amount?.toLocaleString()}</div>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-[#2a2230] flex justify-between text-sm">
                    <span className="text-[#8a8a8a]">Total</span>
                    <span className="font-bold">${milestones.reduce((s, m) => s + (m.amount || 0), 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#10B981]">Paid</span>
                    <span className="font-bold text-[#10B981]">${milestones.filter((m) => m.is_paid).reduce((s, m) => s + (m.amount || 0), 0).toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
