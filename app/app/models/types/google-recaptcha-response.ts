export interface GoogleRecaptchaResponse {
    success: boolean,
    score: number,
    action: string,
    challenge_ts: string,
    hostname: string,
    "error-codes": string[]
}
