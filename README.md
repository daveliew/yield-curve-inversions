# Yield Curve Visualizer

## Project Description
The Yield Curve Visualizer is a web application that fetches and displays U.S. Treasury yield curve data. It visualizes the relationship between interest rates and the time to maturity for government debt, specifically comparing 2-year and 10-year Treasury rates over time.

## Tech Stack

- **Frontend:**
  - Next.js 13+ (React framework)
  - React 18+
  - TypeScript
  - Chart.js / react-chartjs-2 (for data visualization)

- **Backend:**
  - Next.js API Routes (serverless functions)

- **Data Source:**
  - FRED (Federal Reserve Economic Data) API

- **Deployment:**
  - [Your deployment platform, e.g., Vercel, Netlify, etc.]

## Key Features

- Fetches real-time data from the FRED API
- Visualizes 2-year and 10-year Treasury rates on an interactive line chart
- Allows users to explore historical yield curve data from 1990 onwards
- Responsive design for various screen sizes

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your FRED API key: `FRED_API_KEY=your_api_key_here`
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Routes

- `/api/yieldData`: Fetches and processes yield curve data from FRED

## Contributing

# Contributing to Yield Curve Visualizer

We welcome contributions to the Yield Curve Visualizer project! Here are some guidelines to help you get started:

1. **Fork the Repository**: Start by forking the repository and then clone it locally.

2. **Create a Branch**: Create a branch for your feature or bug fix.

3. **Make Changes**: Make your changes in your branch.

4. **Follow Code Style**: Ensure your code adheres to the existing style of the project to maintain consistency.

5. **Write Tests**: If you've added a new feature or fixed a bug, add tests to cover it.

6. **Update Documentation**: Update the README.md or other documentation if necessary.

7. **Commit Your Changes**: Use clear and meaningful commit messages.

8. **Push to Your Fork**: Push your changes to your fork on GitHub.

9. **Submit a Pull Request**: From your fork, open a new pull request in the original repository.

10. **Code Review**: Wait for the maintainers to review your pull request and address any comments or questions they might have.

Thank you for contributing to Yield Curve Visualizer!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

