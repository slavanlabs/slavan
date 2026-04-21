"use client";

import { Member, Project } from "@/generated/prisma/client";
import { useAgency } from "@/store/useAgency";
import { useEffect } from "react";

interface AgencyStoreHydratorProps {
  agency: {
    id: string;
    name: string;
    createdAt: Date;
    userId: string;
    projects: Project[];
    members: Member[];
  } | null;
}
export const AgencyStoreHydrator = ({ agency }: AgencyStoreHydratorProps) => {
  const setAgency = useAgency((state) => state.setAgency);
  const setProjects = useAgency((state) => state.setProjects);
  const setMembers = useAgency((state) => state.setMembers);

  useEffect(() => {
    if (agency) {
      setAgency({
        id: agency.id,
        name: agency.name,
        createdAt: agency.createdAt,
        userId: agency.userId,
      });
      setProjects(agency.projects);
      setMembers(agency.members);
    }
  }, []);

  return null;
};
