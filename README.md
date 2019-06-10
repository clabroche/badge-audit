# Badge-audit
![vulnerabilities](audit-badge.svg)
## Install
``` npm i @iryu54/badge-audit```
``` npm i -g @iryu54/badge-audit```

## Usage 

### Globally
``` badge-audit > badge-audit.svg``` 

### Programmatically
``` javascript
const audit = require('@iryu54/badge-audit')
;(async _ => {
  const svg = await audit.launch()
})()
``` 