// src/models/Crew.ts
export interface Crew {
    id: number;
    name: string;
    role: 'driver' | 'conductor';
    shiftStart: Date;
    shiftEnd: Date;
    assignedBusId?: number; // Nullable for unlinked duty scheduling
    restPeriods: RestPeriod[];
}

export interface RestPeriod {
    startTime: Date;
    endTime: Date;
}
