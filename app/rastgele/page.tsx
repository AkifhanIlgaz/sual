'use client'

import { KelamQuestions, mantıkQuestions, Question, UsulQuestions } from '@/config/questions'
import Link from 'next/link'
import { useState } from 'react'

export default function Rastgele() {
	const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)

	const handleRandomSelect = (category: 'Mantık' | 'Usul' | 'Kelam') => {
		let questions: Question[]
		switch (category) {
			case 'Mantık':
				questions = mantıkQuestions
				break
			case 'Usul':
				questions = UsulQuestions
				break
			case 'Kelam':
				questions = KelamQuestions
				break
		}

		const randomIndex = Math.floor(Math.random() * questions.length)
		setSelectedQuestion(questions[randomIndex])
	}

	const clearQuestion = () => {
		setSelectedQuestion(null)
	}

	return (
		<section className="flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-20 py-4 sm:py-6 md:py-10 text-white">
			{selectedQuestion ? (
				<div className="p-6 bg-gray-800 rounded-lg max-w-2xl w-full text-center">
					<p className="text-4xl">{selectedQuestion.text}</p>
				</div>
			) : (
				<div className="p-6 bg-gray-800 rounded-lg max-w-2xl w-full text-center">
					<p className="text-lg text-gray-400">Lütfen bir kitaptan soru seçin</p>
				</div>
			)}

			<div className="flex flex-col sm:flex-row gap-20 text-4xl font-light mt-8">
				<button onClick={() => handleRandomSelect('Mantık')} className="p-6 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
					علم منطق
				</button>
				<button onClick={() => handleRandomSelect('Usul')} className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
					اصول فقه
				</button>
				<button onClick={() => handleRandomSelect('Kelam')} className="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors">
					علم كلام
				</button>
			</div>

			<Link href="/" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors mt-8">
				Ana Sayfaya Dön
			</Link>
		</section>
	)
}
