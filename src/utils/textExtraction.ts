import Tesseract from 'tesseract.js'

export interface ParsedFeedback {
  type: 'good' | 'bad' | 'observational'
  text: string
}

export const extractTextFromImage = async (imageFile: File): Promise<string> => {
  try {
    console.log('🔍 Starting text extraction from image...')
    
    // Create canvas for image preprocessing
    const preprocessImage = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        img.onload = () => {
          try {
            // Set canvas dimensions
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Draw original image
            ctx?.drawImage(img, 0, 0);
            
            // Apply grayscale and contrast enhancement
            const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
            if (imageData) {
              const data = imageData.data;
              for (let i = 0; i < data.length; i += 4) {
                // Convert to grayscale
                const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                // Increase contrast
                const contrast = Math.min(255, Math.max(0, (avg - 128) * 1.2 + 128));
                data[i] = data[i + 1] = data[i + 2] = contrast;
              }
              ctx?.putImageData(imageData, 0, 0);
            }
            
            resolve(canvas.toDataURL('image/png'));
          } catch (err) {
            reject(err);
          }
        };
        
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      });
    };
    
    const preprocessedImage = await preprocessImage(imageFile);
    
    // Try OCR with multiple attempts using different settings
    let text = '';
    const attempts = [
      { lang: 'eng', options: {} },
      { lang: 'eng', options: { tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz .,?!-[]#*:()' } },
    ];
    
    for (let i = 0; i < attempts.length; i++) {
      console.log(`🔍 OCR Attempt ${i + 1} with settings:`, attempts[i]);
      
      const { data: { text: attemptText } } = await Tesseract.recognize(
        preprocessedImage,
        attempts[i].lang'],
        {
          ...attempts[i].options,
          logger: (m) => {
            if (m.status === 'recognizing text') {
              console.log(`📝 OCR Progress: ${Math.round(m.progress * 100)}%`);
            }
          },
        },
      );
      
      // If we get meaningful text, use it
      if (attemptText.trim().length > text.length && attemptText.trim().length > 10) {
        text = attemptText;
        console.log(`✅ Using text from attempt ${i + 1}`);
        break;
      }
    }
    
    if (!text.trim()) {
      throw new Error('No readable text found in image');
    }
    
    console.log('✅ Text extraction completed');
    console.log('📄 Extracted text length:', text.length);
    
    return text.trim();
  } catch (error) {
    console.error('❌ Error extracting text from image:', error);
    throw new Error('Failed to extract text from image. Please ensure the image contains clear, readable text.');
  }
};

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