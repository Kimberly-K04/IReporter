## Frontend Setup

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
cd client
npm install
```

### Environment Variables

Create a `.env` file inside the `client/` folder:

```env
VITE_API=http://localhost:5000/api/v1
```

> For production, replace with the deployed backend URL e.g. `https://ireporter-api.onrender.com/api/v1`

### Running the Development Server

```bash
cd client
npm run dev
```

App runs at `http://localhost:5173`

### Running Tests

```bash
cd client
npm run test
```

### Building for Production

```bash
cd client
npm run build
```

### Deployment

The frontend is deployed on Vercel. Every push to `main` triggers:
1. Tests run via GitHub Actions
2. If tests pass, build runs
3. If build passes, deploys to Vercel automatically

Live URL: `https://ireporter-kkwamboka04.vercel.app