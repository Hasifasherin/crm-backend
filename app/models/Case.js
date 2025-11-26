const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    status: { type: String, enum: ['open', 'in-progress', 'closed'], default: 'open' },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Case', caseSchema);
