const  {exec} = require('child_process')

async function launch() {
  let {stdout: res} = await getDevAudit() 
  res = JSON.parse(res)
  const {high, critical} = res.metadata.vulnerabilities 
  return createSVG(high + critical)
}
async function getDevAudit() {
  return bash('npm audit --production --json')
}

function bash(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if(err) return reject(err)
      return resolve({stdout, stderr})
    })
  });
}

function createSVG(nbVulnerabilities) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="110" height="20">
    <linearGradient id="b" x2="0" y2="100%">
      <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
      <stop offset="1" stop-opacity=".1"/>
    </linearGradient>
    <mask id="a">
      <rect width="110" height="20" rx="3" fill="#fff"/>
    </mask>
    <g mask="url(#a)">
      <path fill="#555" d="M0 0h93v20H0z"/>
      <path fill="${nbVulnerabilities ? '#ff0' : '#AFCC54'}" d="M93 0h17v20H93z"/>
      <path fill="url(#b)" d="M0 0h110v20H0z"/>
    </g>
    <g fill="#fff" text-anchor="middle" font-family="Verdana,DejaVu Sans,Geneva,sans-serif" font-size="11">
      <text x="46.5" y="15" fill="#010101" fill-opacity=".3">vulnerabilities</text>
      <text x="46.5" y="14">vulnerabilities</text>
      <text x="100.5" y="15" fill="#010101" fill-opacity=".3">${nbVulnerabilities}</text>
      <text x="100.5" y="14">${nbVulnerabilities}</text>
    </g>
  </svg>`
}

module.exports = {launch}
