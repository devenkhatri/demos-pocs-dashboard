import { Heading, Card } from "@aws-amplify/ui-react";

export default function App1({title}) {
  return (
    <Card variation="elevated">
      <Heading level={3}>Project {title}</Heading>
    </Card>
  );
}