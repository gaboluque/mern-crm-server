export const aggregateStage = (stage, query) => ({
  [`$${stage}`]: query,
});

export default async (model, aggregations) => {
  const result = await model.aggregate(aggregations);
  return result;
};
