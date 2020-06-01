/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 * <p>
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

package com.reactnativecommunity.viewpager;

import android.content.Context;
import android.graphics.Color;
import android.os.Build;
import android.util.Log;
import android.util.SparseArray;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import androidx.annotation.RequiresApi;
import androidx.fragment.app.FragmentActivity;


import com.facebook.infer.annotation.Assertions;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;

import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.EventDispatcher;
import com.reactnative.community.viewpager2.widget.ViewPager2;
import com.reactnativecommunity.viewpager.event.PageScrollEvent;
import com.reactnativecommunity.viewpager.event.PageScrollStateChangedEvent;
import com.reactnativecommunity.viewpager.event.PageSelectedEvent;

import java.util.Map;

import static com.reactnative.community.viewpager2.widget.ViewPager2.ORIENTATION_HORIZONTAL;
import static com.reactnative.community.viewpager2.widget.ViewPager2.SCROLL_STATE_DRAGGING;
import static com.reactnative.community.viewpager2.widget.ViewPager2.SCROLL_STATE_IDLE;
import static com.reactnative.community.viewpager2.widget.ViewPager2.SCROLL_STATE_SETTLING;

public class ReactViewPagerManager extends ViewGroupManager<ReactViewPagerManager.RNL> {

    private static final String REACT_CLASS = "RNCViewPager";
    private static final int COMMAND_SET_PAGE = 1;
    private static final int COMMAND_SET_PAGE_WITHOUT_ANIMATION = 2;
    private static final int COMMAND_SET_SCROLL_ENABLED = 3;
    private EventDispatcher eventDispatcher;

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    class RNL extends FrameLayout {

        public RNL(Context context) {
            super(context);
        }

        @Override
        protected void onLayout(boolean changed, int l, int t, int r, int b) {
            super.onLayout(changed, l, t, r, b);
        }

        @RequiresApi(api = Build.VERSION_CODES.KITKAT)
        @Override
        public boolean onTouchEvent(MotionEvent event) {
            Log.d("", "onTouchEvent: " + MotionEvent.actionToString(event.getAction()));
            return true;
        }

        @RequiresApi(api = Build.VERSION_CODES.KITKAT)
        @Override
        public boolean onInterceptTouchEvent(MotionEvent ev) {
            return true;
        }
    }

