import React, { useState, ReactNode } from "react";
import { Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../../components/MarkDown";
import Slider from "../../components/Slider";
import siteConfig from "../../site.config";
import home from "@/README.md";

type MenuRoute = {
  name: string;
  description: string;
  module: () => {};
  [key:string]:any;
};


interface ConfigInfo {
  [key: string]: any,
}

const LazyComponent = (props: any) => {
  const [md, setMd] = useState("");
  loadable(props.route.module)
    .load()
    .then((module: any) => {
      // console.log(module.default);
      setMd(module.default);
    });
  return (
    <ReactMarkdown
      source={md}
      renderers={{
        code: CodeBlock,
      }}
    />
  );
};

export default function Component() {
  const routes = [] as ReactNode[]
  if (routes.length === 0) {
    renderRoutes(siteConfig);
  }
  function renderRoutes(configs: ConfigInfo): void {
    const routeKyes = Object.keys(configs);
 
    routeKyes.forEach((item) => {
      if (Array.isArray(configs[item])) {
        (configs[item] as MenuRoute[]).forEach((route: MenuRoute) => {
            routes.push(
              <Route
                key={route.name}
                path={`/components/${route.name}`}
                component={() => <LazyComponent route={route} />}
              />
            )
        });
      } else {
        let other = siteConfig as ConfigInfo
        renderRoutes(other[item]);
      }
    });
  }
  return (
    <div className="component-container">
      <Slider menus={siteConfig} />
      <div className="component-content">
        <Switch>
          {routes}
          <Route
            path="*"
            component={() => (
              <ReactMarkdown
                source={home}
                renderers={{
                  code: CodeBlock,
                }}
              />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}
