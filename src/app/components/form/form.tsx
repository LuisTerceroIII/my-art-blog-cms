"use client"
import React, { useState } from 'react'
import styles from './form.module.css'
import Input from '../input/input'
import { FetchState } from '@/types/types'
import { Loader } from '../loader/loader'

const Form: React.FC = () => {

	const [title, setTitle] = useState('')
	const [securityKey, setSecurityKey] = useState('')
	const [content, setContent] = useState('')
	const [mainImage, setMainImage] = useState('')
	const [submitState, setSubmitState] = useState(FetchState.IDLE)
	const [formHasError, setFormHasError] = useState(false)

	const checkErros = () => {
		if (title?.length === 0) {
			setFormHasError(true)
		}
		if (securityKey?.length === 0) {
			setFormHasError(true)
		}
		if (content?.length === 0) {
			setFormHasError(true)
		}
		if (mainImage?.length === 0) {
			setFormHasError(true)
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		checkErros()
		if (formHasError) return
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
		});

		const data = await res?.json()
		//
		if (res?.status === 200) setSubmitState(FetchState.SUCCESS)
		else setSubmitState(FetchState.ERROR)



	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<h1 className={styles.title}>New article Folium Ater</h1>
			{submitState === FetchState.LOADING ? <Loader style={{ textAlign: "center" }} /> :
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
					<Input
						label="Content"
						name="content"
						type="textarea"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
					<button type="submit" className={styles.button}>
						{submitState === FetchState.ERROR ? "Retry" : "Submit"}
					</button>
				</>
			}
		</form>
	)
}

export default Form
