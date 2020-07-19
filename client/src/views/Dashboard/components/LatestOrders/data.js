import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: 'Pollo'
    },
    createdAt: 1555016400000,
    status: 'pendiente'
  },
  {
    id: uuid(),
    ref: 'CDD1048',
    amount: 25.1,
    customer: {
      name: 'Arroz'
    },
    createdAt: 1555016400000,
    status: 'entregado'
  },
  {
    id: uuid(),
    ref: 'CDD1047',
    amount: 10.99,
    customer: {
      name: 'Frijoles'
    },
    createdAt: 1554930000000,
    status: 'pendiente'
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    amount: 96.43,
    customer: {
      name: 'Aceite'
    },
    createdAt: 1554757200000,
    status: 'entregado'
  }
];
