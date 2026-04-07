import { cookies } from 'next/headers';

export async function getAuthorizationHeaders() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    
    if (accessToken) {
        return {
            Authorization: `Bearer ${accessToken}`,
        };
    }
    return {};
}