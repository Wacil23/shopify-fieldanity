import {
  Text,
  IndexTable,
  Card,
  useIndexResourceState,
  useBreakpoints,
} from "@shopify/polaris";
import { useNavigate } from "@remix-run/react";
import { DeleteIcon } from "@shopify/polaris-icons";

// Type pour représenter les OptionSets avec les options associées
type OptionSetWithOptions = {
  id: string;
  name: string;
  createdAt: Date;
  options: {
    id: string;
    label: string;
    type: string;
    values?: {
      id: string;
      title: string;
      addOnPrice: number;
      defaultValue: boolean;
    }[];
  }[];
};

type TablesProps = {
  optionSets: OptionSetWithOptions[];
  onDelete: (ids: string[]) => void; // Fonction pour supprimer les OptionSets
};

export const Table: React.FC<TablesProps> = ({ optionSets, onDelete }) => {
  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection,
  } = useIndexResourceState(optionSets); // Utilisation du hook avec les OptionSets

  const resourceName = {
    singular: "option set",
    plural: "option sets",
  };

  const navigate = useNavigate();

  // Actions de suppression en masse
  const promotedBulkActions = [
    {
      content: "Supprimer",
      icon: DeleteIcon,
      destructive: true,
      onAction: () => handleDeleteSelection(),
    },
  ];

  // Fonction pour gérer la suppression des éléments sélectionnés
  const handleDeleteSelection = () => {
    if (selectedResources.length > 0) {
      onDelete(selectedResources as string[]);
      clearSelection(); // On désélectionne après la suppression
    }
  };

  // Création du marquage des lignes du tableau
  const rowMarkup = optionSets.map(
    ({ id, name, createdAt, options }, index) => {
      const time = new Date(createdAt);
      const formattedDate = time
        .toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace(" ", " à ");

      return (
        <IndexTable.Row
          id={id}
          key={id}
          selected={selectedResources.includes(id)}
          position={index}
          onClick={() => navigate(`/option-set/edit/${id}`)} // Redirection vers la page d'édition
        >
          <IndexTable.Cell>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              {name}
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>{options.length}</IndexTable.Cell>
          <IndexTable.Cell>
            <Text as="p">{formattedDate}</Text>
          </IndexTable.Cell>
        </IndexTable.Row>
      );
    },
  );

  return (
    <Card>
      <IndexTable
        condensed={useBreakpoints().smDown}
        resourceName={resourceName}
        itemCount={optionSets.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          { title: "Nom du set d'options" },
          { title: "Nombre d'options" },
          { title: "Créé le" },
        ]}
        promotedBulkActions={promotedBulkActions} // Ajout de l'action "Supprimer"
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
};
