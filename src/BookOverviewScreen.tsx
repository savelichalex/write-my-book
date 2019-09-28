import * as React from 'react';
import { Animated, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export class BookOverviewScreen extends React.Component {
	scrollY = new Animated.Value(0);

	headerY = this.scrollY.interpolate({
		inputRange: [0, HEADER_SCROLL_DISTANCE],
		outputRange: [1, 1 - HEADER_SCROLL_DISTANCE],
		extrapolate: 'clamp',
	});

	headerTitleOpacity = new Animated.Value(0);
	isHeaderTitleOpacityActive = false;
	showHeaderTitle = Animated.spring(this.headerTitleOpacity, {
		toValue: 1,
		useNativeDriver: true,
	});
	hideHeaderTitle = Animated.spring(this.headerTitleOpacity, {
		toValue: 0,
		useNativeDriver: true,
	});

	onScroll = ({ nativeEvent }) => {
		const offset = nativeEvent.contentOffset.y;
		this.scrollY.setValue(offset);

		if (offset > HEADER_MIN_HEIGHT && !this.isHeaderTitleOpacityActive) {
			this.isHeaderTitleOpacityActive = true;
			this.showHeaderTitle.start();
		}
		if (offset <= HEADER_MIN_HEIGHT && this.isHeaderTitleOpacityActive) {
			this.isHeaderTitleOpacityActive = false;
			this.hideHeaderTitle.start();
		}
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<Animated.ScrollView
					contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
					scrollEventThrottle={1}
					contentInsetAdjustmentBehavior="automatic"
					onScroll={this.onScroll}>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
					<Text>---</Text>
				</Animated.ScrollView>
				<SafeAreaView style={{ position: 'absolute', left: 0, right: 0 }}>
					<View style={{ position: 'relative' }}>
						<Animated.View
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								overflow: 'hidden',
								height: HEADER_MAX_HEIGHT,
								paddingHorizontal: 10,
								paddingVertical: 10,
								borderBottomColor: 'rgba(0,0,0,.1)',
								borderBottomWidth: 1,
								flexDirection: 'column',
								justifyContent: 'flex-end',
								backgroundColor: 'white',
								transform: [{ translateY: this.headerY }],
							}}>
							<Text
								style={{ fontSize: 30, fontWeight: 'bold' }}
								adjustsFontSizeToFit
								numberOfLines={1}>
								The catcher in the rye
							</Text>
						</Animated.View>
						<Animated.View
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								overflow: 'hidden',
								height: HEADER_MIN_HEIGHT,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								paddingHorizontal: 10,
								backgroundColor: 'white',
								paddingHorizontal: '15%',
							}}>
							<Animated.Text
								adjustsFontSizeToFit
								numberOfLines={1}
								style={{ fontSize: 17, fontWeight: 'bold', opacity: this.headerTitleOpacity }}>
								The catcher in the rye
							</Animated.Text>
							<TouchableOpacity
								style={{ position: 'absolute', right: 10 }}
								hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}>
								<Text style={{ fontSize: 17, color: '#4886c6' }}>Edit</Text>
							</TouchableOpacity>
						</Animated.View>
					</View>
				</SafeAreaView>
			</View>
		);
	}
}
