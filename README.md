# 1. Install dependencies and build the web bundle
npm install
npm run build

# 2. Add Android (for Play Store)
npx cap add android

# 3. Add iOS (for Apple App Store, requires a Mac)
npx cap add ios
