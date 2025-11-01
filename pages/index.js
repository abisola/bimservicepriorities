import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function Home() {
  const [availableServices, setAvailableServices] = useState([
    { value: '', label: 'Loading services...' }
  ])
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    serviceName: '',
    otherServiceName: '',
    submitterName: '',
    transactionVolume: 3,
    painLevel: 3,
    timeSaved: 3,
    frequency: 3,
    equityImpact: 3,
    mandatory: 3,
    technicalComplexity: 3,
    dataReadiness: 3,
    stakeholders: 3,
    legalBarriers: 3,
    teamCapability: 3,
    infrastructureLeverage: 3,
    timeToLaunch: 3,
    revenueGeneration: 3,
    costSavings: 3,
    businessEnablement: 3,
    sectorCriticality: 3,
    tradeFacilitation: 3,
    multiplierEffect: 3,
    eodbImpact: 3,
    manifestoMentions: 3,
    ministerialPriority: 3,
    executiveSponsorship: 3,
    budgetSignals: 3,
    devPlanAlignment: 3,
    publicCommitment: 3,
    timingSensitivity: 3,
  })

  const steps = [
    'Service Selection',
    'Value to Citizens',
    'Feasibility',
    'Economic Impact',
    'Political Alignment',
    'Review'
  ]

  // Fetch services from Airtable on component mount
  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()

      if (data.services && data.services.length > 0) {
        setAvailableServices([
          { value: '', label: 'Select a service...' },
          ...data.services,
          { value: 'other', label: 'Other (Please specify)' }
        ])
      } else {
        // Fallback to default services if Airtable is not configured
        setAvailableServices([
          { value: '', label: 'Select a service...' },
          { value: 'passport-renewal', label: 'Passport Renewal Portal' },
          { value: 'business-registration', label: 'Business Registration System' },
          { value: 'property-tax', label: 'Property Tax Payment Portal' },
          { value: 'birth-death-certificates', label: 'Birth/Death Certificate Requests' },
          { value: 'tourism-permits', label: 'Tourism Worker Permits' },
          { value: 'work-permits', label: 'Work Permit Applications' },
          { value: 'school-enrollment', label: 'School Enrollment Portal' },
          { value: 'building-permits', label: 'Building Permits System' },
          { value: 'healthcare-appointments', label: 'Healthcare Appointment Booking' },
          { value: 'customs-preclearance', label: 'Customs Pre-clearance' },
          { value: 'digital-id', label: 'Digital ID Platform' },
          { value: 'tax-filing', label: 'Online Tax Filing (Simple)' },
          { value: 'driver-license', label: 'Driver\'s License Renewal' },
          { value: 'land-registry', label: 'Land Registry Services' },
          { value: 'other', label: 'Other (Please specify)' }
        ])
      }
    } catch (error) {
      console.error('Error fetching services:', error)
      // Use fallback services
      setAvailableServices([
        { value: '', label: 'Select a service...' },
        { value: 'other', label: 'Other (Please specify)' }
      ])
    }
  }

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const serviceName = formData.serviceName === 'other'
        ? formData.otherServiceName
        : availableServices.find(s => s.value === formData.serviceName)?.label

      const submissionData = {
        ...formData,
        serviceName,
        timestamp: new Date().toISOString()
      }

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      })

      const result = await response.json()

      if (response.ok) {
        alert('✅ Success! Your submission has been saved to Airtable!\\n\\n' +
              'Service: ' + serviceName + '\\n' +
              'Submitted by: ' + (formData.submitterName || 'Anonymous') + '\\n' +
              'Timestamp: ' + new Date().toLocaleString('en-US', {
                dateStyle: 'full',
                timeStyle: 'long'
              }))

        // Reset form
        setCurrentStep(0)
        setFormData({
          serviceName: '',
          otherServiceName: '',
          submitterName: '',
          transactionVolume: 3,
          painLevel: 3,
          timeSaved: 3,
          frequency: 3,
          equityImpact: 3,
          mandatory: 3,
          technicalComplexity: 3,
          dataReadiness: 3,
          stakeholders: 3,
          legalBarriers: 3,
          teamCapability: 3,
          infrastructureLeverage: 3,
          timeToLaunch: 3,
          revenueGeneration: 3,
          costSavings: 3,
          businessEnablement: 3,
          sectorCriticality: 3,
          tradeFacilitation: 3,
          multiplierEffect: 3,
          eodbImpact: 3,
          manifestoMentions: 3,
          ministerialPriority: 3,
          executiveSponsorship: 3,
          budgetSignals: 3,
          devPlanAlignment: 3,
          publicCommitment: 3,
          timingSensitivity: 3,
        })
      } else {
        alert('❌ Error: ' + (result.error || 'Failed to submit. Please try again.'))
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('❌ Error submitting form. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const createScoreInput = (label, description, value, field, colorClass = 'emerald') => {
    const colorMap = {
      emerald: { bg: 'bg-emerald-500', text: 'text-emerald-600', slider: 'text-emerald-600' },
      amber: { bg: 'bg-amber-500', text: 'text-amber-600', slider: 'text-amber-500' },
      blue: { bg: 'bg-blue-500', text: 'text-blue-600', slider: 'text-blue-500' },
      violet: { bg: 'bg-violet-500', text: 'text-violet-600', slider: 'text-violet-500' }
    }
    const colors = colorMap[colorClass]

    return (
      <div key={field} className="mb-6 bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <label className="block text-sm font-semibold text-gray-900 mb-1">{label}</label>
        <p className="text-xs text-gray-600 mb-4 leading-relaxed">{description}</p>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="1"
            max="5"
            value={value}
            onChange={(e) => updateFormData(field, parseInt(e.target.value))}
            className={`flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider ${colors.slider}`}
          />
          <div className={`flex items-center justify-center w-14 h-14 ${colors.bg} rounded-xl shadow-lg`}>
            <span className="text-2xl font-bold text-white">{value}</span>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
          <span>Low (1)</span>
          <span>High (5)</span>
        </div>
      </div>
    )
  }

  const renderProgressBar = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, idx) => (
          <div key={idx} className={`flex items-center ${idx < steps.length - 1 ? 'flex-1' : ''}`}>
            <div className={`relative flex items-center justify-center w-12 h-12 rounded-full font-bold text-sm transition-all ${
              idx <= currentStep
                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg scale-110'
                : 'bg-gray-100 text-gray-400'
            }`}>
              {idx + 1}
            </div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-3 rounded-full ${
                idx < currentStep ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-gray-200'
              }`}></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-3">
        {steps.map((step, idx) => (
          <div key={idx} className="text-center" style={{ width: '100px' }}>
            <span className={`text-xs font-medium ${
              idx <= currentStep ? 'text-indigo-600' : 'text-gray-400'
            }`}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const renderServiceSelection = () => {
    const showOtherField = formData.serviceName === 'other'

    return (
      <div>
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Service Selection</h2>
            <p className="text-gray-600 mt-1">Choose the digital service you&apos;re evaluating</p>
          </div>
        </div>

        <div className="space-y-5 mt-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Service <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all appearance-none bg-white"
              value={formData.serviceName}
              onChange={(e) => updateFormData('serviceName', e.target.value)}
            >
              {availableServices.map(service => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-2">
              💡 This list is populated from Airtable
            </p>
          </div>

          {showOtherField && (
            <div className="pl-4 border-l-4 border-indigo-500">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Specify Service Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
                value={formData.otherServiceName}
                onChange={(e) => updateFormData('otherServiceName', e.target.value)}
                placeholder="Enter the service name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Name (Optional)
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 text-base border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all"
              value={formData.submitterName}
              onChange={(e) => updateFormData('submitterName', e.target.value)}
              placeholder="Your name or leave anonymous"
            />
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-indigo-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-indigo-800">
                <p className="font-semibold mb-1">Automatic Timestamp</p>
                <p className="text-indigo-700">The submission date and time will be automatically recorded when you submit the form.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderValueToCitizens = () => (
    <div>
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Value to Citizens</h2>
          <p className="text-gray-600 mt-1">Assess the direct benefit to Barbadian citizens</p>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        {createScoreInput(
          'Annual Transaction Volume',
          '1 = <1,000 users  •  2 = 1,000-5,000  •  3 = 5,000-20,000  •  4 = 20,000-50,000  •  5 = >50,000 users',
          formData.transactionVolume,
          'transactionVolume',
          'emerald'
        )}
        {createScoreInput(
          'Current Pain Level',
          'How frustrating is the existing process? Consider wait times, number of visits required, form complexity, and travel burden.',
          formData.painLevel,
          'painLevel',
          'emerald'
        )}
        {createScoreInput(
          'Time Saved per Transaction',
          '1 = <30 minutes saved  •  2 = 30-60 min  •  3 = 1-3 hours  •  4 = 3-8 hours  •  5 = >8 hours or multiple days',
          formData.timeSaved,
          'timeSaved',
          'emerald'
        )}
        {createScoreInput(
          'Frequency of Need',
          '1 = Once in lifetime  •  2 = Every few years  •  3 = Annually  •  4 = Quarterly  •  5 = Monthly or weekly',
          formData.frequency,
          'frequency',
          'emerald'
        )}
        {createScoreInput(
          'Equity Impact',
          'Does it serve vulnerable/underserved populations, rural communities, or reduce the digital divide?',
          formData.equityImpact,
          'equityImpact',
          'emerald'
        )}
        {createScoreInput(
          'Mandatory vs Optional',
          '5 = Required by law/regulation  •  3 = Highly beneficial but optional  •  1 = Nice-to-have convenience',
          formData.mandatory,
          'mandatory',
          'emerald'
        )}
      </div>
    </div>
  )

  const renderFeasibility = () => (
    <div>
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Feasibility</h2>
          <p className="text-gray-600 mt-1">Can we realistically deliver this service?</p>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        {createScoreInput(
          'Technical Complexity',
          '5 = Simple forms/workflows  •  3 = Moderate system integrations  •  1 = Complex multi-system architecture',
          formData.technicalComplexity,
          'technicalComplexity',
          'amber'
        )}
        {createScoreInput(
          'Data Readiness',
          '5 = Already digitized and accessible  •  3 = Partially digitized  •  1 = Paper-based, needs full digitization',
          formData.dataReadiness,
          'dataReadiness',
          'amber'
        )}
        {createScoreInput(
          'Number of Stakeholders',
          '5 = Single department  •  4 = 2 departments  •  3 = 3 departments  •  2 = 4-5 departments  •  1 = 6+ departments',
          formData.stakeholders,
          'stakeholders',
          'amber'
        )}
        {createScoreInput(
          'Legal/Regulatory Barriers',
          '5 = No legal changes needed  •  3 = Policy updates only  •  1 = Requires new legislation',
          formData.legalBarriers,
          'legalBarriers',
          'amber'
        )}
        {createScoreInput(
          'Team Capability Match',
          '5 = Fully in-house capability  •  3 = Need some external help  •  1 = Need significant external expertise',
          formData.teamCapability,
          'teamCapability',
          'amber'
        )}
        {createScoreInput(
          'Infrastructure Leverage',
          '5 = Build extensively on existing platforms  •  3 = Some reuse possible  •  1 = Must build from scratch',
          formData.infrastructureLeverage,
          'infrastructureLeverage',
          'amber'
        )}
        {createScoreInput(
          'Estimated Time to Launch',
          '5 = <3 months  •  4 = 3-6 months  •  3 = 6-12 months  •  2 = 12-18 months  •  1 = >18 months',
          formData.timeToLaunch,
          'timeToLaunch',
          'amber'
        )}
      </div>
    </div>
  )

  const renderEconomicImpact = () => (
    <div>
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Economic Impact</h2>
          <p className="text-gray-600 mt-1">How does this strengthen Barbados&apos;s economy?</p>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        {createScoreInput(
          'Revenue Generation Potential (BBD)',
          '1 = None  •  2 = <$100K  •  3 = $100K-$500K  •  4 = $500K-$2M  •  5 = >$2M annually',
          formData.revenueGeneration,
          'revenueGeneration',
          'blue'
        )}
        {createScoreInput(
          'Cost Savings (Operational)',
          'Annual savings from reduced staff time, physical infrastructure, printing, etc.',
          formData.costSavings,
          'costSavings',
          'blue'
        )}
        {createScoreInput(
          'Business Enablement',
          '5 = Directly unlocks business creation/FDI  •  4 = Significantly reduces business friction  •  1 = No direct business impact',
          formData.businessEnablement,
          'businessEnablement',
          'blue'
        )}
        {createScoreInput(
          'Sector Criticality',
          '5 = Supports core sector (tourism/financial services)  •  3 = Important sector  •  1 = Low economic priority',
          formData.sectorCriticality,
          'sectorCriticality',
          'blue'
        )}
        {createScoreInput(
          'Trade/Diaspora Facilitation',
          'Does it enable imports/exports, remittances, or diaspora engagement?',
          formData.tradeFacilitation,
          'tradeFacilitation',
          'blue'
        )}
        {createScoreInput(
          'Multiplier Effect',
          '5 = Creates highly reusable platform components  •  3 = Some reusability  •  1 = Standalone service only',
          formData.multiplierEffect,
          'multiplierEffect',
          'blue'
        )}
        {createScoreInput(
          'Ease of Doing Business (EODB) Impact',
          '5 = Directly affects World Bank EODB indicators  •  3 = Indirectly relevant  •  1 = Not relevant',
          formData.eodbImpact,
          'eodbImpact',
          'blue'
        )}
      </div>
    </div>
  )

  const renderPoliticalAlignment = () => (
    <div>
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Political Alignment</h2>
          <p className="text-gray-600 mt-1">Strategic alignment and government priorities</p>
        </div>
      </div>

      <div className="space-y-4 mt-8">
        {createScoreInput(
          'Manifesto/Policy Document Mentions',
          '5 = Explicitly in manifesto/throne speech  •  3 = Implied in policy docs  •  1 = Not mentioned',
          formData.manifestoMentions,
          'manifestoMentions',
          'violet'
        )}
        {createScoreInput(
          'Ministerial Priority Level',
          '5 = Top 3 priority for minister  •  3 = Important but not top tier  •  1 = Low ministerial attention',
          formData.ministerialPriority,
          'ministerialPriority',
          'violet'
        )}
        {createScoreInput(
          'Executive Sponsorship',
          '5 = PM/Cabinet champion  •  4 = Minister  •  3 = Permanent Secretary  •  2 = Dept head  •  1 = None',
          formData.executiveSponsorship,
          'executiveSponsorship',
          'violet'
        )}
        {createScoreInput(
          'Budget Signals',
          '5 = Already budgeted  •  3 = Budget request submitted  •  1 = No budget allocation yet',
          formData.budgetSignals,
          'budgetSignals',
          'violet'
        )}
        {createScoreInput(
          'National Development Plan Alignment',
          '5 = Direct alignment with development strategy/SDGs  •  3 = Indirect support  •  1 = Not aligned',
          formData.devPlanAlignment,
          'devPlanAlignment',
          'violet'
        )}
        {createScoreInput(
          'Public Commitment/Visibility',
          '5 = Public announcement made  •  3 = Mentioned in speeches  •  1 = Not publicly discussed',
          formData.publicCommitment,
          'publicCommitment',
          'violet'
        )}
        {createScoreInput(
          'Timing Sensitivity',
          '5 = Electoral deadline  •  4 = Treaty obligation  •  3 = Desirable timing  •  1 = No time pressure',
          formData.timingSensitivity,
          'timingSensitivity',
          'violet'
        )}
      </div>
    </div>
  )

  const calculateAverage = (scores) => {
    const sum = scores.reduce((a, b) => a + b, 0)
    return (sum / scores.length).toFixed(2)
  }

  const renderReview = () => {
    const valueAvg = calculateAverage([
      formData.transactionVolume, formData.painLevel, formData.timeSaved,
      formData.frequency, formData.equityImpact, formData.mandatory
    ])
    const feasibilityAvg = calculateAverage([
      formData.technicalComplexity, formData.dataReadiness, formData.stakeholders,
      formData.legalBarriers, formData.teamCapability, formData.infrastructureLeverage,
      formData.timeToLaunch
    ])
    const economicAvg = calculateAverage([
      formData.revenueGeneration, formData.costSavings, formData.businessEnablement,
      formData.sectorCriticality, formData.tradeFacilitation, formData.multiplierEffect,
      formData.eodbImpact
    ])
    const politicalAvg = calculateAverage([
      formData.manifestoMentions, formData.ministerialPriority, formData.executiveSponsorship,
      formData.budgetSignals, formData.devPlanAlignment, formData.publicCommitment,
      formData.timingSensitivity
    ])

    const serviceName = formData.serviceName === 'other'
      ? formData.otherServiceName
      : availableServices.find(s => s.value === formData.serviceName)?.label || 'Not selected'

    return (
      <div>
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Review & Submit</h2>
            <p className="text-gray-600 mt-1">Final check before submission</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6 border border-indigo-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Service Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Service Name</p>
              <p className="font-semibold text-gray-900">{serviceName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Submitted By</p>
              <p className="font-semibold text-gray-900">{formData.submitterName || 'Anonymous'}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
            <p className="text-emerald-100 text-sm font-medium mb-2">Value to Citizens</p>
            <p className="text-5xl font-bold">{valueAvg}</p>
            <p className="text-emerald-100 text-xs mt-2">Average Score</p>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
            <p className="text-amber-100 text-sm font-medium mb-2">Feasibility</p>
            <p className="text-5xl font-bold">{feasibilityAvg}</p>
            <p className="text-amber-100 text-xs mt-2">Average Score</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
            <p className="text-blue-100 text-sm font-medium mb-2">Economic Impact</p>
            <p className="text-5xl font-bold">{economicAvg}</p>
            <p className="text-blue-100 text-xs mt-2">Average Score</p>
          </div>
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform">
            <p className="text-violet-100 text-sm font-medium mb-2">Political Alignment</p>
            <p className="text-5xl font-bold">{politicalAvg}</p>
            <p className="text-violet-100 text-xs mt-2">Average Score</p>
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5 flex items-start">
          <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="text-green-900 font-bold mb-1">All scoring complete!</h4>
            <p className="text-green-800 text-sm">Your submission will be timestamped and saved to Airtable. Click &quot;Submit to Airtable&quot; below to complete.</p>
          </div>
        </div>
      </div>
    )
  }

  const canProceed = currentStep === 0
    ? (formData.serviceName && (formData.serviceName !== 'other' || formData.otherServiceName))
    : true

  let content
  switch(currentStep) {
    case 0: content = renderServiceSelection(); break
    case 1: content = renderValueToCitizens(); break
    case 2: content = renderFeasibility(); break
    case 3: content = renderEconomicImpact(); break
    case 4: content = renderPoliticalAlignment(); break
    case 5: content = renderReview(); break
    default:
      content = renderServiceSelection()
      setCurrentStep(0)
      break
  }

  return (
    <>
      <Head>
        <title>GovTech Service Scoring - Prototype</title>
        <meta name="description" content="Digital Service Prioritization Tool for GovTech Barbados" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-3">
              🇧🇧 GovTech Scoring
            </h1>
            <p className="text-xl text-gray-600 font-medium">Digital Service Prioritization Tool</p>
            <div className="mt-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold shadow-lg">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
          </div>

          {renderProgressBar()}

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            {content}

            <div className="flex justify-between items-center mt-10 pt-8 border-t-2 border-gray-100">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`group flex items-center px-6 py-3 rounded-xl font-semibold transition-all ${
                  currentStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                }`}
              >
                <svg className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  onClick={nextStep}
                  disabled={!canProceed}
                  className={`group flex items-center px-8 py-3 rounded-xl font-bold text-white transition-all transform ${
                    !canProceed
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:scale-105'
                  }`}
                >
                  Next
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="group flex items-center px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all transform hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {isSubmitting ? 'Submitting...' : 'Submit to Airtable'}
                </button>
              )}
            </div>
          </div>

          <div className="text-center mt-8 text-sm text-gray-600">
            <p>🔒 Your submission will be securely saved with automatic timestamp</p>
          </div>
        </div>
      </div>
    </>
  )
}
