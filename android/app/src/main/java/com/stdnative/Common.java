package com.stdnative;

import android.app.Activity;
/*
import com.facebook.react.ReactApplication;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.os.Environment;

import java.io.*;
*/

import android.os.AsyncTask;
import android.os.Environment;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.JSCConfig;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.JSBundleLoader;
import com.facebook.react.bridge.JSCJavaScriptExecutor;
import com.facebook.react.bridge.JavaScriptExecutor;
import com.facebook.react.module.annotations.ReactModule;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import com.facebook.react.bridge.UiThreadUtil;
import android.app.Application;
import java.lang.reflect.Field;

class Common extends ReactContextBaseJavaModule {
	
	public String JS_BUNDLE_LOCAL_FILE = "index.android.bundle";
	public String JS_BUNDLE_LOCAL_PATH = Environment.getExternalStorageDirectory().toString() + File.separator + JS_BUNDLE_LOCAL_FILE;

	Common(ReactApplicationContext reactContext) {
		super(reactContext);
	}
	
	@ReactMethod
	public void reloadBundle() {
		File file = new File("/data/user/0/com.stdnative/files/index.android.bundle");
		if(file == null || !file.exists()){
			System.out.println("### download error, check URL or network state");
			return;
		}
		UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
				File file = new File("/data/user/0/com.stdnative/files/index.android.bundle");
                try {
                    Activity activity = getCurrentActivity();
                    Application application = activity.getApplication();
                    ReactInstanceManager instanceManager = ((ReactApplication) application).getReactNativeHost().getReactInstanceManager();
                    try {
                        Field jsBundleField = instanceManager.getClass().getDeclaredField("mJSBundleFile");
                        jsBundleField.setAccessible(true);
                        jsBundleField.set(instanceManager, file.getAbsolutePath());
                    } catch (Throwable err) {
                        JSBundleLoader loader = JSBundleLoader.createFileLoader(file.getAbsolutePath());
                        Field loadField = instanceManager.getClass().getDeclaredField("mBundleLoader");
                        loadField.setAccessible(true);
                        loadField.set(instanceManager, loader);
                    }
                    final Method recreateMethod = instanceManager.getClass().getMethod("recreateReactContextInBackground");
                    final ReactInstanceManager finalizedInstanceManager = instanceManager;
                    recreateMethod.invoke(finalizedInstanceManager);
                    activity.recreate();
                } catch (Throwable err) {
					System.out.println("### Failed to restart application" + err);
                }
            }
        });
	}
	
	@Override
	public String getName() {
		return "Common";
	}
}