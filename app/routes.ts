import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/root-layout.tsx", [
    index("./routes/index.tsx"),
    route("about", "./routes/about.tsx"),
  ]),
] satisfies RouteConfig;
