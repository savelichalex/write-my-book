import * as React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Animated,
	Dimensions,
	TextInput,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import { PrimaryButton } from './PrimaryButton';
import { Navigation } from './Navigation';

const { width } = Dimensions.get('window');

export class NewcomerScreen extends React.Component {
	firstTranslate = new Animated.Value(0);
	firstOpacity = new Animated.Value(1);

	moveFirstAway = Animated.parallel([
		Animated.timing(this.firstTranslate, {
			toValue: -1 * width,
			duration: 200,
			useNativeDriver: true,
		}),
		Animated.timing(this.firstOpacity, {
			toValue: 0,
			duration: 200,
			useNativeDriver: true,
		}),
	]);

	secondTranslate = new Animated.Value(width);
	secondOpacity = new Animated.Value(0);

	moveSecond = Animated.parallel([
		Animated.timing(this.secondTranslate, {
			toValue: 0,
			duration: 200,
			useNativeDriver: true,
		}),
		Animated.timing(this.secondOpacity, {
			toValue: 1,
			duration: 200,
			useNativeDriver: true,
		}),
	]);

	titleInputRef = React.createRef<TextInput>();

	render() {
		return (
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.select({ ios: 'padding', android: null })}>
				<View style={{ position: 'relative' }}>
					<Animated.View
						style={[
							styles.innerStack,
							{ transform: [{ translateX: this.firstTranslate }], opacity: this.firstOpacity },
						]}>
						<Text style={styles.label}>Let's create a new amazing book!</Text>
						<PrimaryButton
							onPress={() => {
								this.moveFirstAway.start();
								this.moveSecond.start();
								this.titleInputRef.current.focus();
							}}>
							Start
						</PrimaryButton>
					</Animated.View>
					<Animated.View
						style={[
							styles.innerStack,
							StyleSheet.absoluteFillObject,
							{ transform: [{ translateX: this.secondTranslate }], opacity: this.secondOpacity },
						]}>
						<Text style={styles.label}>Make a book title</Text>
						<View style={styles.inputWrapper}>
							<TextInput ref={this.titleInputRef} style={styles.input} multiline />
						</View>
						<PrimaryButton
							onPress={() => {
								Navigation.present(
									'ChapterEditScreen',
									{
										id: -1,
									},
									() => {
										Navigation.present('BookOverviewScreen');
									}
								);
							}}>
							Next
						</PrimaryButton>
					</Animated.View>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	innerStack: {
		flexDirection: 'column',
		marginHorizontal: '18%',
	},
	label: {
		fontSize: 30,
		textAlign: 'center',
		marginBottom: 20,
	},
	inputWrapper: {
		paddingHorizontal: 20,
		marginBottom: 30,
	},
	input: {
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
