# Date Differences App

A web-based utility to calculate the difference between two dates. The application provides a detailed breakdown of the duration in years, months, weeks, and days, along with the total number of seconds. It features a clean, responsive interface with theme support.

## Features

-   **Comprehensive Date Calculation**: Computes the difference between two dates and displays the result in multiple units:
    -   Total Days
    -   Total Weeks
    -   Detailed breakdown (Years, Months, Days)
    -   Total Seconds
-   **User-Friendly Interface**: An intuitive dashboard to input dates and view results.
-   **Flexible Settings**:
    -   **Auto-Swap**: Automatically swaps the start and end dates if the start date is later than the end date.
    -   **Inclusive Day Count**: Option to include the end date in the total duration calculation.
-   **Quick Demo**: A "Demo" button that populates the date fields with the last 90 days for a quick demonstration.
-   **Theme Support**: Switch between Light, Dark, and System-based themes to suit your preference.
-   **Responsive Design**: The layout adapts to various screen sizes, from desktops to mobile devices.
-   **Toast Notifications**: Provides non-intrusive feedback for actions like successful calculations or input errors.

## Getting Started

No installation is required. Simply open the `index.html` file in your preferred web browser to run the application locally.

### How to Use

1.  **Select Dates**: Use the date pickers to choose a "Start Date" and an "End Date".
2.  **Adjust Settings (Optional)**:
    -   Toggle "auto-swap" if you want the app to handle incorrect date ordering.
    -   Toggle "inclusive day count" to include the end date in the calculation.
3.  **Calculate**: Click the **Calculate** button to see the results on the dashboard.
4.  **Demo**: Click the **Demo (last 90 days)** button to quickly see the app in action.
5.  **Clear**: Click the **Clear** button to reset all inputs and results.

## Project Structure

The repository is organized with a clear separation of concerns:

```
└── abod-ogc-date-differences-app/
    ├── index.html          # Main HTML file for the application structure.
    ├── style.css           # CSS file for all styling and layout.
    └── js/
        ├── app.js          # Core application logic, event handling, and UI manipulation.
        ├── themes/         # Modules for handling theme switching.
        │   ├── apply.theme.js
        │   ├── event.theme.js
        │   └── init.theme.js
        └── utils/
            └── date.js     # Utility functions for date calculations and formatting.
```

## Technologies Used

-   **HTML5**
-   **CSS3** (with CSS Variables for theming)
-   **Vanilla JavaScript** (with ES6 Modules)
-   **Google Fonts** & **Material Symbols**
