const BASE_URL = '/api';

export async function loginUser(email, password) {
    if (!email || !password) {
        throw { response: { data: { message: 'Email and password are required' } } };
    }

    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw { response: { data: { message: data.message || 'Login failed' } } };
        }

        return {
            token: data.token,
            role: data.role,
            email
        };
    } catch (error) {
        if (error.response) {
            throw error;
        }
        throw { response: { data: { message: 'Network error connecting to server' } } };
    }
}
