package com.writemybook;

import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.bridge.Callback;

public class MainActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler, FragmentManager.OnBackStackChangedListener {
  // Get the ReactInstanceManager, AKA the bridge between JS and Android
  private ReactInstanceManager mReactInstanceManager;
  private Toolbar mToolbar;
  private BetterReactFragment mFragment;
  private BetterReactFragment mFragment2; // TODO: temporal hack

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
    getSupportFragmentManager().addOnBackStackChangedListener(this);

    String bookJson = UserDefaultsManager.getBook(this);

    if (bookJson == null) {
      mFragment = new BetterReactFragment.Builder().setComponentName("NewcomerScreen").build(this);
    } else {
      mFragment = new BetterReactFragment.Builder().setComponentName("BookOverviewScreen").build(this);
    }

    getSupportFragmentManager()
            .beginTransaction()
            //.setCustomAnimations(android.R.anim.slide_out_right, android.R.anim.slide_in_left)
            .replace(R.id.contentMain, mFragment)
            .commit();
  }

  @Override
  public void onBackStackChanged() {
    getSupportActionBar().setDisplayHomeAsUpEnabled(getSupportFragmentManager().getBackStackEntryCount() > 0);
  }

  @Override
  public boolean onSupportNavigateUp() {
    getSupportFragmentManager().popBackStack();
    if (mFragment2 != null) {
      getSupportActionBar().hide();
      mFragment2 = null;
    }
    return true;
  }

  public void present(String screen, Bundle props, Callback feedback) {
    BetterReactFragment fragment = new BetterReactFragment.Builder().setComponentName(screen).setLaunchOptions(props).build(this);
    FragmentTransaction t = getSupportFragmentManager()
            .beginTransaction()
            //.setCustomAnimations(android.R.anim.slide_out_right, android.R.anim.slide_in_left)
            .replace(R.id.contentMain, fragment);
    if (screen.equals("ChapterEditScreen")) {
      getSupportActionBar().show();
      getSupportActionBar().setTitle("");
      fragment.feedback = feedback;
      if (mFragment.getArguments().getString(BetterReactFragment.ARG_COMPONENT_NAME).equals("BookOverviewScreen")) {
        t.addToBackStack(fragment.toString()).commit();
        mFragment2 = fragment;
        return;
      } else {
        getSupportActionBar().setTitle("Create new chapter");
      }
    } else {
      getSupportActionBar().hide();
      mFragment2 = null;
    }
    t.commit();
    mFragment = fragment;
  }

  @Override
  public boolean onCreateOptionsMenu(Menu menu) {
    mToolbar.inflateMenu(R.menu.editor);
    mToolbar.setOnMenuItemClickListener(
            new Toolbar.OnMenuItemClickListener() {
              @Override
              public boolean onMenuItemClick(MenuItem item) {
                if (mFragment2 != null) {
                  mFragment2.feedback.invoke(mFragment.getArguments().getBundle(BetterReactFragment.ARG_LAUNCH_OPTIONS).getDouble("id"));
                  if (getSupportFragmentManager().getBackStackEntryCount() > 0) {
                    getSupportFragmentManager().popBackStack();
                    getSupportActionBar().hide();
                    mFragment2 = null;
                  }
                } else {
                  mFragment.feedback.invoke(mFragment.getArguments().getBundle(BetterReactFragment.ARG_LAUNCH_OPTIONS).getDouble("id"));
                }

                return true;
              }
            }
    );
    return true;
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
