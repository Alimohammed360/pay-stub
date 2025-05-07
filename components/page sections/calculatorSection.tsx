import * as React from 'react';
import InputField from '@/components/utils/inputField';
import { RingLoader } from 'react-spinners';
import Button from '../utils/Button';
import { Dayjs } from 'dayjs';

const optionArr: { label: string; value: string | number }[] = [
  { label: 'Weekly', value: 52 },
  { label: 'Biweekly', value: 26 },
  { label: 'Semi-Monthly', value: 24 },
  { label: 'Monthly', value: 12 },
  { label: 'Alabama (5%)', value: 0.05 },
  { label: 'Alaska (4%)', value: 0.04 },
  { label: 'Arizona (6%)', value: 0.06 },
  { label: 'Arkansas (7%)', value: 0.07 },
  { label: 'California (9%)', value: 0.09 },
  { label: 'Colorado (4.63%)', value: 0.0463 },
  { label: 'Connecticut (6%)', value: 0.06 },
  { label: 'Delaware (5.6%)', value: 0.056 },
  { label: 'Florida (0%)', value: 0 },
  { label: 'Georgia (5.75%)', value: 0.0575 },
  { label: 'Hawaii (6.8%)', value: 0.068 },
  { label: 'Idaho (6.5%)', value: 0.065 },
  { label: 'Illinois (4.95%)', value: 0.0495 },
  { label: 'Indiana (3.23%)', value: 0.0323 },
  { label: 'Iowa (6.1%)', value: 0.061 },
  { label: 'Kansas (5.7%)', value: 0.057 },
  { label: 'Kentucky (5%)', value: 0.05 },
  { label: 'Louisiana (6%)', value: 0.06 },
  { label: 'Maine (7%)', value: 0.07 },
  { label: 'Maryland (5.75%)', value: 0.0575 },
  { label: 'Massachusetts (5%)', value: 0.05 },
  { label: 'Michigan (4.5%)', value: 0.045 },
  { label: 'Minnesota (7.8%)', value: 0.078 },
  { label: 'Mississippi (5%)', value: 0.05 },
  { label: 'Missouri (5.4%)', value: 0.054 },
  { label: 'Montana (6.8%)', value: 0.068 },
  { label: 'Nebraska (6.8%)', value: 0.068 },
  { label: 'Nevada (0%)', value: 0 },
  { label: 'New Hampshire (5%)', value: 0.05 },
  { label: 'New Jersey (8.9%)', value: 0.089 },
  { label: 'New Mexico (4.9%)', value: 0.049 },
  { label: 'New York (8.8%)', value: 0.088 },
  { label: 'North Carolina (5.4%)', value: 0.054 },
  { label: 'North Dakota (5%)', value: 0.05 },
  { label: 'Ohio (5.5%)', value: 0.055 },
  { label: 'Oklahoma (5%)', value: 0.05 },
  { label: 'Oregon (9%)', value: 0.09 },
  { label: 'Pennsylvania (3%)', value: 0.03 },
  { label: 'Rhode Island (7%)', value: 0.07 },
  { label: 'South Carolina (7%)', value: 0.07 },
  { label: 'South Dakota (0%)', value: 0 },
  { label: 'Tennessee (6.4%)', value: 0.064 },
  { label: 'Texas (0%)', value: 0 },
  { label: 'Utah (7%)', value: 0.07 },
  { label: 'Vermont (6.8%)', value: 0.068 },
  { label: 'Virginia (5.7%)', value: 0.057 },
  { label: 'Washington (0%)', value: 0 },
  { label: 'West Virginia (6%)', value: 0.06 },
  { label: 'Wisconsin (7%)', value: 0.07 },
  { label: 'Wyoming (0%)', value: 0 },
];

export const CalculatorSection = () => {
  const [anualWage, setanualWage] = React.useState(true);
  const [results, setResults] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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
        <div className="w-full sm:w-1/2 h-auto p-5 grid gap-8">
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
          <div className="rounded-lg flex justify-center h-auto mt-20 p-5 border mx-9">
            {loading ? (
              <RingLoader />
            ) : results && deductions ? (
              <div id='pdf-content' className="flex flex-col gap-4">
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
