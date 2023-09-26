const express = require('express');
const { body, param, query } = require('express-validator');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Validation middleware
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({ errors: errors.array() });
  };
};

// Validation rules for create and update endpoints
const createOrUpdateValidationRules = [
  body('title').isString().notEmpty(),
  body('description').optional().isString(),
  body('status').isIn(['open', 'inprogress', 'completed']).notEmpty(),
];

// Validation rule for pagination
const paginationValidationRules = [
  query('page').isInt({ min: 1 }).optional(),
  query('pageSize').isInt({ min: 1, max: 100 }).optional(),
];

router.post('/', createOrUpdateValidationRules, validate(createOrUpdateValidationRules), taskController.createTask);
router.put('/:id', param('id').isInt(), createOrUpdateValidationRules, validate(createOrUpdateValidationRules), taskController.updateTask);
router.get('/', paginationValidationRules, validate(paginationValidationRules), taskController.getAllTasks);
router.get('/metrics', taskController.getTaskMetrics);

module.exports = router;
