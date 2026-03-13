const Assignment = require('../models/Assignment');
const createAssignment = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
        if (!title || !description || !dueDate) {
            return res.status(400).json({ message: "Please provide title, description, and dueDate." });
        }
        const newAssignment = new Assignment({
            title,
            description,
            dueDate,
            createdBy: req.user.userId
        });

        await newAssignment.save();

        res.status(201).json({ message: "Assignment created successfully as a Draft.", assignment: newAssignment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create assignment." });
    }
};

const getTeacherAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ createdBy: req.user.userId })
            .sort({ createdAt: -1 });

        res.status(200).json(assignments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get assignments." });
    }
};

const updateAssignmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const allowedStatuses = ['Draft', 'Published', 'Completed'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value." });
        }

        const assignment = await Assignment.findOne({ _id: id, createdBy: req.user.userId });

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found." });
        }
        assignment.status = status;
        await assignment.save();

        res.status(200).json({ message: `Assignment status updated to ${status}.`, assignment });
    } catch (error) {
        console.error("Update status error:", error);
        res.status(500).json({ message: "Failed to update assignment status." });
    }
};
const deleteDraftAssignment = async (req, res) => {
    try {
        const { id } = req.params;

        const assignment = await Assignment.findOne({ _id: id, createdBy: req.user.userId });

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found." });
        }
        if (assignment.status !== 'Draft') {
            return res.status(400).json({ message: "You can only delete assignments that are in Draft status." });
        }

        await Assignment.findByIdAndDelete(id);

        res.status(200).json({ message: "Assignment successfully deleted.", id });
    } catch (error) {
        console.error("Delete assignment error:", error);
        res.status(500).json({ message: "Failed to delete assignment." });
    }
};

const getPublishedAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ status: 'Published' })
            .populate('createdBy', 'name')
            .sort({ dueDate: 1 });

        res.status(200).json(assignments);
    } catch (error) {
        console.error("Get published assignments error:", error);
        res.status(500).json({ message: "Failed to fetch published assignments." });
    }
};

module.exports = {
    createAssignment,
    getTeacherAssignments,
    updateAssignmentStatus,
    deleteDraftAssignment,
    getPublishedAssignments,
};
