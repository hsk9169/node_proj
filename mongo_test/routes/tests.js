const router = require('express').Router();
const Test = require('../models/test');
const logger = require('../config/winston');

/**
 * @swagger
 * /tests:
 *  get:
 *      tags:
 *      - test
 *      description: get all test data
 *      
 *      responses:
 *        200:
 *          description: get test data success
 *          content:
 *            application/json:
 *               $ref: '#/components/schemas/Test'
 *
 */

// Create new test document
router.post('/', (req, res) => {
    logger.info('POST /tests/');
    Test.create(req.body)
        .then(test => res.send(test))
        .catch(e => {
            logger.error('POST /tests/');
            logger.error(e.stack);
            res.status(500).send(e)
        });
});

// Find All
router.get('/', (req, res) => {
    logger.info('GET /tests/');
    Test.findAll()
        .then((tests) => {
            if (!tests.length) {
                return res.status(404).send(
                    { err: 'To do not found' });
                logger.error('No data to GET');
            }
            res.send(`find successfully: ${tests}`);
        })
        .catch(err => res.status(500).send(err));
});

// Find One by testid
router.get('/testid/:testid', (req, res) => {
      Test.findOneByTestid(req.params.testid)
        .then((test) => {
                  if (!test) return res.status(404).send(
                      { err: 'Test not found' });
                  res.send(`findOne successfully: ${test}`);
                })
        .catch(err => res.status(500).send(err));
});

// Update by testid
router.put('/testid/:testid', (req, res) => {
    Test.updateByTestid(req.params.testid, req.body)
        .then(test => res.send(test))
        .catch(err => res.status(500).send(err));
});

// Delete by testid
router.delete('/testid/:testid', (req, res) => {
    Test.deleteByTestid(req.params.testid)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
});


module.exports = router;
