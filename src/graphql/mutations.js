/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProjects = /* GraphQL */ `
  mutation CreateProjects(
    $input: CreateProjectsInput!
    $condition: ModelProjectsConditionInput
  ) {
    createProjects(input: $input, condition: $condition) {
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
export const updateProjects = /* GraphQL */ `
  mutation UpdateProjects(
    $input: UpdateProjectsInput!
    $condition: ModelProjectsConditionInput
  ) {
    updateProjects(input: $input, condition: $condition) {
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
export const deleteProjects = /* GraphQL */ `
  mutation DeleteProjects(
    $input: DeleteProjectsInput!
    $condition: ModelProjectsConditionInput
  ) {
    deleteProjects(input: $input, condition: $condition) {
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
