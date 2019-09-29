package com.writemybook;

import android.annotation.TargetApi;
import android.app.Activity;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.facebook.react.ReactDelegate;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Callback;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class BetterReactFragment extends Fragment implements PermissionAwareActivity {
    public static final String ARG_COMPONENT_NAME = "arg_component_name";
    public static final String ARG_LAUNCH_OPTIONS = "arg_launch_options";

    private ReactDelegate mReactDelegate;
    private Activity mActivity;
    public Callback feedback;
    private boolean isLoaded = false;

    @Nullable
    private PermissionListener mPermissionListener;

    public BetterReactFragment(Activity activity) {
        mActivity = activity;
    }

    /**
     * @param componentName The name of the react native component
     * @return A new instance of fragment ReactFragment.
     */
    private static BetterReactFragment newInstance(Activity activity, String componentName, Bundle launchOptions) {
        BetterReactFragment fragment = new BetterReactFragment(activity);
        Bundle args = new Bundle();
        args.putString(ARG_COMPONENT_NAME, componentName);
        args.putBundle(ARG_LAUNCH_OPTIONS, launchOptions);
        fragment.setArguments(args);
        return fragment;
    }

    // region Lifecycle
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        String mainComponentName = null;
        Bundle launchOptions = null;
        if (getArguments() != null) {
            mainComponentName = getArguments().getString(ARG_COMPONENT_NAME);
            launchOptions = getArguments().getBundle(ARG_LAUNCH_OPTIONS);
        }
        if (mainComponentName == null) {
            throw new IllegalStateException("Cannot loadApp if component name is null");
        }
        mReactDelegate = new ReactDelegate(getActivity(), getReactNativeHost(), mainComponentName, launchOptions) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(mActivity);
            }
        };
    }

    protected ReactNativeHost getReactNativeHost() {
        return ((MainApplication) getActivity().getApplication()).getReactNativeHost();
    }

    @Override
    public View onCreateView(
            LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        if (!isLoaded) {
            mReactDelegate.loadApp();
            isLoaded = true;
        }
        return mReactDelegate.getReactRootView();
    }

    @Override
    public void onResume() {
        super.onResume();
        mReactDelegate.onHostResume();
    }

    @Override
    public void onPause() {
        super.onPause();
        mReactDelegate.onHostPause();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        mReactDelegate.onHostDestroy();
    }
    // endregion

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        mReactDelegate.onActivityResult(requestCode, resultCode, data, false);
    }

    /**
     * Helper to forward hardware back presses to our React Native Host
     *
     * <p>This must be called via a forward from your host Activity
     */
    public boolean onBackPressed() {
        return mReactDelegate.onBackPressed();
    }

    /**
     * Helper to forward onKeyUp commands from our host Activity. This allows ReactFragment to handle
     * double tap reloads and dev menus
     *
     * <p>This must be called via a forward from your host Activity
     *
     * @param keyCode keyCode
     * @param event event
     * @return true if we handled onKeyUp
     */
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        return mReactDelegate.shouldShowDevMenuOrReload(keyCode, event);
    }

    @Override
    public void onRequestPermissionsResult(
            int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (mPermissionListener != null
                && mPermissionListener.onRequestPermissionsResult(requestCode, permissions, grantResults)) {
            mPermissionListener = null;
        }
    }

    @Override
    public int checkPermission(String permission, int pid, int uid) {
        return getActivity().checkPermission(permission, pid, uid);
    }

    @TargetApi(Build.VERSION_CODES.M)
    @Override
    public int checkSelfPermission(String permission) {
        return getActivity().checkSelfPermission(permission);
    }

    @TargetApi(Build.VERSION_CODES.M)
    @Override
    public void requestPermissions(
            String[] permissions, int requestCode, PermissionListener listener) {
        mPermissionListener = listener;
        requestPermissions(permissions, requestCode);
    }

    /** Builder class to help instantiate a ReactFragment */
    public static class Builder {

        String mComponentName;
        Bundle mLaunchOptions;

        public Builder() {
            mComponentName = null;
            mLaunchOptions = null;
        }

        /**
         * Set the Component name for our React Native instance.
         *
         * @param componentName The name of the component
         * @return Builder
         */
        public Builder setComponentName(String componentName) {
            mComponentName = componentName;
            return this;
        }

        /**
         * Set the Launch Options for our React Native instance.
         *
         * @param launchOptions launchOptions
         * @return Builder
         */
        public Builder setLaunchOptions(Bundle launchOptions) {
            mLaunchOptions = launchOptions;
            return this;
        }

        public BetterReactFragment build(Activity activity) {
            return BetterReactFragment.newInstance(activity, mComponentName, mLaunchOptions);
        }
    }
}
