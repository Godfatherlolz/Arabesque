# Welcome to Arabesque Logs!

This is a Task for Arabesque to install Clone this then:

    npm install
If there is a version mismatch you could either fix it by updating the local angular version. Or to Ignore this warning and always use the Local Angular version over the Global one.
# Files

./.
├───.github
├───.vscode
├───e2e
└───src
    ├───app
    │   ├───@core
    │   │   ├───data
    │   │   ├───mock
    │   │   └───utils
    │   ├───@theme
    │   │   ├───components
    │   │   │   ├───footer
    │   │   │   ├───header
    │   │   ├───directives
    │   │   ├───layouts
    │   │   ├───pipes
    │   │   └───styles
    │   ├───models
    │   ├───pages
    │   │   ├───charts
    │   │   │   └───d3
    │   │   ├───maps
    │   │   │   └───country-orders
    │   │   │       ├───chart
    │   │   │       └───map
    │   │   └───miscellaneous
    │   │       └───not-found
    │   └───services
    ├───assets
    │   ├───data
    │   ├───images
    │   ├───leaflet-countries
    │   ├───map
    │   └───skins
    └───environments


## @Core and @Theme

@Theme is where the basic Template (Ngx-Admin) Components are. @Core is where the Core Module is. It's Basically the main Provider of data for the Charts.

## Services

We're Dealing with two : API service this is our main step towards gathering data. The Other one is Log Service where our main Logic lies. This bit requires more Shallow Testing as we move further and more case Error Treatment.

## Models

Ther is only One Model **Log** under:

> app/models

This is basically a collection of Interfaces & Classes describing the logs Structure ( Regions, Payloads, Sectors ...)
## Pages

This is where the main Components based on [D3](https://d3js.org/) & [Leaflet](https://leafletjs.com/) Layered Maps. The Theme is the [ngx-admin](https://github.com/akveo/ngx-admin).

## ng Test

In order to check some basic Tests, go ahead those are some very basic Isolated Testing.

## Don't Build for Production

This is not ready for production. More testing is needed. Run it in a dev Environment. Don't use --prod flag this is just a mimic:

    ng serve --prod

Use `ng serve`


