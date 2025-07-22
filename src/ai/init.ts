'use server';

/**
 * @fileoverview This file initializes the Genkit AI object and registers all flows.
 * It is meant to be imported by server-side processes only.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkizod -I am using the following code to generate a form with a checkbox. The problem is that the checkbox is not being initialized to false. This is causing the form to fail validation when the checkbox is not checked.
I have tried to initialize the checkbox to false in the `defaultValues` of the form, but this is not working. I have also tried to initialize the checkbox to false in the `z.object` definition, but this is also not working.
I am using the following code to generate the form:
```tsx
const formSchema = z.object({
  incidentDescription: z.string().min(20, 'Please provide a detailed description of at least 20 characters.'),
  isBusiness: z.boolean().default(false),
  isPersonalDataInvolved: z.boolean().default(false),
  dataTypes: z.string().min(3, 'Please specify the types of data involved.'),
});
```
I am using the following code to initialize the form:
```tsx
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    incidentDescription: '',
    isBusiness: false,
    isPersonalDataInvolved: false,
    dataTypes: '',
  },
});
```
I am using the following code to render the checkbox:
```tsx
<FormField
  control={form.control}
  name="isPersonalDataInvolved"
  render={({ field }) => (
    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
      <div className="space-y-0.5">
        <FormLabel>Was personal data of Indian citizens involved?</FormLabel>
        <FormDescription>
          This includes names, contact details, financial info, etc.
        </FormDescription>
      </div>
      <FormControl>
        <Switch
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
    </FormItem>
  )}
/>
```
I have also tried to initialize the checkbox to false in the `z.object` definition, but this is also not working.
```tsx
const formSchema = z.object({
  incidentDescription: z.string().min(20, 'Please provide a detailed description of at least 20 characters.'),
  isBusiness: z.boolean().default(false),
  isPersonalDataInvolved: z.boolean().default(false),
  dataTypes: z.string().min(3, 'Please specify the types of data involved.'),
});
```
I am not sure what I am doing wrong. Any help would be appreciated.t-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});

// Import flows to register them with Genkit
import './flows/generate-legal-advice';
import './flows/generate-ebrief';
import './flows/generate-breach-advice';
