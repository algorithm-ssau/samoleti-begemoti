export interface UserClaim {
    user_id: string;
    email: string;
}

export declare global {
    namespace Express {
        export interface Request {
            claim?: UserClaim;
        }
    }
}
