const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  emailNewsletter(input: EmailNewsletterQueryInput!): EmailNewsletter @findOne(model: "platform.Product", using: { id: "_id" }, criteria: "emailNewsletter")
  emailNewsletters(input: EmailNewslettersQueryInput = {}): EmailNewsletterConnection! @findMany(model: "platform.Product", criteria: "emailNewsletter")
}

type EmailNewsletter {
  # fields from platform.model::Product
  id: ObjectID! @value(localField: "_id")
  type: String!
  name: String
  fullName: String
  tagLine: String
  description: String
  logo: String

  # fields from platform.trait::StatusEnabled
  status: Int

  # fields from email.model::Product
  provider: EmailProductStubProvider
  sourceProvider: EmailProductStubHtmlSourceProvider
  defaultTesters: [EmailCampaignTestRecipient]! @arrayValue
  defaultFromName: String
  defaultSubjectLine: String

  # fields directly on email.model::Product\Newsletter
  parent(input: EmailNewsletterParentInput = {}): EmailNewsletter @refOne(model: "platform.Product", criteria: "emailNewsletter")
  sections(input: EmailNewsletterSectionsInput = {}): EmailSectionConnection! @refMany(model: "email.Section", localField: "_id", foreignField: "deployment.$id")
  alias: String
  usesDeploymentDates: Boolean
  teaser: String
}

type EmailNewsletterConnection {
  totalCount: Int!
  edges: [EmailNewsletterEdge]!
  pageInfo: PageInfo!
}

type EmailNewsletterEdge {
  node: EmailNewsletter!
  cursor: String!
}

type EmailProductStubProvider {
  type: String
  providerId: String
  attributes: JSON
}

type EmailProductStubHtmlSourceProvider {
  handlerKey: String
  host: String
  path: String
}

enum EmailNewsletterSortField {
  id
  name
  fullName
}

input EmailNewsletterQueryInput {
  id: ObjectID!
  status: ModelStatus = active
}

input EmailNewslettersQueryInput {
  status: ModelStatus = active
  sort: EmailNewsletterSortInput = {}
  pagination: PaginationInput = {}
}

input EmailNewsletterParentInput {
  status: ModelStatus = active
}

input EmailNewsletterSectionsInput {
  status: ModelStatus = active
  sort: EmailSectionSortInput = {}
  pagination: PaginationInput = {}
}

input EmailNewsletterSortInput {
  field: EmailNewsletterSortField = id
  order: SortOrder = desc
}

`;