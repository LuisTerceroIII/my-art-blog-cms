
import React from 'react'

import {
	diffSourcePlugin,
	AdmonitionDirectiveDescriptor,
	directivesPlugin,
	frontmatterPlugin,
	headingsPlugin,
	imagePlugin,
	linkDialogPlugin,
	linkPlugin,
	listsPlugin,
	quotePlugin,
	thematicBreakPlugin,
	toolbarPlugin,
	DiffSourceToggleWrapper,
	UndoRedo,
	BlockTypeSelect,
	BoldItalicUnderlineToggles,
	InsertImage,
	CreateLink,
} from '@mdxeditor/editor'

export async function expressImageUploadHandler(image) {
	const formData = new FormData()
	formData.append('image', image)
	const response = await fetch('/uploads/new', { method: 'POST', body: formData })
	const json = (await response.json())
	return json.url
}

export const ALL_PLUGINS = [
	toolbarPlugin({
		toolbarContents: () => (
			<>
				<DiffSourceToggleWrapper>
					<UndoRedo />
					<BlockTypeSelect />
					<BoldItalicUnderlineToggles />
					<InsertImage />
					<CreateLink />
				</DiffSourceToggleWrapper>
			</>

		)
	}),
	listsPlugin(),
	quotePlugin(),
	headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
	linkPlugin(),
	linkDialogPlugin(),
	imagePlugin({
		imageAutocompleteSuggestions: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
		imageUploadHandler: async () => Promise.resolve('https://picsum.photos/200/300')
	}),
	thematicBreakPlugin(),
	frontmatterPlugin(),
	directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
	diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
]