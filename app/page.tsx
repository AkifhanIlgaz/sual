'use client'
import { KelamQuestions, mantıkQuestions, Question, UsulQuestions } from '@/config/questions'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { NumberInput } from '@heroui/number-input'
import { AlignmentType, BorderStyle, Document, FileChild, Packer, Paragraph, Table, TableCell, TableRow, TextRun, UnderlineType, WidthType } from 'docx'
import { useState } from 'react'
const horizontalLine = new Paragraph({
	border: {
		bottom: {
			color: '000000',
			space: 1,
			style: BorderStyle.SINGLE,
			size: 6
		}
	}
})

// Tablo satırı ve hücreleri (iki sütun)
const table = new Table({
	rows: [
		new TableRow({
			children: [
				new TableCell({
					width: { size: 50, type: WidthType.PERCENTAGE },

					children: [
						new Paragraph({
							alignment: AlignmentType.START,
							children: [
								new TextRun({
									text: 'Adı Soyadı:',
									size: 24,
									font: 'Arial (CS Gövde)'
								})
							]
						})
					]
				}),
				new TableCell({
					width: { size: 50, type: WidthType.PERCENTAGE },
					margins: {
						right: 1111
					},
					children: [
						new Paragraph({
							alignment: AlignmentType.END,
							children: [
								new TextRun({
									text: 'Not:',
									size: 24,
									font: 'Arial (CS Gövde)'
								})
							]
						})
					]
				})
			]
		})
	],
	width: {
		size: 100,
		type: WidthType.PERCENTAGE
	},
	borders: {
		top: {
			size: 0,
			color: 'FFFFFF',
			style: 'none'
		},
		bottom: {
			size: 0,
			color: 'FFFFFF',
			style: 'nil'
		},
		left: {
			size: 0,
			color: 'FFFFFF',
			style: 'nil'
		},
		right: {
			size: 0,
			color: 'FFFFFF',
			style: 'nil'
		},
		insideHorizontal: {
			size: 0,
			color: 'FFFFFF',
			style: 'nil'
		},
		insideVertical: {
			size: 0,
			color: 'FFFFFF',
			style: 'nil'
		}
	}
})

function generateHeader(title: string): FileChild[] {
	return [
		table,
		new Paragraph({
			alignment: AlignmentType.START,
			children: [
				new TextRun({
					text: 'Müzakere Grubu: ',
					size: 24,
					font: 'Arial (CS Gövde)'
				})
			]
		}),
		new Paragraph({
			alignment: AlignmentType.CENTER,
			children: [
				new TextRun({
					text: title,
					italics: true,
					size: 24,
					font: 'Arial (CS Gövde)'
				})
			]
		}),

		horizontalLine
	]
}

function generateMantikQuestions(questions: Question[], startOrder: number): Paragraph[] {
	if (questions.length == 0) {
		return []
	}

	const title = generateSectionTitle(`علم منطق`)
	let currentOrder = startOrder
	return [
		title,
		...questions
			.map(question => {
				const paragraphs = generateQuestion(question, currentOrder)
				currentOrder++
				return paragraphs
			})
			.flat()
	]
}

function generateUsulQuestions(questions: Question[], startOrder: number): Paragraph[] {
	if (questions.length == 0) {
		return []
	}
	const title = generateSectionTitle(`اصول فقه`)
	let currentOrder = startOrder
	return [
		title,
		...questions
			.map(question => {
				const paragraphs = generateQuestion(question, currentOrder)
				currentOrder++
				return paragraphs
			})
			.flat()
	]
}

function generateKelamQuestions(questions: Question[], startOrder: number): Paragraph[] {
	if (questions.length == 0) {
		return []
	}
	const title = generateSectionTitle(`علم كلام`)
	let currentOrder = startOrder
	return [
		title,
		...questions
			.map(question => {
				const paragraphs = generateQuestion(question, currentOrder)
				currentOrder++
				return paragraphs
			})
			.flat()
	]
}

function generateSectionTitle(title: string): Paragraph {
	return new Paragraph({
		alignment: AlignmentType.CENTER,
		children: [
			new TextRun({
				text: title,
				rightToLeft: true,
				bold: true,
				size: 42,
				font: 'Traditional Arabic',
				underline: {
					type: UnderlineType.SINGLE,
					color: '000000'
				}
			})
		]
	})
}

