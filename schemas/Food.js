module.exports = `
  type Query{
    foodItems: [Food],
    getFoodItems(name:String!): [Food],
    getFoodItemById(id:String!): Food
  }
  type Food{
    name: String!,
    image: [String]!,
    price: Int!
  }
`;
