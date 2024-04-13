import { TeamMember } from "./team-member"

export interface Mission {
    title: string
    description: string,
    start_date: string ,
    end_date: string,
    all_day: boolean,
    start_hour: string,
    end_hour: string,
    color: string,
    teamMember: TeamMember

}