function generateDottedLines(lineCount: number): Paragraph[] {
	const lines: Paragraph[] = []

	for (let i = 0; i < lineCount; i++) {
		lines.push(
			new Paragraph(``),
			new Paragraph({
				border: {
					bottom: {
						space: 0,
						style: BorderStyle.DASHED,
						color: '000000',

						size: 6
					}
				}
			})
		)
	}

	lines.push(new Paragraph(``))

	return lines
}

function generateQuestion(question: Question, orderNumber: number): Paragraph[] {
	// Convert number to Arabic numerals
	const arabicNumber = orderNumber.toString().replace(/[0-9]/g, d => String.fromCharCode(d.charCodeAt(0) + 1584))

	// Add period only if the question doesn't end with a question mark
	const questionText = question.text.trim().endsWith('؟') ? question.text : question.text + '.'

	return [
		new Paragraph({
			alignment: AlignmentType.RIGHT,
			children: [
				new TextRun({
					text: arabicNumber + '-' + questionText,
					rightToLeft: true,
					bold: true,
					size: 34,
					font: 'Traditional Arabic',
					underline: {
						type: UnderlineType.SINGLE,
						color: '000000'
					}
				}),
				new TextRun({
					text: ` `,
					rightToLeft: true,
					bold: true,
					size: 34,
					font: 'Traditional Arabic'
				})
			]
		}),
		...generateDottedLines(question.lineCount)
	]
}

function getRandomQuestions(questions: Question[], count: number, min: number, max: number): Question[] {
	// Filter questions within the range
	const filteredQuestions = questions.filter(q => q.index >= min && q.index <= max)

	// If we don't have enough questions in the range, return all available
	if (filteredQuestions.length <= count) {
		return filteredQuestions
	}

	// Shuffle array using Fisher-Yates algorithm
	const shuffled = [...filteredQuestions]
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
	}

	// Return the first 'count' questions
	return shuffled.slice(0, count)
}

