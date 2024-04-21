// import { useState } from "react";
// import { Boxdatatype, defaultValueOfBox } from "./boxdataType";
// import ContainerwithlineDiv from "./containerItensWithlineDiv/containerItemWithDiv";
// interface ContainerBoxProps {
//   lineShow: boolean;
//   intence: Boxdatatype;
//   closeLayer: any;
//   onNewintence: any;
//   convIndex: Array;
//   no: number;
// }
// export default function ContainerBox(props: ContainerBoxProps) {
//   const [items, setItems] = useState<Boxdatatype>(
//     props.intence ?? defaultValueOfBox()
//   );

//   return (
//     <div className="w-fit  relative text-xs text-black ">
//    {console.log(items)}
//       <div className="flex relative  ">
//         <ContainerwithlineDiv
          
//         id={items.id}
//           no={props.no ?? 0}
//           onNewintence={(newValue) => {
            
//             if (props.onNewintence) {
//               props.onNewintence(newValue);
//               setItems({ ...newValue });
//             } else {
//               setItems({ ...newValue });
//             }
//           }}
//           hideAlt={props.intence ? !props.intence.intent : !items.intent}
//           hideDefalut={props.intence ? !props.intence.intent : !items.intent}
//           hideNext={
//             props.intence
//               ? !props.intence.intent && props.intence.nextConv == null
//                 ? true
//                 : props.intence.intent && props.intence.nextConv != null
//                 ? true
//                 : false
//               : !items.intent && items.nextConv == null
//               ? true
//               : items.intent && items.nextConv != null
//               ? true
//               : false
//           }
//           intence={props.intence ?? items}
//           lineDiv={props.lineShow}
//           showSingleLine={props.showSingleLine}
        
//           onAlternative={(value) => {
//             if (value) {
//               if (value == "new alternative") {
//                 const nextItem = defaultValueOfBox();
//                 const newintence = {
//                   ...items,
//                   alterConv: [
//                     ...items.alterConv,
//                     {
//                       ...nextItem,
//                       index: items.index,
//                       type: "new alternative",
                      
//                     },
//                   ],
//                 };
//                 setItems(newintence);
//               } else {
//                 const nextItem = defaultValueOfBox();
//                 const newintence = {
//                   ...items,
//                   alterConv: [
//                     ...items.alterConv,
//                     {
//                       ...nextItem,
//                       index: items.index,
//                       responseType:value,
//                       prefixfunc:{name:items.prefixfunc.name,setValue:value},
//                       type: "alternativse",
//                       intent: items.intent,
//                     },
//                   ],
//                 };
                
//                 setItems(newintence);
//               }
//             } else {
//               const nextItem = defaultValueOfBox();
//               const newintence = {
//                 ...items,
//                 alterConv: [
//                   ...items.alterConv,
//                   {
//                     ...nextItem,
//                     index: items.index,
//                     type: "alternatisve",
//                     intent:  items.intent,
//                   },
//                 ],
//               };
//               setItems(newintence);
//             }
//           }}
//           onCross={() => {
//             if (props.closeLayer) {
//               props.closeLayer();
//             }
//           }}
//           onDefaultAlternative={() => {}}
//           onNext={() => {
//             const nextItem = defaultValueOfBox();
//             const newintence = {
//               ...items,
//               nextConv: {
//                 ...nextItem,
//                 index: items.index + 1,
//                 type: "next-conversition",
//               },
//             };

//             setItems(newintence);
//           }}
//         />
//         {items.nextConv ? (
//           <ContainerBox
//             onNewintence={(value) => {
//               const newIntence = {
//                 ...items,
//                 nextConv: value,
//               };

//               if (props.onNewintence) {
//                 props.onNewintence(newIntence);
//                 setItems(newIntence);
//               } else {
//                 setItems(newIntence);
//               }
//             }}
//             lineShow={true}
//             intence={items.nextConv}
//             closeLayer={() => {
//               setItems({ ...items, nextConv: null });
//             }}
//           />
//         ) : null}
//       </div>
//       <div >
//         {items.alterConv?.map((element, index) => {
//           return (
//             <div key={index}>
//               <div className="my-10 border-b-2 border-black border-dashed av flex-grow"></div>
//               <div className=" relative h-full ml-20">
//                 <ContainerBox
//                   lineShow={element.index != 0}
//                   intence={element}
//                   no={index}
//                   closeLayer={()=>{
//                     const modifyListofItems = items.alterConv?.filter((element2,index)=>element2.id!=element.id)
//                     const newIntence = {...items,alterConv:modifyListofItems}
//                     console.log(newIntence)
//                     if (props.onNewintence) {
//                       props.onNewintence(newIntence)
//                       setItems(newIntence)

//                     }else{
//                       setItems(newIntence)
//                     }
//                   }}
//                   onNewintence={(intence)=>{
//                     const modifyListofItems = items.alterConv?.map((element,index)=>{
//                           if (element.id==intence.id) {
//                               return intence
//                           }
//                           return element
//                     })
                    
//                     const newIntence = {...items,alterConv:modifyListofItems}
//                     if (props.onNewintence) {
//                       props.onNewintence(newIntence)
//                       setItems(newIntence)

//                     }else{
//                       setItems(newIntence)
//                     }
                      
//                   }}
//                 />
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
