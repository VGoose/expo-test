# gogonow
<img src="https://i.imgur.com/F0ma1HW.gif" width="200" height="354" />


Originally inspired from not wanting to wait in subway stations any minute longer than necessary during the summer months, **gogonow** is an app for NYC that lets you quickly see transit countdown clocks (those displays you see in subway stations) in real time.   It's evolved to also display weather data, becoming a one-stop data screen to let you prepare and get out the door quicker. 

The intended use is a quick check before heading out the door. 


## Overview

**gogonow** has two data sources.  For weather, it uses [Dark Sky](https://darksky.net/) (which is fantastic), and the [MTA Real Time Data Feed](http://datamine.mta.info/).  Currently V0.2.0 is released to the IOS store, the app is still in development for the Google Play Store.  

The backend is hosted on as a lambda function on [Netlify](https://www.netlify.com/). 



## Technology Stack

This app is built with [React-Native](https://facebook.github.io/react-native/), [Redux](https://redux.js.org/), [Express](https://expressjs.com/), [Netlify Functions](https://www.netlify.com/docs/functions/) and tested with [Detox](https://github.com/wix/Detox).

## Changelog

V0.2.0 - improve user loading experience

V0.1.9 - improve initial start up locating time

V0.1.8 - initial release to IOS app store

## Roadmap

Planned changes: 
+ Android Release
+ Incorporate bus data
+ Incorporate citi-bike data


## Known Issues
