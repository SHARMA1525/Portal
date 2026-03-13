const BASE_URL = '/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    };
};

export async function submitAnswer(assignmentId, answer) {
    const response = await fetch(`${BASE_URL}/submissions`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ assignmentId, answer })
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to submit answer');
    }
    return data.submission;
}

export async function getSubmissions(assignmentId) {
    const response = await fetch(`${BASE_URL}/submissions/${assignmentId}`, {
        headers: getHeaders()
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Failed to get submissions');
    }
    return data;
}
