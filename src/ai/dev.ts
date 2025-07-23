
import { config } from 'dotenv';
config();

// This file is used to start the Genkit developer server.
// It imports the AI initialization first, then the flows.
import './flows/generate-legal-advice';
