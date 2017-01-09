package com.parkbark;

import android.app.Application;
import com.evollu.react.fcm.FIRMessagingPackage;
import android.util.Log;

import com.sbugert.rnadmob.RNAdMobPackage;
import com.facebook.react.ReactApplication;
import com.idehub.Billing.InAppBillingBridgePackage;
import cl.json.RNSharePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;
import com.showlocationservicesdialogbox.LocationServicesDialogBoxPackage;



public class MainApplication extends Application implements ReactApplication {



  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.asList(
          new MainReactPackage(),
            new InAppBillingBridgePackage(),
            new RNSharePackage(),
            new RNAdMobPackage(),
            new RNDeviceInfo(),
            new MapsPackage(),
            new FIRMessagingPackage(),
            new LocationServicesDialogBoxPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
