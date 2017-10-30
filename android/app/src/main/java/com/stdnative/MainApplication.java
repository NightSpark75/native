package com.stdnative;

import android.app.Activity;
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
import java.io.*;

public class MainApplication extends Application implements ReactApplication {

    public static final String JS_BUNDLE_LOCAL_PATH = "/data/user/0/com.stdnative/files/index.android.bundle";

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        protected String getJSBundleFile() {
            System.out.println("### native host get js bundle");
            String path = JS_BUNDLE_LOCAL_PATH;          
            File bundleFile = new File(path);

            if (bundleFile != null && bundleFile.exists()) {
                System.out.println("### file exists");
                return path;
            }
            System.out.println("### file not exists");
            return null;
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            System.out.println("### native host set packages");
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
        System.out.println("### application create");
        super.onCreate(); 
        SoLoader.init(this, /* native exopackage */ false);
    }
}
