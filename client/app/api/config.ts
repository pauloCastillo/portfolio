import axios from "axios";

export const api = axios.create({
    baseURL:`${process.env.NEXT_PUBLIC_BASE_URL}`,
    // 10s: margen para arranques en frío del backend; el upload de
    // imagen usa un timeout propio mayor (ver upload/image/route.ts).
    timeout:10000,
    withCredentials: true
})