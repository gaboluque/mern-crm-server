import Order from '../../db/models/Order';
import aggregateFetcher, { aggregateStage } from '../common/aggregateFetcher';

export default async () => {
  const sellers = await aggregateFetcher(Order, [
    aggregateStage('match', { status: 'COMPLETED' }),
    aggregateStage('group', {
      _id: '$seller',
      total: { $sum: '$total' },
    }),
    aggregateStage('lookup', {
      from: 'users',
      localField: '_id',
      foreignField: '_id',
      as: 'seller',
    }),
    aggregateStage('limit', 3),
    aggregateStage('sort', { total: -1 }),
  ]);

  return sellers;
};
