module.exports = `
  type Query{
    foodItems: [Food]
  }
  type Food{
    name: String!,
    image: [String]!,
    price: Int!
  }
`;
