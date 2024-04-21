import { useEffect, useState } from "react";
import InputWithSelector from "../inputWithSelector/inputWithselector";
import ItemsSelector from "../itemsSeector/selector";
interface EarlyStopingProps {
  defalutValue: string;
  onActivity: any;
  onChangeOption:any;
  default_restore_best_weights:boolean
  on_restore_best_weights:any
  default_min_deltas:Array
  default_min_deltaItems:Array
  default_patiences:Array
  default_patienceItems:Array
  patienceItemsAdd:any
  patienceItemsDelete:any
  min_deltasAdd:any
  min_deltasDelete:any
  onChange_min_deltas:any
  onChange_patiences:any

}
export default function EarlyStoping(props: EarlyStopingProps) {
  const [activeValue, setAvtiveValue] = useState(null);
  useEffect(() => {
    setAvtiveValue(props.defalutValue ?? null);
  }, [props.defalutValue]);
  return (
    <>
      <div className="relative z-[113]">
      <ItemsSelector
        closeSignOff={true}
        items={["enable", "disable"]}
        defaultValue={activeValue}
        onChange={(value) => {
          if (props.onActivity) {
            props.onActivity(value);
          }
          setAvtiveValue(value);
        }}
      />
      </div>
      {activeValue == "enable" ? (
        <div className="text-xs w-full">
          <div className="relative z-[112]">
          <InputWithSelector defalutSelector={props.default_min_deltas} items={props.default_min_deltaItems}  onAddItems={props.min_deltasAdd} onDelete={props.min_deltasDelete} onChange={props.onChange_min_deltas}    placeholder="min_delta"/>
          </div>
        <div className="relative z-[111]">
        <InputWithSelector defalutSelector={props.default_patiences} items={props.default_patienceItems}  onAddItems={props.patienceItemsAdd}  onDelete={props.patienceItemsDelete}  onChange={props.onChange_patiences} placeholder="patience" />
        </div>
          <div className="w-full text-xs">
            restore_best_weights
          </div>
          <ItemsSelector
            closeSignOff={true}
            items={["enable", "disable"]}
            defaultValue={props.default_restore_best_weights?"enable":"disable"}
            onChange={(value) => {
              if (props.on_restore_best_weights) {
                props.on_restore_best_weights(value);
              }
            }}
          />
        </div>
      ) : null}
    </>
  );
}
