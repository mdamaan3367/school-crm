const express = require('express');
const Lead = require('../models/Lead');

const router = express.Router();

/**
 * GET /api/leads
 * Query params:
 *  - status (optional)
 *  - search (optional) -> student/parent/contact
 *  - page (default 1)
 *  - limit (default 10)
 */
router.get('/', async (req, res) => {
  try {
    const {
      status,
      search = '',
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      const regex = new RegExp(search, 'i'); // case-insensitive
      query.$or = [
        { studentName: regex },
        { parentName: regex },
        { contactNumber: regex },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      Lead.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Lead.countDocuments(query),
    ]);

    return res.json({
      data: items,
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    console.error('Error fetching leads:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/leads/:id
 */
router.get('/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json(lead);
  } catch (err) {
    console.error('Error fetching lead:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/leads
 */
router.post('/', async (req, res) => {
  try {
    const {
      studentName,
      parentName,
      contactNumber,
      email,
      classApplyingFor,
      enquirySource,
      status,
      notes,
    } = req.body;

    if (!studentName || !parentName || !contactNumber || !classApplyingFor) {
      return res
        .status(400)
        .json({ message: 'Required fields are missing.' });
    }

    const lead = await Lead.create({
      studentName,
      parentName,
      contactNumber,
      email,
      classApplyingFor,
      enquirySource,
      status,
      notes,
    });

    res.status(201).json(lead);
  } catch (err) {
    console.error('Error creating lead:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * PUT /api/leads/:id
 */
router.put('/:id', async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    Object.assign(lead, req.body);

    const updated = await lead.save();

    res.json(updated);
  } catch (err) {
    console.error('Error updating lead:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
