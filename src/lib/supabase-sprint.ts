import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SPARK_SUPABASE_URL ||
  "https://norzjirtcdscycsvnxbm.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SPARK_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5vcnpqaXJ0Y2RzY3ljc3ZueGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMTI5NzMsImV4cCI6MjA4ODU4ODk3M30.ynFOk2VWQIJsBw7cNXfXrnJRkhHOkglCDkzvLcMCxK8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface Project {
  id: string;
  client_name: string;
  project_name: string;
  sprint_label: string;
  start_date: string;
  end_date: string;
  budget: string;
  team: string[];
  accent_color: string;
  created_at: string;
  updated_at: string;
}

export interface SprintWeek {
  id: string;
  project_id: string;
  week_number: number;
  week_label: string;
  sort_order: number;
}

export interface SprintDay {
  id: string;
  week_id: string;
  day_name: string;
  day_date: string;
  phase: string;
  sort_order: number;
}

export interface Task {
  id: string;
  day_id: string;
  owner: string;
  description: string;
  hours: number;
  status: "pending" | "in-progress" | "complete";
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Milestone {
  id: string;
  project_id: string;
  label: string;
  amount: number;
  due_date: string;
  is_paid: boolean;
  sort_order: number;
}

export interface DayWithTasks extends SprintDay {
  tasks: Task[];
}

export interface WeekWithDays extends SprintWeek {
  days: DayWithTasks[];
}

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at");
  if (error) throw error;
  return data ?? [];
}

export async function fetchSprintData(
  projectId: string
): Promise<WeekWithDays[]> {
  const { data: weeks, error: wErr } = await supabase
    .from("sprint_weeks")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order");
  if (wErr) throw wErr;
  if (!weeks || weeks.length === 0) return [];

  const weekIds = weeks.map((w) => w.id);
  const { data: days, error: dErr } = await supabase
    .from("sprint_days")
    .select("*")
    .in("week_id", weekIds)
    .order("sort_order");
  if (dErr) throw dErr;

  const dayIds = (days ?? []).map((d) => d.id);
  const { data: tasks, error: tErr } = await supabase
    .from("tasks")
    .select("*")
    .in("day_id", dayIds)
    .order("sort_order");
  if (tErr) throw tErr;

  const tasksByDay: Record<string, Task[]> = {};
  (tasks ?? []).forEach((t) => {
    if (!tasksByDay[t.day_id]) tasksByDay[t.day_id] = [];
    tasksByDay[t.day_id].push(t as Task);
  });

  const daysByWeek: Record<string, DayWithTasks[]> = {};
  (days ?? []).forEach((d) => {
    if (!daysByWeek[d.week_id]) daysByWeek[d.week_id] = [];
    daysByWeek[d.week_id].push({
      ...(d as SprintDay),
      tasks: tasksByDay[d.id] || [],
    });
  });

  return weeks.map((w) => ({
    ...(w as SprintWeek),
    days: daysByWeek[w.id] || [],
  }));
}

export async function fetchMilestones(
  projectId: string
): Promise<Milestone[]> {
  const { data, error } = await supabase
    .from("milestones")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as Milestone[];
}

export async function cycleTaskStatus(
  taskId: string,
  current: string
): Promise<string> {
  const next =
    current === "pending"
      ? "in-progress"
      : current === "in-progress"
        ? "complete"
        : "pending";
  const { error } = await supabase
    .from("tasks")
    .update({ status: next, updated_at: new Date().toISOString() })
    .eq("id", taskId);
  if (error) throw error;
  return next;
}

export async function toggleMilestonePaid(
  milestoneId: string,
  currentPaid: boolean
): Promise<boolean> {
  const next = !currentPaid;
  const { error } = await supabase
    .from("milestones")
    .update({ is_paid: next })
    .eq("id", milestoneId);
  if (error) throw error;
  return next;
}
