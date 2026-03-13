const express = require('express');
const {
    createAssignment,
    getTeacherAssignments,
    updateAssignmentStatus,
    deleteDraftAssignment,
    getPublishedAssignments
} = require('../controllers/assignmentController');

const { verifyToken } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', verifyToken, requireRole('teacher'), createAssignment);

router.get('/', verifyToken, requireRole('teacher'), getTeacherAssignments);

router.patch('/:id/status', verifyToken, requireRole('teacher'), updateAssignmentStatus);

router.delete('/:id', verifyToken, requireRole('teacher'), deleteDraftAssignment);

router.get('/published', verifyToken, requireRole('student'), getPublishedAssignments);

module.exports = router;
