export const visualizerConfiguration = (flunctuations: Uint8Array | null) =>
	flunctuations === null
		? [
				{
					height: '4',
					percentage: 0,
				},
				{
					height: '8',
					percentage: 0,
				},
				{
					height: '16',
					percentage: 0,
				},
				{
					height: '8',
					percentage: 0,
				},
				{
					height: '4',
					percentage: 0,
				},
				{
					height: '4',
					percentage: 0,
				},
				{
					height: '8',
					percentage: 0,
				},
				{
					height: '16',
					percentage: 0,
				},
				{
					height: '8',
					percentage: 0,
				},
				{
					height: '4',
					percentage: 0,
				},
		  ]
		: [
				{
					height: '4',
					percentage: flunctuations['0'],
				},
				{
					height: '8',
					percentage: flunctuations['1'],
				},
				{
					height: '16',
					percentage: flunctuations['2'],
				},
				{
					height: '8',
					percentage: flunctuations['3'],
				},
				{
					height: '4',
					percentage: flunctuations['4'],
				},
				{
					height: '4',
					percentage: flunctuations['5'],
				},
				{
					height: '8',
					percentage: flunctuations['6'],
				},
				{
					height: '16',
					percentage: flunctuations['7'],
				},
				{
					height: '8',
					percentage: flunctuations['8'],
				},
				{
					height: '4',
					percentage: flunctuations['9'],
				},
		  ];
