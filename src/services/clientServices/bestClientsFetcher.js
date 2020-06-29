import Order from '../../db/models/Order';
import aggregateFetcher, { aggregateStage } from '../common/aggregateFetcher';

export default async () => {
  const clients = await aggregateFetcher(Order, [
    aggregateStage('match', { status: 'COMPLETED' }),
    aggregateStage('group', {
      _id: '$client',
      total: { $sum: '$total' },
    }),
    aggregateStage('lookup', {
      from: 'clients',
      localField: '_id',
      foreignField: '_id',
      as: 'client',
    }),
    aggregateStage('limit', 3),
    aggregateStage('sort', { total: -1 }),
  ]);

  return clients;
};
