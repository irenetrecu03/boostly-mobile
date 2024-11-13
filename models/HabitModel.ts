export interface HabitModel {
    id: number
    name: string
    points: string
    description: string
    days: number[]
}

export function parseDaysToList(daysObject: Record<string, number>): number[] {
    const orderedDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return orderedDays.map(day => daysObject[day] || 0);
}

export function daysSummaryGenerator(days: number[]): string {
    const activeDays = days.filter(day => day === 1).length;

    if (activeDays === 0) {
        return "Never";
    } else if (activeDays === 1) {
        return "1 day";
    } else if (activeDays > 1 && activeDays <= 6) {
        return `${activeDays} days`;
    } 
    
    return "Every day"
}
