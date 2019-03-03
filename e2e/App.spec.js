const { reloadApp } = require('detox-expo-helpers');

describe('App Start Up', () => {
  beforeAll(async () => {
    await reloadApp();
  });
  // test('should have loading screen while data is fetching', async () => {
  //   await expect(element(by.id('loading-screen'))).toBeVisible();
  // });
  test('should show home screen with weather and transit data', async () => {
    await expect(element(by.id('home-screen'))).toBeVisible();
    //see weather
    await expect(element(by.id('weather-module'))).toBeVisible();

    //see transit
    await expect(element(by.id('transit-module'))).toBeVisible();
    await element(by.label('nearby stations')).swipe('left', 'fast', 0.25)
    expect(element(by.label('favorite stations'))).toBeVisible();

  });

  test('should be able to navigate', async () => {
    await element(by.id('transit-tab')).tap()
    await expect(element(by.id('transit-screen'))).toBeVisible();
    await element(by.id('settings-tab')).tap()
    await expect(element(by.id('settings-tab'))).toBeVisible();
    await element(by.id('home-tab')).tap();
    await expect(element(by.id('home-screen'))).toBeVisible();
  })
  //TODO: not able to block connection
  test.skip('should show offline data and offline notification if no connection',
    async () => {
      // blacklist back end
      // await reloadApp()
      // test
      // remove blacklist
    })
})

describe.only('Weather', () => {
  test('User should be able to see a scrollable display of current and hourly \
    forecast', async () => {
      await expect(element(by.id('weather-scrollview'))).toBeVisible()
      await expect(element(by.id('forecast-current'))).toBeVisible()
      await expect(element(by.id('forecast-hourly-0'))).toBeVisible()
      //test scroll
      //current has time near now
      //shows celsius/fahrenheit 
      //hourly has time > than now
    })
  test('User should be able to switch between Celsius and Fahrenheit',
    async () => {

    })

})

describe('Transit', () => {
  beforeAll(async () => {
    await device.setLocation(40.797, -73.948)
  })
  test('User should see list of nearby stations', async () => {
    await expect(element(by.id('clock-0-623'))).toBeVisible()
    await expect(element(by.id('clock-0-227'))).toBeVisible()
  })
  test('User should be able to open and close countdown clocks \
  revealing arrival times', async () => {
      await element(by.id('clock-0-623')).tapAtPoint({ x: 150, y: 20 })
      await expect(element(by.id('623-0'))).toBeNotVisible()
      await element(by.id('clock-0-623')).tapAtPoint({ x: 150, y: 20 })
      //TODO: issue with matching ids nested in render prop components
      // await expect(element(by.id('623-0'))).toBeVisible()
    })
  test('User should be able to add/remove favorites and see it \
  appear/disappear in favorites list', async () => {
      await element(by.id('227-fave')).tap()
      await element(by.label('nearby stations')).swipe('left', 'fast', 0.25)
      //wait for transition
      // await waitFor(element(by.id('_'))).toExist().withTimeout(1000)
      await element(by.id('227-fave').withAncestor(by.id('countdown-list-1'))).tap()
      await expect(element(by.id('clock-1-227'))).toBeNotVisible()
      await element(by.label('favorite stations')).swipe('right', 'fast', 0.25)
    })
  test('User should be able to toggle to see favorite stations \
  first', async () => {
      await element(by.id('settings-tab')).tap()
      await element(by.id('general-settings')).tap()
      //wait for transition 
      await waitFor(element(by.id('____'))).toExist().withTimeout(1000)
      await element(by.id('switch-show-nearby')).tapAtPoint({ x: 15, y: 15 })
      await reloadApp()
      await expect(element(by.label('nearby stations'))).toBeNotVisible()
      await expect(element(by.label('favorite stations'))).toBeVisible()

      await element(by.id('settings-tab')).tap()
      await element(by.id('general-settings')).tap()
      //wait for transition 
      await waitFor(element(by.id('____'))).toExist().withTimeout(1000)
      await element(by.id('switch-show-nearby')).tapAtPoint({ x: 15, y: 15 })
    })
})