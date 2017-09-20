package com.stdnative;

import android.app.Application;
import android.os.Environment;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.remobile.filetransfer.RCTFileTransferPackage;
import com.rnfs.RNFSPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;

import java.util.Arrays;
import java.util.List;
import java.io.File;
import android.util.Log;

import android.support.annotation.Nullable;

public class MainApplication extends Application implements ReactApplication {
    private File bundleFile = null;
    
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Nullable
        @Override
        protected String getJSBundleFile() {
            if (bundleFile != null && bundleFile.exists()) {
                return bundleFile.getPath();
            }
            return null;
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new RCTFileTransferPackage(),
                new RNFSPackage(),
                new CommonReactPackage(),
                new ReactNativeRestartPackage()
                // new UpdatePackage()
            );
        }
    };
  

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        bundleFile = new File("/data/user/0/com.stdnative/files/index.android.bundle");
    }
}
