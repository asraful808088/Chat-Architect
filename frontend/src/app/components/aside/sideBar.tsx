import useHttp from "@/app/hook/http/http";
import BotIcon from "@/assets/logo/bot/bot_6819650.png";
import DevIcon from "@/assets/logo/bot/programmer_10770873.png";
import DisconnectIcon from "@/assets/svg/disconnect.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TextBiEffect from "../textEffect/biEffect/biEffect";
export default function Sidebar() {
  const [listofMessage, setListOfMessage] = useState([]);
  const [message, setMessage] = useState("");
  const [heightSide, setHeihgtSide] = useState(0);
  const activeBot = useSelector((state) => state.botReducer.activeBot);

  const { sendMessage } = useHttp();
  useEffect(() => {
    window.addEventListener("resize", () => {
      setHeihgtSide(window.innerHeight * 0.77);
    });
    setHeihgtSide(window.innerHeight * 0.77);
  }, []);
  return (
    <div
      className="w-[400px]  relative pr-4 flex  flex-col h-full "
      style={{
        height: "100%",
      }}
    >
      <div className="w-full text-black  font-extrabold">Testing Model</div>
      <div className="w-full border-b border-black  my-4 h-12">
        <input
          type="text"
          name=""
          id=""
          className="h-full w-full outline-none border-none text-black "
          placeholder="intent"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            // && activeBot && message.length != 0
            if (e.key == "Enter" ) {
              setMessage("");
              setListOfMessage((prev) => {
                const animOffOthers = prev.map((element, index) => ({
                  ...element,
                  anim: false,
                }));
                return [{ devRole: true, intent: message }, ...animOffOthers];
              });
              setTimeout(() => {
                // set timeout is optional...
                sendMessage(message)
                  .then((result) => {
                    if (result && result?.current_res?.response?.length != 0) {
                      console.log(result)
                      setListOfMessage((prev) => {
                        const animOffOthers = prev.map((element, index) => ({
                          ...element,
                          anim: false,
                        }));
                        return [
                          {
                            devRole: false,
                            listOfResponseBloc: result.current_res.response[0],
                            anim: true,
                          },
                          ...animOffOthers,
                        ];
                      });
                    }
                  })
                  .catch((err) => {});
              }, 3000);
            }
          }}
        />
      </div>
      <div
        className="w-full overflow-y-auto "
        style={{
          height: `${heightSide}px`,
        }}
      >
        {!activeBot ? (
          <div className="w-full h-full relative flex justify-center items-center">
            <div className="w-full p-[100px]">
              <DisconnectIcon />
            </div>
          </div>
        ) : (
          listofMessage.map((element, index) => {
            return (
              <ResponseBox
                key={index}
                userRole={element.devRole}
                intent={element.intent}
                listOfResponseBloc={element.listOfResponseBloc}
                anim={element.anim}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

interface ResponseBoxProps {
  userRole: boolean;
  intent: string;
  listOfResponseBloc: Array;
  anim: boolean;
}
function ResponseBox(props: ResponseBoxProps) {
  return (
    <div className="w-full relative my-10">
      <div
        className={`text-sm flex relative items-center ${
          props.userRole ? "ml-[12%]" : ""
        }`}
      >
        <div className="h-10 w-10 relative rounded-full mr-2">
          <Image
            src={props.userRole ? DevIcon : BotIcon}
            alt=""
            objectFit="cover"
            layout="fill"
          />
        </div>
        <div className="font-extrabold relative ml-1 text-sm text-black">
          {!props.userRole ? " Debug-Assistant" : "Devoloper"}
        </div>
      </div>

      {props.listOfResponseBloc ? (
        <div
          className={`my-2 w-[88%] rounded-md bg-slate-300 p-2 shadow-2xl ${
            props.userRole ? "ml-[12%] " : ""
          }`}
        >
         
          <div className="text-black text-[12px] font-bold ">
            {props.listOfResponseBloc.map((element, index) => {
              return element?.items?.map((element, index) => {
                if (element.type == "text") {
                  return (
                    <div key={index} className="w-auto text-xs h-auto my-5">
                      <TextBiEffect
                        off={!props.anim}
                        key={index}
                        text={element.text}
                      />
                    </div>
                  );
                } else if (element.type == "header") {
                  return (
                    <div
                      key={index}
                      className="w-auto text-sm font-bold h-auto my-5"
                    >
                      <TextBiEffect
                        off={!props.anim}
                        key={index}
                        text={element.text}
                      />
                    </div>
                  );
                }
              });
            })}
          </div>
        </div>
      ) : (
        <div
          className={`my-2 w-[88%] text-black text-[13px] rounded-md bg-slate-300 p-2 shadow-2xl font-bold ${
            props.userRole ? "ml-[12%]" : ""
          }`}
        >
          {props.intent}
        </div>
      )}
    </div>
  );
}
