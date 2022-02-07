

enum WeekDays {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}

export enum Currency {
    Euro = '€',
}

export enum Distance {
    Meters = 'm',
}

export enum WoltSurcharge {
    FreeDeliveryCartValue = 100,
    MinumumFreeCartValue = 10, //euro
    MaximumSurchargeFreeDistanceCovered = 500, //in metres
    MaximumSurchargeFreeItems = 4,
    SurchargeOnExtraItem = 0.50, //cents
    RushHoursDay = WeekDays.Friday,
    RushHoursStartTime = 15, //24 hour time format
    RushHoursEndTime = 19, //24 hour time format
    SurchargeOnRushHours = 1.1, //euro
    MaximumDeliveryFee = 15, //euro
}