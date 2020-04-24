import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../../components/MarkDown';
import Slider from '../../components/Slider';
import siteConfig from '../../site.config';
import home from '@/README.md'


const LazyComponent = (props) => {
  const [md, setMd] = useState(null);
  loadable(props.route.module).load().then(module => {
    setMd(module.default)
  })  
  return  <ReactMarkdown
    source={md}
    renderers={{
      code: CodeBlock,
    }}
  />
}

export default function Component() {

  const [routes, setRoutes] = useState([])

  if (routes.length === 0) {
    renderRoutes()
  }
  function renderRoutes(configs = siteConfig): void {
    const routeKyes = Object.keys(configs);
    routeKyes.forEach((item) => {
      if (Array.isArray(configs[item])) {
        configs[item].forEach((route) => {
          setRoutes(routes.concat(<Route key={route.name} path={`/components/${route.name}`} component={ () => <LazyComponent route={route} />} />))
        });
      } else {
        renderRoutes(siteConfig[item]);
      }
    });

  }
  return (
    <div className="component-container">
      <Slider menus={siteConfig} />
      <div className="component-content">
        <Switch>
          {
            routes
          }
          <Route path="*" component={
            () => <ReactMarkdown
              source={home}
              renderers={{
                code: CodeBlock,
              }}
            />}
          />
        </Switch>
      </div>
    </div>
  )
}
