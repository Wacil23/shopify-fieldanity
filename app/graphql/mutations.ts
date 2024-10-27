// Ex: app/graphql/mutations.ts
import prisma from "../db.server"; // Assurez-vous d'importer votre instance Prisma

export async function createOrUpdateOptionSet(data: {
  id?: string;
  name: string;
  required: boolean;
  nickname?: string;
  description?: string;
  inCartName?: string;
  products: { productId: string; title: string }[];
  options: {
    label: string;
    type: string;
    cartName?: string;
    values?: { title: string; addOnPrice?: number; defaultValue?: boolean }[];
  }[];
}) {
  return prisma.optionSet.upsert({
    where: { id: data.id || "" },
    update: {
      name: data.name,
      required: data.required,
      nickname: data.nickname,
      description: data.description,
      inCartName: data.inCartName,
      products: {
        connectOrCreate: data.products.map((product) => ({
          where: { id: product.productId },
          create: {
            productId: product.productId,
            title: product.title,
          },
        })),
      },
      options: {
        deleteMany: {}, // Supprime les options existantes avant d'ajouter les nouvelles
        create: data.options.map((option) => ({
          label: option.label,
          type: option.type,
          cartName: option.cartName,
          values: {
            create: option.values?.map((value) => ({
              title: value.title,
              addOnPrice: value.addOnPrice,
              defaultValue: value.defaultValue,
            })),
          },
        })),
      },
    },
    create: {
      name: data.name,
      required: data.required,
      nickname: data.nickname,
      description: data.description,
      inCartName: data.inCartName,
      products: {
        connectOrCreate: data.products.map((product) => ({
          where: { id: product.productId },
          create: {
            productId: product.productId,
            title: product.title,
          },
        })),
      },
      options: {
        create: data.options.map((option) => ({
          label: option.label,
          type: option.type,
          cartName: option.cartName,
          values: {
            create: option.values?.map((value) => ({
              title: value.title,
              addOnPrice: value.addOnPrice,
              defaultValue: value.defaultValue,
            })),
          },
        })),
      },
    },
  });
}
