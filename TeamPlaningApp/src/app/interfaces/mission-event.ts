import { TeamMember } from "./team-member";

export interface MissionEvent {
    title: string;
    description: string;
    start: string | Date;
    end: string | Date;
    editable: boolean;
    allDay: boolean;
    backgroundColor: string;

    teamMember: TeamMember;
}

