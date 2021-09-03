const router = require('express').Router();
const User = require('../models/user');
const logger = require('../config/winston');

//--------------- Static Methods ----------------//
// Create new Users document
router.post('/', async (req, res) => {
    logger.info('POST /users');
    await User.create(req.body)
        .then(user => {
            logger.info('success POST');
            res.json(user);
        })
        .catch(e => {
            logger.error('POST /users');
            logger.error(e.stack);
            res.status(500).send(e);
        });
});

// Find All
router.get('/', async (req, res) => {
    logger.info('GET /users/');
    await Test.findAll()
        .then((users) => {
            if (!users.length) {
                logger.error('no data to GET');
                return res.status(404).send(
                    { err: 'data not found' });
            }
            logger.info('success GET');
            res.json(users);
        })
        .catch(err => {
            logger.error('GET /users/');
            logger.error(err.stack);
            res.status(500).send(err);
        });
});

// Find One by userid
router.get('/userid/:userid', async (req, res) => {
    logger.info(`GET /users/{req.params.userid}`);
    await Test.findOneByTestid(req.params.userid)
        .then((user) => {
            if (!user) {
                logger.error('no data to GET');
                return res.status(404).send(
                    { err: 'Test not found' });
            }
            logger.info('success GET');
            res.json(user);
        })
        .catch(err => {
            logger.error(`GET /users/{req.params.userid}`);
            logger.error(err.stack);
            res.status(500).send(err);
        });
});

// Update by userid
router.put('/userid/:userid', async (req, res) => {
    logger.info(`PUT /users/{req.params.userid}`);
    await Test.updateByTestid(req.params.userid, req.body)
        .then(user => {
            logger.info('success PUT');
            res.json(user);
        })
        .catch(err => {
            logger.error(`PUT /users/{req.params.userid}`);
            logger.error(err.stack);
            res.status(500).send(err);
        });
});

// Delete by userid
router.delete('/userid/:userid', async (req, res) => {
    logger.info(`DELETE /users/{req.params.userid}`);
    await Test.deleteByTestid(req.params.userid)
        .then(() => {
            logger.info('success DELETE');
            res.sendStatus(200);
        })
        .catch(err => {
            logger.error(`DELETE /users/{req.params.userid}`);
            logger.error(err.stack);
            res.status(500).send(err);
        });
});

//----------------- Custom Methods -----------------//
// Get by Contents
router.get('/', async (req, res) => {
    logger.info(`GET /users/{req.params.content}`);
    await Test.findByContents(req.params.content)
        .then(() => {
            logger.info('success GET');
            res.json(user);
        })
        .catch(err => {
            logger.error(`GET /users/{req.params.content}`);
            logger.error(err.stack);
            res.status(500).send(err);
        });
});

// Get by Completed
router.get('/', async (req, res) => {
    logger.info(`GET /users/{req.params.completed}`);
    await Test.findByCompleted(req.params.completed)
        .then(() => {
            logger.info('success GET');
            res.json(user);
        })
        .catch(err => {
            logger.error(`GET /users/{req.params.completed}`);
            logger.error(err.stack);
            res.status(500).send(err);
        });
});


module.exports = router;
