import { config } from 'dotenv';
config();

// This file is used to start the Genkit developer server.
// It imports all the flow definitions.
import './init';
import './flows/generate-legal-advice';
import './flows/generate-ebrief';
import './flows/generate-breach-advice';
