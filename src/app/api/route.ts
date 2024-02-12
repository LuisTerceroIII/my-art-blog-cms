import { DocumentReference, addDoc, collection, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/firebase";
import { Article, ArticleState } from "@/types/types";
import { NextResponse } from "next/server";
import { UploadResult, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const userId = "z7N9PDPdk10f19juqkAT"

export async function GET() {
	const articlesRef = collection(db, "articles")
	const q = query(articlesRef, orderBy("publishedDate", "desc"), where("author.id", "==", userId))
	const querySnapshot = await getDocs(q)
	const data: Article[] = querySnapshot?.docs?.map((doc) => ({
		id: doc?.id,
		title: doc.data()?.title,
		contentFile: doc.data()?.contentFile,
		publishedDate: doc.data()?.publishedDate,
		editedDates: doc.data()?.editedDates,
		state: doc.data()?.state,
		main_photo_url: doc.data()?.main_photo_url
	}))
	return NextResponse.json(data)
}

//articles/z7N9PDPdk10f19juqkAT/EqoxJwj9GJjDMerCO3JA
export async function POST(req: Request) {

	const body = await req.json()
	try {
		const newArticleRef: DocumentReference = await addDoc(collection(db, "articles"), Object.assign(
			{
				author: {
					id: "z7N9PDPdk10f19juqkAT",
					alias: "Izius"
				},
				title: body?.title,
				contentFile: {
					id: "",
					path: "",
					url: ""
				},
				publishedDate: new Date(),
				editedDates: [],
				state: ArticleState.PUBLISHED,
				main_photo_url: body?.mainImage
			}
		))
		
		const storage = getStorage()
		const newFileRef = ref(storage, `articles/${userId}/${newArticleRef?.id}/${body.title}.md`)

		const fileBlob = new Blob([body?.content], { type: "text/plain" })
		
		await uploadBytes(newFileRef, fileBlob).then((snapshot: UploadResult) => {
			console.log('Uploaded a blob or file!')
		})

		const downloadURL = await getDownloadURL(newFileRef)
		
		await updateDoc(newArticleRef, {
			'contentFile.url': downloadURL,
			'contentFile.path': `articles/${userId}/${newArticleRef?.id}`
		});

		return NextResponse.json({
			status: 200,
			message: 'Article created successfully',
			articleId: newArticleRef.id,
		})
	} catch (e) {
		console.log("Error", JSON.stringify(e))
		return NextResponse.json({
			status: 500,
			message: 'Error creating article',
		})
	}
}