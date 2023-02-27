const router = require('express').Router();


const envelopes = [
  { id: 0, title: "Groceries", budget: 250 },
  { id: 1, title: "Dining out", budget: 350 }
];
let nextId = 2;

const getEnvelopeIndex = (id) => {
  return envelopes.findIndex(envelope => envelope.id === id);
};

const removeById = (id) => {
  const index = getEnvelopeIndex(id);
  envelopes.splice(index, 1);
}

router.param('id', (req, res, next, id) => {
  const envelopeId = Number(id);
  const envelope = envelopes.find(envelope => envelope.id === envelopeId);
  if (envelope) {
    req.envelope = envelope
    next();
  } else {
    return res.status(404).send('Id not found');
  }
});

router.get('/', (req, res, next) => {
  res.send(envelopes);
});

router.post('/', (req, res, next) => {
  const { title, budget } = req.body;
  console.log(req.body);
  if (title && budget) {
    const newEnvelope = {
      id: nextId++,
      title,
      budget
    };
    envelopes.push(newEnvelope);
    res.status(201).json({
      created: true,
      envelope: newEnvelope
    });
  } else {
    res.status(404).send('Cannot add envelope.');
  }
});

router.get('/:id', (req, res, next) => {
  res.send(req.envelope);
});

router.delete('/:id', (req, res, next) => {
  const index = getEnvelopeIndex(req.envelope.id);
  envelopes.splice(index, 1);
  res.sendStatus(204);
});

router.put('/:id', (req, res, next) => {
  console.log('id', req.envelope)
  const { title, budget } = req.body;
  const index = getEnvelopeIndex(req.envelope.id);
  if (budget) {
    envelopes[index].budget = budget;
  }
  if (title) {
    envelopes[index].title = title;
  }
  res.status(200).send("Update successful.");
});

router.post('/transfer/:from/:to', (req, res, next) => {
  const { to, from } = req.params;
  const amountToTransfer = req.body.amount;
  const toIndex = getEnvelopeIndex(Number(to));
  const fromIndex = getEnvelopeIndex(Number(from));
  console.log('index', toIndex, fromIndex);
  if (toIndex === -1 || fromIndex === -1) {
    return res.status(404).send('One of the envelopes does not exist.');
  } else {
    const fromBudget = envelopes[fromIndex].budget;
    // const toBudget = envelopes[toIndex].budget;
    // console.log(fromBudget, envelopes[fromIndex]);
    if (fromBudget > amountToTransfer) {
      envelopes[fromIndex].amount -= amountToTransfer;
      envelopes[toIndex].amount += amountToTransfer;
      res.status(201).send('Balance updated successfully.');
    } else {
      res.status(400).send('Amount should be less than from account.');
    }
  }
});


module.exports = router;