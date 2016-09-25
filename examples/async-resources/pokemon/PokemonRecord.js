import { Record } from 'immutable';

const Shape = { id: '', name: '', weight: 0 };

export class Pokemon extends Record(Shape) {}
