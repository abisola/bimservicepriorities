// API Route to submit form data to Airtable
import Airtable from 'airtable'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Check if Airtable is configured
  if (!process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || !process.env.AIRTABLE_BASE_ID || !process.env.AIRTABLE_SUBMISSIONS_TABLE) {
    return res.status(500).json({ error: 'Airtable not configured. Please set environment variables.' })
  }

  try {
    const formData = req.body

    // Configure Airtable with Personal Access Token
    const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN }).base(process.env.AIRTABLE_BASE_ID)

    // Create record in Airtable
    // Note: Average fields are computed by Airtable formulas, so we only send raw data
    const record = await base(process.env.AIRTABLE_SUBMISSIONS_TABLE).create([
      {
        fields: {
          // Service Information
          'Service Name': formData.serviceName || 'Not specified',
          'Submitter Name': formData.submitterName || 'Anonymous',
          'Timestamp': formData.timestamp || new Date().toISOString(),

          // Value to Citizens
          'Transaction Volume': formData.transactionVolume,
          'Pain Level': formData.painLevel,
          'Time Saved': formData.timeSaved,
          'Frequency': formData.frequency,
          'Equity Impact': formData.equityImpact,
          'Mandatory': formData.mandatory,
          // 'Value to Citizens Avg' is computed by Airtable formula

          // Feasibility
          'Technical Complexity': formData.technicalComplexity,
          'Data Readiness': formData.dataReadiness,
          'Stakeholders': formData.stakeholders,
          'Legal Barriers': formData.legalBarriers,
          'Team Capability': formData.teamCapability,
          'Infrastructure Leverage': formData.infrastructureLeverage,
          'Time to Launch': formData.timeToLaunch,
          // 'Feasibility Avg' is computed by Airtable formula

          // Economic Impact
          'Revenue Generation': formData.revenueGeneration,
          'Cost Savings': formData.costSavings,
          'Business Enablement': formData.businessEnablement,
          'Sector Criticality': formData.sectorCriticality,
          'Trade Facilitation': formData.tradeFacilitation,
          'Multiplier Effect': formData.multiplierEffect,
          'EODB Impact': formData.eodbImpact,
          // 'Economic Impact Avg' is computed by Airtable formula

          // Political Alignment
          'Manifesto Mentions': formData.manifestoMentions,
          'Ministerial Priority': formData.ministerialPriority,
          'Executive Sponsorship': formData.executiveSponsorship,
          'Budget Signals': formData.budgetSignals,
          'Dev Plan Alignment': formData.devPlanAlignment,
          'Public Commitment': formData.publicCommitment,
          'Timing Sensitivity': formData.timingSensitivity,
          // 'Political Alignment Avg' is computed by Airtable formula

          // 'Overall Score' is computed by Airtable formula
        }
      }
    ])

    return res.status(200).json({
      success: true,
      recordId: record[0].id,
      message: 'Submission saved successfully'
    })
  } catch (error) {
    console.error('Error submitting to Airtable:', error)
    return res.status(500).json({
      error: 'Failed to submit to Airtable',
      details: error.message
    })
  }
}
