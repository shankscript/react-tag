## React-tag
Given url of any website this web app counts and highlights the html element tags

## Demo
- [http://shankscript.me/react-tag/](http://shankscript.me/react-tag/)

## Tech
- HTML parsing based on `Raw Regex`
- `ReactJS` for rendering
- `Material UI` styling
- `Axios` for http request
- `PHP/Nodejs` for proxy cross origin server
- `Linux php` hosting

## Source files
- `FectUrl.js` - A React component to Render raw html, tags, badges, url input
- `util.js` - logic for processing raw html, thereby generating tags tokens, counts, and decorating html with classes. More details in source comments
- `fetchUrl.php/server.js` - A proxy server to route http request to given url, to avoid cross domain origin access issues and http/https insecure ajax request issues

## Tested
- Only in Chrome

## Build
- Install nodejs, npm
- Install npm i yarn -g
- yarn install
- yarn start

## Screenshots
![alt text](http://shankscript.me/react-tag/Screen1.png)
![alt text](http://shankscript.me/react-tag/Screen.png)
