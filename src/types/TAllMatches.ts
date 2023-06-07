export type TAllMatches={
    logo:string;
    name:string;
    id:string;
    api_id: string; 
    season:string;
    fixtures:{
        home: {
            logo: string;
            name: string;
            id: number;
            api_id: number;
        };
        away: {
            logo: string;
            name: string;
            id: number;
            api_id: number;
        },  
        id: string;
        api_id: string;
        status: string;
        elapsed: 85;
        start_time: string;
        home_goals: 2;
        away_goals: 0;
        home_penalty_goals: number|null;
        away_penalty_goals: number|null;
        live_url: string;
        archive_url: string|null
        }[]
}[]