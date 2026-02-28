import { useState } from 'react'
import { Sparkles, Plus, Loader2 } from 'lucide-react'

function AICreateProject({ buttonText = "AI Create Project" }) {
  const [open, setOpen] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedProjects, setGeneratedProjects] = useState([])  // ← now array

  const GEMINI_API_KEY = 'AIzaSyA4wkoRWF4AhsRLxoLfg6HO1qJqzclkDUg'

  const handleGenerate = async () => {
    if (!prompt.trim()) return alert('Please write something!')

    setIsLoading(true)
    setGeneratedProjects([])

    const systemPrompt = `You are an expert Project Manager helping suggest realistic project ideas.
Based on the user request, generate 2 to 3 different project suggestions.
Respond with **ONLY** valid JSON — no explanations, no markdown, no code blocks, nothing else.
Return an array of objects like this:

[
  {
    "name": "Project Name 1",
    "description": "Short 2-3 line description",
    "category": "Marketing / Development / Finance / Design / HR / Operations / Other",
    "progress": 0,
    "dueDate": "2026-05-20",
    "teamSize": 4,
    "estimatedDurationDays": 45
  },
  {
    "name": "Project Name 2",
    ...
  }
]

Always return 2 or 3 items in the array.

User request: ${prompt}`

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            generationConfig: {
              temperature: 0.6,
              maxOutputTokens: 2048,
            }
          })
        }
      )

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      let aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

      // Clean up common junk
      aiText = aiText.replace(/```json|```/g, '').trim()

      let projects = []
      try {
        projects = JSON.parse(aiText)
        if (!Array.isArray(projects)) {
          projects = [projects]  // fallback if single object
        }
      } catch (parseErr) {
        // Try to extract array if wrapped
        const match = aiText.match(/\[[\s\S]*\]/)
        if (match) {
          projects = JSON.parse(match[0])
        }
      }

      if (projects.length >= 1 && projects[0]?.name) {
        setGeneratedProjects(projects)
      } else {
        alert('Gemini response was not in the expected format. Try a clearer request.')
      }
    } catch (err) {
      console.error(err)
      alert('Error: ' + err.message + '\nCheck your API key / internet.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateProject = (project) => {
    alert(`✅ Project Created!\n\nName: ${project.name}\nDescription: ${project.description}\n\n(You can later make this add to the real list)`)
    setOpen(false)
    setPrompt('')
    setGeneratedProjects([])
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 shadow-md transition-all"
      >
        <Sparkles className="w-5 h-5" />
        <span>{buttonText}</span>
        <Plus className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[420px] bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 z-50 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-lg text-gray-900">AI Assistant </h3>
          </div>

          <p className="text-sm text-gray-600 mb-3">
            Describe your idea .
          </p>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Suggest me some good  projects ideas  "
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
          />

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="flex-1 px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
              ) : (
                'Generate  Ideas'
              )}
            </button>
            <button
              onClick={() => { setOpen(false); setPrompt(''); setGeneratedProjects([]) }}
              className="px-5 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>

          {/* Multiple Project Suggestions */}
          {generatedProjects.length > 0 && (
            <div className="mt-6 space-y-5">
              <h4 className="font-semibold text-purple-900 text-center">✨ Gemini Suggestions — Pick one</h4>
              
              {generatedProjects.map((project, index) => (
                <div 
                  key={index}
                  className="p-5 bg-purple-50/70 border border-purple-200 rounded-2xl hover:bg-purple-100/70 transition-colors"
                >
                  <div className="font-bold text-lg text-purple-900 mb-2">
                    {project.name} {index + 1}/{generatedProjects.length}
                  </div>
                  <div className="space-y-2.5 text-sm">
                    <div><strong>Description:</strong> {project.description}</div>
                    <div><strong>Category:</strong> {project.category}</div>
                    <div><strong>Due Date:</strong> {project.dueDate}</div>
                    <div><strong>Duration:</strong> {project.estimatedDurationDays} days</div>
                    <div><strong>Team Size:</strong> {project.teamSize} members</div>
                  </div>

                  <button
                    onClick={() => handleCreateProject(project)}
                    className="w-full mt-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 text-sm"
                  >
                    ✅ Create This One
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AICreateProject