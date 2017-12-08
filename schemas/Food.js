module.exports = `
  type Query{
    foodItems: [Food],
    getFoodItems(name:String!): [Food],
    getFoodItemById(id:String!): Food,
    getHotFoodItems: [Food]
  }
  type Food{
    _id: String!,
    name: String!,
    image: [String]!,
    price: Int!,
    description: String,
  }
`;
