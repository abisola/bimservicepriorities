// API Route to fetch services from Airtable
import Airtable from 'airtable'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Check if Airtable is configured
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID || !process.env.AIRTABLE_SERVICES_TABLE) {
    console.log('Airtable not configured, returning empty services list')
    return res.status(200).json({ services: [] })
  }

  try {
    // Configure Airtable
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID)

    const services = []

    // Fetch all records from the Services table
    await base(process.env.AIRTABLE_SERVICES_TABLE)
      .select({
        // You can add filters here if needed
        view: 'Grid view', // Use default view, change if you have a specific view
        fields: ['ServiceName', 'ServiceValue'], // Adjust field names based on your Airtable schema
      })
      .eachPage((records, fetchNextPage) => {
        records.forEach((record) => {
          // Map Airtable fields to service object
          const serviceName = record.get('ServiceName')
          const serviceValue = record.get('ServiceValue') || serviceName?.toLowerCase().replace(/\s+/g, '-')

          if (serviceName) {
            services.push({
              value: serviceValue,
              label: serviceName
            })
          }
        })
        fetchNextPage()
      })

    return res.status(200).json({ services })
  } catch (error) {
    console.error('Error fetching services from Airtable:', error)
    return res.status(500).json({ error: 'Failed to fetch services', details: error.message })
  }
}
