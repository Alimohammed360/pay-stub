import * as React from 'react';
import InputField from '@/components/utils/inputField';
import { RingLoader } from 'react-spinners';
import Button from '../utils/Button';
import { Dayjs } from 'dayjs';

const optionArr: { label: string; value: string | number; keys: number }[] = [
  { label: 'Weekly', value: "52", keys: 1 },
  { label: 'Biweekly', value: "26", keys: 2 },
  { label: 'Semi-Monthly', value: "24", keys: 3 },
  { label: 'Monthly', value: "12", keys: 4 },
  { label: 'Alabama (5%)', value: "0.05", keys: 5 },
  { label: 'Alaska (4%)', value: "0.04", keys: 6 },
  { label: 'Arizona (6%)', value: "0.06", keys: 7 },
  { label: 'Arkansas (7%)', value: "0.07", keys: 8 },
  { label: 'California (9%)', value: "0.09", keys: 9 },
  { label: 'Colorado (4.63%)', value: "0.0463", keys: 10 },
  { label: 'Connecticut (6%)', value: "0.06", keys: 11 },
  { label: 'Delaware (5.6%)', value: "0.056", keys: 12 },
  { label: 'Florida (0%)', value: "0", keys: 13 },
  { label: 'Georgia (5.75%)', value: "0.0575", keys: 14 },
  { label: 'Hawaii (6.8%)', value: "0.068", keys: 15 },
  { label: 'Idaho (6.5%)', value: "0.065", keys: 16 },
  { label: 'Illinois (4.95%)', value: "0.0495", keys: 17 },
  { label: 'Indiana (3.23%)', value: "0.0323", keys: 18 },
  { label: 'Iowa (6.1%)', value: "0.061", keys: 19 },
  { label: 'Kansas (5.7%)', value: "0.057", keys: 20 },
  { label: 'Kentucky (5%)', value: "0.05", keys: 21 },
  { label: 'Louisiana (6%)', value: "0.06", keys: 22 },
  { label: 'Maine (7%)', value: "0.07", keys: 23 },
  { label: 'Maryland (5.75%)', value: "0.0575", keys: 24 },
  { label: 'Massachusetts (5%)', value: "0.05", keys: 25 },
  { label: 'Michigan (4.5%)', value: "0.045", keys: 26 },
  { label: 'Minnesota (7.8%)', value: "0.078", keys: 27 },
  { label: 'Mississippi (5%)', value: "0.05", keys: 28 },
  { label: 'Missouri (5.4%)', value: "0.054", keys: 29 },
  { label: 'Montana (6.8%)', value: "0.068", keys: 30 },
  { label: 'Nebraska (6.8%)', value: "0.068", keys: 31 },
  { label: 'Nevada (0%)', value: "0", keys: 32 },
  { label: 'New Hampshire (5%)', value: "0.05", keys: 33 },
  { label: 'New Jersey (8.9%)', value: "0.089", keys: 34 },
  { label: 'New Mexico (4.9%)', value: "0.049", keys: 35 },
  { label: 'New York (8.8%)', value: "0.088", keys: 36 },
  { label: 'North Carolina (5.4%)', value: "0.054", keys: 37 },
  { label: 'North Dakota (5%)', value: "0.05", keys: 38 },
  { label: 'Ohio (5.5%)', value: "0.055", keys: 39 },
  { label: 'Oklahoma (5%)', value: "0.05", keys: 40 },
  { label: 'Oregon (9%)', value: "0.09", keys: 41 },
  { label: 'Pennsylvania (3%)', value: "0.03", keys: 42 },
  { label: 'Rhode Island (7%)', value: "0.07", keys: 43 },
  { label: 'South Carolina (7%)', value: "0.07", keys: 44 },
  { label: 'South Dakota (0%)', value: "0", keys: 45 },
  { label: 'Tennessee (6.4%)', value: "0.064", keys: 46 },
  { label: 'Texas (0%)', value: "0", keys: 47 },
  { label: 'Utah (7%)', value: "0.07", keys: 48 },
  { label: 'Vermont (6.8%)', value: "0.068", keys: 49 },
  { label: 'Virginia (5.7%)', value: "0.057", keys: 50 },
  { label: 'Washington (0%)', value: "0", keys: 51 },
  { label: 'West Virginia (6%)', value: "0.06", keys: 52 },
  { label: 'Wisconsin (7%)', value: "0.07", keys: 53 },
  { label: 'Wyoming (0%)', value: "0", keys: 54 },
];

