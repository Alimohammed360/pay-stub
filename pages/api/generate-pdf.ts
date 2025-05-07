import puppeteer from 'puppeteer-core';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true,
    executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium-browser', // for Vercel or local
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000/pdf-preview', {
    waitUntil: 'networkidle0',
  });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
  });

  await browser.close();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=paystub.pdf');
  res.send(pdfBuffer);
}
