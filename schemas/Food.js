module.exports = `
  type Query{
    foodItems(page:Int): foodItemResponse,
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
  type foodItemResponse {
    items:[Food],
    totalPages: Int!
  }
`;
