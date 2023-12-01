/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProjects = /* GraphQL */ `
  query GetProjects($id: ID!) {
    getProjects(id: $id) {
      id
      title
      description
      problem_statement
      solution
      solution_diagram
      demourl
      services_used
      tags
      isdisabled
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        problem_statement
        solution
        solution_diagram
        demourl
        services_used
        tags
        isdisabled
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
