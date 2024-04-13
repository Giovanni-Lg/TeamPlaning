export interface Mission {
    id: number
    title: string
    description: string
    start_date: string
    end_date: string
    team_id: number,

    all_day: boolean,
    start_hour : string,
    end_hour: string,

    color : string,

}