// Dans app/save.tsx
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import prisma from "../db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const optionSetData = JSON.parse(formData.get("optionSetData") as string);
  console.log("optionSetData", optionSetData);
  // Créer un nouvel OptionSet ou mettre à jour un existant
  if (optionSetData.id) {
    await prisma.optionSet.upsert({
      where: { id: optionSetData.id },
      update: {
        name: optionSetData.name,
        required: optionSetData.required,
        nickname: optionSetData.nickname,
        description: optionSetData.description,
        inCartName: optionSetData.inCartName,
        products: {
          create: optionSetData.products.map((product: any) => ({
            productId: product.productId, // Connexion via productId unique
          })),
        },
        options: {
          deleteMany: {}, // Supprime les options existantes
          create: optionSetData.options.map((option: any) => ({
            label: option.label,
            type: option.type,
            cartName: option.cartName,
            values: {
              create: option.values?.map((value: any) => ({
                title: value.title,
                addOnPrice: value.addOnPrice,
                defaultValue: value.defaultValue,
              })),
            },
          })),
        },
      },
      create: {
        name: optionSetData.name,
        required: optionSetData.required,
        nickname: optionSetData.nickname,
        description: optionSetData.description,
        inCartName: optionSetData.inCartName,
        products: {
          connect: optionSetData.products.map((product: any) => ({
            productId: product.productId,
          })),
        },
        options: {
          create: optionSetData.options.map((option: any) => ({
            label: option.label,
            type: option.type,
            cartName: option.cartName,
            values: {
              create: option.values?.map((value: any) => ({
                title: value.title,
                addOnPrice: value.addOnPrice,
                defaultValue: value.defaultValue,
              })),
            },
          })),
        },
      },
    });
  } else {
    await prisma.optionSet.create({
      data: {
        name: optionSetData.name,
        required: optionSetData.required,
        nickname: optionSetData.nickname,
        description: optionSetData.description,
        inCartName: optionSetData.inCartName,
        products: {
          create: optionSetData.products.map((product: any) => ({
            productId: product.productId,
          })),
        },
        options: {
          create: optionSetData.options.map((option: any) => ({
            label: option.label,
            type: option.type,
            cartName: option.cartName,
            values: {
              create: option.values?.map((value: any) => ({
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

  return redirect("/app");
};
