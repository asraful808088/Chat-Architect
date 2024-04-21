import InputWithSelector from "../inputWithSelector/inputWithselector";
import ItemsSelector from "../itemsSeector/selector";
interface HiddenlayerBuilderProps {
  items: Array;
  onAdd: any;
  onDeleteItem: any;
  onPersepCount: any;
  onPersepCountAdd: any;
  onPersepCountDelete: any;
  l1Itens: Array;
  l2Itens: Array;
  onL1change: any;
  onL1Add: any;
  onL1Delete: any;

  onL2change: any;
  onL2Add: any;
  onL2Delete: any;
  onChangeActivation: any;
  onDropoutDelete:any
  onDropoutChange:any
  onDropoutAdd:any
}
export default function HiddenlayerBuilder(props: HiddenlayerBuilderProps) {
  return (
    <div className="w-full">
      <div className="z-10 relative">
        {" "}
        <ItemsSelector
          items={["lstm", "dropout"]}
          closeSignOff={true}
          displayBoxUpdateClose={true}
          onChange={(name) => {
            if (props.onAdd) {
              props.onAdd(name);
            }
          }}
        />
      </div>
      <div className="w-full relative flex flex-wrap justify-evenly">
        {props.items?.map((element, index) => {
          if (element.type == "lstm") {
            return (
              <ItemForLstm
              no={index+1}
                key={index}
                id={element.id}
                defaultActivation={element.activation}
                persepCountItemslist={element.persep.listOfItems}
                l1Items={element.l1.listOfItems}
                l2Items={element.l2.listOfItems}
                l1ItemsDefault={element.l1.active?element.l1.active:element.l1.default}
                l2ItemsDefault={element.l2.active?element.l2.active:element.l2.default}

              onl1Add={(items)=>{
                if (props.onL1Add) {
                  props.onL1Add({id:element.id,type:"lstm",value:items})
                }
                  
              }}
              onl1Delete={(items)=>{
                if (props.onL1Delete) {
                  props.onL1Delete({id:element.id,type:"lstm",value:items})
                }
              }}

              onl1Change={(value)=>{
                if (props.onL1change) {
                  props.onL1change( {id:element.id,type:"lstm",value:value})
                }
              }}

              onl2Add={(value)=>{
                if (props.onL2Add) {
                  props.onL2Add( {id:element.id,type:"lstm",value:value})
                }
              }}

              onl2Delete={(value)=>{
                if (props.onL2Delete) {
                  props.onL2Delete( {id:element.id,type:"lstm",value:value})
                }
              }}

              onl2Change={(value)=>{
                if (props.onL2change) {
                  props.onL2change( {id:element.id,type:"lstm",value:value})
                }
              }}

              onChangeActivation={(value)=>{
                if (props.onChangeActivation) {
                  props.onChangeActivation( {id:element.id,type:"lstm",value:value})
                }
              }}













                onPersepCount={(value)=>{
                  if (props.onPersepCount) {
                    props.onPersepCount( {id:element.id,type:"lstm",value:value})
                  }
                }}
                onPersepCountAdd={(value)=>{
                  if (props.onPersepCountAdd) {
                    props.onPersepCountAdd({id:element.id,type:"lstm",addPersep:value})
                  }
                }}
                onPersepCountDelete={(value)=>{
                 
                  if (props.onPersepCountDelete) {
                   
                    props.onPersepCountDelete({id:element.id,type:"lstm",delPersep:value})
                  }
                }}
                persepCountItems={
                  element.persep?.active
                    ? element.persep?.active
                    : element.persep?.default

                }
                onDelete={() => {
                 
                  if (props.onDeleteItem) {
                    props.onDeleteItem(element.id);
                  }
                }}
              />
            );
          } else if (element.type == "dropout") {
            return (
              <ItemForDropout
                no={index+1}
                key={index}
                id={element.id}
                defaultValue={element.rate.active?element.rate.active:element.rate.default}
                items={element.rate.listOfItems}
               onChange={(value)=>{
                if (props.onDropoutChange) {
                  props.onDropoutChange({id:element.id,type:"dropout",value:value})

                }
               }}
                addItems={(value)=>{
                  if (props.onDropoutAdd) {
                    props.onDropoutAdd({id:element.id,type:"dropout",value:value})
  
                  }
                }}  
                onSelfDelete={(value)=>{
                  if (props.onDeleteItem) {
                    props.onDeleteItem(element.id);
                  }
                }}
                onDelete={(value) => {
                  
                  if (props.onDropoutDelete) {
                    props.onDropoutDelete({id:element.id,type:"dropout",value:value})

                  }
                }}
              />
            );
          }
          return;
        })}
      </div>
    </div>
  );
}

