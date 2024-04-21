import CloseIcon from "@/assets/svg/close.svg";
import HeaderIcon from "@/assets/svg/header-svgrepo-com.svg";
import ImageIcon from "@/assets/svg/image-pen-svgrepo-com.svg";
import TextIcon from "@/assets/svg/text.svg";
import TaskIcon from "@/assets/svg/work-experience-icon.svg";
import { useEffect, useState } from "react";
import { uuid } from "uuidv4";
import ItemIndicator from "../../scripts/box/itemIndicator/items";
import ResIcon from '@/assets/svg/response.svg'
interface ResponseCardProps {
  onNewintence:any
  items:Array
  onDelete:any
}
export default function ResponseCard(props: ResponseCardProps) {
  const [components, setComponents] = useState([]);
  useEffect(()=>{
    setComponents(props.items??[])
  },[props.items])
  return (
    <div className="w-[400px] h-fit bg-slate-200 m-2 p-2 shadow-2xl rounded-md">
     
      <div className="w-full relative flex justify-end">
        <div className="h-8 w-8 relative p-1 cursor-pointer" onClick={()=>{
          if (props.onDelete) {
            props.onDelete()
          }
        }}>
          <CloseIcon />
        </div>
      </div>
      <div className="w-full relative text-black flex">
        <div
          className="mx-2 cursor-pointer"
          onClick={() => {
            const newIntence = [...components, { type: "text", items: [],id:uuid() ,name:""  }]
            setComponents(newIntence);
            if (props.onNewintence) {
              props.onNewintence(newIntence)
            }
          }}
        >
          Text
        </div>
        <div
          className="mx-2 cursor-pointer"
          onClick={() => {
            const newIntence = [...components, { type: "image", items: [],id:uuid() ,name:"" }]
            setComponents(newIntence);
            if (props.onNewintence) {
              props.onNewintence(newIntence)
            }
          }}
        >
          Image
        </div>
        {/* <div
          className="mx-2 cursor-pointer"
          onClick={() => {
            setComponents([...components, { type: "task", items: [] }]);
          }}
        >
          Task
        </div> */}
      </div>
      {components.length!=0?<div className="w-full relative">
        {components.map((element, index) => {
          if (element.type == "text") {
            return <TextComponents name={element.name} value={element.items} onNewintence={(value)=>{
              const items = components.map((element2,index)=>{
                if (element2.id==element.id) {
                    return {
                      ...element2,
                      items:value
                    }
                }
                return element2
              })
              setComponents(items)
              if (props.onNewintence) {
                props.onNewintence(items)
              }



            }}  onName={(value)=>{
              
              const items = components.map((element2,index)=>{
                if (element2.id==element.id) {
                    return {
                      ...element2,
                      name:value
                    }
                }
                return element2
              })
              setComponents(items)
              if (props.onNewintence) {
                props.onNewintence(items)
              }
            }}  onDelete={()=>{
              const items = components.filter((element2,index)=>element.id!=element2.id)
              setComponents(items)
              if (props.onNewintence) {
                props.onNewintence(items)
              }
            }} key={index} />;
          }
          if (element.type == "image") {
            return <ImageComponents name={element.name} value={element.items} onNewintence={(value)=>{
              const items = components.map((element2,index)=>{
                if (element2.id==element.id) {
                    return {
                      ...element2,
                      items:value
                    }
                }
                return element2
              })
              setComponents(items)
              if (props.onNewintence) {
                props.onNewintence(items)
              }



            }} onName={(value)=>{
              
              const items = components.map((element2,index)=>{
                if (element2.id==element.id) {
                    return {
                      ...element2,
                      name:value
                    }
                }
                return element2
              })
              setComponents(items)
              if (props.onNewintence) {
                props.onNewintence(items)
              }
            }} onDelete={()=>{
              const items = components.filter((element2,index)=>element.id!=element2.id)
              setComponents(items)
              if (props.onNewintence) {
                props.onNewintence(items)
              }
            }} key={index} />;
          }
          if (element.type == "task") {
            return <TaskComponents key={index} />;
          }
        })}
      </div>: <div className="h-[300px] w-[300px] relative flex justify-center items-center p-10">
      <ResIcon fill="black"/>
      </div>  }

     
      
    </div>
  );
}
interface b {
  onDelete:any
  onName:any
  name:string
  value:Array
}
function TextComponents(props: TextComponentsProps) {
  const [content, setContent] = useState([]);
  useEffect(()=>{
    setContent(props.value??[])
  },[props.value])
  return (
    <div className="w-full relative my-2 bg-white  rounded-md py-2 px-1">
      <div className="w-full flex justify-end cursor-pointer">
        <div className="h-6 w-6 relative p-1" onClick={()=>{
          if (props.onDelete) {
            props.onDelete()
          }
        }}>
        <CloseIcon />

        </div>
      </div>
      <div className="w-full mx-2 my-4 flex text-black ">
        <div
          className="mr-2 text-xs cursor-pointer h-6 w-6  p-1"
          onClick={() => {
            const items = [
              ...content,
              {
                type: "header",
                text: "",
                id: uuid(),
              },
            ]
            setContent(items);
            if (props.onNewintence) {
              props.onNewintence(items)
            }
          }}
        >
          <HeaderIcon />
        </div>
        <div
          className="mx-2 text-xs cursor-pointer h-6 w-6 p-[2.5px]"
          onClick={() => {
            const items = [
              ...content,
              {
                type: "text",
                text: "",
                id: uuid(),
              },
            ]
            setContent(items);
            if (props.onNewintence) {
              props.onNewintence(items)
            }
          }}
        >
          <TextIcon />
        </div>
      </div>
      <TextInput placeholder="name"  value={props.name} onText={props.onName}/>
      <div className="w-full relative rounded-md py-1">
        {content.map((element, index) => {
          if (element.type == "header") {
            return (
              <div key={index} className="my-2 flex items-center">
                <TextInput placeholder="header" value={element.text} onText={(value)=>{
                  const items = content.map((element2,index)=>{
                    if (element2.id==element.id) {
                        return {
                          ...element2,
                          text:value
                        }
                    }
                    return element2
                  })
                  if (props.onNewintence) {
                    props.onNewintence(items)
                  }
                  setContent(items)
                }}/>
                <div
                  className="font-mono rotate-45 text-black text-2xl cursor-pointer"
                  onClick={() => {
                    const items = content.filter(
                      (element2) => element2.id != element.id
                    );
                    if (props.onNewintence) {
                      props.onNewintence(items)
                    }
                    setContent(items);
                  }}
                >
                  +
                </div>
              </div>
            );
          }
          if (element.type == "text") {
            return (
              <div key={index} className="my-2 flex items-start">
                <textarea
                value={element.text}
                onChange={(e)=>{
                  const items = content.map((element2,index)=>{
                    if (element2.id==element.id) {
                        return {
                          ...element2,
                          text:e.target.value
                        }
                    }
                    return element2
                  })
                  if (props.onNewintence) {
                    props.onNewintence(items)
                  }
                  setContent(items)
                }}
                  name=""
                  id=""
                  className="w-full relative bg-slate-200 text-black outline-none rounded-md p-2 text-xs"
                  placeholder="text"
                  cols="30"
                  rows="10"
                ></textarea>
                <div
                  className="font- font-serif rotate-45 text-black text-2xl cursor-pointer mx-1"
                  onClick={() => {
                    const items = content.filter(
                      (element2) => element2.id != element.id
                    );
                    if (props.onNewintence) {
                      props.onNewintence(items)
                    }
                    setContent(items);
                  }}
                >
                  +
                </div>
              </div>
            );
          }
        })}
        <div className="ml-2"></div>
      </div>
    </div>
  );
}











