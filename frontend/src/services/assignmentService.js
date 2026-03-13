const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    };
};

export async function getAssignments() {
    const response = await fetch(`${BASE_URL}/assignments`, {
        headers: getHeaders()
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to get assignments');
    return data;
}

export async function getPublishedAssignments() {
    const response = await fetch(`${BASE_URL}/assignments/published`, {
        headers: getHeaders()
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to get published assignments');
    return data;
}

export async function createAssignment(assignment) {
    const response = await fetch(`${BASE_URL}/assignments`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(assignment)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create assignment');
    return data.assignment;
}

export async function updateAssignmentStatus(id, status) {
    const response = await fetch(`${BASE_URL}/assignments/${id}/status`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ status })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update assignment status');
    return data.assignment;
}

export async function deleteAssignment(id) {
    const response = await fetch(`${BASE_URL}/assignments/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to delete assignment');
    return data;
}

export async function getAssignmentById(id) {
    let assignments = [];
    const role = localStorage.getItem('role');

    if (role === 'teacher') {
        assignments = await getAssignments();
    } else {
        assignments = await getPublishedAssignments();
    }

    const assignment = assignments.find(a => a._id === id);
    if (!assignment) throw new Error('Assignment not found');
    return assignment;
}
