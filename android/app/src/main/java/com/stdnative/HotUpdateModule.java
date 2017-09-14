package com.stdnative;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Arguments;
import android.os.Bundle;

public class HotUpdateModule extends ReactContextBaseJavaModule
{
	public HotUpdateModule(ReactApplicationContext reactContext) {
		super(reactContext);
	}

	@Override
	public String getName() {
		return "hotupdate"; // 返回的名字就是最终模块的名字，前端调用时：NativeModules.hotupdate.xxx
	}

	@ReactMethod
	public String filePath() {
		return getReactApplicationContext().getFilesDir() + "";
	}
}