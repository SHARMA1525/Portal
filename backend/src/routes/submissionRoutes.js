const express = require('express');
const { submitStudentAnswer, getAssignmentSubmissions } = require('../controllers/submissionController');
const { verifyToken } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/', verifyToken, requireRole('student'), submitStudentAnswer);

router.get('/:assignmentId', verifyToken, getAssignmentSubmissions);

module.exports = router;
