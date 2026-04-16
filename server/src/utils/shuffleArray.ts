function shuffleArray(array: any[]) {
  if (!Array.isArray(array)) {
    console.error('Not an array:', array)
    return []
  }
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function generateShuffledForms(
  questions: { question: any; options: any[] }[],
  count = 4
) {
  const shuffledForms = []

  for (let i = 0; i < count; i++) {
    const shuffledQuestions = shuffleArray(questions).map((q) => ({
      question: q.question,
      options: shuffleArray([...q.options]),
    }))

    shuffledForms.push({ questions: shuffledQuestions })
  }

  return shuffledForms
}
