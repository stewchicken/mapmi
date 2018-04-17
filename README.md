#hospital-booking


# Short Intro

`mapmi` is a map platform to report and view accident 

# generate icon and splash
 - https://blog.ionicframework.com/automating-icons-and-splash-screens/

# feature

 - list accidents
 - report accidents with photo and gps locations
 - show accident details
 
 
# install

- install[ionic framework](http://ionicframework.com) and cordova, with below commands

`
   npm install -g ionic cordova
`

- clone the project

`
  git clone https://github.com/stewchicken/mapmi.git
`

- run

`
  ionic platform add android
`

` ionic run android
`

or run `ionic serve` to view it on browser


# effects

- start app 

![start](screenshots/mapmi1.png)

- list all reported accidents (green means nobody injured, yellow means injured, red means somebody dead)

![list accidents](screenshots/mapmi2.png)

- report accident, new accident will be listed on map automatically after reporting

![report accident with  handynumber,details,  photo, gps location automatically](screenshots/mapmi3.png)
![report accident with  handynumber,details,  photo, gps location automatically](screenshots/mapmi4.png)
- view accident details

![click marker on map to view accident in details](screenshots/mapmi5.png)
![click marker on map to view accident in details](screenshots/mapmi6.png)









 
 
