import InAppBilling from 'react-native-billing';


export default class AdsPurchasedChecker {
  constructor(store) {
    this.checkAddRemovePurchased = async function () {
      await InAppBilling.close();
      try {
        await InAppBilling.open();
        const details = await InAppBilling.isPurchased('com.parkbark.adsremoved');
        if (details) {
          store.dispatch({type: 'SET_ADS_REMOVE', state: true})
        }
      } catch (err) {
        if (__DEV__) {
          console.log(err);
        }
      } finally {
        await InAppBilling.close();
      }
    }

    this.checkAddRemovePurchased()
  }
}
