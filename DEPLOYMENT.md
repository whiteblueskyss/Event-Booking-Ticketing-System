# Render Deployment Guide

## 📋 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Your code should be pushed to GitHub
3. **MongoDB Atlas**: Set up a MongoDB database (free tier available)

## 🚀 Quick Deploy (Recommended)

### Option 1: One-Click Deploy with render.yaml

1. **Fork/Clone** this repository to your GitHub account

2. **Connect to Render**:

   - Go to your [Render Dashboard](https://dashboard.render.com)
   - Click **"New +"** → **"Blueprint"**
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file

3. **Configure Environment Variables**:

   - **MONGODB_URI**: Your MongoDB Atlas connection string
   - **JWT_SECRET**: A secure random string (Render can generate this)
   - **FRONTEND_URL**: Will be auto-configured
   - **VITE_API_URL**: Will be auto-configured

4. **Deploy**: Click "Create Services" and wait for deployment

---

## 🔧 Manual Deploy (Step by Step)

### Step 1: Deploy Backend (Web Service)

1. **Create Web Service**:

   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository

2. **Configure Backend**:

   ```
   Name: event-booking-backend
   Environment: Node
   Region: Choose closest to your users
   Branch: main
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

3. **Environment Variables**:

   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eventbooking
   JWT_SECRET=your-super-secret-jwt-key-here
   FRONTEND_URL=https://your-frontend-domain.onrender.com
   ```

4. **Deploy**: Click "Create Web Service"

### Step 2: Deploy Frontend (Static Site)

1. **Create Static Site**:

   - Click **"New +"** → **"Static Site"**
   - Connect your GitHub repository

2. **Configure Frontend**:

   ```
   Name: event-booking-frontend
   Branch: main
   Root Directory: frontend
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

3. **Environment Variables**:

   ```
   VITE_API_URL=https://your-backend-domain.onrender.com
   ```

4. **Deploy**: Click "Create Static Site"

### Step 3: Update URLs

1. **Get Backend URL**: Copy from backend service (e.g., `https://event-booking-backend.onrender.com`)
2. **Update Frontend Environment**:
   - Go to frontend service settings
   - Update `VITE_API_URL` with your backend URL
3. **Update Backend Environment**:
   - Go to backend service settings
   - Update `FRONTEND_URL` with your frontend URL

---

## 🗄️ Database Setup (MongoDB Atlas)

### Create MongoDB Atlas Cluster

1. **Sign up** at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create Free Cluster**
3. **Database Access**:
   - Create database user
   - Note username and password
4. **Network Access**:
   - Add IP: `0.0.0.0/0` (allow all)
5. **Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password

### Example Connection String

```
mongodb+srv://username:password@cluster0.abc123.mongodb.net/eventbooking?retryWrites=true&w=majority
```

---

## 🔧 Environment Variables Reference

### Backend (.env)

```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eventbooking

# Security
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random

# Server
NODE_ENV=production
PORT=10000

# CORS
FRONTEND_URL=https://your-frontend-domain.onrender.com
```

### Frontend (.env)

```bash
# API Configuration
VITE_API_URL=https://your-backend-domain.onrender.com
```

---

## 🛠️ Post-Deployment Steps

### 1. Seed Database (Optional)

Run the seeder to populate initial data:

```bash
# In Render shell or locally
npm run seed
```

### 2. Test Your Application

- ✅ Frontend loads correctly
- ✅ Can register/login users
- ✅ Can view events
- ✅ Can make bookings
- ✅ API responds correctly

### 3. Custom Domain (Optional)

1. Go to service settings
2. Add custom domain
3. Update DNS records as instructed

---

## 🐛 Troubleshooting

### Common Issues

**1. "Cannot connect to MongoDB"**

- Check MongoDB Atlas network access (allow 0.0.0.0/0)
- Verify connection string format
- Ensure database user exists

**2. "CORS Error"**

- Verify `FRONTEND_URL` matches your frontend domain exactly
- Check CORS configuration in backend

**3. "API calls failing"**

- Verify `VITE_API_URL` points to correct backend URL
- Check backend service is running

**4. "Routes not working (404)"**

- Ensure `_redirects` file exists in frontend/public
- Verify it contains: `/*    /index.html   200`

### Logs and Debugging

**Backend Logs**:

- Go to backend service → Events tab
- Check for error messages

**Frontend Build Logs**:

- Go to frontend service → Events tab
- Check build process for errors

**Test API Endpoints**:

```bash
# Health check
curl https://your-backend-domain.onrender.com/api/health

# Get events
curl https://your-backend-domain.onrender.com/api/events
```

---

## 📊 Performance Tips

1. **Free Tier Limitations**:

   - Services sleep after 15 minutes of inactivity
   - Cold starts can take 30+ seconds
   - Consider upgrading for production

2. **Optimization**:

   - Enable compression in backend
   - Optimize frontend bundle size
   - Use CDN for static assets

3. **Monitoring**:
   - Set up uptime monitoring
   - Monitor service logs regularly

---

## 🔄 Updates and Redeployment

### Automatic Deployment

- Render automatically redeploys on git push to main branch
- Check deployment status in service events

### Manual Deployment

- Go to service → Manual Deploy → "Deploy latest commit"

### Environment Variable Updates

- Update via Render dashboard
- Service will automatically restart

---

## 📋 Deployment Checklist

- [ ] Repository connected to Render
- [ ] MongoDB Atlas cluster created
- [ ] Backend service deployed
- [ ] Frontend service deployed
- [ ] Environment variables configured
- [ ] CORS properly configured
- [ ] Database connection working
- [ ] Frontend can communicate with backend
- [ ] User registration/login working
- [ ] Event booking functionality working
- [ ] Custom domains configured (if needed)

---

## 🆘 Need Help?

- **Render Docs**: [docs.render.com](https://docs.render.com)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **GitHub Issues**: Report problems in repository issues

Happy deploying! 🚀
