/**
 * Format a date string into a readable format.
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date like "Mar 10, 2026"
 */
export function formatDate(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

/**
 * Check whether a due date has passed.
 * @param {string} dateString - ISO date string
 * @returns {boolean} True if the date is in the past
 */
export function isPastDue(dateString) {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
}

/**
 * Format a date string for an HTML date input value.
 * @param {string} dateString - ISO date string
 * @returns {string} Date in YYYY-MM-DD format
 */
export function toInputDate(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}
