package com.reactnativecommunity.viewpager;

import android.content.Context;
import android.graphics.Color;
import android.util.Log;
import android.util.SparseArray;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.recyclerview.widget.RecyclerView;


import com.reactnative.community.viewpager2.adapter.FragmentStateAdapter;

import java.util.ArrayList;
import java.util.List;


public class FragmentAdapter extends RecyclerView.Adapter<FragmentAdapter.ReactNativeViewHolder> {

    private ArrayList<View> reactChildrenViews = new ArrayList();

    class RNL extends FrameLayout {

        public RNL(Context context) {
            super(context);
        }

        @Override
        protected void onLayout(boolean changed, int l, int t, int r, int b) {
            super.onLayout(changed,l,t,r,b);
        }


        @Override
        public boolean dispatchTouchEvent(MotionEvent ev) {
//            Log.d("aaa", "dispatchTouchEvent: " + String.valueOf(super.dispatchTouchEvent(ev)));
            return false;
        }

    }

    @NonNull
    @Override
    public ReactNativeViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        RNL rootView = new RNL(parent.getContext());
        rootView.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT));
        rootView.setBackgroundColor(Color.parseColor("#32a852"));
        return new ReactNativeViewHolder(rootView);
    }

    @Override
    public void onBindViewHolder(@NonNull ReactNativeViewHolder holder, int position) {
        holder.bind(reactChildrenViews.get(position));

    }

    @Override
    public int getItemCount() {
        return reactChildrenViews.size();
    }

    public void addFragment(View reactNativeChild, int index) {
        reactChildrenViews.add(index, reactNativeChild);
    }

    public View getChildAt(int index) {
        return reactChildrenViews.get(index);
    }

    public void removeFragment(View view) {

    }

    public void removeFragmentAt(int index) {

    }

    class ReactNativeViewHolder extends RecyclerView.ViewHolder {

        public ReactNativeViewHolder(@NonNull View itemView) {
            super(itemView);
        }

        public void bind(View view) {
            RNL rootview = (RNL) itemView;
            rootview.addView(view);
        }
    }
}
