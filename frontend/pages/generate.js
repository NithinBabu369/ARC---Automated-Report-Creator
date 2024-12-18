import QuestionForm from '../components/QuestionForm';
import Header from '../components/Header';

const questions = [
  "Title of the Business",
  "Provide a detailed description of the company overview, industry and market analysis, competitive analysis, product portfolio, marketing and sales strategy, operations and technology used, financial plan, risk assessment and contingency planning, and economic and social impact."
];

export default function GenerateReport() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <QuestionForm questions={questions} />
      </div>
    </div>
  );
}