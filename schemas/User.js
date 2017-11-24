module.exports = `
type User{
  _id: String!,
  name: String!,
  email: String!,
  phn: Float!,
  address: String!
}
type Query{
  getUserById(id:String!): User!,
}

type Error{
  message: String!,
  path:String!
}

type RegisterResponse {
  ok: Boolean!
  user: User
  errors: Error
}

type LoginResponse {
  ok: Boolean!
  token: String
  refreshToken: String
  errors: [Error!]
}

type Mutation {
  createUser(email: String!, name: String!, password: String!, phn: Float!, address: String!): RegisterResponse!
  loginUser(email:String!, password:String!): LoginResponse!
}

`;
