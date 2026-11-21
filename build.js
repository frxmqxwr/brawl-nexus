/** Static Netlify build: publish ONLY the public browser files, never .env or Node server source. */
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const src=__dirname;
const out=path.join(src,'dist');
fs.mkdirSync(out,{recursive:true});
for(const name of ['index.html','styles.css','app.js']){
  fs.copyFileSync(path.join(src,name),path.join(out,name));
  console.log('Published:',name);
}

const assetSrc=path.join(src,'assets');
const assetDest=path.join(out,'assets');
fs.mkdirSync(assetDest,{recursive:true});
for(const name of ['nexus-emblem.webp','nexus-wordmark.webp','nexus-brand.webp','nexus-guest.webp','nexus-favicon.png']){
  fs.copyFileSync(path.join(assetSrc,name),path.join(assetDest,name));
  console.log('Published: assets/'+name);
}
