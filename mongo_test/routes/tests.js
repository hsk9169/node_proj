const router = require('express').Router();
const Test = require('../models/test');
const logger = require('../config/winston');

// Create new test document
router.post('/', async (req, res) => {
    logger.info('POST /tests/');
    await Test.create(req.body)
        .then(test => {
            logger.info('success POST');
            res.json(test);
        })
        .catch(e => {
            logger.error('POST /tests/');
            logger.error(e.stack);
            res.status(500).send(e);
        });
});

// Find All
router.get('/', async (req, res) => {
    logger.info('GET /tests/');
    await Test.findAll()
        .then((tests) => {
            if (!tests.length) {
                logger.error('no data to GET');
                return res.status(404).send(
                    { err: 'data not found' });
            }
            logger.info('success GET');
            res.json(tests);
        })
        .catch(err => {
            logger.error('GET /tests/');
            logger.error(err.stack);
            res.status(500).send(err);
        });
});

// Find One by testid
router.get('/testid/:testid', async (req, res) => {
    logger.info(`GET /tests/{req.params.testid}`);
    await Test.findOneByTestid(req.params.testid)
        .then((test) => {
            if (!test) {
                logger.error('no data to GET');
                return res.status(404).send(
                    { err: 'Test not found' });
            }
            logger.info('success GET');
            res.json(test);
        })
        .catch(err => {
            logger.error(`GET /tests/{req.params.testid}`);
            logger.error(err.stack);
            res.status(500).send(err);
        });
});

// Update by testid
router.put('/testid/:testid', async (req, res) => {
    logger.info(`PUT /tests/{req.params.testid}`);
    await Test.updateByTestid(req.params.testid, req.body)
        .then(test => {
            logger.info('success PUT');
            res.json(test);
        })
        .catch(err => {
            logger.error(`PUT /tests/{req.params.testid}`);
            logger.error(err.stack);
            res.status(500).send(err);
        });
});

// Delete by testid
router.delete('/testid/:testid', async (req, res) => {
    logger.info(`DELETE /tests/{req.params.testid}`);
    await Test.deleteByTestid(req.params.testid)
        .then(() => {
            logger.info('success DELETE');
            res.sendStatus(200);
        })
        .catch(err => {
            logger.error(`DELETE /tests/{req.params.testid}`);
            logger.error(err.stack);
            res.status(500).send(err);
        });
});

// Get by Contents
router.get('/', async (req, res) => {
    logger.info(`GET /tests/{req.params.content}`);
    await Test.findByContents(req.params.content)
        .then(() => {
            logger.info('success GET');
            res.json(test);
        })
        .catch(err => {
            logger.error(`GET /tests/{req.params.content}`);
            logger.error(err.stack);
            res.status(500).send(err);
        });
});

// Get by Completed
router.get('/', async (req, res) => {
    logger.info(`GET /tests/{req.params.completed}`);
    await Test.findByCompleted(req.params.completed)
        .then(() => {
            logger.info('success GET');
            res.json(test);
        })
        .catch(err => {
            logger.error(`GET /tests/{req.params.completed}`);
            logger.error(err.stack);
            res.status(500).send(err);
        });
});


module.exports = router;
