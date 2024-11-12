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