package com.writemybook;

import android.os.Handler;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

public class NavigationManager extends ReactContextBaseJavaModule {
    private ReactApplicationContext reactContext;
    @NonNull
    @Override
    public String getName() {
        return "NavigationManager";
    }

    NavigationManager(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @ReactMethod
    public void present(String screen, ReadableMap props) {
        if (reactContext.getCurrentActivity() instanceof MainActivity) {
            new Handler(reactContext.getMainLooper()).post(new Runnable() {
                @Override
                public void run() {
                    ((MainActivity) reactContext.getCurrentActivity()).present(screen, Arguments.toBundle(props), null);
                }
            });
        }
    }

    @ReactMethod
    public void presentWithFeedback(String screen, ReadableMap props, Callback feedback) {
        if (reactContext.getCurrentActivity() instanceof MainActivity) {

            new Handler(reactContext.getMainLooper()).post(new Runnable() {
                @Override
                public void run() {
                    ((MainActivity) reactContext.getCurrentActivity()).present(screen, Arguments.toBundle(props), feedback);
                }
            });
        }
    }
}