export default function Home() {
	const [mantikQuestionCount, setMantikQuestionCount] = useState<number>()
	const [mantikRangeMin, setMantikRangeMin] = useState<number>()
	const [mantikRangeMax, setMantikRangeMax] = useState<number>()

	const [usulQuestionCount, setUsulQuestionCount] = useState<number>()
	const [usulRangeMin, setUsulRangeMin] = useState<number>()
	const [usulRangeMax, setUsulRangeMax] = useState<number>()

	const [kelamQuestionCount, setKelamQuestionCount] = useState<number>()
	const [kelamRangeMin, setKelamRangeMin] = useState<number>()
	const [kelamRangeMax, setKelamRangeMax] = useState<number>()
	const [error, setError] = useState<string>('')
	const [title, setTitle] = useState<string>('')

	function resetForm() {
		setMantikQuestionCount(undefined)
		setMantikRangeMin(undefined)
		setMantikRangeMax(undefined)
		setUsulQuestionCount(undefined)
		setUsulRangeMin(undefined)
		setUsulRangeMax(undefined)
		setKelamQuestionCount(undefined)
		setKelamRangeMin(undefined)
		setKelamRangeMax(undefined)
		setError('')
		setTitle('')
	}

	async function createDocument() {
		try {
			if (!title.trim()) {
				setError('Lütfen bir başlık giriniz!')
				return
			}

			const totalQuestions = (mantikQuestionCount || 0) + (usulQuestionCount || 0) + (kelamQuestionCount || 0)

			if (totalQuestions > 10) {
				setError("Toplam soru sayısı 10'dan büyük olamaz!")
				return
			}

			if (totalQuestions <= 0) {
				setError("Soru sayısı 0'dan büyük olmalı!")
				return
			}

			// Validate that if question count is entered, range must be entered too
			if (mantikQuestionCount && (!mantikRangeMin || !mantikRangeMax)) {
				setError('Mantık soru sayısı girildiğinde soru aralığı da girilmelidir!')
				return
			}

			if (usulQuestionCount && (!usulRangeMin || !usulRangeMax)) {
				setError('Usul soru sayısı girildiğinde soru aralığı da girilmelidir!')
				return
			}

			if (kelamQuestionCount && (!kelamRangeMin || !kelamRangeMax)) {
				setError('Kelam soru sayısı girildiğinde soru aralığı da girilmelidir!')
				return
			}

			// Validate ranges
			if (mantikRangeMin && mantikRangeMax) {
				if (mantikRangeMin > mantikRangeMax) {
					setError('Mantık soru aralığı geçersiz!')
					return
				}
				if (mantikRangeMax > 14) {
					setError("Mantık soru aralığı 14'ten büyük olamaz!")
					return
				}
				// Check if there are questions in the range
				const questionsInRange = mantıkQuestions.filter(q => q.index >= mantikRangeMin && q.index <= mantikRangeMax)
				if (questionsInRange.length === 0) {
					setError('Mantık soru aralığında soru bulunamadı!')
					return
				}
				if (questionsInRange.length < (mantikQuestionCount || 0)) {
					setError(`Mantık soru aralığında sadece ${questionsInRange.length} soru bulunuyor!`)
					return
				}
			}

			if (usulRangeMin && usulRangeMax) {
				if (usulRangeMin > usulRangeMax) {
					setError('Usul soru aralığı geçersiz!')
					return
				}
				if (usulRangeMax > 40) {
					setError("Usul soru aralığı 40'tan büyük olamaz!")
					return
				}
				// Check if there are questions in the range
				const questionsInRange = UsulQuestions.filter(q => q.index >= usulRangeMin && q.index <= usulRangeMax)
				if (questionsInRange.length === 0) {
					setError('Usul soru aralığında soru bulunamadı!')
					return
				}
				if (questionsInRange.length < (usulQuestionCount || 0)) {
					setError(`Usul soru aralığında sadece ${questionsInRange.length} soru bulunuyor!`)
					return
				}
			}

			if (kelamRangeMin && kelamRangeMax) {
				if (kelamRangeMin > kelamRangeMax) {
					setError('Kelam soru aralığı geçersiz!')
					return
				}
				if (kelamRangeMax > 60) {
					setError("Kelam soru aralığı 60'tan büyük olamaz!")
					return
				}
				// Check if there are questions in the range
				const questionsInRange = KelamQuestions.filter(q => q.index >= kelamRangeMin && q.index <= kelamRangeMax)
				if (questionsInRange.length === 0) {
					setError('Kelam soru aralığında soru bulunamadı!')
					return
				}
				if (questionsInRange.length < (kelamQuestionCount || 0)) {
					setError(`Kelam soru aralığında sadece ${questionsInRange.length} soru bulunuyor!`)
					return
				}
			}

			setError('')

			// Get random questions for each category
			const selectedMantikQuestions = getRandomQuestions(mantıkQuestions, mantikQuestionCount || 0, mantikRangeMin || 1, mantikRangeMax || 14)

			const selectedUsulQuestions = getRandomQuestions(UsulQuestions, usulQuestionCount || 0, usulRangeMin || 1, usulRangeMax || 40)

			const selectedKelamQuestions = getRandomQuestions(KelamQuestions, kelamQuestionCount || 0, kelamRangeMin || 1, kelamRangeMax || 60)

			// Create document using the initialized Document
			const doc = new Document({
				sections: [
					{
						properties: {
							page: {
								margin: {
									top: 567,
									right: 567,
									bottom: 567,
									left: 567
								}
							}
						},
						children: [...generateHeader(title), ...generateMantikQuestions(selectedMantikQuestions, 1), ...generateUsulQuestions(selectedUsulQuestions, selectedMantikQuestions.length + 1), ...generateKelamQuestions(selectedKelamQuestions, selectedMantikQuestions.length + selectedUsulQuestions.length + 1)]
					}
				]
			})

			// Generate document using the initialized Packer
			const blob = await Packer.toBlob(doc)

			// Create download link
			const url = window.URL.createObjectURL(blob)
			const a = document.createElement('a')

			a.href = url
			a.download = `${title}.docx`

			// Append to body, click, and remove
			document.body.appendChild(a)
			a.click()

			// Clean up
			setTimeout(() => {
				window.URL.revokeObjectURL(url)
				document.body.removeChild(a)
			}, 100)
		} catch (error) {
			console.error('Error creating document:', error)
			alert('There was an error creating the document. Please try again.')
		}
	}

	return (
		<section className="flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-20 py-4 sm:py-6 md:py-10 text-white">
			<div className="flex flex-col items-center gap-4 w-full max-w-md px-4">
				<div className="w-full">
					<Input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Başlık giriniz" variant="underlined" className="transition-colors" />
				</div>
			</div>
			<div className="flex flex-col md:flex-row justify-around w-full gap-8 md:gap-12 lg:gap-40 text-4xl sm:text-5xl md:text-6xl px-4">
				<div className="flex flex-col items-center justify-center gap-4">
					<span className="border-b-2 border-white pb-2">علم منطق </span>
					<div className="flex flex-col gap-2 w-full sm:w-48">
						<div className="flex items-center justify-between gap-1">
							<span className="text-sm text-gray-400 justify-self-start">Soru Adedi</span>
							<div></div>
							<NumberInput hideStepper required variant="underlined" value={mantikQuestionCount} onValueChange={value => setMantikQuestionCount(value as number)} className="transition-colors" />
						</div>
						<div className="flex items-center justify-center gap-4">
							<span className="text-sm text-gray-400">Soru Aralığı</span>
							<NumberInput hideStepper required size="sm" variant="underlined" value={mantikRangeMin} onValueChange={value => setMantikRangeMin(value as number)} className="transition-colors" />
							<span className="font-extralight">-</span>
							<NumberInput variant="underlined" hideStepper required size="sm" value={mantikRangeMax} onValueChange={value => setMantikRangeMax(value as number)} className="transition-colors" />
						</div>
					</div>
				</div>

				<div className="flex flex-col items-center justify-center gap-4">
					<span className="border-b-2 border-white pb-2">اصول فقه </span>
					<div className="flex flex-col gap-2 w-full sm:w-48">
						<div className="flex items-center justify-between gap-1">
							<span className="text-sm text-gray-400 justify-self-start">Soru Adedi</span>
							<div></div>
							<NumberInput hideStepper required variant="underlined" value={usulQuestionCount} onValueChange={value => setUsulQuestionCount(value as number)} className="transition-colors" />
						</div>
						<div className="flex items-center justify-center gap-4">
							<span className="text-sm text-gray-400">Soru Aralığı</span>
							<NumberInput hideStepper required size="sm" variant="underlined" value={usulRangeMin} onValueChange={value => setUsulRangeMin(value as number)} className="transition-colors" />
							<span className="font-extralight">-</span>
							<NumberInput variant="underlined" hideStepper required size="sm" value={usulRangeMax} onValueChange={value => setUsulRangeMax(value as number)} className="transition-colors" />
						</div>
					</div>
				</div>

				<div className="flex flex-col items-center justify-center gap-4">
					<span className="border-b-2 border-white pb-2">علم كلام </span>
					<div className="flex flex-col gap-2 w-full sm:w-48">
						<div className="flex items-center justify-between gap-1">
							<span className="text-sm text-gray-400 justify-self-start">Soru Adedi</span>
							<div></div>
							<NumberInput hideStepper required variant="underlined" value={kelamQuestionCount} onValueChange={value => setKelamQuestionCount(value as number)} className=" transition-colors" />
						</div>
						<div className="flex items-center justify-center gap-4">
							<span className="text-sm text-gray-400">Soru Aralığı</span>
							<NumberInput hideStepper required size="sm" variant="underlined" value={kelamRangeMin} onValueChange={value => setKelamRangeMin(value as number)} className="transition-colors" />
							<span className="font-extralight">-</span>
							<NumberInput variant="underlined" hideStepper required size="sm" value={kelamRangeMax} onValueChange={value => setKelamRangeMax(value as number)} className="transition-colors" />
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col w-1/4 items-center gap-4 mt-4">
				<Button color="primary" size="lg" onClick={createDocument}>
					Oluştur
				</Button>{' '}
				{error && <div className="text-red-500 text-sm ">{error}</div>}
			</div>
		</section>
	)
}
