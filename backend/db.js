const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://gokulyadav:fIqcyJKi99bExcWw@cluster0.zv4aswl.mongodb.net/ca_proj")


// User Schema
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['ca', 'client'], required: true }
});
const User = mongoose.model('User', userSchema);

// Client Schema
const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Client = mongoose.model('Client', clientSchema);

// Document Schema
const documentSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  filename: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});
const Document = mongoose.model('Document', documentSchema);

// Invoice Schema
const invoiceSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  amount: { type: Number, required: true },
  description: String,
  date: { type: Date, default: Date.now }
});
const Invoice = mongoose.model('Invoice', invoiceSchema);

// Compliance Schema
const complianceSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  dueDate: { type: Date, required: true },
  type: { type: String, required: true },
  note: String
});
const Compliance = mongoose.model('Compliance', complianceSchema);


module.exports = {
  User,
  Client,
  Document,
  Invoice,
  Compliance
};