interface ItemForLstmProps {
  onDelete: any;
  id: string;
  l2Items:Array
  l1Items:Array
  persepCountItems: Array;
  persepCountItemslist: Array;
  l1ItemsDefault: any;
  l2ItemsDefault: any;
  defaultActivation:string
  onPersepCount: any;
  onl1Change: any;
  onl2Change: any;
  onPersepCountAdd: any;
  onl1Add: any;
  onl2Add: any;
  onPersepCountDelete: any;
  onl1Delete: any;
  onl2Delete: any;
  onChangeActivation:any
  no:number

}
function ItemForLstm(props: ItemForLstmProps) {
  return (
    <div className=" relative mx-10 my-4 z-50">
      <div className="text-xs flex justify-between relative w-full items-center">
        <div>Layer - {props.no}</div>
        <div
          className="rotate-45 font-mono font-extrabold text-2xl cursor-pointer"
          onClick={() => {
            if (props.onDelete) {
              props.onDelete(props.id);
            }
          }}
        >
          +
        </div>
      </div>
      <div className="mr-10 my-4 mx-4">
        <div className="text-xs my-4">
          type {"=>"} {"Lstm"}
        </div>
        <div className="text-xs">perceptron-count</div>

        <div className="relative z-[220]">
        <InputWithSelector
          defalutSelector={props.persepCountItems}
          inputTypeInt={true}
          onChange={props.onPersepCount}
          onAddItems={props.onPersepCountAdd}
          onDelete={props.onPersepCountDelete}
          items={props.persepCountItemslist}
          placeholder="number of perceptron"
          
        />
        </div>
        <div className="text-xs">L1</div>
        <div className="relative z-[200]">
        <InputWithSelector
          defalutSelector={props.l1ItemsDefault}
          onChange={props.onl1Change}
          onAddItems={props.onl1Add}
          onDelete={props.onl1Delete}
          items={props.l1Items}

        />
        </div>
        <div className="text-xs">L2</div>
       <div className="relative z-[150]">
       <InputWithSelector
          defalutSelector={props.l2ItemsDefault}
          onChange={props.onl2Change}
          onAddItems={props.onl2Add}
          onDelete={props.onl2Delete}
          items={props.l2Items}
        />
       </div>
        <div className="text-xs">activation-{"(fx)"}</div>
        <ItemsSelector
          items={["tanh", "relu"]}
          defaultValue={props.defaultActivation}
          onChange={props.onChangeActivation}
          closeSignOff={true}
        />
      </div>
    </div>
  );
}
interface ItemForDropoutProps {
  onDelete: any;
  items: Array;
  id: string;
  onDroprateDelete: any;
  addItems: any;
  onChange: any;
  defaultValue:any
  onSelfDelete:any
  no:number
}
function ItemForDropout(props: ItemForDropoutProps) {
  return (
    <div className=" relative mx-10 my-4">
      <div className="text-xs flex justify-between relative w-full items-center">
        <div>Layer - {props.no}</div>
        <div
          className="rotate-45 font-mono font-extrabold text-2xl cursor-pointer"
          onClick={() => {
            if (props.onSelfDelete) {
              props.onSelfDelete(props.id);
            }
          }}
        >
          +
        </div>
      </div>
      <div className="mr-10 my-4">
        <div className="text-xs my-4">
          type {"=>"} {"Dropout"}
        </div>
        <div className="text-xs">drop-rate</div>
        <InputWithSelector
        defalutSelector={props.defaultValue}
          items={props.items}
          onAddItems={props.addItems}
          onDelete={props.onDelete}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}
