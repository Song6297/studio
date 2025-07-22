
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ShieldAlert, FileText, ListChecks, DraftingCompass, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function DataBreachAdvisorPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-background flex-1">
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="inline-block rounded-full bg-background p-4 shadow-md border border-primary/10">
              <ShieldAlert className="h-10 w-10 text-primary" />
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Data Breach Action Plan
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            A guide to your next steps after a security incident, based on Indian cyber law.
          </p>
           <p className="text-sm text-muted-foreground">
            This is not a substitute for advice from a qualified lawyer or cybersecurity professional.
          </p>
        </div>
        
        <div className="mt-12 mx-auto w-full max-w-3xl">
           <Card className="bg-card">
             <CardHeader>
                <CardTitle className="font-headline text-3xl">Your Incident Action Plan</CardTitle>
                <CardDescription>Follow these steps to contain the breach, comply with the law, and protect affected individuals.</CardDescription>
             </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="item-1">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-xl font-bold font-headline flex items-center gap-2"><ShieldCheck/> 1. Understand Your Legal Duties</AccordionTrigger>
                        <AccordionContent className="text-base space-y-4">
                            <p>Under Indian law, specific actions are required after a cyber security incident.</p>
                            <h4 className="font-semibold">For Businesses & Organizations:</h4>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li><strong>CERT-In Reporting:</strong> You must report cybersecurity incidents to the Indian Computer Emergency Response Team (CERT-In) within 6 hours of noticing the incident. This is a mandatory requirement.</li>
                                <li><strong>DPDP Act Compliance:</strong> If personal data of Indian citizens is breached, you must notify the Data Protection Board of India and the affected individuals without undue delay.</li>
                            </ul>
                             <h4 className="font-semibold">For Individuals:</h4>
                             <p>While you may not have the same reporting duties as a business, you should report the incident to the National Cyber Crime Reporting Portal at <a href="https://www.cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-primary underline">www.cybercrime.gov.in</a> to help authorities track and combat cybercrime.</p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-xl font-bold font-headline flex items-center gap-2"><ListChecks/> 2. Immediate Mitigation Checklist</AccordionTrigger>
                        <AccordionContent className="text-base space-y-4">
                           <h4 className="font-semibold">For Businesses:</h4>
                           <ul className="list-disc list-inside space-y-2 pl-4">
                                <li><strong>Isolate Affected Systems:</strong> Disconnect compromised computers or servers from the network to prevent the breach from spreading.</li>
                                <li><strong>Change Credentials:</strong> Immediately reset all passwords, API keys, and access tokens for all affected systems and potentially compromised user accounts.</li>
                                <li><strong>Scan for Malware:</strong> Run comprehensive scans on all systems to identify and remove any malicious software.</li>
                                <li><strong>Review Access Logs:</strong> Analyze logs to determine how the attacker gained access and what data they viewed or exfiltrated.</li>
                                <li><strong>Consult Experts:</strong> Engage a cybersecurity firm to conduct a thorough investigation.</li>
                           </ul>
                           <h4 className="font-semibold">For Individuals:</h4>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li><strong>Change Passwords:</strong> Change passwords immediately for the affected account and any other accounts that use the same or a similar password.</li>
                                <li><strong>Enable 2FA:</strong> Enable Two-Factor Authentication on all your important accounts (email, banking, social media).</li>
                                <li><strong>Monitor Statements:</strong> Keep a close watch on your bank and credit card statements for any unauthorized transactions.</li>
                                <li><strong>Be Wary of Phishing:</strong> Be extra cautious of emails or messages that claim to be related to the breach, as they could be phishing attempts.</li>
                           </ul>
                        </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-xl font-bold font-headline flex items-center gap-2"><DraftingCompass/> 3. Notifying Affected Individuals</AccordionTrigger>
                        <AccordionContent className="text-base space-y-4">
                            <p>If a data breach affects others, clear and timely communication is crucial. Here is a basic template to adapt.</p>
                            <div className="text-sm whitespace-pre-wrap bg-muted/50 p-4 rounded-md font-mono">
                                <p><strong>Subject: Important Security Notification About Your Account with [Your Company Name]</strong></p>
                                <br />
                                <p>Dear [User Name],</p>
                                <br />
                                <p>We are writing to inform you about a security incident we recently identified on [Date of Incident]. We have taken immediate steps to secure our systems and are investigating the matter with cybersecurity experts.</p>
                                <br />
                                <p><strong>What Happened:</strong> [Provide a brief, clear description of the incident. E.g., We detected unauthorized access to our user database.]</p>
                                <br />
                                <p><strong>What Information Was Involved:</strong> The investigation indicates that the following information may have been accessed: [List the types of data, e.g., Names, Email Addresses, Contact Numbers]. We want to assure you that [e.g., your financial information and passwords] were not affected.</p>
                                <br />
                                <p><strong>What We Are Doing:</strong> We have secured the vulnerability, reported the incident to the relevant authorities, and are reviewing our security measures to prevent this from happening again.</p>
                                <br />
                                <p><strong>What You Can Do:</strong> We recommend that you remain vigilant against phishing attempts and monitor your accounts for any suspicious activity. </p>
                                <br />
                                <p>We sincerely regret any concern or inconvenience this may cause. </p>
                                <br />
                                <p>Sincerely,</p>
                                <p>The [Your Company Name] Team</p>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                        <AccordionTrigger className="text-xl font-bold font-headline flex items-center gap-2"><FileText/> 4. Evidence Preservation</AccordionTrigger>
                        <AccordionContent className="text-base space-y-2">
                           <p>Properly preserving evidence is critical for any potential police complaint or legal action.</p>
                           <ul className="list-disc list-inside space-y-2 pl-4">
                                <li><strong>Do Not Wipe Devices:</strong> Do not turn off, restart, or wipe affected devices, as this can destroy crucial evidence.</li>
                                <li><strong>Take Screenshots:</strong> Capture screenshots of any fraudulent messages, emails, unauthorized transactions, or suspicious login alerts.</li>
                                <li><strong>Create a Timeline:</strong> Write down a detailed timeline of events. Note when you first noticed the incident, what you saw, what actions you took, and at what times.</li>
                                <li><strong>Preserve Logs:</strong> If you are a business, ensure that all server logs, access logs, and firewall logs from the time of the incident are securely backed up in an unaltered state.</li>
                           </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
