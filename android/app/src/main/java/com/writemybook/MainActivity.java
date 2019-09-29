package com.writemybook;

import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.Fragment;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

public class MainActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler {
  // Get the ReactInstanceManager, AKA the bridge between JS and Android
  private ReactInstanceManager mReactInstanceManager;
  private Toolbar mToolbar;

  @Override
  public void invokeDefaultOnBackPressed() {
    super.onBackPressed();
  }

  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    mToolbar = (Toolbar) findViewById(R.id.toolbar);
    mReactInstanceManager = ((MainApplication) getApplication()).getReactNativeHost().getReactInstanceManager();

    setSupportActionBar(mToolbar);
    getSupportActionBar().hide();

    Fragment fragment = new BetterReactFragment.Builder().setComponentName("NewcomerScreen").build(this);
    getSupportFragmentManager().beginTransaction().replace(R.id.contentMain, fragment).commit();
  }

  @Override
  protected void onPause() {
    super.onPause();

    if (mReactInstanceManager != null) {
      mReactInstanceManager.onHostPause(this);
    }
  }

  /*
   * Same as onPause - need to call onHostResume
   * on our ReactInstanceManager
   */
  @Override
  protected void onResume() {
    super.onResume();

    if (mReactInstanceManager != null) {
      mReactInstanceManager.onHostResume(this, this);
    }
  }


  @Override
  protected void onDestroy() {
    super.onDestroy();

    if (mReactInstanceManager != null) {
      mReactInstanceManager.onHostDestroy(this);
    }
  }

  @Override
  public void onBackPressed() {
    if (mReactInstanceManager != null) {
      mReactInstanceManager.onBackPressed();
    } else {
      super.onBackPressed();
    }
  }
}
