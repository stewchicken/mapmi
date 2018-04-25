C:\Users\<username>\AppData\Local\Android\Sdk\platform-tools  adb devices
adb device


ANDROID_HOME=C:\Users\<username>\AppData\Local\Android\sdk
JAVA_HOME=C:\Program Files\Java\jdk1.8.0_152

Install Ionic

`
npm install -g ionic
`

Start an App

`
ionic start myApp tabs
`

Run your App
`               
cd myApp
ionic serve
`

Define rootpage

`  
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  // rootPage: any = HomePage;
  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;
`  