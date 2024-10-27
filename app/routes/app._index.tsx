import {
  type LoaderFunctionArgs,
  json,
  redirect,
  ActionFunctionArgs,
} from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { Page, Layout, BlockStack, Card, EmptyState } from "@shopify/polaris";

import { Table } from "app/components/App/table/Table";
import { Toasty } from "app/components/App/toasty/Toasty";
import { useEffect, useState } from "react";

export const loader = async ({}: LoaderFunctionArgs) => {
  const optionSets = await prisma.optionSet.findMany({
    include: {
      options: {
        include: {
          values: true,
        },
      },
      products: true,
    },
  });
  const optionSetsWithDate = optionSets.map((optionSet) => ({
    ...optionSet,
    createdAt: new Date(optionSet.createdAt),
  }));

  return json({ optionSets: optionSetsWithDate });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const idsToDelete = formData.getAll("ids") as string[];

  await prisma.optionValue.deleteMany({
    where: {
      option: {
        optionSetId: {
          in: idsToDelete,
        },
      },
    },
  });

  await prisma.option.deleteMany({
    where: {
      optionSetId: {
        in: idsToDelete,
      },
    },
  });

  await prisma.optionSet.deleteMany({
    where: {
      id: {
        in: idsToDelete,
      },
    },
  });

  // Redirection vers la page principale après la suppression
  return redirect("/app");
};

export default function Index() {
  const { optionSets } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const [isLoading, setIsLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false); // Gère l'affichage du Toast

  const handleDeleteForms = (ids: string[]) => {
    const formData = new FormData();
    ids.forEach((id) => formData.append("ids", id));

    setIsLoading(true); // Active le loader
    fetcher.submit(formData, { method: "post" });
  };

  useEffect(() => {
    if (fetcher.state === "idle" && isLoading) {
      setIsLoading(false);
      setShowSnackbar(true);
    }
  }, [fetcher.state, isLoading]);

  return (
    <Page
      title="Bienvenue dans Fieldanity"
      primaryAction={{
        content: "Créer un formulaire",
        url: "form/create",
      }}
    >
      <BlockStack>
        <Layout>
          <Layout.Section>
            {optionSets.length ? (
              <Table optionSets={optionSets} onDelete={handleDeleteForms} />
            ) : (
              <Card>
                <EmptyState
                  heading="Vous n'avez aucun template..."
                  action={{
                    content: "Créer un formulaire",
                    url: "form/create",
                  }}
                  image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                >
                  <p>Pourquoi ne pas en créer un dès maintenant ?</p>
                </EmptyState>
              </Card>
            )}
          </Layout.Section>
        </Layout>
      </BlockStack>
      {showSnackbar && <Toasty />}
    </Page>
  );
}
