"use client"
import React, { Suspense, useEffect, useState } from 'react'
import styles from './form.module.css'
import Input from '../input/input'
import { FetchState } from '@/types/types'
import { Loader } from '../loader/loader'
import dynamic from 'next/dynamic'
import { MDXEditorMethods } from '@mdxeditor/editor'

const MKDEditor = dynamic(() => import('../mkd-editor/mkd-editor'), { ssr: false })


const Form: React.FC = () => {

	const mkdRef = React.useRef<MDXEditorMethods>(null)

	const [title, setTitle] = useState('')
	const [securityKey, setSecurityKey] = useState('')
	const [content, setContent] = useState('')
	const [mainImage, setMainImage] = useState('')
	const [submitState, setSubmitState] = useState(FetchState.IDLE)
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		mkdRef.current?.setMarkdown('new markdown')
	}, [])


	const checkErros = () => {
		if (mainImage?.length === 0) {
			setErrorMessage("Main Image is required")
			return true
		}
		if (title?.length === 0) {
			setErrorMessage("Title is required")
			return true
		}
		if (securityKey?.length === 0) {
			setErrorMessage("Security Key is required")
			return true

		}
		if (content?.length === 0) {
			setErrorMessage("Content is required")
			return true

		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (checkErros()) return

		setSubmitState(FetchState.LOADING)

		const res = await fetch('/api', {
			method: 'POST',
			body: JSON.stringify({
				title: title,
				securityKey: securityKey,
				content: content,
				mainImage: mainImage
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const data = await res.json()
		if (data?.status === 200) {
			setSubmitState(FetchState.SUCCESS)
			setErrorMessage("")
		} else {
			setSubmitState(FetchState.ERROR)
			setErrorMessage(data?.message)
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<h1 className={styles.title}>New article Folium Ater</h1>
			{ submitState === FetchState.LOADING ? <Loader style={{ textAlign: "center" }} /> :
				<>
					<Input
						label="Photo"
						name="photo"
						value={mainImage}
						onChange={(e) => setMainImage(e.target.value)}
					/>
					{mainImage && <img src={mainImage} alt="Main Image" className={styles.image} />}

					<Input
						label="Title"
						name="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Input
						label="Security Key"
						name="securityKey"
						type="password"
						value={securityKey}
						onChange={(e) => setSecurityKey(e.target.value)}
					/>
					{/* 	<Input
						label="Content"
						name="content"
						type="textarea"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/> */}
					<div style={{ border: '1px solid black', width: "90%", position: "relative", minHeight: 300, backgroundColor: "#d4fff1" }}>
						<MKDEditor onChange={setContent} editorRef={mkdRef} markdown={content} />
					</div>
					<button type="submit" className={styles.button}>
						{submitState === FetchState.ERROR || errorMessage?.length > 0 ? "Retry" : "Submit"}
					</button>
					{errorMessage?.length > 0 && <p className={styles.error}>{errorMessage}</p>}
				</>
			}
		</form>
	)
}

export default Form
