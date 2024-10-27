export type ProductType = {
  id: string;
  title: string;
  handle: string;
  media: {
    nodes: {
      preview: {
        image: {
          altText: string;
          id: string;
          url: string;
        };
      };
    }[];
  };
  selected: boolean;
};
