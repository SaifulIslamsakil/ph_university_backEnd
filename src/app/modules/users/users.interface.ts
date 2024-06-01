


export type Tuser = {
    id: string;
    password: string;
    needsPasswordChange: boolean,
    role: "admin" | "faculty" | "student";
    status: "in_progress" | "blocked"
    isDeleted: boolean;
}

export type TnewUser = {
    password: string;
    role: string;
    id:string
}
