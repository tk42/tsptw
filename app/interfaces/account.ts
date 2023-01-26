
export enum AccountStatus {
    Expired = 0,
    Bronze = 1,
    Silver = 2,
    Gold = 3,
}

export const AccountStatusName = {
    [AccountStatus.Expired]: 'Expired',
    [AccountStatus.Bronze]: 'Bronze',
    [AccountStatus.Silver]: 'Silver',
    [AccountStatus.Gold]: 'Gold',
}

export const AccountStatusLimit = {
    [AccountStatus.Expired]: 0,
    [AccountStatus.Bronze]: 50,
    [AccountStatus.Silver]: 200,
    [AccountStatus.Gold]: 1000,
}


type Account = {
    id: number
    name: string
    email: string
    organization: string
    picture: string
    status: AccountStatus
    createdAt: string
}

export default Account