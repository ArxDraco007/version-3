import Tesseract from 'tesseract.js'

export interface ParsedFeedback {
  type: 'good' | 'bad' | 'observational'
  text: string
}

export const extractTextFromImage = async (imageFile: File): Promise<string> => {
  try {
    const { data: { text } } = await Tesseract.recognize(imageFile, 'eng', {
      logger: m => console.log(m)
    })
    return text
  } catch (error) {
    console.error('Error extracting text from image:', error)
    throw new Error('Failed to extract text from image')
  }
}

export const parseFeedbackText = (text: string): ParsedFeedback[] => {
  const feedbacks: ParsedFeedback[] = []
  
  // Clean up the text
  const cleanText = text.replace(/\n+/g, ' ').trim()
  
  // Regular expression to match the format: ##Type## followed by feedback text
  const feedbackPattern = /##(Positive|Needs Improvement|Observational)##\s*([^#]+?)(?=##|$)/gi
  
  let match
  while ((match = feedbackPattern.exec(cleanText)) !== null) {
    const type = match[1].toLowerCase()
    const feedbackText = match[2].trim()
    
    if (feedbackText) {
      let feedbackType: 'good' | 'bad' | 'observational'
      
      switch (type) {
        case 'positive':
          feedbackType = 'good'
          break
        case 'needs improvement':
          feedbackType = 'bad'
          break
        case 'observational':
          feedbackType = 'observational'
          break
        default:
          continue // Skip unknown types
      }
      
      feedbacks.push({
        type: feedbackType,
        text: feedbackText
      })
    }
  }
  
  return feedbacks
}

export const validateImageFile = (file: File): boolean => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  const maxSize = 10 * 1024 * 1024 // 10MB
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Please upload a valid image file (JPEG, PNG, or WebP)')
  }
  
  if (file.size > maxSize) {
    throw new Error('Image file size must be less than 10MB')
  }
  
  return true
}