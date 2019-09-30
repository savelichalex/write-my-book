package com.writemybook;

import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class UserDefaultsManager extends ReactContextBaseJavaModule {
    private static final String BOOK_KEY = "BOOK";

    private ReactApplicationContext reactContext;

    @NonNull
    @Override
    public String getName() {
        return "UserDefaultsManager";
    }

    UserDefaultsManager(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @ReactMethod
    public void save(String json) {
        SharedPreferences preferences = reactContext.getSharedPreferences("WriteMyBookPreferences", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = preferences.edit();
        editor.putString(BOOK_KEY, json);
        editor.apply();
    }

    @ReactMethod
    public void getBook(Promise promise) {
        SharedPreferences preferences = reactContext.getSharedPreferences("WriteMyBookPreferences", Context.MODE_PRIVATE);
        String json = preferences.getString(BOOK_KEY, null);
        promise.resolve(json);
    }

    public static String getBook(Activity context) {
        SharedPreferences preferences = context.getSharedPreferences("WriteMyBookPreferences", Context.MODE_PRIVATE);
        return preferences.getString(BOOK_KEY, null);
    }
}
