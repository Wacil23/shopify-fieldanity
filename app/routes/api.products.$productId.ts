import { LoaderFunctionArgs, json } from "@remix-run/node";
import prisma from "../db.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const productId = params.productId;

  // Récupérer les `OptionSet` pour le produit spécifique
  const product = await prisma.product.findUnique({
    where: { productId },
    include: {
      optionSets: {
        include: {
          options: {
            include: {
              values: true,
            },
          },
        },
      },
    },
  });

  if (!product) {
    throw new Response("Produit non trouvé", { status: 404 });
  }

  return json({
    optionSets: product.optionSets,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });
};
