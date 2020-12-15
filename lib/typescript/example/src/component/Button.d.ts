/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
declare type Props = {
    disabled?: boolean;
    onPress: () => void;
    text: string;
    style?: StyleProp<ViewStyle>;
};
export declare class Button extends React.Component<Props> {
    _handlePress: () => void;
    render(): JSX.Element;
}
export {};
