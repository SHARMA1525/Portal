const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');

const submitStudentAnswer = async (req, res) => {
    try {
        const { assignmentId, answer } = req.body;
        const studentId = req.user.userId;

        if (!assignmentId || !answer) {
            return res.status(400).json({ message: "Please provide assignmentId and answer." });
        }

        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found." });
        }

        if (assignment.status !== 'Published') {
            return res.status(400).json({ message: "You can only submit answers for Published assignments." });
        }

        const now = new Date();
        const dueDate = new Date(assignment.dueDate);
        if (now > dueDate) {
            return res.status(400).json({ message: "Assignment deadline passed." });
        }

        const existingSubmission = await Submission.findOne({ assignmentId, studentId });
        if (existingSubmission) {
            return res.status(400).json({ message: "Submission already exists." });
        }

        const newSubmission = new Submission({
            assignmentId,
            studentId,
            answer
        });

        await newSubmission.save();

        res.status(201).json({ message: "Answer submitted successfully!", submission: newSubmission });
    } catch (error) {
        console.error("Submit answer error:", error);
        res.status(500).json({ message: "Failed to submit answer." });
    }
};

const getAssignmentSubmissions = async (req, res) => {
    try {
        const { assignmentId } = req.params;

        if (req.user.role === 'teacher') {
            const assignment = await Assignment.findOne({ _id: assignmentId, createdBy: req.user.userId });
            if (!assignment) {
                return res.status(403).json({ message: "Not authorized to view submissions for this assignment." });
            }

            const submissions = await Submission.find({ assignmentId })
                .populate('studentId', 'name')
                .sort({ submittedAt: 1 }); 

            return res.status(200).json(submissions);
        } else {
            const submissions = await Submission.find({ assignmentId, studentId: req.user.userId })
                .populate('studentId', 'name')
                .sort({ submittedAt: 1 });

            return res.status(200).json(submissions);
        }
    } catch (error) {
        console.error("Get submissions error:", error);
        res.status(500).json({ message: "Failed to get submissions." });
    }
};

module.exports = {
    submitStudentAnswer,
    getAssignmentSubmissions
};
