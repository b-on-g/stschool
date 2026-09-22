namespace $ {

	$mol_style_define( $bog_stschool_board, {
		flex: { direction: 'column', grow: 1 },
		minHeight: 0,
		Tools: {
			flex: { shrink: 0, wrap: 'wrap' },
			gap: $mol_gap.space,
		},
		Sheet: {
			flex: { grow: 1 },
			position: 'relative',
			minHeight: 0,
			overflow: 'hidden',
			background: { color: '#ffffff' },
			cursor: 'crosshair',
			touchAction: 'none',
			'@': {
				bog_stschool_board_tool: {
					eraser: { cursor: 'cell' },
					text: { cursor: 'text' },
				},
			},
		},
		Paper: {
			position: 'absolute',
			inset: '0',
			width: '100%',
			height: '100%',
		},
		Stroke: {
			fill: 'none',
			stroke: { width: '3px', linecap: 'round', linejoin: 'round' },
		},
		Texts: {
			position: 'absolute',
			inset: '0',
			pointerEvents: 'none',
		},
		Text: {
			position: 'absolute',
			pointerEvents: 'auto',
			minWidth: '14rem',
			minHeight: '2.5rem',
			font: { size: '1.5rem' },
			color: '#1a1a1a',
			background: { color: 'transparent' },
			resize: 'both',
			overflow: 'hidden',
			whiteSpace: 'pre-wrap',
		},
	})

}
