package com.stdnative;

import android.app.Application;
import android.os.Environment;

import com.facebook.react.ReactApplication;
import com.remobile.filetransfer.RCTFileTransferPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.rnfs.RNFSPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;

import java.util.Arrays;
import java.util.List;
import java.io.File;
import android.util.Log;

import android.support.annotation.Nullable;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        
        @Override
        protected String getJSBundleFile() {
            String path = "/data/user/0/com.stdnative/files/index.android.bundle";
            //String path = "/sdcard/data/index.android.bundle";
            
            File bundleFile = new File(path);
            if (bundleFile != null && bundleFile.exists()) {
                return path;
            } else {
                return null;
            }
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
    }
}
