import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Upload, ExternalLink, Smartphone, AlertCircle, CheckCircle, Copy, Eye } from 'lucide-react'

interface GoogleLensSectionProps {
  onTextExtracted: (text: string) => void
}

export const GoogleLensSection: React.FC<GoogleLensSectionProps> = ({ onTextExtracted }) => {
  const [showInstructions, setShowInstructions] = useState(false)
  const [extractedText, setExtractedText] = useState('')
  const [showTextInput, setShowTextInput] = useState(false)

  const handleTextSubmit = () => {
    if (extractedText.trim()) {
      onTextExtracted(extractedText)
      setExtractedText('')
      setShowTextInput(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const instructions = [
    {
      step: 1,
      title: "Take a Photo",
      description: "Use your phone's camera to take a clear photo of the feedback document",
      icon: Camera,
      tips: ["Ensure good lighting", "Keep text horizontal", "Avoid shadows"]
    },
    {
      step: 2,
      title: "Open Google Lens",
      description: "Open Google Lens app or use Google Photos with Lens feature",
      icon: Eye,
      tips: ["Available in Google app", "Built into Google Photos", "Camera app on some phones"]
    },
    {
      step: 3,
      title: "Extract Text",
      description: "Point Google Lens at your photo and select 'Text' mode",
      icon: Upload,
      tips: ["Tap 'Select All'", "Copy the extracted text", "Review for accuracy"]
    },
    {
      step: 4,
      title: "Paste Here",
      description: "Paste the extracted text into the input field below",
      icon: ExternalLink,
      tips: ["Use standard format", "Check for errors", "Submit when ready"]
    }
  ]

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
          <Smartphone className="w-10 h-10 text-blue-600" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3">📱 Use Google Lens</h3>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto text-lg">
          Extract text from feedback images using <span className="font-bold text-blue-600">Google Lens</span> on your phone
        </p>
        
        {/* Quick Access Buttons */}
        <div className="flex gap-4 justify-center mb-8">
          <motion.button
            onClick={() => setShowInstructions(!showInstructions)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/25 border border-blue-500/30 transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-5 h-5" />
            {showInstructions ? 'Hide' : 'Show'} Instructions
          </motion.button>
          
          <motion.button
            onClick={() => setShowTextInput(!showTextInput)}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-green-500/25 border border-green-500/30 transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Upload className="w-5 h-5" />
            Paste Text
          </motion.button>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.a
            href="https://lens.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 hover:shadow-md transition-all duration-300 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ExternalLink className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900 text-sm">Google Lens Web</div>
                <div className="text-xs text-gray-600">Use in browser</div>
              </div>
            </div>
          </motion.a>
          
          <motion.div
            className="bg-white rounded-xl p-4 shadow-sm border border-green-100 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900 text-sm">Google App</div>
                <div className="text-xs text-gray-600">Built-in Lens feature</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="bg-white rounded-xl p-4 shadow-sm border border-purple-100 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900 text-sm">Google Photos</div>
                <div className="text-xs text-gray-600">Lens in photos</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Instructions */}
        <AnimatePresence>
          {showInstructions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm">
                <h4 className="font-bold text-blue-900 mb-6 text-xl">📋 Step-by-Step Instructions</h4>
                <div className="grid gap-6">
                  {instructions.map((instruction, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <instruction.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {instruction.step}
                          </span>
                          <h5 className="font-bold text-gray-900">{instruction.title}</h5>
                        </div>
                        <p className="text-gray-700 text-sm mb-3">{instruction.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {instruction.tips.map((tip, tipIndex) => (
                            <span key={tipIndex} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                              💡 {tip}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text Input */}
        <AnimatePresence>
          {showTextInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="bg-white rounded-2xl p-6 border border-green-200 shadow-sm">
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
                        setShowTextInput(false)
                      }}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sample Text Examples */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-left border border-gray-200">
          <h4 className="font-bold text-gray-900 mb-4 text-center">📋 Example Text Formats</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-gray-800 text-sm">Standard Format</span>
                <motion.button
                  onClick={() => copyToClipboard(`##Positive##
Excellent communication skills and shows great leadership potential.

##Needs Improvement##
Could work on time management and punctuality.

##Observational##
Takes detailed notes and actively participates in discussions.`)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Copy example"
                >
                  <Copy className="w-4 h-4 text-gray-600" />
                </motion.button>
              </div>
              <div className="text-xs text-gray-600 font-mono bg-gray-50 p-2 rounded">
                ##Positive##<br/>
                Excellent communication skills...<br/>
                <br/>
                ##Needs Improvement##<br/>
                Could work on time management...<br/>
                <br/>
                ##Observational##<br/>
                Takes detailed notes...
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-gray-800 text-sm">Alternative Format</span>
                <motion.button
                  onClick={() => copyToClipboard(`#Positive#
Great presentation skills and confident speaking.

[Needs Improvement]
Should improve listening skills during group work.

Observational: Often stays after class to discuss topics.`)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Copy example"
                >
                  <Copy className="w-4 h-4 text-gray-600" />
                </motion.button>
              </div>
              <div className="text-xs text-gray-600 font-mono bg-gray-50 p-2 rounded">
                #Positive#<br/>
                Great presentation skills...<br/>
                <br/>
                [Needs Improvement]<br/>
                Should improve listening...<br/>
                <br/>
                Observational: Often stays...
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}