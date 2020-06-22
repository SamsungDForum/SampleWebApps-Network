# Network

This application demonstrates the usage of `webapis.network` API. With this API
user is able to retrieve information about TVs network connection.


## How to use the application

Use TV remote controllers enter button to open and close info card. All information is on the screen on load.


## Supported platforms

2015 and newer


### Prerequisites

To use Tizen Example API,

``<script src="$WEBAPIS/webapis/webapis.js"></script>``

should be loaded in `index.html`.


### Privileges and metadata

In order to use `webapis.network` API the following privileges must be included in `config.xml`:

```xml
<tizen:privilege name="http://developer.samsung.com/privilege/network.partner" />
<tizen:privilege name="http://developer.samsung.com/privilege/network.public" />
<tizen:privilege name="http://developer.samsung.com/privilege/network.dhcpoption60" />
```

### File structure

```
Network/ - Network sample app root folder
│
├── assets/ - resources used by this app
│   │
│   └── JosefinSans-Light.ttf - font used in application
├── css/ - styles used in the application
│   │
│   ├── main.css - styles specific for the application
│   └── style.css - style for application's template
├── js/ - scripts used in the application
│   │
│   ├── init.js - script that runs before any other for setup purpose
│   ├── keyhandler.js - module responsible for handling keydown events
│   ├── logger.js - module allowing user to register logger instances
│   ├── main.js - main application script
│   ├── navigation.js - module responsible for handling in-app focus and navigation
│   └── utils.js - module with useful tools used through application
│
├── CHANGELOG.md - changes for each version of application
├── config.xml - application's configuration file
├── icon.png - application's icon
├── index.html - main document
└── README.md - this file
```

## Other resources

*  **Network API**  
  https://developer.samsung.com/tv/develop/api-references/samsung-product-api-references/network-api


## Copyright and License

**Copyright 2019 Samsung Electronics, Inc.**

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
