'use client'

import { AdmonitionDirectiveDescriptor, BlockTypeSelect, BoldItalicUnderlineToggles, ChangeAdmonitionType, ChangeCodeMirrorLanguage, CodeToggle, CreateLink, DiffSourceToggleWrapper, InsertAdmonition, InsertCodeBlock, InsertFrontmatter, InsertImage, InsertSandpack, MDXEditor, MDXEditorMethods, Separator, UndoRedo, diffSourcePlugin, directivesPlugin, headingsPlugin, imagePlugin, linkDialogPlugin, linkPlugin, listsPlugin, markdownShortcutPlugin, quotePlugin, thematicBreakPlugin, toolbarPlugin } from "@mdxeditor/editor"
import {FC} from 'react'
import styles from "./mkd-editor.module.css"
import '@mdxeditor/editor/style.css'
import { ALL_PLUGINS } from "./all-plugins"

interface EditorProps {
  markdown: string
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>
  onChange?: (markdown: string) => void
}

const MKDEditor: FC<EditorProps> = ({ markdown, editorRef, onChange }) => {
  return <MDXEditor
            contentEditableClassName={styles.container}
            className={`${styles.container}`} 
            ref={editorRef} 
            markdown={markdown} 
            onChange={onChange} 
            plugins={ALL_PLUGINS}
             />
}

export default MKDEditor