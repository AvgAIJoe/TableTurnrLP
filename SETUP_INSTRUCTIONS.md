# TableTurnr Google Forms Integration - Final Setup

## ✅ What's Already Done
- Updated website code with your Google Form URL
- Created demo request modal with proper form fields
- Added email notification system
- Set up localStorage backup for leads

## 🔧 What You Need to Do

### Step 1: Get Your Form Entry IDs (5 minutes)

1. Open your Google Form: https://forms.gle/xGK46NAKKCtmNa51A
2. Right-click on the page and select "View Page Source"
3. Press Ctrl+F (or Cmd+F) and search for "entry."
4. You'll find entries like `entry.123456789` - copy these down:

**Find these entries and match them to fields:**
- Restaurant Name: `entry.xxxxxxxxx`
- Your Name: `entry.xxxxxxxxx` 
- Email Address: `entry.xxxxxxxxx`
- Phone Number: `entry.xxxxxxxxx`
- Number of Locations: `entry.xxxxxxxxx`
- Monthly Revenue: `entry.xxxxxxxxx`
- Biggest Challenge: `entry.xxxxxxxxx`

### Step 2: Update Your Website Code

Replace the placeholder entry IDs in `script.js` lines 385-391:

```javascript
googleFormData.append('entry.ACTUAL_ID_HERE', data.restaurant_name || ''); // Restaurant Name
googleFormData.append('entry.ACTUAL_ID_HERE', data.contact_name || '');    // Contact Name  
googleFormData.append('entry.ACTUAL_ID_HERE', data.email || '');          // Email
googleFormData.append('entry.ACTUAL_ID_HERE', data.phone || '');          // Phone
googleFormData.append('entry.ACTUAL_ID_HERE', data.locations || '');      // Locations
googleFormData.append('entry.ACTUAL_ID_HERE', data.revenue || '');        // Revenue
googleFormData.append('entry.ACTUAL_ID_HERE', data.challenge || '');      // Challenge
```

### Step 3: Set Up Email Notifications (Optional but Recommended)

1. Go to https://script.google.com
2. Create new project: "TableTurnr Notifications"
3. Replace code with:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    const subject = `🚨 New TableTurnr Demo Request - ${data.restaurant_name}`;
    const htmlBody = `
      <h2>New Demo Request!</h2>
      <p><strong>Restaurant:</strong> ${data.restaurant_name}</p>
      <p><strong>Contact:</strong> ${data.contact_name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Locations:</strong> ${data.locations}</p>
      <p><strong>Revenue:</strong> ${data.revenue}</p>
      <p><strong>Challenge:</strong> ${data.challenge}</p>
      <p><strong>Time:</strong> ${data.timestamp}</p>
    `;
    
    GmailApp.sendEmail('chandan.dce07@gmail.com', subject, '', {htmlBody: htmlBody});
    
    return ContentService.createTextOutput('Success');
  } catch (error) {
    return ContentService.createTextOutput('Error: ' + error);
  }
}
```

4. Deploy as web app (Execute as: Me, Access: Anyone)
5. Copy the web app URL and update line 421 in `script.js`

## 📊 How to Access Your Demo Requests

### Method 1: Google Forms Dashboard
- Go to https://forms.google.com
- Click on "TableTurnr Demo Request" form
- Click "Responses" tab to see all submissions

### Method 2: Create a Google Sheet (Recommended)
1. In your Google Form, click "Responses"
2. Click the Google Sheets icon (green spreadsheet)
3. Create new spreadsheet - all submissions will auto-populate
4. Access anytime at https://sheets.google.com

### Method 3: Email Notifications
- You'll get emails at chandan.dce07@gmail.com for each request

### Method 4: Browser Backup Data
- Open Developer Tools (F12) on your website
- Go to Application → Local Storage
- Find `tableturner_leads` key for backup data

## 🧪 Testing Your Setup

1. Go to your website
2. Click "Request Demo" 
3. Fill out and submit the form
4. Check:
   - ✅ Google Form receives the submission
   - ✅ You get an email notification (if set up)
   - ✅ Data appears in Google Sheets (if connected)

## 🚨 Current Status

- ✅ Website integration: READY
- ⏳ Entry IDs: NEED TO UPDATE
- ⏳ Email notifications: OPTIONAL SETUP
- ✅ Backup system: ACTIVE

Once you update the entry IDs, your demo request system will be fully functional!