import { observable, action } from 'mobx';
import { InteractionManager, NativeModules } from 'react-native';

interface Chapter {
	title: string;
	text: string;
}

export class Store {
	constructor() {
		// So why exactly use this instead of AsyncStorage?
		// Answer is, that it's actually easier to rich
		// UserDefaults on a startup to push user to a right screen
		// (If there are no saved data, then show onboarding flow)
		// see AppDelegate and MainActivity
		NativeModules.UserDefaultsManager.getBook().then(json => {
			if (json != null) {
				this.fromString(json);
			}
		});
	}

	@observable title = '';
	@observable chapters: Array<Chapters> = [];

	// Storage to keep data from chapter edit screen inputs
	tempChapter: Chapter = {
		title: '',
		text: '',
	};

	@action
	setTitle(title: string) {
		this.title = title;
		this.commitSave();
	}

	@action
	changeChapter(index: number) {
		// It means we need to add new chapter
		if (index === -1) {
			this.chapters.push({ ...this.tempChapter });
		} else {
			this.chapters[index] = { ...this.tempChapter };
		}
		this.commitSave();
	}

	@action
	deleteChapter(indexToDelete: number) {
		this.chapters = this.chapters.filter((_, index) => index !== indexToDelete);
		this.commitSave();
	}

	changeTempChapterTitle(title: string) {
		this.tempChapter.title = title;
	}

	changeTempChapterText(text: string) {
		this.tempChapter.text = text;
	}

	commitSave() {
		InteractionManager.runAfterInteractions(() => {
			NativeModules.UserDefaultsManager.save(this.toString());
		});
	}

	// Serialization
	toString() {
		return JSON.stringify({
			title: this.title,
			chapters: this.chapters,
		});
	}

	fromString(json) {
		const { title, chapters } = JSON.parse(json);
		this.title = title;
		this.chapters = chapters;
	}

	// Singleton
	private static _instance: Store = null;
	static get sharedInstance(): Store {
		if (this._instance == null) {
			this._instance = new Store();
		}

		return this._instance;
	}
}
