package com.stdnative;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.remobile.filetransfer.RCTFileTransferPackage;

import java.util.Arrays;
import java.util.List;
import java.io.File;

import android.support.annotation.Nullable;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    
        @Override
        protected @Nullable String getJSBundleFile() {
            String jsBundleFile = getFilesDir().getAbsolutePath() + "/index.android.bundle";
            File file = new File(jsBundleFile);
            return file != null && file.exists() ? jsBundleFile : null;
        }

        @Override
        public boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new RCTFileTransferPackage()
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