    @NonNull
    @Override
    protected RNL createViewInstance(@NonNull ThemedReactContext reactContext) {
        final ViewPager2 vp = new ViewPager2(reactContext);
        FragmentAdapter adapter = new FragmentAdapter();
        vp.setAdapter(adapter);
        eventDispatcher = reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher();
        vp.registerOnPageChangeCallback(new ViewPager2.OnPageChangeCallback() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
                super.onPageScrolled(position, positionOffset, positionOffsetPixels);
                eventDispatcher.dispatchEvent(
                        new PageScrollEvent(vp.getId(), position, positionOffset));
            }

            @Override
            public void onPageSelected(int position) {
                super.onPageSelected(position);
                eventDispatcher.dispatchEvent(
                        new PageSelectedEvent(vp.getId(), position));
            }

            @Override
            public void onPageScrollStateChanged(int state) {
                super.onPageScrollStateChanged(state);
                String pageScrollState;
                switch (state) {
                    case SCROLL_STATE_IDLE:
                        pageScrollState = "idle";
                        break;
                    case SCROLL_STATE_DRAGGING:
                        pageScrollState = "dragging";
                        break;
                    case SCROLL_STATE_SETTLING:
                        pageScrollState = "settling";
                        break;
                    default:
                        throw new IllegalStateException("Unsupported pageScrollState");
                }
                eventDispatcher.dispatchEvent(
                        new PageScrollStateChangedEvent(vp.getId(), pageScrollState));
            }
        });
        RNL viewG = new RNL(reactContext);
        viewG.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        vp.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        vp.setBackgroundColor(Color.parseColor("#eb34c0"));
        vp.setTag(86768);
        viewG.addView(vp);

        View layer = new View(reactContext);
        layer.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        layer.setBackgroundColor(Color.parseColor("#fcba03"));
        viewG.addView(layer,1);
        return viewG;
    }

    @Override
    public void addView(RNL parent, View child, int index) {
        if (child == null) {
            return;
        }
        ((FragmentAdapter)((ViewPager2)parent.findViewWithTag(86768)).getAdapter()).addFragment(child, index);
    }

    @Override
    public int getChildCount(RNL parent) {
        if(parent.findViewWithTag(86768) == null){
            return 0;
        }
        return ((FragmentAdapter)((ViewPager2)parent.findViewWithTag(86768)).getAdapter()).getItemCount();
    }


    @Override
    public View getChildAt(RNL parent, int index) {
        return    ((FragmentAdapter)((ViewPager2)parent.findViewWithTag(86768)).getAdapter()).getChildAt(index);
    }

    @Override
    public void removeView(RNL parent, View view) {
        ((FragmentAdapter)((ViewPager2)parent.findViewWithTag(86768)).getAdapter()).removeFragment(view);
    }

    @Override
    public void removeViewAt(RNL parent, int index) {
        ((FragmentAdapter)((ViewPager2)parent.findViewWithTag(86768)).getAdapter()).removeFragmentAt(index);
    }

    @Override
    public boolean needsCustomLayoutForChildren() {
        return true;
    }


    @ReactProp(name = "scrollEnabled", defaultBoolean = true)
    public void setScrollEnabled(RNL viewPager, boolean value) {
//        viewPager.setUserInputEnabled(value);
    }

    @ReactProp(name = "orientation")
    public void setOrientation(RNL viewPager, String value) {
//        viewPager.setOrientation(value.equals("vertical") ? ViewPager2.ORIENTATION_VERTICAL : ORIENTATION_HORIZONTAL);
    }


    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                PageScrollEvent.EVENT_NAME, MapBuilder.of("registrationName", "onPageScroll"),
                PageScrollStateChangedEvent.EVENT_NAME, MapBuilder.of("registrationName", "onPageScrollStateChanged"),
                PageSelectedEvent.EVENT_NAME, MapBuilder.of("registrationName", "onPageSelected"));
    }


    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of(
                "setPage",
                COMMAND_SET_PAGE,
                "setPageWithoutAnimation",
                COMMAND_SET_PAGE_WITHOUT_ANIMATION,
                "setScrollEnabled",
                COMMAND_SET_SCROLL_ENABLED);
    }

    @Override
    public void receiveCommand(@NonNull final RNL root, int commandId, @Nullable final ReadableArray args) {
        super.receiveCommand(root, commandId, args);
        Assertions.assertNotNull(root);
        Assertions.assertNotNull(args);
        switch (commandId) {
            case COMMAND_SET_PAGE: {
//                root.setCurrentItem(args.getInt(0), true);
                eventDispatcher.dispatchEvent(new PageSelectedEvent(root.getId(), args.getInt(0)));
                return;

            }
            case COMMAND_SET_PAGE_WITHOUT_ANIMATION: {
//                root.setCurrentItem(args.getInt(0), false);
                eventDispatcher.dispatchEvent(new PageSelectedEvent(root.getId(), args.getInt(0)));
                return;
            }
            case COMMAND_SET_SCROLL_ENABLED: {
//                root.setUserInputEnabled(args.getBoolean(0));
                return;
            }
            default:
                throw new IllegalArgumentException(String.format(
                        "Unsupported command %d received by %s.",
                        commandId,
                        getClass().getSimpleName()));
        }
    }


    @ReactProp(name = "pageMargin", defaultFloat = 0)
    public void setPageMargin(RNL pager, float margin) {
//        int pageMargin = (int) PixelUtil.toPixelFromDIP(margin);
//        pager.setPadding(pageMargin, pageMargin, pageMargin, pageMargin);
    }

}
