import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
const countries = [{
  code: 'IN',
  name: 'India'
}, {
  code: 'US',
  name: 'USA'
}, {
  code: 'GB',
  name: 'UK'
}, {
  code: 'CA',
  name: 'Canada'
}, {
  code: 'AU',
  name: 'Australia'
}, {
  code: 'WW',
  name: 'World Wide'
}];
const examDescriptions: Record<string, string> = {
  'EAMCET': 'Engineering, Agriculture and Medical Common Entrance Test for admissions in Andhra Pradesh',
  'EAPCET': 'Engineering, Agriculture and Pharmacy Common Entrance Test for admissions in Telangana',
  'KCET': 'Karnataka Common Entrance Test for engineering and medical admissions',
  'MH CET': 'Maharashtra Common Entrance Test for engineering and pharmacy admissions',
  'JEE Mains': 'Joint Entrance Examination Main for admission to NITs, IIITs and other engineering colleges',
  'JEE Advanced': 'Joint Entrance Examination Advanced for admission to IITs',
  'NEET': 'National Eligibility cum Entrance Test for medical admissions',
  'UPSC': 'Union Public Service Commission exam for civil services recruitment',
  'CAT': 'Common Admission Test for admission to IIMs and other management programs',
  'SAT': 'Scholastic Assessment Test for undergraduate admissions in US colleges',
  'GRE': 'Graduate Record Examination for graduate school admissions',
  'IELTS': 'International English Language Testing System for English proficiency',
  'TOEFL': 'Test of English as a Foreign Language for English proficiency',
  'GMAT': 'Graduate Management Admission Test for business school admissions'
};
const examsByCountry: Record<string, {
  category: string;
  exams: string[];
}[]> = {
  IN: [{
    category: 'UG',
    exams: ['EAMCET', 'EAPCET', 'KCET', 'MH CET', 'JEE Mains', 'JEE Advanced', 'NEET']
  }, {
    category: 'GOVT',
    exams: ['UPSC']
  }, {
    category: 'PG',
    exams: ['CAT']
  }],
  US: [{
    category: 'UG',
    exams: ['SAT']
  }, {
    category: 'PG',
    exams: ['GRE', 'IELTS', 'TOEFL', 'GMAT']
  }],
  GB: [{
    category: 'PG',
    exams: ['IELTS', 'TOEFL', 'GRE', 'GMAT']
  }],
  CA: [{
    category: 'UG',
    exams: ['SAT']
  }, {
    category: 'PG',
    exams: ['IELTS', 'TOEFL', 'GRE', 'GMAT']
  }],
  AU: [{
    category: 'UG',
    exams: ['SAT']
  }, {
    category: 'PG',
    exams: ['IELTS', 'GRE', 'GMAT']
  }],
  WW: [{
    category: 'UG',
    exams: ['SAT']
  }, {
    category: 'PG',
    exams: ['IELTS', 'GRE', 'GMAT', 'TOEFL']
  }]
};
const SupportedExams = () => {
  const [selectedCountry, setSelectedCountry] = useState('IN');
  return <TooltipProvider>
      <section className="container mx-auto sm:py-24 py-[15px]">
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 my-0 py-[10px] sm:text-5xl">
            Supported Exams
          </h2>
          <p className="mt-4 text-muted-foreground max-w-3xl mx-auto text-base">
            Prepare for the world's most competitive exams with our AI-powered platform. Select your country to see relevant exams.
          </p>
        </div>

        <div className="flex justify-center gap-2 sm:gap-4 mb-8 flex-wrap">
          {countries.map(country => <Button key={country.code} variant={selectedCountry === country.code ? 'default' : 'secondary'} onClick={() => setSelectedCountry(country.code)} className="text-base">
              {country.name}
            </Button>)}
        </div>

        <div className="space-y-6">
          {examsByCountry[selectedCountry].map(category => <div key={category.category} className="text-center">
              <h3 className="text-lg font-bold text-purple-300 mb-4">{category.category}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {category.exams.map(exam => <Tooltip key={exam}>
                    <TooltipTrigger asChild>
                      <Button variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-600/20 font-semibold px-4 py-2 text-sm">
                        {exam}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs p-3 bg-slate-800 border-slate-700">
                      <p className="text-sm text-white">{examDescriptions[exam]}</p>
                    </TooltipContent>
                  </Tooltip>)}
              </div>
            </div>)}
        </div>
      </section>
    </TooltipProvider>;
};
export default SupportedExams;