module.exports = `
  type Query{
    foodItems: [Food],
    getFoodItems(name:String!): [Food]
  }
  type Food{
    name: String!,
    image: [String]!,
    subitems:[subItem]!,
    price: Int!
  }
  type subItem{
    name:String!,
    image:String!
  }
`;
