"use client"
import store from "./storage";
import { Provider } from "react-redux";
export default  function Storage({children}:{children:React.ReactNode}) {
    return <Provider store={store}>{children}</Provider>;
  }