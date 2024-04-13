import { Team } from "./team"

export interface Mission {
    id: number
    title: string
    description: string
    start_date: string
    end_date: string
    all_day: boolean,
    start_hour: string,
    end_hour: string,
    color: string,

    teamMember: Team

}