# 🚀 Simple Render Free Deployment Guide

Deploy your Event Booking System on Render completely free - no credit card required!

## 📋 What You'll Need

1. **GitHub account** (free)
2. **Render account** (free - sign up at [render.com](https://render.com))
3. **MongoDB Atlas account** (free - sign up at [mongodb.com/atlas](https://mongodb.com/atlas))

## 🎯 Choose Your Deployment Method

### 🚀 **Option A: Blueprint (Recommended - Easier)**
- ✅ **One-click deployment** using your `render.yaml`
- ✅ **Deploys both services automatically**
- ✅ **Pre-configured for free tier**
- ⏱️ **Takes 2 minutes to setup**

### 🔧 **Option B: Manual (More Control)**
- ✅ **Step-by-step manual setup**
- ✅ **Deploy each service individually**
- ✅ **Choose exact settings yourself**
- ⏱️ **Takes 5-10 minutes**

**Both methods are 100% free!** Choose Blueprint for simplicity, or Manual for learning.

---

## 🗄️ Step 1: Setup Free MongoDB Database

### 1.1 Create MongoDB Atlas Account

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Click **"Try Free"** and sign up
3. Choose **"Build a database"**
4. Select **"M0 FREE"** tier
5. Choose **AWS** provider and any region
6. Click **"Create Cluster"**

### 1.2 Create Database User

1. Go to **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `eventuser`
5. Password: `eventpass123` (or generate secure password)
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### 1.3 Allow Network Access

1. Go to **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (`0.0.0.0/0`)
4. Click **"Confirm"**

### 1.4 Get Connection String

1. Go to **"Database"** in left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Drivers"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://eventuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password: `eventpass123`
6. **Save this connection string** - you'll need it later!

---

## 🚀 Step 2: Deploy on Render (One-Click Method)

### 2.1 Create Render Account

1. Go to [render.com](https://render.com)
2. Click **"Get Started for Free"**
3. Sign up with GitHub (recommended)

### 2.2 Connect Your Repository

1. In Render Dashboard, click **"New +"**
2. Select **"Blueprint"**
3. Connect your GitHub account if not already connected
4. Find and select **"Event-Booking-Ticketing-System"** repository
5. Click **"Connect"**

### 2.3 Configure Blueprint

Render will detect your `render.yaml` file automatically:

1. **Blueprint Name**: Keep default or change to `event-booking-system`
2. **Branch**: `main`
3. Click **"Apply"**

### 2.4 Set Environment Variables

You'll see two services being created. Configure them:

**For Backend Service (event-booking-backend):**

1. Click on the backend service
2. Go to **"Environment"** tab
3. Add these variables:

| Key            | Value                                              |
| -------------- | -------------------------------------------------- |
| `MONGODB_URI`  | Your MongoDB connection string from Step 1.4       |
| `JWT_SECRET`   | `your-super-secret-jwt-key-make-it-very-long-2025` |
| `NODE_ENV`     | `production`                                       |
| `FRONTEND_URL` | Leave empty for now (we'll update this)            |

**For Frontend Service (event-booking-frontend):**

1. Click on the frontend service
2. Go to **"Environment"** tab
3. Add this variable:

| Key            | Value                                   |
| -------------- | --------------------------------------- |
| `VITE_API_URL` | Leave empty for now (we'll update this) |

### 2.5 Deploy Services

1. Click **"Create Services"**
2. Wait for both services to deploy (5-10 minutes)
3. ✅ Your backend will be deployed first
4. ✅ Your frontend will deploy after backend is ready

---

## 🔧 Step 3: Update Service URLs

After both services are deployed:

### 3.1 Get Service URLs

1. Go to your Render Dashboard
2. Copy the URLs of both services:
   - Backend: `https://event-booking-backend-xxxxx.onrender.com`
   - Frontend: `https://event-booking-frontend-xxxxx.onrender.com`

### 3.2 Update Backend Environment

1. Go to **Backend Service** → **Environment**
2. Update `FRONTEND_URL` with your frontend URL
3. Click **"Save Changes"** (service will redeploy)

### 3.3 Update Frontend Environment

1. Go to **Frontend Service** → **Environment**
2. Update `VITE_API_URL` with your backend URL
3. Click **"Save Changes"** (service will redeploy)

---

## ✅ Step 4: Test Your Deployment

### 4.1 Check Backend Health

Visit: `https://your-backend-url.onrender.com/api/health`

You should see:

```json
{
  "success": true,
  "message": "API is healthy",
  "timestamp": "2025-09-19T...",
  "uptime": 123.45
}
```

**⚠️ If you get "Cannot GET /health":**
- Make sure you're using `/api/health` (not `/health`)
- Check your backend service is running in Render dashboard

### 4.2 Check Frontend

Visit: `https://your-frontend-url.onrender.com`

- ✅ App should load
- ✅ You should see the home page

### 4.3 Seed Database (IMPORTANT!)

If events page is empty, seed the database:

1. **Go to Backend Service** in Render Dashboard
2. **Click "Shell" tab** (next to Events/Logs)
3. **Run this command**:
   ```bash
   npm run seed
   ```
4. **Wait for "Seeding completed"** message
5. **Refresh your frontend** - events should now appear

### 4.4 Test Full Functionality

1. **Register a new user** or use demo credentials:
   - Email: `user@example.com`
   - Password: `password123`
2. **Browse events** (should load from database)
3. **Make a booking** to test full functionality

---

## 🎯 Alternative: Manual Deployment (Step-by-Step)

If you prefer manual deployment or Blueprint doesn't work:

### Backend Deployment (Free Web Service)

1. **New +** → **Web Service**
2. **Connect Repository** → Select your GitHub repo
3. **Configure Service**:
   ```
   Name: event-booking-backend
   Environment: Node
   Region: Oregon (US West) - free
   Branch: main
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free ($0/month)
   ```

4. **Environment Variables**:
   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `PORT` | `10000` |
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `JWT_SECRET` | `your-super-secret-jwt-key-make-it-very-long-2025` |
   | `FRONTEND_URL` | (Leave empty, update after frontend deployment) |

5. **Click "Create Web Service"** (Free tier automatically selected)

### Frontend Deployment (Free Static Site)

1. **New +** → **Static Site**
2. **Connect Repository** → Select your GitHub repo
3. **Configure Site**:
   ```
   Name: event-booking-frontend
   Branch: main
   Root Directory: frontend
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

4. **Environment Variables**:
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | (Leave empty, update after backend deployment) |

5. **Click "Create Static Site"** (Always free)

### Update Cross-References
After both deploy:
1. Copy backend URL → Update `VITE_API_URL` in frontend
2. Copy frontend URL → Update `FRONTEND_URL` in backend
3. Both services will auto-redeploy

---

## 🐛 Troubleshooting

### ⚠️ **CRITICAL: Events Data Coming But Not Displaying**

**Problem**: Backend returns events data but frontend page shows no events  
**Solutions**:

1. **Check Browser Console for Errors**:
   - Open frontend in browser
   - Press F12 → Console tab
   - Look for JavaScript errors (red text)
   - Common errors: "Cannot read property", "Unexpected token"

2. **Check Network Requests**:
   - F12 → Network tab
   - Go to Events page
   - Look for API call to `/api/events`
   - Check if it returns 200 status with data

3. **Verify Frontend Environment Variable**:
   - Go to Frontend Service → Environment
   - Ensure `VITE_API_URL` = `https://your-backend-url.onrender.com`
   - No trailing slash in URL
   - Save and redeploy if changed

4. **Check CORS Headers**:
   - In Network tab, click on the `/api/events` request
   - Check Response Headers for `Access-Control-Allow-Origin`
   - Should match your frontend URL

### ⚠️ **CRITICAL: Cannot GET /health Error**

**Problem**: Getting "Cannot GET /health" error  
**Solutions**:

1. **Use correct endpoint**: `/api/health` (not `/health`)
   - ✅ Correct: `https://your-backend-url.onrender.com/api/health`
   - ❌ Wrong: `https://your-backend-url.onrender.com/health`

2. **Check backend service status**:
   - Go to Render Dashboard → Backend Service
   - Check if service shows "Live" status
   - If not, check deployment logs

3. **Check backend logs**:
   - Go to Backend Service → Events tab
   - Look for startup errors
   - Ensure "Server running" message appears

4. **Verify environment variables**:
   - Backend Service → Environment tab
   - Ensure `MONGODB_URI` is set correctly
   - Check for connection errors in logs

### ⚠️ **CRITICAL: If App Crashes on Refresh**

**Problem**: Page refreshes return 404 or app crashes  
**Solution**: Ensure `_redirects` file exists in `frontend/public/`:

1. Check if file exists: `frontend/public/_redirects`
2. Content should be exactly:
   ```
   /*    /index.html   200
   ```
3. If missing, create it and redeploy frontend

### ⚠️ **CRITICAL: No Events Showing**

**Problem**: Events page is empty  
**Solutions**:

1. **Check Backend Health**:
   Visit: `https://your-backend-url.onrender.com/api/health`
   Should return JSON response

2. **Test Events API**:
   Visit: `https://your-backend-url.onrender.com/api/events`
   Should return events array (might be empty)

3. **Seed the Database**:
   ```bash
   # Option A: Use Render Shell
   1. Go to Backend Service → Shell tab
   2. Run: npm run seed
   
   # Option B: Local seeding (if MongoDB is accessible)
   cd backend
   npm run seed
   ```

4. **Check Environment Variables**:
   - Backend `MONGODB_URI` is correct
   - Frontend `VITE_API_URL` points to backend
   - No extra spaces in URLs

### 🔧 **Debug Steps**

1. **Check Backend Logs**:
   - Go to Backend Service → Events tab
   - Look for MongoDB connection errors
   - Check for "MongoDB Connected" message

2. **Check Frontend Network**:
   - Open browser DevTools → Network tab
   - Refresh events page
   - Look for failed API calls to `/api/events`

3. **Verify URLs**:
   - Backend: `https://your-backend-name.onrender.com`
   - Frontend: `https://your-frontend-name.onrender.com`
   - No trailing slashes in environment variables

### Common Issues:

**1. "Service Build Failed"**

- Check the build logs in Render dashboard
- Ensure all dependencies are in `package.json`

**2. "Cannot connect to MongoDB"**

- Verify MongoDB connection string is correct
- Check Network Access allows `0.0.0.0/0`
- Ensure database user exists

**3. "CORS Error"**

- Make sure `FRONTEND_URL` in backend matches your frontend URL exactly
- Check both services are using `https://` (not `http://`)

**4. "Service Not Responding"**

- Free services sleep after 15 minutes
- First request may take 30-60 seconds (cold start)
- This is normal for free tier

### Getting Help:

- Check service logs: **Service** → **Events** tab
- Backend logs: **Service** → **Events** → **Deploy** logs
- Frontend logs: **Service** → **Events** → **Build** logs

---

## 🎉 You're Done!

Your Event Booking System is now live on Render for free!

**Your URLs:**

- 🌐 **Frontend**: https://your-frontend-name.onrender.com
- 🔧 **Backend API**: https://your-backend-name.onrender.com

**Demo Credentials:**

- **User**: `user@example.com` / `password123`
- **Admin**: `admin@example.com` / `admin123`

### Free Tier Notes:

- ✅ **Static sites**: Always active
- ⏰ **Web services**: Sleep after 15 minutes (wake up on first request)
- 💾 **Database**: 512MB free on MongoDB Atlas
- 📊 **Bandwidth**: 100GB/month free

**Enjoy your deployed app!** 🚀
