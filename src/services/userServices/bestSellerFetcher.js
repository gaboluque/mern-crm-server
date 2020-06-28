import Order from '../../db/models/Order';

export default async () => {
  const sellers = await Order.aggregate([
    { $match: { status: 'COMPLETED' } },
    {
      $group: {
        _id: '$seller',
        total: { $sum: '$total' },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'seller',
      },
    },
    {
      $limit: 3,
    },
    {
      $sort: { total: -1 },
    },
  ]);

  return sellers;
};