interface ImageComponentsProps {
  onDelete:any
  onName:any
  name:string
  onNewintence:any
  value:Array
}
function ImageComponents(props: ImageComponentsProps) {
  const [content, setContent] = useState([]);
  useEffect(()=>{
    setContent(props.value??[])
  },[props.value])
  return (
    <div className="w-full relative my-2 bg-white  rounded-md py-2 px-1">
      <div className="w-full flex justify-end cursor-pointer">
        <div className="h-6 w-6 relative p-1" onClick={()=>{
          if (props.onDelete) {
            props.onDelete()
          }
        }}>
        <CloseIcon />

        </div>
      </div>
      <div className="w-full mx-2 my-4 flex text-black ">
        <div
          className="mr-2 text-xs cursor-pointer h-6 w-6  p-1"
          onClick={() => {
            if (props.onNewintence) {
              const newIntence = [
                ...content,
                {
                  type: "header",
                  text: "",
                  id: uuid(),
                },
              ]
              setContent(newIntence);
              props.onNewintence(newIntence)
            }
            
          }}
        >
          <HeaderIcon />
        </div>
        <div
          className="mx-2 text-xs cursor-pointer h-6 w-6 "
          onClick={() => {


            if (props.onNewintence) {
              const newIntence = [
                ...content,
                {
                  type: "text",
                  text: "",
                  id: uuid(),
                },
              ]
              props.onNewintence(newIntence)
              setContent(newIntence);
            }
           
          }}
        >
          <ImageIcon  fill="black"/>
        </div>
      </div>
      <TextInput placeholder="name" value={props.name} onText={(v)=>{
         
        if (props.onName) {
          props.onName(v)
        }
      }}/>
      <div className="w-full relative rounded-md py-1">
        {content.map((element, index) => {
          if (element.type == "header") {
            return (
              <div key={index} className="my-2 flex items-center">
                <TextInput placeholder="header" value={element.text} onText={(value)=>{
                  const items = content.map((element2,index)=>{
                    if (element2.id==element.id) {
                        return {
                          ...element2,
                          text:value
                        }
                    }
                    return element2
                  })
                  if (props.onNewintence) {
                    props.onNewintence(items)
                  }
                  setContent(items)
                }}/>
                <div
                  className="font-mono rotate-45 text-black text-2xl cursor-pointer"
                  onClick={() => {
                    const items = content.filter(
                      (element2) => element2.id != element.id
                    );
                    if (props.onNewintence) {
                      props.onNewintence(items)
                    }
                    setContent(items);
                  }}
                >
                  +
                </div>
              </div>
            );
          }
          if (element.type == "text") {
            return (
              <div key={index} className="my-2 flex items-start">
                <input type="text" name="" id="" className="w-full relative bg-slate-200 text-black outline-none rounded-md p-2 text-xs" placeholder="image link"
                
                value={element.text}
                onChange={(e)=>{
                  const items = content.map((element2,index)=>{
                    if (element2.id==element.id) {
                        return {
                          ...element2,
                          text:e.target.value
                        }
                    }
                    return element2
                  })
                  if (props.onNewintence) {
                    props.onNewintence(items)
                  }
                  setContent(items)
                }}
                
                />
                <div
                  className="font-mono rotate-45 text-black text-2xl cursor-pointer mx-1"
                  onClick={() => {
                    const items = content.filter(
                      (element2) => element2.id != element.id
                    );
                    if (props.onNewintence) {
                      props.onNewintence(items)
                    }
                    setContent(items);
                  }}
                >
                  +
                </div>
              </div>
            );
          }
        })}
        <div className="ml-2"></div>
      </div>
    </div>
  );
}
































interface TaskComponentsProps {}
function TaskComponents(props: TaskComponentsProps) {
  const [task, setTask] = useState([]);
  return (
    <div className="w-full relative my-2">
      <div className="w-full mx-2 my-4 flex text-black border-t ">
        <div className="mr-2 text-xs cursor-pointer h-6 w-6  p-1">
          <HeaderIcon />
        </div>
        <div className="mx-2 text-xs cursor-pointer h-7 w-7 ">
          <TaskIcon fill="black" />
        </div>
      </div>
      <TextInput placeholder="name" />
    </div>
  );
}

interface TextInputProps {
  placeholder: string;
  value:string,
  onText:any
}
function TextInput(props: TextInputProps) {
  
  return (
    <div className="w-full relative border-b  border-black my-5">
      <input
        type="text"
        name=""
        className="w-full text-xs bg-transparent outline-none text-black"
        id=""
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e)=>{
          if (props.onText) {
            props.onText(e.target.value.trim())
          }
        }}
      />
    </div>
  );
}
