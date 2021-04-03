import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { QueryClientProvider, QueryClient } from "react-query";

const client = new QueryClient();

ReactDOM.render(
  // QueryClientProviderで囲むことで、react-queryがアプリケーションで使えるようになる。
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>,
  document.getElementById("root")
);
