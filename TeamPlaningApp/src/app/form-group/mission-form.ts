import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Mission } from "../interfaces/mission";


export class MissionFormGroup extends FormGroup {
    constructor(mission?: Mission) {
        super({
            id: new FormControl(''),
            title: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),

            start_date: new FormControl('', [Validators.required]),
            end_date: new FormControl('', [Validators.required]),

            all_day: new FormControl('', [Validators.required]),
            start_hour: new FormControl('', [Validators.required]),
            end_hour: new FormControl('', [Validators.required]),

            team_id: new FormControl('', [Validators.required]),
        });

        // Patch values using provided data
        if (mission) {
            this.patchValue(mission);
        }
    }

    public get title() {
        return this.get('title');
    }

    public get description() {
        return this.get('description');
    }

    public get start_date() {
        return this.get('start_date');
    }

    public get end_date() {
        return this.get('end_date');
    }

    public get team_id() {
        return this.get('team_id');
    }

    public get all_day() {
        return this.get('all_day');
    }

    public get start_hour() {
        return this.get('start_hour');
    }

    public get end_hour() {
        return this.get('end_hour');
    }
}
