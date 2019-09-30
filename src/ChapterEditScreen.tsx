import * as React from 'react';
import {
	KeyboardAvoidingView,
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableWithoutFeedback,
	Platform,
	ScrollView,
} from 'react-native';
import { Store } from './Store';

interface Props {
	id: number;
}

export class ChapterEditScreen extends React.Component<Props> {
	render() {
		let defaultTitle = '';
		let defaultText = '';
		if (this.props.id !== -1) {
			defaultTitle = Store.sharedInstance.chapters[this.props.id].title;
			defaultText = Store.sharedInstance.chapters[this.props.id].text;
		}
		return (
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.select({ ios: 'padding', android: null })}>
				<View style={styles.titleRow}>
					<Text style={styles.titleRowLabel}>Title</Text>
					<TextInput
						style={styles.titleRowInput}
						placeholder="My new marvelous chapter"
						returnKeyType="next"
						defaultValue={defaultTitle}
						onChangeText={t => Store.sharedInstance.changeTempChapterTitle(t)}
					/>
				</View>
				<Text style={styles.textLable}>TEXT</Text>
				<View style={styles.textInputWrapper}>
					<TextInput
						ref={this.textRef}
						multiline
						placeholder="Start writing here..."
						style={styles.textInput}
						defaultValue={defaultText}
						onChangeText={t => Store.sharedInstance.changeTempChapterText(t)}
					/>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#f6f8fa',
	},
	titleRow: {
		flexDirection: 'row',
		height: 50,
		paddingHorizontal: 15,
		alignItems: 'center',
		marginTop: 30,
		backgroundColor: 'white',
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: 'rgba(0,0,0,.2)',
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: 'rgba(0,0,0,.2)',
	},
	titleRowLabel: {
		fontSize: 17,
		marginRight: 20,
	},
	titleRowInput: {
		fontSize: 17,
	},
	textLable: {
		fontSize: 14,
		fontWeight: '200',
		marginLeft: 15,
		marginTop: 30,
		marginBottom: 5,
		color: 'rgba(0,0,0,.2)',
	},
	textInputWrapper: {
		flex: 1,
		backgroundColor: 'white',
		overflow: 'hidden',
	},
	textInput: {
		fontSize: 17,
		paddingHorizontal: 15,
		paddingTop: 15,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: 'rgba(0,0,0,.2)',
		//height: '100%',
		// width: '100%',
	},
});
