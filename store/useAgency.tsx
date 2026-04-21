import { Agency, Member, Project } from "@/generated/prisma/client";
import { create } from "zustand";

//  Need to store Highlevel Agency details
// Need to store projects
// Need to store members

interface AgenyStore {
  agency: Agency | null;
  projects: Project[];
  members: Member[];

  setAgency: (agency: Agency) => void;
  setProjects: (projects: Project[]) => void;
  setMembers: (members: Member[]) => void;

  addProject: (project: Project) => void;
  removeProject: (project: Project) => void;

  reset: () => void;
}

export const useAgency = create<AgenyStore>((set, get) => ({
  agency: null,
  projects: [],
  members: [],

  setAgency: (agency: Agency) => set({ agency }),
  setProjects: (projects: Project[]) => set({ projects }),
  setMembers: (members: Member[]) => set({ members }),

  addProject: (project: Project) =>
    set({ projects: [...get().projects, project] }),
  removeProject: (project: Project) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== project.id),
    })),

  reset: () => set({ agency: null, projects: [], members: [] }),
}));
