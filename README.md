# GovTech Service Scoring Tool

A web application for prioritizing digital government services in Barbados using a comprehensive scoring framework. The tool evaluates services across four key dimensions: Value to Citizens, Feasibility, Economic Impact, and Political Alignment.

## Features

- **Multi-step Form**: Intuitive step-by-step interface for evaluating services
- **Airtable Integration**:
  - Dynamically loads service list from Airtable
  - Saves all submissions to Airtable with automatic timestamps
- **Comprehensive Scoring**: Evaluates services across 27 different criteria
- **Responsive Design**: Beautiful, mobile-friendly interface using Tailwind CSS
- **Vercel Deployment**: Optimized for easy deployment to Vercel

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Airtable
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- An Airtable account
- A Vercel account (for deployment)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd bimservicepriorities
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Airtable** (see detailed instructions below)

4. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your Airtable credentials:
   ```
   AIRTABLE_PERSONAL_ACCESS_TOKEN=your_personal_access_token
   AIRTABLE_BASE_ID=your_base_id
   AIRTABLE_SERVICES_TABLE=Services
   AIRTABLE_SUBMISSIONS_TABLE=Submissions
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Airtable Setup

### 1. Create a New Base

1. Log in to [Airtable](https://airtable.com)
2. Create a new base called "GovTech Service Scoring"

### 2. Create the Services Table

Create a table named `Services` with the following fields:

| Field Name | Field Type | Description |
|------------|------------|-------------|
| ServiceName | Single line text | The display name of the service |
| ServiceValue | Single line text | The internal value/ID (optional, auto-generated from name if empty) |

**Sample Data:**
- ServiceName: "Passport Renewal Portal", ServiceValue: "passport-renewal"
- ServiceName: "Business Registration System", ServiceValue: "business-registration"
- ServiceName: "Property Tax Payment Portal", ServiceValue: "property-tax"

### 3. Create the Submissions Table

Create a table named `Submissions` with the following fields:

**Service Information:**
- Service Name (Single line text)
- Submitter Name (Single line text)
- Timestamp (Date & time)

**Value to Citizens:**
- Transaction Volume (Number)
- Pain Level (Number)
- Time Saved (Number)
- Frequency (Number)
- Equity Impact (Number)
- Mandatory (Number)
- Value to Citizens Avg (Number, Formula: `AVERAGE({Transaction Volume}, {Pain Level}, {Time Saved}, {Frequency}, {Equity Impact}, {Mandatory})`)

**Feasibility:**
- Technical Complexity (Number)
- Data Readiness (Number)
- Stakeholders (Number)
- Legal Barriers (Number)
- Team Capability (Number)
- Infrastructure Leverage (Number)
- Time to Launch (Number)
- Feasibility Avg (Number, Formula: `AVERAGE({Technical Complexity}, {Data Readiness}, {Stakeholders}, {Legal Barriers}, {Team Capability}, {Infrastructure Leverage}, {Time to Launch})`)

**Economic Impact:**
- Revenue Generation (Number)
- Cost Savings (Number)
- Business Enablement (Number)
- Sector Criticality (Number)
- Trade Facilitation (Number)
- Multiplier Effect (Number)
- EODB Impact (Number)
- Economic Impact Avg (Number, Formula: `AVERAGE({Revenue Generation}, {Cost Savings}, {Business Enablement}, {Sector Criticality}, {Trade Facilitation}, {Multiplier Effect}, {EODB Impact})`)

**Political Alignment:**
- Manifesto Mentions (Number)
- Ministerial Priority (Number)
- Executive Sponsorship (Number)
- Budget Signals (Number)
- Dev Plan Alignment (Number)
- Public Commitment (Number)
- Timing Sensitivity (Number)
- Political Alignment Avg (Number, Formula: `AVERAGE({Manifesto Mentions}, {Ministerial Priority}, {Executive Sponsorship}, {Budget Signals}, {Dev Plan Alignment}, {Public Commitment}, {Timing Sensitivity})`)

**Overall:**
- Overall Score (Number, Formula: `AVERAGE({Value to Citizens Avg}, {Feasibility Avg}, {Economic Impact Avg}, {Political Alignment Avg})`)

### 4. Get Your API Credentials

1. **Create a Personal Access Token:**
   - Go to [https://airtable.com/create/tokens](https://airtable.com/create/tokens)
   - Click "Create new token"
   - Give it a name (e.g., "GovTech Service Scoring")
   - Add the following scopes:
     - `data.records:read` - to read services
     - `data.records:write` - to create submissions
   - Add access to your "GovTech Service Scoring" base
   - Click "Create token"
   - Copy your token (starts with `pat...`)
   - **⚠️ Important:** Save this token securely - you won't be able to see it again!

2. **Get your Base ID:**
   - Go to [Airtable API Documentation](https://airtable.com/api)
   - Select your base
   - The Base ID will be shown in the URL and in the docs (format: `appXXXXXXXXXXXXXX`)

## Deploying to Vercel

### Option 1: Deploy with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables in Vercel Dashboard**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add all variables from `.env.example`

### Option 2: Deploy with GitHub

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables during setup
   - Click "Deploy"

### Setting Environment Variables in Vercel

You need to set environment variables directly in the Vercel dashboard:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with its value:
   - **Variable Name**: `AIRTABLE_PERSONAL_ACCESS_TOKEN`
     - **Value**: Your personal access token (starts with `pat...`)
     - **Environments**: Select Production, Preview, and Development
   - **Variable Name**: `AIRTABLE_BASE_ID`
     - **Value**: Your base ID (starts with `app...`)
     - **Environments**: Select Production, Preview, and Development
   - **Variable Name**: `AIRTABLE_SERVICES_TABLE`
     - **Value**: `Services`
     - **Environments**: Select Production, Preview, and Development
   - **Variable Name**: `AIRTABLE_SUBMISSIONS_TABLE`
     - **Value**: `Submissions`
     - **Environments**: Select Production, Preview, and Development
4. Click "Save" for each variable
5. Redeploy your project for the changes to take effect

**Important Notes:**
- Environment variables are set through the Vercel dashboard, not in `vercel.json`
- Make sure to select all three environments (Production, Preview, Development) for each variable
- After adding variables, trigger a new deployment for them to take effect

## Project Structure

```
bimservicepriorities/
├── pages/
│   ├── api/
│   │   ├── services.js      # API endpoint to fetch services from Airtable
│   │   └── submit.js         # API endpoint to submit form data to Airtable
│   ├── _app.js               # Next.js app wrapper
│   └── index.js              # Main form page
├── styles/
│   └── globals.css           # Global styles with Tailwind
├── public/                   # Static files
├── .env.example              # Environment variables template
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json              # Vercel configuration
└── README.md
```

## Customization

### Adding More Services

Simply add more records to your Airtable Services table. The dropdown will automatically update.

### Modifying the Scoring Criteria

1. Update the form fields in `pages/index.js`
2. Update the API submission handler in `pages/api/submit.js`
3. Add corresponding fields to your Airtable Submissions table

### Styling

The app uses Tailwind CSS. Modify styles in:
- `pages/index.js` - Component-level classes
- `styles/globals.css` - Global styles
- `tailwind.config.js` - Tailwind configuration

## API Endpoints

### GET /api/services

Fetches the list of available services from Airtable.

**Response:**
```json
{
  "services": [
    {
      "value": "passport-renewal",
      "label": "Passport Renewal Portal"
    }
  ]
}
```

### POST /api/submit

Submits a completed form to Airtable.

**Request Body:**
```json
{
  "serviceName": "Passport Renewal Portal",
  "submitterName": "John Doe",
  "transactionVolume": 4,
  "painLevel": 5,
  ...
}
```

**Response:**
```json
{
  "success": true,
  "recordId": "recXXXXXXXXXXXXXX",
  "message": "Submission saved successfully"
}
```

## Troubleshooting

### Services not loading
- Check your Airtable personal access token in environment variables
- Verify the token has `data.records:read` scope
- Verify the Services table name matches `AIRTABLE_SERVICES_TABLE`
- Check browser console for error messages

### Form submission failing
- Verify all Airtable environment variables are set correctly
- Check that Submissions table field names match the API code
- Review server logs in Vercel dashboard

### Local development issues
- Make sure `.env.local` file exists and contains all required variables
- Restart the development server after changing environment variables
- Clear browser cache if styles aren't updating

## Support

For issues and questions:
- Check the [Airtable API Documentation](https://airtable.com/api)
- Review [Next.js Documentation](https://nextjs.org/docs)
- Check [Vercel Documentation](https://vercel.com/docs)

## License

This project is provided as-is for GovTech Barbados.
