'use server';

import { cookies } from 'next/headers';

const COOKIE_NAME = 'knk_admin_session';
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

export async function adminLogin(username, password) {
    const validUser = process.env.ADMIN_USER || 'admin';
    const validPass = process.env.ADMIN_PASS || 'knk@2024';

    if (username === validUser && password === validPass) {
        const cookieStore = await cookies();
        cookieStore.set(COOKIE_NAME, 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: COOKIE_MAX_AGE,
            path: '/',
        });
        return { success: true };
    }

    return { success: false, error: 'Invalid username or password.' };
}

export async function adminLogout() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    return { success: true };
}

export async function checkAuth() {
    const cookieStore = await cookies();
    const session = cookieStore.get(COOKIE_NAME);
    return !!session?.value;
}
