import axios from "axios";

export type VisitDayPoint = {
    date: string;
    uniques: number;
};

export type VisitStats = {
    today: number;
    last_7d: number;
    last_30d: number;
    series: VisitDayPoint[];
};

export const emptyVisitStats: VisitStats = {
    today: 0,
    last_7d: 0,
    last_30d: 0,
    series: [],
};

export default function visitService() {
    const getVisitStats = async (): Promise<VisitStats> => {
        const response = await axios.get<VisitStats>('/api/admin/visits/stats');
        return response.data;
    }

    return { getVisitStats };
}