export const CalculatorSection = () => {
  const [anualWage, setanualWage] = React.useState(true);
  const [results, setResults] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const resultRef = React.useRef<HTMLDivElement>(null);
  const [deductions, setDeductions] = React.useState<null | {
    grossPay: number;
    federal: number;
    socialSecurity: number;
    medicare: number;
    stateTax: number;
    totalDeductions: number;
    netPay: number;
  }>(null);

  const [formValues, setFormValues] = React.useState({
    hourly_rate: '',
    hours_worked: '',
    state: '',
    pay_date: null,
    pay_frequency: '',
    annual_wage: '',
  });


  const handleInputChange = (id: keyof typeof formValues,
    value: string | number | Dayjs | null) => {
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const calculateDeductions = (grossPay: number, stateRate: number) => {
    const federal = grossPay * 0.12;
    const socialSecurity = grossPay * 0.062;
    const medicare = grossPay * 0.0145;
    const stateTax = grossPay * stateRate;
    const totalDeductions = federal + socialSecurity + medicare + stateTax;
    const netPay = grossPay - totalDeductions;

    setDeductions({
      grossPay,
      federal,
      socialSecurity,
      medicare,
      stateTax,
      totalDeductions,
      netPay,
    });
  };

  const Calculate = () => {
    const { hourly_rate, hours_worked, state, pay_frequency } = formValues;

    setDeductions(null);
    console.log(formValues)
    if (anualWage) {
      const { annual_wage } = formValues;
      if (!annual_wage || !pay_frequency || !state) {
        alert('Please fill in all fields');
        return;
      }

      const grossPay = parseFloat(annual_wage) / Number(pay_frequency);
      calculateDeductions(grossPay, parseFloat(state));
    } else {
      if (!hourly_rate || !hours_worked || !state || !pay_frequency) {
        alert('Please fill in all fields');
        return;
      }

      const grossPay = parseFloat(hourly_rate) * parseFloat(hours_worked);
      calculateDeductions(grossPay, parseFloat(state));
    }

    setLoading(true);
    setResults(false);
    setTimeout(() => {
      setLoading(false);
      setResults(true);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100); 
    }, 1000);
  };

  const inputFields: { label: string; textId: keyof typeof formValues; type?: 'text' | 'select' | 'date'; option?: typeof optionArr }[] = [
    { label: 'Enter your hourly rate', textId: 'hourly_rate' },
    { label: 'Enter your hours worked', textId: 'hours_worked' },
    { label: 'State', textId: 'state', type: 'select', option: optionArr.slice(4) },
    { label: 'Pay Date', textId: 'pay_date', type: 'date' },
    { label: 'Pay Frequency', textId: 'pay_frequency', type: 'select', option: optionArr.slice(0, 4) },
  ];



  return (
    <>
      <div className='font-Calsans text-center my-5 mx-auto w-3/4'>
        <div className="text-3xl font-black">Pay Stub Calculator</div>
        <div className="text-lg font-medium text-gray-500 ">
          Calculate your salary based on your hourly rate or annual wage
        </div>
      </div>
      <div className="flex flex-wrap  w-full max-h-auto ">
        <div className="w-full sm:w-1/2 h-auto px-5 grid gap-8">
          <div className="flex flex-wrap justify-center gap-2 items-center">
            <button
              className={`btn px-5 sm:btn-wide rounded-full ${anualWage ? 'bg-btn-neutral' : 'btn-outline'}`}
              onClick={() => setanualWage(true)}
            >
              Annual Wage
            </button>
            <button
              className={`btn px-5 sm:btn-wide rounded-full ${!anualWage ? 'bg-btn-neutral' : 'btn-outline'}`}
              onClick={() => setanualWage(false)}
            >
              Hourly Wage
            </button>
          </div>
          <div className="flex flex-col justify-center gap-6">
            {anualWage ? (
              <InputField
                label="Enter your annual wage"
                textId="annual_wage"
                value={formValues.annual_wage}
                onChange={(val) => handleInputChange('annual_wage', val)}
              />
            ) : (
              inputFields.slice(0, 2).map(({ label, textId }) => (
                <InputField
                  key={textId}
                  label={label}
                  textId={textId}
                  value={formValues[textId as keyof typeof formValues]}
                  onChange={(val) => handleInputChange(textId, val)}
                />
              ))
            )}
            {inputFields.slice(2).map(({ label, textId, type, option }) => (
              <InputField
              className={`${type === 'select' ? 'ps-2' : ''}`}
                key={textId}
                label={label}
                textId={textId}
                type={type}
                value={formValues[textId as keyof typeof formValues]}
                onChange={(val) => handleInputChange(textId, val)}
                optionArr={option}
              />
            ))}
            <div className="text-center ">
              <button
                className="btn btn-neutral py-6 btn-outline btn-wide rounded-full text-xl"
                onClick={Calculate}
              >
                Calculate
              </button>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <div className="rounded-lg flex justify-center h-auto mt-10 p-5 border mx-9">
            {loading ? (
              <RingLoader />
            ) : results && deductions ? (
              <div id='pdf-content' ref={resultRef}  className="flex flex-col gap-4">
                <div className="text-2xl font-bold">Home Coming Pay</div>
                <div>Gross Pay: ${deductions.grossPay.toFixed(2)}</div>
                <div>Federal Tax: ${deductions.federal.toFixed(2)}</div>
                <div>Social Security: ${deductions.socialSecurity.toFixed(2)}</div>
                <div>Medicare: ${deductions.medicare.toFixed(2)}</div>
                <div>State Tax: ${deductions.stateTax.toFixed(2)}</div>
                <div>Total Deductions: ${deductions.totalDeductions.toFixed(2)}</div>
                <div className="font-bold">Net Pay: ${deductions.netPay.toFixed(2)}</div>
                <Button classname='btn btn-wide rounded-full bg-btn-neutral btn-outline'
                  onClickFunc={() => {
                    fetch('/api/generate-pdf')
                      .then(res => res.blob())
                      .then(blob => {
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'paystub.pdf';
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                      });
                  }} />

              </div>
            ) : (
              <div className="text-gray-400 text-xl">Click calculate to see results</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
