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
    await expect(element(by.id('forecast-current'))).toBeVisible();
    await expect(element(by.id('forecast-hourly-0'))).toBeVisible();
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

  // test('should show offline data and offline notification if no connection', 
  //   async () => {
  //blacklist back end
  // await reloadApp()
  //test
  //remove blacklist
  //   })
})

describe('Weather', () => {
  test('User should be able to see a scrollable display of current and hourly \
    forecast', async () => {
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
  test('User should see list of nearby stations', async () => {

  })
  test('User should be able to add to favorites and see it appear on \
  favorites', async() => {

  })
  test('User should be able to remove stations from favorites', () => {
    
  })
})