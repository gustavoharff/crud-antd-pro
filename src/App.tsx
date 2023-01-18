import { ProConfigProvider } from "@ant-design/pro-provider";
import { FormInstance } from "antd";
import "antd/dist/reset.css";
import { useEffect, useRef } from "react";

import './lib/api'
import { NewUserScreen } from "./screens/new-user";

import { UsersScreen } from "./screens/users";

function App() {

  return (
    <ProConfigProvider dark>
      {/* <NewUserScreen  formRef={ref}/> */}
      <UsersScreen />
    </ProConfigProvider>
  );
}

export default App;
