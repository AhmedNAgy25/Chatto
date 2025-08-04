# Vercel Deployment Guide

This guide will help you deploy your Chatto application to Vercel.

## 🚀 Quick Deploy

### Option 1: Deploy with Vercel CLI

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy**

   ```bash
   vercel
   ```

4. **Follow the prompts**
   - Link to existing project or create new
   - Set project name (optional)
   - Confirm deployment

### Option 2: Deploy via GitHub

1. **Push your code to GitHub**

   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository

3. **Configure deployment**
   - Vercel will auto-detect the configuration
   - No additional settings needed

## ⚙️ Environment Variables

Set these in your Vercel dashboard:

### Required Variables

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
COOKIE_SECRET=your-cookie-secret-key-minimum-32-characters
```

### Optional Variables

```env
JWT_EXPIRE=7d
CLIENT_URL=https://your-app-name.vercel.app
```

## 🔧 Configuration Files

### vercel.json

The project includes a `vercel.json` file that:

- Configures the Node.js server
- Builds the React client
- Routes API calls to the server
- Serves static files from the client build

### Build Process

1. **Server**: Installs dependencies and prepares for serverless
2. **Client**: Builds React app with Vite
3. **Routing**: API calls go to server, everything else to client

## ⚠️ Important Limitations

### Socket.IO on Vercel

Due to Vercel's serverless architecture:

- **Socket.IO is disabled** in production
- **Real-time features won't work** on Vercel
- **Local development** still has full functionality

### Alternative Solutions

1. **Use Railway** for full Socket.IO support
2. **Use WebSockets** instead of Socket.IO
3. **Use Server-Sent Events** for real-time updates
4. **Use polling** for message updates

## 🛠️ Troubleshooting

### Common Issues

1. **Build Fails**

   - Check Node.js version (>= 18)
   - Ensure all dependencies are installed
   - Check for syntax errors

2. **Environment Variables Not Working**

   - Verify all variables are set in Vercel dashboard
   - Check variable names match exactly
   - Redeploy after adding variables

3. **API Routes Not Working**

   - Ensure routes start with `/api/`
   - Check server logs in Vercel dashboard
   - Verify MongoDB connection

4. **Static Files Not Serving**
   - Check `vercel.json` configuration
   - Ensure client build completed successfully
   - Verify file paths in build output

### Debug Commands

```bash
# Check build locally
npm run build

# Test server locally
npm start

# Check Vercel logs
vercel logs

# Redeploy
vercel --prod
```

## 📊 Monitoring

### Vercel Dashboard

- **Analytics**: View traffic and performance
- **Functions**: Monitor serverless function usage
- **Logs**: Check server and build logs
- **Settings**: Manage environment variables

### Performance Tips

1. **Enable caching** for static assets
2. **Use CDN** for global performance
3. **Monitor function cold starts**
4. **Optimize bundle size**

## 🔄 Updates

### Deploy Updates

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Environment Variable Updates

1. Go to Vercel dashboard
2. Navigate to project settings
3. Update environment variables
4. Redeploy the project

## 📞 Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Project Issues**: Create an issue in this repository

## 🎉 Success!

Once deployed, your app will be available at:
`https://your-app-name.vercel.app`

Remember to:

- Test all features thoroughly
- Monitor performance and errors
- Keep dependencies updated
- Backup your database regularly
