import { useLoaderData, Form } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import prisma from "../db.server";
import { json } from "@remix-run/node";
import { Page, Layout, TextField, Card, List, Text } from "@shopify/polaris";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const form = await prisma.form.findUnique({
    where: { id: params.formId },
    include: { fields: true },
  });

  if (!form) {
    throw new Response("Formulaire introuvable", { status: 404 });
  }

  return json({ form });
};

export default function FormPage() {
  const { form } = useLoaderData();

  return (
    <Page title={`Formulaire : ${form.title}`}>
      <Layout>
        <Layout.Section>
          <Card>
            <Text as="h3">{form.title}</Text>

            <Form method="post">
              {/* Ajout des champs ici */}
              <List>
                {form.fields.map((field) => (
                  <List.Item key={field.id}>
                    <TextField
                      label={field.label}
                      type={field.type === "text" ? "text" : "radio"}
                    />
                  </List.Item>
                ))}
              </List>
            </Form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
