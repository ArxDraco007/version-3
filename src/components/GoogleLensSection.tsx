import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Image, CheckCircle, AlertCircle, X } from 'lucide-react'

interface GoogleLensSectionProps {
  onTextExtracted: (text: string) => void
}

export const GoogleLensSection: React.FC<GoogleLensSectionProps> = ({ onTextExtracted }) => {
  const [extractedText, setExtractedText] = useState('')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTextSubmit = () => {
    if (extractedText.trim()) {
      onTextExtracted(extractedText)
      setExtractedText('')
      setUploadedImage(null)
    }
  }

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleImageUpload(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleImageUpload(files[0])
    }
  }

  const clearImage = () => {
    setUploadedImage(null)
    setExtractedText('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <motion.div
      className="border-2 border-dashed border-blue-300 rounded-2xl p-8 transition-all duration-300 bg-gradient-to-br from-blue-50 to-indigo-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="text-center">
        <motion.div 
          className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-blue-300"
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(59, 130, 246, 0.3)",
              "0 0 40px rgba(59, 130, 246, 0.5)",
              "0 0 20px rgba(59, 130, 246, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Image className="w-10 h-10 text-blue-600" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3">📱 Upload & Extract Text</h3>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto text-lg">
          Upload an image of your feedback document, use <span className="font-bold text-blue-600">Google Lens</span> to extract text, then paste it below
        </p>

        {/* Image Upload Area */}
        {!uploadedImage ? (
          <motion.div
            className={`border-2 border-dashed rounded-2xl p-8 mb-6 transition-all duration-300 cursor-pointer ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2 font-semibold">
              {dragActive ? 'Drop your image here' : 'Click to upload or drag & drop'}
            </p>
            <p className="text-sm text-gray-500">
              Supports JPG, PNG, WebP (max 10MB)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </motion.div>
        ) : (
          <motion.div
            className="bg-white rounded-2xl p-6 mb-6 border border-gray-200 shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="font-bold text-green-800">Image Uploaded</span>
              </div>
              <motion.button
                onClick={clearImage}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            
            <div className="max-w-md mx-auto">
              <img 
                src={uploadedImage} 
                alt="Uploaded feedback document" 
                className="w-full h-auto rounded-xl border border-gray-200 shadow-sm"
              />
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Image className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-blue-800 text-sm">Next Steps</span>
              </div>
              <ol className="text-sm text-blue-700 space-y-1">
                <li>1. Use Google Lens on your phone to scan this image</li>
                <li>2. Select and copy the extracted text</li>
                <li>3. Paste the text in the field below</li>
              </ol>
            </div>
          </motion.div>
        )}

        {/* Text Input Area */}
        <motion.div
          className="bg-white rounded-2xl p-6 border border-green-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h4 className="font-bold text-green-900 text-lg">Paste Extracted Text</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Text from Google Lens
              </label>
              <textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                rows={8}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 resize-none transition-all duration-300"
                placeholder="Paste the text extracted from Google Lens here...

Example format:
##Positive##
Great communication skills and leadership potential.

##Needs Improvement##
Could work on time management.

##Observational##
Takes detailed notes and asks good questions."
              />
            </div>
            
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-green-600" />
                <span className="font-bold text-green-800 text-sm">Supported Formats</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="space-y-1">
                  <div><code className="bg-white px-2 py-1 rounded text-xs">##Positive##</code> Your feedback</div>
                  <div><code className="bg-white px-2 py-1 rounded text-xs">##Needs Improvement##</code> Your feedback</div>
                  <div><code className="bg-white px-2 py-1 rounded text-xs">##Observational##</code> Your feedback</div>
                </div>
                <div className="space-y-1">
                  <div><code className="bg-white px-2 py-1 rounded text-xs">#Type#</code> <code className="bg-white px-2 py-1 rounded text-xs">[Type]</code></div>
                  <div><code className="bg-white px-2 py-1 rounded text-xs">Type:</code> <code className="bg-white px-2 py-1 rounded text-xs">**Type**</code></div>
                  <div className="text-xs text-green-600">+ More variations supported</div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <motion.button
                onClick={() => {
                  setExtractedText('')
                  setUploadedImage(null)
                }}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Clear All
              </motion.button>
              <motion.button
                onClick={handleTextSubmit}
                disabled={!extractedText.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Upload className="w-5 h-5" />
                Process Text
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}