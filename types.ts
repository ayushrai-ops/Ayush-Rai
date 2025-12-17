export interface CelebrationConfig {
    message: string;
    dateIdea: string;
}

export enum AppState {
    ASKING = 'ASKING',
    SUCCESS = 'SUCCESS',
    LOADING_AI = 'LOADING_AI'
}