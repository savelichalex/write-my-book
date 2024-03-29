import * as React from 'react';
import { observer } from 'mobx-react';
import {
	Animated,
	View,
	Text,
	TextInput,
	SafeAreaView,
	TouchableOpacity,
	FlatList,
	StyleSheet,
	NativeModules,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Navigation } from './Navigation';
import { Store } from './Store';

const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 44;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

interface State {
	isEditingTitle: boolean;
}

@observer
export class BookOverviewScreen extends React.Component<void, State> {
	state = {
		isEditingTitle: false,
	};

	private scrollY = new Animated.Value(0);

	private headerY = this.scrollY.interpolate({
		inputRange: [0, HEADER_SCROLL_DISTANCE],
		outputRange: [1, 1 - HEADER_SCROLL_DISTANCE],
		extrapolate: 'clamp',
	});

	private headerTitleOpacity = new Animated.Value(0);
	private isHeaderTitleOpacityActive = false;
	private showHeaderTitle = Animated.spring(this.headerTitleOpacity, {
		toValue: 1,
		useNativeDriver: true,
	});
	private hideHeaderTitle = Animated.spring(this.headerTitleOpacity, {
		toValue: 0,
		useNativeDriver: true,
	});

	private listRef = React.createRef<FlatList>();

	private onScroll = ({ nativeEvent }) => {
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

	private renderSwipeToDelete = index => (progress, dragX) => (
		<RectButton
			style={{
				backgroundColor: '#dd2c00',
				justifyContent: 'center',
				paddingHorizontal: 20,
			}}
			onPress={() => {
				Store.sharedInstance.deleteChapter(index);
			}}>
			<Animated.Text style={{ fontSize: 17, color: 'white' }}>Delete</Animated.Text>
		</RectButton>
	);

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					ref={this.listRef}
					style={styles.list}
					keyboardDismissMode="on-drag"
					contentContainerStyle={styles.listContent}
					scrollEventThrottle={1}
					contentInsetAdjustmentBehavior="automatic"
					onScroll={this.onScroll}
					data={Store.sharedInstance.chapters.map(({ title, text }, index) => ({
						key: title + index,
						title,
						text,
					}))}
					renderItem={({ item, index }) => (
						<Swipeable renderRightActions={this.renderSwipeToDelete(index)}>
							<RectButton
								style={styles.listRowButton}
								onPress={() => {
									Navigation.present('ChapterEditScreen', { id: index }, id =>
										// That's definetely not a best solution
										// it's just how I managed to pass a callback
										// to "Save" button on native side
										Store.sharedInstance.changeChapter(id)
									);
								}}>
								<Text style={styles.listRowIndex}>{index + 1}.</Text>
								<View style={styles.listRowTextStack}>
									<Text style={styles.listRowChapterTitle}>{item.title}</Text>
									<Text style={styles.listRowChapterPreview} numberOfLines={2}>
										{item.text}
									</Text>
								</View>
							</RectButton>
						</Swipeable>
					)}
					ItemSeparatorComponent={() => <View style={styles.separator} />}
				/>
				<Animated.View
					style={[
						styles.header,
						{
							transform: [{ translateY: this.headerY }],
						},
					]}>
					{this.state.isEditingTitle ? (
						<TextInput
							style={styles.headerTitle}
							numberOfLines={1}
							autoFocus
							defaultValue={Store.sharedInstance.title}
							onChangeText={t => Store.sharedInstance.setTitle(t)}
						/>
					) : (
						<Text style={styles.headerTitle} adjustsFontSizeToFit numberOfLines={1}>
							{Store.sharedInstance.title}
						</Text>
					)}
				</Animated.View>
				<Animated.View style={styles.secondaryHeader}>
					<Animated.Text
						adjustsFontSizeToFit
						numberOfLines={1}
						style={[styles.secondaryHeaderTitle, { opacity: this.headerTitleOpacity }]}>
						{Store.sharedInstance.title}
					</Animated.Text>
					<TouchableOpacity
						style={styles.editWrapper}
						hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}
						onPress={() => {
							if (this.state.isEditingTitle) {
								this.setState({ isEditingTitle: false });
								return;
							}
							this.listRef.current.scrollToOffset({ offset: 0 });
							this.setState({ isEditingTitle: true });
						}}>
						<Text style={styles.editText}>{this.state.isEditingTitle ? 'Save' : 'Edit'}</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.addWrapper}
						hitSlop={{ top: 15, left: 15, right: 15, bottom: 15 }}
						onPress={() => {
							Navigation.present('ChapterEditScreen', { id: -1 }, id =>
								// That's definetely not a best solution
								// it's just how I managed to pass a callback
								// to "Save" button on native side
								Store.sharedInstance.changeChapter(id)
							);
						}}>
						<Text style={styles.editText}>Add</Text>
					</TouchableOpacity>
				</Animated.View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	list: {
		flex: 1,
		backgroundColor: 'white',
	},
	listContent: {
		paddingTop: HEADER_MAX_HEIGHT,
	},
	listRowButton: {
		flexDirection: 'row',
		paddingLeft: 15,
		paddingRight: 20,
		paddingVertical: 15,
		backgroundColor: 'white',
	},
	listRowIndex: {
		fontSize: 17,
		fontWeight: 'bold',
		color: 'rgba(0,0,0,.3)',
		width: 30, // To keep chapter titles on a same line with either 1 and 2 digit numbers
	},
	listRowTextStack: {
		flex: 1,
		flexDirection: 'column',
	},
	listRowChapterTitle: {
		fontSize: 17,
		fontWeight: 'bold',
		color: 'black',
		marginBottom: 5,
	},
	listRowChapterPreview: {
		fontSize: 17,
		color: 'rgba(0,0,0,.2)',
	},
	separator: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: 'rgba(0,0,0,.2)',
		marginHorizontal: 15,
	},
	safeArea: {
		position: 'absolute',
		left: 0,
		right: 0,
	},
	header: {
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
		backgroundColor: '#f6f8fa',
	},
	headerTitle: {
		fontSize: 30,
		fontWeight: 'bold',
		padding: 0,
	},
	secondaryHeader: {
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
		backgroundColor: '#f6f8fa',
		paddingHorizontal: '15%',
	},
	secondaryHeaderTitle: {
		fontSize: 17,
		fontWeight: 'bold',
	},
	editWrapper: {
		position: 'absolute',
		left: 10,
	},
	addWrapper: {
		position: 'absolute',
		right: 10,
	},
	editText: {
		fontSize: 17,
		color: '#4886c6',
	},
});
