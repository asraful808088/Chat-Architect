import TextItem from "../textItems/textItems";

interface ItemsLoaderProps {
  textModifyOff: boolean;
  items: Array;
  onNewintence: any;
  onDelete:any
}
export default function ItemsLoader(props: ItemsLoaderProps) {
  return (
    <div className="w-full py-2 my-2 max-h-[700px] overflow-y-auto flex flex-wrap justify-between text-ellipsis">
      {props.items?.map((element, index) => {
        return (
          <TextItem
          defaultOptions={element.defaultOptions}
          onUpdateDefaultoptions={(value)=>{
            const updateItems = props.items?.map((element2) => {
              if (element2.id == element.id) {
                return {
                  ...element2,
                  defaultOptions: value,
                };
              }
              return element2;
            });
            if (props.onNewintence) {
              props.onNewintence(updateItems);
            }
          }}
          syn={element.syn??[]}
          onUpdateSyn={(value)=>{
            const updateItems = props.items?.map((element2) => {
              if (element2.id == element.id) {
                return {
                  ...element2,
                  syn: value,
                };
              }
              return element2;
            });
            if (props.onNewintence) {
              props.onNewintence(updateItems);
            }
          }}
            onDelete={() => {
              if (props.onDelete) {
                props.onDelete(element)
              }
              const updateItems = props.items?.filter((element2) => element2.id!=element.id);
              if (props.onNewintence) {
                props.onNewintence(updateItems);
              }
            }}
            options={element.option}
            text={element.text}
            initUrls={element.imageUrls ?? []}
            textModifyOff={props.textModifyOff}
            onImageUrls={() => {}}
            key={index}
            onUpdateOption={(value) => {
              const updateItems = props.items?.map((element2) => {
                if (element2.id == element.id) {
                  return {
                    ...element2,
                    option: value,
                  };
                }
                return element2;
              });
              if (props.onNewintence) {
                props.onNewintence(updateItems);
              }
            }}
          />
        );
      })}
    </div>
  );
}
