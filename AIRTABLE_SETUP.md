# Airtable Setup Guide

This guide will walk you through setting up Airtable for the GovTech Service Scoring Tool.

## Quick Setup (Copy Template)

The fastest way to get started is to copy our pre-configured Airtable base:

**[Click here to copy the Airtable template](#)** _(Template link to be added)_

Then skip to step 3 below to get your API credentials.

## Manual Setup

### Step 1: Create a New Base

1. Log in to [Airtable](https://airtable.com)
2. Click "Add a base" → "Start from scratch"
3. Name it "GovTech Service Scoring"

### Step 2: Set Up Tables

#### Table 1: Services

This table stores the list of available government services.

1. Rename the default table to `Services`
2. Create these columns:

| Column Name | Type | Settings | Description |
|-------------|------|----------|-------------|
| ServiceName | Single line text | Required | The name shown in the dropdown |
| ServiceValue | Single line text | Optional | URL-friendly identifier |

3. Add sample data:

| ServiceName | ServiceValue |
|-------------|--------------|
| Passport Renewal Portal | passport-renewal |
| Business Registration System | business-registration |
| Property Tax Payment Portal | property-tax |
| Birth/Death Certificate Requests | birth-death-certificates |
| Tourism Worker Permits | tourism-permits |
| Work Permit Applications | work-permits |
| School Enrollment Portal | school-enrollment |
| Building Permits System | building-permits |
| Healthcare Appointment Booking | healthcare-appointments |
| Customs Pre-clearance | customs-preclearance |
| Digital ID Platform | digital-id |
| Online Tax Filing (Simple) | tax-filing |
| Driver's License Renewal | driver-license |
| Land Registry Services | land-registry |

#### Table 2: Submissions

This table stores all form submissions.

1. Create a new table called `Submissions`
2. Create these columns in order:

**Basic Information:**
```
Service Name          - Single line text
Submitter Name        - Single line text
Timestamp             - Date (include time)
```

**Value to Citizens (All Number fields):**
```
Transaction Volume    - Number
Pain Level           - Number
Time Saved           - Number
Frequency            - Number
Equity Impact        - Number
Mandatory            - Number
Value to Citizens Avg - Number (see formula below)
```

**Feasibility (All Number fields):**
```
Technical Complexity      - Number
Data Readiness           - Number
Stakeholders             - Number
Legal Barriers           - Number
Team Capability          - Number
Infrastructure Leverage  - Number
Time to Launch           - Number
Feasibility Avg          - Number (see formula below)
```

**Economic Impact (All Number fields):**
```
Revenue Generation    - Number
Cost Savings         - Number
Business Enablement  - Number
Sector Criticality   - Number
Trade Facilitation   - Number
Multiplier Effect    - Number
EODB Impact          - Number
Economic Impact Avg  - Number (see formula below)
```

**Political Alignment (All Number fields):**
```
Manifesto Mentions       - Number
Ministerial Priority     - Number
Executive Sponsorship    - Number
Budget Signals           - Number
Dev Plan Alignment       - Number
Public Commitment        - Number
Timing Sensitivity       - Number
Political Alignment Avg  - Number (see formula below)
```

**Overall:**
```
Overall Score - Number (see formula below)
```

### Step 3: Add Formulas for Average Calculations

Click on each "Avg" field and set it to type "Formula", then paste the corresponding formula:

**Value to Citizens Avg:**
```
AVERAGE(
  {Transaction Volume},
  {Pain Level},
  {Time Saved},
  {Frequency},
  {Equity Impact},
  {Mandatory}
)
```

**Feasibility Avg:**
```
AVERAGE(
  {Technical Complexity},
  {Data Readiness},
  {Stakeholders},
  {Legal Barriers},
  {Team Capability},
  {Infrastructure Leverage},
  {Time to Launch}
)
```

**Economic Impact Avg:**
```
AVERAGE(
  {Revenue Generation},
  {Cost Savings},
  {Business Enablement},
  {Sector Criticality},
  {Trade Facilitation},
  {Multiplier Effect},
  {EODB Impact}
)
```

**Political Alignment Avg:**
```
AVERAGE(
  {Manifesto Mentions},
  {Ministerial Priority},
  {Executive Sponsorship},
  {Budget Signals},
  {Dev Plan Alignment},
  {Public Commitment},
  {Timing Sensitivity}
)
```

**Overall Score:**
```
AVERAGE(
  {Value to Citizens Avg},
  {Feasibility Avg},
  {Economic Impact Avg},
  {Political Alignment Avg}
)
```

### Step 4: Get Your API Key

1. Click on your profile picture (top right)
2. Go to "Account"
3. Scroll to the "API" section
4. Click "Generate API key" if you don't have one
5. Copy your API key (starts with `key...`)

**⚠️ Keep this secret!** Never commit it to Git or share it publicly.

### Step 5: Get Your Base ID

1. Go to [airtable.com/api](https://airtable.com/api)
2. Click on your "GovTech Service Scoring" base
3. You'll see the Base ID in the introduction section
4. It looks like: `appXXXXXXXXXXXXXX`

### Step 6: Configure Your App

1. Copy `.env.example` to `.env.local`
2. Fill in your credentials:

```env
AIRTABLE_API_KEY=keyYourApiKeyHere
AIRTABLE_BASE_ID=appYourBaseIdHere
AIRTABLE_SERVICES_TABLE=Services
AIRTABLE_SUBMISSIONS_TABLE=Submissions
```

## Optional Enhancements

### Add Views for Better Analysis

In the Submissions table, create these views:

1. **By Score (Descending)**
   - Sort by "Overall Score" descending
   - Shows highest priority services first

2. **Recent Submissions**
   - Sort by "Timestamp" descending
   - Filter: Timestamp is within last week

3. **High Value, High Feasibility**
   - Filter: Value to Citizens Avg > 3.5
   - Filter: Feasibility Avg > 3.5
   - Shows quick wins

### Add Conditional Formatting

In the Submissions table:
- Color code "Overall Score":
  - Green if > 4
  - Yellow if 3-4
  - Red if < 3

### Set Up Automations

You can create Airtable automations to:
- Send email notifications when new submissions arrive
- Post to Slack when high-priority services are submitted
- Generate weekly summary reports

## Permissions & Sharing

### For Development
- Keep base private during development
- Use environment variables for API keys

### For Production
- Consider creating a separate Airtable account for production
- Use Airtable's collaboration features to share with team members
- Set up appropriate permissions (Editor, Commenter, Read-only)

## Backup & Export

Regularly backup your data:
1. In Airtable, click base name → Download CSV
2. Export both Services and Submissions tables
3. Store in a secure location

## Troubleshooting

**Can't find API key:**
- Make sure you're logged into the correct Airtable account
- API keys are account-wide, not base-specific

**Base ID not working:**
- Make sure it starts with `app`
- Check that you copied the entire ID
- Verify you're using the correct base

**Field name errors:**
- Field names are case-sensitive
- Must match exactly (including spaces)
- Check for extra spaces at the end of field names

**Submissions not appearing:**
- Check Airtable API status
- Verify all required fields exist
- Look at Vercel logs for error messages

## Next Steps

After setup:
1. Test the Services API: Visit `http://localhost:3000/api/services`
2. Submit a test form
3. Verify the record appears in Airtable
4. Check that formulas calculate correctly

## Need Help?

- [Airtable Support](https://support.airtable.com)
- [Airtable API Documentation](https://airtable.com/api)
- [Airtable Community](https://community.airtable.com)
