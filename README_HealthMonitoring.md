# Health Monitoring Dashboard

A React-based health monitoring website focused on tracking vital health metrics and predicting injury risk for final-year project requirements.

## Features

### 🫀 Heart Rate Monitoring
- Real-time heart rate display with BPM values
- Historical heart rate trends with interactive charts
- Visual indicators for abnormal heart rate levels

### 🫁 Respiratory Rate Tracking
- Current respiratory rate monitoring
- Normal/abnormal level indicators
- Integrated with injury risk assessment

### 🏃‍♂️ Exercise Duration Tracking
- Interactive exercise timer with start/pause/stop functionality
- Support for multiple exercise types (Running, Cycling, Swimming, Walking, Gym, Yoga)
- Exercise intensity levels (Low, Medium, High)
- Exercise history and statistics
- Total session count and duration tracking

### ⚠️ Injury Prediction System
- AI-powered injury risk assessment based on:
  - Heart rate patterns
  - Respiratory rate levels
  - Exercise frequency and intensity
  - Training load analysis
- Risk level classification (Low, Moderate, High)
- Personalized recommendations for injury prevention
- Visual risk indicators and progress tracking

## Technology Stack

- **Frontend**: React 18.2.0
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **Styling**: Tailwind CSS
- **Build Tool**: Create React App

## Installation & Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── components/
│   ├── Navigation.js          # Navigation bar
│   ├── PatientList.js         # Patient selection sidebar
│   ├── HeartRateChart.js      # Heart rate visualization
│   ├── ExerciseTracker.js     # Exercise tracking interface
│   └── InjuryPredictor.js     # Injury risk assessment
├── assets/                    # Images and icons
├── App.js                     # Main application component
└── index.js                   # Application entry point
```

## Key Components

### HeartRateChart
- Displays heart rate trends over time
- Interactive chart with Chart.js
- Shows last 6 months of data

### ExerciseTracker
- Real-time exercise timer
- Exercise type and intensity selection
- Session history and statistics
- Start/pause/stop functionality

### InjuryPredictor
- Analyzes multiple health metrics
- Provides risk score (0-8 scale)
- Lists identified risk factors
- Offers personalized recommendations

## Health Metrics Tracked

1. **Heart Rate** (BPM)
   - Resting heart rate monitoring
   - Trend analysis
   - Abnormal level detection

2. **Respiratory Rate** (RPM)
   - Current respiratory rate
   - Normal range assessment

3. **Exercise Data**
   - Duration tracking
   - Exercise type classification
   - Intensity monitoring
   - Frequency analysis

## Injury Risk Factors

The system evaluates:
- Elevated/low resting heart rate
- Abnormal respiratory patterns
- Overtraining indicators
- Sudden activity increases
- Insufficient exercise volume

## Future Enhancements

- Mobile app development
- Real-time sensor integration
- Advanced ML prediction models
- Social features and challenges
- Healthcare provider integration

## Contributing

This project is developed for academic purposes as a final-year project focusing on health monitoring and injury prediction.

## License

This project is for educational use only.
