import { TextField } from "@shopify/polaris";
import { PillGroup } from "app/components/pill/group/PillGroup";

const DynamicFields = ({ optionSets }) => {
  return (
    <div>
      {optionSets.map((optionSet) => (
        <div key={optionSet.id} className="option-set">
          <h3>{optionSet.name}</h3>
          {optionSet.options.map((option) => {
            switch (option.type) {
              case "text":
                return (
                  <TextField
                    key={option.id}
                    label={option.label}
                    autoComplete="off"
                  />
                );
              case "email":
                return (
                  <TextField
                    key={option.id}
                    label={option.label}
                    autoComplete="off"
                    type="email"
                  />
                );
              case "radio":
                return (
                  <PillGroup
                    key={option.id}
                    options={option.values.map((value) => ({
                      label: value.title,
                      value: value.title,
                    }))}
                    label={option.label}
                    name={option.label}
                    value={
                      option.values.find((v) => v.defaultValue)?.title || ""
                    }
                  />
                );
              // Ajoutez d'autres types de champs selon vos besoins
              default:
                return null;
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default DynamicFields;
