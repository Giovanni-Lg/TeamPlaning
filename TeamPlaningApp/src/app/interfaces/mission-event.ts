import { Team } from "./team";

export interface MissionEvent {
    title: string;
    description: string;
    start: string | Date;
    end: string | Date;
    editable: boolean;
    allDay: boolean;
    backgroundColor: string;

    teamMember: Team;
}

