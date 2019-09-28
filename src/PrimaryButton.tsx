import * as React from 'react';
import { Animated, Text, StyleSheet, ViewStyle } from 'react-native';
import {
	RawButton,
	State,
	NativeViewGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';

interface Props {
	onPress?(): void;
	style?: ViewStyle;
	contentStyle?: ViewStyle;
	children: string;
}

export class PrimaryButton extends React.Component<Props> {
	scale = new Animated.Value(1);

	tapDown = Animated.spring(this.scale, {
		velocity: 0.5,
		toValue: 0.95,
		useNativeDriver: true,
	});

	tapUp = Animated.spring(this.scale, {
		velocity: 0.5,
		toValue: 1,
		useNativeDriver: true,
	});

	onHandlerStateChange = ({ nativeEvent: { state } }: NativeViewGestureHandlerStateChangeEvent) => {
		switch (state) {
			case State.ACTIVE:
				this.tapDown.start();
				break;
			case State.END:
			case State.CANCELLED:
				this.tapUp.start();
				this.props.onPress != null && this.props.onPress();
				break;
		}
	};

	render() {
		return (
			<RawButton
				style={this.props.style}
				onGestureEvent={this.onHandlerStateChange}
				onHandlerStateChange={this.onHandlerStateChange}
				shouldCancelWhenOutside>
				<Animated.View
					style={[
						styles.container,
						this.props.contentStyle,
						{ transform: [{ scale: this.scale }] },
					]}>
					<Text style={styles.text}>{this.props.children}</Text>
				</Animated.View>
			</RawButton>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: 50,
		borderRadius: 25,
		backgroundColor: '#4886c6',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: 'rgba(0, 0, 0, 0.2)',
		shadowOpacity: 0.2,
		shadowRadius: 6,
		shadowOffset: {
			width: 0,
			height: 5,
		},
		elevation: 1,
	},
	text: {
		fontSize: 20,
		color: 'white',
	},
});
