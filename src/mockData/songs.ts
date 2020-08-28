export type Song = {
	name: string;
	singer: string;
	stared: boolean;
}

export const songs: Record<string, Song[]> = {
	pop: [{
		name: 'Dynamite',
		singer: 'BTS',
		stared: false
	},{
		name: 'Watermelon Sugar',
		singer: 'Harry Styles',
		stared: false
	},{
		name: 'Savage Love',
		singer: 'Jawsh 685 x Jason Derulo',
		stared: false
	},{
		name: 'Midnight Sky',
		singer: 'Miley Cyrus',
		stared: false
	},{
		name: 'Be Like That',
		singer: 'Kane Brown, Swae Lee, Khalid',
		stared: false
	},{
		name: 'Rain On Me',
		singer: 'Lady Gaga & Ariana Grande',
		stared: false
	}],
	country: [{
		name: 'New Normal',
		singer: 'Cooper Alan',
		stared: false
	},{
		name: 'Starting Over',
		singer: 'Chris Stapleton',
		stared: false
	},{
		name: 'Got What I Got',
		singer: 'Jason Aldean',
		stared: false
	},{
		name: 'I Hope (feat. Charlie Puth)',
		singer: 'Gabby Barrett',
		stared: false
	},{
		name: 'One of Them Girls',
		singer: 'Lee Brice',
		stared: false
	},{
		name: 'Happy Anywhere',
		singer: 'Blake Shelton',
		stared: false
	}],
	electronic: [{
		name: 'Mirror',
		singer: 'Porter Robinson',
		stared: false
	},{
		name: 'Sunset Lover',
		singer: 'Petit Biscuit',
		stared: false
	},{
		name: 'Tick Tock',
		singer: 'Clean Bandit & Mabel',
		stared: false
	},{
		name: 'Latch',
		singer: 'Disclosure',
		stared: false
	},{
		name: 'Get You the Moon',
		singer: 'Kina',
		stared: false
	},{
		name: 'Flower',
		singer: 'Moby',
		stared: false
	}],
	rock: [{
		name: 'Snowblood',
		singer: 'ERRA',
		stared: false
	},{
		name: 'A Little Bit Off',
		singer: 'Five Finger Death Punch',
		stared: false
	},{
		name: 'Enter Sandman',
		singer: 'Metallica',
		stared: false
	},{
		name: 'In the Air Tonight',
		singer: 'Phil Collins',
		stared: false
	},{
		name: 'Wolf Totem',
		singer: 'The Hu',
		stared: false
	},{
		name: 'Popular Monster',
		singer: 'Falling In Reverse',
		stared: false
	}],
}
